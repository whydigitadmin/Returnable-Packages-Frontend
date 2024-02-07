import React, { useState } from "react";

const BILLS = [
  {
    kitno: "1075",
    part: "PISTON",
    partno: "ABC1234",
    emitter: "GABRIAL CHENNAI",
    receiver: "TATA PUNE",
    receivingblock: " Q BLOCK",
    poolsize: "50",
    s_in_hand: "10",
    s_in_flow: "35",
    missing_stock: "5",
  },
];

function KitReport() {
  const [bills, setBills] = useState(BILLS);
  const [openSection, setOpenSection] = useState(null);

  const handlePoolSize = () => {
    setOpenSection("poolSize");
  };
  const handleHandStock = () => {
    setOpenSection("handStock");
  };
  const handleFlowStock = () => {
    setOpenSection("flowStock");
  };

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
                        <td
                          className="text-center text-sky-500 cursor-pointer"
                          style={{ color: "#0eade5" }}
                          onClick={handlePoolSize}
                        >
                          {l.poolsize}
                        </td>
                        <td
                          className="text-center text-sky-500 cursor-pointer"
                          style={{ color: "#0eade5" }}
                          onClick={handleHandStock}
                        >
                          {l.s_in_hand}
                        </td>
                        <td
                          className="text-center text-sky-500 cursor-pointer"
                          style={{ color: "#0eade5" }}
                          onClick={handleFlowStock}
                        >
                          {l.s_in_flow}
                        </td>
                        <td className="text-center">{l.missing_stock}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {openSection === "poolSize" && (
            <div className="card bg-base-100 shadow-xl p-6 mt-3">
              <div className="d-flex flex-row mb-3">
                <div className="text-xl font-semibold me-2 mt-1">
                  Pool Size<span className="text-2xl font-bold mx-2">50</span>
                  (INSERT/CUSTOMIZED)
                </div>
              </div>
              <div className="">
                <p className="mb-2">GRN:1234 / Date: 01-JAN-2024 / 30 qty</p>
                <p className="mb-2">GRN:1235 / Date: 20-JAN-2024 / 10 qty</p>
                <p className="mb-2">GRN:1236 / Date: 05-FEB-2024 / 10 qty</p>
              </div>
            </div>
          )}
          {openSection === "handStock" && (
            <div className="card bg-base-100 shadow-xl p-6 mt-3">
              <div className="d-flex flex-row mb-3">
                <div className="text-xl font-semibold me-2 mt-1">
                  Stock In Hand
                </div>
                <div className="text-2xl font-bold">10</div>
              </div>
              <div className="d-flex justify-content-center">
                <div class="rounded-xl">
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500">
                      STOCK IN HAND 10
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center" style={{ height: 30 }}>
                <div class="vr"></div>
              </div>
              <div class="d-flex justify-content-center">
                <hr className="font-bold w-4/12"></hr>
              </div>
              <div class="d-flex justify-content-center">
                <div class="d-flex justify-content-between w-4/12">
                  <div class="vr"></div>
                  <div class="vr"></div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div className="d-flex justify-content-between w-50">
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      Pune W/h: 3
                    </div>
                  </div>
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      Chennai W/h: 2
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-7/12">
                <div
                  class="d-flex justify-content-center"
                  style={{ height: 30 }}
                >
                  <div class="vr"></div>
                </div>
                <div class="d-flex justify-content-center">
                  <hr className="font-bold w-8/12"></hr>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="d-flex justify-content-between w-8/12">
                    <div class="vr"></div>
                    <div class="vr"></div>
                    <div class="vr"></div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <div className="d-flex justify-content-between w-75">
                    <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                      <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                        Issuable: 1
                      </div>
                    </div>
                    <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                      <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                        Scrap: 1
                      </div>
                    </div>
                    <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                      <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                        Repair: 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center" style={{ height: 30 }}>
                <div class="vr me-5"></div>
              </div>
              <div class="d-flex justify-content-center">
                <hr className="font-bold w-3/12"></hr>
              </div>
              <div class="d-flex justify-content-center">
                <div class="d-flex justify-content-between w-3/12">
                  <div class="vr"></div>
                  <div class="vr"></div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div className="d-flex justify-content-between w-4/12">
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      Date: 01-Jan-24
                      <br />
                      Rev. Loss days:20
                    </div>
                  </div>
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      Declared by:
                      <br />
                      Hari
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {openSection === "flowStock" && (
            <div className="card bg-base-100 shadow-xl p-6 mt-3">
              <div className="d-flex flex-row mb-3">
                <div className="text-xl font-semibold me-2 mt-1">
                  Stock In Flow
                </div>
                <div className="text-2xl font-bold">35</div>
              </div>
              <div className="d-flex justify-content-center">
                <div class="rounded-xl">
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500">
                      STOCK IN FLOW 35
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center" style={{ height: 30 }}>
                <div class="vr"></div>
              </div>
              <div class="d-flex justify-content-center">
                <hr className="font-bold w-8/12"></hr>
              </div>
              <div class="d-flex justify-content-center">
                <div class="d-flex justify-content-between w-8/12">
                  <div class="vr"></div>
                  <div class="vr ms-5"></div>
                  <div class="vr ms-5"></div>
                  <div class="vr"></div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div className="d-flex justify-content-between w-9/12">
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      Emitter: 10
                    </div>
                  </div>
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      Intransit: 10
                    </div>
                  </div>
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      OEM: 10
                    </div>
                  </div>
                  <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                    <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                      Empty: 5
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-10/12">
                <div
                  class="d-flex justify-content-center"
                  style={{ height: 30 }}
                >
                  <div class="vr"></div>
                </div>
                <div class="d-flex justify-content-center">
                  <hr className="font-bold w-4/12"></hr>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="d-flex justify-content-between w-4/12">
                    <div class="vr"></div>
                    <div class="vr"></div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <div className="d-flex justify-content-between w-6/12">
                    <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                      <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                        Emitter O/W 5 Qty
                      </div>
                    </div>
                    <div class="font-mono text-white text-sm text-center font-bold rounded-lg">
                      <div class="p-2 rounded-lg shadow-lg bg-sky-500 text-left">
                        RPSP Transfer 5 Qty
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default KitReport;
