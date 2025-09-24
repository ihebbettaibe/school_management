import { Role } from '../../auth/rbac';

export class CreateUserDto {
	  email: string;
	  auth: {
          password: string;
          salt: string;
      }
	  firstName: string;
	  lastName: string;
      role: Role;
}
