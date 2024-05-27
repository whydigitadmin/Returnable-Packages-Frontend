import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { default as Axios, default as axios } from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  codeFieldValidation,
  stringAndNoAndSpecialCharValidation,
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

function AddWarehouse({ addWarehouse, editWarehouseId }) {
  const [code, setCode] = useState();
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [pincode, setPincode] = useState("");
  const [gst, setGst] = useState("");
  const [active, setActive] = useState(true);
  const [stockBranch, setStockBranch] = useState([]);
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [id, setId] = useState("");

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

  useEffect(() => {
    getStockBranch();
    {
      editWarehouseId && getWarehouse();
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
      console.log("API Response:", response);

      if (response.status === 200) {
        setStateData(response.data.paramObjectsMap.stateVO);
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
      console.log("API Response:", response);

      if (response.status === 200) {
        setCityData(response.data.paramObjectsMap.cityVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStockBranch = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/ActivestockbranchByOrgId?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const branchData = response.data.paramObjectsMap.branch;
        if (Array.isArray(branchData)) {
          setStockBranch(branchData);
        }
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/getWarehouseById/${editWarehouseId}`
      );

      if (response.status === 200) {
        console.log(
          "Edit User Details",
          response.data.paramObjectsMap.warehouse
        );
        setId(response.data.paramObjectsMap.warehouse.warehouseId);
        setLocationName(response.data.paramObjectsMap.warehouse.locationName);
        setUnit(response.data.paramObjectsMap.warehouse.unit);
        setName(response.data.paramObjectsMap.warehouse.warehouseLocation);
        setCode(response.data.paramObjectsMap.warehouse.code);
        setAddress(response.data.paramObjectsMap.warehouse.address);
        setCity(response.data.paramObjectsMap.warehouse.city);
        setState(response.data.paramObjectsMap.warehouse.state);
        setCountry(response.data.paramObjectsMap.warehouse.country);
        setPincode(response.data.paramObjectsMap.warehouse.pincode);
        setGst(response.data.paramObjectsMap.warehouse.gst);
        setStock(response.data.paramObjectsMap.warehouse.stockBranch);
        if (response.data.paramObjectsMap.warehouse.active === "In-Active") {
          setActive(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ALL INPUT FIELD CHANGE EVENTS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "code":
        setCode(value);
        break;
      case "name":
        setName(value);
        break;
      case "unit":
        setUnit(value);
        break;
      case "locationName":
        setLocationName(value);
        break;
      case "address":
        setAddress(value);
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
        setPincode(value);
        break;
      case "gst":
        setGst(value);
        break;
      // default:
      //   break;
    }
  };

  // SAVE WAREHOUSE
  const handleWarehouse = () => {
    const errors = {};
    if (!name) {
      errors.name = "Warehouse Name is required";
    }
    if (!locationName) {
      errors.locationName = "Location Name is required";
    }
    if (!code) {
      errors.code = "Code is required";
    }
    if (!unit) {
      errors.unit = "Unit is required";
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
    if (!address) {
      errors.address = "Address is required";
    }
    if (!pincode) {
      errors.pincode = "Pincode is required";
    }
    if (!stock) {
      errors.stock = "Stock branch is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        code,
        name,
        locationName,
        country,
        state,
        city,
        address,
        pincode,
        gst,
        unit,
        orgId,
        active,
        stockBranch: stock,
        createdBy: userName,
        warehouseId: 0,
      };
      Axios.put(
        `${process.env.REACT_APP_API_URL}/api/warehouse/updateCreateWarehouse`,
        formData
      )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.success("Warehouse created successfully", {
              autoClose: 2000,
              theme: "colored",
            });
            setTimeout(() => {
              addWarehouse(true);
            }, 2000);
          }
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
      setErrors(errors);
    }
  };

  // Update
  const handleUpdateWarehouse = () => {
    const errors = {};
    if (!name) {
      errors.name = "Warehouse Name is required";
    }
    if (!locationName) {
      errors.locationName = "Location Name is required";
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
    if (!address) {
      errors.address = "Address is required";
    }
    if (!pincode) {
      errors.pincode = "Pincode is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        warehouseId: editWarehouseId,
        orgId,
        warehouseLocation: name,
        locationName,
        address,
        state,
        pincode,
        unit,
        code,
        city,
        country,
        gst,
        active,
        createdBy: userName,
        stockBranch: stock,
      };
      Axios.put(
        `${process.env.REACT_APP_API_URL}/api/warehouse/updateCreateWarehouse`,
        formData
      )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
            setTimeout(() => {
              addWarehouse(false);
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error("Warehouse Updation failed", {
            autoClose: 2000,
            theme: "colored",
          });
        });
    } else {
      setErrors(errors);
    }
  };

  // CLOSE BUTTON WITH CONFIRMATION
  const handleCloseWarehouse = () => {
    if (
      locationName ||
      unit ||
      name ||
      code ||
      address ||
      city ||
      state ||
      country ||
      pincode ||
      gst
    ) {
      setOpenConfirmationDialog(true);
    } else {
      setOpenConfirmationDialog(false);
      addWarehouse(false);
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirmationYes = () => {
    setOpenConfirmationDialog(false);
    addWarehouse(false);
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleCloseWarehouse}
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
                Location Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              name="locationName"
              onInput={stringAndNoAndSpecialCharValidation}
              value={locationName}
              onChange={handleInputChange}
            />
            {errors.locationName && (
              <span className="error-text">{errors.locationName}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Unit <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              // placeholder={"Enter"}
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              name="unit"
              value={unit}
              onChange={handleInputChange}
            />
            {errors.unit && <span className="error-text">{errors.unit}</span>}
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
              onInput={codeFieldValidation}
              name="name"
              value={name}
              disabled={editWarehouseId ? true : false}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
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
              name="code"
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              value={code}
              onChange={handleInputChange}
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
              value={pincode}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              maxLength={10}
              onChange={handleInputChange}
            />
            {errors.pincode && (
              <span className="error-text">{errors.pincode}</span>
            )}
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
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Stock Branch <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            >
              <option value="" disabled>
                Select Stock Branch
              </option>
              {Array.isArray(stockBranch) &&
                stockBranch.length > 0 &&
                stockBranch.map((list) => (
                  <option key={list.id} value={list.branchCode}>
                    {list.branchCode}
                  </option>
                ))}
            </select>
            {errors.stock && <span className="error-text">{errors.stock}</span>}
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
                  checked={active}
                  onChange={(e) => {
                    setActive(e.target.checked);
                  }}
                />
              }
            />
          </div>
        </div>
        {editWarehouseId ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleUpdateWarehouse}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
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
              onClick={handleCloseWarehouse}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

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

export default AddWarehouse;
