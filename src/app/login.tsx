import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import client from "../api/client";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await client.post("/users/login", { email, password });
            await login(res.data);
            Alert.alert("Sucesso", "Login realizado!");
            router.replace("/home");
        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Email ou senha inválidos");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.link}>Criar nova conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
    input: {
        borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12,
    },
    button: { backgroundColor: "#2e86de", padding: 14, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    link: { color: "#2e86de", textAlign: "center", marginTop: 14 },
});
