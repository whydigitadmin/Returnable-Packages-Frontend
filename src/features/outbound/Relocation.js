import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { GoArrowSwitch } from "react-icons/go";
import { FaTruck } from "react-icons/fa";
import { FaHands } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import DashBoardComponent from "../master/DashBoardComponent";
import AddRelocation from "./AddRelocation";
const statsData = [
  {
    title: "Relocation Docket",
    value: "0",
    icon: <GoArrowSwitch className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "Intransit",
    value: "0",
    icon: <FaTruck className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "Delivered",
    value: "0",
    icon: <FaHands className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "DEPS",
    value: "0",
    icon: <IoIosWarning className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
];

function Relocation() {
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
        accessorKey: "branchTo",
        header: "Branch(To)",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "branchFrom",
        header: "Branch(From)",
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

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
  };
  return (
    <>
      {add ? (
        <AddRelocation addRelocation={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="grid lg:grid-cols-4  mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>
          <div className="">
            <h1 className="text-2xl font-semibold mt-4">Relocation</h1>
            <div className="flex justify-end mt-4">
              <div className="flex justify-start gap-x-2">
                <button
                  type="button"
                  onClick={handleAddOpen}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Add Relocation
                </button>
              </div>
            </div>
            <div className="mt-4">
              <MaterialReactTable table={table} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Relocation;
