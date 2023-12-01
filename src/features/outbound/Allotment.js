import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiSettings } from "react-icons/ci";
import DashBoardComponent from "../master/DashBoardComponent";
import { GoArrowSwitch } from "react-icons/go";
import { FaTruck } from "react-icons/fa";
import { FaHands } from "react-icons/fa";
import AddAllotment from "./AddAllotment";
const statsData = [
  {
    title: "Material Request",
    value: "0",
    icon: <GoArrowSwitch className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Allotments",
    value: "0",
    icon: <FaTruck className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Delivered",
    value: "0",
    icon: <FaHands className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Pending",
    value: "0",
    icon: <FaTruck className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
];
const columns = [
  { field: "id", headerName: "Sr. No", width: 70 },
  { field: "TransactionNo", headerName: "Transaction No", width: 100 },
  { field: "Date", headerName: "Date", width: 80 },
  { field: "Warehouse", headerName: "Warehouse", width: 100 },
  { field: "Customer", headerName: "Customer", width: 100 },
  { field: "City", headerName: "City", width: 90 },
  { field: "VehicleNumber", headerName: "Vehicle Number", width: 100 },
  { field: "TotalAmount", headerName: "Total Amount", width: 90 },
  { field: "Status", headerName: "Status", width: 90 },
];

const rows = [
  {
    id: 1,
    TransactionNo: "texas",
    Date: "Snow",
    Warehouse: "123",
    Customer: "Jon",
    City: "Active",
    VehicleNumber: "TN",
    TotalAmount: "Active",
    Status: "Active",
  },
];

function Allotment() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
  };

  return (
    <>
      {add ? (
        <AddAllotment addAllotment={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>
          <h1 className="text-2xl font-semibold mt-4">Allotment</h1>
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
                    className="bg-blue h-fit relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
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
              <button
                type="button"
                onClick={handleAddOpen}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add Allotment
              </button>
              <CiSettings className="cursor-pointer flex mt-0.5 h-[32px] w-[32px] justify-center rounded-lg bg-white text-center shadow shadow-black/10 dark:shadow-black/40" />
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
                  Issued
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
                  Delivered
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
              >
                <div
                  className="tab-pane fade"
                  id="ex1-tabs-2"
                  role="tabpanel"
                  aria-labelledby="ex1-tab-2"
                >
                  Tab 2 content
                </div>
              </div>
            </div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Allotment;
