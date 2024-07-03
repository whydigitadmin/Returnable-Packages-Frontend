import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { encryptPassword } from "../user/components/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

// function NewCompany({ newCompany, companyEditId }) {
function NewCompany({ newCompany, companyEditId }) {
  const [adminFirstName, setAdminFirstName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [city, setCity] = React.useState("");
  const [code, setCode] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [orgLogo, setOrgLogo] = React.useState("");
  const [orgName, setOrgName] = React.useState("");
  const [createdby, setCreatedby] = useState(localStorage.getItem("userName"));
  const [password, setPassword] = React.useState("");
  const [active, setActive] = React.useState(true);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);
  const [errors, setErrors] = useState({});

  function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleNew = () => {
    setOrgName("");
    setAdminFirstName("");
    setCode("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setPincode("");
    setPassword("");
    setActive(true);
    setErrors({});
    // notify();
  };

  // SAVE COMPANY
  const handleSaveCompany = () => {
    const errors = {};
    if (!orgName) {
      errors.orgName = "Company Name is required";
    }
    if (!adminFirstName) {
      errors.adminFirstName = "Name is required";
    }
    if (!code) {
      errors.code = "Company Code is required";
    }
    if (!email) {
      errors.email = "Company Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone is required";
    } else if (phoneNumber.length < 10) {
      errors.phoneNumber = "Phone number must be 10 Digit";
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
    if (!password) {
      errors.password = "Password is required";
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
      active,
      address,
      adminFirstName,
      city,
      code,
      country,
      createdby,
      email,
      id: 0,
      orgLogo,
      orgName,
      password,
      phoneNumber,
      pinCode: pincode,
      state,
    };

    const userDataWithHashedPassword = {
      ...userPayload,
      password: hashedPassword,
    };

    if (Object.keys(errors).length === 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/company/createCompany`,
          userDataWithHashedPassword,
          { headers }
        )
        .then((response) => {
          console.log("User saved successfully!", response.data);
          // toast.success("User saved successfully!");
          toast.success(response.data.paramObjectsMap.message, {
            autoClose: 2000,
            theme: "colored",
          });
          handleNew();
        })
        .catch((error) => {
          console.error("Error saving user:", error.message);
          //   toast.error(response.data.paramObjectsMap.errorMessage);
        });
    } else {
      setErrors(errors);
    }
  };

  // CLOSE BUTTON WITH CONFIRMATION
  const handleUserCreationClose = () => {
    if (
      adminFirstName ||
      phoneNumber ||
      address ||
      city ||
      state ||
      country ||
      pincode
    ) {
      setOpenConfirmationDialog(true);
    } else {
      setOpenConfirmationDialog(false);
      newCompany(false); // USER CREATION SCREEN CLOSE AFTER UPDATE
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirmationYes = () => {
    setOpenConfirmationDialog(false);
    newCompany(false);
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
          {/* COMPANY NAME FIELD */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Company Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              name="orgName"
              value={orgName}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^\w\s@.-]+/g, "");
              }}
              onChange={(e) => setOrgName(e.target.value)}
            />
            {errors.orgName && (
              <span className="error-text">{errors.orgName}</span>
            )}
          </div>
          {/* COMPANY CODE FIELD */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Company Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              // placeholder={"Enter"}
              name="code"
              value={code}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^\w\s@.-]+/g, "");
              }}
              onChange={(e) => setCode(e.target.value)}
            />
            {errors.code && <span className="error-text">{errors.code}</span>}
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
              name="adminFirstName"
              value={adminFirstName}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^\w\s@.-]+/g, "");
              }}
              onChange={(e) => setAdminFirstName(e.target.value)}
            />
            {errors.adminFirstName && (
              <span className="error-text">{errors.adminFirstName}</span>
            )}
          </div>
          {/* COMPANY EMAIL FIELD */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Admin Email
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              // placeholder={"Enter"}
              name="email"
              value={email}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^\w\s@.-]+/g, "");
              }}
              onChange={(e) => setEmail(e.target.value)}
              disabled={companyEditId ? true : false}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          {/* ADMIN PASSWORD FIELD */}
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
              // onInput={(e) => {
              //     e.target.value = e.target.value.toUpperCase().replace(/[^\w\s@.-]+/g, "");
              // }}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
          {/* PHONE NO FIELD */}
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
              name="phoneNumber"
              value={phoneNumber}
              maxLength={10}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/\D/g, "");
              }}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <span className="error-text">{errors.phoneNumber}</span>
            )}
          </div>
          {/* ADDRESS FIELD */}
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
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div>
          {/* COUNTRY FIELD */}
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
              name="country"
              value={country}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^\w\s@.-]+/g, "");
              }}
              onChange={(e) => setCountry(e.target.value)}
            />
            {/* <select
              className="form-select form-sz w-full mb-2"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              name="country"
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
            </select> */}
            {errors.country && (
              <span className="error-text">{errors.country}</span>
            )}
          </div>
          {/* STATE FIELD */}
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
              name="state"
              value={state}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^\w\s@.-]+/g, "");
              }}
              onChange={(e) => setState(e.target.value)}
            />
            {/* <select
              className="form-select form-sz w-full mb-2"
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
            </select> */}
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>
          {/* CITY FIELD */}
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
              name="city"
              value={city}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^\w\s@.-]+/g, "");
              }}
              onChange={(e) => setCity(e.target.value)}
            />
            {/* <select
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
            </select> */}
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>
          {/* PIN CODE FIELD */}
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
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/\D/g, "");
              }}
              onChange={(e) => setPincode(e.target.value)}
            />
            {errors.pincode && (
              <span className="error-text">{errors.pincode}</span>
            )}
          </div>

          {/* ACTIVE FIELD */}
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
                  checked={active}
                  onChange={(e) => {
                    setActive(e.target.checked);
                  }}
                />
              }
            />
          </div>
        </div>
        <ToastContainer />

        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleSaveCompany}
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
      </div>
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

export default NewCompany;
