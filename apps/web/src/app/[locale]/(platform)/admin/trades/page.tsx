import { getTradeOrdersAction } from "@/src/modules/trades/actions/trade-order.actions";
import TradeOrderTable from "@/src/modules/trades/components/TradeOrderTable";

export default async function TradesPage() {
    const orders = await getTradeOrdersAction();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <TradeOrderTable orders={orders} />
        </div>
    );
}
