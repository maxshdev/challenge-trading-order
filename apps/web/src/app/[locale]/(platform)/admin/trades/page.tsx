import { getTradeOrdersAction } from "@/src/modules/trades/actions/trade-order.actions";
import TradeOrderTable from "@/src/modules/trades/components/TradeOrderTable";

export default async function TradesPage({
    searchParams
}: {
    searchParams: Promise<{ page?: string, limit?: string }>
}) {
    const { page, limit } = await searchParams;
    const { data: orders, total } = await getTradeOrdersAction(
        Number(page) || 1,
        Number(limit) || 10
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <TradeOrderTable orders={orders} total={total} />
        </div>
    );
}
