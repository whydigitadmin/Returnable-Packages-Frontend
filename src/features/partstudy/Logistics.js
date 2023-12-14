import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AddLogistics from "./AddLogistics";
const columns = [
  { field: "id", headerName: "Sr. No", width: 90 },
  { field: "AvgLotSize", headerName: "Avg Lot Size", width: 160 },
  { field: "DispatchFrequency", headerName: "Dispatch Frequency", width: 120 },
  { field: "DispatchTo", headerName: "Dispatch To", width: 180 },
  { field: "TransportationTo", headerName: " Transportation To", width: 120 },
];

const data = [
  {
    id: 1,
    AvgLotSize: "EMP001",
    DispatchFrequency: "John",
    DispatchTo: "John@gmail.com",
    TransportationTo: "9087654321",
  },
];

function Logistics() {
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Sr No",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "avglotsize",
        header: "Avg Lot Size",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "dispatchto",
        header: "Dispatch To",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "transportationto",
        header: "Transportation To",
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
        <AddLogistics addlogistics={handleBack} />
      ) : (
        <div className="">
          <h1 className="text-2xl font-semibold mt-4">Logistics</h1>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleAddOpen}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Add Logistics
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

export default Logistics;
