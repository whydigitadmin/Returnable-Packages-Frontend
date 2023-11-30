import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaWeightHanging } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import DashBoardComponent from "../master/DashBoardComponent";

const statsData = [
  {
    title: "PO qty",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "ASN Created",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "ASN arriving today",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "ASN In transit",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
];

const columns = [
  { field: "id", headerName: "Sr. No", width: 110 },
  { field: "ASN Number", headerName: "ASN Number", width: 110 },
  { field: "Transaction Type", headerName: "Transaction Type", width: 130 },
  { field: "Transaction ID", headerName: "Transaction ID", width: 110 },
  { field: "Origin", headerName: "Origin", width: 120 },
  { field: "Destination", headerName: "Destination", width: 120 },
  { field: "Dispatched", headerName: "Dispatched", width: 120 },
  { field: "ETA", headerName: "ETA", width: 100 },
  { field: "Status", headerName: "Status", width: 100 },
];

const rows = [
  {
    id: 1,
    ASNNumber: "Snow",
    TransactionType: "Jon",
    TransactionId: "texas",
    origin: "123",
    Destination: "TN",
    Dispatched: "IND",
    ETA: "Active",
    Status: "Active",
  },
];

function ASN() {
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
          {statsData.map((d, k) => {
            return <DashBoardComponent key={k} {...d} colorIndex={k} />;
          })}
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold mt-4">ASN</h1>
          <div className="flex justify-end mt-4">
            <div className="flex justify-start gap-x-2">
              <div className="w-64">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    type="search"
                    className="relative h-fit m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon1"
                  />

                  <button
                    className="bg-blue h-fit relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <CiSettings className="cursor-pointer flex mt-0.5 h-[32px] w-[32px] justify-center rounded-lg bg-white text-center shadow shadow-black/10 dark:shadow-black/40" />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <ul className="nav nav-tabs" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                href="#ex1-tabs-1"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected="true"
              >
                All
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="ex1-tab-2"
                data-mdb-toggle="tab"
                href="#ex1-tabs-2"
                role="tab"
                aria-controls="ex1-tabs-2"
                aria-selected="false"
              >
                In-Transit
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="ex1-tab-3"
                data-mdb-toggle="tab"
                href="#ex1-tabs-3"
                role="tab"
                aria-controls="ex1-tabs-3"
                aria-selected="false"
              >
                Received
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="ex1-tab-4"
                data-mdb-toggle="tab"
                href="#ex1-tabs-4"
                role="tab"
                aria-controls="ex1-tabs-4"
                aria-selected="false"
              >
                Returned
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Cancelled
              </a>
            </li>
          </ul>
          <div className="tab-content" id="ex1-content">
            <div
              className="tab-pane fade show active"
              id="ex1-tabs-1"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            ></div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} className="bg-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ASN;
