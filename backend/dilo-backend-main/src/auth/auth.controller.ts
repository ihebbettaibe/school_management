import { Controller, Req, Body, Get, Post, } from '@nestjs/common';
import { HttpCode, HttpStatus, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSubject, JwtGuard } from './jwt';
import { Request } from 'express';
import { LoggerInterceptor } from '../common/interceptors';
import { LoginDto, RegisterDto } from './dto';
import { User } from '../users/schema/user.schema';
import { RegisterDeviceDto } from '../users/dto';

@Controller('api/v1/auth')
@UseInterceptors(ClassSerializerInterceptor, LoggerInterceptor)
export class AuthController {

    constructor(private service : AuthService) {}

    @Post('/login') @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginDto) {
        return await this.service.login(body);
    }

    @Post('/register') @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: RegisterDto) {
        return await this.service.register(body);
    }

    @UseGuards(JwtGuard)
    @Post('/logout') @HttpCode(HttpStatus.OK)
    async logout(@Req() req: Request) {
        return await this.service.logout(req);
    }

    @Get('/me') @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    me(@AuthSubject() user: User) {
        return user;
    }

    @Post('/device-token') @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtGuard)
    async registerDevice(@AuthSubject() user: User, @Body() body: RegisterDeviceDto) {
        return await this.service.addDeviceToken(user.id, body.token);
    }
}
