import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxes, FaCloudUploadAlt, FaTruck } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";
import { MdMapsHomeWork } from "react-icons/md";
import AddFlows from "./AddFlows";
import DashBoardComponent from "./DashBoardComponent";

const statsData = [
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
    title: "Unique Item/Item group",
    value: "0",
    icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Cycle Time",
    value: "0",
    icon: <LuTimerReset className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
];
const columns = [
  { field: "id", headerName: "Sr. No", width: 90 },
  { field: "FlowName", headerName: "Flow Name", width: 180 },
  { field: "origin", headerName: "origin", width: 180 },
  { field: "Destination", headerName: "Destination", width: 160 },
  { field: "MovementType", headerName: "Movement Type", width: 170 },
  { field: "Status", headerName: "Status", width: 130 },
];

const data = [
  {
    id: 1,
    FlowName: "John",
    origin: "Vap",
    Destination: "Bengaluru",
    MovementType: "Special Movement Types",
    Status: "Active",
  },
];

function Flows() {
  const [open, setOpen] = React.useState(false);
  const [addFlows, setAddFlows] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [createModalOpenView, setCreateModalOpenView] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddFlows = () => {
    setAddFlows(true);
  };

  const handleBack = () => {
    setAddFlows(false);
    getFlowData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getFlowData();
  }, []);

  const getFlowData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.flowVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVisibilityClick = (rowData) => {
    setSelectedRowData(rowData);
    console.log("rowData", rowData);
    setCreateModalOpenView(true);
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
        accessorKey: "id",
        header: "Sr No",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "flowName",
        header: "Flow Name",
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
        header: "Orgin",
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
    ],
    []
  );
  const table = useMaterialReactTable({
    data,
    columns,
  });
  return (
    <>
      {addFlows ? (
        <AddFlows addFlows={handleBack} />
      ) : (
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
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Bulk Upload</span>
              </button>
              <button
                className="btn btn-ghost btn-lg text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleAddFlows}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Flow</span>
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

          <Dialog
            open={Boolean(selectedRowData)}
            onClose={() => setSelectedRowData(null)}
          >
            <DialogTitle>Row Data Details</DialogTitle>
            <DialogContent>
              {selectedRowData && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Title</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Value</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(selectedRowData).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DialogContent>
            <Button onClick={() => setSelectedRowData(null)}>Close</Button>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default Flows;
