import { Injectable } from '@nestjs/common';
import { Schedule } from './schema/schedule.schema';
import type { ScheduleDocument } from './schema/schedule.schema';
import { CreateScheduleDto, UpdateScheduleDto } from './dto';
import { PaginationOptions } from '../common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';

@Injectable()
export class ScheduleRepository {

    constructor(@InjectModel(Schedule.name) private model: Model<ScheduleDocument>) {}

    async save(data: CreateScheduleDto): Promise<Schedule | null> {
        return this.model.create(data);
	}

	async findAll(queryParams: PaginationOptions) : Promise<Schedule[]> {
        let query = this.model.find(queryParams.filter || {});
        if (queryParams.sortBy && queryParams.sortDirection) query = query.sort({ [queryParams.sortBy]: queryParams.sortDirection });
        if (queryParams.page != null) query = query.skip(queryParams.page * (queryParams.size || 10));
        if (queryParams.size != null) query = query.limit(queryParams.size);
        return query.exec();
	}
	async findById(id: string): Promise<Schedule | null> {
        return this.model.findById(id).exec();
	}
    async findOne(query: RootFilterQuery<Schedule>): Promise<Schedule | null> {
        return this.model.findOne(query).exec();
    }

	async update(id: string, data: UpdateScheduleDto): Promise<Schedule | null> {
		return this.model.findByIdAndUpdate(id, data);
	}

	async deleteById(id: string): Promise<void> {
		await this.model.deleteOne({ where: { id } });
	}

	async existsById(id : string): Promise<boolean> {
        const check = await this.model.exists({ where: { id } });
        return check !== null;
	}
	async exists(query: RootFilterQuery<Schedule>): Promise<boolean> {
        const check = await this.model.exists({ where: query });
        return check !== null;
	}
}