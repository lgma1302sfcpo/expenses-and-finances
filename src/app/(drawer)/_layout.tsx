import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../../components/CustomDrawer";
import { useThemeStore } from "../../store/useThemeStore";

export default function DrawerLayout() {
    const { theme } = useThemeStore();

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: theme === "dark" ? "#222" : "#FAA95E" },
                headerTintColor: "#fff",
                drawerActiveTintColor: "#FAA95E",
                drawerInactiveTintColor: theme === "dark" ? "#fff" : "#333",
                drawerStyle: {
                    backgroundColor: theme === "dark" ? "#111" : "#fff",
                },
                drawerLabelStyle: { fontSize: 16 },
            }}
        >
            {/* ====== PRINCIPAIS ====== */}
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "🏠 Início",
                    title: "Planner Financeiro",

                }}
            />

            <Drawer.Screen
                name="charts"
                options={{
                    drawerLabel: "📊 Gráficos",
                    title: "Gráficos Financeiros",

                }}
            />



            <Drawer.Screen
                name="profile"
                options={{
                    drawerLabel: "👤 Perfil",
                    title: "Meu Perfil",

                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: "⚙️ Configurações",
                    title: "Configurações",

                }}
            />

            <Drawer.Screen
                name="investments/textSeparator"
                options={{
                    drawerLabel: "Meus Investimentos",
                    title: "Meus Investimentos",

                }}
            />


            {/* ====== SUBTELAS DE INVESTIMENTOS ====== */}
            <Drawer.Screen
                name="investments/list"
                options={{
                    drawerLabel: "💼 Ver Lançamentos",
                    title: "Meus Lançamentos",
                    drawerItemStyle: { marginLeft: 20 },

                }}
            />

            <Drawer.Screen
                name="investments/index"
                options={{
                    drawerLabel: "➕ Lançar Investimento",
                    title: "Adicionar Lançamento",
                    drawerItemStyle: { marginLeft: 20 },

                }}
            />


            <Drawer.Screen
                name="investments/AddInvestmentModal"
                options={{
                    title: "Adicionar Lançamento",
                    drawerLabel: "➕ Lançar Investimento",
                    drawerItemStyle: { display: "none" }, // 🔥 Oculta do Drawer
                }}
            />

            <Drawer.Screen
                name="investments/[type]"
                options={{
                    title: "Tipo de Investimento",
                    drawerItemStyle: { display: "none" }, // 🔥 Oculta do Drawer
                }}
            />

            <Drawer.Screen
                name="realtime/acoes"
                options={{
                    drawerLabel: "📈 Ações",
                    title: "Ações em Tempo Real",
                }}
            />
            <Drawer.Screen
                name="realtime/fiis"
                options={{
                    drawerLabel: "🏢 Fundos Imobiliários",
                    title: "FIIs em Tempo Real",
                }}
            />
            <Drawer.Screen
                name="realtime/cripto"
                options={{
                    drawerLabel: "💰 Criptomoedas",
                    title: "Cripto em Tempo Real",
                }}
            />


        </Drawer>
    );
}
