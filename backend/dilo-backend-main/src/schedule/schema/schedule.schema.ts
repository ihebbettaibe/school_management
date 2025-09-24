import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Expose } from 'class-transformer';
import { parseWeekday } from '../../common';
import { Validator } from 'class-validator';

export type Subject = 'math' | 'sc' | 'cs' | 'his' | 'geo' | 'cv' | 'isl' | 'en' | 'ar' | 'fr' | 'pe' | 'art' | 'music';
export type ClassType = 'lesson' | 'exam';

@Schema()
export class Schedule {
    @Expose()
    id: string;

    @Expose()
    @Prop({ type: Number, required: true, validate: (day: number) => day >= 1 && day <= 6 })
    weekDay: number;

    @Expose()
    @Prop({ required: true, validate: (time: number) => time >= 0 && time <= 2359 })
    startTime: number;

    @Expose()
    @Prop({ required: true, validate: (time: number) => time >= 0 && time <= 2359 })
    endTime: number;

    @Expose()
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    teacherId: Types.ObjectId;

    @Expose()
    @Prop({ required: true })
    classroom: string;

    @Expose()
    @Prop({ required: true })
    grade: string;

    @Expose()
    @Prop({ required: true, enum: ['lesson', 'exam'], default: 'lesson' })
    type: string;

    @Expose()
    @Prop({ required: true })
    subject: Subject;

    toString(): string {
        return `Schedule[${this.subject} in classroom ${this.classroom} on ${parseWeekday(this.weekDay)} from ${ this.startTime } to ${ this.endTime }]`;
    }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

export type ScheduleDocument = Schedule & Document;