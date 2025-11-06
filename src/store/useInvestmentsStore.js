import { create } from "zustand";

export const useInvestmentsStore = create((set) => ({
    investments: [],

    addInvestment: (newInvestment) =>
        set((state) => ({
            investments: [...state.investments, { id: Date.now().toString(), ...newInvestment }],
        })),

    removeInvestment: (id) =>
        set((state) => ({
            investments: state.investments.filter((inv) => inv.id !== id),
        })),
}));
