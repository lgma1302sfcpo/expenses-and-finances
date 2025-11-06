import RealTimeList from "../../../../components/RealTimeList";

export default function Acoes() {
    return (
        <RealTimeList
            title="📈 Ações em Tempo Real"
            symbols={["PETR4", "VALE3", "ITUB4", "BBAS3"]}
        />
    );
}
