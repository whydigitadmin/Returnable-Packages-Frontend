import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
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
import IssueManifestReport from "../issueManifestReport/IssueManifestReport";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#0d6ef",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function AllotedBinsTable({ viewAllotedTable }) {
  const [addBinAllotment, setAddBinAllotment] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [view, setView] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingBinReq, setPendingBinReq] = useState("");
  const [loginUserId, setLoginUserId] = React.useState(
    localStorage.getItem("userId")
  );
  const [statsData, setStatsData] = useState([]);
  const [active, setActive] = useState(true);
  const [thirtyDaysData, setThirtyDaysData] = useState([]);

  const handleBack = () => {
    setAddBinAllotment(false);
    setView(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getAllPendingBinRequest();
  }, [selectedRowId, pendingBinReq]);

  useEffect(() => {
    getAllBinAllotmentData();
  }, []);

  const getAllPendingBinRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequestreportByOrgId?OrgId=${orgId}&userId=${loginUserId}`
      );

      if (response.status === 200) {
        setPendingBinReq(response.data.paramObjectsMap.issueRequestVO.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllBinAllotmentData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinAllotmentByOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const filteredData =
          response.data.paramObjectsMap.binAllotmentNewVO.filter((item) => {
            const docDate = new Date(item.docDate);
            return docDate >= thirtyDaysAgo;
          });

        setThirtyDaysData(filteredData.reverse());

        console.log("True", filteredData.length);
        setData(response.data.paramObjectsMap.binAllotmentNewVO.reverse());
        console.log(
          "false",
          response.data.paramObjectsMap.binAllotmentNewVO.length
        );

        const allRequests =
          response.data.paramObjectsMap.binAllotmentNewVO.length;
        const totalRequests = pendingBinReq + allRequests;
        setStatsData([
          {
            title: "Total Requests",
            value: totalRequests.toString(),
            icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Total Pending Requests",
            value: pendingBinReq,
            icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Completed Requests",
            value: allRequests,
            icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "low stock",
            subTitle: "priority Pending",
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleViewRow = (row) => {
    setSelectedRowId(row.original.docId);
    console.log("setSelectedRowID", row.original.docId);
    setView(true);
  };

  const handleDownloadClick = (row) => {
    setSelectedRowId(row.original.docId);
    setOpenDialog(true);
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
            <IconButton onClick={() => handleViewRow(row)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton
              // onClick={() => handleViewRow(row)}
              onClick={() => handleDownloadClick(row)}
            >
              <GetAppIcon />
            </IconButton>
          </div>
        ),
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
        header: "Allotted QTY",
        size: 20,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "docId",
        header: "Allot No",
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
        header: "Allot Date",
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
    ],
    []
  );

  const table = useMaterialReactTable({
    data: active ? thirtyDaysData : data,
    columns,
  });

  const handleAllotedBinsTableClose = () => {
    viewAllotedTable(false);
  };

  const handleSwitchChange = (e) => {
    setActive(e.target.checked);
    console.log("THE ACTIVE FIELD STATUS:", e.target.checked);
  };

  return (
    <>
      {view ? (
        <EmitterBinAllotment
          addBinAllotment={handleBack}
          viewId={selectedRowId}
        />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          {/* DASHBOARD COMPONENT */}
          <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>

          {/* ALLOTED BINS BUTTON */}
          <div className="d-flex flex-row-reverse">
            <div className="d-flex justify-content-between mt-4 w-full">
              <h1 className="text-2xl font-semibold mt-3 text-center">
                Alloted Bin List
                <p className="text-sm m-2">
                  All List
                  <span className="ms-4">
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          checked={active}
                          onChange={(e) => {
                            setActive(e.target.checked);
                          }}
                        />
                      }
                    />
                  </span>
                  for last 30 Days
                </p>
              </h1>

              <button
                className="btn btn-ghost btn-lg text-sm col-xs- justify-content-end mb-2"
                style={{ color: "blue", border: "1px solid grey" }}
                onClick={handleAllotedBinsTableClose}
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
                  style={{ marginLeft: "10px" }}
                >
                  Pending Allotments
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          <IssueManifestReport
            goBack={handleBack}
            docId={selectedRowId}
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AllotedBinsTable;
