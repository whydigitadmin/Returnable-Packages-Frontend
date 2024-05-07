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

const statsData = [
  {
    title: "No of Users",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Active Users",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "InActive Users",
    value: "0",
    icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    // title: "Average Transaction",
    title: "--",
    value: "0",
    icon: <FaBoxOpen className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
];

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
  const [loginUserId, setLoginUserId] = React.useState(localStorage.getItem("userId"));
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [viewAllotedBins, setViewAllotedBins] = useState(false);
  const [allotedBinTableView, setAllotedBinTableView] = useState(false);
  const [visibleCard, setVisibleCard] = useState(false)

  const handleViewAllotedBins = () => {
    setViewAllotedBins(true)
    setAllotedBinTableView(true)
  }


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
    setAllotedBinTableView(false)
    setViewAllotedBins(false)
  };

  useEffect(() => {
    getAllBinRequest();
    // console.log("selected row id is:", selectedRowId)
  }, [selectedRowId]);

  const getAllBinRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequestreportByOrgId?OrgId=${orgId}&userId=${loginUserId}`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.issueRequestVO)
        console.log("Response from API is:", response.data.paramObjectsMap.issueRequestVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditRow = (row) => {
    console.log("setSelectedRowId", row.original.reqNo);
    setSelectedRowId(row.original.reqNo);
    console.log("Real state of selected row id is:", selectedRowId);
    setEditBinRequest(true);

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
      // {
      //   accessorKey: "active",
      //   header: "Active",
      //   size: 50,
      //   muiTableHeadCellProps: {
      //     align: "center",
      //   },
      //   muiTableBodyCellProps: {
      //     align: "center",
      //   },
      //   Cell: ({ cell: { value } }) => (
      //     <span>{value ? "Active" : "Active"}</span>
      //   ),
      // },
    ],
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
  });

  // const getAllBinAllotmentData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinAllotmentByOrgId?orgId=${orgId}`
  //     );

  //     if (response.status === 200) {
  //       setAllotedBinData(response.data.paramObjectsMap.binAllotmentNewVO.reverse());
  //       console.log(
  //         "Response from API is:",
  //         response.data.paramObjectsMap.binAllotmentNewVO
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const allotedTable = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <>
      {(viewAllotedBins && <AllotedBinsTable viewAllotedTable={handleBack} />) ||
        (editBinRequest && (
          <EmitterBinAllotment addBinAllotment={handleBack} editBinRequestId={selectedRowId} />
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
                <h1 className="text-xl font-semibold mt-3">Pending Allotment List</h1>

                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleViewAllotedBins}
                >
                  <img
                    src="/inwardManifestReport.png"
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
