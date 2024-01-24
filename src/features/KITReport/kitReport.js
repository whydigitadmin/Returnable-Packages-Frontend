import React, { useState } from "react";

const BILLS = [
  {
    kitno: "1075",
    part: "PISTON",
    partno: "ABC1234",
    emitter: "GABRIAL CHENNAI",
    receiver: "TATA PUNE",
    receivingblock: "18-01-2024",
    poolsize: "50",
    s_in_hand: "10",
    s_in_flow: "5",
    missing_stock: "5",
  },
];

function KitReport() {
  const [bills, setBills] = useState(BILLS);
  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div
            className="w-full p-6 bg-base-100 shadow-xl"
            style={{ borderRadius: 16 }}
          >
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>KIT</th>
                    <th>PART</th>
                    <th>PART NO</th>
                    <th>EMITTER</th>
                    <th>RECEIVER</th>
                    <th>RECEIVER BLOCK</th>
                    <th>POOL SIZE</th>
                    <th>STOCK-IN-HAND</th>
                    <th>STOCK-IN-FLOW</th>
                    <th>MISSING STOCK</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>{l.kitno}</td>
                        <td>{l.partno}</td>
                        <td>{l.part}</td>
                        <td>{l.emitter}</td>
                        <td>{l.receiver}</td>
                        <td>{l.receivingblock}</td>
                        <td className="text-center">{l.poolsize}</td>
                        <td className="text-center">{l.s_in_hand}</td>
                        <td className="text-center">{l.s_in_flow}</td>
                        <td className="text-center">{l.missing_stock}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KitReport;
