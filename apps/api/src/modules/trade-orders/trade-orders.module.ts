import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeOrdersService } from './trade-orders.service';
import { TradeOrdersController } from './trade-orders.controller';
import { TradeOrder } from './trade-order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TradeOrder])],
    controllers: [TradeOrdersController],
    providers: [TradeOrdersService],
    exports: [TradeOrdersService],
})
export class TradeOrdersModule { }
