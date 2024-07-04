import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import DashBoardComponent from "../master/DashBoardComponent";
import EmitterBinAllotment from "./EmitterBinAllotment";
import AllotedBinsTable from "./AllotedBinsTable";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

export const BinAllotmentDetails = () => {
  const [addBinAllotment, setAddBinAllotment] = React.useState(false);
  const [editBinRequest, setEditBinRequest] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [allotedBinData, setAllotedBinData] = React.useState([]);
  const [userAddressData, setUserAddressData] = React.useState(null);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginUserId, setLoginUserId] = React.useState(
    localStorage.getItem("userId")
  );
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedKidId, setSelectedKidId] = useState(null);
  const [viewAllotedBins, setViewAllotedBins] = useState(false);
  const [allotedBinTableView, setAllotedBinTableView] = useState(false);
  const [visibleCard, setVisibleCard] = useState(false);
  const [totAllotedReq, setTotAllotedReq] = useState("");
  const [statsData, setStatsData] = useState([]);

  const handleViewAllotedBins = () => {
    setViewAllotedBins(true);
    setAllotedBinTableView(true);
  };

  const handleViewClickOpen = () => {
    setOpenView(true);
  };

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBinAllotmentOpen = () => {
    setAddBinAllotment(true);
  };

  const handleBack = () => {
    setAddBinAllotment(false);
    setEditBinRequest(false);
    getAllBinRequest();
    setAllotedBinTableView(false);
    setViewAllotedBins(false);
  };

  useEffect(() => {
    getAllBinRequest();
    getAllBinAllotmentData();
  }, [selectedRowId, totAllotedReq]);

  const getAllBinAllotmentData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinAllotmentByOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        setTotAllotedReq(
          response.data.paramObjectsMap.binAllotmentNewVO.length
        );
        console.log(
          "TOTAL ALLOTED REQUEST COUNT:",
          response.data.paramObjectsMap.binAllotmentNewVO.length
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllBinRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequestreportByOrgId?OrgId=${orgId}&userId=${loginUserId}`
      );

      if (response.status === 200) {
        const allRequests = response.data.paramObjectsMap.issueRequestVO;
        setData(allRequests.reverse());
        const totalRequests = totAllotedReq + allRequests.length;
        setStatsData([
          {
            title: "Total Requests",
            value: totalRequests.toString(),
            icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Completed Requests",
            value: totAllotedReq,
            icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Pending Requests",
            value: allRequests.length,
            icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Low Stock",
            subTitle: "Priority Pending",
            value: "0",
            icon: <FaBoxOpen className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.reqNo);
    console.log("row.original.reqNo", row.original.kitCode);
    setSelectedKidId(row.original.kitCode);
    setEditBinRequest(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableSorting: false,
        enableColumnOrdering: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <div>
            <IconButton onClick={() => handleEditRow(row)}>
              <EditIcon />
            </IconButton>
          </div>
        ),
      },

      {
        accessorKey: "reqNo",
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
        accessorKey: "reqDate",
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
        accessorKey: "kitCode",
        header: "Kit No",
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
    ],
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
  });

  const allotedTable = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <>
      {(viewAllotedBins && (
        <AllotedBinsTable viewAllotedTable={handleBack} />
      )) ||
        (editBinRequest && (
          <EmitterBinAllotment
            addBinAllotment={handleBack}
            editBinRequestId={selectedRowId}
            editBinKidId={selectedKidId}
          />
        )) || (
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            {/* DASHBOARD COMPONENT */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {statsData.map((d, k) => {
                return <DashBoardComponent key={k} {...d} colorIndex={k} />;
              })}
            </div>

            {/* ALLOTED BINS BUTTON */}
            <div className="">
              <div className="flex justify-content-between mt-4 w-full">
                <h1 className="text-xl font-semibold mt-3">
                  Pending Bin Request
                </h1>

                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1 mb-2"
                  style={{
                    color: "blue",
                    border: "1px solid grey",
                  }}
                  onClick={handleViewAllotedBins}
                >
                  <img
                    src="/issuemanifest1.png"
                    alt="pending-status-icon"
                    title="add"
                    style={{
                      width: 30,
                      height: 30,
                      margin: "auto",
                      hover: "pointer",
                    }}
                  />
                  <span
                    className="text-form text-base"
                    style={{ marginLeft: "10px", color: "green" }}
                  >
                    Alloted Bins
                  </span>
                </button>
              </div>
            </div>
            {/* LISTVIEW TABLE */}
            <div className="mt-2">
              <MaterialReactTable table={table} />
            </div>
          </div>
        )}
    </>
  );
};

export default BinAllotmentDetails;
