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
import { FaBoxOpen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
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
    getWarehouseData();
  };

  useEffect(() => {
    getWarehouseData();
  }, []);

  const getWarehouseData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/view`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.WarehouseVO);
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
        accessorKey: "warehouse_id",
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
        accessorKey: "warehouse_name",
        header: "Asset Group name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "state",
        header: "State",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "city",
        header: "City",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "pincode",
        header: "Pincode",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "gst",
        header: "Gst",
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
      {add ? (
        <AddItemSpecification addItemSpecification={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="">
            <h1 className="text-2xl font-semibold">Asset Group Details</h1>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleClickOpen}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add New Asset Group
              </button>
              <button
                type="button"
                onClick={handleAddOpen}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add New Asset Category
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
              <DialogTitle>Add New Asset Group</DialogTitle>
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
                          "label-text label-font-size text-base-content"
                        }
                      >
                        Asset Group Name
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <input
                      style={{
                        height: 40,
                        fontSize: "0.800rem",
                      }}
                      type={"text"}
                      // value={value}
                      placeholder={"Asset Group Name"}
                      // onChange={(e) => updateInputValue(e.target.value)}
                      className="input mb-2 p-1 w-full input-bordered"
                    />
                  </div>
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

export default ItemGroup;
