import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTransactions } from "../store/useTransactions";

export default function AddTransaction() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"entrada" | "saida">("entrada");
    const { addTransaction } = useTransactions();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title || !amount) {
            Alert.alert("Preencha todos os campos!");
            return;
        }

        await addTransaction({ title, amount: Number(amount), type });
        Keyboard.dismiss(); // fecha o teclado
        Alert.alert("Sucesso", "Transação adicionada!");
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Nova Transação</Text>

            <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholderTextColor="#999"
                returnKeyType="next"
            />

            <TextInput
                placeholder="Valor"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
                placeholderTextColor="#999"
                returnKeyType="done" // exibe o botão OK no teclado numérico
                onSubmitEditing={() => Keyboard.dismiss()} // fecha o teclado ao apertar OK
            />

            <View style={styles.typeContainer}>
                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === "entrada" && styles.typeSelectedEntrada,
                    ]}
                    onPress={() => setType("entrada")}
                >
                    <Text
                        style={[
                            styles.typeText,
                            type === "entrada" && styles.typeTextSelected,
                        ]}
                    >
                        Entrada
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === "saida" && styles.typeSelectedSaida,
                    ]}
                    onPress={() => setType("saida")}
                >
                    <Text
                        style={[
                            styles.typeText,
                            type === "saida" && styles.typeTextSelected,
                        ]}
                    >
                        Saída
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF9F2",
        padding: 24,
        justifyContent: "center",
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "center",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    typeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    typeButton: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        marginHorizontal: 5,
    },
    typeSelectedEntrada: {
        backgroundColor: "#D1FADF",
    },
    typeSelectedSaida: {
        backgroundColor: "#FAD1D1",
    },
    typeText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    typeTextSelected: {
        color: "#000",
    },
    saveButton: {
        backgroundColor: "#FAA95E",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16,
    },
});
