import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
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

function UserCreation({ addUser, userEditId }) {
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
  const [role, setRole] = React.useState("ROLE_USER");
  const [warehouse, setWarehouse] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [openShippingModal, setOpenShippingModal] = React.useState(false);
  const [warehouseLocationVO, setWarehouseLocationVO] = useState([]);
  const [userData, setUserData] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [disabledWarehouseIds, setDisabledWarehouseIds] = useState([]);


  const handleShippingClickOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClickClose = () => {
    setOpenShippingModal(false);
  };

  useEffect(() => {
    if (userEditId) {
      getUserById();
    }
    getWarehouseLocationList();
    // fetchData(); // Fetch data when the component mounts
    console.log("Testt", warehouse);
    console.log("Testt", userEditId);
  }, [warehouse]);

  // GET USER DETAILS 
  const getUserById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userEditId}`
      );

      if (response.status === 200) {
        setUserData(response.data.paramObjectsMap.userVO);
        console.log("Edit User Details", response.data.paramObjectsMap.userVO);
        setFirstName(response.data.paramObjectsMap.userVO.firstName)
        setEmail(response.data.paramObjectsMap.userVO.email)
        setAddress(response.data.paramObjectsMap.userVO.userAddressVO.address1)
        setCity(response.data.paramObjectsMap.userVO.userAddressVO.city)
        setState(response.data.paramObjectsMap.userVO.userAddressVO.state)
        setCountry(response.data.paramObjectsMap.userVO.userAddressVO.country)
        setPincode(response.data.paramObjectsMap.userVO.userAddressVO.pin)
        setPhone(response.data.paramObjectsMap.userVO.pno)
        setDisabledWarehouseIds(response.data.paramObjectsMap.userVO.accessWarehouse)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUserUpdate = () => {
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
        location: "Location",
        pin: pincode,
        state: state,
        city: city,
      },
      userName: email,
      userId: userEditId, // You may need to provide a default value
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
          handleUserCreationClose();

        })
        .catch((error) => {
          console.error("Error saving user:", error.message);
        });
    } else {
      setErrors(errors);
    }
  };

  const getWarehouseLocationList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/getWarehouseLocationByOrgID?orgId=${orgId}`
      );

      if (response.status === 200) {
        setWarehouseLocationVO(response.data.paramObjectsMap.WarehouseLocation);
        console.log(
          "WarehouseLocation",
          response.data.paramObjectsMap.WarehouseLocation
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLocationChange = (warehouseLocation, isChecked) => {
    setWarehouse((prevWarehouse) => {
      if (isChecked && !prevWarehouse.includes(warehouseLocation)) {
        // Add warehouseLocation to the array if it's not already present
        return [...prevWarehouse, warehouseLocation];
      } else if (!isChecked) {
        // Remove warehouseLocation from the array
        return prevWarehouse.filter((wh) => wh !== warehouseLocation);
      }

      // Return the unchanged array if isChecked is true and warehouseLocation is already present
      return prevWarehouse;
    });
  };

  // const handleLocationChange = (warehouseLocation, isChecked) => {
  //   setWarehouse((prevWarehouse) => {
  //     if (isChecked) {
  //       return [...prevWarehouse, warehouseLocation];
  //     } else {
  //       return prevWarehouse.filter((wh) => wh !== warehouseLocation);
  //     }
  //   });
  //   console.log("isChecked", warehouse);
  // };

  // const notify = () => toast("User Created Successfully");

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/access/getAccessRightByOrgId`,
  //       {
  //         params: {
  //           orgId: localStorage.getItem("orgId"),
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       // Update table data with fetched data
  //       // Consider updating the component state with the fetched data
  //       // For example, setAccessRights(response.data);
  //       notify();
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       // Handle 401 Unauthorized error
  //     } else {
  //       // For other errors, log the error to the console
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  // };

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
    setRole("ROLE_USER");
    setWarehouse([]);
    setErrors({});
    // notify();
  };

  // USER CREATE
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
    if (!warehouse) {
      errors.warehouse = "Warehouse is required";
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
      accessWarehouse: warehouse,
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
      setErrors(errors);
    }
  };

  const handleUserCreationClose = () => {
    addUser(false);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleUserCreationClose}
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
                Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6 mb-2" >
            <input
              className="form-control form-sz mb-2"
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
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              // placeholder={"Enter"}
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              // placeholder={"Enter"}
              name="email"
              value={email}
              onChange={handleInputChange}
              disabled={userEditId ? true : false}

            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* PASSWORD FIELD */}
          {/* <div className="col-lg-3 col-md-6 mb-2">
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
              disabled={userEditId ? true : false}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div> */}

          {!userEditId && (
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
                  disabled={userEditId ? true : false}
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
              max={10}
              onChange={handleInputChange}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Warehouse
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <button
              type="button"
              onClick={handleShippingClickOpen}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Assign Warehouse
            </button>
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

        {userEditId ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleUserUpdate}
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

      {/* ASSIGN WAREHOUSE MODAL */}
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openShippingModal}
        onClose={handleShippingClickClose}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Assign Warehouse</DialogTitle>
          <IoMdClose
            onClick={handleShippingClickClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText className="d-flex flex-column">
            <div className="row mb-3">
              <div className="col-lg-12 col-md-12">
                {warehouseLocationVO ? (
                  <div>
                    {" "}
                    {warehouseLocationVO.map((location) => (
                      <div className="form-check" key={location.warehouseId}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={location.warehouseId}
                          value={location.warehouseId}
                          checked={warehouse.includes(location.warehouseId)}
                          onChange={(e) =>
                            handleLocationChange(
                              location.warehouseId,
                              e.target.checked
                            )
                          }
                        />

                        <label
                          className="form-check-label"
                          htmlFor={location.warehouseId}
                        >
                          {location.warehouseLocation}
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
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button onClick={handleShippingClickClose}>Cancel</Button>
          <Button variant="contained" onClick={handleShippingClickClose}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserCreation;
