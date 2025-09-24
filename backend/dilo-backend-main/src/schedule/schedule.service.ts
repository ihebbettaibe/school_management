import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDto, UpdateScheduleDto } from './dto';
import { Schedule } from './schema/schedule.schema';
import { plainToInstance } from 'class-transformer';
import { RootFilterQuery } from 'mongoose';
import { PaginationOptions } from '../common';

@Injectable()
export class ScheduleService {

    constructor(private repository: ScheduleRepository) {}

    async create(dto: CreateScheduleDto): Promise<Schedule> {
        if (dto.startTime >= dto.endTime) throw new ConflictException('Start time must be before end time');
        if (dto.startTime < 800 || dto.endTime > 1700) throw new ConflictException('Schedule times must be between 08:00 and 18:00');

        const conflict = await this.repository.findOne({
            weekDay: dto.weekDay,
            $or: [
                { teacherId: dto.teacherId },
                { classroom: dto.classroom },
                { grade: dto.grade },
            ],
            $and: [
                { startTime: { $lt: dto.endTime } },
                { endTime: { $gt: dto.startTime } },
            ],
        });
        if (conflict) throw new ConflictException('Schedule conflict detected');

        const entry = await this.repository.save(dto);
        if (!entry) throw new NotFoundException('Schedule entry could not be created');
        return plainToInstance(Schedule, entry, { excludeExtraneousValues: true, ignoreDecorators: true });
    }

    async findAll(query: PaginationOptions) {
        const schedules = await this.repository.findAll(query);
        return plainToInstance(Schedule, schedules, { excludeExtraneousValues: true, ignoreDecorators: true });
    }
    async findOne(query: RootFilterQuery<Schedule>): Promise<Schedule> {
        const entry = await this.repository.findOne(query);
        if (!entry) throw new NotFoundException(`Schedule entry not found`);
        return plainToInstance(Schedule, entry, { excludeExtraneousValues: true, ignoreDecorators: true });
    }
    async existsById(id: string): Promise<boolean> {
        return await this.repository.existsById(id);
    }
    async exists(query: RootFilterQuery<Schedule>): Promise<boolean> {
        return await this.repository.exists(query);
    }

    async update(id: string, dto: UpdateScheduleDto): Promise<Schedule> {
        const entry = await this.repository.update(id, dto);
        if (!entry) throw new NotFoundException(`Schedule entry with id ${ id } not found`);
        return plainToInstance(Schedule, entry, { excludeExtraneousValues: true, ignoreDecorators: true });
    }
    async remove(id: string) : Promise<void> {
        return await this.repository.deleteById(id);
    }
}
