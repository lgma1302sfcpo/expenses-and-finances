import { create } from "zustand";
import client from "../api/client";

export const useTransactions = create((set) => ({
    transactions: [],
    fetchTransactions: async () => {
        const res = await client.get("/transactions");
        set({ transactions: res.data });
    },
    addTransaction: async (data) => {
        const res = await client.post("/transactions", data);
        set((state) => ({
            transactions: [res.data, ...state.transactions],
        }));
    },
}));
