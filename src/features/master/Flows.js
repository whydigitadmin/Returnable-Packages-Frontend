import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxes, FaTruck, FaUser } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
import { MdGroups, MdMapsHomeWork } from "react-icons/md";
import sampleFile from "../../assets/sampleFiles/rp_user_sample_data.xlsx";
import BulkUploadDialog from "../../utils/BulkUoloadDialog";
import AddFlows from "./AddFlows";
import DashBoardComponent from "./DashBoardComponent";

function Flows() {
  const [open, setOpen] = React.useState(false);
  const [addFlows, setAddFlows] = React.useState(false);
  const [editFlow, setEditFlow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [city, setCity] = React.useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [createModalOpenView, setCreateModalOpenView] = useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
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
      title: "Total Flows",
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

  const handleFileUpload = (event) => {
    // Handle file upload
    console.log(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle submit
    console.log("Submit clicked");
    handleClose();
  };

  const handleVisibilityClose = () => {
    setCreateModalOpenView(false);
  };

  const handleViewRow = (row) => {
    setSelectedRowData(row.original);
    setCreateModalOpenView(true);
  };
  const handleEditRow = (row) => {
    setSelectedRowId(row.original.id);
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
        accessorKey: "warehouseLocation",
        header: "Supplier Warehouse",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "retrievalWarehouseLocation",
        header: "Retrieval Warehouse",
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
        `${process.env.REACT_APP_API_URL}/api/master/flow?orgId=${orgId}`
      );

      if (response.status === 200) {
        const allFlows = response.data.paramObjectsMap.flowVO;
        setData(allFlows.reverse());
        const totalFlows = allFlows.length;
        const activeFlows = allFlows.filter(
          (flows) => flows.active === "Active"
        ).length;
        const inActiveFlows = allFlows.filter(
          (flows) => flows.active === "In-Active"
        ).length;

        setStatsData([
          {
            title: "Total Flows",
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
              <div className="flex justify-end mt-4">
                {/* <BulkUploadDialog
                  open={open}
                  onOpenClick={handleClickOpen}
                  handleClose={handleClose}
                  dialogTitle="Upload File"
                  uploadText="Upload file"
                  downloadText="Sample File"
                  onSubmit={handleSubmit}
                  sampleFileDownload={sampleFile} // Change this to the actual path of your sample file
                  handleFileUpload={handleFileUpload}
                /> */}
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
              <MaterialReactTable table={table} />
            </div>
          </div>
        )}
      <Dialog
        open={createModalOpenView}
        onClose={handleVisibilityClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
          <div className="row">
            <div className="col-md-11">
              <Typography variant="h6">Flow Details</Typography>
            </div>
            <div className="col-md-1">
              <IconButton onClick={handleVisibilityClose} aria-label="close">
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
                    <TableCell>Status</TableCell>
                    <TableCell>{selectedRowData.active}</TableCell>
                  </TableRow>
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
          <Button onClick={handleVisibilityClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Flows;
