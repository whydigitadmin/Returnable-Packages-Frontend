import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiSettings } from "react-icons/ci";
import AddInventoryAdjustments from "./AddInventoryAdjustment";

const columns = [
  { field: "id", headerName: "Sr. No", width: 130 },
  { field: "ReferenceNo", headerName: "Reference No", width: 130 },
  { field: "Date", headerName: "Date", width: 130 },
  { field: "Warehouse", headerName: "Warehouse", width: 130 },
  { field: "NoofEntries", headerName: "No of Entries", width: 130 },
  { field: "PipelineStatus", headerName: "Pipeline Status", width: 130 },
  { field: "QuantityAdjusted", headerName: "Quantity Adjusted", width: 130 },
];

const rows = [
  {
    id: 1,
    ReferenceNo: "1",
    Date: "11-11-11",
    Warehouse: "texas",
    NoofEntries: "123",
    PipelineStatus: "yes",
    QuantityAdjusted: "Active",
  },
];

function InventoryAdjustment() {
  const [addInventoryAdjustments, setAddInventoryAdjustments] =
    React.useState(false);

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
            <CiSettings className="cursor-pointer flex mt-0.5 h-[32px] w-[32px] justify-center rounded-lg bg-white text-center shadow shadow-black/10 dark:shadow-black/40" />
          </div>
          <div style={{ height: 400, width: "100%", marginTop: 30 }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      )}
    </>
  );
}

export default InventoryAdjustment;
