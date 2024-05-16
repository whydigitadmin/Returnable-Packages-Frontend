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
import React, { useEffect, useState } from "react";
import { FaStarOfLife, FaTrash, FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

function AddVendor({ addVendors, editVendorId }) {
  const [value, setValue] = React.useState(0);
  const [openBillingModal, setOpenBillingModal] = React.useState(false);
  const [openShippingModal, setOpenShippingModal] = React.useState(false);
  const [openBankModal, setOpenBankModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [venderType, setVenderType] = useState("");
  const [email, setEmail] = useState("");
  const [entityLegalName, setEntityLegalName] = useState("");
  const [displyName, setDisplyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [active, setActive] = useState(true);
  const [venderActivePortal, setVenderActivePortal] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNum] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [emailAddress, setEmailAddress] = React.useState("");
  const [id, setId] = React.useState();
  const [vendorId, setVendorId] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressShow, setAddressShow] = React.useState(false);
  // const [isAddressValid, setIsAddressValid] = React.useState(false);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [editBankAddressIndex, setEditBankAddressIndex] = React.useState(null);
  const [vendorAddressVO, setVendorAddressVO] = useState([]);
  const [vendorBankDetailsVO, setVendorBankDetailsVO] = useState([]);
  const [venderIdVO, setVenderIdVO] = useState(null);
  const [venderAddressId, setVenderAddressId] = useState(null);
  const [venderBankId, setVenderBankId] = useState(null);
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [disableCustomerType, setDisableCustomerType] = React.useState(false);
  const [shippingAddresses, setShippingAddresses] = useState([]);
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
    email: emailAddress,
    // isPrimary: false,
  });
  const [errors1, setErrors1] = useState({
    gstRegistrationStatus: false,
    street1: false,
    state: false,
    city: false,
    pincode: false,
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
  const handleCancel = () => {
    // Clear form fields
    setNewAddress({
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
    // Clear all error messages
    setErrors1({
      gstRegistrationStatus: false,
      street1: false,
      state: false,
      city: false,
      pinCode: false,
    });
    // Close the dialog
    handleShippingClickClose();
  };

  // const handleAddressSubmit = () => {
  //   const addressWithVendorId = { ...newAddress, vendorId: vendorId };
  //   if (isValidAddress()) {
  //     handleAddShippingAddress();
  //   } else {
  //     // Set errors for invalid or empty fields
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
  //     setErrors1(updatedErrors);
  //   }
  // };

  // const handleAddressSubmit = async () => {
  //   const addressWithVendorId = { ...newAddress, vendorId: vendorId };
  //   if (isValidAddress()) {
  //     setErrors1({}); // Clear any previous errors on successful submission
  //     handleAddShippingAddress();
  //   }
  // };

  // const handleAddressSubmit = async () => {
  //   const addressWithVendorId = { ...newAddress, vendorId: vendorId };
  //   if (isValidAddress()) {
  //     setErrors1({}); // Clear any previous errors on successful submission
  //     handleAddShippingAddress();
  //     // setIsAddressValid(true);
  //   } else {
  //     // Display error messages for invalid fields
  //     const updatedErrors = {};
  //     if (newAddress.gstRegistrationStatus.trim() === "") {
  //       updatedErrors.gstRegistrationStatus = true;
  //     }
  //     if (newAddress.street1.trim() === "") {
  //       updatedErrors.street1 = true;
  //     }
  //     if (newAddress.country.trim() === "") {
  //       updatedErrors.country = true;
  //     }
  //     if (newAddress.state.trim() === "") {
  //       updatedErrors.state = true;
  //     }
  //     if (newAddress.city.trim() === "") {
  //       updatedErrors.city = true;
  //     }
  //     if (newAddress.pinCode.trim() === "") {
  //       updatedErrors.pinCode = true;
  //     }
  //     setErrors1(updatedErrors);
  //     // setIsAddressValid(false);
  //   }
  // };

  const handleUpdateShippingAddress = (updatedAddress) => {
    // Check if updatedAddress is null or undefined
    if (!updatedAddress || updatedAddress.id === undefined) {
      // Handle adding a new address
      updatedAddress.id = 0;
      const newAddressList = [...vendorAddressVO, updatedAddress];
      setVendorAddressVO(newAddressList);
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
    const addressIndex = vendorAddressVO.findIndex(
      (address) => address.id === updatedAddress.id
    );

    if (addressIndex !== -1) {
      // Clone the array to avoid mutating state directly
      const updatedAddresses = [...vendorAddressVO];
      // Replace the old address with the updated one
      updatedAddresses[addressIndex] = updatedAddress;
      // Update the state with the new array of addresses
      setVendorAddressVO(updatedAddresses);
      setNewAddress({}); // Clear the newAddress state
      handleShippingClickClose(); // Close the modal or perform any other actions as needed
    } else {
      // Handle the case where the address ID is not found
      console.error("Address ID not found:", updatedAddress.id);
    }
  };

  const handleAddressSubmit = async () => {
    const addressWithVendorId = { ...newAddress };

    if (isValidAddress()) {
      setErrors1({}); // Clear any previous errors on successful submission
      if (editVendorId) {
        // If editCustomerId is truthy, update the existing address
        handleUpdateShippingAddress(addressWithVendorId);
      } else {
        // If editCustomerId is falsy, add a new address
        handleAddShippingAddress(addressWithVendorId);
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

  // const handleAddressInputChange = (e, field) => {
  //   const value = e.target.value;
  //   setNewAddress((prevState) => ({
  //     ...prevState,
  //     [field]: value,
  //   }));
  //   // Clear error when user starts typing in a field
  //   setErrors1((prevErrors) => ({
  //     ...prevErrors,
  //     [field]: false,
  //   }));
  // };

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

  const handleAddShippingAddress = () => {
    const addressWithVendorId = { ...newAddress, id: 0 };
    setShippingAddresses([...shippingAddresses, addressWithVendorId]);
    setNewAddress({
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
      email: emailAddress,
      // isPrimary: false,
    });
    setOpenShippingModal(false);
  };
  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...shippingAddresses];
    updatedAddresses.splice(index, 1);
    setShippingAddresses(updatedAddresses);
  };
  const styles = {
    submittedDataContainer: {
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
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

  useEffect(() => {
    // Check if the component is in edit mode
    if (editMode) {
      // Fetch vendor data
      getVendorId();
    }
  }, [editMode]);

  useEffect(() => {
    {
      editVendorId && getVendorId();
    }
    getCountryData();
  }, []);

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

  const getVendorId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/Vendor/${editVendorId}`
      );

      if (response.status === 200) {
        console.log(
          "Edit User Details",
          response.data.paramObjectsMap.vendorVO
        );
        setVenderType(response.data.paramObjectsMap.vendorVO.venderType);
        setEntityLegalName(
          response.data.paramObjectsMap.vendorVO.entityLegalName
        );
        setDisplyName(response.data.paramObjectsMap.vendorVO.displyName);
        setEmail(response.data.paramObjectsMap.vendorVO.email);
        console.log("email", response.data.paramObjectsMap.vendorVO.email);
        setPhoneNumber(response.data.paramObjectsMap.vendorVO.phoneNumber);
        setBank(
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO.bank
        );
        console.log(
          "bank",
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO.bank
        );
        setAccountNum(
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO.accountNo
        );
        setAccountName(
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO.accountName
        );
        setBranch(
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO.branch
        );
        setIfscCode(
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO.ifscCode
        );
        setVendorAddressVO(
          response.data.paramObjectsMap.vendorVO.vendorAddressVO
        );
        setVendorBankDetailsVO(
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO
        );
        setVenderIdVO(response.data.paramObjectsMap.vendorVO.id);
        setVenderAddressId(
          response.data.paramObjectsMap.vendorVO.vendorAddressVO.id
        );
        setVenderBankId(
          response.data.paramObjectsMap.vendorVO.vendorBankDetailsVO.id
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditAddress = (addressIndex) => {
    if (addressIndex >= 0) {
      // If addressIndex is greater than or equal to 0, it indicates an existing address is being edited
      setEditAddressIndex(addressIndex);
      const addressToEdit = vendorAddressVO[addressIndex];
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
        id: venderAddressId,
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const handleCancelAddVendor = () => {
    addVendors(false);
  };

  const handleCloseAddVendor = () => {
    setErrors("");
    // addVendors(false);
  };
  const handleBillingOpen = () => {
    setOpenBillingModal(true);
  };
  const handleBillingClose = () => {
    setOpenBillingModal(false);
  };
  const handleShippingClickOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClickClose = () => {
    setOpenShippingModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log("test", value);

    switch (name) {
      // case "firstName":
      //   setFirstName(value);
      //   break;
      // case "lastName":
      //   setLastName(value);
      //   break;
      case "venderType":
        setVenderType(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "entityLegalName":
        setEntityLegalName(value);
        break;
      case "displyName":
        setDisplyName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "accountName":
        setAccountName(value);
        break;
      case "accountNo":
        setAccountNum(value);
        break;
      case "bank":
        setBank(value);
        break;
      case "branch":
        setBranch(value);
        break;
      case "ifscCode":
        setIfscCode(value);
        break;
    }
  };
  // const handleBankInputChange = (event) => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case "accountName":
  //       setAccountName(value);
  //       break;
  //     case "accountNo":
  //       setAccountNum(value);
  //       break;
  //     case "bank":
  //       setBank(value);
  //       break;
  //     case "branch":
  //       setBranch(value);
  //       break;
  //     case "ifscCode":
  //       setIfscCode(value);
  //       break;
  //   }
  // };

  const handleBankInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedVendorBankDetailsVO = [...vendorBankDetailsVO];
    switch (name) {
      case "accountName":
        updatedVendorBankDetailsVO[index].accountName = value;
        break;
      case "accountNo":
        updatedVendorBankDetailsVO[index].accountNo = value;
        break;
      case "bank":
        updatedVendorBankDetailsVO[index].bank = value;
        break;
      case "branch":
        updatedVendorBankDetailsVO[index].branch = value;
        break;
      case "ifscCode":
        updatedVendorBankDetailsVO[index].ifscCode = value;
        break;
      default:
        break;
    }
    setVendorBankDetailsVO(updatedVendorBankDetailsVO);
  };

  const handleVender = () => {
    setIsSubmitting(true);
    const errors = {};

    console.log("test");
    if (!venderType) {
      errors.venderType = "VenderType is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!entityLegalName) {
      errors.entityLegalName = "EntityLegalName is required";
    }
    if (!displyName) {
      errors.displyName = "Display Name is required";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "PhoneNumber is required";
    }
    // if (!bank) {
    //   errors.bank = "Bank is required";
    // }
    // if (!accountName) {
    //   errors.accountName = "Account Name is required";
    // }
    // if (!accountNo) {
    //   errors.accountNo = "Account No is required";
    // }
    // if (!branch) {
    //   errors.branch = "Branch is required";
    // }
    // if (!ifscCode) {
    //   errors.ifscCode = "Ifsc Code is required";
    // }

    if (Object.keys(errors).length === 0) {
      const formData = {
        venderType,
        displyName,
        email,
        entityLegalName,
        phoneNumber,
        active,
        orgId,
        id: 0,
        venderActivePortal,
        vendorAddressDTO: shippingAddresses,
        vendorBankDetailsDTO: [
          {
            accountName: accountName,
            accountNo: accountNo,
            bank: bank,
            branch: branch,
            ifscCode: ifscCode,
            id: 0,
          },
        ],
      };

      console.log("test", formData);
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/master/Vendor`, formData)
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            console.log("Response:", response.data);
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
            setVendorId(response.data.paramObjectsMap.updatedVendorVO.id);
            console.log(
              "id:",
              response.data.paramObjectsMap.updatedVendorVO.id
            );
            setAddressShow(true);
            setErrors({});
            setTimeout(() => {
              addVendors(false);
            }, 2000);
          }
        });
    } else {
      // If there are errors, update the state to display them
      setIsSubmitting(false);
      setErrors(errors);
    }
  };

  const handleUpdateVender = () => {
    setIsSubmitting(true);
    const errors = {};

    console.log("test");
    if (!venderType) {
      errors.venderType = "VenderType is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!entityLegalName) {
      errors.entityLegalName = "Entity Legal Name is required";
    }
    if (!displyName) {
      errors.displyName = "Display Name is required";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    }
    // if (!bank) {
    //   errors.bank = "Bank is required";
    // }
    // if (!accountName) {
    //   errors.accountName = "Account Name is required";
    // }
    // if (!accountNo) {
    //   errors.accountNo = "Account No is required";
    // }
    // if (!branch) {
    //   errors.branch = "Branch is required";
    // }
    // if (!ifscCode) {
    //   errors.ifscCode = "Ifsc Code is required";
    // }

    if (Object.keys(errors).length === 0) {
      const formData = {
        venderType,
        displyName,
        email,
        entityLegalName,
        phoneNumber,
        active,
        orgId,
        id: venderIdVO,
        venderActivePortal,
        vendorAddressDTO: vendorAddressVO,
      };
      // Check if vendorBankDetailsVO exists and has length greater than 0
      if (vendorBankDetailsVO && vendorBankDetailsVO.length > 0) {
        // Include bank details in formData
        formData.vendorBankDetailsDTO = vendorBankDetailsVO;
      }

      console.log("test", formData);
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/master/Vendor`, formData)
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            console.log("Response:", response.data);
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
            setVendorId(response.data.paramObjectsMap.updatedVendorVO.id);
            setAddressShow(true);
            setErrors({});
            setTimeout(() => {
              addVendors(false);
            }, 2000);
          }
        });
    } else {
      // If there are errors, update the state to display them
      setIsSubmitting(false);
      setErrors(errors);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          {/* <h1 className="text-xl font-semibold mb-3">Vendor Details</h1> */}
          <IoMdClose
            onClick={handleCancelAddVendor}
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
              onChange={handleInputChange}
              value={venderType}
              name="venderType"
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Select a vendor
              </option>
              <option value="Transport">Transport</option>
              <option value="Supplier">Supplier</option>
            </select>
            {errors.venderType && (
              <div className="error-text">{errors.venderType}</div>
            )}
          </div>
          {/* <div className="col-lg-3 col-md-6">
            <label className="label mb-2">
              <span className={"label-text label-font-size text-base-content"}>
                First Name
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz"
              type={"text"}
              placeholder={"Enter"}
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span className="error-text">{errors.firstName}</span>
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
              className="form-control form-sz"
              type={"text"}
              placeholder={"Enter"}
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <span className="error-text">{errors.lastName}</span>
            )}
          </div> */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
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
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz"
              type={"text"}
              // placeholder={"Enter"}
              name="entityLegalName"
              value={entityLegalName}
              onChange={handleInputChange}
              disabled={isSubmitting}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
              }}
            />
            {errors.entityLegalName && (
              <span className="error-text">{errors.entityLegalName}</span>
            )}
          </div>
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
            <input
              className="form-control form-sz"
              type={"text"}
              // placeholder={"Enter"}
              name="displyName"
              value={displyName}
              onChange={handleInputChange}
              disabled={isSubmitting}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z\s]/g, "");
              }}
            />
            {errors.displyName && (
              <span className="error-text">{errors.displyName}</span>
            )}
          </div>
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
            <input
              className="form-control form-sz"
              type={"text"}
              // placeholder={"Enter"}
              name="email"
              value={email}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Phone Number
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz"
              type={"text"}
              // placeholder={"Enter"}
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
              disabled={isSubmitting}
              maxLength={10}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
            {errors.phoneNumber && (
              <span className="error-text">{errors.phoneNumber}</span>
            )}
          </div>
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

          {/* <div className="col-lg-3 col-md-6 mb-2">
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
              type="text"
              className="form-control form-sz"
              // placeholder="Enter"
              value={bank}
              name="bank"
              onChange={(e) => handleBankInputChange(e, index)}
              disabled={isSubmitting}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
              }}
            />
            {errors.bank && <div className="error-text">{errors.bank}</div>}
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
              type="text"
              className="form-control form-sz"
              // placeholder="Enter"
              value={accountNo}
              name="accountNo"
              onChange={(e) => handleBankInputChange(e, index)}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              maxLength={30}
              disabled={isSubmitting}
            />
            {errors.accountNo && (
              <div className="error-text">{errors.accountNo}</div>
            )}
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
              type="text"
              className="form-control form-sz"
              // placeholder="Enter"
              value={accountName}
              name="accountName"
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
              }}
              onChange={(e) => handleBankInputChange(e, index)}
              disabled={isSubmitting}
            />
            {errors.accountName && (
              <div className="error-text">{errors.accountName}</div>
            )}
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
              type="text"
              className="form-control form-sz"
              // placeholder="Enter"
              value={branch}
              name="branch"
              onChange={(e) => handleBankInputChange(e, index)}
              disabled={isSubmitting}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
              }}
            />
            {errors.branch && <div className="error-text">{errors.branch}</div>}
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
              type="text"
              className="form-control form-sz"
              // placeholder="Enter"
              value={ifscCode}
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              name="ifscCode"
              onChange={(e) => handleBankInputChange(e, index)}
              disabled={isSubmitting}
            />
            {errors.ifscCode && (
              <div className="error-text">{errors.ifscCode}</div>
            )}
          </div>
        </div> */}
        </div>

        <>
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
                {shippingAddresses.map((address, index) => (
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
                        Designation:
                      </span>
                      <span>{address.designation}</span>
                    </div>
                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>Email:</span>
                      <span>{address.email}</span>
                    </div>
                    <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>
                        Phone Number:
                      </span>
                      <span>{address.phoneNumber}</span>
                    </div>
                    {/* <div style={styles.submittedDataItem}>
                      <span style={styles.submittedDataLabel}>Primary:</span>
                      <span>{address.isPrimary ? "Yes" : "No"}</span>
                    </div> */}
                  </div>
                ))}
              </div>
              {editVendorId &&
                vendorAddressVO &&
                vendorAddressVO.length > 0 && (
                  <>
                    <div className="d-flex flex-wrap">
                      {vendorAddressVO.map((address, index) => (
                        <div
                          className="mt-3 me-2 card"
                          key={index}
                          style={{
                            ...styles.submittedDataContainer,
                            width: "300px",
                            height: "auto",
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
                                // className="btn btn-link"
                              >
                                <FaEdit className="cursor-pointer w-4 h-8 pb-2" />
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
                            <span style={styles.submittedDataLabel}>
                              State:
                            </span>
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
                            <span style={styles.submittedDataLabel}>
                              Email:
                            </span>
                            <span>{address.email}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {editVendorId &&
              vendorBankDetailsVO &&
              vendorBankDetailsVO.length > 0 ? (
                <div className="row">
                  {vendorBankDetailsVO.map((bank, index) => (
                    <>
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
                          type="text"
                          className="form-control form-sz"
                          // placeholder="Enter"
                          value={bank.bank}
                          name="bank"
                          onChange={(e) => handleBankInputChange(e, index)}
                          disabled={isSubmitting}
                          onInput={(e) => {
                            e.target.value = e.target.value
                              .toUpperCase()
                              .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                          }}
                        />
                        {errors.bank && (
                          <div className="error-text">{errors.bank}</div>
                        )}
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
                          type="text"
                          className="form-control form-sz"
                          // placeholder="Enter"
                          value={bank.accountNo}
                          name="accountNo"
                          onChange={(e) => handleBankInputChange(e, index)}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          maxLength={30}
                          disabled={isSubmitting}
                        />
                        {errors.accountNo && (
                          <div className="error-text">{errors.accountNo}</div>
                        )}
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
                          type="text"
                          className="form-control form-sz"
                          // placeholder="Enter"
                          value={bank.accountName}
                          name="accountName"
                          onInput={(e) => {
                            e.target.value = e.target.value
                              .toUpperCase()
                              .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                          }}
                          onChange={(e) => handleBankInputChange(e, index)}
                          disabled={isSubmitting}
                        />
                        {errors.accountName && (
                          <div className="error-text">{errors.accountName}</div>
                        )}
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
                          type="text"
                          className="form-control form-sz"
                          // placeholder="Enter"
                          value={bank.branch}
                          name="branch"
                          onChange={(e) => handleBankInputChange(e, index)}
                          disabled={isSubmitting}
                          onInput={(e) => {
                            e.target.value = e.target.value
                              .toUpperCase()
                              .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                          }}
                        />
                        {errors.branch && (
                          <div className="error-text">{errors.branch}</div>
                        )}
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
                          type="text"
                          className="form-control form-sz"
                          // placeholder="Enter"
                          value={bank.ifscCode}
                          onInput={(e) => {
                            e.target.value = e.target.value.toUpperCase();
                          }}
                          name="ifscCode"
                          onChange={(e) => handleBankInputChange(e, index)}
                          disabled={isSubmitting}
                        />
                        {errors.ifscCode && (
                          <div className="error-text">{errors.ifscCode}</div>
                        )}
                      </div>
                    </>
                  ))}
                </div>
              ) : (
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
                      type="text"
                      className="form-control form-sz"
                      // placeholder="Enter"
                      value={bank}
                      name="bank"
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                      }}
                    />
                    {errors.bank && (
                      <div className="error-text">{errors.bank}</div>
                    )}
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
                      type="text"
                      className="form-control form-sz"
                      // placeholder="Enter"
                      value={accountNo}
                      name="accountNo"
                      onChange={handleInputChange}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                      maxLength={30}
                      disabled={isSubmitting}
                    />
                    {errors.accountNo && (
                      <div className="error-text">{errors.accountNo}</div>
                    )}
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
                      type="text"
                      className="form-control form-sz"
                      // placeholder="Enter"
                      value={accountName}
                      name="accountName"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                      }}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    {errors.accountName && (
                      <div className="error-text">{errors.accountName}</div>
                    )}
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
                      type="text"
                      className="form-control form-sz"
                      // placeholder="Enter"
                      value={branch}
                      name="branch"
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                      }}
                    />
                    {errors.branch && (
                      <div className="error-text">{errors.branch}</div>
                    )}
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
                      type="text"
                      className="form-control form-sz"
                      // placeholder="Enter"
                      value={ifscCode}
                      onInput={(e) => {
                        e.target.value = e.target.value.toUpperCase();
                      }}
                      name="ifscCode"
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    {errors.ifscCode && (
                      <div className="error-text">{errors.ifscCode}</div>
                    )}
                  </div>
                </div>
              )}
            </CustomTabPanel>
          </Box>
          <div className="d-flex flex-row mt-1 mb-2">
            {editVendorId ? (
              <button
                type="button"
                onClick={handleUpdateVender}
                disabled={addressShow === true}
                style={{
                  cursor: addressShow ? "not-allowed" : "pointer",
                }}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Update
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleVender}
                  disabled={addressShow === true}
                  style={{
                    cursor: addressShow ? "not-allowed" : "pointer",
                  }}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseAddVendor}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </>

        {/* Billing Address Modal Define */}
        {/* <Dialog
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
        </Dialog> */}

        {/* Shipping Address Modal Define */}
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
                        value={newAddress.gstNumber}
                        onInput={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        onChange={(e) =>
                          handleAddressInputChange(e, "gstNumber")
                        }
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
                    onInput={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                    }}
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
                    onInput={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                    }}
                    onChange={(e) => handleAddressInputChange(e, "street2")}
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
                  {/* <input
                    style={{
                      height: 40,
                      fontSize: "0.800rem",
                      width: "100%",
                      borderColor: errors1.state ? "red" : "",
                    }}
                    type={"text"}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                    }}
                    value={newAddress.state}
                    onChange={(e) => handleAddressInputChange(e, "state")}
                    className="input input-bordered p-2"
                  /> */}
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
                  {/* <input
                    style={{
                      height: 40,
                      fontSize: "0.800rem",
                      width: "100%",
                      borderColor: errors1.city ? "red" : "",
                    }}
                    type={"text"}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                    }}
                    value={newAddress.city}
                    onChange={(e) => handleAddressInputChange(e, "city")}
                    className="input input-bordered p-2"
                  /> */}
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
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                    }}
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
                    maxLength={10}
                    value={newAddress.phoneNumber}
                    onChange={(e) => handleAddressInputChange(e, "phoneNumber")}
                    className="input input-bordered p-2"
                  />
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
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z\s]/g, ""); // Include \s to allow spaces
                    }}
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
                    type={"text"}
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
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default AddVendor;
