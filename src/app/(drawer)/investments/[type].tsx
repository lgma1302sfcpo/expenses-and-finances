import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddInvestmentModal from "./AddInvestmentModal";

export default function InvestmentType() {
    const { type } = useLocalSearchParams();
    const [showModal, setShowModal] = useState(false);

    const investmentTypeName = {
        "acoes": "Ações",
        "fiis": "Fundos Imobiliários",
        "cripto": "Criptomoedas",
        "etfs": "ETFs",
        "etfint": "ETFs Internacionais",
        "stocks": "Stocks",
        "renda-fixa": "Renda Fixa",
    }[type] || type;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{investmentTypeName}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowModal(true)}
            >
                <Text style={styles.buttonText}>Adicionar Lançamento</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => alert("Ver lançamentos em breve 🚀")}
            >
                <Text style={styles.buttonText}>Ver Lançamentos</Text>
            </TouchableOpacity>

            <AddInvestmentModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                type={investmentTypeName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
    button: {
        backgroundColor: "#FAA95E",
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
    },
    buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
});
