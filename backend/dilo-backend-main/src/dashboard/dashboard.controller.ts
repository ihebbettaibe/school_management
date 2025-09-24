import { Controller, Get, UseGuards } from '@nestjs/common';
import { RbacGuard, Role, Roles } from '../auth/rbac';
import { JwtGuard } from '../auth/jwt';

@Controller('api/v1/dashboard')
@UseGuards(JwtGuard)
export class DashboardController {


    @Get('data')
    @UseGuards(RbacGuard)
    @Roles(Role.ADMINISTRATOR, Role.PARENT)
    getDashboardData() {
        return { message: 'Dashboard data for Administrators and Parents' };
    }

    @Get('tdata')
    @UseGuards(RbacGuard)
    @Roles(Role.TEACHER)
    getDashboardTeacherData() {
        return { message: 'Dashboard data for Teachers' };
    }
    @Get('stats/:role')
    @UseGuards(RbacGuard)
    getDashboardStats() {
        return { message: 'Dashboard stats for Administrators and Teachers' };
    }

}
