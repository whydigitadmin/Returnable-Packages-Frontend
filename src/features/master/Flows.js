import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { MdGroups } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxes, FaCloudUploadAlt, FaTruck } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";
import { MdMapsHomeWork } from "react-icons/md";
import AddFlows from "./AddFlows";
import DashBoardComponent from "./DashBoardComponent";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

function Flows() {
  const [open, setOpen] = React.useState(false);
  const [addFlows, setAddFlows] = React.useState(false);
  const [editFlow, setEditFlow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [city, setCity] = React.useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [createModalOpenView, setCreateModalOpenView] = useState(false);
  const [statsData, setStatsData] = useState([
    {
      title: "Static Flows",
      value: "0",
      icon: <MdMapsHomeWork className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "Transit Flows",
      value: "0",
      icon: <FaTruck className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      // title: "Unique Item/Item group",
      title: "All Flows",
      value: "0",
      icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      // title: "Cycle Time",
      title: "Active Flows",
      value: "0",
      icon: <LuTimerReset className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    // {
    //   // title: "Cycle Time",
    //   title: "In-Active Flows",
    //   value: "0",
    //   icon: <LuTimerReset className="w-5 h-5 text-white dashicon-sm" />,
    //   description: "",
    // },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddFlows = () => {
    setAddFlows(true);
  };

  const handleBack = () => {
    setAddFlows(false);
    getCustomerData();
    setEditFlow(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVisibilityClick = (rowData) => {
    setSelectedRowData(rowData);
    console.log("rowData", rowData);
    setCreateModalOpenView(true);
  };

  const handleViewRow = (row) => {
    setSelectedRowData(row.original);
    setOpen(true);
  };
  const handleEditRow = (row) => {
    setSelectedRowId(row.original.id);
    console.log("THE EDIT ROW ID IS:", row.original.id);
    setEditFlow(true);
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
            <IconButton onClick={() => handleViewRow(row)}>
              <VisibilityIcon />
            </IconButton>
            <Tooltip
              title={
                row.original.eflag ? "Editing is disabled for this Flow" : ""
              }
              arrow
              disableHoverListener={!row.original.eflag}
            >
              <span>
                <IconButton
                  onClick={() => handleEditRow(row)}
                  disabled={row.original.eflag}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: "flowName",
        header: "Flow Name",
        size: 300,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "warehouseLocation",
        header: "Warehouse",
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
        accessorKey: "receiver",
        header: "Receiver",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "orgin",
        header: "Origin",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "destination",
        header: "Destination",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        muiTableHeadCellProps: {
          textAlign: "center",
        },
        muiTableBodyCellProps: {
          textAlign: "center",
        },
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    data,
    columns,
  });

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow`
      );

      if (response.status === 200) {
        const allFlows = response.data.paramObjectsMap.flowVO;
        setData(allFlows.reverse());
        const totalFlows = allFlows.length;
        console.log("flowsT", totalFlows);
        const activeFlows = allFlows.filter(
          (flows) => flows.active === "Active"
        ).length;
        console.log("flowsActive", activeFlows);
        const inActiveFlows = allFlows.filter(
          (flows) => flows.active === "In-Active"
        ).length;
        console.log("flowsIn-Active", inActiveFlows);

        setStatsData([
          {
            title: "Static Flows",
            value: "0",
            icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Transit Flows",
            value: "0",
            icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "All Flows",
            value: totalFlows,
            icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Active Flows",
            value: activeFlows,
            icon: <FaUser className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          // {
          //   title: "In-Active Flows",
          //   value: inActiveFlows.toString(),
          //   icon: <FaDatabase className="w-5 h-5 text-white dashicon-sm" />,
          //   description: "",
          // },
        ]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {(addFlows && <AddFlows addFlows={handleBack} />) ||
        (editFlow && (
          <AddFlows addFlows={handleBack} editFlowId={selectedRowId} />
        )) || (
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {statsData.map((d, k) => {
                return <DashBoardComponent key={k} {...d} colorIndex={k} />;
              })}
            </div>
            <div className="">
              <div className="flex justify-between mt-4">
                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleClickOpen}
                >
                  <img
                    src="/upload.png"
                    alt="upload-icon"
                    title="upload"
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
                    Bulk Upload
                  </span>
                </button>
                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleAddFlows}
                >
                  <img
                    src="/new.png"
                    alt="new-icon"
                    title="new"
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
                    Flow
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <MaterialReactTable
                table={table}
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    muiTableHeadCellProps: {
                      align: "center",
                    },
                    size: 120,
                  },
                }}
                renderRowActions={({ row, table }) => (
                  <Tooltip arrow placement="left" title="Operate">
                    <IconButton
                      color="error"
                      onClick={() => handleVisibilityClick(row.original)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                )}
              />
            </div>
            <Dialog
              fullWidth={true}
              maxWidth={"sm"}
              open={open}
              onClose={handleClose}
            >
              <div className="d-flex justify-content-between">
                <DialogTitle>Upload File</DialogTitle>
                <IoMdClose
                  onClick={handleClose}
                  className="cursor-pointer w-8 h-8 mt-3 me-3"
                />
              </div>
              <DialogContent>
                <DialogContentText className="d-flex flex-column">
                  Choose a file to upload
                  <div className="d-flex justify-content-center">
                    <div className="col-lg-4 text-center my-3">
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<FaCloudUploadAlt />}
                      >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-3">
                    <Button
                      size="small"
                      component="label"
                      className="text-form"
                      variant="contained"
                      startIcon={<FiDownload />}
                    >
                      Download Sample File
                    </Button>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions className="mb-2 me-2">
                <Button onClick={handleClose}>Cancel</Button>
                <Button component="label" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
          <div className="row">
            <div className="col-md-11">
              <Typography variant="h6">Flow Details</Typography>
            </div>
            <div className="col-md-1">
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="mt-4">
          {selectedRowData && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Flow Name</TableCell>
                    <TableCell>{selectedRowData.flowName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emitter</TableCell>
                    <TableCell>{selectedRowData.emitter}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Receiver</TableCell>
                    <TableCell>{selectedRowData.receiver}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Origin</TableCell>
                    <TableCell>{selectedRowData.orgin}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Destination</TableCell>
                    <TableCell>{selectedRowData.destination}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Supplier Warehouse</TableCell>
                    <TableCell>{selectedRowData.warehouseLocation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Retrieval Warehouse</TableCell>
                    <TableCell>
                      {selectedRowData.retrievalWarehouseLocation}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Flows;
