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
import "react-toastify/dist/ReactToastify.css";
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
  const [emitter, setEmitter] = useState();
  const [flow, setFlow] = useState([]);
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [selectedFlows, setSelectedFlows] = useState([]);
  const [emitterData, setEmitterData] = useState({});
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);


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

  const getEmitterFlow = async (emitter) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow`,
        {
          params: {
            orgId: orgId,
            emitterId: emitter,
          },
        }
      );
      if (response.status === 200) {
        setFlow(response.data.paramObjectsMap.flowVO);
        setSelectedFlow(null); // Reset selected flow
        console.log("flow", response.data.paramObjectsMap.flowVO);
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

      console.log("Test", emitterCustomersVO);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const handleFlowSelection = (flow) => {
  //   setSelectedFlow(flow);
  // };

  // const notify = () => toast("User Created Successfully");

  function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let filteredValue = value;

    const allowedCharactersRegex = /^[a-zA-Z\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "firstName" || name === "city" || name === "state" || name === "country") {
      if (!allowedCharactersRegex.test(value)) {
        filteredValue = value.replace(/[^a-zA-Z\s\-]+/g, '');
      }
    }
    else if (name === "phone") {
      filteredValue = value.replace(/\D/g, '').slice(0, 10);
    }
    else if (name === "pincode") {
      filteredValue = value.replace(/\D/g, '').slice(0, 6);
    }
    else if (name === "email") {
      if (!emailRegex.test(value)) {
        filteredValue = value.replace(/[^\w\s@.-]+/g, '');
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
    setEmitter(null);
    setFlow([]);
    setEmitterCustomersVO([]);
    setOrgId(localStorage.getItem("orgId"));
    setSelectedFlow(null);
    setSelectedFlows([]);
    // notify();
  }

  const handleUserCreation = () => {
    const errors = {};
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

    // Update userData with the hashed password
    const userPayload = {
      accessRightsRoleId: 2,
      // accessWarehouse: warehouse,
      // accessaddId: 0,
      accessFlowId: selectedFlows,
      active: active,
      email: email,
      emitterId: emitter,
      firstName: firstName,
      orgId: orgId, // You may need to provide a default value
      role: role,
      pno: phone,
      userAddressDTO: {
        address1: address,
        address2: "", // You may need to provide a default value
        country: country,
        location: city,
        pin: pincode,
        state: state,
      },
      userName: email || "", // You may need to provide a default value
    };

    const userDataWithHashedPassword = {
      ...userPayload,
      password: hashedPassword,
    };

    if (Object.keys(errors).length === 0) {
      // Valid data, perform API call or other actions
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/auth/createUser`,
          userDataWithHashedPassword,
          { headers }
        )
        .then((response) => {
          console.log("User saved successfully!", response.data);
          handleNew();
        })
        .catch((error) => {
          console.error("Error saving user:", error.message);
        });
    } else {
      // Set errors state to display validation errors
      setErrors(errors);
    }
  };

  const handleFlowSelection = (flow, isChecked) => {
    setSelectedFlows((prevWarehouse) => {
      if (isChecked && !prevWarehouse.includes(flow)) {
        // Add warehouseLocation to the array if it's not already present
        return [...prevWarehouse, flow];
      } else if (!isChecked) {
        // Remove warehouseLocation from the array
        return prevWarehouse.filter((wh) => wh !== flow);
      }

      // Return the unchanged array if isChecked is true and warehouseLocation is already present
      return prevWarehouse;
    });
  };

  useEffect(() => {
    if (emitterEditId) {
      getEmitterById();
    }
    console.log("value", selectedFlows);
    getCustomersList();
  }, [selectedFlows]); // This will be triggered whenever selectedFlows changes

  // GET USER DETAILS 
  const getEmitterById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${emitterEditId}`
      );

      if (response.status === 200) {
        setEmitterData(response.data.paramObjectsMap.userVO);
        console.log("Edit Emitter Details", response.data.paramObjectsMap.userVO);
        setFirstName(response.data.paramObjectsMap.userVO.firstName)
        setEmail(response.data.paramObjectsMap.userVO.email)
        setAddress(response.data.paramObjectsMap.userVO.userAddressVO.address1)
        setCity(response.data.paramObjectsMap.userVO.userAddressVO.city)
        setState(response.data.paramObjectsMap.userVO.userAddressVO.state)
        setCountry(response.data.paramObjectsMap.userVO.userAddressVO.country)
        setPincode(response.data.paramObjectsMap.userVO.userAddressVO.pin)
        setPhone(response.data.paramObjectsMap.userVO.pno)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //UPDATE EMITTER
  const handleEmitterUpdate = () => {
    const errors = {};
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
    // if (!warehouse) {
    //   errors.warehouse = "Warehouse is required";
    // }
    const userPayload = {
      accessRightsRoleId: 2,
      // accessWarehouse: warehouse,
      // accessaddId: 0,
      active: active,
      email: email,
      emitterId: 0,
      firstName: firstName,
      orgId: orgId, // You may need to provide a default value
      role: role,
      pno: phone,
      userAddressDTO: {
        address1: address,
        address2: "", // You may need to provide a default value
        country: country,
        location: city,
        pin: pincode,
        state: state,
      },
      userName: email,
      userId: emitterEditId, // You may need to provide a default value
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

    const hashedPassword = encryptPassword(password);

    console.log("Update Payload is:", userPayload);

    // const userDataWithHashedPassword = {
    //   ...userPayload,
    //   password: hashedPassword,
    // };

    if (Object.keys(errors).length === 0) {
      // Valid data, perform API call or other actions
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/auth/updateUser`,
          userPayload,
          { headers }
        )
        .then((response) => {
          console.log("User Updated successfully!", response.data);
          setErrors("");
          addEmitter(false)   // EMITTER CREATION SCREEN CLOSE AFTER UPDATE 

        })
        .catch((error) => {
          console.error("Error saving user:", error.message);
        });
    } else {
      setErrors(errors);
    }
  };

  // CLOSE BUTTON WITH CONFIRMATION
  const handleEmitterCreationClose = () => {
    if (firstName || phone || address || city || state || country || pincode || flow > 0) {
      setOpenConfirmationDialog(true);
    } else {
      setOpenConfirmationDialog(false);
      addEmitter(false)
    }
  }

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
        {/* <ToastContainer /> */}
        <div className="d-flex justify-content-end">
          {/* <h1 className="text-xl font-semibold mb-3">User Details</h1> */}
          <IoMdClose
            onClick={handleEmitterCreationClose}
            className="cursor-pointer w-8 h-8 mb-3" />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
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
          <div className="col-lg-3 col-md-6">
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
            <button
              type="button"
              onClick={handleShippingClickOpen}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Select Flow
            </button>
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
              onChange={handleInputChange}
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
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
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="city"
              value={city}
              onChange={handleInputChange}
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
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
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="state"
              value={state}
              onChange={handleInputChange}
            />
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Country
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="country"
              value={country}
              onChange={handleInputChange}
            />
            {errors.country && (
              <span className="error-text">{errors.country}</span>
            )}
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
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>

        {emitterEditId ? (<div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleEmitterUpdate}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Update
          </button>
        </div>) : (
          <div className="d-flex flex-row mt-3">

            <button
              type="button"
              onClick={handleUserCreation}
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
          </div>)}
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
                  {" "}
                  {flow.map((flowItem) => (
                    <div key={flowItem.id} className="mb-2">
                      <input
                        type="checkbox"
                        checked={selectedFlows.includes(flowItem.id)}
                        onChange={(e) =>
                          handleFlowSelection(flowItem.id, e.target.checked)
                        }
                        id={flowItem.id}
                        value={flowItem.id}
                      />{" "}
                      <label className="form-check-label" htmlFor={flowItem.id}>
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

        <DialogActions className="mb-2 me-2">
          <Button onClick={handleShippingClickClose}>OK</Button>
          {selectedFlow && <Button variant="contained">Submit</Button>}
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
