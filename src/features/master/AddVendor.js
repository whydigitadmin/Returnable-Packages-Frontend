import * as React from "react";
import ToolTip from "../../components/Input/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { FaStarOfLife } from "react-icons/fa";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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

function AddVendor({ addVendors }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const handleFlows = () => {
    addVendors(false);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4">Vendor Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Vendor Type
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="flex justify-start mb-4">
              <div className="me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  className="label-text label-font-size text-base-content ms-2"
                  for="flexRadioDefault1"
                >
                  Material
                </label>
              </div>
              <div className="">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  className="label-text label-font-size text-base-content ms-2"
                  for="flexRadioDefault1"
                >
                  Transport
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Primary Contact
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"First Name"}
              content={"The individual's given or personal name"}
              updateFormValue={updateFormValue}
            />
            <ToolTip
              placeholder={"Last Name"}
              content={"The individual's family or surname"}
              updateFormValue={updateFormValue}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Vendor Organisation Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Enter"}
              content={
                "The official name or title of the vendor's organization or company"
              }
              updateFormValue={updateFormValue}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Display Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Enter"}
              content={"The name or label used for displaying"}
              updateFormValue={updateFormValue}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
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
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Enter"}
              content={"The email address associated with the contact."}
              updateFormValue={updateFormValue}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Phone Number
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Enter"}
              content={"The contact's telephone number"}
              updateFormValue={updateFormValue}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Vendor Activate Portal
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <FormControlLabel
              control={<IOSSwitch disabled sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab className="text-form" label="Address" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex flex-column">
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    className="white-btn label px-4 mb-4"
                  >
                    Add Billing Address 1
                  </Button>
                </div>
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  + Add Billing Address
                </button>
              </div>
              <div className="col-lg-6 col-md-6 d-flex flex-column">
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    className="white-btn label px-4 mb-4"
                  >
                    Add Shipping Address 1
                  </Button>
                </div>
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  + Add Shipping Address
                </button>
              </div>
            </div>
          </CustomTabPanel>
        </Box>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleFlows}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddVendor;
