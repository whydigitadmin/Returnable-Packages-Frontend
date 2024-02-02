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
import { FaBoxes, FaCloudUploadAlt } from "react-icons/fa";
import { FaRegObjectGroup } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";
import AddItemGroups from "./AddItemGroups";
import DashBoardComponent from "./DashBoardComponent";

const statsData = [
  {
    title: "Total Asset Groups",
    value: "0",
    icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Active Asset Groups",
    value: "0",
    icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
    description: "",
  },
  {
    title: "Asset Groups Categories",
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
const columns = [
  { field: "id", headerName: "Sr. No", width: 90 },
  { field: "Name", headerName: "Name", width: 150 },
  { field: "SKU", headerName: "SKU", width: 90 },
  { field: "Category", headerName: "Category", width: 130 },
  { field: "PurchasePrice", headerName: "Purchase Price", width: 130 },
  { field: "SalesPrice", headerName: "Sales Price", width: 120 },
  { field: "HSN", headerName: "HSN", width: 100 },
  { field: "Status", headerName: "Status", width: 100 },
];

function CreateKit() {
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [addItem, setAddItem] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedKitDetails, setSelectedKitDetails] = React.useState(null);
  const [kitAssetCategory, setKitAssetCategory] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddItem = () => {
    setAddItem(true);
  };

  const handleKitIdClick = (kitDetails, data) => {
    setSelectedKitDetails(selectedKitDetails);
    setKitAssetCategory(kitAssetCategory); // Set kitAssetCategory in state
    setOpenNew(true); // Open the popup
    console.log("test", kitDetails);
  };

  const handleBack = () => {
    setAddItem(false);
    getAllKitData();
  };

  const handleClose = () => {
    setOpen(false);
    setOpenNew(false);
  };

  useEffect(() => {
    getAllKitData();
  }, [addItem]);

  const getAllKitData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getallkit`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.KitVO);
        console.log(
          "Updated data inside getAllKitData:",
          response.data.paramObjectsMap.KitVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Log the updated state whenever 'data' changes
  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

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
        header: "S.No",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "id",
        header: "Kit ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
          onClick: (row) => handleKitIdClick(row, data), // Handle click event
          style: {
            cursor: "pointer",
            textDecoration: "underline",
            color: "blue",
          },
        },
      },
      // ... (other columns if needed)
    ],
    [] // Dependency array
  );

  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: "id",
  //       header: "Kit ID",
  //       size: 50,
  //       muiTableHeadCellProps: {
  //         align: "first",
  //       },
  //       muiTableBodyCellProps: {
  //         align: "first",
  //       },
  //     },
  //     {
  //       accessorKey: "assetCategory",
  //       header: "Name",
  //       size: 50,
  //       muiTableHeadCellProps: {
  //         align: "center",
  //       },
  //       muiTableBodyCellProps: {
  //         align: "center",
  //       },
  //     },
  //     {
  //       accessorKey: "assetName",
  //       header: "assetName",
  //       size: 50,
  //       muiTableHeadCellProps: {
  //         align: "center",
  //       },
  //       muiTableBodyCellProps: {
  //         align: "center",
  //       },
  //     },
  //     {
  //       accessorKey: "quantity",
  //       header: "quantity",
  //       size: 50,
  //       muiTableHeadCellProps: {
  //         align: "center",
  //       },
  //       muiTableBodyCellProps: {
  //         align: "center",
  //       },
  //     },
  //   ],
  //   []
  // );

  const table = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <>
      {addItem ? (
        <AddItemGroups addItem={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div>
          <div className="">
            {/* <h1 className="text-2xl font-semibold mt-4">Asset Kit</h1> */}
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
                onClick={handleAddItem}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Kit</span>
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
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={openNew}
            onClose={handleClose}
          >
            <DialogTitle>Kit Details</DialogTitle>
            <DialogContent>
              {/* Display selected kit details in the popup */}
              {selectedKitDetails && (
                <div>
                  <p>Kit ID: {selectedKitDetails && selectedKitDetails.id}</p>

                  {/* Render kitAssetCategory details */}
                  {kitAssetCategory && (
                    <div>
                      <p>Kit Asset Category:</p>
                      {Object.keys(kitAssetCategory).map((category) => (
                        <div key={category}>
                          <strong>{category}:</strong>
                          <ul>
                            {kitAssetCategory[category].map((asset) => (
                              <li key={asset.id}>
                                {asset.assetName}: {asset.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>

            <DialogActions className="mb-2 me-2">
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default CreateKit;
