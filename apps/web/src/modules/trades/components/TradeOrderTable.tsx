"use client";

import { ITradeOrder } from "../interfaces/trade-order.interface";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface TradeOrderTableProps {
    orders: ITradeOrder[];
    total: number;
}

export default function TradeOrderTable({ orders = [], total = 0 }: TradeOrderTableProps) {
    const locale = useLocale();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState<string | null>(null);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const totalPages = Math.ceil(total / limit);

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de que quieres borrar esta orden?")) return;

        setLoading(id);
        try {
            const res = await fetch(`${API_URL}/trade_orders/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Error al borrar la orden");
            }

            // Refrescamos la página para obtener los datos actualizados del servidor
            router.refresh();
        } catch (error: any) {
            console.error("Delete error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(null);
        }
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

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
                <h2 className="text-2xl font-bold">Trade Orders ({total})</h2>
                <Link href={`/${locale}/admin/trades/new`} className="btn btn-primary">
                    New Trade
                </Link>
            </div>

            <div className="card bg-base-100 shadow-xl overflow-hidden">
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
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-8 opacity-50">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders?.map((order) => (
                                    <tr key={order.id} className={order.deleted_at ? 'opacity-50' : ''}>
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
                                            {order.deleted_at && (
                                                <span className="badge badge-error badge-outline ml-1">DELETED</span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap">
                                            {new Date(order.created_at || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="text-right">
                                            {!order.deleted_at && (
                                                <button
                                                    className={`btn btn-ghost btn-xs text-error ${loading === order.id ? 'loading' : ''}`}
                                                    onClick={() => handleDelete(order.id)}
                                                    disabled={loading === order.id}
                                                >
                                                    {loading === order.id ? '' : 'Delete'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="p-4 flex justify-center bg-base-200">
                        <div className="join">
                            <button
                                className="join-item btn btn-sm"
                                disabled={page <= 1}
                                onClick={() => handlePageChange(page - 1)}
                            >
                                «
                            </button>
                            <button className="join-item btn btn-sm">Page {page} of {totalPages}</button>
                            <button
                                className="join-item btn btn-sm"
                                disabled={page >= totalPages}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                »
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
