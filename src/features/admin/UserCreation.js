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
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
const warehouseOptions = ["Chennai", "Bangalore"];

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
    // orgId: localStorage.getItem("orgId"),
    userName: localStorage.getItem("userName"),
  });

  const [warehouse, setWarehouse] = React.useState([]);

  const [errors, setErrors] = useState({});
  const [openShippingModal, setOpenShippingModal] = React.useState(false);

  const [warehouseLocationVO, setWarehouseLocationVO] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleShippingClickOpen = () => {
    setOpenShippingModal(true);
  };
  const handleShippingClickClose = () => {
    setOpenShippingModal(false);
  };

  useEffect(() => {
    getWarehouseLocationList();
    fetchData(); // Fetch data when the component mounts
  }, [orgId]);

  const getWarehouseLocationList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/getWarehouseLocationByOrgID?orgId=${orgId}`
      );

      if (response.status === 200) {
        setWarehouseLocationVO(response.data.paramObjectsMap.WarehouseLocation);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLocationChange = (location, isChecked) => {
    if (isChecked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    }
  };

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

  const handleChangeChip = (event) => {
    const {
      target: { value },
    } = event;
    setWarehouse(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
    if (!userData.warehouse) {
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
    const hashedPassword = encryptPassword(userData.password);

    // Update userData with the hashed password

    const userPayload = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName || "", // You may need to provide a default value
      orgId: userData.orgId, // You may need to provide a default value
      role: userData.role,
      warehouse: userData.warehouse,
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
            role: "ROLE_USER",
            orgId: "",
            userName: "",
            warehouse: "",
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
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        {/* <ToastContainer /> */}
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">User Details</h1>
          <IoMdClose onClick={""} className="cursor-pointer w-8 h-8 mb-3" />
        </div>
        <div className="row">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
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
            <div className="col-lg-3 col-md-6 mb-4 ml-2">
              <button
                type="button"
                onClick={handleShippingClickOpen}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Assign Warehouse
              </button>
            </div>
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
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex"
                }
              >
                Warehouse Location
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="demo-multiple-chip-label">
                Warehouse Location
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip-label"
                multiple
                value={warehouse}
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
                <MenuItem value={"Chennai"}>Chennai</MenuItem>
                <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
                <MenuItem value={"Dubai"}>Dubai</MenuItem>
                <MenuItem value={"Delhi"}>Delhi</MenuItem>
              </Select>
            </FormControl>
          </div> */}
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
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openShippingModal}
        onClose={handleShippingClickClose}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Assigned Warehouse</DialogTitle>
          <IoMdClose
            onClick={handleShippingClickClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText className="d-flex flex-column">
            {/* Checkbox */}
            {/* <div className="row mb-3">
              <div className="col-lg-12 col-md-12">
                <label className="label">
                  <span
                    className={"label-text label-font-size text-base-content"}
                  >
                    Warehouse Locations
                  </span>
                </label>
              </div>
            </div> */}
            <div className="row mb-3">
              <div className="col-lg-12 col-md-12">
                {warehouseLocationVO.map((location) => (
                  <div className="form-check" key={location.warehouseId}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`location_${location.warehouseId}`}
                      value={location.warehouseLocation}
                      checked={selectedLocations.includes(
                        location.warehouseLocation
                      )}
                      onChange={(e) =>
                        handleLocationChange(
                          location.warehouseLocation,
                          e.target.checked
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`location_${location.warehouseId}`}
                    >
                      {location.warehouseLocation}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button onClick={handleShippingClickClose}>Cancel</Button>
          <Button variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserCreation;
