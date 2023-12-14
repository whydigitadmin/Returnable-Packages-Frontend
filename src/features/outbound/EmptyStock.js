import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import DashBoardComponent from "../master/DashBoardComponent";
import { styled } from "@mui/material/styles";
import AddEmptystock from "./AddEmptyStock";
const statsData = [
  {
    title: "Outward",
    value: "0",
    icon: <FaSignOutAlt className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "Empty",
    value: "0",
    icon: <FaCheckToSlot className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "Return",
    value: "0",
    icon: <IoPaperPlaneOutline className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "Balance",
    value: "0",
    icon: <IoMdCloseCircleOutline className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
];

function EmptyStock() {
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
        accessorKey: "Transactiondate",
        header: "Transaction Date",
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
  return (
    <>
      {add ? (
        <AddEmptystock addEmptystock={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>
          <h1 className="text-2xl font-semibold mt-4">Empty Stock</h1>
          <div className="flex justify-end mt-4">
            <div className="flex justify-start gap-x-2">
              <button
                type="button"
                onClick={handleAddOpen}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add Empty Stock
              </button>
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
export default EmptyStock;
