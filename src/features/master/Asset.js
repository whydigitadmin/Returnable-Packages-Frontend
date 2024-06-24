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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBox } from "react-icons/fa";
import { FaRegObjectGroup } from "react-icons/fa6";
import sampleFile from "../../assets/sampleFiles/rp_user_sample_data.xlsx";
import BulkUploadDialog from "../../utils/BulkUoloadDialog";
import AddAsset from "./AddAsset";
import DashBoardComponent from "./DashBoardComponent";

function Asset() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openView, setOpenView] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [edit, setEdit] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [statsData, setStatsData] = useState([]);

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.id);
    setEdit(true);
  };

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleViewRow = (row) => {
    setSelectedRowData(row.original);
    setOpenView(true);
  };

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
    setEdit(false);
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
        const allAssets = response.data.paramObjectsMap.assetVO;

        setData(allAssets.reverse());
        const totalAsset = allAssets.length;
        const activeAsset = allAssets.filter(
          (asset) => asset.active === "Active"
        ).length;
        const inActiveAsset = allAssets.filter(
          (asset) => asset.active === "In-Active"
        ).length;
        const totalAssetCategory = allAssets.map((row) => row.category).length;

        setStatsData([
          {
            title: "Total Assets",
            value: totalAsset.toString(),
            icon: <FaBox className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "Active Assets",
            value: activeAsset.toString(),
            icon: <FaBox className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "In-Active Assets",
            value: inActiveAsset.toString(),
            icon: <FaBox className="w-5 h-5 text-white dashicon-sm" />,
            description: "",
          },
          {
            title: "Asset Categories",
            value: totalAssetCategory,
            icon: <FaRegObjectGroup className="w-7 h-7 text-white dashicon" />,
            description: "",
          },
        ]);
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
            <Tooltip
              title={
                row.original.eflag ? "Editing is disabled for this asset" : ""
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
        accessorKey: "assetType",
        header: "Type",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "category",
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
        accessorKey: "categoryCode",
        header: "Category Code",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "assetCodeId",
        header: "Asset Code",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "assetName",
        header: "Asset Description",
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

  return (
    <>
      {(add && <AddAsset addItem={handleBack} />) ||
        (edit && (
          <AddAsset addItem={handleBack} editItemId={selectedRowId} />
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
                  onClick={handleAddOpen}
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
                    Asset
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
            {/* VIEW MODAL */}
            <Dialog
              open={openView}
              onClose={handleViewClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
                <div className="row">
                  <div className="col-md-11">
                    <Typography variant="h6">Assets Details</Typography>
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
                          <TableCell>Type</TableCell>
                          <TableCell>{selectedRowData.assetType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell>{selectedRowData.category}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Category Code</TableCell>
                          <TableCell>{selectedRowData.categoryCode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Asset Code</TableCell>
                          <TableCell>{selectedRowData.assetCodeId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Asset Desc</TableCell>
                          <TableCell>{selectedRowData.assetName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Length</TableCell>
                          <TableCell>{selectedRowData.length}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Breath</TableCell>
                          <TableCell>{selectedRowData.breath}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Height</TableCell>
                          <TableCell>{selectedRowData.height}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Weight</TableCell>
                          <TableCell>{selectedRowData.weight}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
    </>
  );
}

export default Asset;
