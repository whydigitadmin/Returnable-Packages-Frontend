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
    title: "-",
    value: "0",
    icon: <LuTimerReset className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
];

function CreateKit() {
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [addItem, setAddItem] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedKitDetails, setSelectedKitDetails] = React.useState(null);
  const [kitAssetCategory, setKitAssetCategory] = React.useState(null);
  const [serialNumber, setSerialNumber] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddItem = () => {
    setAddItem(true);
  };

  const handleKitIdClick = (row) => {
    setSelectedKitDetails(row); // Assuming the row contains necessary details
    setKitAssetCategory(row.kitAssetCategory); // Adjust this based on your actual data structure
    setOpenNew(true); // Open the popup
    console.log("Kit Details:", row);
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

  useEffect(() => {
    // Reset serial number when data changes
    setSerialNumber(0);
  }, [data]);

  const getAllKitData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getallkit`
      );

      if (response.status === 200) {
        const kits = response.data.paramObjectsMap.KitVO;
        // setData(response.data.paramObjectsMap.KitVO);
        let serialNumberCounter = 0;

        // Add a static serial number to each kit object
        const kitsWithSerialNumber = kits.map((kit) => ({
          ...kit,
          serialNumber: ++serialNumberCounter,
        }));

        // Set the data state with kits including the serial number
        setData(kitsWithSerialNumber);
        console.log("Updated data inside getAllKitData:", kitsWithSerialNumber);
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
    (row) => [
      {
        accessorKey: "serialNumber",
        header: "S.No",
        size: 30,
        muiTableHeadCellProps: {
          textAlign: "first",
        },
        muiTableBodyCellProps: {
          textAlign: "first",
        },
        renderCell: (rowData) => rowData.serialNumber,
      },
      {
        accessorKey: "id",
        header: "Kit ID",
        size: 30,
        muiTableHeadCellProps: {
          textAlign: "center",
        },
        muiTableBodyCellProps: (row) => ({
          textAlign: "center",
          onClick: () => handleKitIdClick(row.row.original), // Pass the entire kit object
          style: {
            cursor: "pointer",
            textDecoration: "underline",
            color: "blue",
          },
        }),
      },
      // ... (other columns if needed)
    ],
    [data] // Dependency array
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
          <div className="row">
            <div className="col-lg-6 mt-4">
              <MaterialReactTable table={table} />
            </div>
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
              {selectedKitDetails && (
                <div>
                  <p className="kit-detail">Kit ID: {selectedKitDetails.id}</p>

                  {kitAssetCategory && (
                    <div>
                      <p className="kit-detail">Kit Asset Category:</p>
                      <table className="asset-table">
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Asset Name</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(kitAssetCategory).map((category) =>
                            kitAssetCategory[category].map((asset) => (
                              <tr key={asset.id}>
                                <td>{category}</td>
                                <td>{asset.assetName}</td>
                                <td>{asset.quantity}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
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
