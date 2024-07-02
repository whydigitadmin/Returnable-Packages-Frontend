import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stringValidation } from "../../utils/userInputValidation";
import { encryptPassword } from "../user/components/utils";

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

function OemCreation({ addEmitter, oemEditId }) {
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [phone, setPhone] = React.useState();
  const [active, setActive] = React.useState(true);
  const [role, setRole] = React.useState("ROLE_OEM");
  const [errors, setErrors] = useState({});
  const [openShippingModal, setOpenShippingModal] = React.useState(false);
  const [receiver, setReceiver] = useState("");
  const [flow, setFlow] = useState([]);
  const [receiverCustomersVO, setReceiverCustomersVO] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [selectedFlows, setSelectedFlows] = useState([]);
  const [oemData, setOemData] = useState({});
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    getCountryData();
    getStateData();
    getCityData();
    getCustomersList();
    {
      oemEditId && getOemById();
    }
  }, [country, state]);

  const getCountryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/country?orgId=${orgId}`
      );
      if (response.status === 200) {
        setCountryList(response.data.paramObjectsMap.countryVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStateData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/state/Country?country=${country}&orgId=${orgId}`
      );
      if (response.status === 200) {
        setStateList(response.data.paramObjectsMap.stateVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getCityData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/city/getByStateAndCountry?country=${country}&orgId=${orgId}&state=${state}`
      );
      if (response.status === 200) {
        setCityList(response.data.paramObjectsMap.cityVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShippingClickOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClickClose = () => {
    setOpenShippingModal(false);
  };

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
    getReceiverFlow(event.target.value);
  };

  const getReceiverFlow = async (receiver) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/activeReceiverflow?orgId=${orgId}&receiverId=${receiver}`
      );
      if (response.status === 200) {
        setFlow(response.data.paramObjectsMap.flowVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const getReceiverFlow = async (receiver) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/master/activeflow`,
  //       {
  //         params: {
  //           orgId: orgId,
  //           emitterId: receiver,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setFlow(response.data.paramObjectsMap.flowVO);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const getCustomersList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getCustomersList?orgId=${orgId}`
      );

      if (response.status === 200) {
        setReceiverCustomersVO(
          response.data.paramObjectsMap.customersVO.receiverCustomersVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let filteredValue = value;

    const allowedCharactersRegex = /^[a-zA-Z\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      name === "firstName" ||
      name === "city" ||
      name === "state" ||
      name === "country"
    ) {
      if (!allowedCharactersRegex.test(value)) {
        filteredValue = value.replace(/[^a-zA-Z\s\-]+/g, "");
      }
    } else if (name === "phone") {
      filteredValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "pincode") {
      filteredValue = value.replace(/\D/g, "").slice(0, 6);
    } else if (name === "email") {
      if (!emailRegex.test(value)) {
        filteredValue = value.replace(/[^\w\s@.-]+/g, "");
      }
    }

    switch (name) {
      case "firstName":
        setFirstName(filteredValue);
        break;
      case "email":
        setEmail(filteredValue);
        break;
      case "password":
        setPassword(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(filteredValue);
        break;
      case "state":
        setState(filteredValue);
        break;
      case "country":
        setCountry(filteredValue);
        break;
      case "pincode":
        setPincode(filteredValue);
        break;
      case "phone":
        setPhone(filteredValue);
        break;
    }
  };

  const handleNew = () => {
    setFirstName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setPincode("");
    setPhone("");
    setActive(true);
    setRole("ROLE_OEM");
    setErrors({});
    setOpenShippingModal(false);
    setReceiver("");
    setFlow([]);
    setOrgId(localStorage.getItem("orgId"));
    setSelectedFlows([]);
    // notify();
  };

  // OEM CREATE
  const handleOemCreation = () => {
    const errors = {};
    if (!receiver) {
      errors.receiver = "receiver is required";
    }
    if (selectedFlows.length === 0) {
      errors.selectedFlows = "Please select atleast one flow";
    }
    if (!firstName) {
      errors.firstName = "First Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    } else if (phone.length < 10) {
      errors.phone = "Phone number must be 10 Digit";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (!pincode) {
      errors.pincode = "Pincode is required";
    } else if (pincode.length < 6) {
      errors.pincode = "Pincode must be 6 Digit";
    }

    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    const hashedPassword = encryptPassword(password);

    const userPayload = {
      accessRightsRoleId: 0,
      accessFlowId: selectedFlows,
      active: active,
      createdBy: userName,
      email: email,
      receiverId: receiver,
      firstName: firstName,
      lastName: "",
      orgId: orgId,
      role: role,
      pno: phone,
      userAddressDTO: {
        address1: address,
        address2: "",
        city: city,
        country: country,
        location: city,
        pin: pincode,
        state: state,
      },
      userName: email || "",
    };

    const userDataWithHashedPassword = {
      ...userPayload,
      password: hashedPassword,
    };

    if (Object.keys(errors).length === 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/auth/createUser`,
          userDataWithHashedPassword,
          { headers }
        )
        .then((response) => {
          toast.success("OEM saved successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
          handleNew();
        })
        .catch((error) => {
          toast.error("Failed to save OEM. Please try again.");
        });
    } else {
      setErrors(errors);
    }
  };

  //UPDATE EMITTER
  const handleOemUpdate = () => {
    console.log("ok");
    const errors = {};
    if (!receiver) {
      errors.receiver = "receiver is required";
    }
    if (!selectedFlows.length === 0) {
      errors.selectedFlows = "Please select atleast one flow";
    }
    if (!firstName) {
      errors.firstName = "First Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!phone) {
      errors.phone = "Phone is required";
    } else if (phone.length < 10) {
      errors.phone = "Phone number must be 10 Digit";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (!pincode) {
      errors.pincode = "Pincode is required";
    } else if (pincode.length < 6) {
      errors.pincode = "Pincode must be 6 Digit";
    }
    const userPayload = {
      accessRightsRoleId: 2,
      // accessWarehouse: warehouse,
      // accessaddId: 0,
      accessFlowId: selectedFlows,
      active: active,
      createdBy: userName,
      email: email,
      receiverId: receiver,
      firstName: firstName,
      orgId: orgId,
      role: role,
      pno: phone,
      userAddressDTO: {
        address1: address,
        address2: "",
        country: country,
        location: city,
        pin: pincode,
        state: state,
      },
      userName: email,
      userId: oemEditId,
    };

    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }

    if (Object.keys(errors).length === 0) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/auth/updateUser`,
          userPayload,
          { headers }
        )
        .then((response) => {
          setErrors("");
          toast.success("OEM Updated successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
          setTimeout(() => {
            addEmitter(false);
          }, 3000);
        })
        .catch((error) => {
          toast.error("Failed to update OEM. Please try again.");
        });
    } else {
      setErrors(errors);
    }
  };
  const handleFlowSelection = (flow, isChecked) => {
    setSelectedFlows((prevFlow) => {
      if (!Array.isArray(prevFlow)) {
        console.error("flow state is not an array:", prevFlow);
        return prevFlow;
      }

      if (isChecked) {
        const updatedFlow = [...prevFlow, flow];
        console.log("Updated flow State (Added):", updatedFlow);
        return updatedFlow;
      } else {
        const updatedFlow = prevFlow.filter((id) => id !== flow);
        console.log("Updated flow State (Removed):", updatedFlow);
        return updatedFlow;
      }
    });
  };

  // GET USER DETAILS
  const getOemById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${oemEditId}`
      );

      if (response.status === 200) {
        setOemData(response.data.paramObjectsMap.userVO);
        setReceiver(response.data.paramObjectsMap.userVO.customersVO.id);
        setFirstName(response.data.paramObjectsMap.userVO.firstName);
        setEmail(response.data.paramObjectsMap.userVO.email);
        setAddress(response.data.paramObjectsMap.userVO.userAddressVO.address1);
        setCity(response.data.paramObjectsMap.userVO.userAddressVO.city);
        setState(response.data.paramObjectsMap.userVO.userAddressVO.state);
        setCountry(response.data.paramObjectsMap.userVO.userAddressVO.country);
        setPincode(response.data.paramObjectsMap.userVO.userAddressVO.pin);
        setPhone(response.data.paramObjectsMap.userVO.pno);
        setSelectedFlows(response.data.paramObjectsMap.userVO.accessFlowId);
        getReceiverFlow(response.data.paramObjectsMap.userVO.customersVO.id);
        if (response.data.paramObjectsMap.userVO.active === "In-Active") {
          setActive(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // CLOSE BUTTON WITH CONFIRMATION
  const handleEmitterCreationClose = () => {
    if (
      firstName ||
      phone ||
      address ||
      city ||
      state ||
      country ||
      pincode ||
      flow > 0
    ) {
      setOpenConfirmationDialog(true);
    } else {
      setOpenConfirmationDialog(false);
      addEmitter(false);
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirmationYes = () => {
    setOpenConfirmationDialog(false);
    addEmitter(false);
  };
  const handleSwitchChange = (event) => {
    setActive(event.target.checked);
  };

  return (
    <>
      <ToastContainer />
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleEmitterCreationClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Receiver
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleReceiverChange}
              value={receiver}
            >
              <option value="" disabled>
                Select an Receiver
              </option>
              {receiverCustomersVO.length > 0 &&
                receiverCustomersVO.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.displayName}
                  </option>
                ))}
            </select>
            {errors.receiver && (
              <span className="error-text">{errors.receiver}</span>
            )}
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Assign Flow
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="d-flex flex-column">
              <button
                type="button"
                onClick={handleShippingClickOpen}
                className="bg-blue inline-block rounded bg-primary w-fit h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Select Flow
              </button>
              {errors.selectedFlows && (
                <span className="error-text mt-2">{errors.selectedFlows}</span>
              )}
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="firstName"
              value={firstName}
              onInput={stringValidation}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span className="error-text">{errors.firstName}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
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
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="email"
              value={email}
              onChange={handleInputChange}
              disabled={oemEditId ? true : false}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          {!oemEditId && (
            <>
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Password
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  type={"password"}
                  // placeholder={"Enter"}
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>
            </>
          )}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="address"
              value={address}
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              onChange={handleInputChange}
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div>

          {/* COUNTRY FIELD */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label label-text label-font-size text-base-content">
              Country
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full mb-2"
              name="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              <option value="" disabled>
                Select country
              </option>
              {countryList.length > 0 &&
                countryList.map((list) => (
                  <option key={list.id} value={list.country}>
                    {list.country}
                  </option>
                ))}
            </select>
            {errors.country && (
              <span className="error-text">{errors.country}</span>
            )}
          </div>
          {/* STATE FIELD */}
          <div className="col-lg-3 col-md-6 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full"
              onChange={(e) => setState(e.target.value)}
              value={state}
              name="state"
            >
              <option value="" disabled>
                Select state
              </option>
              {stateList.length > 0 &&
                stateList.map((list) => (
                  <option key={list.id} value={list.stateName}>
                    {list.stateName}
                  </option>
                ))}
            </select>
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>
          {/* CITY FIELD */}
          <div className="col-lg-3 col-md-6 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              name="city"
            >
              <option value="" disabled>
                Select city
              </option>
              {cityList.length > 0 &&
                cityList.map((list, index) => (
                  <option key={index} value={list.cityName}>
                    {list.cityName}
                  </option>
                ))}
            </select>
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Pincode
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="pincode"
              value={pincode}
              onChange={handleInputChange}
            />
            {errors.pincode && (
              <span className="error-text">{errors.pincode}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Phone No
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={handleSwitchChange}
                  // defaultChecked
                  checked={active}
                />
              }
            />
          </div>
        </div>
        {oemEditId ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleOemUpdate}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleOemCreation}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleNew}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openShippingModal}
        onClose={handleShippingClickClose}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Select Flow</DialogTitle>
          <IoMdClose
            onClick={handleShippingClickClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <div className="row mb-3">
            <div className="col-lg-12 col-md-12">
              {flow.length > 0 ? (
                <div>
                  {flow.map((flowItem) => (
                    <div className="form-check mb-2" key={flowItem.id}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={flowItem.id}
                        value={flowItem.id}
                        checked={
                          Array.isArray(selectedFlows) &&
                          selectedFlows.includes(flowItem.id)
                        }
                        onChange={(e) =>
                          handleFlowSelection(flowItem.id, e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label ms-1"
                        htmlFor={flowItem.id}
                      >
                        {flowItem.flowName}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <center>Flow Not Available!</center>{" "}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShippingClickClose}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* CLOSE CONFIRMATION MODAL */}
      <Dialog open={openConfirmationDialog}>
        <DialogContent>
          <p>Are you sure you want to close without saving changes?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>No</Button>
          <Button onClick={handleConfirmationYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OemCreation;
