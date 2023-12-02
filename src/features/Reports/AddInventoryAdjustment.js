import * as React from "react";
import ToolTip from "../../components/Input/Tooltip";
import { FaStarOfLife } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function AddInventoryAdjustments({ addInventoryAdjustments }) {
  const [docDate, setDocDate] = React.useState(null);
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const handleAdjustment = () => {
    addInventoryAdjustments(false);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-4">New Inventory Adjustment</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Warehouse:
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
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Reference No:
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Reference No"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Date:
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                slotProps={{
                  textField: {
                    size: "small",
                    clearable: true,
                    fontSize: "0.800rem",
                  },
                }}
                value={docDate}
                onChange={(newValue) => setDocDate(newValue)}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Remarks:
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Remarks"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
        </div>
        <h1 className="text-xl font-semibold my-4">Product Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content mb-2">
              Product
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Select"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Quantity Available
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              disabled
              // value={value}
              placeholder={"Quantity Available"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              New Qty. in hand
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"New Qty. in hand"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Quantity Adjusted
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              disabled
              // value={value}
              placeholder={"Quantity Adjusted"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Reason
            </label>
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
              <option value="">Stocktaking Results</option>
              <option value="">Stock on Fire</option>
              <option value="">Stolen Goods</option>
              <option value="">Damaged Goods</option>
              <option value="">Stock Written Off</option>
              <option value="">Inventory Revaluation</option>
              <option value="">Proof wasn't Submitted</option>
              <option value="">Invalid Proof</option>
              <option value="">PV Audit</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 border-dotted border-2 border-black-600 text-center rounded mb-2">
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
            onClick={handleAdjustment}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddInventoryAdjustments;
