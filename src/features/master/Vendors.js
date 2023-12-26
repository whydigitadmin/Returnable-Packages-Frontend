import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import { FaCloudUploadAlt, FaUser } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import AddVendor from "./AddVendor";
import DashBoardComponent from "./DashBoardComponent";

const statsData = [
  {
    title: "No of Vendor",
    value: "0",
    icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Active Vendor",
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
];
const columns = [
  { field: "id", headerName: "Sr. No", width: 90 },
  { field: "VendorDisplayName", headerName: "Vendor Display Name", width: 150 },
  { field: "VendorType", headerName: "Vendor Type", width: 100 },
  { field: "Email", headerName: "Email", width: 120 },
  { field: "GST", headerName: "GST", width: 120 },
  { field: "City", headerName: "City", width: 120 },
  { field: "State", headerName: "State", width: 120 },
  { field: "Status", headerName: "Status", width: 90 },
];

const rows = [
  {
    id: 1,
    VendorDisplayName: "John",
    VendorType: "Vap",
    Email: "John@gmail.com",
    GST: "12354687",
    City: "Bengaluru",
    State: "Karnataka",
    Status: "Active",
  },
];

function Vendors() {
  const [open, setOpen] = React.useState(false);
  const [addVendors, setAddVendors] = React.useState(false);
  const [data, setData] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddVendors = () => {
    setAddVendors(true);
  };

  const handleBack = () => {
    setAddVendors(false);
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
        accessorKey: "vendordisplayname",
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
        accessorKey: "vendortype",
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
        accessorKey: "gst",
        header: "GST",
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
        accessorKey: "status",
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
  return (
    <>
      {addVendors ? (
        <AddVendor addVendors={handleBack} />
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
                className="btn btn-ghost btn-sm text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleClickOpen}
              >
                <IoIosAdd style={{ fontSize: 30, color: "blue" }} />
                <span className="">Bulk Upload</span>
              </button>
              <button
                className="btn btn-ghost btn-sm text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleAddVendors}
              >
                <IoIosAdd style={{ fontSize: 30, color: "blue" }} />
                <span className="">Vendor</span>
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
                <div className="d-flex justify-content-center my-3">
                  <div className="col-4 ms-5">
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
                <div className="col-6 my-3">
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
    </>
  );
}

export default Vendors;
