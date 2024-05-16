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
import React, { useMemo, useEffect, useState } from "react";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import EmitterCreation from "./EmitterCreation";
import DashBoardComponent from "../master/DashBoardComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const statsData = [
  {
    title: "No of Emitters",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Active Emitters",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "InActive Emitters",
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

const EmitterDetails = () => {
  const [addEmitter, setAddEmitter] = React.useState(false);
  const [editEmitter, setEditEmitter] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [openView, setOpenView] = React.useState(false);
  const [userAddressData, setUserAddressData] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEmitterOpen = () => {
    setAddEmitter(true);
  };

  const handleBack = () => {
    setAddEmitter(false);
    setEditEmitter(false);
    getAllEmittersData();
  };

  useEffect(() => {
    getAllEmittersData();
  }, []);

  const getAllEmittersData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/userByOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        setData(
          response.data.paramObjectsMap.userVO.filter(
            (user) => user.role === "ROLE_EMITTER"
          )
        );
        console.log(
          "EMITTER DATA IS:",
          response.data.paramObjectsMap.userVO.filter(
            (user) => user.role === "ROLE_EMITTER"
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewRow = (row) => {
    setSelectedRowData(row.original);
    setOpenView(true);
  };

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.userId);
    setEditEmitter(true);
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
            <IconButton onClick={() => handleEditRow(row)}>
              <EditIcon />
            </IconButton>
          </div>
        ),
      },

      // {
      //     accessorKey: "userId",
      //     header: "User ID",
      //     size: 50,
      //     muiTableHeadCellProps: {
      //         align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //         align: "center",
      //     },
      // },
      // {
      //     accessorKey: "customersVO.id",
      //     header: "Emitter ID",
      //     size: 50,
      //     muiTableHeadCellProps: {
      //         align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //         align: "center",
      //     },
      // },
      {
        accessorKey: "customersVO.entityLegalName",
        header: "Entity Legal Name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "firstName",
        header: "Emitter Name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      //   {
      //     accessorKey: "pno",
      //     header: "Phone",
      //     size: 50,
      //     muiTableHeadCellProps: {
      //       align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //       align: "center",
      //     },
      //   },
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

  const handleSaveRowEdits = () => {};

  const handleCancelRowEdits = () => {};

  const handleEdit = (rowData) => {
    // Implement your logic to handle the edit action for the specific row
    console.log("Edit clicked for row:", rowData);
  };

  const handleDelete = (rowData) => {
    // Implement your logic to handle the delete action for the specific row
    console.log("Delete clicked for row:", rowData);
  };

  return (
    <>
      {(addEmitter && <EmitterCreation addEmitter={handleBack} />) ||
        (editEmitter && (
          <EmitterCreation
            addEmitter={handleBack}
            emitterEditId={selectedRowId}
          />
        )) || (
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            {/* DASHBOARD COMPONENT CALLING */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {statsData.map((d, k) => {
                return <DashBoardComponent key={k} {...d} colorIndex={k} />;
              })}
            </div>

            {/* BULK UPLPOAD AND NEW EMITTER  */}
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
                  onClick={handleAddEmitterOpen}
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
                    Emitter
                  </span>
                </button>
              </div>
            </div>

            {/* LISTVIEW TABLE */}
            <div className="mt-4">
              <MaterialReactTable table={table} />
            </div>

            {/* BULK UPLOAD MODAL */}
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

      {/* VIEW MODAL */}
      <Dialog open={openView} onClose={handleViewClose} maxWidth="sm" fullWidth>
        <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
          <div className="row">
            <div className="col-md-11">
              <Typography variant="h6">Emitter Details</Typography>
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
                {/* <TableBody>
                                    <TableRow>
                                        <TableCell>User Name</TableCell>
                                        <TableCell>{selectedRowData.firstName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email ID</TableCell>
                                        <TableCell>{selectedRowData.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>{selectedRowData.pno}</TableCell>
                                    </TableRow>
                                </TableBody> */}
                <TableBody>
                  {/* <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>{selectedRowData.userId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emitter ID</TableCell>
                    <TableCell>{selectedRowData.customersVO.id}</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>{selectedRowData.firstName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email ID</TableCell>
                    <TableCell>{selectedRowData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>{selectedRowData.pno}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>
                      {selectedRowData.userAddressVO.address1}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>City</TableCell>
                    {selectedRowData.userAddressVO.city ? (
                      <TableCell>
                        {selectedRowData.userAddressVO.city}
                      </TableCell>
                    ) : (
                      <TableCell>-</TableCell>
                    )}
                    {/* <TableCell>{selectedRowData.userAddressVO.city}</TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>{selectedRowData.userAddressVO.state}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>
                      {selectedRowData.userAddressVO.country}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PinCode</TableCell>
                    <TableCell>{selectedRowData.userAddressVO.pin}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>{selectedRowData.active}</TableCell>
                                    </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions> */}
      </Dialog>
    </>
  );
};

export default EmitterDetails;
