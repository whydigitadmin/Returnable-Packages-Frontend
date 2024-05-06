import * as React from "react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { Link } from "react-router-dom";

function Reports() {
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        {/* <h1 className="text-2xl font-semibold ms-5">Reports</h1>
        <hr /> */}
        <div className="row">
          {/* MASTERS */}
          {/* <div className="col-sm-4">
            <h4 className="text-2xl font-semibold mt-4 mb-3">Masters</h4>

            <ul>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                Item
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                ItemGroups
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                Flows
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                Warehouse
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                Vendors
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                Customer
              </li>
            </ul>
          </div> */}

          {/* <div className="col-sm-4">
            <h4 className="text-2xl font-semibold mt-4 mb-3">Inbound</h4>
            <ul>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                GRN
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                EmptyStock
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                Return
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                Relocation
              </li>
              <li className="d-flex flex-row mb-3">
                <LuFileSpreadsheet className="mt-1 me-1" />
                CycleTime
              </li>
            </ul>
          </div> */}
          <div className="col-sm-4">
            <div>
              <h4 className="text-2xl font-semibold mb-3">Admin</h4>
              <ul>
                <li className="d-flex flex-row mb-3 ">
                  <LuFileSpreadsheet className="mt-1 me-1" />
                  <Link to="/app/allotmentreport">Allotment</Link>
                </li>
                <li className="d-flex flex-row mb-3 ">
                  <LuFileSpreadsheet className="mt-1 me-1" />
                  <Link to="/app/assettaggingreport">Asset Tagging</Link>
                </li>
                <li className="d-flex flex-row mb-3">
                  <LuFileSpreadsheet className="mt-1 me-1" />
                  MaterialRequest
                </li>
                <li className="d-flex flex-row mb-3">
                  <LuFileSpreadsheet className="mt-1 me-1" />
                  DC-Outward
                </li>
                <li className="d-flex flex-row mb-3">
                  <LuFileSpreadsheet className="mt-1 me-1" />
                  DC-Expense
                </li>
                <li className="d-flex flex-row mb-3">
                  <LuFileSpreadsheet className="mt-1 me-1" />
                  DC-Lead
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
