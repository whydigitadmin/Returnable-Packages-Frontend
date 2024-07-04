import React, { useEffect, useState, useRef, useMemo } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { FaStarOfLife } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { mkConfig, generateCsv, download } from "export-to-csv";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowCircleLeft } from "react-icons/fa";

function StockAdjustment() {
  const [flow, setFlow] = React.useState("");
  const [flowData, setFlowData] = React.useState([]);
  // const [stockBranch, setStockBranch] = useState([]);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [tableView, setTableView] = useState(false);

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  useEffect(() => {
    getStockBranchByUserId();
  }, []);

  // const handleClearData = () => {
  //   setDateValue({
  //     startDate: null,
  //     endDate: null,
  //   });
  //   setFlow("");
  //   setTableView(false);
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
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
        accessorKey: "assetName",
        header: "Asset Desc",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "availQty",
        header: "Available QTY",
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

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    // enableRowSelection: true,
    // columnFilterDisplayMode: "popover",
    // paginationDisplayMode: "pages",
    // positionToolbarAlertBanner: "bottom",
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Box
    //     sx={{
    //       display: "flex",
    //       gap: "16px",
    //       padding: "8px",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     <button
    //       className="btn btn-ghost btn-sm normal-case"
    //       onClick={handleExportData}
    //     >
    //       <CloudDownloadOutlinedIcon className="w-4 mr-2" />
    //       Download
    //     </button>
    //   </Box>
    // ),
  });

  const handleSelectedStockBranch = (event) => {
    const selectedId = event.target.value;
    // setStockBranch(selectedId);
    stockBranchReport(selectedId);
  };

  const handleSelectedFlow = (event) => {
    const selectedId = event.target.value;
    setFlow(selectedId);
  };

  const getStockBranchByUserId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getStockBranchByUserId?userId=${userId}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setStockBranch(response.data.paramObjectsMap.branch);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const stockBranchReport = async (stockBranch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getEmptyAssetDetailsForGathering?orgId=${orgId}&stockBranch=${stockBranch}`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.oemEmptyDetails);
        setTableView(true);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="row">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/welcomeemitter">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Stock Report</strong>
                </span>
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Stock Branch
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6">
              <select
                className="form-select form-sz w-full mb-2"
                value={stockBranch}
                onChange={handleSelectedStockBranch}
              >
                <option value="">Select a Stock Branch</option>
                {stockBranch.map((branch, index) => (
                  <option key={index} value={branch.stockBranch}>
                    {branch.stockBranch}
                  </option>
                ))}
              </select>
              {/* {errors.flow && (
                <span className="error-text mb-1">{errors.flow}</span>
              )} */}
            </div>
          </div>
          {/* <div className="">
            <button
              type="button"
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleSave}
            >
              Search
            </button>
            <button
              type="button"
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleClearData}
            >
              Clear
            </button>
          </div> */}
          {tableView && (
            <>
              <div className="mt-4">
                <MaterialReactTable table={table} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default StockAdjustment;
