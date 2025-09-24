import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { tokenExtractor } from './token-extractor';
import { Request } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    private readonly BLACKLIST_KEY = 'BLACKLIST:{key}';

	constructor(configService: ConfigService,
                private usersService: UsersService,
                @Inject(CACHE_MANAGER) private cache : Cache) {
		super({
			jwtFromRequest: tokenExtractor,
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET') || '',
			passReqToCallback: true,
		});
	}

    async isTokenBlacklisted(token : string) : Promise<boolean> {
        const key = this.BLACKLIST_KEY.replace('{key}', token);
        const result = await Promise.race([
            this.cache.get(key),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Cache timeout')), 2000))
        ]);
        return result === 'blacklisted';
    }
	async validate(req: Request, payload: any) {
        const token = tokenExtractor(req);
        if (!token) throw new UnauthorizedException('No token provided.');
        if (await this.isTokenBlacklisted(token)) throw new UnauthorizedException('Token has been invalidated.');
        const subject = await this.usersService.findById(payload.sub);
        if (!subject) throw new UnauthorizedException(`User with id ${ payload.sub } not found.`);
        return subject;
	}
}