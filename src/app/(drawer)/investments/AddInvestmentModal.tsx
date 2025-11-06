import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useInvestmentsStore } from "../../../store/useInvestmentsStore";

export default function AddInvestmentModal({ visible, onClose, type }) {
    const { addInvestment } = useInvestmentsStore();
    const [tab, setTab] = useState("compra");
    const [ativo, setAtivo] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [preco, setPreco] = useState("");
    const [custos, setCustos] = useState("");

    const total =
        (parseFloat(preco || 0) * parseFloat(quantidade || 0) +
            parseFloat(custos || 0)) || 0;

    const handleSave = () => {
        addInvestment({
            type,
            tab,
            ativo,
            quantidade: parseFloat(quantidade),
            preco: parseFloat(preco),
            custos: parseFloat(custos),
            total,
            data: new Date().toISOString(),
        });
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Adicionar Lançamento</Text>

                    {/* Tabs Compra/Venda */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, tab === "compra" && styles.tabActive]}
                            onPress={() => setTab("compra")}
                        >
                            <Text
                                style={[styles.tabText, tab === "compra" && styles.tabTextActive]}
                            >
                                Compra
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, tab === "venda" && styles.tabActive]}
                            onPress={() => setTab("venda")}
                        >
                            <Text
                                style={[styles.tabText, tab === "venda" && styles.tabTextActive]}
                            >
                                Venda
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <Text style={styles.label}>Tipo de ativo</Text>
                        <TextInput value={type} editable={false} style={styles.inputDisabled} />

                        <Text style={styles.label}>Ativo</Text>
                        <TextInput
                            value={ativo}
                            onChangeText={setAtivo}
                            style={styles.input}
                            placeholder="Ex: BTC, PETR4, MXRF11"
                        />

                        <Text style={styles.label}>Quantidade</Text>
                        <TextInput
                            value={quantidade}
                            onChangeText={setQuantidade}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <Text style={styles.label}>Preço em R$</Text>
                        <TextInput
                            value={preco}
                            onChangeText={setPreco}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <Text style={styles.label}>Outros custos</Text>
                        <TextInput
                            value={custos}
                            onChangeText={setCustos}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <View style={styles.totalBox}>
                            <Text style={styles.totalLabel}>Valor total</Text>
                            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
                        </View>

                        <View style={styles.rowButtons}>
                            <TouchableOpacity
                                style={[styles.btn, styles.cancel]}
                                onPress={onClose}
                            >
                                <Text style={styles.btnTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, styles.save]}
                                onPress={handleSave}
                            >
                                <Text style={styles.btnTextSave}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: 12,
        width: "90%",
        padding: 20,
        maxHeight: "90%",
    },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        marginBottom: 15,
    },
    tab: { flex: 1, alignItems: "center", padding: 10 },
    tabActive: { backgroundColor: "#FAA95E", borderRadius: 10 },
    tabText: { color: "#555", fontWeight: "600" },
    tabTextActive: { color: "#fff" },
    label: { fontSize: 14, color: "#555", marginTop: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 4,
    },
    inputDisabled: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 4,
        backgroundColor: "#f4f4f4",
        color: "#666",
    },
    totalBox: {
        backgroundColor: "#f6f6f6",
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalLabel: { fontWeight: "600", color: "#555" },
    totalValue: { fontWeight: "bold", fontSize: 16, color: "#000" },
    rowButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    btn: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
    cancel: { backgroundColor: "#f1f1f1", marginRight: 10 },
    save: { backgroundColor: "#333" },
    btnTextCancel: { color: "#333", fontWeight: "600" },
    btnTextSave: { color: "#fff", fontWeight: "600" },
});
