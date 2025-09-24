import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import type { UserDocument } from './schema/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationOptions } from '../common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {

    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

    async save(data: CreateUserDto): Promise<User | null> {
        return this.model.create(data);
	}

	async findAll(queryParams: PaginationOptions) : Promise<User[]> {
        let query = this.model.find(queryParams.filter || {});
        if (queryParams.sortBy && queryParams.sortDirection) query = query.sort({ [queryParams.sortBy]: queryParams.sortDirection });
        if (queryParams.page != null) query = query.skip(queryParams.page * (queryParams.size || 10));
        if (queryParams.size != null) query = query.limit(queryParams.size);
        return query.exec();
	}
	async findByEmail(email: string): Promise<User | null> {
        return this.model.findOne({ email }).exec();
	}
	async findById(id: string): Promise<User | null> {
		return this.model.findById(id).exec();
	}

	async update(id: string, data: UpdateUserDto): Promise<User | null> {
        return this.model.findByIdAndUpdate(id, data);
	}

	async deleteById(id: string): Promise<void> {
		await this.model.deleteOne({ where: { id } });
	}

	async existsById(id : string): Promise<boolean> {
        const check = await this.model.exists({ where: { id } });
        return check !== null;
	}
	async existsByEmail(email: string): Promise<boolean> {
        const check = await this.model.exists({ where: { email } });
        return check !== null;
	}

    async addDeviceToken(id: string, token: string): Promise<void> {
        await this.model.findByIdAndUpdate(id, { $addToSet: { deviceTokens: token } });
    }
}