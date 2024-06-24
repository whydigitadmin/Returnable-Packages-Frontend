import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
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
import AddWarehouse from "./AddWarehouse";
import DashBoardComponent from "./DashBoardComponent";

const statsData = [];

function Warehouse() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openView, setOpenView] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [edit, setEdit] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [statsData, setStatsData] = useState([
    {
      title: "No of warehouse",
      value: "0",
      icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    {
      title: "Active warehouse",
      value: "0",
      icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    {
      // title: "Average Transaction",
      title: "Active warehouse",
      value: "0",
      icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    {
      title: "Low stock warehouses",
      value: "0",
      icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
  ]);

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.warehouseId);
    console.log("setSelectedRowID", row.original.warehouseId);
    setEdit(true);
  };

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleViewRow = (row) => {
    setSelectedRowData(row.original);
    console.log("setSelectedRowData", row.original);
    setOpenView(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
    setEdit(false);
    getWarehouseData();
  };

  useEffect(() => {
    getWarehouseData();
  }, []);

  const getWarehouseData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/view?orgId=${orgId}`
      );

      if (response.status === 200) {
        const allWarehouse = response.data.paramObjectsMap.WarehouseVO;
        setData(allWarehouse.reverse());
        const totalWarehouse = allWarehouse.length;
        const activeWarehouse = allWarehouse.filter(
          (warehouse) => warehouse.active === "Active"
        ).length;
        const inActiveWarehouse = allWarehouse.filter(
          (warehouse) => warehouse.active === "In-Active"
        ).length;
        setStatsData([
          {
            title: "No of warehouse",
            value: totalWarehouse.toString(),
            icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Active warehouse",
            value: activeWarehouse.toString(),
            icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            // title: "Average Transaction",
            title: "In-Active warehouse",
            value: inActiveWarehouse.toString(),
            icon: <FaBoxOpen className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Low stock warehouses",
            value: "0",
            icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
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
                row.original.eflag
                  ? "Editing is disabled for this Warehouse"
                  : ""
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
        accessorKey: "warehouseLocation",
        header: "Warehouse Name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "stockBranch",
        header: "Stock Branch",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "state",
        header: "State",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "city",
        header: "City",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "pincode",
        header: "Pincode",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "gst",
        header: "Gst",
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
      {(add && <AddWarehouse addWarehouse={handleBack} />) ||
        (edit && (
          <AddWarehouse
            addWarehouse={handleBack}
            editWarehouseId={selectedRowId}
          />
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
                    Bulk Upload
                  </span>
                </button>
                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleAddOpen}
                >
                  <img
                    src="/new.png"
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
                    Warehouse
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <MaterialReactTable table={table} />
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
            {/* VIEW MODAL */}
            <Dialog
              open={openView}
              onClose={handleViewClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
                <div className="row">
                  <div className="col-md-11">
                    <Typography variant="h6">Warehouse Details</Typography>
                  </div>
                  <div className="col-md-1">
                    <IconButton onClick={handleViewClose} aria-label="close">
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
                          <TableCell>Warehouse Name</TableCell>
                          <TableCell>
                            {selectedRowData.warehouseLocation}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Stock Branch</TableCell>
                          <TableCell>{selectedRowData.stockBranch}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Country</TableCell>
                          <TableCell>{selectedRowData.country}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>State</TableCell>
                          <TableCell>{selectedRowData.state}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>City</TableCell>
                          <TableCell>{selectedRowData.city}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Address</TableCell>
                          <TableCell>{selectedRowData.address}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Pincode</TableCell>
                          <TableCell>{selectedRowData.pincode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Gst</TableCell>
                          <TableCell>{selectedRowData.gst}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
    </>
  );
}

export default Warehouse;
