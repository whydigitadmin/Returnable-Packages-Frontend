import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { FaBox, FaCube, FaCubes, FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ToolTip from "../../components/Input/Tooltip";


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

const names = [
  "Open WareHouse",
  "Bounded WareHouse",
  "Racked Warehouse",
  "Temperature Warehouse",
  "Others",
];


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

function AddItemGroups({ addItem }) {
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("Select Required Asset");
  const [showAdditionalDropdown, setShowAdditionalDropdown] = useState(false);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openCheck, setOpenCheck] = React.useState(false);
  // const [selectedValues, setSelectedValues] = useState([]);
  const [addKit, setAddKit] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [bound, setBound] = React.useState(false);
  const [rack, setRack] = React.useState(false);
  const [temperature, setTemperature] = React.useState(false);
  const [openQty, setOpenQty] = React.useState("");
  const [boundQty, setBoundQty] = React.useState("");
  const [rackQty, setRackQty] = React.useState("");
  const [temperatureQty, setTemperatureQty] = React.useState("");

  const [formValues, setFormValues] = useState({
    kitName: "",
    kitNo: "",
    requiredQuantity: "",
    selectedValue: "Select Required Asset",
    selectedValues: [],
  });

  // Function to update form values in state
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleStandardChange = (e) => {
    const selectedValue = e.target.value;
    // setFormValues({ ...formValues, selectedValue });
    setShowAdditionalDropdown(selectedValue === "Standard");
    // setShowVariableDropdown(selectedValue === "Variable");
  };
  const handleCustomChange = (e) => {
    const selectedValue = e.target.value;
    // setFormValues({ ...formValues, selectedValue });
    // setShowAdditionalDropdown(selectedValue === "Standard");
    setShowVariableDropdown(selectedValue === "Variable");
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Access form values from state
    console.log(formValues);
    setAddKit(true);
    // Perform necessary actions or validations
    // For example: You can pass formValues to addItem or perform other logic here
    // addItem(formValues);
  };

  // const handleChange = (event) => {
  //   setSelectedValues(event.target.value);
  // };

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpenCheck(true);
  };

  const updateInputValue = (val) => {
    setValue(val);
  };

  const handleItem = () => {
    addItem(false);
  };
  const handleChangeChip = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleOpen = () => {
    setOpen(!open);
    if (open === false) {
      setOpenQty("");
    }
  };
  const handleBound = () => {
    setBound(!bound);
    if (bound === false) {
      setBoundQty("");
    }
  };
  const handleRack = () => {
    setRack(!rack);
    if (rack === false) {
      setRackQty("");
    }
  };
  const handleTemperature = () => {
    setTemperature(!temperature);
    if (temperature === false) {
      setTemperatureQty("");
    }
  };
  const handleOpenChange = (event) => {
    setOpenQty(event.target.value);
    if (open === false) {
      setOpenQty("");
    }
  };
  const handleBoundChange = (event) => {
    setBoundQty(event.target.value);
    if (bound === false) {
      setBoundQty("");
    }
  };
  const handleRackChange = (event) => {
    setRackQty(event.target.value);
    if (rack === false) {
      setRackQty("");
    }
  };
  const handleTemperatureChange = (event) => {
    setTemperatureQty(event.target.value);
    if (temperature === false) {
      setTemperatureQty("");
    }
  };
  const handleChange = (event) => {
    const { options } = event.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setFormValues({ ...formValues, selectedValues });
  };

  // const updateFormValue = ({ updateType, value }) => {
  //   setCustomerData({ ...customerData, [updateType]: value });
  //   console.log(updateType);
  // };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4">Create kit</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Kit Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Kit name"}
              content={"Enter a unique identifier or name for the Kit name"}
              value={formValues.kitName}
              onChange={handleFormChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Kit No
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Kit No"}
              content={
                "The unique identifier or code for this item in your system"
              }
              // updateFormValue={updateFormValue}
            />
          </div>
         
          <div className="col-lg-6 col-md-12 mb-2"></div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-2">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                Standard Asset
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            {/* <div className="col-lg-3 col-md-6 mb-2">
              <select
                style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                className="input mb-4 input-bordered ps-2"
                // value={formValues.selectedValue}
                onChange={handleStandardChange}
              >
                <option value="Select Required Asset">
                  Select Required Asset
                </option>
                <option value="Standard">Standard</option>
              </select>
            </div> */}
            
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Quantity"}
              content={""}
              value={formValues.requiredQuantity}
              onChange={handleFormChange}
              // updateFormValue={updateFormValue}
              updateType="firstName"
            />
          </div>
         
              <>
                <div className="col-lg-3 col-md-6 mb-2 ">
                  {/* <FormControl fullWidth>
                    <InputLabel id="select-item-label">Select Item</InputLabel>
                    <Select
                      labelId="select-item-label"
                      id="select-item-label"
                      multiple
                      value={formValues.selectedValues} // Ensure selectedValues is an array of selected values
                      onChange={handleChange}
                      style={{ height: 40, fontSize: "0.800rem" }}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select an item</em>;
                        }
                        return Array.isArray(selected)
                          ? selected.join(", ")
                          : ""; // Ensure selected is an array before using join()
                      }}
                    >
                      {/* ... */}

                      {/* <MenuItem value="">
                        <em>Select an item</em>
                      </MenuItem>
                      <MenuItem value="Pallet">Pallet</MenuItem>
                      <MenuItem value="Lid">Lid</MenuItem>
                      <MenuItem value="Side Wall">Side Wall</MenuItem>
                    </Select>
                  </FormControl> */} 
                    <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input mb-2 input-bordered ps-2"
                  >
                    <option value="Insert">Pallet</option>
                    <option value="PP Box">Lid</option>
                    <option value="Seperate Sheets">Sidewall</option>
                  </select>
                </div>
                {/* <div className="col-lg-3 col-md-6 mb-2 ">
                  <button
                    type="button"
                    style={{ marginTop: 2 }}
                    onClick={handleClickOpen}
                    className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Check Available Quantity
                  </button>
                </div> */}
              </>
          
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-2">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Customize Asset
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            {/* <div className="col-lg-3 col-md-6 mb-2">
              <select
                style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                className="input mb-4 input-bordered ps-2"
                // value={formValues.selectedValue}
                onChange={handleCustomChange}
              >
                <option value="Select Required Asset">
                  Select Required Asset
                </option>
                <option value="Variable">Variable</option>
              </select>
            </div> */}
           
              {/* <>
                <div className="col-lg-3 col-md-6 mb-2">
                  <select
                    name="Select Item"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="input mb-2 input-bordered ps-2"
                  >
                    <option value="Insert">Insert</option>
                    <option value="PP Box">PP Box</option>
                    <option value="Seperate Sheets">Seperate Sheets</option>
                  </select>
                </div>
                {/* <div className="col-lg-3 col-md-6 mb-2 ">
                  <button
                    type="button"
                    style={{ marginTop: 2 }}
                    onClick={handleClickOpen}
                    className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Check Available Quantity
                  </button>
                </div> */}
                     <div className="row">
                    <div className="col-6">
                      <FormControl sx={{ m: 1, width: 300 }} size="small">
                        <InputLabel id="demo-multiple-chip-label">
                          Location Type
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
                              label="Location Type"
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
                          {/* {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))} */}
                          <MenuItem
                            value={"Open WareHouse"}
                            onClick={handleOpen}
                          >
                            Open WareHouse
                          </MenuItem>
                          <MenuItem
                            value={"Bounded WareHouse"}
                            onClick={handleBound}
                          >
                            Bounded WareHouse
                          </MenuItem>
                          <MenuItem
                            value={"Racked WareHouse"}
                            onClick={handleRack}
                          >
                            Racked WareHouse
                          </MenuItem>
                          <MenuItem
                            value={"Temperature WareHouse"}
                            onClick={handleTemperature}
                          >
                            Temperature WareHouse
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div className="col-6">
                      <div className="d-flex flex-wrap">
                        {open && (
                          <div>
                            <FormControl
                              sx={{ m: 1 }}
                              variant="filled"
                              size="small"
                            >
                              <TextField
                                id="Open"
                                label="Open Warehouse Qty"
                                size="small"
                                value={openQty}
                                onChange={handleOpenChange}
                                // error={Boolean(errors.openQty)}
                                required
                              />
                            </FormControl>
                          </div>
                        )}
                        {bound && (
                          <div>
                            <FormControl
                              sx={{ m: 1 }}
                              variant="filled"
                              size="small"
                            >
                              <TextField
                                id="Bound"
                                label="Bound Warehouse Qty"
                                size="small"
                                value={boundQty}
                                onChange={handleBoundChange}
                                // error={Boolean(errors.boundQty)}
                                required
                              />
                            </FormControl>
                          </div>
                        )}
                        {rack && (
                          <div>
                            <FormControl
                              sx={{ m: 1 }}
                              variant="filled"
                              size="small"
                            >
                              <TextField
                                id="Rack"
                                label="Rack Warehouse Qty"
                                size="small"
                                value={rackQty}
                                onChange={handleRackChange}
                                // error={Boolean(errors.rackQty)}
                                required
                              />
                            </FormControl>
                          </div>
                        )}
                        {temperature && (
                          <div>
                            <FormControl
                              sx={{ m: 1 }}
                              variant="filled"
                              size="small"
                            >
                              <TextField
                                id="Temperature"
                                label="Temperature Warehouse Qty"
                                size="small"
                                value={temperatureQty}
                                onChange={handleTemperatureChange}
                                // error={Boolean(errors.temperatureQty)}
                                required
                              />
                            </FormControl>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
           
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleItem}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
        <br></br>
{/* 
        {addKit && <KitSelection />} */}
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openCheck}
        onClose={handleClose}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Check Avalilability</DialogTitle>
          <IoMdClose
            onClick={handleClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText style={{ color: "#333", textAlign: "center" }}>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCube style={{ marginRight: "10px", color: "#4caf50" }} />{" "}
              Available Pallet Count:{" "}
              <span className="ml-2" style={{ color: "green" }}>
                50
              </span>
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaBox style={{ marginRight: "10px", color: "#ff9800" }} />{" "}
              Available Lid Count:{" "}
              <span className="ml-2" style={{ color: "orange" }}>
                10
              </span>
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCubes style={{ marginRight: "10px", color: "#2196f3" }} />{" "}
              Available Sidewall Count:{" "}
              <span className="ml-2" style={{ color: "red" }}>
                0
              </span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", padding: "10px", width: "100%" }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItemGroups;
