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
import { width } from "@mui/system";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  FaCloudUploadAlt,
  FaStarOfLife,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import {
  stringValidation,
  stringAndNoValidation,
  stringAndNoAndSpecialCharValidation,
} from "../../utils/userInputValidation";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function AddCustomer({ addcustomer, editCustomerId }) {
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
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [customerAddressVO, setCustomerAddressVO] = useState([]);
  const [customerBankAddressVO, setCustomerBankAddressVO] = useState([]);
  const [editBankAddressIndex, setEditBankAddressIndex] = React.useState(null);
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [customerVOId, setCustomerVOId] = useState(null);
  const [disableCustomerType, setDisableCustomerType] = React.useState(false);
  const [sopUploadedFiles, setSopUploadedFiles] = useState([]);
  const [docUploadedFiles, setDocUploadedFiles] = useState([]);
  const [responseCustomerCode, setResponseCustomerCode] = useState("");
  const [responseCustomerId, setResponseCustomerId] = useState("");
  const [selectedSopFiles, setSelectedSopFiles] = useState([]);
  const [selectedDocFiles, setSelectedDocFiles] = useState([]);
  const [newAddress, setNewAddress] = useState({
    gstRegistrationStatus: "",
    gstNumber: "",
    street1: "",
    street2: "",
    country: "",
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
    country: false,
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

  useEffect(() => {
    {
      editCustomerId && getCustomerId();
    }
    getCountryData();
    // if (editCustomerId && handleAddShippingAddress()) {
    //   getCustomerId();
    // }
  }, [editCustomerId]);

  useEffect(() => {
    getStateData();
    getCityData();
  }, [newAddress.country, newAddress.state]);

  const getCountryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/country?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setCountryData(response.data.paramObjectsMap.countryVO);
        //console.log(response.data.paramObjectsMap.countryVO)
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStateData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/state/Country?country=${newAddress.country}&orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setStateData(response.data.paramObjectsMap.stateVO);
        //console.log(response.data.paramObjectsMap.countryVO)
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCityData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/city/getByStateAndCountry?country=${newAddress.country}&orgId=${orgId}&state=${newAddress.state}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setCityData(response.data.paramObjectsMap.cityVO);
        //console.log(response.data.paramObjectsMap.countryVO)
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCustomerId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/customers/${editCustomerId}`
      );

      if (response.status === 200) {
        const customersVO = response.data.paramObjectsMap.customersVO;
        const addressVO =
          response.data.paramObjectsMap.customersVO.customersAddressVO;
        // const addressVO =
        //   response.data.paramObjectsMap.customersVO.customersAddressVO;
        console.log(
          "Edit User Details",
          response.data.paramObjectsMap.customersVO
        );
        console.log(
          "customer Details",
          response.data.paramObjectsMap.customersVO.customersAddressVO
        );
        setCustomerType(response.data.paramObjectsMap.customersVO.customerType);
        setCustomerCode(response.data.paramObjectsMap.customersVO.customerCode);
        setEntityLegalName(
          response.data.paramObjectsMap.customersVO.entityLegalName
        );
        setDisplayName(response.data.paramObjectsMap.customersVO.displayName);
        setEmail(response.data.paramObjectsMap.customersVO.email);
        setPhoneNumber(response.data.paramObjectsMap.customersVO.phoneNumber);
        setCustomerAddressVO(
          response.data.paramObjectsMap.customersVO.customersAddressVO
        );
        setCustomerBankAddressVO(
          response.data.paramObjectsMap.customersVO.customersBankDetailsVO
        );
        console.log(
          "id",
          response.data.paramObjectsMap.customersVO.customersAddressVO.id
        );
        setCustomerVOId(response.data.paramObjectsMap.customersVO.id);

        console.log("setnewaddress", setNewAddress);

        // setNewBankAddress({
        //   ...newBankAddress,
        //   bank: customersVO.customersBankDetailsVO.bank,
        //   accountNo: customersVO.customersBankDetailsVO.accountNo,
        //   accountName: customersVO.customersBankDetailsVO.accountName,
        //   branch: customersVO.customersBankDetailsVO.branch,
        //   ifscCode: customersVO.customersBankDetailsVO.ifscCode,
        // });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isValidAddress = () => {
    return (
      newAddress.gstRegistrationStatus.trim() !== "" &&
      newAddress.street1.trim() !== "" &&
      newAddress.state.trim() !== "" &&
      newAddress.city.trim() !== "" &&
      newAddress.pinCode.trim() !== ""
    );
  };

  function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleAddressInputChange = (e, field) => {
    let value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Perform validations based on the field
    if (field === "pinCode") {
      // Allow only 6-digit numbers
      value = value.replace(/\D/g, "").slice(0, 6); // Remove non-digit characters and limit to 6 digits
    } else if (field === "phoneNumber") {
      // Allow only 10-digit numbers
      value = value.replace(/\D/g, "").slice(0, 10); // Remove non-digit characters and limit to 10 digits
    } else if (field === "email") {
    }
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
      country: "",
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

  const handleAddressSubmit = async () => {
    const addressWithCustomerId = { ...newAddress, customerId: customerId };

    if (isValidAddress()) {
      setErrors1({}); // Clear any previous errors on successful submission
      if (editCustomerId) {
        // If editCustomerId is truthy, update the existing address
        handleUpdateShippingAddress(addressWithCustomerId);
      } else {
        // If editCustomerId is falsy, add a new address
        handleAddShippingAddress(addressWithCustomerId);
      }
    } else {
      // Display error messages for invalid fields
      const updatedErrors = {};
      // Check if newAddress exists before accessing its properties
      if (newAddress && newAddress.gstRegistrationStatus.trim() === "") {
        updatedErrors.gstRegistrationStatus = true;
      }
      if (newAddress && newAddress.street1.trim() === "") {
        updatedErrors.street1 = true;
      }
      if (newAddress && newAddress.country.trim() === "") {
        updatedErrors.country = true;
      }
      if (newAddress && newAddress.state.trim() === "") {
        updatedErrors.state = true;
      }
      if (newAddress && newAddress.city.trim() === "") {
        updatedErrors.city = true;
      }
      if (newAddress && newAddress.pinCode.trim() === "") {
        updatedErrors.pinCode = true;
      }
      if (newAddress && newAddress.phoneNumber.trim() === "") {
        updatedErrors.phoneNumber = true;
      }
      if (newAddress && newAddress.email.trim() === "") {
        updatedErrors.email = true;
      }
      setErrors1(updatedErrors);
    }
  };

  const handleEditAddress = (addressIndex) => {
    if (addressIndex >= 0) {
      // If addressIndex is greater than or equal to 0, it indicates an existing address is being edited
      setEditAddressIndex(addressIndex);
      const addressToEdit = customerAddressVO[addressIndex];
      setNewAddress(addressToEdit);
      setDisableCustomerType(true);
    } else {
      // If addressIndex is less than 0, it indicates a new address is being added
      setEditAddressIndex(null); // Reset the edit address index
      setNewAddress({
        city: "",
        contactName: "",
        country: "",
        designation: "",
        email: "",
        gstNumber: "",
        gstRegistrationStatus: "",
        id: 0,
        phoneNumber: "",
        pinCode: "",
        state: "",
        street1: "",
        street2: "",
      });
      setDisableCustomerType(false);
    }
    setOpenShippingModal(true);
  };

  const handleEditBankAddress = (addressIndex) => {
    if (addressIndex >= 0) {
      // If addressIndex is greater than or equal to 0, it indicates an existing address is being edited
      setEditBankAddressIndex(addressIndex);
      const bankAddressToEdit = customerBankAddressVO[addressIndex];
      setNewBankAddress(bankAddressToEdit);
      setDisableCustomerType(true);
    } else {
      // If addressIndex is less than 0, it indicates a new address is being added
      setEditBankAddressIndex(null); // Reset the edit bank address index
      setNewBankAddress({
        bank: "",
        accountNo: "",
        accountName: "",
        branch: "",
        ifscCode: "",
      });
      setDisableCustomerType(false);
    }
    setOpenBankModal(true);
  };

  // Then use handleEditBankAddress function similarly to handleEditAddress for customerAddressVO

  const handleUpdateShippingAddress = (updatedAddress) => {
    // Check if updatedAddress is null or undefined
    if (!updatedAddress || updatedAddress.id === undefined) {
      // Handle adding a new address
      const newAddressList = [...customerAddressVO, updatedAddress];
      setCustomerAddressVO(newAddressList);
      setNewAddress({
        gstRegistrationStatus: "",
        gstNumber: "",
        street1: "",
        street2: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        contactName: "",
        phoneNumber: "",
        designation: "",
        email: "",
        // isPrimary: false,
      });
      handleShippingClickClose(); // Close the modal or perform other actions
      return;
    }

    // Find the index of the address with the given ID
    const addressIndex = customerAddressVO.findIndex(
      (address) => address.id === updatedAddress.id
    );

    if (addressIndex !== -1) {
      // Clone the array to avoid mutating state directly
      const updatedAddresses = [...customerAddressVO];
      // Replace the old address with the updated one
      updatedAddresses[addressIndex] = updatedAddress;
      // Update the state with the new array of addresses
      setCustomerAddressVO(updatedAddresses);
      setNewAddress({}); // Clear the newAddress state
      handleShippingClickClose(); // Close the modal or perform any other actions as needed
    } else {
      // Handle the case where the address ID is not found
      console.error("Address ID not found:", updatedAddress.id);
    }
  };

  // const isValidBankAddress = () => {
  //   return (
  //     newBankAddress.bank.trim() !== "" &&
  //     newBankAddress.accountNo.trim() !== "" &&
  //     newBankAddress.accountName.trim() !== "" &&
  //     newBankAddress.branch.trim() !== "" &&
  //     newBankAddress.ifscCode.trim() !== ""
  //   );
  // };

  const isValidBankAddress = () => {
    return (
      newBankAddress &&
      typeof newBankAddress.bank === "string" &&
      (typeof newBankAddress.accountNo === "string" ||
        typeof newBankAddress.accountNo === "number") &&
      typeof newBankAddress.accountName === "string" &&
      typeof newBankAddress.branch === "string" &&
      typeof newBankAddress.ifscCode === "string" &&
      newBankAddress.bank.trim() !== "" &&
      newBankAddress.accountNo.toString().trim() !== "" &&
      newBankAddress.accountName.trim() !== "" &&
      newBankAddress.branch.trim() !== "" &&
      newBankAddress.ifscCode.trim() !== ""
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

  // const handleUpdateShippingBankAddress = (updatedBankAddress) => {
  //   // Check if updatedAddress is null or undefined
  //   if (!updatedBankAddress || updatedBankAddress.id === undefined) {
  //     // Handle adding a new address
  //     const newBankAddressList = [...customerBankAddressVO, updatedBankAddress];
  //     setCustomerBankAddressVO(newBankAddressList);

  //     setBankAddresses({
  //       bank: "",
  //       accountNo: "",
  //       accountName: "",
  //       branch: "",
  //       ifscCode: "",
  //     });
  //     handleBankClickClose(); // Close the modal or perform other actions
  //     return;
  //   }

  //   // Find the index of the address with the given ID
  //   const addressIndex = customerBankAddressVO.findIndex(
  //     (address) => address.id === updatedBankAddress.id
  //   );

  //   if (addressIndex !== -1) {
  //     // Clone the array to avoid mutating state directly
  //     const updatedBankAddress = [...customerBankAddressVO];
  //     // Replace the old address with the updated one
  //     updatedBankAddress[addressIndex] = updatedBankAddress;
  //     // Update the state with the new array of addresses
  //     setCustomerBankAddressVO(updatedBankAddress);
  //     setBankAddresses({}); // Clear the newAddress state
  //     handleBankClickClose(); // Close the modal or perform any other actions as needed
  //   } else {
  //     // Handle the case where the address ID is not found
  //     console.error("Address ID not found:", updatedBankAddress.id);
  //   }
  // };

  const handleUpdateShippingBankAddress = (updatedBankAddress) => {
    // Check if updatedBankAddress is null or undefined
    if (!updatedBankAddress || updatedBankAddress.id === undefined) {
      // Handle adding a new address
      const newBankAddressList = [...customerBankAddressVO, updatedBankAddress];
      setCustomerBankAddressVO(newBankAddressList);
      // setBankAddresses(newBankAddressList); // Update bankAddresses state
      setNewBankAddress({
        // Reset newBankAddress state
        bank: "",
        accountNo: "",
        accountName: "",
        branch: "",
        ifscCode: "",
      });
      handleBankClickClose(); // Close the modal or perform other actions
      return;
    }

    // Find the index of the address with the given ID
    const addressIndex = customerBankAddressVO.findIndex(
      (address) => address.id === updatedBankAddress.id
    );

    if (addressIndex !== -1) {
      // Clone the array to avoid mutating state directly
      const updatedBankAddresses = [...customerBankAddressVO];
      // Replace the old address with the updated one
      updatedBankAddresses[addressIndex] = updatedBankAddress;
      // Update the state with the new array of addresses
      setCustomerBankAddressVO(updatedBankAddresses);
      // setBankAddresses(updatedBankAddresses); // Update bankAddresses state
      setNewBankAddress({
        // Reset newBankAddress state
        bank: "",
        accountNo: "",
        accountName: "",
        branch: "",
        ifscCode: "",
      });
      handleBankClickClose(); // Close the modal or perform any other actions as needed
    } else {
      // Handle the case where the address ID is not found
      console.error("Address ID not found:", updatedBankAddress.id);
    }
  };

  const handleBankSubmit = async () => {
    const bankWithCustomerId = { ...newBankAddress, customerId: customerId };

    if (isValidBankAddress()) {
      setErrors2({}); // Clear any previous errors on successful submission
      if (editCustomerId) {
        // If editCustomerId is truthy, update the existing address
        handleUpdateShippingBankAddress(bankWithCustomerId);
      } else {
        // If editCustomerId is falsy, add a new address
        handleAddBankAddress(bankWithCustomerId);
      }
    } else {
      // Display error messages for invalid fields
      const updatedErrors1 = {};
      if (newBankAddress && newBankAddress.bank.trim() === "") {
        updatedErrors1.bank = true;
      }
      if (newBankAddress && newBankAddress.accountNo.trim() === "") {
        updatedErrors1.accountNo = true;
      }
      if (newBankAddress && newBankAddress.accountName.trim() === "") {
        updatedErrors1.accountName = true;
      }
      if (newBankAddress && newBankAddress.branch.trim() === "") {
        updatedErrors1.branch = true;
      }
      if (newBankAddress && newBankAddress.ifscCode.trim() === "") {
        updatedErrors1.ifscCode = true;
      }
      setErrors2(updatedErrors1);
    }
  };

  const handleShippingClickOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClickClose = () => {
    setOpenShippingModal(false);
    setErrors1({});
  };

  const handleBankClickOpen = () => {
    setOpenBankModal(true);
  };
  const handleBankClickClose = () => {
    setOpenBankModal(false);
    setErrors2({}); // Clear any previous errors on successful submission
  };

  const handleAddBankAddress = () => {
    const bankWithCustomerId = {
      ...newBankAddress,
      customerId: customerId,
    };
    setBankAddresses([...bankAddresses, bankWithCustomerId]);
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
      // backgroundColor: "#f9f9f9",
      // marginLeft: "40px",
    },
    submittedDataTitle: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      marginBottom: "15px",
      color: "#333",
    },
    submittedDataItem: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
      fontSize: "0.9rem",
    },
    submittedDataLabel: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginRight: "10px",
      color: "#555",
    },
    submittedData: {
      // display: "flex",
      // flexWrap: "wrap",
      textAlign: "end",
      wordWrap: "break-word",
      width: "180px",
    },
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    let errorsCopy = { ...errors };

    // Validate phone number length
    if (name === "phoneNumber" && value.length <= 10) {
      setPhoneNumber(value);
    } else {
      // If the entered value exceeds 10 characters, don't update the state
    }
    switch (name) {
      case "email":
        // Email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorsCopy.email = "Invalid email address";
        } else {
          delete errorsCopy.email;
        }
        setEmail(value);
        break;
      default:
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
          default:
            break;
        }
        break;
    }
    setErrors(errorsCopy);
  };
  // OLD WORKING SAVE
  // const handleCustomer = () => {
  //   setIsSubmitting(true);
  //   console.log("click");
  //   const errors = {};
  //   // if (!customerCode) {
  //   //   errors.customerCode = "Customer Code is required";
  //   // }
  //   if (!entityLegalName) {
  //     errors.entityLegalName = "Customer Org Name is required";
  //   }
  //   if (!customerType) {
  //     errors.customerType = "Customer Type is required";
  //   }
  //   if (!displayName) {
  //     errors.displayName = "Display Name is required";
  //   }
  //   // if (!email) {
  //   //   errors.email = "Email is required";
  //   // }
  //   if (!email) {
  //     errors.email = "Email is required";
  //   } else if (!isValidEmail(email)) {
  //     errors.email = "Invalid email format";
  //   }
  //   if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
  //     errors.phoneNumber = "Please enter a valid 10-digit phone number";
  //   }

  //   console.log("Test", newAddress);

  //   if (Object.keys(errors).length === 0) {
  //     const formData = {
  //       id,
  //       phoneNumber,
  //       customerActivatePortal,
  //       customerCode,
  //       entityLegalName,
  //       customerType: customerType,
  //       displayName,
  //       email,
  //       active,
  //       orgId,
  //       customerAddressDTO: shippingAddresses,
  //       customerBankDetailsDTO: bankAddresses,
  //     };

  //     axios
  //       .post(`${process.env.REACT_APP_API_URL}/api/master/customers`, formData)
  //       .then((response) => {
  //         setCustomerId(response.data.paramObjectsMap.customersVO.id);
  //         const customerCode =
  //           response.data.paramObjectsMap.customersVO.customerCode;
  //         console.log("Response:", response.data);
  //         console.log(
  //           "CustomerId:",
  //           response.data.paramObjectsMap.customersVO.id
  //         );

  //         // addcustomer(true);
  //         setAddressShow(true);
  //         setErrors({});
  //         toast.success(
  //           `Customer with code ${customerCode} created successfully`,
  //           {
  //             autoClose: 2000,
  //             theme: "colored",
  //           }
  //         );
  //       })
  //       .catch((error) => {
  //         toast.error("customer Creation failed", {
  //           autoClose: 2000,
  //           theme: "colored",
  //         });
  //       });
  //   } else {
  //     setErrors(errors);
  //     setIsSubmitting(false);
  //   }
  // };

  const handleCustomer = () => {
    setIsSubmitting(true);
    console.log("click");
    const errors = {};
    // if (!customerCode) {
    //   errors.customerCode = "Customer Code is required";
    // }
    if (!entityLegalName) {
      errors.entityLegalName = "Customer Org Name is required";
    }
    if (!customerType) {
      errors.customerType = "Customer Type is required";
    }
    if (!displayName) {
      errors.displayName = "Display Name is required";
    }
    // if (!email) {
    //   errors.email = "Email is required";
    // }
    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
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
          const customerCode =
            response.data.paramObjectsMap.customersVO.customerCode;
          setResponseCustomerCode(
            response.data.paramObjectsMap.customersVO.customerCode
          );
          console.log("Response:", response.data);
          console.log(
            "CustomerId:",
            response.data.paramObjectsMap.customersVO.id
          );
          const responseCustId = response.data.paramObjectsMap.customersVO.id;
          // SOP FILE SAVE
          const formData1 = new FormData();
          for (let i = 0; i < sopUploadedFiles.length; i++) {
            formData1.append("file", sopUploadedFiles[i]);
          }
          formData1.append("legName", entityLegalName);

          axios
            .post(
              `${process.env.REACT_APP_API_URL}/api/master/uploadFileCustomerSop?id=${responseCustId}&legalname=${entityLegalName}`,
              formData1,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((uploadResponse) => {
              console.log("File Upload Response:", uploadResponse.data);
              // DOCUMENT FILE SAVE
              setSelectedSopFiles("");

              const formData2 = new FormData();
              for (let i = 0; i < docUploadedFiles.length; i++) {
                formData2.append("file", docUploadedFiles[i]);
              }
              formData2.append("legName", entityLegalName);

              axios
                .post(
                  `${process.env.REACT_APP_API_URL}/api/master/uploadFileCustomerDocument?id=${responseCustId}&legalname=${entityLegalName}`,
                  formData1,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .then((uploadResponse) => {
                  console.log("File Upload Response:", uploadResponse.data);

                  // addcustomer(true);
                  setSelectedDocFiles("");
                  setAddressShow(true);
                  setErrors({});
                  toast.success(
                    `Customer with code ${customerCode} created successfully`,
                    {
                      autoClose: 2000,
                      theme: "colored",
                    }
                  );
                  setTimeout(() => {
                    addcustomer(true);
                  }, 2000);
                })
                // DOCUMENT FILE SAVE CATCH
                .catch((uploadError) => {
                  console.error("File Upload Error:", uploadError);
                });
            })
            // SOP FILE SAVE CATCH
            .catch((uploadError) => {
              console.error("File Upload Error:", uploadError);
            });
        })
        // HEADER SAVE CATCH
        .catch((error) => {
          toast.error("customer Creation failed", {
            autoClose: 2000,
            theme: "colored",
          });
        });
    } else {
      setErrors(errors);
      setIsSubmitting(false);
    }
  };

  const handleUpdateCustomer = () => {
    setIsSubmitting(true);
    console.log("click");
    const errors = {};
    if (!customerCode) {
      errors.customerCode = "Customer Code is required";
    }
    if (!entityLegalName) {
      errors.entityLegalName = "Customer Org Name is required";
    }
    // if (!customerType) {
    //   errors.customerType = "Customer Type is required";
    // }
    if (!displayName) {
      errors.displayName = "Display Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    console.log("Test", newAddress);

    if (Object.keys(errors).length === 0) {
      const formData = {
        id: customerVOId,
        phoneNumber,
        customerActivatePortal,
        customerCode,
        entityLegalName,
        customerType,
        displayName,
        email,
        active,
        orgId,
        customerAddressDTO: customerAddressVO,
        customerBankDetailsDTO: customerBankAddressVO,
      };

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/master/customers`, formData)
        .then((response) => {
          setCustomerId(
            response.data.paramObjectsMap.customersVO.customersAddressVO.id
          );
          console.log(
            "Response:",
            response.data.paramObjectsMap.customersVO.customersAddressVO.id
          );
          console.log("CustomerId:", response.data.id);

          setAddressShow(true);
          setErrors({});
          toast.success("Customer updated successfully", {
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch((error) => {
          toast.error("Customer update failed", {
            autoClose: 2000,
            theme: "colored",
          });
        });
    } else {
      setErrors(errors);
      setIsSubmitting(false);
    }
  };

  const handleCustomerTypeChange = (e) => {
    setCustomerType(e.target.value);
  };

  const handleCustomerCancel = () => {
    setErrors("");
  };

  const handleCustomerClose = () => {
    addcustomer(true);
  };

  const handleFileUpload = (files) => {
    console.log("Test");
    setSopUploadedFiles(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
    }
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedSopFiles(fileNames);
  };
  const handleDocFileUpload = (files) => {
    setDocUploadedFiles(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
    }
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedDocFiles(fileNames);
    console.log("LOCAL FILE NAME IS:", fileNames);
    console.log("SELECTED DOC FILES IS:", selectedDocFiles);
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
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
            {editCustomerId ? (
              <select
                className="form-select form-sz w-full"
                onChange={handleCustomerTypeChange}
                value={customerType}
                disabled={isSubmitting || disableCustomerType} // Disable the select field when disableCustomerType is true
                onMouseDown={(e) => e.preventDefault()} // Prevent the default behavior when clicking on the select field
              >
                <option value="" disabled>
                  Select a Customer
                </option>
                <option value="0">Emitter</option>
                <option value="1">Receiver</option>
              </select>
            ) : (
              <select
                className="form-select form-sz w-full"
                onChange={handleCustomerTypeChange}
                value={customerType}
                disabled={isSubmitting || disableCustomerType}
              >
                <option value="" disabled>
                  Select a Customer
                </option>
                <option value="0">Emitter</option>
                <option value="1">Receiver</option>
              </select>
            )}
            {errors.customerType && (
              <div className="error-text">{errors.customerType}</div>
            )}
          </div>
          {editCustomerId && (
            <>
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
                  readOnly
                  // onInput={(e) => {
                  //   e.target.value = e.target.value.toUpperCase();
                  // }}
                />
                {errors.customerCode && (
                  <div className="error-text">{errors.customerCode}</div>
                )}
              </div>
            </>
          )}
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
              onInput={stringAndNoAndSpecialCharValidation}
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
              onInput={stringAndNoAndSpecialCharValidation}
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
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              maxLength={10}
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
          <div className="col-lg-3 col-md-6">
            <input
              type="file"
              id="file-input"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<FaCloudUploadAlt />}
              >
                Upload files
              </Button>
            </label>
            <br />
            {/* Display the selected file names */}
            {selectedSopFiles &&
              selectedSopFiles.map((fileName, index) => (
                <div style={{ font: "10px" }} key={index}>
                  {fileName}
                </div>
              ))}
            {errors.uploadError && (
              <span className="error-text mb-1">{errors.uploadFiles}</span>
            )}
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Document
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              type="file"
              id="file-input1"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleDocFileUpload(e.target.files)}
            />
            <label htmlFor="file-input1">
              <Button
                variant="contained"
                component="span"
                startIcon={<FaCloudUploadAlt />}
              >
                Upload files
              </Button>
            </label>
            <br />
            {/* Display the selected file names */}
            {selectedDocFiles &&
              selectedDocFiles.map((fileName, index) => (
                <div style={{ font: "10px" }} key={index}>
                  {fileName}
                </div>
              ))}
            {/* {errors.uploadError && (
            <span className="error-text mb-1">{errors.uploadFiles}</span>
          )} */}
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

            <div className="d-flex flex-wrap">
              <>
                {shippingAddresses.map((address, index) => (
                  <div
                    className="mt-3 me-2 card"
                    key={index}
                    style={{
                      ...styles.submittedDataContainer,
                      width: "300px",
                      borderRadius: "20px",
                    }} // Set fixed width
                  >
                    <div style={styles.submittedDataItem}>
                      <div>
                        <h2 style={styles.submittedDataTitle}>
                          Address {index + 1}
                        </h2>
                      </div>
                      <div>
                        <FaTrash
                          className="cursor-pointer w-4 h-8 pb-2"
                          onClick={() => handleDeleteAddress(index)}
                        />
                      </div>
                    </div>

                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>GST Status:</span>
                      <span>{address.gstRegistrationStatus}</span>
                    </div>
                    {address.gstRegistrationStatus === "Registered" && (
                      <div style={styles.submittedDataItem}>
                        <span style={styles.submittedDataLabel}>
                          GST Number:
                        </span>
                        <span>{address.gstNumber}</span>
                      </div>
                    )}
                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>Street 1:</span>
                      <span style={styles.submittedData}>
                        {address.street1}
                      </span>
                    </div>
                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>Street 2:</span>
                      <span style={styles.submittedData}>
                        {address.street2}
                      </span>
                    </div>
                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>Country:</span>
                      <span>{address.country}</span>
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
                      <span style={styles.submittedDataLabel}>
                        Phone Number:
                      </span>
                      <span>{address.phoneNumber}</span>
                    </div>
                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>
                        Destination:
                      </span>
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
              </>
            </div>
            {editCustomerId &&
              customerAddressVO &&
              customerAddressVO.length > 0 && (
                <>
                  <div className="d-flex flex-wrap">
                    {customerAddressVO.map((address, index) => (
                      <div
                        className="mt-3 me-2 card"
                        key={index}
                        style={{
                          ...styles.submittedDataContainer,
                          width: "300px",
                          borderRadius: "20px",
                        }} // Set fixed width
                      >
                        <div style={styles.submittedDataItem}>
                          <div>
                            <h2 style={styles.submittedDataTitle}>
                              Address {index + 1}
                            </h2>
                          </div>
                          <div>
                            <button
                              key={index}
                              onClick={() => handleEditAddress(index)}
                              className="btn btn-link"
                            >
                              <FaEdit
                                style={{ fontSize: "22px", color: "black" }}
                              />
                            </button>
                          </div>
                        </div>
                        {/* Display address details */}
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            GST Status:
                          </span>
                          <span>{address.gstRegistrationStatus}</span>
                        </div>
                        {address.gstRegistrationStatus === "Registered" && (
                          <div style={styles.submittedDataItem}>
                            <span style={styles.submittedDataLabel}>
                              GST Number:
                            </span>
                            <span>{address.gstNumber}</span>
                          </div>
                        )}
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            Street 1:
                          </span>
                          <span style={styles.submittedData}>
                            {address.street1}
                          </span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            Street 2:
                          </span>
                          <span style={styles.submittedData}>
                            {address.street2}
                          </span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            Country:
                          </span>
                          <span>{address.country}</span>
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
                          <span style={styles.submittedDataLabel}>
                            Pin Code:
                          </span>
                          <span>{address.pinCode}</span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            Contact Person:
                          </span>
                          <span>{address.contactName}</span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            Phone Number:
                          </span>
                          <span>{address.phoneNumber}</span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            Destination:
                          </span>
                          <span>{address.designation}</span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>Email:</span>
                          <span>{address.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
            <div className="d-flex flex-wrap">
              {bankAddresses.map((bank, index) => (
                <div
                  className="mt-3 me-2 card"
                  key={index}
                  style={{
                    ...styles.submittedDataContainer,
                    width: "300px",
                    borderRadius: "20px",
                  }}
                >
                  <div style={styles.submittedDataItem}>
                    <div>
                      <h2 style={styles.submittedDataTitle}>
                        Bank {index + 1}
                      </h2>
                    </div>
                    <div>
                      <FaTrash
                        className="cursor-pointer w-4 h-8 pb-2"
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
            {editCustomerId &&
              customerBankAddressVO &&
              customerBankAddressVO.length > 0 && (
                <>
                  <div className="d-flex flex-wrap">
                    {customerBankAddressVO.map((bank, index) => (
                      <div
                        className="mt-3 me-2 card"
                        key={index}
                        style={{
                          ...styles.submittedDataContainer,
                          width: "300px",
                          borderRadius: "20px",
                        }}
                      >
                        <div style={styles.submittedDataItem}>
                          <div>
                            <h2 style={styles.submittedDataTitle}>
                              Bank {index + 1}
                            </h2>
                          </div>
                          <div>
                            <FaEdit
                              className="cursor-pointer w-4 h-8 pb-2"
                              onClick={() => handleEditBankAddress(index)}
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
                          <span style={styles.submittedDataLabel}>
                            Account Name:
                          </span>
                          <span>{bank.accountName}</span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>Branch:</span>
                          <span>{bank.branch}</span>
                        </div>
                        <div style={styles.submittedDataItem}>
                          <span style={styles.submittedDataLabel}>
                            IFSC Code:
                          </span>
                          <span>{bank.ifscCode}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
          </CustomTabPanel>
        </Box>
        <div className="d-flex flex-row mb-2 mt-2">
          {editCustomerId ? (
            <button
              type="button"
              onClick={handleUpdateCustomer}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          ) : (
            <>
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
                onClick={handleCustomerCancel}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Cancel
              </button>
            </>
          )}
        </div>
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
                      type={"text"}
                      value={newAddress.gstNumber}
                      onChange={(e) => handleAddressInputChange(e, "gstNumber")}
                      className="input input-bordered p-2"
                      onInput={(e) => {
                        e.target.value = e.target.value.toUpperCase();
                      }}
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
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
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
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Country
                </label>
              </div>
              <div className="col-lg-6 col-md-6 mb-2">
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={(e) => handleAddressInputChange(e, "country")}
                  value={newAddress.country}
                  name="country"
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {Array.isArray(countryData) &&
                    countryData.length > 0 &&
                    countryData.map((list) => (
                      <option key={list.id} value={list.country}>
                        {list.country}
                      </option>
                    ))}
                </select>
                {errors1.country && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Country is required
                  </span>
                )}
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
                  className="form-select form-sz w-full"
                  onChange={(e) => handleAddressInputChange(e, "state")}
                  value={newAddress.state}
                  name="state"
                >
                  <option value="" disabled>
                    Select state
                  </option>
                  {Array.isArray(stateData) &&
                    stateData.length > 0 &&
                    stateData.map((list) => (
                      <option key={list.id} value={list.stateName}>
                        {list.stateName}
                      </option>
                    ))}
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
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={(e) => handleAddressInputChange(e, "city")}
                  value={newAddress.city}
                  name="city"
                >
                  <option value="" disabled>
                    Select city
                  </option>
                  {Array.isArray(cityData) &&
                    cityData.length > 0 &&
                    cityData.map((list, index) => (
                      <option key={index} value={list.cityName}>
                        {list.cityName}
                      </option>
                    ))}
                </select>
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
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
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
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z\s]/g, "");
                  }}
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
                    borderColor: errors1.phoneNumber ? "red" : "",
                  }}
                  type={"number"}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  maxLength={10}
                  value={newAddress.phoneNumber}
                  onChange={(e) => handleAddressInputChange(e, "phoneNumber")}
                  className="input input-bordered p-2"
                />
                {errors1.phoneNumber && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Phone Number is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Designation
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
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z\s]/g, "");
                  }}
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
                    borderColor: errors1.email ? "red" : "",
                  }}
                  type={"email"}
                  value={newAddress.email}
                  onChange={(e) => handleAddressInputChange(e, "email")}
                  className="input input-bordered p-2"
                />
                {errors1.email && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Email is required
                  </span>
                )}
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
          <Button onClick={handleShippingClickClose}>Cancel</Button>
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
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z\s]/g, "");
                  }}
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
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
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
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z\s]/g, "");
                  }}
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
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z\s]/g, "");
                  }}
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
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
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
