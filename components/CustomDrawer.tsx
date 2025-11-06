import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../src/store/useAuthStore";
import { useThemeStore } from "../src/store/useThemeStore";

export default function CustomDrawer(props) {
    const { user, logout } = useAuthStore();
    const { theme } = useThemeStore();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === "dark" ? "#111" : "#fff" }]}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <Ionicons name="wallet-outline" size={50} color="#FAA95E" />
                    <Text style={[styles.name, { color: theme === "dark" ? "#fff" : "#000" }]}>
                        {user?.name || "Usuário"}
                    </Text>
                    <Text style={{ color: theme === "dark" ? "#bbb" : "#777" }}>
                        {user?.email || "email@email.com"}
                    </Text>
                </View>

                <View style={styles.menu}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <DrawerItem
                    label="Sair"
                    icon={({ color, size }) => <Ionicons name="exit-outline" color={color} size={size} />}
                    onPress={handleLogout}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        alignItems: "center",
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
    },
    menu: { flex: 1, paddingTop: 10 },
    footer: {
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingVertical: 10,
        bottom: 20
    },
});
