import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
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
import { FaBoxOpen } from "react-icons/fa";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import { FaStarOfLife } from "react-icons/fa";
import AddItemSpecification from "./AddItemSpecification";

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

function ItemGroup() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [assetCategory, setAssetCategory] = React.useState("");
  const [assetCategoryId, setAssetCategoryId] = React.useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [active, setActive] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [errors, setErrors] = useState({});
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
        setData(response.data.paramObjectsMap.assetGroupVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
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

  const handleAddAssetCategory = () => {
    const errors = {};
    if (!assetCategory) {
      errors.assetCategory = "Category Name is required";
    }
    if (!assetCategoryId) {
      errors.assetCategoryId = "Category Code is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        assetCategory,
        assetCategoryId,
        active,
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/master/addAssetCategory`,
        formData
      )
        .then((response) => {
          console.log("Response:", response.data);
          setAssetCategory("");
          setAssetCategoryId("");
          setOpen(false);
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
        accessorKey: "id",
        header: "ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "orgId",
        header: "Organisation ID",
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
        header: "Category Name",
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
        header: "Category Name",
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
        <AddItemSpecification addItemSpecification={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="">
            {/* <h1 className="text-2xl font-semibold">Asset Category Details</h1> */}
            <div className="flex justify-between">
              <button
                className="btn btn-ghost btn-lg text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleClickOpen}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Asset Category</span>
              </button>
              <button
                className="btn btn-ghost btn-lg text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleAddOpen}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Asset Group</span>
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
              <DialogTitle>Asset Category</DialogTitle>
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
                        Category Name:
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
                      className="form-control form-sz mb-2"
                    />
                    {errors.assetCategory && (
                      <span className="error-text">{errors.assetCategory}</span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <label className="label">
                      <span
                        className={
                          "label-text label-font-size text-base-content d-flex flex-row"
                        }
                      >
                        Category Code:
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
        </div>
      )}
    </>
  );
}

export default ItemGroup;
