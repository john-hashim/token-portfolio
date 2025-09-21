import Layout from "@/components/layout/Layout";
import { Providers } from "@/providers";
import PortfolioCard from "@/features/portfolio/components/PortfolioCard";
import WatchlistWrapper from "@/features/watchlist/components/WatchlistWrapper";

function App() {
  return (
    <Providers>
      <Layout>
        <div className="p-6">
          <PortfolioCard></PortfolioCard>
          <WatchlistWrapper />
        </div>
      </Layout>
    </Providers>
  );
}

export default App;
