import * as React from "react";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
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

function AddExpenses({ addExpenses }) {
  const [docDate, setDocDate] = React.useState(null);
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const handlePurchase = () => {
    addExpenses(false);
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

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4">Expense Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Invoice Date
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
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Invoice Number
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Invoice Number"}
              content={""}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Transport vendor
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Expense Number
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="Select Item"
              disabled
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value=""></option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Amount
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Amount"}
              content={""}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                GST(%)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">0%</option>
              <option value="">5%</option>
              <option value="">12%</option>
              <option value="">18%</option>
              <option value="">28%</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Total Amount
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Total Amount"}
              content={""}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Status
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Approved</option>
              <option value="">Hold</option>
              <option value="">Rejected</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Upload file
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
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
        </div>
        <h1 className="text-xl font-semibold mb-4">Transaction Details</h1>
        <div className="row">
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Transaction Type
            </label>
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Allot</option>
              <option value="">Return</option>
              <option value="">Reloction</option>
              <option value="">PO</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Transaction Number
            </label>
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              First Mile
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              disabled
              // value={value}
              placeholder={"First Mile"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Long Haul
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              disabled
              // value={value}
              placeholder={"Long Haul"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Last Mile
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              disabled
              // value={value}
              placeholder={"Last Mile"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Labour
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Labour"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Others
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Others"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Total Cost
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Total Cost"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
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
        </div>
        <div className="col-lg-6 col-md-6 border-dotted border-2 border-black-600 text-center rounded my-2">
          <button
            type="button"
            class="inline-block w-full px-2 pb-2 pt-2.5 text-xs font-medium leading-normal hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
          >
            + Add Item
          </button>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handlePurchase}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddExpenses;
