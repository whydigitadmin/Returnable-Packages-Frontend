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
import React, { useEffect, useMemo } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import AddLogistics from "./AddLogistics";

function Logistics() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));

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

  useEffect(() => {
    getLogistics();
  }, []);

  const getLogistics = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/logistics?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.logisticsVO);
        setTableData(response.data.paramObjectsMap.logisticsVO);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    getLogistics();
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
        accessorKey: "avgLotSize",
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
        accessorKey: "dispatchFrequency",
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
        accessorKey: "diapatchTo",
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
        accessorKey: "transpotationTo",
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
              className="btn btn-ghost btn-lg text-sm col-xs-1 p-0 pe-2"
              style={{ color: "blue" }}
              onClick={handleClickOpen}
            >
              <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
              <span className="text-form text-base">Upload</span>
            </button>
            <button
              className="btn btn-ghost btn-lg text-sm col-xs-1 p-0 pe-2"
              style={{ color: "blue" }}
              onClick={handleAddOpen}
            >
              <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
              <span className="text-form text-base">Logistics</span>
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
