import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query, UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto, UpdateScheduleDto } from './dto';
import { JwtGuard } from '../auth/jwt';
import { RbacGuard, Role, Roles } from '../auth/rbac';
import { ClassType, Schedule } from './schema/schedule.schema';
import { PaginationOptions } from '../common';
import { LoggerInterceptor } from '../common/interceptors';

@Controller('api/v1/schedule')
@UseInterceptors(ClassSerializerInterceptor, LoggerInterceptor)
@UseGuards(JwtGuard, RbacGuard)
@Roles(Role.ADMINISTRATOR)
export class ScheduleController {

    constructor(private service: ScheduleService) {}

    @Post()
    @Roles(Role.ADMINISTRATOR)
    create(@Body() createUserDto: CreateScheduleDto) {
        return this.service.create(createUserDto);
    }

    //region GET Methods
    @Get('/all')
    @Roles(Role.ADMINISTRATOR)
    findAll(@Query() query: PaginationOptions) {
        return this.service.findAll(query);
    }

    @Get('/grade/:grade')
    @Roles(Role.ADMINISTRATOR, Role.TEACHER, Role.PARENT)
    findByGrade(@Param('grade') grade: string) {
        return this.service.findAll({ filter: { grade } });
    }

    @Get('/teacher/:teacherId')
    @Roles(Role.TEACHER)
    findByTeacher(@Param('teacherId') teacherId: string) {
        return this.service.findAll({ filter: { teacherId } });
    }

    @Get()
    @Roles(Role.ADMINISTRATOR)
    findOne(query: Partial<Schedule>) {
        return this.service.findOne({ where: { ...query } });
    }
    //endregion

    @Patch('class/:id')
    @Roles(Role.ADMINISTRATOR, Role.TEACHER)
    setClassType(@Param('id') id: string, @Body('type') type: ClassType) {
        return this.service.update(id, { type });
    }

    @Patch(':id')
    @Roles(Role.ADMINISTRATOR, Role.TEACHER)
    update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @Roles(Role.ADMINISTRATOR)
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

}
