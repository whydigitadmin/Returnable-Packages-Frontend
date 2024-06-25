import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Kit1",
    "Mon Bud Value": 10,
    "Mon Act Value": 20,
    "Avg retrieval": 15,
    "Bud Cycle time": 25,
    "Avg Cycle Time": 35,
  },
  {
    name: "Kit2",
    "Mon Bud Value": 20,
    "Mon Act Value": 30,
    "Avg retrieval": 25,
    "Bud Cycle time": 35,
    "Avg Cycle Time": 45,
  },
  {
    name: "Kit3",
    "Mon Bud Value": 30,
    "Mon Act Value": 40,
    "Avg retrieval": 35,
    "Bud Cycle time": 45,
    "Avg Cycle Time": 55,
  },
  {
    name: "Kit4",
    "Mon Bud Value": 40,
    "Mon Act Value": 50,
    "Avg retrieval": 45,
    "Bud Cycle time": 55,
    "Avg Cycle Time": 65,
  },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Mon Bud Value" stroke="#8884d8" />
        <Line type="monotone" dataKey="Mon Act Value" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Avg retrieval" stroke="#ffc658" />
        <Line type="monotone" dataKey="Bud Cycle time" stroke="#ff7300" />
        <Line type="monotone" dataKey="Avg Cycle Time" stroke="#387908" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
