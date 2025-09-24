import { Request } from 'express';
import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PasswordEncoder } from './utils/password-encoder';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema/user.schema';
import { plainToInstance } from 'class-transformer';
import { LoginDto, RegisterDto } from './dto';
import { tokenExtractor } from './jwt';
import { dayjs } from '../common/dayjs';
import { Role } from './rbac';

@Injectable()
export class AuthService {

    private readonly BLACKLIST_KEY = 'BLACKLIST:{key}';

    constructor(private service : UsersService,
                private jwtService : JwtService,
                private passwordEncoder : PasswordEncoder,
                @Inject(CACHE_MANAGER) private cache : Cache) {}

    async login(dto : LoginDto) {
        const user = (await this.service.findByEmail(dto.email)) as User;
        const authenticated = await this.passwordEncoder.authenticate(dto.password, user.auth.salt, user.auth.password);
        if (!authenticated) throw new UnauthorizedException('Wrong password');
        const payload = { sub: user.id };
        const token = this.jwtService.sign(payload);
        return { success: true, user: plainToInstance(User, user), token };
    }

    async register(dto : RegisterDto) {
        if (await this.service.existsByEmail(dto.email)) throw new ConflictException('Email already exists');
        const { password, salt } = await this.passwordEncoder.encode(dto.password);
        await this.service.create({ ...dto, role: dto.role as unknown as Role, auth: { salt, password } });
        return { success: true };
    }

    async logout(request : Request) {
        const token = tokenExtractor(request);
        if (!token) throw new UnauthorizedException('No authentication token provided.');
        const decodedToken = this.jwtService.decode(token) as { exp : number };
        if (!decodedToken || !decodedToken.exp) throw new UnauthorizedException('Invalid token');
        const expiration = dayjs().diff(dayjs(decodedToken.exp), 'seconds');
        const key = this.BLACKLIST_KEY.replace('{key}', token);
        await this.cache.set(key, 'blacklisted', expiration * 1000);
        return { success: true };
    }

    async addDeviceToken(id : string, token : string) {
        await this.service.addDeviceToken(id, token);
        return { success: true };
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
}