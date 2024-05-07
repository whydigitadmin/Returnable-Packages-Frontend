import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import { mkConfig, generateCsv, download } from "export-to-csv";
import axios from "axios";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

function AssetStockReport() {
  const [data, setData] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));

  useEffect(() => {
    getAllAssetStockReport();
  }, []);

  const getAllAssetStockReport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAvailableAssetDetails`
      );
      if (response.status === 200) {
        const assetDetails = response.data.paramObjectsMap.assetDetails;
        const newData = assetDetails.map((item) => ({
          stockBranch: item.stockBranch,
          asset: item.asset,
          assetCode: item.assetCode,
          qty: item.qty,
        }));
        setData([...data, ...newData]);
        setTableView(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "stockBranch",
        header: "Stock Branch",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "asset",
        header: "Asset",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "assetCode",
        header: "Asset Code",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "qty",
        header: "Quantity",
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

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    // enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <button
          className="btn btn-ghost btn-sm normal-case"
          onClick={handleExportData}
        >
          <CloudDownloadOutlinedIcon className="w-4 mr-2" />
          Download
        </button>
      </Box>
    ),
  });

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <Link to="/app/reports">
            <IoMdClose className="cursor-pointer w-8 h-8 mb-3" />
          </Link>
        </div>
        {tableView && (
          <>
            <div className="">
              <MaterialReactTable table={table} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AssetStockReport;
