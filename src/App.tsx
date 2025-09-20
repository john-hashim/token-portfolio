import Layout from "@/components/layout/Layout";
import { Providers } from "@/providers";

function App() {
  return (
    <Providers>
      <Layout>
        <div className="p-6">hello</div>
      </Layout>
    </Providers>
  );
}

export default App;
