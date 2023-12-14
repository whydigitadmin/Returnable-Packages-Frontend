import React, { useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiSettings } from "react-icons/ci";
import AddDelivery from "./AddDelivery";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function DeliveryChalleonVendors() {
  const [addDelivery, setAddDelivery] = React.useState(false);
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
        accessorKey: "branch",
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
        accessorKey: "salesOrderID",
        header: "Sales Order ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "warehouseFrom",
        header: "Warehouse(From)",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "vendorTo",
        header: "Vendor(To)",
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
        accessorKey: "Action",
        header: "Action",
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

  const handleAddDelivery = () => {
    setAddDelivery(true);
  };

  const handleBack = () => {
    setAddDelivery(false);
  };
  return (
    <>
      {addDelivery ? (
        <AddDelivery addDelivery={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <h1 className="text-2xl font-semibold">Delivery Challan Vendors</h1>
          <div className="flex justify-end mt-4">
            <div className="flex justify-start gap-x-2">
              <button
                type="button"
                onClick={handleAddDelivery}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add Delivery Challan Vendors
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

export default DeliveryChalleonVendors;
