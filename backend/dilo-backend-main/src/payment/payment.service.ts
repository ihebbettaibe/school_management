import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PaymentDto } from './dto';
import { User } from '../users/schema/user.schema';

const testUrl = 'https://api.sandbox.konnect.network/api/v2/payments';
const prodUrl = 'https://api.konnect.network/api/v2/payments';
const activeUrl = testUrl;

const LIFESPAN = 10; // minutes

@Injectable()
export class PaymentService {
    private readonly apiKey: string;
    private readonly walletId: string;

    constructor(private httpService: HttpService, configService: ConfigService) {
        this.apiKey = configService.get<string>('KONNECT_API_KEY') || '';
        this.walletId = configService.get<string>('KONNECT_WALLET_ID') || '';
    }

    async create(user: User, dto: PaymentDto) {
        const payload = {
            ...dto,
            token: 'TND',
            type: 'immediate',
            receiverWalletId: this.walletId,
            acceptedPaymentMethods: ['bank_card', 'e-DINAR'],
            lifespan: LIFESPAN,
            addPaymentFeesToAmount: false,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
        }
        const response = await firstValueFrom(this.httpService.post(`${activeUrl}/init-payment`, payload));
        return { success: true, data: response.data };
    }

    async read(id: string) {
        try {
            const response = await firstValueFrom(this.httpService.get(`${activeUrl}/${id}`, { headers: { 'x-api-key': this.apiKey } }));
            return { success: true, data: response.data.payment };
        }
        catch (error: any) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.errors[0].message || error.message || 'An error occurred';
            throw new HttpException(message, status);
        }
    }
}
