const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function handleResponse(res: Response) {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = Array.isArray(errorData.message)
            ? errorData.message.join(", ")
            : errorData.message || "Ocurrió un error";
        throw new Error(message);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }
    return null;
}

export const TradeOrderService = {
    getAll: async (page: number = 1, limit: number = 10) => {
        const res = await fetch(`${API_URL}/trade_orders?page=${page}&limit=${limit}`, { cache: 'no-store' });
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

    delete: async (id: string) => {
        const res = await fetch(`${API_URL}/trade_orders/${id}`, {
            method: "DELETE",
        });
        return handleResponse(res);
    },
};
