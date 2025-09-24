import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '../../auth/rbac';

export type TeacherData = {
    grades: string[];
    subjects: string[];
}

@Schema({
    timestamps: true,
})
export class User {
    @Expose()
    id: string;

    @Expose()
    @Prop({ required: true, unique: true })
    email: string;


    @Exclude()
    @Prop({ type: Object, required: true })
    auth: {
        password: string,
        salt: string;
    }

    @Expose()
    @Prop()
    firstName: string;

    @Expose()
    @Prop()
    lastName: string;

    @Expose()
    @Prop()
    phoneNumber: string;

    @Expose()
    @Prop({ required: true })
    role: Role;

    @Expose()
    @Prop({ required: true })
    schoolCode: string;

    @Exclude()
    @Prop({ type: [String], default: [] })
    deviceTokens: string[];

    toString(): string {
        return `User[${this.id}::${this.firstName} ${this.lastName}]`;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;