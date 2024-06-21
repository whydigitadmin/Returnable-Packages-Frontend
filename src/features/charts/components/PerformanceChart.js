import React, { useState } from "react";

import TitleCard from "../../../components/Cards/TitleCard";
import MonthlyPerformanceChart from "./MonthlyChart";
import QuarterlyPerformanceChart from "./QuaterlyChart";

function PerformanceCharts() {
  const [showQuarterly, setShowQuarterly] = useState(true);

  const handleToggle = () => {
    setShowQuarterly(!showQuarterly);
  };

  return (
    <TitleCard title="Performance Charts" style={{ borderRadius: "10px" }}>
      <div style={{ width: "380px", height: "300px", margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button onClick={handleToggle}>
            {showQuarterly
              ? "Show Monthly Performance"
              : "Show Quarterly Performance"}
          </button>
        </div>
        {showQuarterly ? (
          <QuarterlyPerformanceChart />
        ) : (
          <MonthlyPerformanceChart />
        )}
      </div>
    </TitleCard>
  );
}

export default PerformanceCharts;
