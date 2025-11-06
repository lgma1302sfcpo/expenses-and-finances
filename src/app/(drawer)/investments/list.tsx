import { FlatList, StyleSheet, Text, View } from "react-native";
import { useInvestmentsStore } from "../../../store/useInvestmentsStore";

export default function InvestmentsList() {
    const { investments } = useInvestmentsStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Investimentos</Text>

            <FlatList
                data={investments}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.empty}>Nenhum investimento lançado ainda.</Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.type}>{item.type}</Text>
                        <Text style={styles.asset}>{item.ativo}</Text>
                        <Text style={styles.value}>R$ {item.total.toFixed(2)}</Text>
                        <Text style={styles.info}>
                            {item.tab === "compra" ? "Compra" : "Venda"} - {item.quantidade} un
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    card: {
        backgroundColor: "#FFF7F1",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    type: { fontSize: 14, color: "#999" },
    asset: { fontSize: 18, fontWeight: "bold" },
    value: { fontSize: 16, color: "#2ECC71", marginTop: 5 },
    info: { fontSize: 13, color: "#555", marginTop: 4 },
    empty: { textAlign: "center", marginTop: 40, color: "#777" },
});
