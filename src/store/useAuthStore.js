import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,

    login: async (data) => {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userName", data.name);
        set({ user: { name: data.name, email: data.email }, token: data.token });
    },

    logout: async () => {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userName");
        set({ user: null, token: null });
    },

    loadUser: async () => {
        const token = await AsyncStorage.getItem("userToken");
        const name = await AsyncStorage.getItem("userName");
        if (token && name) set({ user: { name }, token });
    },
}));
