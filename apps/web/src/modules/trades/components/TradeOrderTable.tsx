"use client";

import { ITradeOrder } from "../interfaces/trade-order.interface";
import Link from "next/link";
import { useLocale } from "next-intl";

interface TradeOrderTableProps {
    orders: ITradeOrder[];
}

export default function TradeOrderTable({ orders }: TradeOrderTableProps) {
    const locale = useLocale();
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open': return 'badge-info';
            case 'executed': return 'badge-success';
            case 'cancelled': return 'badge-error';
            default: return 'badge-neutral';
        }
    };

    const getSideBadge = (side: string) => {
        return side === 'buy' ? 'text-success font-bold' : 'text-error font-bold';
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Trade Orders</h2>
                <Link href={`/${locale}/admin/trades/new`} className="btn btn-primary">
                    New Trade
                </Link>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Pair</th>
                                    <th>Side</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 opacity-50">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="font-medium">{order.pair}</td>
                                            <td>
                                                <span className={getSideBadge(order.side)}>
                                                    {order.side.toUpperCase()}
                                                </span>
                                            </td>
                                            <td>{order.type}</td>
                                            <td>{order.amount}</td>
                                            <td>{order.price}</td>
                                            <td>
                                                <span className={`badge ${getStatusBadge(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                {new Date(order.created_at || Date.now()).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
