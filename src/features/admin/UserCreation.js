import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
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

const roleOptions = ["ROLE_USER", "ROLE_EMITTER"];

function UserCreation() {
  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
    isActive: true,
    role: "ROLE_USER",
    orgId: localStorage.getItem("orgId"),
    userName: localStorage.getItem("userName"),
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const notify = () => toast("User Created Successfully");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/access/getAccessRightByOrgId`,
        {
          params: {
            orgId: localStorage.getItem("orgId"),
          },
        }
      );

      if (response.status === 200) {
        // Update table data with fetched data
        // Consider updating the component state with the fetched data
        // For example, setAccessRights(response.data);
        notify();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
      } else {
        // For other errors, log the error to the console
        console.error("Error fetching data:", error);
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setUserData({ ...userData, [updateType]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserCreation = () => {
    const errors = {};
    if (!userData.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!userData.email) {
      errors.email = "Email is required";
    }
    if (!userData.phone) {
      errors.phone = "Phone is required";
    }
    if (!userData.password) {
      errors.password = "Password is required";
    }
    if (!userData.address) {
      errors.address = "address is required";
    }
    if (!userData.city) {
      errors.city = "City is required";
    }
    if (!userData.state) {
      errors.state = "State is required";
    }
    if (!userData.country) {
      errors.country = "Country is required";
    }
    if (!userData.pincode) {
      errors.pincode = "Pincode is required";
    }
    if (!userData.role) {
      errors.role = "Role is required";
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
    const hashedPassword = encryptPassword(userData.password);

    // Update userData with the hashed password

    const userPayload = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName || "", // You may need to provide a default value
      orgId: userData.orgId, // You may need to provide a default value
      role: userData.role,
      userAddressDTO: {
        address1: userData.address,
        address2: "", // You may need to provide a default value
        country: userData.country,
        location: userData.city,
        pin: userData.pincode,
        state: userData.state,
      },
      userName: userData.email || "", // You may need to provide a default value
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
          notify();
          setUserData({
            firstName: "",
            email: "",
            password: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            phone: "",
            isActive: true,
            role: "",
            orgId: "",
            userName: "",
          });
        })
        .catch((error) => {
          console.error("Error saving user:", error.message);
        });
    } else {
      // Set errors state to display validation errors
      setErrors(errors);
    }
  };

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
      {/* <ToastContainer /> */}
      <div className="d-flex justify-content-between">
        <h1 className="text-xl font-semibold mb-3">User Details</h1>
        <IoMdClose onClick={""} className="cursor-pointer w-8 h-8 mb-3" />
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              name
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            placeholder={"Enter"}
            name="firstName"
            value={userData.firstName}
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
            placeholder={"Enter"}
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
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
            placeholder={"Enter"}
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Role
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <select
            name="role"
            style={{ height: 40, fontSize: "0.800rem" }}
            className="input mb-4 w-full input-bordered ps-2"
            value={userData.role}
            onChange={handleInputChange}
          >
            <option value="">Select a role</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>
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
            placeholder={"Enter"}
            name="address"
            value={userData.address}
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
            placeholder={"Enter"}
            name="city"
            value={userData.city}
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
            placeholder={"Enter"}
            name="state"
            value={userData.state}
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
            placeholder={"Enter"}
            name="country"
            value={userData.country}
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
            placeholder={"Enter"}
            name="pincode"
            value={userData.pincode}
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
            placeholder={"Enter"}
            name="phone"
            value={userData.phone}
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
          onClick={""}
          className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UserCreation;
