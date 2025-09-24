import { Subject } from '../schema/schedule.schema';
import { ClassType } from '../schema/schedule.schema';

export class CreateScheduleDto {
    weekDay: number;
    startTime: number;
    endTime: number;

    teacherId: string;
    classroom: string;
    grade: string;

    type: ClassType;

    subject: Subject;
}
