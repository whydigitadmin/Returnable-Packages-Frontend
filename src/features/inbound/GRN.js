import React, { useEffect, useMemo } from "react";
import { FaCheckToSlot } from "react-icons/fa6";
import DashBoardComponent from "../master/DashBoardComponent";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const statsData = [
  {
    title: "ASN",
    value: "0",
    icon: <FaCheckToSlot className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "GRN",
    value: "0",
    icon: <FaCheckToSlot className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Pending GRN",
    value: "0",
    icon: <FaCheckToSlot className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Average Item Per GRN",
    value: "0",
    icon: <FaCheckToSlot className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
];

function GRN() {
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
        accessorKey: "GRN NO",
        header: "GRN NO",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Txn&po No",
        header: "Txn&po No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "GRN Date",
        header: "GRN Date",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Inward Date",
        header: "Inward Date",
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
        accessorKey: "Employee Assigned",
        header: "Employee Assigned",
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
      <div>
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
          {statsData.map((d, k) => {
            return <DashBoardComponent key={k} {...d} colorIndex={k} />;
          })}
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold mt-4">GRN</h1>
        </div>
        <div className="mt-4">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </>
  );
}

export default GRN;
