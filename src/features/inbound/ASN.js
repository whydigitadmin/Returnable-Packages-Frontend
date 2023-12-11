import React, { useEffect, useMemo } from "react";
import { FaWeightHanging } from "react-icons/fa";
import DashBoardComponent from "../master/DashBoardComponent";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const statsData = [
  {
    title: "PO qty",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "ASN Created",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "ASN arriving today",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
  {
    title: "ASN In transit",
    value: "0",
    icon: <FaWeightHanging className="w-5 h-5 text-white dashicon-sm" />,
    description: "↗︎ %increase",
  },
];

function ASN() {

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
        accessorKey: "ASN Number",
        header: "ASN Number",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Transaction Type",
        header: "Transaction Type",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Transaction ID",
        header: "Transaction ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Origin",
        header: "Origin",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Destination",
        header: "Destination",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Dispatched",
        header: "Dispatched",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "ETA",
        header: "ETA",
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
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
          {statsData.map((d, k) => {
            return <DashBoardComponent key={k} {...d} colorIndex={k} />;
          })}
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold mt-4">ASN</h1>
        </div>

        <div className="mt-3">
          <ul className="nav nav-tabs" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                href="#ex1-tabs-1"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected="true"
              >
                All
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="ex1-tab-2"
                data-mdb-toggle="tab"
                href="#ex1-tabs-2"
                role="tab"
                aria-controls="ex1-tabs-2"
                aria-selected="false"
              >
                In-Transit
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="ex1-tab-3"
                data-mdb-toggle="tab"
                href="#ex1-tabs-3"
                role="tab"
                aria-controls="ex1-tabs-3"
                aria-selected="false"
              >
                Received
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="ex1-tab-4"
                data-mdb-toggle="tab"
                href="#ex1-tabs-4"
                role="tab"
                aria-controls="ex1-tabs-4"
                aria-selected="false"
              >
                Returned
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Cancelled
              </a>
            </li>
          </ul>
          <div className="tab-content" id="ex1-content">
            <div
              className="tab-pane fade show active"
              id="ex1-tabs-1"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            ></div>
          <div className="mt-4">
            <MaterialReactTable table={table} />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ASN;
