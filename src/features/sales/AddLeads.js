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

function AddLeads({ addLeads }) {
  const [docDate, setDocDate] = React.useState(null);
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };
  const handleLeads = () => {
    addLeads(false);
  };
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4 ms-5">Lead Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Lead Number
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Lead Owner
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Company Name
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Lead Source
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Email
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Industry
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Enter</option>
              <option value="">Automative</option>
              <option value="">F.M.C.G</option>
              <option value="">Pharmaceuticals</option>
              <option value="">Ecommerce</option>
              <option value="">Others</option>
            </select>
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
                Company Address
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Most Recent Visit
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                State
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Region
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Enter</option>
              <option value="">East</option>
              <option value="">West</option>
              <option value="">North</option>
              <option value="">South</option>
              <option value="">Central</option>
            </select>
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Pipeline Status
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
        </div>
        <h1 className="text-xl font-semibold my-4 ms-5">
          Contact Person Details
        </h1>
        <div className="row">
          <div className="col-lg-2 col-md-3">
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
          <div className="col-lg-2 col-md-3">
            <label className="label label-text label-font-size text-base-content mb-2">
              Phone
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
          <div className="col-lg-2 col-md-3">
            <label className="label label-text label-font-size text-base-content mb-2">
              Designation
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
          <div className="col-lg-2 col-md-3">
            <label className="label label-text label-font-size text-base-content mb-2">
              Email
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
          <div className="row">
            <div className="col-lg-10 col-md-10 border-dotted border-2 border-black-600 text-center rounded mb-2 mt-3">
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
                onClick={handleLeads}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLeads;
