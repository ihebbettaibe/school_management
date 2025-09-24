import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post, Query, UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { LoggerInterceptor } from '../common/interceptors';
import { PaginationOptions } from '../common';
import { Role } from '../auth/rbac';

@Controller('api/v1/users')
@UseInterceptors(ClassSerializerInterceptor, LoggerInterceptor)
export class UsersController {

    constructor(private service: UsersService) {}

    @Post()
    create(@Body() body: CreateUserDto) {
        return this.service.create(body);
    }

    //region GET Methods
    @Get('/teachers')
    findTeachers(@Query() query: PaginationOptions) {
        return this.service.findAll({ ...query, filter: { ...query.filter, role: Role.TEACHER } });
    }

    @Get('/parents')
    findParents(@Query() query: PaginationOptions) {
        return this.service.findAll({ ...query, filter: { ...query.filter, role: Role.PARENT } });
    }

    @Get('/email/:email')
    findByEmail(@Param('email') email: string) {
        return this.service.findByEmail(email);
    }

    @Get()
    findAll(@Query() query: PaginationOptions) {
        return this.service.findAll(query);
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }
    //endregion

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }




}
