import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './notifications.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [ConfigModule, UsersModule],
    providers: [NotificationsService],
    exports: [NotificationsService],
    controllers: [NotificationsController],
})
export class NotificationsModule {}
