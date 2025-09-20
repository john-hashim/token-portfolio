import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "Purple", value: 25, color: "#9B7EDE" },
  { id: "Pink", value: 5, color: "#FF6B9D" },
  { id: "Green", value: 20, color: "#4ECB71" },
  { id: "Light Blue", value: 15, color: "#5DADE2" },
  { id: "Cyan", value: 25, color: "#1ABC9C" },
  { id: "Orange", value: 30, color: "#F39C12" },
];

export default function PortfolioGraph() {
  return (
    <div style={{ height: "150px"}}>
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