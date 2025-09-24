import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { UsersRepository } from './users.repository';
import { User } from './schema/user.schema';
import { PaginationOptions } from '../common';

@Injectable()
export class UsersService {

    constructor(private repository: UsersRepository) {}

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.repository.save(dto);
        if (!user) throw new NotFoundException('User could not be created');
        return plainToInstance(User, user, { excludeExtraneousValues: true, ignoreDecorators: true });
    }

    async findAll(query: PaginationOptions): Promise<User[]> {
        const users = await this.repository.findAll(query);
        return plainToInstance(User, users, { excludeExtraneousValues: true, ignoreDecorators: true });
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) throw new NotFoundException(`User with id ${ id } not found`);
        return plainToInstance(User, user, { excludeExtraneousValues: true, ignoreDecorators: true });
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findByEmail(email);
        if (!user) throw new NotFoundException(`No user found with this email`);
        return plainToInstance(User, user, { excludeExtraneousValues: true, ignoreDecorators: true });
    }

    async existsById(id: string): Promise<boolean> {
        return await this.repository.existsById(id);
    }
    async existsByEmail(email: string): Promise<boolean> {
        return await this.repository.existsByEmail(email);
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.repository.update(id, dto);
        if (!user) throw new NotFoundException(`User with id ${ id } not found`);
        return plainToInstance(User, user, { excludeExtraneousValues: true, ignoreDecorators: true });
    }
    async remove(id: string) : Promise<void> {
        return await this.repository.deleteById(id);
    }

    async addDeviceToken(id: string, token: string): Promise<void> {
        await this.repository.addDeviceToken(id, token);
    }
}
