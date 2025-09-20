import PortfolioGraph from "./PortfolioGraph";

export default function PortfolioCard() {
  return (
    <div className="bg-bg-secondary rounded-primary p-5 flex flex-wrap">
      <div className="w-full lg:w-3/6">
        <div className="text-text-secondary">Portfolio Total</div>
        <div className="text-5xl mt-4 text-text-primary">$ 500000</div>
        <div className="text-text-secondary text-xs mt-4 lg:mt-28">
          Last Updated:
        </div>
      </div>
      <div className="w-full lg:w-1/6">
        <div className="text-text-secondary mt-6 lg:mt-0">Portfolio Total</div>
        <div className="w-3/4 mt-4">
          <PortfolioGraph />
        </div>
      </div>
      <div className="w-full lg:w-2/6"></div>
    </div>
  );
}
