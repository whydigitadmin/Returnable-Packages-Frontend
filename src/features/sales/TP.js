import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function TechnicalProposals() {
  const [data, setData] = React.useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "TP ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "sCSID",
        header: "SCS ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "partName",
        header: "Part Name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "client",
        header: "Client",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "solutionRequired",
        header: "Solution Required",
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
        <h1 className="text-2xl font-semibold">Technical Proposals</h1>
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

export default TechnicalProposals;
