import { useEffect } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useThemeStore } from "../../store/useThemeStore";

export default function Settings() {
    const { theme, toggleTheme, loadTheme } = useThemeStore();

    useEffect(() => {
        loadTheme();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme === "dark" ? "#111" : "#fff" }]}>
            <Text style={[styles.title, { color: theme === "dark" ? "#fff" : "#000" }]}>
                Configurações
            </Text>

            <View style={styles.row}>
                <Text style={[styles.label, { color: theme === "dark" ? "#fff" : "#000" }]}>
                    Modo Escuro
                </Text>
                <Switch
                    value={theme === "dark"}
                    onValueChange={toggleTheme}
                    thumbColor={theme === "dark" ? "#FAA95E" : "#ccc"}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    label: { fontSize: 18 },
});
