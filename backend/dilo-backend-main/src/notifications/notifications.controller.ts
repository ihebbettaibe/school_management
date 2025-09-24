import { Body, Controller, Param, Post, UseFilters } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { HttpExceptionFilter, InternalExceptionFilter } from '../common/filters';
import { NotificationDto } from './dto';

@Controller('/api/v1/notifications')
export class NotificationsController {

    constructor(private service: NotificationsService) {}

    @Post('/:id')
    async test(@Param('id') id: string, @Body() dto: NotificationDto) {
        await this.service.sendNotificationToUser(id, dto);
        return { message: 'Notifications service is up and running!' };
    }
}
