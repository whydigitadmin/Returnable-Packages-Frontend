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

function ChangePassword() {
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const [newPwd, setNewPwd] = React.useState("");
  const [confirmPwd, setConfirmPwd] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const [savedData, setSavedData] = React.useState("");
  const [loginUserName, setLoginUserName] = React.useState(
    localStorage.getItem("userName")
  );

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

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

  return (
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
          <Link to="/">
            <button
              type="button"
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleNew}
            >
              Cancel
            </button>
          </Link>
        </div>

        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={openModal}
          onClose={handleClose}
        >
          <div className="d-flex justify-content-between">
            <DialogTitle>Add Billing Address</DialogTitle>
            <IoMdClose
              onClick={handleClose}
              className="cursor-pointer w-8 h-8 mt-3 me-3"
            />
          </div>
          <DialogContent>
            <DialogContentText className="d-flex flex-column">
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
                    type={"text"}
                    // value={value}
                    placeholder={"New pwd"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
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
                    // value={value}
                    placeholder={"Confirm pwd"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input input-bordered p-2"
                  />
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mb-2 me-2">
            <Button onClick={handleClose}>Cancel</Button>
            <Button component="label" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ChangePassword;
