import React, { useEffect, useMemo } from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { FaHands } from "react-icons/fa";
import DashBoardComponent from "../master/DashBoardComponent";
import { styled } from "@mui/material/styles";
import AddReturn from "./AddReturn";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const statsData = [
  {
    title: "Return Docket",
    value: "0",
    icon: <IoMdRefresh className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Instransit",
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
    title: "DEPS",
    value: "0",
    icon: <GoAlertFill className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
];

const columns = [
  { field: "id", headerName: "Sr. No", width: 110 },
  { field: "TransactionNo", headerName: "Transaction No", width: 110 },
  { field: "Date", headerName: "Date", width: 130 },
  { field: "Branch", headerName: "Branch", width: 110 },
  { field: "customer", headerName: "customer", width: 120 },
  { field: "TransportVendor", headerName: "Transport Vendor", width: 120 },
  { field: "TotalAmount", headerName: "Total Amount", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
];

const rows = [
  {
    id: 1,
    TransactionNo: "Snow",
    TransactionType: "Jon",
    Date: "texas",
    Branch: "texas",
    customer: "123",
    TransportVendor: "TN",
    TotalAmount: "IND",
    status: "Active",
  },
];
function Return() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);

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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Sr. No",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "Transaction No",
        header: "Transaction No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Date",
        header: "Date",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Branch",
        header: "Branch",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Customer",
        header: "Customer",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Transport Vendor",
        header: "Transport Vendor",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Total Amount",
        header: "Total Amount",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Status",
        header: "Status",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <>
      {add ? (
        <AddReturn addReturn={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>
          <div className="">
            <h1 className="text-2xl font-semibold mt-4">Return</h1>
            <div className="flex justify-end mt-4">
              <div className="flex justify-start gap-x-2">
                <button
                  type="button"
                  onClick={handleAddOpen}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Add Return
                </button>
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
                <div className="">
                  <MaterialReactTable table={table} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Return;
