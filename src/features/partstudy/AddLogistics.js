import * as React from "react";
import ToolTip from "../../components/Input/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { styled } from "@mui/material/styles";

function AddLogistics({ addlogistics }) {
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const handleLogistics = () => {
    addlogistics(false);
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-4 ms-4">Logistics</h1>
          <IoMdClose
            onClick={handleLogistics}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Avg Lot Size:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={""}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Dispatch Frequency:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <ToolTip
              placeholder={"Enter"}
              content={""}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Dispatch To:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-4 w-full input-bordered ps-2"
            >
              <option value="">Direct</option>
              <option value="">End-user Warehouse</option>
              <option value="">Emitter Interim Warehouse</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Transportation To:
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-4 w-full input-bordered ps-2"
            >
              <option value="">Part Load</option>
              <option value="">Full Truck Load</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-row mt-1">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleLogistics}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddLogistics;
