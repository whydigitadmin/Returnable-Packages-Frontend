import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaCloudUploadAlt, FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
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

function AddCustomer({ addcustomer }) {
  //const [openBankModal, setOpenBankModal] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const [openBillingModal, setOpenBillingModal] = React.useState(false);
  const [openShippingModal, setOpenShippingModal] = React.useState(false);
  const [openBankModal, setOpenBankModal] = React.useState(false);
  const [orgId, setOrgId] = React.useState(1);

  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    customerOrgName: "",
    displayName: "",
    customerCode: "",
    email: "",
    phone: "",
    customerActivatePortal: true,
    active: true,
    orgId: orgId,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    customerOrgName: "",
    customerCode: "",
    displayName: "",
    email: "",
    phone: "",
    customerActivatePortal: true,
    active: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateFormValue = ({ updateType, value }) => {
    setCustomerData({ ...customerData, [updateType]: value });
    // console.log(updateType);
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

  const handleCustomerClose = () => {
    addcustomer(false);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleCustomer = () => {
    const errors = {};
    if (!customerData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!customerData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!customerData.customerOrgName.trim()) {
      errors.customerOrgName = "Organisation Name is required";
    }
    if (!customerData.displayName.trim()) {
      errors.displayName = "Display Name is required";
    }
    if (!customerData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!customerData.customerCode.trim()) {
      errors.customerCode = "CustomerCode is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("Test", customerData);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/master/customers`,
        customerData
      )
      .then((response) => {
        console.log("Response:", response.data);
        addcustomer(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        {/* <h1 className="text-xl font-semibold mb-4">New Customer</h1> */}

        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">New Customer Details</h1>
          <IoMdClose
            onClick={handleCustomerClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-2">
              <span className={"label-text label-font-size text-base-content"}>
                First Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              type="text"
              className="form-control form-sz"
              placeholder="First Name"
              name="firstName"
              value={customerData.firstName}
              onChange={handleInputChange}
            />
            {formErrors.firstName && (
              <div className="error-text">{formErrors.firstName}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Last Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              type="text"
              placeholder="Last Name"
              value={customerData.lastName}
              name="lastName"
              className="form-control form-sz"
              onChange={handleInputChange}
            />
            {formErrors.lastName && (
              <div className="error-text">{formErrors.lastName}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Customer Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <input
              type="text"
              placeholder="Customer Code"
              value={customerData.customerCode}
              className="form-control form-sz"
              name="customerCode"
              onChange={handleInputChange}
            />
            {formErrors.customerCode && (
              <div className="error-text">{formErrors.customerCode}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Customer Organisation Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <input
              type="text"
              placeholder="Org name"
              value={customerData.customerOrgName}
              className="form-control form-sz"
              name="customerOrgName"
              onChange={handleInputChange}
            />
            {formErrors.customerOrgName && (
              <div className="error-text">{formErrors.customerOrgName}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
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
          <div className="col-lg-3 col-md-6 mt-1">
            <input
              type="text"
              placeholder="Display Name"
              value={customerData.displayName}
              className="form-control form-sz"
              name="displayName"
              onChange={handleInputChange}
            />
            {formErrors.displayName && (
              <div className="error-text">{formErrors.displayName}</div>
            )}
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
            <input
              type="text"
              className="form-control form-sz"
              placeholder="email"
              value={customerData.email}
              name="email"
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <div className="error-text">{formErrors.email}</div>
            )}
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
            <input
              type="text"
              className="form-control form-sz"
              placeholder="Phone"
              value={customerData.phone}
              name="phone"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                SOP
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <input
              type="text"
              placeholder="SOP"
              value={customerData.sop}
              name="sop"
              onChange={handleInputChange}
              className="form-control form-sz"
            />
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Document
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <Button
              component="label"
              variant="contained"
              className="text-form mt-1"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>

          <div className="col-lg-3 col-md-6 mt-1 mb-2">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Customer Activate Portal
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <FormControlLabel
              control={<IOSSwitch disabled sx={{ m: 1 }} defaultChecked />}
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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab className="text-form" label="Address" {...a11yProps(0)} />
              <Tab
                className="text-form"
                label="Bank Details"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex flex-column">
                <div>
                  <Button
                    onClick={handleBillingOpen}
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
                    onClick={handleShippingOpen}
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
          <CustomTabPanel value={value} index={1}>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Bank
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name=""
                  // value={}
                  // onChange={}
                />
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Account No
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name=""
                  // value={}
                  // onChange={}
                />
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Account Name
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name=""
                  // value={}
                  // onChange={}
                />
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
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
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name=""
                  // value={}
                  // onChange={}
                />
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    IFSC Code
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  type={"text"}
                  placeholder={""}
                  // name=""
                  // value={}
                  // onChange={}
                />
              </div>
            </div>
          </CustomTabPanel>
        </Box>

        {/* Billing Address Modal Define */}
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={openBillingModal}
          onClose={handleBillingClose}
        >
          <div className="d-flex justify-content-between">
            <DialogTitle>Add Billing Address 1</DialogTitle>
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
                    GST Registration Status
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Registered</option>
                    <option value="">Unregistered</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    GST Number
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"GST Number"}
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
                    Street 1
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <textarea
                    style={{ fontSize: "0.800rem" }}
                    className="form-control label label-text label-font-size text-base-content"
                    placeholder="Street 1"
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Street 2
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <textarea
                    style={{ fontSize: "0.800rem" }}
                    className="form-control label label-text label-font-size text-base-content"
                    placeholder="Street 2"
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    State
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Tamil Nadu</option>
                    <option value="">Goa</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    City
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"City"}
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
                    Pin Code
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"Pin Code"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Contact Name
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"Contact Name"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Phone
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"Phone"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <div className="d-flex flex-row">
                    <input
                      style={{ marginTop: 10 }}
                      className="form-check-input me-1"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="label label-text label-font-size text-base-content"
                      for="flexCheckDefault"
                    >
                      Mark as Primary
                    </label>
                  </div>
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

        {/* Shipping Address Modal Define */}
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={openShippingModal}
          onClose={handleShippingClose}
        >
          <div className="d-flex justify-content-between">
            <DialogTitle>Add Shipping Address 1</DialogTitle>
            <IoMdClose
              onClick={handleShippingClose}
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
                    GST Registration Status
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Registered</option>
                    <option value="">Unregistered</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    GST Number
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"GST Number"}
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
                    Street 1
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <textarea
                    style={{ fontSize: "0.800rem" }}
                    className="form-control label label-text label-font-size text-base-content"
                    placeholder="Street 1"
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Street 2
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <textarea
                    style={{ fontSize: "0.800rem" }}
                    className="form-control label label-text label-font-size text-base-content"
                    placeholder="Street 2"
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    State
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input input-bordered ps-2"
                  >
                    <option value=""></option>
                    <option value="">Tamil Nadu</option>
                    <option value="">Goa</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    City
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"City"}
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
                    Pin Code
                    <FaStarOfLife className="must" />
                  </span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"Pin Code"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Contact Name
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"text"}
                    // value={value}
                    placeholder={"Contact Name"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label label-text label-font-size text-base-content">
                    Phone
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    type={"number"}
                    // value={value}
                    placeholder={"Phone"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <div className="d-flex flex-row">
                    <input
                      style={{ marginTop: 10 }}
                      className="form-check-input me-1"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="label label-text label-font-size text-base-content"
                      for="flexCheckDefault"
                    >
                      Mark as Primary
                    </label>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mb-2 me-2">
            <Button onClick={handleShippingClose}>Cancel</Button>
            <Button component="label" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleCustomer}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCustomerClose}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
export default AddCustomer;
