import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTransactions } from "../store/useTransactions";

export default function HomeScreen() {
    const { transactions, fetchTransactions } = useTransactions();
    const router = useRouter();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={[styles.amount, item.type === "entrada" ? styles.income : styles.expense]}>
                {item.type === "entrada" ? "+ " : "- "}R$ {item.amount.toFixed(2)}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>💰 Minhas Transações</Text>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>
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
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        marginVertical: 20,
        color: "#333",
    },
    item: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
        color: "#444",
    },
    amount: {
        fontSize: 16,
        fontWeight: "700",
    },
    income: {
        color: "#3CB371",
    },
    expense: {
        color: "#E74C3C",
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
