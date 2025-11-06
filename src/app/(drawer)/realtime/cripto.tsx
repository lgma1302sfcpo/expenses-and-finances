import RealTimeList from "../../../../components/RealTimeList";

export default function Cripto() {
    return (
        <RealTimeList
            title="💰 Criptomoedas"
            symbols={["BTC-USD", "ETH-USD", "SOL-USD"]}
        />
    );
}
