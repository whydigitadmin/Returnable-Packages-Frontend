import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AddInventoryAdjustments from "./AddInventoryAdjustment";

function InventoryAdjustment() {
  const [addInventoryAdjustments, setAddInventoryAdjustments] =
    React.useState(false);
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
        accessorKey: "referenceNo",
        header: "Reference No",
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
        accessorKey: "noofEntries",
        header: "No of Entries",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "pipelineStatus",
        header: "Pipeline Status",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "quantityAdjusted",
        header: "Quantity Adjusted",
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

  const handleAddAdjustments = () => {
    setAddInventoryAdjustments(true);
  };

  const handleBack = () => {
    setAddInventoryAdjustments(false);
  };
  return (
    <>
      {addInventoryAdjustments ? (
        <AddInventoryAdjustments addInventoryAdjustments={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <h1 className="text-2xl font-semibold">Inventory Adjustments</h1>
          <div className="flex justify-end gap-x-2">
            <button
              type="button"
              onClick={handleAddAdjustments}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Add Inventory Adjustments
            </button>
          </div>
          <div className="mt-4">
            <MaterialReactTable table={table} />
          </div>
        </div>
      )}
    </>
  );
}

export default InventoryAdjustment;
