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
import { encryptPassword } from "../user/components/utils";
import { stringValidation } from "../../utils/userInputValidation";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

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

function EmitterCreation({ addEmitter, emitterEditId }) {
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
  const [role, setRole] = React.useState("ROLE_EMITTER");
  const [errors, setErrors] = useState({});
  const [openShippingModal, setOpenShippingModal] = React.useState(false);
  const [emitter, setEmitter] = useState("");
  const [flow, setFlow] = useState([]);
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [selectedFlows, setSelectedFlows] = useState([]);
  const [emitterData, setEmitterData] = useState({});
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const handleShippingClickOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClickClose = () => {
    setOpenShippingModal(false);
  };

  const handleEmitterChange = (event) => {
    setEmitter(event.target.value);
    getEmitterFlow(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setActive(event.target.checked);
  };

  const getEmitterFlow = async (emitter) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/activeflow`,
        {
          params: {
            orgId: orgId,
            emitterId: emitter,
          },
        }
      );
      if (response.status === 200) {
        setFlow(response.data.paramObjectsMap.flowVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCustomersList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getCustomersList?orgId=${orgId}`
      );
      if (response.status === 200) {
        setEmitterCustomersVO(
          response.data.paramObjectsMap.customersVO.emitterCustomersVO
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
    setRole("ROLE_EMITTER");
    setErrors({});
    setOpenShippingModal(false);
    setEmitter("");
    setFlow([]);
    setOrgId(localStorage.getItem("orgId"));
    setSelectedFlows([]);
  };

  const handleUserCreation = () => {
    const errors = {};
    if (!emitter) {
      errors.emitter = "Emitter is required";
    }
    if (selectedFlows.length === 0) {
      errors.selectedFlows = "Please select atleast one Flow";
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
      accessRightsRoleId: 2,
      // accessWarehouse: warehouse,
      // accessaddId: 0,
      accessFlowId: selectedFlows,
      active: active,
      email: email,
      emitterId: emitter,
      createdBy: userName,
      firstName: firstName,
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
          showSuccessToast(response.data.paramObjectsMap.message);
          handleNew();
        })
        .catch((error) => {
          console.error("Error saving emitter:", error.message);
          showErrorToast(error.response?.data?.paramObjectsMap?.errorMessage);
        });
    } else {
      setErrors(errors);
    }
  };

  // const handleFlowSelection = (flow, isChecked) => {
  //   setSelectedFlows((prevFlow) => {
  //     if (!Array.isArray(prevFlow)) {
  //       console.error("Flow is not an array:", prevFlow);
  //       return prevFlow;
  //     }

  //     if (flow === "selectAll") {
  //       if (isChecked) {
  //         const allFlowIds = flow.map((location) => location.flow);
  //         console.log("Select All flow:", allFlowIds);
  //         return allFlowIds;
  //       } else {
  //         return [];
  //       }
  //     }

  //     if (isChecked) {
  //       const updatedFlow = [...prevFlow, flow];
  //       return updatedFlow;
  //     } else {
  //       const updatedFlow = prevFlow.filter((id) => id !== flow);
  //       return updatedFlow;
  //     }
  //   });
  // };

  const handleFlowSelection = (flowId, isChecked) => {
    setSelectedFlows((prevFlow) => {
      if (!Array.isArray(prevFlow)) {
        console.error("prevFlow is not an array:", prevFlow);
        return prevFlow;
      }

      if (flowId === "selectAll") {
        if (isChecked) {
          const allFlowIds = Array.isArray(flow)
            ? flow.map((location) => location.id)
            : [];
          console.log("Select All flow:", allFlowIds);
          return allFlowIds;
        } else {
          return [];
        }
      }

      if (isChecked) {
        const updatedFlow = [...prevFlow, flowId];
        return updatedFlow;
      } else {
        const updatedFlow = prevFlow.filter((id) => id !== flowId);
        return updatedFlow;
      }
    });
  };

  useEffect(() => {
    getCountryData();
    getStateData();
    getCityData();
    if (emitterEditId) {
      getEmitterById();
    }
    getCustomersList();
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

  // GET USER DETAILS
  const getEmitterById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${emitterEditId}`
      );

      if (response.status === 200) {
        setEmitterData(response.data.paramObjectsMap.userVO);
        setEmitter(response.data.paramObjectsMap.userVO.customersVO.id);
        setFirstName(response.data.paramObjectsMap.userVO.firstName);
        setEmail(response.data.paramObjectsMap.userVO.email);
        setAddress(response.data.paramObjectsMap.userVO.userAddressVO.address1);
        setCity(response.data.paramObjectsMap.userVO.userAddressVO.city);
        setState(response.data.paramObjectsMap.userVO.userAddressVO.state);
        setCountry(response.data.paramObjectsMap.userVO.userAddressVO.country);
        setPincode(response.data.paramObjectsMap.userVO.userAddressVO.pin);
        setPhone(response.data.paramObjectsMap.userVO.pno);
        setSelectedFlows(response.data.paramObjectsMap.userVO.accessFlowId);
        if (response.data.paramObjectsMap.userVO.active === "In-Active") {
          setActive(false);
        }
        getEmitterFlow(response.data.paramObjectsMap.userVO.customersVO.id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEmitterUpdate = () => {
    const errors = {};
    if (!emitter) {
      errors.emitter = "Emitter is required";
    }
    if (!Array.isArray(selectedFlows) || selectedFlows.length === 0) {
      errors.selectedFlows = "Please select atleast one Flow";
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

    // if (!password) {
    //   errors.password = "Password is required";
    // }
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
      emitterId: 0,
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
      userId: emitterEditId,
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
          showSuccessToast(response.data.paramObjectsMap.message);
          setTimeout(() => {
            addEmitter(false);
          }, 3000);
        })
        .catch((error) => {
          showErrorToast(error.response?.data?.paramObjectsMap?.errorMessage);
        });
    } else {
      setErrors(errors);
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

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <ToastContainer />
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleEmitterCreationClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Emitter
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleEmitterChange}
              value={emitter}
            >
              <option value="" disabled>
                Select an Emitter
              </option>
              {emitterCustomersVO.length > 0 &&
                emitterCustomersVO.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.displayName}
                  </option>
                ))}
            </select>
            {errors.emitter && (
              <span className="error-text">{errors.emitter}</span>
            )}
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
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
          <div className="col-lg-3 col-md-6 mb-2">
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
              disabled={emitterEditId ? true : false}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* PASSWORD FIELD */}
          {!emitterEditId && (
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
                  checked={active}
                />
              }
            />
          </div>
        </div>

        {emitterEditId ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleEmitterUpdate}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleUserCreation}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Create
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
        {/* <DialogContent>
          <div className="row mb-3">
            <div className="col-lg-12 col-md-12">
              {flow.length > 0 ? (
                <div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAll"
                      value="selectAll"
                      checked={
                        Array.isArray(flow) && flow.length === flow.length
                      }
                      onChange={(e) =>
                        handleFlowSelection("selectAll", e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label fw-bold"
                      htmlFor="selectAll"
                    >
                      SELECT ALL Flow
                    </label>
                  </div>
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
                  <center>Flow Not Available!</center>
                </div>
              )}
            </div>
          </div>
        </DialogContent> */}

        <DialogContent>
          <div className="row mb-3">
            <div className="col-lg-12 col-md-12">
              {Array.isArray(flow) && flow.length > 0 ? (
                <div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAll"
                      value="selectAll"
                      checked={
                        Array.isArray(selectedFlows) &&
                        selectedFlows.length === flow.length
                      }
                      onChange={(e) =>
                        handleFlowSelection("selectAll", e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label fw-bold"
                      htmlFor="selectAll"
                    >
                      SELECT ALL Flow
                    </label>
                  </div>
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
                  <center>Flow Not Available!</center>
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

export default EmitterCreation;
