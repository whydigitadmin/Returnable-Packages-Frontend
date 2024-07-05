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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StockAdjustment() {
  const [dateValue, setDateValue] = useState({
    startDate: "",
    endDate: "",
  });
  const [stockBranch, setStockBranch] = useState([]);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [emitterId, setEmitterId] = React.useState(
    localStorage.getItem("emitterId")
  );
  const [tableView, setTableView] = useState(false);
  const [flowData, setFlowData] = useState([]);
  const [selectedFlowId, setSelectedFlowId] = useState("");

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  useEffect(() => {
    getFlowById();
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
        accessorKey: "kitCode",
        header: "Kit",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "kitAvailQty",
        header: "Avilable Kit Qty ",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "flow",
        header: "Flow",
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
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const filename = `Stock-report_${currentDate}.csv`;
    download({ ...csvConfig, filename })(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
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

  const handleSelectedStockBranch = (event) => {
    const selectedId = event.target.value;
    // setStockBranch(selectedId);
    stockBranchReport(selectedId);
  };

  const getFlowById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/getFlowByUserId?userId=${userId}`
      );

      if (response.status === 200) {
        console.log(
          "response.data.paramObjectsMap",
          response.data.paramObjectsMap
        );
        const validFlows = response.data.paramObjectsMap.flowVO
          .filter(
            (flow) =>
              typeof flow.flowName === "string" && flow.flowName.trim() !== ""
          )
          .map((flow) => ({ id: flow.id, flow: flow.flowName }));
        if (validFlows.length === 1) {
          setSelectedFlowId(validFlows[0].id);
          console.log("THE FIRST FLOW INDEX VALUE IS:", validFlows[0].id);
        }
        setFlowData(validFlows);
        console.log("validFlows", validFlows);
      }
    } catch (error) {
      // toast.error("Network Error!");
    }
  };

  const stockBranchReport = async (flowId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getStockKitQtyByEmitter?orgId=${orgId}&emitterId=${emitterId}&flowId=${flowId}`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.avlKitQty);
        setTableView(true);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const handleFlowChange = (e) => {
    const selectedId = e.target.value;
    setSelectedFlowId(selectedId);
    console.log("Newwww", e.target.value);
    stockBranchReport(selectedId);
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="row">
            <div className="col-md-4">
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
          <div className="row d-flex mt-6">
            <div className="col-lg-2 col-md-2 ml-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Select Flow
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-6">
              <select
                className="form-select w-56 h-10 mt-1 mb-2"
                value={selectedFlowId}
                onChange={handleFlowChange}
              >
                <option value="">Select a Flow</option>
                {flowData &&
                  flowData.map((flowName) => (
                    <option key={flowName.id} value={flowName.id}>
                      {flowName.flow}
                    </option>
                  ))}
              </select>
              {errors.selectedFlowId && (
                <span className="error-text">{errors.selectedFlowId}</span>
              )}
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
