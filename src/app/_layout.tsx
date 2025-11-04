// src/app/_layout.tsx
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="addTransaction" options={{ title: "Adicionar Transação" }} />
            </Stack>
        </View>
    );
}
