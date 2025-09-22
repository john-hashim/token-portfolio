import { ResponsivePie } from "@nivo/pie";
import type { PortfolioItem } from "../types";

export default function PortfolioGraph({ data }: { data: PortfolioItem[] }) {
  return (
    <div style={{ height: "150px" }}>
      <ResponsivePie
        data={data}
        colors={{ datum: "data.color" }}
        innerRadius={0.45}
        cornerRadius={0}
        borderWidth={1}
        borderColor="#fff"
        enableArcLabels={false}
        enableArcLinkLabels={false}
      />
    </div>
  );
}
