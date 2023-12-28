import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AddLogistics from "./AddLogistics";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { styled } from "@mui/material/styles";

function Logistics() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);

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
  };
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
        accessorKey: "avglotsize",
        header: "Avg Lot Size",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "dispatchto",
        header: "Dispatch To",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "transportationto",
        header: "Transportation To",
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
      {add ? (
        <AddLogistics addlogistics={handleBack} />
      ) : (
        <>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClickOpen}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={handleAddOpen}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Add Logistics
            </button>
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
        </>
      )}
    </>
  );
}

export default Logistics;
