import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import client from "../api/client";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await client.post("/users/register", { name, email, password });
            Alert.alert("Conta criada com sucesso!", "Agora faça login.");
            router.replace("/login");
        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Não foi possível criar a conta.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>
            <TextInput placeholder="Nome" style={styles.input} value={name} onChangeText={setName} />
            <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.link}>Já tenho conta</Text>
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
    button: { backgroundColor: "#27ae60", padding: 14, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    link: { color: "#27ae60", textAlign: "center", marginTop: 14 },
});
