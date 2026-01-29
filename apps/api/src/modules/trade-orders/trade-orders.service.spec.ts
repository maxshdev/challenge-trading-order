import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TradeOrdersService } from './trade-orders.service';
import { TradeOrder, TradeOrderSide, TradeOrderType } from './trade-order.entity';
import { BadRequestException } from '@nestjs/common';

describe('TradeOrdersService Validations', () => {
    let service: TradeOrdersService;

    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findAndCount: jest.fn(),
        findOne: jest.fn(),
        softRemove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TradeOrdersService,
                {
                    provide: getRepositoryToken(TradeOrder),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<TradeOrdersService>(TradeOrdersService);
    });

    it('should throw error if amount <= 0', async () => {
        const dto: any = { pair: 'BTCUSD', amount: 0, price: 100, side: TradeOrderSide.BUY, type: TradeOrderType.LIMIT };
        await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw error if pair is invalid', async () => {
        const dto: any = { pair: 'INVALID', amount: 1, price: 100, side: TradeOrderSide.BUY, type: TradeOrderType.LIMIT };
        await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw error for Buy Limit >= market price', async () => {
        const dto: any = { pair: 'BTCUSD', amount: 1, price: 110000, side: TradeOrderSide.BUY, type: TradeOrderType.LIMIT };
        await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw error for Sell Limit <= market price', async () => {
        const dto: any = { pair: 'BTCUSD', amount: 1, price: 90000, side: TradeOrderSide.SELL, type: TradeOrderType.LIMIT };
        await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw error for Buy Stop <= market price', async () => {
        const dto: any = { pair: 'BTCUSD', amount: 1, price: 90000, side: TradeOrderSide.BUY, type: TradeOrderType.STOP };
        await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw error for Sell Stop >= market price', async () => {
        const dto: any = { pair: 'BTCUSD', amount: 1, price: 110000, side: TradeOrderSide.SELL, type: TradeOrderType.STOP };
        await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should allow valid Market order regardless of price', async () => {
        const dto: any = { pair: 'BTCUSD', amount: 1, price: 0, side: TradeOrderSide.BUY, type: TradeOrderType.MARKET };
        mockRepository.create.mockReturnValue(dto);
        mockRepository.save.mockResolvedValue(dto);
        await expect(service.create(dto)).resolves.not.toThrow();
    });
});
