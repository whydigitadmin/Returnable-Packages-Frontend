import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import * as React from "react";
import { useMemo } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ToolTip from "../../components/Input/Tooltip";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#0d6ef",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function AddManufacturer({ addManufacturer }) {
  const [value, setValue] = React.useState(0);
  const [openBillingModal, setOpenBillingModal] = React.useState(false);
  const [openShippingModal, setOpenShippingModal] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const handleBillingOpen = () => {
    setOpenBillingModal(true);
  };
  const handleBillingClose = () => {
    setOpenBillingModal(false);
  };
  const handleShippingOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClose = () => {
    setOpenShippingModal(false);
  };

  const handleCloseAddManufacturer = () => {
    addManufacturer(false);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "SNo",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "itemGroup",
        header: "Item Group",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "itemName",
        header: "Item Name",
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
        accessorKey: "warrenty",
        header: "Warrenty",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "sellingPrice",
        header: "Selling Price",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "serviceDuration",
        header: "Service Duration(Days)",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "status",
        header: "Status",
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
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4">
          Manufacturer Basic Details
        </h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Company
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Manufacturer Company"}
              content={"Company Name"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Branch
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Manufacturer Branch"}
              content={"Manufacturer Branch Name"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Address
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Manufacturer Address"}
              content={"Manufacturer Address"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Email
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Company E-Mail"}
              content={"The email address associated with the contact"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Contact Person
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Contact Person"}
              content={"Contact Person Name"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Phone Number
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Mobile/Landline"}
              content={"The contact's telephone number"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
        <h1 className="text-xl font-semibold mt-3">Product Details</h1>
        <Box sx={{ width: "100%" }}>
          <CustomTabPanel value={value} index={0}>
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex flex-column mt-2">
                <div>
                  <button
                    type="button"
                    onClick={handleBillingOpen}
                    className="bg-blue me-5 mb-4 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            <MaterialReactTable table={table} />
          </CustomTabPanel>
        </Box>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={openBillingModal}
          onClose={handleBillingClose}
        >
          <div className="d-flex justify-content-between">
            <DialogTitle>Add Product</DialogTitle>
            <IoMdClose
              onClick={handleBillingClose}
              className="cursor-pointer w-8 h-8 mt-3 me-3"
            />
          </div>
          <DialogContent>
            <DialogContentText className="d-flex flex-column">
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Asset Group
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Asset"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Standard</option>
                    <option value="">Variable</option>
                    <option value="">Variable1</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label-text label-font-size text-base-content d-flex flex-row">
                    Asset Name
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Asset"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Pallet</option>
                    <option value="">Lid</option>
                    <option value="">Side Wall</option>
                  </select>
                </div>
              </div>
              {/* <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Weight
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"Weight"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div> */}
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label-text label-font-size text-base-content d-flex flex-row">
                    Warranty
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"Warranty"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Selling Price
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"Selling Price"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Del. Lead Time(Days)
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    //type={"number"}
                    // value={value}
                    placeholder={"Del. Lead Time"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mb-2 me-2">
            <Button onClick={handleBillingClose}>Cancel</Button>
            <Button component="label" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseAddManufacturer}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
export default AddManufacturer;
