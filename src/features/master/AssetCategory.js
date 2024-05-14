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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAssetCategory from "./AddAssetCategory";

const statsData = [
  {
    title: "No of warehouse",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Active warehouse",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Low stock warehouses",
    value: "0",
    icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Average Transaction",
    value: "0",
    icon: <FaBoxOpen className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
];

function AssetCategory() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [assetCategory, setAssetCategory] = React.useState("");
  const [assetCategoryId, setAssetCategoryId] = React.useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [loginUserName, setLoginUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [active, setActive] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [openView, setOpenView] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [edit, setEdit] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleViewRow = (row) => {
    setSelectedRowData(row.original);
    console.log("setSelectedRowData", row.original);
    console.log("THE ACTIVE FIELD IS ", row.original.active);
    setOpenView(true);
  };

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.id);
    console.log("setSelectedRowID", row.original.id);
    setEdit(true);
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
    setEdit(false);
    getAllAssetGroup();
  };

  useEffect(() => {
    getAllAssetGroup();
  }, []);

  const getAllAssetGroup = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/assetGroup`
      );

      if (response.status === 200) {
        setData(
          response.data.paramObjectsMap.assetGroupVO.assetGroupVO.reverse()
        );
        console.log(
          "TESTING:",
          response.data.paramObjectsMap.assetGroupVO.assetGroupVO.reverse()
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    console.log("Test11", event.target.value);
    switch (name) {
      case "assetCategory":
        setAssetCategory(value);
        break;
      case "assetCategoryId":
        setAssetCategoryId(value);
        break;
      // default:
      //   break;
    }
  };
  //SAVE TYPE
  const handleAddAssetCategory = () => {
    const errors = {};
    if (!assetCategory) {
      errors.assetCategory = "Name is required";
    }
    if (!assetCategoryId) {
      errors.assetCategoryId = "Code is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        assetType: assetCategory,
        typeCode: assetCategoryId,
        createdby: loginUserName,
        modifiedby: loginUserName,
        orgId,
        active,
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/master/addAssetCategory`,
        formData
      )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            setAssetCategory("");
            setAssetCategoryId("");
            toast.success("Category Created successfully", {
              autoClose: 2000,
              theme: "colored",
            });
            handleClose();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
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
            <IconButton onClick={() => handleEditRow(row)}>
              <EditIcon />
            </IconButton>
          </div>
        ),
      },
      {
        accessorKey: "assetType",
        header: "Type",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "category",
        header: "Asset",
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
        size: 30,
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
      <div>
        <ToastContainer />
      </div>

      {(add && <AddAssetCategory addItemSpecification={handleBack} />) ||
        (edit && (
          <AddAssetCategory
            addItemSpecification={handleBack}
            editItemSpecificationId={selectedRowId}
          />
        )) || (
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            <div className="">
              <div className="flex justify-between">
                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleClickOpen}
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
                    Type
                  </span>
                </button>
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
                    Category
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <MaterialReactTable table={table} columns={columns} />
            </div>
            <Dialog
              fullWidth={true}
              maxWidth={"sm"}
              open={open}
              onClose={handleClose}
            >
              <div className="d-flex justify-content-between">
                <DialogTitle>Type</DialogTitle>
                <IoMdClose
                  onClick={handleClose}
                  className="cursor-pointer w-8 h-8 mt-3 me-3"
                />
              </div>
              <DialogContent>
                <DialogContentText className="d-flex flex-column">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 mb-2">
                      <label className="label">
                        <span
                          className={
                            "label-text label-font-size text-base-content d-flex flex-row"
                          }
                        >
                          Name:
                          <FaStarOfLife className="must" />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <input
                        type={"text"}
                        name="assetCategory"
                        value={assetCategory}
                        onChange={handleCategoryChange}
                        placeholder={""}
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z\s]/g, "");
                        }}
                        className="form-control form-sz mb-2"
                      />
                      {errors.assetCategory && (
                        <span className="error-text">
                          {errors.assetCategory}
                        </span>
                      )}
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                      <label className="label">
                        <span
                          className={
                            "label-text label-font-size text-base-content d-flex flex-row"
                          }
                        >
                          Code:
                          <FaStarOfLife className="must" />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <input
                        type={"text"}
                        value={assetCategoryId}
                        name="assetCategoryId"
                        onChange={handleCategoryChange}
                        onInput={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        placeholder={""}
                        className="form-control form-sz mb-2"
                      />
                      {errors.assetCategoryId && (
                        <span className="error-text">
                          {errors.assetCategoryId}
                        </span>
                      )}
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions className="mb-2 me-2">
                <Button onClick={handleClose} className="text-sm">
                  Cancel
                </Button>
                <button
                  type="button"
                  onClick={handleAddAssetCategory}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Submit
                </button>
              </DialogActions>
            </Dialog>
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
                    <Typography variant="h6">Asset Category Details</Typography>
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
                          <TableCell>Type</TableCell>
                          <TableCell>{selectedRowData.assetType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Asset</TableCell>
                          <TableCell>{selectedRowData.category}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Code</TableCell>
                          <TableCell>{selectedRowData.categoryCode}</TableCell>
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

export default AssetCategory;
