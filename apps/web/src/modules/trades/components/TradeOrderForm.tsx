"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTradeOrderAction } from "../actions/trade-order.actions";
import { TradeOrderSide, TradeOrderType } from "../interfaces/trade-order.interface";
import { useLocale } from "next-intl";

export default function TradeOrderForm() {
    const router = useRouter();
    const locale = useLocale();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        pair: "BTCUSD",
        side: "buy" as TradeOrderSide,
        type: "limit" as TradeOrderType,
        amount: 1,
        price: 50000,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createTradeOrderAction(formData);
            router.push(`/${locale}/admin/trades`);
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create trade order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-4">New Trade Order</h2>

                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Pair</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={formData.pair}
                            onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Side</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={formData.side}
                                onChange={(e) => setFormData({ ...formData, side: e.target.value as TradeOrderSide })}
                            >
                                <option value="buy">BUY</option>
                                <option value="sell">SELL</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Type</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as TradeOrderType })}
                            >
                                <option value="limit">LIMIT</option>
                                <option value="market">MARKET</option>
                                <option value="stop">STOP</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Amount</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="input input-bordered w-full"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            step="0.00001"
                            className="input input-bordered w-full"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Order"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
