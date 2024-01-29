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
import { FaBox, FaCloudUploadAlt } from "react-icons/fa";
import { FaRegObjectGroup } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";
import AddItem from "./AddItems";
import DashBoardComponent from "./DashBoardComponent";

const statsData = [
  {
    title: "Total Assets",
    value: "0",
    icon: <FaBox className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Active Assets",
    value: "0",
    icon: <FaBox className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Asset Categories",
    value: "0",
    icon: <FaRegObjectGroup className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Average Life",
    value: "0",
    icon: <LuTimerReset className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
];

function Items() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
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
    getAssetData();
  };

  useEffect(() => {
    getAssetData();
  }, []);

  const getAssetData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/asset`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.assetVO);
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
        accessorKey: "assetCategory",
        header: "Category",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "length",
        header: "Length",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "breath",
        header: "Breath",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        accessorKey: "height",
        header: "Height",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "dimUnit",
        header: "Dimension Unit",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "manufacturer",
        header: "Manufacturer",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "brand",
        header: "Brand",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "weight",
        header: "Weight",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "expectedLife",
        header: "Expected Life",
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
        <AddItem addItem={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>
          <div className="">
            {/* <h1 className="text-2xl font-semibold mt-4">Assets</h1> */}
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
                onClick={handleAddOpen}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Asset</span>
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
        // </div>
      )}
    </>
  );
}

export default Items;
