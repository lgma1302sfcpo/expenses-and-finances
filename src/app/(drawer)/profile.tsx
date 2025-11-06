import { StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";

export default function Profile() {
    const { user } = useAuthStore();
    const { theme } = useThemeStore();

    return (
        <View style={[styles.container, { backgroundColor: theme === "dark" ? "#111" : "#fff" }]}>
            <Text style={[styles.title, { color: theme === "dark" ? "#fff" : "#000" }]}>Meu Perfil</Text>
            <Text style={[styles.label, { color: theme === "dark" ? "#bbb" : "#444" }]}>
                Nome: {user?.name || "Usuário"}
            </Text>
            <Text style={[styles.label, { color: theme === "dark" ? "#bbb" : "#444" }]}>
                Email: {user?.email || "email@email.com"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    label: { fontSize: 18, marginBottom: 10 },
});
