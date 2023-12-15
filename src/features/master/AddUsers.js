import React, { useState } from "react";
import Axios from "axios";
import ToolTip from "../../components/Input/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaStarOfLife } from "react-icons/fa";
import { styled } from "@mui/material/styles";
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

function AddUsers({ addusers }) {
  const [userData, setUserData] = useState({
    employee_type: "",
    emploee_id: "",
    employee_name: "",
    username: "",
    password: "",
    conatct_no: "",
    email_id: "",
    location_assigned: "",
    active: true,
  });

  const [formErrors, setFormErrors] = useState({
    employee_type: "",
    emploee_id: "",
    employee_name: "",
    username: "",
    password: "",
    conatct_no: "",
    email_id: "",
    location_assigned: "",
    active: true,
  });

  const updateFormValue = ({ updateType, value }) => {
    setUserData({ ...userData, [updateType]: value });
    // console.log(updateType);
  };

  const handleUsers = () => {
    addusers(false);
  };

  const handleUser = () => {
    // const errors = {};
    // if (!userData.employee_type.trim()) {
    //   errors.employee_type = "Employee Type is required";
    // }
    // if (!userData.employee_name.trim()) {
    //   errors.employee_name = "Employee Name is required";
    // }
    // if (!userData.lastName.trim()) {
    //   errors.lastName = "Last Name is required";
    // }
    // if (!userData.customerOrgName.trim()) {
    //   errors.customerOrgName = "Organisation Name is required";
    // }
    // if (!userData.displayName.trim()) {
    //   errors.displayName = "Display Name is required";
    // }
    // if (!userData.email.trim()) {
    //   errors.email = "Email is required";
    // }
    // if (!userData.phone.trim()) {
    //   errors.phone = "phone is required";
    // }
    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    Axios.post(
      `${process.env.REACT_APP_API_URL}/api/usersdetails/view`,
      userData
    )
      .then((response) => {
        console.log("Response:", response.data);
        addusers(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4 ms-5">User Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Employee Type:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={
                "The classification or category that defines the type of employee"
              }
              updateFormValue={updateFormValue}
              updateType="employee_type"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Employee ID:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={
                "The unique identification number or code assigned to an employee"
              }
              updateFormValue={updateFormValue}
              updateType="emploee_id"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Name:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={
                "The individual's full name, typically including both the first name and the last name"
              }
              updateFormValue={updateFormValue}
              updateType="employee_name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                User Name:
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={"check"}
              updateFormValue={updateFormValue}
              updateType="username"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Password:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={"Use a strong mix of characters, numbers, and symbols"}
              updateFormValue={updateFormValue}
              updateType="password"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Contact Number:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={"Contact phone"}
              updateFormValue={updateFormValue}
              updateType="conatct_no"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Email ID:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={"The email address associated with the contact"}
              updateFormValue={updateFormValue}
              updateType="email_id"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Location Assigned:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
              <option value="">One</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Customer Assigned:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
              <option value="">One</option>
            </select>
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
        <div className="d-flex flex-row mt-1">
          <button
            type="button"
            onClick={handleUser}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleUsers}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddUsers;
