import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = [
    { id: "acoes", label: "Ações", icon: "business-outline" },
    { id: "fiis", label: "FIIs", icon: "home-outline" },
    { id: "cripto", label: "Criptomoedas", icon: "logo-bitcoin" },
    { id: "etfs", label: "ETFs", icon: "bar-chart-outline" },
    { id: "etfint", label: "ETFs Internacionais", icon: "globe-outline" },
    { id: "stocks", label: "Stocks", icon: "cash-outline" },
    { id: "renda-fixa", label: "Renda Fixa", icon: "document-text-outline" },
];

export default function InvestmentsIndex() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Selecione o tipo de investimento</Text>
            <View style={styles.grid}>
                {options.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() => router.push(`/investments/${item.id}`)}
                    >
                        <Ionicons name={item.icon} size={36} color="#FAA95E" />
                        <Text style={styles.label}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
    card: {
        width: "45%",
        backgroundColor: "#FFF7F1",
        borderRadius: 12,
        padding: 25,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
    },
    label: { marginTop: 10, fontWeight: "600", color: "#333" },
});
