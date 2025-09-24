import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/schema/user.schema';
import * as admin from 'firebase-admin';
import { UsersService } from '../users/users.service';
import { NotificationDto } from './dto';

@Injectable()
export class NotificationsService {

    private readonly logger = new Logger(NotificationsService.name);

    constructor(private readonly configService: ConfigService, private user: UsersService) {
        const firebaseConfig = this.configService.get('firebase');
        if (admin.apps.length > 0) return;
        admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
        });
    }

    async sendNotificationToUser(id: string, notification: NotificationDto) {
        const user: User = await this.user.findById(id);

        if (!user) {
            this.logger.warn(`User with id ${id} not found`);
            return;
        }

        const tokens = user.deviceTokens;

        if (!tokens || tokens.length === 0) {
            this.logger.warn(`No device tokens found for user ${user.toString()}`);
            return;
        }
        const message: admin.messaging.MulticastMessage = {
            tokens, notification
        };

        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            this.logger.log(`Successfully sent message to ${response.successCount} devices.`);
            if (response.failureCount > 0) this.logger.error(`Failed to send message to ${response.failureCount} devices.`);
        }
        catch (error) {
            this.logger.error('Error sending push notification', error);
        }
    }

}
