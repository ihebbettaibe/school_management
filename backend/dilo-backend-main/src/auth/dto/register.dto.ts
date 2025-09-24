import { Role } from '../rbac';
import { IsEnum } from 'class-validator';

export class RegisterDto {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
    schoolCode: string;
    @IsEnum(Role)
    role: Role;
}