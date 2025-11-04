import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useTransactions } from "../store/useTransactions";

export default function AddTransactionScreen({ navigation }) {
    const { addTransaction } = useTransactions();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("entrada");

    const handleSubmit = async () => {
        await addTransaction({ title, amount: Number(amount), type });
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Valor"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Salvar" onPress={handleSubmit} />
        </View>
    );
}
