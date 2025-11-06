import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function Startup() {
    const router = useRouter();
    const { token, loadUser } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            await loadUser(); // tenta recuperar o token salvo
            if (token) {
                router.replace("/(drawer)");

            } else {
                router.replace("/login"); // vai pro login
            }
        };
        checkAuth();
    }, [token]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <ActivityIndicator size="large" color="#2e86de" />
        </View>
    );
}
