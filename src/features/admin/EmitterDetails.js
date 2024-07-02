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
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
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
import { FaBoxOpen, FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import sampleFile from "../../assets/sampleFiles/rp_user_sample_data.xlsx";
import BulkUploadDialog from "../../utils/BulkUoloadDialog";
import DashBoardComponent from "../master/DashBoardComponent";
import EmitterCreation from "./EmitterCreation";
import { FaDatabase } from "react-icons/fa6";

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
  const [statsData, setStatsData] = useState([]);

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
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

        const allEmitters = response.data.paramObjectsMap.userVO.filter(
          (user) => user.role === "ROLE_EMITTER"
        );
        const totalEmitters = allEmitters.length;
        const activeEmitters = allEmitters.filter(
          (customer) => customer.active === "Active"
        ).length;
        const inActiveEmitters = allEmitters.filter(
          (customer) => customer.active === "In-Active"
        ).length;
        setStatsData([
          {
            title: "All Emitters",
            value: totalEmitters.toString(),
            icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Active Emitters",
            value: activeEmitters.toString(),
            icon: <FaUser className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "In-Active Emitters",
            value: inActiveEmitters.toString(),
            icon: <FaDatabase className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "--",
            value: "0",
            icon: <FaDatabase className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
        ]);
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
              <div className="d-flex justify-content-end mt-4">
                {/* <button
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
                </button> */}
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
            {/* <Dialog
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
            </Dialog> */}
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
