import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { TradeOrderSide, TradeOrderType } from '../trade-order.entity';

export class CreateTradeOrderDto {
    @ApiProperty({ enum: TradeOrderSide })
    @IsEnum(TradeOrderSide)
    side: TradeOrderSide;

    @ApiProperty({ enum: TradeOrderType })
    @IsEnum(TradeOrderType)
    type: TradeOrderType;

    @ApiProperty({ example: 100.50 })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0.01)
    amount: number;

    @ApiProperty({ example: 50000.12345 })
    @IsNumber({ maxDecimalPlaces: 5 })
    @Min(0.00001)
    price: number;

    @ApiProperty({ example: 'BTCUSD' })
    @IsString()
    @MaxLength(20)
    pair: string;
}
