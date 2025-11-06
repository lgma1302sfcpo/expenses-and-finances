import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
    theme: "light",

    toggleTheme: async () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        await AsyncStorage.setItem("theme", newTheme);
        set({ theme: newTheme });
    },

    loadTheme: async () => {
        const saved = await AsyncStorage.getItem("theme");
        if (saved) set({ theme: saved });
    },
}));
