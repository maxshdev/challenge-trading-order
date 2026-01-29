const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function handleResponse(res: Response) {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = Array.isArray(errorData.message)
            ? errorData.message.join(", ")
            : errorData.message || "Ocurrió un error";
        throw new Error(message);
    }
    return res.json();
}

export const TradeOrderService = {
    getAll: async () => {
        const res = await fetch(`${API_URL}/trade_orders`, { cache: 'no-store' });
        return handleResponse(res);
    },

    create: async (data: any) => {
        const res = await fetch(`${API_URL}/trade_orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
};
