import * as React from "react";
import moment from "moment";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { Link } from "react-router-dom";
import { encryptPassword } from "../../user/components/utils";
import Axios from "axios";
import { FaArrowCircleLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";

function ChangePassword() {
  const dispatch = useDispatch();
  const [newPwd, setNewPwd] = React.useState("");
  const [confirmPwd, setConfirmPwd] = React.useState("");
  const [newPwd1, setNewPwd1] = React.useState("");
  const [confirmPwd1, setConfirmPwd1] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const [savedData, setSavedData] = React.useState("");
  const [loginUserName, setLoginUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [loginUserRole, setLoginUserRole] = React.useState(
    localStorage.getItem("userDetails")
  );

  const handleNewPwdChange = (event) => {
    setNewPwd(event.target.value);
  };
  const handleconfirmPwdChange = (event) => {
    setConfirmPwd(event.target.value);
  };
  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
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

  const handleNew = () => {
    setNewPwd("");
    setConfirmPwd("");
    setNewPwd1("");
    setConfirmPwd1("");
  };

  const handleValidation = () => {
    // console.log("test");
    const newErrors = {};

    if (newPwd === "") {
      newErrors.newPwd = "New Password is required";
    }
    if (newPwd.length < 8) {
      newErrors.newPwd = "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(newPwd)) {
      newErrors.newPwd = "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(newPwd)) {
      newErrors.newPwd = "Password must contain at least one lowercase letter.";
    }
    if (!/[@#$%^&+=]/.test(newPwd)) {
      newErrors.newPwd =
        "Password must contain at least one special character (@#$%^&+=).";
    }

    if (confirmPwd === "") {
      newErrors.confirmPwd = "Confirm Password is required";
    }

    if (newPwd !== confirmPwd) {
      newErrors.confirmPwd = "New and Confirm Password are Mismatch";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      const trimmedNewPwd = newPwd.trim();
      const dataToSave = {
        newPassword: encryptPassword(trimmedNewPwd),
        userName: loginUserName,
      };

      console.log("data should be saving", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/changePassword`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            //console.log("Your Current Password is not Correct!...");
          });
      } else {
        console.error("User is not authenticated. Please log in.");
      }
    }
  };

  const handleValidation1 = () => {
    console.log("VALIDATION 1 IS CALLED");
    const newErrors = {};

    if (newPwd1 === "") {
      newErrors.newPwd1 = "New Password is required";
    }
    if (newPwd1.length < 8) {
      newErrors.newPwd1 = "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(newPwd1)) {
      newErrors.newPwd1 =
        "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(newPwd1)) {
      newErrors.newPwd1 =
        "Password must contain at least one lowercase letter.";
    }
    if (!/[@#$%^&+=]/.test(newPwd1)) {
      newErrors.newPwd1 =
        "Password must contain at least one special character (@#$%^&+=).";
    }

    if (confirmPwd1 === "") {
      newErrors.confirmPwd1 = "Confirm Password is required";
    }

    if (newPwd1 !== confirmPwd1) {
      newErrors.confirmPwd1 = "New and Confirm Password are Mismatch";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave1 = () => {
    console.log("SAVE 1 IS CALLED");

    if (handleValidation1()) {
      const trimmedNewPwd = newPwd1.trim();
      const dataToSave = {
        newPassword: encryptPassword(trimmedNewPwd),
        userName: loginUserName,
      };

      console.log("data should be saving", dataToSave);

      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        Axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/changePassword`,
          dataToSave,
          { headers }
        )
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            setSavedData(response.data);
            handleNew();
            // showSuccessToast(response.data.paramObjectsMap.message);
            toast.success("Proof of Delivery Saved Successfully!", {
              autoClose: 2000,
              theme: "colored",
            });
          })
          .catch((error) => {
            if (error.response) {
              console.error("Error saving data:", error.response.data);
              showErrorToast(error.response.data.paramObjectsMap.errorMessage);
            } else {
              console.error("Error saving data:", error.message);
              showErrorToast("An error occurred. Please try again.");
            }
          });
      } else {
        console.error("User is not authenticated. Please log in.");
      }
    }
  };

  return (
    <>
      {loginUserRole === "ROLE_USER" ||
      loginUserRole === "ROLE_ADMIN" ||
      loginUserRole === "ROLE_DOCUMENT" ||
      loginUserRole === "ROLE_ALLOCATOR" ? (
        <>
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            {/* NEW PASSWORD FIELD */}
            <div className="row mb-4">
              <div className="col-lg-3 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  New Password:
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  type={"password"}
                  value={newPwd}
                  placeholder={""}
                  onChange={handleNewPwdChange}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered p-2"
                />
                {errors.newPwd && (
                  <span className="error-text">{errors.newPwd}</span>
                )}
              </div>
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="row mb-4">
              <div className="col-lg-3 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Confirm Password:
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  type={"password"}
                  value={confirmPwd}
                  placeholder={""}
                  onChange={handleconfirmPwdChange}
                  className="input input-bordered p-2"
                />
                {errors.confirmPwd && (
                  <span className="error-text">{errors.confirmPwd}</span>
                )}
              </div>
            </div>

            {/* BUTTONS  */}
            <div className="d-flex flex-row mt-3">
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleNew}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="pt-8 card p-3 bg-base-100 shadow-xl mt-2"
            style={{ width: "85%", margin: "auto" }}
          >
            <div className="flex items-center mt-1">
              <Link
                to={
                  loginUserRole === "ROLE_EMITTER"
                    ? "/app/welcomeemitter"
                    : "/app/welcomeoem"
                }
                className="mr-4"
              >
                <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
              </Link>
              <p className="text-2xl">
                <strong>Change Password</strong>
              </p>
            </div>

            {/* NEW PASSWORD FIELD */}
            <div className="row mb-4 mt-4">
              <div className="col-lg-3 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  New Password:
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  value={newPwd1}
                  placeholder={""}
                  // onChange={handleNewPwdChange}
                  onChange={(e) => setNewPwd1(e.target.value)}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered p-2"
                />
                {errors.newPwd1 && (
                  <span className="error-text">{errors.newPwd1}</span>
                )}
              </div>
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="row mb-4">
              <div className="col-lg-3 col-md-6">
                <label className="label label-text label-font-size text-base-content">
                  Confirm Password:
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  value={confirmPwd1}
                  placeholder={""}
                  // onChange={handleconfirmPwdChange}
                  onChange={(e) => setConfirmPwd1(e.target.value)}
                  className="input input-bordered p-2"
                />
                {errors.confirmPwd1 && (
                  <span className="error-text">{errors.confirmPwd1}</span>
                )}
              </div>
            </div>

            {/* BUTTONS  */}
            <div className="d-flex flex-row mt-3">
              <button
                type="button"
                name="save1"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleSave1}
              >
                Save
              </button>
              <button
                type="button"
                name="new1"
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleNew}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChangePassword;
