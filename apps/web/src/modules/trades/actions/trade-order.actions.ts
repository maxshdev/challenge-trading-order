"use server";

import { TradeOrderService } from "../trade-order.service";
import { ICreateTradeOrder } from "../interfaces/trade-order.interface";
import { revalidatePath } from "next/cache";

export const getTradeOrdersAction = async (page: number = 1, limit: number = 10) =>
    TradeOrderService.getAll(page, limit);

export const createTradeOrderAction = async (data: ICreateTradeOrder) => {
    const result = await TradeOrderService.create(data);
    revalidatePath("/[locale]/admin/trades", "page");
    return result;
};

export const deleteTradeOrderAction = async (id: string) => {
    console.log("SERVER ACTION: deleteTradeOrderAction called for ID:", id);
    try {
        await TradeOrderService.delete(id);
        console.log("SERVER ACTION: Delete successful for ID:", id);
        revalidatePath("/[locale]/admin/trades", "page");
    } catch (error: any) {
        console.error("SERVER ACTION ERROR:", error.message);
        throw error;
    }
};
