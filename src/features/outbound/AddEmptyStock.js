import * as React from "react";
import ToolTip from "../../components/Input/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { FaStarOfLife } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

function AddEmptystock({ addEmptystock }) {
  const [docDate, setDocDate] = React.useState(null);
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };
  const handleReturn = () => {
    addEmptystock(false);
  };
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4 ms-5">New Empty Stock</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Date & Time
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                // style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                slotProps={{
                  textField: {
                    size: "small",
                    clearable: true,
                  },
                }}
                value={docDate}
                onChange={(newValue) => setDocDate(newValue)}
              />
            </LocalizationProvider>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6">
              <label className="label mb-4">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Customer
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6">
              <ToolTip
                placeholder={"Select"}
                content={"Storage facility for inventory"}
                updateFormValue={updateFormValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <label className="label mb-4">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Delivery Challan Number
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6">
              <ToolTip
                placeholder={"ES1111"}
                content={""}
                updateFormValue={updateFormValue}
              />
            </div>
          </div>
          <h1 className="text-xl font-semibold my-4 ms-5">Item Details</h1>
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <label className="label label-text label-font-size text-base-content mb-2">
                Product
              </label>
              <select
                name="Select Item"
                style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                className="input mb-4 input-bordered ps-2"
              >
                <option value="">Select</option>
              </select>
            </div>
            <div className="col-lg-4 col-md-4">
              <label className="label label-text label-font-size text-base-content mb-2">
                Quantity
              </label>
              <input
                style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                type={"text"}
                // value={value}
                placeholder={"Enter"}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="col-lg-6 col-md-6 border-dotted border-2 border-black-600 text-center rounded mb-2">
              <button
                type="button"
                class="inline-block w-full px-2 pb-2 pt-2.5 text-xs font-medium leading-normal hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
              >
                + Add Item
              </button>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 mb-3">
                <label className="label label-text label-font-size text-base-content mb-2">
                  Remarks
                </label>
                <textarea
                  style={{ fontSize: "0.800rem" }}
                  className="form-control label"
                  placeholder="Thanks for your Bussiness"
                ></textarea>
              </div>
            </div>
            <div className="d-flex flex-row mt-3">
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEmptystock;
