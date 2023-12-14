import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
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

function Allotment() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);

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
        accessorKey: "transactionNo",
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
        accessorKey: "date",
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
        accessorKey: "warehouse",
        header: "Warehouse",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "customer",
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
        accessorKey: "city",
        header: "City",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "vehicleNumber",
        header: "Vehicle Number",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "totalAmount",
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
        accessorKey: "status",
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
              <button
                type="button"
                onClick={handleAddOpen}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add Allotment
              </button>
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
            <div className="mt-2">
              <MaterialReactTable table={table} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Allotment;
