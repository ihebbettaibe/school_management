import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto';
import { AuthSubject, JwtGuard } from '../auth/jwt';
import { User } from '../users/schema/user.schema';

@Controller('api/v1/payment')
@UseGuards(JwtGuard)
export class PaymentController {

    constructor(private service: PaymentService) {}

    @Post() @HttpCode(HttpStatus.CREATED)
    async initPayment(@AuthSubject() user: User, @Body() body: PaymentDto) {
        return await this.service.create(user, body);
    }

    @Get(':id') @HttpCode(HttpStatus.OK)
    async getPaymentById(@Param('id') id: string) {
        return await this.service.read(id);
    }
}
