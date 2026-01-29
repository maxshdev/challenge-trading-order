import TradeOrderForm from "@/src/modules/trades/components/TradeOrderForm";

export default async function NewTradePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <TradeOrderForm />
        </div>
    );
}
