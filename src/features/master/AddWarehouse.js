import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import React, { useState } from "react";
import { FaCloudUploadAlt, FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function AddWarehouse({ addWarehouse }) {
  const [personName, setPersonName] = React.useState([]);
  const [warehouseCode, setWarehouseCode] = useState();
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [locationName, setLocationName] = useState("");
  const [storageMapping, setStorageMapping] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [gst, setGst] = useState("");
  const [document, setDocument] = useState(null);
  const [locationType, setlocationType] = useState(null);
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState({});

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

  const warehouseOptions = ["Chennai", "Bangalore"];

  const handleChangeChip = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCloseWarehouse = () => {
    addWarehouse(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "warehouseCode":
        setWarehouseCode(value);
        break;
      case "warehouseName":
        setWarehouseName(value);
        break;
      case "warehouseLocation":
        setWarehouseLocation(value);
        break;
      case "locationName":
        setLocationName(value);
        break;
      case "storageMapping":
        setStorageMapping(value);
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

  const handleWarehouse = () => {
    const errors = {};
    if (!warehouseName) {
      errors.warehouseName = "Warehouse Name is required";
    }
    if (!locationName) {
      errors.locationName = "Location Name Name is required";
    }
    if (!warehouseLocation) {
      errors.warehouseLocation = "Warehouse Location Name Name is required";
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
        warehouseCode,
        warehouseName,
        warehouseLocation,
        locationName,
        country,
        state,
        city,
        address,
        pincode,
        gst,
        document,
        locationType,
        storageMapping,
        active,
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/warehouse/view`,
        formData
      )
        .then((response) => {
          console.log("Response:", response.data);
          addWarehouse(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          {/* <h1 className="text-xl font-semibold mb-3">Warehouse Details</h1> */}
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
              placeholder={"Enter"}
              name="locationName"
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
                Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              placeholder={"Enter"}
              name="warehouseName"
              value={warehouseName}
              onChange={handleInputChange}
            />
            {errors.warehouseName && (
              <span className="error-text">{errors.warehouseName}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"number"}
              placeholder={"Enter"}
              name="warehouseCode"
              value={warehouseCode}
              onChange={handleInputChange}
            />
            {errors.warehouseCode && (
              <span className="error-text">{errors.warehouseCode}</span>
            )}
          </div>

          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Warehouse Location
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              name="warehouseLocation"
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-4 w-full input-bordered ps-2"
              value={warehouseLocation}
              onChange={handleInputChange}
            >
              <option value="">Select a warehouse</option>
              {warehouseOptions.map((warehouseLocation) => (
                <option key={warehouseLocation} value={warehouseLocation}>
                  {warehouseLocation}
                </option>
              ))}
            </select>
            {errors.warehouseLocation && (
              <span className="error-text">{errors.warehouseLocation}</span>
            )}
          </div> */}

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Storage Mapping
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              placeholder={"Enter"}
              name="storageMapping"
              value={storageMapping}
              onChange={handleInputChange}
            />
            {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )}
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
              placeholder={"Enter"}
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
              placeholder={"Enter"}
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
              placeholder={"Enter"}
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
              placeholder={"Enter"}
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
              <span className={"label-text label-font-size text-base-content"}>
                GST
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              placeholder={"Enter"}
              name="gst"
              value={gst}
              onChange={handleInputChange}
            />
            {errors.gst && <span className="error-text">{errors.gst}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Document
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <Button
              component="label"
              variant="contained"
              className="text-form"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
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
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex"
                }
              >
                Warehouse Type
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="demo-multiple-chip-label">
                Warehouse Type
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip-label"
                multiple
                value={personName}
                onChange={handleChangeChip}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Warehouse Type"
                  />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value={"Open WareHouse"}>Open WareHouse</MenuItem>
                <MenuItem value={"Bounded WareHouse"}>
                  Bounded WareHouse
                </MenuItem>
                <MenuItem value={"Racked WareHouse"}>Racked WareHouse</MenuItem>
                <MenuItem value={"Temperature WareHouse"}>
                  Temperature WareHouse
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
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
      </div>
    </>
  );
}

export default AddWarehouse;
