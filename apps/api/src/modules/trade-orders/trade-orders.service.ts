import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeOrder, TradeOrderType, TradeOrderSide } from './trade-order.entity';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';
import { UpdateTradeOrderDto } from './dto/update-trade-order.dto';

@Injectable()
export class TradeOrdersService {
    private readonly MARKET_PRICES = {
        'BTCUSD': 100150.4,
        'EURUSD': 1.035,
        'ETHUSD': 3310,
    };

    constructor(
        @InjectRepository(TradeOrder)
        private readonly tradeOrderRepository: Repository<TradeOrder>,
    ) { }

    private validateOrder(dto: CreateTradeOrderDto | UpdateTradeOrderDto) {
        if (dto.amount && dto.amount <= 0) {
            throw new BadRequestException('Amount must be greater than 0');
        }

        if (dto.pair && !this.MARKET_PRICES[dto.pair]) {
            throw new BadRequestException(`Invalid pair: ${dto.pair}. Supported pairs: ${Object.keys(this.MARKET_PRICES).join(', ')}`);
        }

        if (dto.type === TradeOrderType.MARKET) {
            return; // No price validation for market orders
        }

        const currentPrice = dto.pair ? this.MARKET_PRICES[dto.pair] : undefined;
        if (currentPrice === undefined) return;
        const orderPrice = dto.price;

        if (dto.type === TradeOrderType.LIMIT) {
            if (dto.side === TradeOrderSide.BUY && orderPrice !== undefined && orderPrice >= currentPrice) {
                throw new BadRequestException(`Buy Limit price (${orderPrice}) must be lower than current market price (${currentPrice})`);
            }
            if (dto.side === TradeOrderSide.SELL && orderPrice !== undefined && orderPrice <= currentPrice) {
                throw new BadRequestException(`Sell Limit price (${orderPrice}) must be higher than current market price (${currentPrice})`);
            }
        }

        if (dto.type === TradeOrderType.STOP) {
            if (dto.side === TradeOrderSide.BUY && orderPrice !== undefined && orderPrice <= currentPrice) {
                throw new BadRequestException(`Buy Stop price (${orderPrice}) must be higher than current market price (${currentPrice})`);
            }
            if (dto.side === TradeOrderSide.SELL && orderPrice !== undefined && orderPrice >= currentPrice) {
                throw new BadRequestException(`Sell Stop price (${orderPrice}) must be lower than current market price (${currentPrice})`);
            }
        }
    }

    async create(createTradeOrderDto: CreateTradeOrderDto): Promise<TradeOrder> {
        this.validateOrder(createTradeOrderDto);
        try {
            const tradeOrder = this.tradeOrderRepository.create(createTradeOrderDto);
            return await this.tradeOrderRepository.save(tradeOrder);
        } catch (error) {
            throw new BadRequestException('Error creating trade order: ' + error.message);
        }
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: TradeOrder[], total: number }> {
        const [data, total] = await this.tradeOrderRepository.findAndCount({
            order: {
                created_at: 'DESC',
            },
            take: limit,
            skip: (page - 1) * limit,
            withDeleted: true,
        });
        return { data, total };
    }

    async findOne(id: string): Promise<TradeOrder> {
        const order = await this.tradeOrderRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Trade order with ID ${id} not found`);
        }
        return order;
    }

    async update(id: string, updateTradeOrderDto: UpdateTradeOrderDto): Promise<TradeOrder> {
        const order = await this.findOne(id);

        // Merge for validation
        const merged = { ...order, ...updateTradeOrderDto } as CreateTradeOrderDto;
        this.validateOrder(merged);

        Object.assign(order, updateTradeOrderDto);
        return await this.tradeOrderRepository.save(order);
    }

    async remove(id: string): Promise<void> {
        const order = await this.findOne(id);
        await this.tradeOrderRepository.softRemove(order);
    }
}
