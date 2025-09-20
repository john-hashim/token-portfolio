import Layout from "@/components/layout/Layout";
import { Providers } from "@/providers";
import PortfolioCard from "@/features/portfolio/components/PortfolioCard";

function App() {
  return (
    <Providers>
      <Layout>
        <div className="p-6">
          <PortfolioCard></PortfolioCard>
        </div>
      </Layout>
    </Providers>
  );
}

export default App;
