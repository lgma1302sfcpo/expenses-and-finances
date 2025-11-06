// src/components/RealTimeList.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "../src/store/useThemeStore";

interface RealTimeListProps {
    title: string;
    symbols: string[];
}

const API_KEY = "1V4ZbvfUiJ5mW7fBsieUm7"; // substitua pela sua da BrAPI
const BASE_URL = "https://brapi.dev/api";

export default function RealTimeList({ title, symbols }: RealTimeListProps) {
    const { theme } = useThemeStore();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // 1 minuto

        return () => clearInterval(interval);
    }, [symbols]);

    const fetchPrices = async () => {
        if (!symbols.length) return;
        setLoading(true);

        try {
            const results: any[] = [];

            for (const sym of symbols) {
                // aguarda 500ms entre cada request (para evitar 429)
                await new Promise((resolve) => setTimeout(resolve, 500));

                const response = await axios.get(`${BASE_URL}/quote/${sym}`, {
                    params: { token: API_KEY },
                });

                const stock = response.data?.results?.[0] || response.data?.stocks?.[0];
                if (stock) {
                    results.push({
                        symbol: stock.symbol,
                        price: stock.regularMarketPrice || 0,
                        change: stock.regularMarketChangePercent || 0,
                    });
                }
            }

            setData(results);
        } catch (err: any) {
            console.error("Erro ao buscar preços:", err.message);
        } finally {
            setLoading(false);
        }
    };


    const renderItem = ({ item }: { item: any }) => (
        <View style={[styles.item, { backgroundColor: theme === "dark" ? "#222" : "#fff" }]}>
            <Text style={[styles.symbol, { color: theme === "dark" ? "#fff" : "#000" }]}>{item.symbol}</Text>
            <Text
                style={[
                    styles.price,
                    { color: item.change >= 0 ? "#2ECC71" : "#E74C3C" },
                ]}
            >
                R$ {item.price.toFixed(2)}
            </Text>
            <Text
                style={[
                    styles.change,
                    { color: item.change >= 0 ? "#2ECC71" : "#E74C3C" },
                ]}
            >
                {item.change.toFixed(2)}%
            </Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme === "dark" ? "#111" : "#fff" }]}>
            <Text style={[styles.title, { color: theme === "dark" ? "#fff" : "#000" }]}>{title}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FAA95E" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item.symbol || String(index)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 14,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    symbol: { fontSize: 16, fontWeight: "600" },
    price: { fontSize: 16, fontWeight: "600" },
    change: { fontSize: 14, fontWeight: "500" },
});
