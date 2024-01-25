import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";

const BILLS = [
  {
    assetCode: "2001",
    assetName: "15/01/2024",
    dayOpening: "20",
    dayEmpty: "10",
    dayRetrieval: "10",
    dayClosing: "20",
    lastRetrieval: "15/01/2024",
  },
];
export const EmptyRetrievalManifest = () => {
  const [bills, setBills] = useState(BILLS);

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-5 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 14 }}
                  />
                  <h4 className="text-xl font-semibold pt-1 mt-2 ms-1 mb-2">
                    Location -
                  </h4>
                  <h4 className="text-2xl font-semibold ms-1 mt-2">Gabriel</h4>
                </div>
              </div>
              <p className="mb-3">
                29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                Pune, Maharashtra, 410501 India
              </p>
            </div>
            <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 70 }}
              />
            </div>
            <div className="col-lg-5 card bg-base-100 shadow-xl ms-2 mt-3">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  />
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-1 mb-2">
                    Flow To -
                  </h4>
                  <select className="form-select w-56 h-10 mt-1 mb-2">
                    <option value="Tata Motors-Pune">Tata Motors-Pune</option>
                    <option value="Tata Motors-Chennai">
                      Tata Motors-Chennai
                    </option>
                    <option value="Tata Motors-Mumbai">
                      Tata Motors-Mumbai
                    </option>
                  </select>
                </div>

                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1 mb-2">
                  Tata Motors- Pune
                </h4>
                <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
          </div>
          <div
            className="w-full p-6 bg-base-100 shadow-xl"
            style={{ borderRadius: 16 }}
          >
            <div className="text-xl font-semibold">
              Empty Retrieval Manifest
            </div>
            <div className="divider mt-2"></div>
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ECM NO</th>
                    <th>ECM DATE</th>
                    {/* <th>Day Opening Stock</th>
                    <th>Day Empty Stock</th>
                    <th>Day Retrieval Stock</th>
                    <th>Day closing Stock</th>
                    <th>Last Retrieval Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {bills.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>{l.assetCode}</td>
                        <td>{l.assetName}</td>
                        {/* <td>{l.dayOpening}</td>
                        <td>{l.dayEmpty}</td>
                        <td>{l.dayRetrieval}</td>
                        <td>{l.dayClosing}</td>
                        <td>{l.lastRetrieval}</td> */}
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
};
