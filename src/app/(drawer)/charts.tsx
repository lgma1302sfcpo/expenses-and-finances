import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useThemeStore } from "../../store/useThemeStore";
import { useTransactions } from "../../store/useTransactions";

export default function Charts() {
    const { theme } = useThemeStore();
    const { transactions } = useTransactions();
    const width = Dimensions.get("window").width - 20;

    // ✅ Totais de valores (não apenas contagem)
    const totalEntradas = transactions
        .filter(t => t.type === "entrada")
        .reduce((acc, t) => acc + t.amount, 0);
    const totalSaidas = transactions
        .filter(t => t.type === "saida")
        .reduce((acc, t) => acc + t.amount, 0);

    const pieData = [
        {
            name: "Entradas",
            population: totalEntradas,
            color: "#2ECC71",
            legendFontColor: theme === "dark" ? "#fff" : "#333",
            legendFontSize: 14,
        },
        {
            name: "Saídas",
            population: totalSaidas,
            color: "#E74C3C",
            legendFontColor: theme === "dark" ? "#fff" : "#333",
            legendFontSize: 14,
        },
    ];

    // ✅ Dados mensais (exemplo: agrupando por mês)
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    const dataMensal = meses.map((_, i) => {
        const monthTransactions = transactions.filter(
            t => new Date(t.date).getMonth() === i
        );
        const entradas = monthTransactions
            .filter(t => t.type === "entrada")
            .reduce((acc, t) => acc + t.amount, 0);
        const saidas = monthTransactions
            .filter(t => t.type === "saida")
            .reduce((acc, t) => acc + t.amount, 0);
        return entradas - saidas;
    });

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === "dark" ? "#111" : "#fff" }]}>
            <Text style={[styles.title, { color: theme === "dark" ? "#fff" : "#000" }]}>
                Gráficos Financeiros
            </Text>

            {/* 📈 Evolução Mensal */}
            <LineChart
                data={{
                    labels: meses,
                    datasets: [{ data: dataMensal }],
                }}
                width={width}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: theme === "dark" ? "#222" : "#fff",
                    backgroundGradientTo: theme === "dark" ? "#111" : "#fff",
                    color: () => (theme === "dark" ? "#FAA95E" : "#000"),
                    labelColor: () => (theme === "dark" ? "#fff" : "#333"),
                }}
                style={{ borderRadius: 10 }}
            />

            {/* 🥧 Distribuição Entradas x Saídas */}
            <PieChart
                data={pieData}
                width={width}
                height={220}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                chartConfig={{
                    color: () => (theme === "dark" ? "#fff" : "#000"),
                }}
                style={{ marginTop: 30 }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
});
