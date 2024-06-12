import { useDispatch } from "react-redux";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
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

function EmitterStockLedgerReport() {
  const [dateValue, setDateValue] = useState({
    startDate: "",
    endDate: "",
  });
  // const [dateValue, setDateValue] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });
  const [emitter, setEmitter] = useState("");
  const [kit, setKit] = useState("");
  const [flow, setFlow] = useState("");
  const [errors, setErrors] = useState("");
  const [data, setData] = useState([]);
  const [stockBranch, setStockBranch] = useState("");
  const [selectedStockBranch, setSelectedStockBranch] = useState("");
  const [stockBranchList, setStockBranchList] = useState([]);
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

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
    // updateDashboardPeriod(newValue)
  };
  const handleClearData = () => {
    setDateValue({
      startDate: null,
      endDate: null,
    });
    setEmitter("");
    setFlow("");
    setKit("");
    setTableView(false);
  };

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
        accessorKey: "openQty",
        header: "Open Qty",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "rQty",
        header: "rQty",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "dQty",
        header: "dQTY",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "closingQty",
        header: "Closing QTY",
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

  const getStockBranchByUserId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getStockBranchByUserId?orgId=${orgId}&userId=${userId}`
      );
      if (response.status === 200) {
        console.log(
          "getStockBranchByUserId:",
          response.data.paramObjectsMap.branch
        );
        setStockBranchList(response.data.paramObjectsMap.branch);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectionChange = (event) => {
    const selectedOrigin = event.target.value;
    setStockBranch(selectedOrigin);

    const selectedBranch = stockBranchList.find(
      (branch) => branch.orgin === selectedOrigin
    );
    if (selectedBranch) {
      setSelectedStockBranch(selectedBranch.stockBranch);
    } else {
      setSelectedStockBranch("");
    }
  };

  const handleSave = () => {
    const errors = {};
    if (!selectedStockBranch) {
      errors.selectedStockBranch = "Stock Branch is required";
    }
    if (!dateValue.startDate || !dateValue.endDate) {
      errors.dateValue = "Date is required";
    }
    if (Object.keys(errors).length === 0) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/emitter/getStockLedgerByEmitter?endDate=${dateValue.endDate}&startDate=${dateValue.startDate}&stockBranch=${selectedStockBranch}`
        )
        .then((response) => {
          if (response.data.status === "Error") {
            console.error("Error creating kit:", response.data.paramObjectsMap);
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });

            setData(response.data.paramObjectsMap.stockLedger);
            setTableView(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
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
                  <strong className="ml-4">Stock Ledger</strong>
                </span>
              </p>
            </div>
          </div>

          <div className="row mt-4">
            {/* DATE FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Select Date
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6 mb-2">
              <Datepicker
                // containerClassName="datesize"
                value={dateValue}
                theme={"light"}
                inputClassName="input input-bordered w-full p-3"
                popoverDirection={"down"}
                toggleClassName="invisible"
                onChange={handleDatePickerValueChange}
                showShortcuts={true}
                primaryColor={"white"}
              />
              {errors.dateValue && (
                <span className="error-text mb-1">{errors.dateValue}</span>
              )}
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Stock Branch
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6 mb-2">
              <select
                className="form-select form-sz w-full mb-2"
                onChange={handleSelectionChange}
                value={stockBranch}
              >
                <option value="" disabled>
                  Select a Stock Branch
                </option>
                {stockBranchList.length > 0 &&
                  stockBranchList.map((list) => (
                    <option key={list.stockBranch} value={list.orgin}>
                      {list.orgin}
                    </option>
                  ))}
              </select>
              {errors.selectedStockBranch && (
                <span className="error-text mb-1">
                  {errors.selectedStockBranch}
                </span>
              )}
            </div>
          </div>
          <div className="">
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
          </div>
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

export default EmitterStockLedgerReport;
