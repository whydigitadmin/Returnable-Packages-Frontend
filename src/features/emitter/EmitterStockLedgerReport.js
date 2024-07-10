import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { Box } from "@mui/material";
import axios from "axios";
import { download, generateCsv, mkConfig } from "export-to-csv";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaArrowCircleLeft, FaStarOfLife } from "react-icons/fa";
import { Link } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmitterStockLedgerReport() {
  const [dateValue, setDateValue] = useState({
    startDate: "",
    endDate: "",
  });
  // const [dateValue, setDateValue] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });
  const [flow, setFlow] = useState("");
  const [flowData, setFlowData] = useState("");
  const [errors, setErrors] = useState("");
  const [data, setData] = useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [tableView, setTableView] = useState(false);

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  useEffect(() => {
    getAddressById();
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
    setFlow("");
    setTableView(false);
  };

  const getAddressById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/getFlowByUserId?userId=${userId}`
      );

      if (response.status === 200) {
        const validFlows = response.data.paramObjectsMap.flowVO
          .filter(
            (flow) =>
              typeof flow.flowName === "string" && flow.flowName.trim() !== ""
          )
          .map((flow) => ({ id: flow.id, flow: flow.flowName }));
        setFlowData(validFlows);
        // setUserName(userDetail.firstName);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "kitNo",
        header: "Kit",
        size: 30,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "oqty",
        header: "Opening QTY",
        size: 30,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "rqty",
        header: "Received QTY",
        size: 30,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "dqty",
        header: "Dispatch QTY",
        size: 30,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "cqty",
        header: "Closing QTY",
        size: 30,
        muiTableHeadCellProps: {
          align: "left",
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
  const rearrangeColumns = (data) => {
    return data.map((row) => ({
      kitNo: row.kitNo,
      rqty: row.rqty,
      oqty: row.oqty,
      dqty: row.dqty,
      cqty: row.cqty,
    }));
  };

  const handleExportData = () => {
    const rearrangedData = rearrangeColumns(data);
    const csv = generateCsv(csvConfig)(rearrangedData);
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const filename = `Stock-ledger-report_${currentDate}.csv`;
    download({ ...csvConfig, filename })(csv);

    console.log("CSV", csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
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

  const handleSelectedFlow = (event) => {
    const selectedId = event.target.value;
    setFlow(selectedId);
    // getFlowDetailsByFlowId(selectedId);
  };

  const handleSave = () => {
    const errors = {};
    if (!flow) {
      errors.flow = "Flow is required";
    }
    if (!dateValue.startDate || !dateValue.endDate) {
      errors.dateValue = "Date is required";
    }
    if (Object.keys(errors).length === 0) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/emitter/getKitLedgerByEmitter?endDate=${dateValue.endDate}&startDate=${dateValue.startDate}&flowId=${flow}&orgId=${orgId}`
        )
        .then((response) => {
          if (response.data.status === "Error") {
            console.error("Error creating kit:", response.data.paramObjectsMap);
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            // toast.success(response.data.paramObjectsMap.message, {
            //   autoClose: 2000,
            //   theme: "colored",
            // });

            setData(response.data.paramObjectsMap.kitLedger);
            setErrors({});
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
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Flow
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6">
              <select
                className="form-select form-sz w-full mb-2"
                value={flow}
                onChange={handleSelectedFlow}
              >
                <option value="">Select a Flow</option>
                {flowData &&
                  flowData.map((flowName) => (
                    <option key={flowName.id} value={flowName.id}>
                      {flowName.flow}
                    </option>
                  ))}
              </select>
              {errors.flow && (
                <span className="error-text mb-1">{errors.flow}</span>
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
