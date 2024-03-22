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
import { FaCloudUploadAlt, FaStarOfLife, FaTrash } from "react-icons/fa";
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
  const [id, setId] = React.useState();
  const [value, setValue] = React.useState(0);
  const [openShippingModal, setOpenShippingModal] = React.useState(false);
  const [openBankModal, setOpenBankModal] = React.useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [customerActivatePortal, setCustomerActivatePortal] =
    React.useState(true);
  const [customerCode, setCustomerCode] = React.useState("");
  const [entityLegalName, setEntityLegalName] = React.useState("");
  const [customerType, setCustomerType] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState();
  // const [isPrimary, setIsPrimary] = useState(false);
  const [active, setActive] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [addressShow, setAddressShow] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    gstRegistrationStatus: "",
    gstNumber: "",
    street1: "",
    street2: "",
    state: "",
    city: "",
    pinCode: "",
    contactName: "",
    phoneNumber: "",
    designation: "",
    email: "",
    // isPrimary: false,
  });
  const [errors1, setErrors1] = useState({
    gstRegistrationStatus: false,
    street1: false,
    state: false,
    city: false,
    pinCode: false,
  });
  const [bankAddresses, setBankAddresses] = useState([]);
  const [newBankAddress, setNewBankAddress] = useState({
    bank: "",
    accountNo: "",
    accountName: "",
    branch: "",
    ifscCode: "",
  });
  const [errors2, setErrors2] = useState({
    bank: false,
    accountNo: false,
    accountName: false,
    branch: false,
    ifscCode: false,
  });

  const isValidAddress = () => {
    return (
      newAddress.gstRegistrationStatus.trim() !== "" &&
      newAddress.street1.trim() !== "" &&
      newAddress.state.trim() !== "" &&
      newAddress.city.trim() !== "" &&
      newAddress.pinCode.trim() !== ""
    );
  };

  const handleAddressInputChange = (e, field) => {
    const value = e.target.value;
    setNewAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    // Clear error when user starts typing in a field
    setErrors1((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleCancel = () => {
    // Clear form fields
    setNewAddress({
      gstRegistrationStatus: "",
      gstNumber: "",
      street1: "",
      street2: "",
      state: "",
      city: "",
      pinCode: "",
      contactName: "",
      phoneNumber: "",
      designation: "",
      email: "",
      // isPrimary: false,
    });
    // Clear all error messages
    setErrors({
      gstRegistrationStatus: false,
      street1: false,
      state: false,
      city: false,
      pinCode: false,
    });
    // Close the dialog
    handleShippingClickClose();
  };

  const handleAddShippingAddress = () => {
    const addressWithCustomerId = { ...newAddress, customerId: customerId };
    setShippingAddresses([...shippingAddresses, addressWithCustomerId]);
    setNewAddress({
      gstRegistrationStatus: "",
      gstNumber: "",
      street1: "",
      street2: "",
      state: "",
      city: "",
      pincode: "",
      contactName: "",
      phoneNumber: "",
      designation: "",
      email: "",
      // isPrimary: false,
    });
    setOpenShippingModal(false);
  };

  // const handleAddressSubmit = async () => {
  //   const addressWithCustomerId = { ...newAddress, customerId: customerId };
  //   if (isValidAddress()) {
  //     try {
  //       const response = await axios.post(
  //         "/api/master/customersAddress",
  //         addressWithCustomerId
  //       );
  //       console.log("Response:", response.data);
  //       setErrors1({}); // Clear any previous errors on successful submission
  //       handleAddShippingAddress();
  //     } catch (error) {
  //       console.error("Error:", error);
  //       if (error.response && error.response.data) {
  //         // Handle errors from the server
  //         const serverErrors = error.response.data;
  //         setErrors1(serverErrors);
  //       } else {
  //         // Handle other errors
  //         setErrors1({ unexpectedError: true });
  //       }
  //     }
  //   } else {
  //     const updatedErrors = {};
  //     for (const field in newAddress) {
  //       if (
  //         field !== "street2" &&
  //         field !== "contactName" &&
  //         field !== "phoneNumber" &&
  //         field !== "isPrimary"
  //       ) {
  //         if (!newAddress[field].trim()) {
  //           updatedErrors[field] = true;
  //         }
  //       }
  //     }
  //     setErrors1(updatedErrors); // Update errors for invalid fields
  //   }
  // };

  // const handleAddressSubmit = async () => {
  //   const addressWithCustomerId = { ...newAddress, customerId: customerId };
  //   if (isValidAddress()) {
  //     try {
  //       const response = await axios.put(
  //         "/api/master/customersAddress",
  //         addressWithCustomerId
  //       );
  //       console.log("Response:", response.data);
  //       setErrors1({}); // Clear any previous errors on successful submission
  //       handleAddShippingAddress();
  //     } catch (errors1) {
  //       console.error("Error:", errors1);
  //       if (errors1.response && errors1.response.data) {
  //         // Handle errors from the server
  //         const serverErrors = errors1.response.data;
  //         setErrors1(serverErrors);
  //       } else {
  //         // Handle other errors
  //         setErrors1({ unexpectedError: true });
  //       }
  //     }
  //   } else {
  //     const updatedErrors = {};
  //     for (const field in newAddress) {
  //       if (
  //         field !== "street2" &&
  //         field !== "contactName" &&
  //         field !== "phoneNumber"
  //         // field !== "isPrimary"
  //       ) {
  //         if (!newAddress[field].trim()) {
  //           updatedErrors[field] = true;
  //         }
  //       }
  //     }
  //     setErrors1(updatedErrors); // Update errors for invalid fields
  //   }
  // };

  const handleAddressSubmit = async () => {
    const addressWithCustomerId = { ...newAddress, customerId: customerId };
    if (isValidAddress()) {
      // setErrors1({}); // Clear any previous errors on successful submission
      handleAddShippingAddress();
    }
    // setErrors1(updatedErrors); // Update errors for invalid fields
  };

  const isValidBankAddress = () => {
    return (
      newBankAddress?.bank?.trim() !== "" &&
      newBankAddress?.accountNo?.trim() !== "" &&
      newBankAddress?.accountName?.trim() !== "" &&
      newBankAddress?.branch?.trim() !== "" &&
      newBankAddress?.ifscCode?.trim() !== ""
    );
  };

  const handleBankInputChange = (e, field) => {
    const value = e.target.value;
    setNewBankAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    // Clear error when user starts typing in a field
    setErrors2((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleBankSubmit = async () => {
    const bankAddressWithCustomerId = {
      ...newBankAddress,
      customerId: customerId,
    };

    // Check if all fields are filled
    if (isValidBankAddress()) {
      setErrors2({}); // Clear any previous errors on successful submission
      handleAddBankAddress();
    }
  };

  // const handleBankSubmit = async () => {
  //   const bankAddressWithCustomerId = {
  //     ...newBankAddress,
  //     customerId: customerId,
  //   };
  //   if (isValidBankAddress()) {
  //     try {
  //       const response = await axios.post(
  //         "api/master/customersBankDetails",
  //         bankAddressWithCustomerId
  //       );
  //       console.log("Response:", response.data);
  //       setErrors2({}); // Clear any previous errors on successful submission
  //       handleAddBankAddress();
  //     } catch (errors2) {
  //       console.error("Error:", errors2);
  //       if (errors2.response && errors2.response.data) {
  //         // Handle errors from the server
  //         const serverErrors = errors2.response.data;
  //         setErrors2(serverErrors);
  //       } else {
  //         // Handle other errors
  //         setErrors2({ unexpectedError: true });
  //       }
  //     }
  //   } else {
  //     const updatedErrors = {};
  //     for (const field in newBankAddress) {
  //       if (
  //         field !== "accountName" &&
  //         field !== "accountNo" &&
  //         field !== "bank" &&
  //         field !== "ifscCode" &&
  //         field !== "branch"
  //       ) {
  //         if (!newBankAddress[field].trim()) {
  //           updatedErrors[field] = true;
  //         }
  //       }
  //     }
  //     setErrors2(updatedErrors); // Update errors for invalid fields
  //   }
  // };

  const handleShippingClickOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClickClose = () => {
    setOpenShippingModal(false);
  };

  const handleBankClickOpen = () => {
    setOpenBankModal(true);
  };
  const handleBankClickClose = () => {
    setOpenBankModal(false);
  };

  const handleAddBankAddress = () => {
    const bankAddressWithCustomerId = {
      ...newBankAddress,
      customerId: customerId,
    };
    setBankAddresses([...bankAddresses, bankAddressWithCustomerId]);
    setNewBankAddress({
      // customerId: customerId,
      bank: "",
      accountNo: "",
      accountName: "",
      branch: "",
      ifscCode: "",
    });
    setOpenBankModal(false);
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...shippingAddresses];
    updatedAddresses.splice(index, 1);
    setShippingAddresses(updatedAddresses);
  };

  const handleDeleteBank = (index) => {
    const updatedBank = [...bankAddresses];
    updatedBank.splice(index, 1);
    setBankAddresses(updatedBank);
  };

  const styles = {
    submittedDataContainer: {
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
      marginLeft: "40px",
    },
    submittedDataTitle: {
      fontSize: "1.5rem",
      marginBottom: "15px",
      color: "#333",
    },
    submittedDataItem: {
      display: "flex",
      marginBottom: "10px",
    },
    submittedDataLabel: {
      fontWeight: "bold",
      marginRight: "10px",
      color: "#555",
    },
  };

  // const clearForm = () => {
  //   // Clear form fields
  //   setGstRegistrationStatus("");
  //   setGstNumber("");
  //   setStreet1("");
  //   setStreet2("");
  //   setCity("");
  //   setPincode("");
  //   setContactName("");
  //   setPhoneNumber("");
  //   setDesignation("");
  //   setIsPrimary(false);
  // };

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "customerActivatePortal":
        setCustomerActivatePortal(value);
        break;
      case "customerCode":
        setCustomerCode(value);
        break;
      case "entityLegalName":
        setEntityLegalName(value);
        break;
      case "customerType":
        setCustomerType(value);
        break;
      case "displayName":
        setDisplayName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      // case "gstNumber":
      //   setGstNumber(value);
      //   break;
      // case "gstRegistrationStatus":
      //   setGstRegistrationStatus(value);
      //   break;
      // case "street1":
      //   setStreet1(value);
      //   break;
      // case "street2":
      //   setStreet2(value);
      //   break;
      // case "state":
      //   setState(value);
      //   break;
      // case "city":
      //   setCity(value);
      //   break;
      // case "pincode":
      //   setPincode(value);
      //   break;
      // case "contactName":
      //   setContactName(value);
      //   break;
    }
  };

  const handleCustomer = () => {
    setIsSubmitting(true);
    console.log("click");
    const errors = {};
    if (!customerCode) {
      errors.customerCode = "Customer Code is required";
    }
    if (!entityLegalName) {
      errors.entityLegalName = "Customer Org Name is required";
    }
    if (!customerType) {
      errors.customerType = "Customer Type is required";
    }
    if (!displayName) {
      errors.displayName = "Display Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    }

    console.log("Test", newAddress);

    if (Object.keys(errors).length === 0) {
      const formData = {
        id,
        phoneNumber,
        customerActivatePortal,
        customerCode,
        entityLegalName,
        customerType: customerType,
        displayName,
        email,
        active,
        orgId,
        customerAddressDTO: shippingAddresses,
        customerBankDetailsDTO: bankAddresses,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/api/master/customers`, formData)
        .then((response) => {
          setCustomerId(response.data.paramObjectsMap.customersVO.id);
          console.log("Response:", response.data);
          console.log(
            "CustomerId:",
            response.data.paramObjectsMap.customersVO.id
          );
          // addcustomer(true);
          setAddressShow(true);
          setErrors({});
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
      setIsSubmitting(false);
    }
  };

  const handleCustomerTypeChange = (e) => {
    setCustomerType(e.target.value);
  };

  const handleCustomerClose = () => {
    addcustomer(false);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleCustomerClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex"
                }
              >
                Type
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <select
              className="form-select form-sz w-full"
              onChange={handleCustomerTypeChange}
              value={customerType}
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Select a Customer
              </option>
              <option value="0">Emitter</option>
              <option value="1">Receiver</option>
            </select>
            {errors.customerType && (
              <div className="error-text">{errors.customerType}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              value={customerCode}
              className="form-control form-sz"
              name="customerCode"
              onChange={handleCustomerChange}
              disabled={isSubmitting}
            />
            {errors.customerCode && (
              <div className="error-text">{errors.customerCode}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Entity Legal Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              value={entityLegalName}
              className="form-control form-sz"
              name="entityLegalName"
              onChange={handleCustomerChange}
              disabled={isSubmitting}
            />
            {errors.entityLegalName && (
              <div className="error-text">{errors.entityLegalName}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              value={displayName}
              className="form-control form-sz"
              name="displayName"
              onChange={handleCustomerChange}
              disabled={isSubmitting}
            />
            {errors.displayName && (
              <div className="error-text">{errors.displayName}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz"
              placeholder=""
              value={email}
              name="email"
              onChange={handleCustomerChange}
              disabled={isSubmitting}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Phone Number
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz"
              placeholder=""
              value={phoneNumber}
              name="phoneNumber"
              type="number"
              onChange={handleCustomerChange}
              disabled={isSubmitting}
            />
            {errors.phoneNumber && (
              <div className="error-text">{errors.phoneNumber}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControlLabel
              control={
                <IOSSwitch
                  disabled={isSubmitting}
                  sx={{ m: 1 }}
                  defaultChecked
                />
              }
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControlLabel
              disabled={isSubmitting}
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
          <div className="d-flex flex-row mb-5 mt-2">
            <button
              type="button"
              onClick={handleCustomer}
              disabled={addressShow === true}
              style={{ cursor: addressShow ? "not-allowed" : "pointer" }}
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
          <div className="col-lg-3 col-md-6 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <Button
              component="label"
              variant="contained"
              className="text-form mb-2"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
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
              className="text-form mb-2"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
        </div>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab className="text-form" label="Address" {...a11yProps(1)} />
              <Tab
                className="text-form"
                label="Bank Details"
                {...a11yProps(0)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <button
                  type="button"
                  onClick={handleShippingClickOpen}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  + Add Address
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              {shippingAddresses.map((address, index) => (
                <div
                  className="col-md-5 mt-3"
                  key={index}
                  style={styles.submittedDataContainer}
                >
                  <div className="row">
                    <div className="col-md-10">
                      <h2 style={styles.submittedDataTitle}>
                        Address {index + 1}
                      </h2>
                    </div>
                    <div className="col-md-2">
                      <FaTrash
                        className="cursor-pointer w-4 h-8 me-3"
                        onClick={() => handleDeleteAddress(index)}
                      />
                    </div>
                  </div>

                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>
                      GST Registration Status:
                    </span>
                    <span>{address.gstRegistrationStatus}</span>
                  </div>
                  {address.gstRegistrationStatus === "Registered" && (
                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>GST Number:</span>
                      <span>{address.gstNumber}</span>
                    </div>
                  )}
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Street 1:</span>
                    <span>{address.street1}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Street 2:</span>
                    <span>{address.street2}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>State:</span>
                    <span>{address.state}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>City:</span>
                    <span>{address.city}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Pin Code:</span>
                    <span>{address.pinCode}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>
                      Contact Person:
                    </span>
                    <span>{address.contactName}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Phone Number:</span>
                    <span>{address.phoneNumber}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Destination:</span>
                    <span>{address.designation}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Email:</span>
                    <span>{address.email}</span>
                  </div>
                  {/* <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>Primary:</span>
                      <span>{address.isPrimary ? "Yes" : "No"}</span>
                    </div> */}
                </div>
              ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <button
                  type="button"
                  onClick={handleBankClickOpen}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  + Add Bank
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              {bankAddresses.map((bank, index) => (
                <div
                  className="col-md-5 mt-3"
                  key={index}
                  style={styles.submittedDataContainer}
                >
                  <div className="row">
                    <div className="col-md-10">
                      <h2 style={styles.submittedDataTitle}>
                        Bank {index + 1}
                      </h2>
                    </div>
                    <div className="col-md-2">
                      <FaTrash
                        className="cursor-pointer w-4 h-8 me-3"
                        onClick={() => handleDeleteBank(index)}
                      />
                    </div>
                  </div>

                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Bank:</span>
                    <span>{bank.bank}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>
                      Account Number:
                    </span>
                    <span>{bank.accountNo}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Account Name:</span>
                    <span>{bank.accountName}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>Branch:</span>
                    <span>{bank.branch}</span>
                  </div>
                  <div style={styles.submittedDataItem}>
                    <span style={styles.submittedDataLabel}>IFSC Code:</span>
                    <span>{bank.ifscCode}</span>
                  </div>
                </div>
              ))}
            </div>
          </CustomTabPanel>
        </Box>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openShippingModal}
        onClose={handleShippingClickClose}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Add Address</DialogTitle>
          <IoMdClose
            onClick={handleShippingClickClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText className="d-flex flex-column">
            {/* GST Registration Status */}
            <div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  <label className="label mb-1">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      GST Registration Status
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select
                    name="Select Item"
                    style={{
                      height: 40,
                      fontSize: "0.800rem",
                      width: "100%",
                      borderColor: errors1.gstRegistrationStatus ? "red" : "",
                    }}
                    className="input input-bordered ps-2"
                    value={newAddress.gstRegistrationStatus}
                    onChange={(e) =>
                      handleAddressInputChange(e, "gstRegistrationStatus")
                    }
                  >
                    <option value="">Select</option>
                    <option value="Registered">Registered</option>
                    <option value="Unregistered">Unregistered</option>
                  </select>
                  {errors1.gstRegistrationStatus && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      GST Registration Status is required
                    </span>
                  )}
                </div>
              </div>

              {/* Show GST Number input field only when "Registered" is selected */}
              {newAddress.gstRegistrationStatus === "Registered" && (
                <div className="row mb-3">
                  <div className="col-lg-6 col-md-6">
                    <label className="label label-text label-font-size text-base-content">
                      GST Number
                    </label>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <input
                      style={{
                        height: 40,
                        fontSize: "0.800rem",
                        width: "100%",
                      }}
                      type={"number"}
                      value={newAddress.gstNumber}
                      onChange={(e) => handleAddressInputChange(e, "gstNumber")}
                      className="input input-bordered p-2"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Street 1 */}
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label mb-1">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Street 1
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <textarea
                  style={{
                    fontSize: "0.800rem",
                    borderColor: errors1.street1 ? "red" : "",
                  }}
                  className="form-control label label-text label-font-size text-base-content"
                  value={newAddress.street1}
                  onChange={(e) => handleAddressInputChange(e, "street1")}
                ></textarea>
                {errors1.street1 && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Street 1 is required
                  </span>
                )}
              </div>
            </div>
            {/* Street 2 */}
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
                  value={newAddress.street2}
                  onChange={(e) => handleAddressInputChange(e, "street2")}
                ></textarea>
              </div>
            </div>
            {/* State */}
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label mb-1">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    State
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <select
                  name="Select Item"
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors1.state ? "red" : "",
                  }}
                  className="input input-bordered ps-2"
                  value={newAddress.state}
                  onChange={(e) => handleAddressInputChange(e, "state")}
                >
                  <option value=""></option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Goa">Goa</option>
                </select>
                {errors1.state && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    State is required
                  </span>
                )}
              </div>
            </div>
            {/* City */}
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label mb-1">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    City
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors1.city ? "red" : "",
                  }}
                  type={"text"}
                  value={newAddress.city}
                  onChange={(e) => handleAddressInputChange(e, "city")}
                  className="input input-bordered p-2"
                />
                {errors1.city && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    City is required
                  </span>
                )}
              </div>
            </div>
            {/* Pin Code */}
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label mb-1">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Pin Code
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors1.pinCode ? "red" : "",
                  }}
                  type={"number"}
                  value={newAddress.pinCode}
                  onChange={(e) => handleAddressInputChange(e, "pinCode")}
                  className="input input-bordered p-2"
                />
                {errors1.pinCode && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Pin Code is required
                  </span>
                )}
              </div>
            </div>
            {/* Contact Name */}
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Contact Person
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                  }}
                  type={"text"}
                  value={newAddress.contactName}
                  onChange={(e) => handleAddressInputChange(e, "contactName")}
                  className="input input-bordered p-2"
                />
              </div>
            </div>
            {/* Phone */}
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Phone
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                  }}
                  type={"number"}
                  value={newAddress.phoneNumber}
                  onChange={(e) => handleAddressInputChange(e, "phoneNumber")}
                  className="input input-bordered p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Destination
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                  }}
                  type={"text"}
                  value={newAddress.designation}
                  onChange={(e) => handleAddressInputChange(e, "designation")}
                  className="input input-bordered p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Email
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                  }}
                  type={"email"}
                  value={newAddress.email}
                  onChange={(e) => handleAddressInputChange(e, "email")}
                  className="input input-bordered p-2"
                />
              </div>
            </div>
            {/* Checkbox */}
            {/* <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <div className="d-flex flex-row">
                  <input
                    style={{ marginTop: 10 }}
                    className="form-check-input me-1"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={newAddress.isPrimary}
                    onChange={(e) => handleAddressInputChange(e, "isPrimary")}
                  />
                  <label
                    className="label label-text label-font-size text-base-content"
                    htmlFor="flexCheckDefault"
                  >
                    Mark as Primary
                  </label>
                </div>
              </div>
            </div> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            component="label"
            variant="contained"
            onClick={handleAddressSubmit}
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openBankModal}
        onClose={handleBankClickClose}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Add Bank Address</DialogTitle>
          <IoMdClose
            onClick={handleBankClickClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText className="d-flex flex-column">
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
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
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors2.bank ? "red" : "",
                  }}
                  type={"text"}
                  value={newBankAddress.bank}
                  onChange={(e) => handleBankInputChange(e, "bank")}
                  className="input input-bordered p-2"
                />
                {errors2.bank && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Bank is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
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
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors2.accountNo ? "red" : "",
                  }}
                  type={"text"}
                  value={newBankAddress.accountNo}
                  onChange={(e) => handleBankInputChange(e, "accountNo")}
                  className="input input-bordered p-2"
                />
                {errors2.accountNo && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Account number is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
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
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors2.accountName ? "red" : "",
                  }}
                  type={"text"}
                  value={newBankAddress.accountName}
                  onChange={(e) => handleBankInputChange(e, "accountName")}
                  className="input input-bordered p-2"
                />
                {errors2.accountName && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Account name is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
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
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors2.branch ? "red" : "",
                  }}
                  type={"text"}
                  value={newBankAddress.branch}
                  onChange={(e) => handleBankInputChange(e, "branch")}
                  className="input input-bordered p-2"
                />
                {errors2.branch && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Branch is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
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
              <div className="col-lg-6 col-md-6">
                <input
                  style={{
                    height: 40,
                    fontSize: "0.800rem",
                    width: "100%",
                    borderColor: errors2.ifscCode ? "red" : "",
                  }}
                  type={"text"}
                  value={newBankAddress.ifscCode}
                  onChange={(e) => handleBankInputChange(e, "ifscCode")}
                  className="input input-bordered p-2"
                />
                {errors2.ifscCode && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    IFSC Code is required
                  </span>
                )}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button onClick={handleBankClickClose}>Cancel</Button>
          <Button
            component="label"
            variant="contained"
            onClick={handleBankSubmit}
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default AddCustomer;
