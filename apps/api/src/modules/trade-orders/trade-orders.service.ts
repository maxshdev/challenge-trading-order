import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeOrder } from './trade-order.entity';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';

@Injectable()
export class TradeOrdersService {
    constructor(
        @InjectRepository(TradeOrder)
        private readonly tradeOrderRepository: Repository<TradeOrder>,
    ) { }

    async create(createTradeOrderDto: CreateTradeOrderDto): Promise<TradeOrder> {
        try {
            const tradeOrder = this.tradeOrderRepository.create(createTradeOrderDto);
            return await this.tradeOrderRepository.save(tradeOrder);
        } catch (error) {
            throw new BadRequestException('Error creating trade order: ' + error.message);
        }
    }

    async findAll(): Promise<TradeOrder[]> {
        return await this.tradeOrderRepository.find({
            order: {
                created_at: 'DESC',
            },
        });
    }
}
