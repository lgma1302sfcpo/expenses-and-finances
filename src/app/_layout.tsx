// src/app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            {/* Ponto inicial - verifica login */}
            <Stack.Screen name="startup" options={{ headerShown: false }} options={{ headerShown: false }} />

            {/* Telas públicas */}
            <Stack.Screen name="login" options={{ title: "Login" }} options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ title: "Cadastro" }} options={{ headerShown: false }} />

            {/* Telas protegidas */}
            <Stack.Screen name="index" options={{ title: "Planner Financeiro" }} options={{ headerShown: false }} />
            <Stack.Screen name="addTransaction" options={{ title: "Adicionar Transação" }} options={{ headerShown: false }} />

            <Stack.Screen
                name="(drawer)"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
export const unstable_settings = {
    initialRouteName: "startup",
};
