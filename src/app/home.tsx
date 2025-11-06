import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function Home() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo(a), {user?.name} 👋</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
    title: { fontSize: 22, marginBottom: 24 },
    button: { backgroundColor: "#e74c3c", padding: 14, borderRadius: 8 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
