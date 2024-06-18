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
import { FaUser } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import sampleFile from "../../assets/sampleFiles/rp_user_sample_data.xlsx";
import BulkUploadDialog from "../../utils/BulkUoloadDialog";
import AddVendor from "./AddVendor";
import DashBoardComponent from "./DashBoardComponent";

function Vendors() {
  const [open, setOpen] = React.useState(false);
  const [addVendors, setAddVendors] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [openView, setOpenView] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [edit, setEdit] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [statsData, setStatsData] = useState([
    {
      title: "No of Vendors",
      value: "0",
      icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    {
      title: "Active Vendors",
      value: "0",
      icon: <FaUser className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "Average PO Per Vendor",
      value: "0",
      icon: <FaDatabase className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "Idle Vendors",
      value: "0",
      icon: <FaDatabase className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
  ]);

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.id);
    console.log("setSelectedRowID", row.original.id);
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

  const handleAddVendors = () => {
    setAddVendors(true);
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

  const handleBack = () => {
    setAddVendors(false);
    setEdit(false);
    getVendorData();
  };

  const handleClose = () => {
    setOpen(false);
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
      {
        accessorKey: "venderType",
        header: "Vendor Type",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "displyName",
        header: "Vendor Display Name",
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
      {
        accessorKey: "phoneNumber",
        header: "Phone",
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
        header: "Status",
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

  useEffect(() => {
    getVendorData();
  }, []);

  const getVendorData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getVendorByOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.vendorVO.reverse());
        const allVendors = response.data.paramObjectsMap.vendorVO;
        setData(allVendors.reverse());
        const totalVendors = allVendors.length;
        const activeVendors = allVendors.filter(
          (vendor) => vendor.active === "Active"
        ).length;
        const inActiveVendors = allVendors.filter(
          (vendor) => vendor.active === "In-Active"
        ).length;
        setStatsData([
          {
            title: "No of Vendors",
            value: totalVendors.toString(),
            icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "Active Vendors",
            value: activeVendors.toString(),
            icon: <FaUser className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            // title: "Average PO Per Vendor",
            title: "In-Active Vendors",
            value: inActiveVendors.toString(),
            icon: <FaDatabase className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "Idle Vendors",
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

  return (
    <>
      {(addVendors && <AddVendor addVendors={handleBack} />) ||
        (edit && (
          <AddVendor addVendors={handleBack} editVendorId={selectedRowId} />
        )) || (
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {statsData.map((d, k) => {
                return <DashBoardComponent key={k} {...d} colorIndex={k} />;
              })}
            </div>
            <div className="">
              <div className="flex justify-between mt-4">
                {/* <button
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
                </button> */}
                <BulkUploadDialog
                  open={open}
                  onOpenClick={handleClickOpen}
                  handleClose={handleClose}
                  dialogTitle="Upload File"
                  uploadText="Upload file"
                  downloadText="Sample File"
                  onSubmit={handleSubmit}
                  sampleFileDownload={sampleFile} // Change this to the actual path of your sample file
                  handleFileUpload={handleFileUpload}
                />
                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleAddVendors}
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
                    Vendor
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <MaterialReactTable table={table} />
            </div>
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
              <Typography variant="h6">Vendors Details</Typography>
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
                    <TableCell>Vendor Display Name</TableCell>
                    <TableCell>{selectedRowData.displyName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Vendor Type</TableCell>
                    <TableCell>{selectedRowData.venderType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{selectedRowData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>{selectedRowData.phoneNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Vendors;
