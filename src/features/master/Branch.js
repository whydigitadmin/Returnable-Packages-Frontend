import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  codeFieldValidation,
  stringValidation,
} from "../../utils/userInputValidation";

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

function Branch({ addBranch, editWarehouse }) {
  const [branch, setBranch] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [errors, setErrors] = useState({});
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [gst, setGst] = useState("");
  const [pan, setPan] = useState("");
  const [active, setActive] = useState(true);
  const [currency, setCurrency] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [id, setId] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "branch":
        setBranch(value);
        break;
      case "branchCode":
        setBranchCode(value);
        break;
      case "address1":
        setAddress1(value);
        break;
      case "address2":
        setAddress2(value);
        break;

      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "pincode":
        setPinCode(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "gst":
        setGst(value);
        break;
      case "pan":
        setPan(value);
        break;
      case "currency":
        setCurrency(value);
        break;
      // default:
      //   break;
    }
  };

  useEffect(() => {
    {
      editWarehouse && getBranch();
    }
    getCountryData();
  }, []);

  useEffect(() => {
    getStateData();
    getCityData();
  }, [country, state]);

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
        `${process.env.REACT_APP_API_URL}/api/basicMaster/state/Country?country=${country}&orgId=${orgId}`
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
        `${process.env.REACT_APP_API_URL}/api/basicMaster/city/getByStateAndCountry?country=${country}&orgId=${orgId}&state=${state}`
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

  const getBranch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/getBranchById?id=${editWarehouse}`
      );

      if (response.status === 200) {
        // setUserData(response.data.paramObjectsMap.userVO);

        setId(response.data.paramObjectsMap.branchVO.Id);
        setBranch(response.data.paramObjectsMap.branchVO.branchName);
        setBranchCode(response.data.paramObjectsMap.branchVO.branchCode);
        setAddress1(response.data.paramObjectsMap.branchVO.address1);
        setAddress2(response.data.paramObjectsMap.branchVO.address2);
        setCity(response.data.paramObjectsMap.branchVO.city);
        setState(response.data.paramObjectsMap.branchVO.state);
        setCountry(response.data.paramObjectsMap.branchVO.country);
        setPinCode(response.data.paramObjectsMap.branchVO.pinCode);
        setGst(response.data.paramObjectsMap.branchVO.gst);
        setPhone(response.data.paramObjectsMap.branchVO.phone);
        setCurrency(response.data.paramObjectsMap.branchVO.currency);
        setPan(response.data.paramObjectsMap.branchVO.pan);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseBranch = () => {
    if (
      branch ||
      branchCode ||
      address1 ||
      address2 ||
      city ||
      state ||
      country ||
      pinCode ||
      phone ||
      pan ||
      currency ||
      gst
    ) {
      setOpenConfirmationDialog(true);
    } else {
      setOpenConfirmationDialog(false);
      addBranch(false);
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirmationYes = () => {
    setOpenConfirmationDialog(false);
    addBranch(false);
  };

  const handleWarehouse = () => {
    const errors = {};
    if (!branch) {
      errors.branch = "Branch is required";
    }
    if (!branchCode) {
      errors.branchCode = "Branch Code is required";
    }
    if (!address1) {
      errors.address1 = "Address1 is required";
    }
    if (!address2) {
      errors.address2 = "Address2 is required";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!pinCode) {
      errors.pinCode = "Pincode is required";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        branchName: branch,
        branchCode,
        country,
        state,
        city,
        address1,
        address2,
        pinCode,
        phone,
        gst,
        currency,
        orgId,
        active,
        pan,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/company/branch`, formData)
        .then((response) => {
          toast.success("Branch Created successfully", {
            autoClose: 2000,
            theme: "colored",
          });
          setTimeout(() => {
            addBranch(true);
          }, 2000); // Adjust the delay time as needed
        })
        .catch((error) => {
          toast.error("Warehouse Creation failed", {
            autoClose: 2000,
            theme: "colored",
          });
          // Handle error response
          if (error.response) {
            console.log("Response status:", error.response.status);
            console.log("Response data:", error.response.data);
          }
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  //update
  const handleWarehouseUpdate = () => {
    const errors = {};
    if (!branch) {
      errors.branch = "Branch is required";
    }
    if (!branchCode) {
      errors.branchCode = "Branch Code is required";
    }
    if (!address1) {
      errors.address1 = "Address1 is required";
    }
    if (!address2) {
      errors.address2 = "Address2 is required";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!pinCode) {
      errors.pinCode = "Pincode is required";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        branchName: branch,
        branchCode: branchCode,
        id: editWarehouse,
        country,
        state,
        city,
        address1,
        address2,
        pinCode,
        phone,
        gst,
        currency,
        orgId,
        active,
        pan,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/company/branch`, formData)
        .then((response) => {
          toast.success("Branch Created successfully", {
            autoClose: 2000,
            theme: "colored",
          });
          setTimeout(() => {
            addBranch(true);
          }, 2000); // Adjust the delay time as needed
        })
        .catch((error) => {
          toast.error("Warehouse Creation failed", {
            autoClose: 2000,
            theme: "colored",
          });
          // Handle error response
          if (error.response) {
            console.log("Response status:", error.response.status);
            console.log("Response data:", error.response.data);
          }
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
      <div>
        <ToastContainer />
      </div>
      <div className="d-flex justify-content-between">
        <h1 className="text-xl font-semibold mb-4 ms-4"></h1>
        <IoMdClose
          onClick={handleCloseBranch}
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
              Branch
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            // placeholder={"Enter"}
            name="branch"
            onInput={stringValidation}
            value={branch}
            onChange={handleInputChange}
          />
          {errors.branch && <span className="error-text">{errors.branch}</span>}
        </div>

        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Code
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            // placeholder={"Enter"}
            name="branchCode"
            onInput={codeFieldValidation}
            value={branchCode}
            onChange={handleInputChange}
          />
          {errors.branchCode && (
            <span className="error-text">{errors.branchCode}</span>
          )}
        </div>

        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Address 1
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            // placeholder={"Enter"}
            name="address1"
            onInput={(e) => {
              e.target.value = e.target.value
                .toUpperCase()
                .replace(/[^A-Z\s]/g, "");
            }}
            value={address1}
            onChange={handleInputChange}
          />
          {errors.address1 && (
            <span className="error-text">{errors.address1}</span>
          )}
        </div>

        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Address 2
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            // placeholder={"Enter"}
            name="address2"
            onInput={(e) => {
              e.target.value = e.target.value
                .toUpperCase()
                .replace(/[^A-Z\s]/g, "");
            }}
            value={address2}
            onChange={handleInputChange}
          />
          {errors.address2 && (
            <span className="error-text">{errors.address2}</span>
          )}
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
          <select
            className="form-select form-sz w-full mb-2"
            onChange={handleInputChange}
            value={country}
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
              State
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <select
            className="form-select form-sz w-full mb-2"
            onChange={handleInputChange}
            value={state}
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
          {errors.state && <span className="error-text">{errors.state}</span>}
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
          <select
            className="form-select form-sz w-full mb-2"
            onChange={handleInputChange}
            value={city}
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
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            maxLength={10}
            value={pinCode}
            onChange={handleInputChange}
          />
          {errors.pinCode && (
            <span className="error-text">{errors.pinCode}</span>
          )}
        </div>

        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Phone
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
            maxLength={10}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            value={phone}
            onChange={handleInputChange}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span className={"label-text label-font-size text-base-content"}>
              GST
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            // placeholder={"Enter"}
            name="gst"
            value={gst}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
            onChange={handleInputChange}
          />
          {errors.gst && <span className="error-text">{errors.gst}</span>}
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span className={"label-text label-font-size text-base-content"}>
              PAN
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            // placeholder={"Enter"}
            name="pan"
            value={pan}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
            onChange={handleInputChange}
          />
          {errors.pan && <span className="error-text">{errors.pan}</span>}
        </div>

        <div className="col-lg-3 col-md-6 mb-2">
          <label className="label">
            <span className={"label-text label-font-size text-base-content"}>
              Currency
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-2">
          <input
            className="form-control form-sz mb-2"
            type={"text"}
            // placeholder={"Enter"}
            name="currency"
            value={currency}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
            onChange={handleInputChange}
          />
          {errors.currency && (
            <span className="error-text">{errors.currency}</span>
          )}
        </div>
        {editWarehouse ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleWarehouseUpdate}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              update
            </button>
          </div>
        ) : (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleWarehouse}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCloseBranch}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        )}
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
    </div>
  );
}

export default Branch;
