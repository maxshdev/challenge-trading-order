export type TradeOrderSide = 'buy' | 'sell';
export type TradeOrderType = 'limit' | 'market' | 'stop';
export type TradeOrderStatus = 'open' | 'cancelled' | 'executed';

export interface ITradeOrder {
    id: string;
    side: TradeOrderSide;
    type: TradeOrderType;
    amount: number;
    price: number;
    status: TradeOrderStatus;
    pair: string;
    created_at: string;
    updated_at: string;
}

export interface ICreateTradeOrder {
    side: TradeOrderSide;
    type: TradeOrderType;
    amount: number;
    price: number;
    pair: string;
}
