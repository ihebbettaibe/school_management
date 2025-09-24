import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentModule } from './payment/payment.module';
import firebaseConfig from './notifications/firebase.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [firebaseConfig],
            envFilePath: [
                process.env.NODE_ENV === 'production'
                    ? '.env.production'
                    : '.env.development',
            ],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('DATABASE_URL'),
            }),
            inject: [ConfigService],
        }),
        CacheModule.register({ isGlobal: true }),
        UsersModule,
        AuthModule,
        ScheduleModule,
        DashboardModule,
        NotificationsModule,
        PaymentModule,
    ],
})
export class AppModule {}
