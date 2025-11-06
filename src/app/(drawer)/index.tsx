// src/app/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { useTransactions } from "../../store/useTransactions";



export default function Home() {
    const { transactions, fetchTransactions } = useTransactions();
    const router = useRouter();
    const { token } = useAuthStore();
    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        if (token === null) return; // evita rodar antes do Zustand carregar
        const timer = setTimeout(() => {
            if (!token) router.replace("/login");
        }, 100);
        return () => clearTimeout(timer);
    }, [token]);

    const totalEntradas = transactions
        .filter((t) => t.type === "entrada")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalSaidas = transactions
        .filter((t) => t.type === "saida")
        .reduce((acc, t) => acc + t.amount, 0);

    const saldo = totalEntradas - totalSaidas;






    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.typeText}>
                    {item.type === "entrada" ? "Entrada" : "Saída"}
                </Text>
            </View>
            <Text
                style={[
                    styles.amount,
                    item.type === "entrada" ? styles.income : styles.expense,
                ]}
            >
                {item.type === "entrada" ? "+ " : "- "}R$ {item.amount.toFixed(2)}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>💸 Meu Planner Financeiro</Text>
                <Text style={styles.subtitle}>
                    Acompanhe seus gastos e receitas em tempo real
                </Text>
            </View>

            {/* Bloco de resumo financeiro */}
            <View style={styles.summaryContainer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryLabel}>Entradas</Text>
                    <Text style={[styles.summaryValue, styles.income]}>
                        R$ {totalEntradas.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryLabel}>Saídas</Text>
                    <Text style={[styles.summaryValue, styles.expense]}>
                        R$ {totalSaidas.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryLabel}>Saldo</Text>
                    <Text
                        style={[
                            styles.summaryValue,
                            saldo >= 0 ? styles.income : styles.expense,
                        ]}
                    >
                        R$ {saldo.toFixed(2)}
                    </Text>
                </View>
            </View>

            <Text style={styles.listTitle}>Transações</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Nenhuma transação registrada ainda.
                    </Text>
                }
            />

            {/* Botão flutuante */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push("/addTransaction")}
            >
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFDFB",
        paddingHorizontal: 30,
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    titleHeader: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    summaryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginVertical: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    summaryBox: {
        alignItems: "center",
        flex: 1,
    },
    summaryLabel: {
        fontSize: 14,
        color: "#777",
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 4,
    },
    income: {
        color: "#2ECC71",
    },
    expense: {
        color: "#E74C3C",
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#444",
        marginLeft: 10
    },
    item: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },
    typeText: {
        fontSize: 13,
        color: "#888",
    },
    amount: {
        fontSize: 15,
        fontWeight: "700",
    },
    fab: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: "#FAA95E",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    fabText: {
        color: "#fff",
        fontSize: 30,
        lineHeight: 32,
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 50,
        fontSize: 16,
    },
});
