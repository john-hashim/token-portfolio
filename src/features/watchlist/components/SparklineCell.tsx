import { ResponsiveLine } from '@nivo/line';

export default function SparklineCell({ data }: { data: number[] }) {

  const chartData = [
    {
      id: 'price',
      data: data.map((value, index) => ({
        x: index,
        y: value
      }))
    }
  ];

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);


  const initialValue = data[0];
  const finalValue = data[data.length - 1];
  const isPositive = finalValue >= initialValue;
  const lineColor = isPositive ? '#10b981' : '#ef4444'; // green-500 : red-500

  return (
    <div className="w-24 h-10">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
        xScale={{ type: 'linear' }}
        yScale={{
          type: 'linear',
          min: minValue * 0.995,
          max: maxValue * 1.005,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.1}
        colors={[lineColor]}
        lineWidth={1}
      />
    </div>
  );
};