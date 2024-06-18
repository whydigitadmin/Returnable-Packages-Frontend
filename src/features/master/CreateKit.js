import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxes } from "react-icons/fa";
import { FaRegObjectGroup } from "react-icons/fa6";
import { LuTimerReset } from "react-icons/lu";
// import AddItemGroups from "./AddKit";
import sampleFile from "../../assets/sampleFiles/rp_user_sample_data.xlsx";
import BulkUploadDialog from "../../utils/BulkUoloadDialog";
import AddKit from "./AddKit";
import DashBoardComponent from "./DashBoardComponent";

function CreateKit() {
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [addItem, setAddItem] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedKitDetails, setSelectedKitDetails] = React.useState(null);
  const [kitAssetCategory, setKitAssetCategory] = React.useState(null);
  const [serialNumber, setSerialNumber] = React.useState(0);
  const [kitCode, setKitCode] = React.useState(null);
  const [editKit, setEditKit] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState(null);

  const [statsData, setStatsData] = useState([
    {
      title: "Total Kits",
      value: "0",
      icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "Active Kits",
      value: "0",
      icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "-",
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
  ]);

  const handleClickOpen = () => {
    setOpen(true);
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
    setEditKit(false);
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

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.id);
    setEditKit(true);
  };

  const getAllKitData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getallkit`
      );

      if (response.status === 200) {
        const kits = response.data.paramObjectsMap.KitVO;
        console.log("kits", response.data.paramObjectsMap.KitVO);
        // setData(response.data.paramObjectsMap.KitVO);
        let serialNumberCounter = 0;

        // Add a static serial number to each kit object
        const kitsWithSerialNumber = kits.map((kit) => ({
          ...kit,
          serialNumber: ++serialNumberCounter,
        }));

        // Set the data state with kits including the serial number
        setData(kitsWithSerialNumber);

        const kitCodes = kits.map((kit) => kit.kitCode);
        setKitCode(kitCodes);
        console.log("code", kitCodes);
        console.log("Updated data inside getAllKitData:", kitsWithSerialNumber);

        const totalKits = kits.length;
        const activeKits = kits.filter((kit) => kit.active === "Active").length;
        const inActiveKits = kits.filter(
          (kit) => kit.active === "In-Active"
        ).length;

        setStatsData([
          {
            title: "Total Kits",
            value: totalKits.toString(),
            icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "Active Kits",
            value: activeKits.toString(),
            icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "In-Active Kits",
            value: inActiveKits.toString(),
            icon: <FaRegObjectGroup className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
          {
            title: "-",
            value: "0",
            icon: <LuTimerReset className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
        ]);
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
      // {
      //   accessorKey: "serialNumber",
      //   header: "S.No",
      //   size: 30,
      //   muiTableHeadCellProps: {
      //     textAlign: "first",
      //   },
      //   muiTableBodyCellProps: {
      //     textAlign: "first",
      //   },
      //   renderCell: (rowData) => rowData.serialNumber,
      // },
      {
        accessorKey: "actions",
        header: "Action",
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
            <Tooltip
              title={
                row.original.eflag ? "Editing is disabled for this Kit" : ""
              }
              arrow
              disableHoverListener={!row.original.eflag}
            >
              <span>
                <IconButton
                  onClick={() => handleEditRow(row)}
                  disabled={row.original.eflag}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: "kitNo",
        header: "Kit ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: (row) => ({
          align: "center",
          onClick: () => handleKitIdClick(row.row.original), // Pass the entire kit object
          style: {
            cursor: "pointer",
            textDecoration: "underline",
            color: "blue",
          },
        }),
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        muiTableHeadCellProps: {
          textAlign: "center",
        },
        muiTableBodyCellProps: {
          textAlign: "center",
        },
      },
    ],
    [data] // Dependency array
  );

  const table = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <>
      {(addItem && <AddKit addItem={handleBack} />) ||
        (editKit && (
          <AddKit addItem={handleBack} kitEditId={selectedRowId} />
        )) || (
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {statsData.map((d, k) => {
                return <DashBoardComponent key={k} {...d} colorIndex={k} />;
              })}
            </div>
            <div className="">
              {/* <h1 className="text-2xl font-semibold mt-4">Asset Kit</h1> */}
              <div className="flex justify-between mt-4">
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
                  onClick={handleAddItem}
                >
                  {/* <IoIosAdd style={{ fontSize: 45, color: "blue" }} /> */}
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
                    Kit
                  </span>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt-4">
                <MaterialReactTable table={table} />
              </div>
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
                    <p className="kit-detail">
                      <strong>Kit ID :</strong> {selectedKitDetails.kitNo}{" "}
                      <br />
                      <strong>Kit Desc :</strong> {selectedKitDetails.kitDesc}
                    </p>

                    {kitAssetCategory && (
                      <div>
                        {/* <p className="kit-detail">Kit Asset Category:</p> */}
                        <table className="asset-table">
                          <thead>
                            <tr>
                              <th style={{ textAlign: "center" }}>
                                Asset Type
                              </th>
                              <th style={{ textAlign: "center" }}>
                                Asset Category
                              </th>
                              <th style={{ textAlign: "center" }}>
                                Asset Code
                              </th>
                              <th style={{ textAlign: "center" }}>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(kitAssetCategory).map((category) =>
                              kitAssetCategory[category].map((asset) => (
                                <tr key={asset.id}>
                                  <td style={{ textAlign: "center" }}>
                                    {asset.assetType}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {asset.assetCategory}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {asset.assetCodeId}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {asset.quantity}
                                  </td>
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
