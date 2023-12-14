import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function CommercialProposal() {
  const [data, setData] = React.useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Lead No",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "sCSNo",
        header: "SCS No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "senderReceiver",
        header: "Sender Receiver",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "tripCost",
        header: "Trip Cost",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "action",
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

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="flex justify-end mt-2">
          <div className="flex justify-start gap-x-2">
            <button type="button" class="btn btn-secondary btn-sm" disabled>
              Merge Commercial Proposal
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-semibold">Commercial Proposal</h1>
        <div className="mt-4">
          <MaterialReactTable table={table} />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="ex1-tabs-2"
        role="tabpanel"
        aria-labelledby="ex1-tab-2"
      >
        Tab 2 content
      </div>
    </>
  );
}

export default CommercialProposal;
