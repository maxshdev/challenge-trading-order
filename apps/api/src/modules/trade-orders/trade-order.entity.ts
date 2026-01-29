import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

export enum TradeOrderSide {
    BUY = 'buy',
    SELL = 'sell',
}

export enum TradeOrderType {
    LIMIT = 'limit',
    MARKET = 'market',
    STOP = 'stop',
}

export enum TradeOrderStatus {
    OPEN = 'open',
    CANCELLED = 'cancelled',
    EXECUTED = 'executed',
}

@Entity('trade_order')
export class TradeOrder extends BaseEntity {
    @Column({
        type: 'enum',
        enum: TradeOrderSide,
    })
    side: TradeOrderSide;

    @Column({
        type: 'enum',
        enum: TradeOrderType,
    })
    type: TradeOrderType;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    amount: number;

    @Column({
        type: 'decimal',
        precision: 15, // Using 15 to accommodate 5 decimal places and enough digits
        scale: 5,
    })
    price: number;

    @Column({
        type: 'enum',
        enum: TradeOrderStatus,
        default: TradeOrderStatus.OPEN,
    })
    status: TradeOrderStatus;

    @Column({
        type: 'varchar',
        length: 20,
    })
    pair: string;
}
