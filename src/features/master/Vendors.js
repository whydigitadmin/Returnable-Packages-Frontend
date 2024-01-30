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

function Vendors() {
  const [open, setOpen] = React.useState(false);
  const [addVendors, setAddVendors] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

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

  useEffect(() => {
    getVendorData();
  }, []);

  const getVendorData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/vender?id=${orgId}`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.venderVO);
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
    </>
  );
}

export default Vendors;
