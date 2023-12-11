import React, { useEffect, useMemo } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaCheckToSlot } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import DashBoardComponent from "../master/DashBoardComponent";
import AddPurchaseOrder from "./AddPurchaseOrder";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const statsData = [
  {
    title: "PO Issued",
    value: "0",
    icon: <FaRegShareFromSquare className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "PO Accepted",
    value: "0",
    icon: <FaCheckToSlot className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "PO Dispatched",
    value: "0",
    icon: <FaTelegramPlane className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "PO Rejected",
    value: "",
    icon: <IoCloseCircle className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
];

function PurchaseOrder() {
  const [addPurchase, setAddFlows] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleAddPurchase = () => {
    setAddFlows(true);
  };

  const handleBack = () => {
    setAddFlows(false);
  };

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
        accessorKey: "PO Number",
        header: "PO Number",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Vendor Name",
        header: "Vendor Name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "PO Date",
        header: "PO Date",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Warehouse",
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
        accessorKey: "Amount",
        header: "Amount",
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
        header: "status",
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
      {addPurchase ? (
        <AddPurchaseOrder addPurchase={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>
          <div className="">
            <h1 className="text-2xl font-semibold mt-4">Purchase Order</h1>
            <div className="flex justify-end mt-4">
              <div className="flex justify-start gap-x-2">
                <button
                  type="button"
                  onClick={handleAddPurchase}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Add Purchase Order
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <MaterialReactTable table={table} />
          </div>
        </div>
      )}
    </>
  );
}

export default PurchaseOrder;
