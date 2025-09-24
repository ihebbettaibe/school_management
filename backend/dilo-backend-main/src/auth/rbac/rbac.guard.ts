import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './rbac.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RbacGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const classRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getClass()) || [];
        const methodRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()) || [];
        const requiredRoles = [...classRoles, ...methodRoles];
        if (!requiredRoles) return true;
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user?.role === role);
    }
}

@Injectable()
export class RbacPathGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        const { user, params } = context.switchToHttp().getRequest();
        const role = params.role;
        return user?.role === role;
    }
}
