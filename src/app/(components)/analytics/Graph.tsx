import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
interface GraphData {
  date: string;
  v: number;
}
interface GraphProp {
  GraphData: GraphData[];
}
const Graph = ({ GraphData }: GraphProp) => {
  console.log(GraphData);

  const [activeLabel, setActiveLabel] = useState(null);

  const handleMouseMove = (state: any) => {
    if (state.activePayload) {
      setActiveLabel(state.activePayload[0].payload.date);
    }
  };

  const handleMouseLeave = () => {
    setActiveLabel(null);
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <ResponsiveContainer height={"70%"} width={"95%"}>
        <LineChart
          data={GraphData}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid stroke="#27272a" vertical={false} />
          <Line
            type="monotone"
            dataKey="v"
            stroke="#b3b3b3"
            dot={false}
            strokeWidth={1.1}
          />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => (value === activeLabel ? value : "")}
          />
          <Tooltip
            cursor={{ stroke: "#8884d8", strokeWidth: 1 }}
            content={<CustomTooltip />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "hsl(var(--item))",
          border: "2px solid hsl(var(--accent))",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>{`Date: ${payload[0].payload.date}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

<Tooltip content={<CustomTooltip />} />;

export default Graph;
