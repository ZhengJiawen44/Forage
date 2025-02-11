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
  date: Date;
  value: string;
}
interface GraphProp {
  GraphData: GraphData[];
}
const Graph = () => {
  const [activeLabel, setActiveLabel] = useState(null);

  const data = [
    { date: "1 jan", v: 1 },
    { date: 2 + " Jan", v: 3 },
    { date: 3 + " Jan", v: 1 },
    { date: 4 + " Jan", v: 5 },
    { date: 5 + " Jan", v: 6 },
    { date: 6 + " Jan", v: 7 },
    { date: 7 + " Jan", v: 4 },
    { date: 8 + " Jan", v: 3 },
    { date: 9 + " Jan", v: 5 },
    { date: 10 + " Jan", v: 6 },
    { date: 11 + " Jan", v: 7 },
    { date: 12 + " Jan", v: 8 },
    { date: 13 + " Jan", v: 9 },
    { date: 14 + " Jan", v: 7 },
    { date: 15 + " Jan", v: 6 },
    { date: 16 + " Jan", v: 2 },
    { date: 17 + " Jan", v: 5 },
    { date: 18 + " Jan", v: 5 },
    { date: 19 + " Jan", v: 6 },
    { date: 20 + " Jan", v: 7 },
    { date: 21 + " Jan", v: 2 },
    { date: 22 + " Jan", v: 3 },
    { date: 23 + " Jan", v: 4 },
    { date: 24 + " Jan", v: 6 },
    { date: 25 + " Jan", v: 8 },
    { date: 26 + " Jan", v: 3 },
    { date: 27 + " Jan", v: 4 },
    { date: 28 + " Jan", v: 7 },
    { date: 29 + " Jan", v: 2 },
    { date: 30 + " Jan", v: 5 },
  ];
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
          data={data}
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
