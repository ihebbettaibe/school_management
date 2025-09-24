import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schema/schedule.schema';
import { ScheduleRepository } from './schedule.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }])
    ],
    controllers: [ScheduleController],
    providers: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
