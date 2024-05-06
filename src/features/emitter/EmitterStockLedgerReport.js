import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
// import { useState } from "react"
import React, { useEffect, useState, useRef, useMemo } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { IoMdClose } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {
    MaterialReactTable,
    createMRTColumnHelper,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import axios from "axios";

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
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
]

function EmitterStockLedgerReport() {
    const dispatch = useDispatch();
    const [dateValue, setDateValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    const [emitter, setEmitter] = useState("");
    const [kit, setKit] = useState("");
    const [flow, setFlow] = useState("");
    const [data, setData] = useState([]);
    const [emitterList, setEmitterList] = useState([]);
    const [kitList, setKitList] = useState([]);
    const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
    const [tableView, setTableView] = useState(false);



    useEffect(() => {
    }, []);

    const getAllBinAllotmentReport = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/master/getCustomizedAllotmentDetails?emitter=${emitter}&endAllotDate=${dateValue.endDate}&flow=${flow}&kitCode=${kit}&startAllotDate=${dateValue.startDate}`
            );
            if (response.status === 200) {
                const binAllotmentVO = response.data.paramObjectsMap.binAllotmentVO;
                const newData = binAllotmentVO.map(item => ({
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
    }
    const handleClearData = () => {
        setDateValue({
            startDate: null,
            endDate: null
        });
        // updateDashboardPeriod({
        //   startDate: new Date(),
        //   endDate: new Date()
        // });
        setEmitter("")
        setFlow("")
        setKit("")
        setTableView(false)
    }
    // const updateDashboardPeriod = (newRange) => {
    //   dispatch(
    //     showNotification({
    //       message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
    //       status: 1,
    //     })
    //   );
    // };

    const handleEmitterChange = (e) => {
        setEmitter(e.target.value)
    }
    const handleKitChange = (e) => {
        setKit(e.target.value)
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: "docId",
                header: "Allotment No",
                size: 50,
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
                size: 50,
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
                size: 50,
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
                size: 50,
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
                size: 50,
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
                size: 50,
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
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >

                <button className="btn btn-ghost btn-sm normal-case"
                    onClick={handleExportData}><CloudDownloadOutlinedIcon className="w-4 mr-2" />Download</button>

                {/* <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button> */}
            </Box>
        ),
    });


    return (
        <>
            <div className="card w-full p-6 bg-base-100 shadow-xl">
                <div className="d-flex justify-content-end">
                    <Link to="/app/reports">
                        <IoMdClose
                            className="cursor-pointer w-8 h-8 mb-3"
                        />
                    </Link>
                </div>
                <div className="row">
                    {/* DATE FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
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
                            containerClassName="datesize"
                            value={dateValue}
                            theme={"light"}
                            inputClassName="input input-bordered datesize p-3"
                            popoverDirection={"down"}
                            toggleClassName="invisible"
                            onChange={handleDatePickerValueChange}
                            showShortcuts={true}
                            primaryColor={"white"}
                        />
                    </div>
                    {/* EMITTER FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Emitter
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        {/* <select
              className="form-select form-sz w-full mb-2"
              onChange={handleEmitterChange}
              value={emitter}
            >
              <option value="" disabled>
                Select Emitter
              </option>
              {emitterList.length > 0 &&
                emitterList.map((list) => (
                  <option key={list.id} value={list.emitterName}>
                    {list.emitterName}
                  </option>
                ))}
            </select> */}
                        <input
                            className="form-control form-sz mb-2"
                            value={emitter}
                            onChange={(e) => setEmitter(e.target.value)}
                        />
                    </div>
                    {/* KIT FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Kit
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <input
                            className="form-control form-sz mb-2"
                            value={kit}
                            onChange={(e) => setKit(e.target.value)}
                        />
                        {/* <select
              className="form-select form-sz w-full mb-2"
              onChange={handleKitChange}
              value={kit}
            >
              <option value="" disabled>
                Select Kit
              </option>
              {kitList.length > 0 &&
                kitList.map((list) => (
                  <option key={list.id} value={list.kitName}>
                    {list.kitName}
                  </option>
                ))}
            </select> */}
                    </div>
                    {/* FLOW FIELD */}
                    <div className="col-lg-3 col-md-6 mb-2">
                        <label className="label">
                            <span
                                className={
                                    "label-text label-font-size text-base-content d-flex flex-row"
                                }
                            >
                                Flow
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        {/* <select
              className="form-select form-sz w-full mb-2"
              onChange={handleFlowChange}
              value={flow}
            >
              <option value="" disabled>
                Select Flow
              </option>
              {kitList.length > 0 &&
                kitList.map((list) => (
                  <option key={list.id} value={list.kitName}>
                    {list.kitName}
                  </option>
                ))}
            </select> */}
                        <input
                            className="form-control form-sz mb-2"
                            value={flow}
                            onChange={(e) => setFlow(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="button"
                        className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onClick={getAllBinAllotmentReport}
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
                {tableView && <>
                    <div className="mt-4">
                        <MaterialReactTable table={table} />
                    </div>
                </>}
            </div>


        </>
    );
}

export default EmitterStockLedgerReport;
