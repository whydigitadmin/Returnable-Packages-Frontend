import React, { useEffect, useState } from "react";

const ratioData = [
  { id: 1, title: "Allotment vs Request (Files)", value1: 40, value2: 60 },
  {
    id: 2,
    title: "Bin's Allotted vs Bin's Request (Bins)",
    value1: 80,
    value2: 20,
  },
  { id: 3, title: "Actual vs Agreed.(days)", value1: 30, value2: 40 },
];

function RatioComponent() {
  const [ratios, setRatios] = useState(
    ratioData.map(() => ({ ratio1: 0, ratio2: 0 }))
  );

  useEffect(() => {
    ratioData.forEach((data, index) => {
      const ratio1 = (data.value1 / (data.value1 + data.value2)) * 100;
      const ratio2 = (data.value2 / (data.value1 + data.value2)) * 100;
      let currentRatio1 = 0;
      let currentRatio2 = 0;

      const interval = setInterval(() => {
        currentRatio1 += ratio1 / 100; // Increment by 1% of the total ratio
        currentRatio2 += ratio2 / 100;

        setRatios((prevRatios) => {
          const newRatios = [...prevRatios];
          newRatios[index] = {
            ratio1: Math.min(currentRatio1, ratio1),
            ratio2: Math.min(currentRatio2, ratio2),
          };
          return newRatios;
        });

        if (currentRatio1 >= ratio1 && currentRatio2 >= ratio2) {
          clearInterval(interval);
        }
      }, 15); // Adjust the interval time for smoother or faster animation
    });
  }, []);

  return (
    <div className="space-y-4 bg-white border rounded-lg overflow-hidden shadow-md p-2 mb-3">
      {ratioData.map((data, index) => (
        <div key={data.id}>
          <h3 className="text-sm font-semibold mb-2">{data.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 text-blue-800 font-semibold text-sm py-1 px-3 rounded-full">
                {ratios[index].ratio1.toFixed(0)}%
              </div>
              <div className="text-md font-semibold text-gray-700">vs</div>
              <div className="bg-green-100 text-green-800 font-semibold text-sm py-1 px-3 rounded-full">
                {ratios[index].ratio2.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RatioComponent;
