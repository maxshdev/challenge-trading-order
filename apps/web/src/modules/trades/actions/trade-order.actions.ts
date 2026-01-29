"use server";

import { TradeOrderService } from "../trade-order.service";
import { ICreateTradeOrder } from "../interfaces/trade-order.interface";
import { revalidatePath } from "next/cache";

export const getTradeOrdersAction = async () => TradeOrderService.getAll();

export const createTradeOrderAction = async (data: ICreateTradeOrder) => {
    const result = await TradeOrderService.create(data);
    revalidatePath("/[locale]/admin/trades", "page");
    return result;
};
