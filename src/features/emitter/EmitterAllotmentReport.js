import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import React, { useEffect, useState, useRef, useMemo } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { IoMdClose } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import axios from "axios";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const statsData = [
  {
    title: "New Users",
    value: "34700",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Total Sales",
    value: "34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Pending Leads",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads",
  },
  {
    title: "Active Users",
    value: "5600",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

const periodOptions = [
  { name: "Today", value: "TODAY" },
  { name: "Yesterday", value: "YESTERDAY" },
  { name: "This Week", value: "THIS_WEEK" },
  { name: "Last Week", value: "LAST_WEEK" },
  { name: "This Month", value: "THIS_MONTH" },
  { name: "Last Month", value: "LAST_MONTH" },
];

function EmitterAllotmentReport() {
  const dispatch = useDispatch();
  // const [dateValue, setDateValue] = useState({
  //   startDate: new Date(),
  //   endDate: new Date()
  // });
  const [dateValue, setDateValue] = useState({
    startDate: "",
    endDate: "",
  });
  const [kit, setKit] = useState("");
  const [flow, setFlow] = useState("");
  const [data, setData] = useState([]);
  const [kitList, setKitList] = useState([]);
  const [flowList, setFlowList] = useState([]);
  const [loginEmitterId, setLoginEmitterId] = React.useState(
    localStorage.getItem("emitterId")
  );
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [tableView, setTableView] = useState(false);

  useEffect(() => {
    handleClearData();
    getAllFlow();
    getAllKit();
  }, []);
  const getAllKit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getKitDetailsByEmitterId?emitterId=${loginEmitterId}&orgId=${orgId}`
      );
      if (response.status === 200) {
        const newData = response.data.paramObjectsMap.flow.map((item) => ({
          kitcode: item.kitcode,
        }));
        setKitList([...data, ...newData]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllFlow = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow?emitterId=${loginEmitterId}&orgId=${orgId}`
      );
      if (response.status === 200) {
        const newData = response.data.paramObjectsMap.flowVO.map((item) => ({
          flowName: item.flowName,
        }));
        setFlowList([...data, ...newData]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllBinAllotmentReportByEmitterId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getCustomizedAllotmentDetailsByEmitter?emitterId=${loginEmitterId}&endAllotDate=${dateValue.endDate}&flow=${flow}&kitCode=${kit}&startAllotDate=${dateValue.startDate}`
      );
      if (response.status === 200) {
        const binAllotmentVO = response.data.paramObjectsMap.binAllotmentVO;
        const newData = binAllotmentVO.map((item) => ({
          binReqNo: item.binReqNo,
          binReqDate: item.binReqDate,
          docId: item.docId,
          docDate: item.docDate,
          emitter: item.emitter,
          flow: item.flow,
          kitCode: item.kitCode,
          reqKitQty: item.reqKitQty,
          allotkKitQty: item.allotkKitQty,
        }));
        setData([...data, ...newData]);
        console.log("The Data from the API is:", data);
        setTableView(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
    // updateDashboardPeriod(newValue)
  };
  const handleClearData = () => {
    setDateValue({
      startDate: "",
      endDate: "",
    });
    setFlow("");
    setKit("");
    setTableView(false);
  };
  // const updateDashboardPeriod = (newRange) => {
  //   dispatch(
  //     showNotification({
  //       message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
  //       status: 1,
  //     })
  //   );
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: "docId",
        header: "Allotment No",
        size: 30,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "docDate",
        header: "Alloted Date",
        size: 30,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "binReqNo",
        header: "Req No",
        size: 30,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "binReqDate",
        header: "Req Date",
        size: 30,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        accessorKey: "emitter",
        header: "Emitter",
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
        size: 250,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
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
        accessorKey: "reqKitQty",
        header: "Req QTY",
        size: 20,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "allotkKitQty",
        header: "Alloted QTY",
        size: 20,
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
    const filename = `BinAllotment_${loginEmitterId}_${currentDate}.csv`;
    download({ ...csvConfig, filename })(csv);
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
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="row">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/welcomeemitter">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Allotment Register</strong>
                </span>
              </p>
            </div>
          </div>

          <div className="row mt-4">
            {/* DATE FIELD */}
            <div className="col-lg-2 col-md-6">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Select Date :
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6">
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
            </div>
            {/* KIT FIELD */}
            <div className="col-lg-1 col-md-6">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Kit :
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-6">
              <select
                className="form-select form-sz w-full mb-2"
                onChange={(e) => setKit(e.target.value)}
                value={kit}
              >
                <option value="" disabled>
                  Select a Kit
                </option>
                {kitList.length > 0 &&
                  kitList.map((list) => (
                    <option key={list.id} value={list.kitcode}>
                      {list.kitcode}
                    </option>
                  ))}
              </select>
            </div>
            {/* FLOW FIELD */}
            <div className="col-lg-1 col-md-6">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Flow :
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6">
              <select
                className="form-select form-sz w-full mb-2"
                onChange={(e) => setFlow(e.target.value)}
                value={flow}
              >
                <option value="" disabled>
                  Select a Flow
                </option>
                {flowList.length > 0 &&
                  flowList.map((list) => (
                    <option key={list.id} value={list.flowName}>
                      {list.flowName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={getAllBinAllotmentReportByEmitterId}
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

export default EmitterAllotmentReport;
