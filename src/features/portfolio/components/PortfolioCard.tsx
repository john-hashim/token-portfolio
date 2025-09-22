import type { PortfolioItem } from "../types";
import PortfolioGraph from "./PortfolioGraph";

export default function PortfolioCard() {
  const data: PortfolioItem[] = [
    { id: "Bitcoin", value: 25, color: "#9B7EDE", symbol: "BTC" },
    { id: "Ethereum", value: 5, color: "#FF6B9D", symbol: "ETH" },
    { id: "Solana", value: 20, color: "#4ECB71", symbol: "SOL" },
    { id: "Dogecoin", value: 15, color: "#5DADE2", symbol: "DOGE" },
    { id: "Tether", value: 25, color: "#1ABC9C", symbol: "USDT" },
    { id: "XRP", value: 30, color: "#F39C12", symbol: "XRP" },
  ];

  return (
    <div className="bg-bg-secondary rounded-primary p-5 flex flex-wrap">
      <div className="w-full lg:w-3/6">
        <div className="text-text-secondary">Portfolio Total</div>
        <div className="text-5xl mt-4 text-text-primary">$ 500000</div>
        <div className="text-text-secondary text-xs mt-6 lg:mt-20">
          Last Updated: 3:42:12 PM
        </div>
      </div>
      <div className="w-full lg:w-1/6">
        <div className="text-text-secondary mt-10 lg:mt-0">Portfolio Total</div>
        <div className="lg:w-3/4 w-full mt-4 mb-4 lg:mb-0">
          <PortfolioGraph data={data} />
        </div>
      </div>
      <div className="w-full lg:w-2/6">
        {data.map((item) => (
          <div className="w-full flex justify-between mt-3 text-sm">
            <div style={{ color: item.color }}>
              {item.id} (<span>{item.symbol}</span>)
            </div>
            <div className="text-text-secondary">{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
