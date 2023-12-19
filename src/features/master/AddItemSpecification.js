import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaStarOfLife } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import ToolTip from "../../components/Input/Tooltip";

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

function AddItemSpecification({ addItemSpecification }) {
  const [value, setValue] = useState("");
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const updateInputValue = (val) => {
    setValue(val);
  };

  // const handleItem = () => {
  //   addItem(false);
  // };

  const handleCloseAddItemSpecification = () => {
    addItemSpecification(false);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-3">
          Create Asset Specification
        </h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex"
                }
              >
                Asset Category
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <select
              name="inch"
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="Standard">Standard</option>
              <option value="Customized">Customized</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex"
                }
              >
                Asset Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Asset Name"}
              content={"Enter a unique identifier or name for the asset"}
              updateFormValue={updateFormValue}
            />
          </div>
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                SKU No
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"SKU No"}
              content={
                "The unique identifier or code for this item in your system"
              }
              updateFormValue={updateFormValue}
            />
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                UoM
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"UoM"}
              content={
                "Specify the unit of measurement for this product (e.g., pieces, kilograms)"
              }
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 d-flex flex-row">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
            <div
              className="my-tooltip-element mt-3"
              data-tooltip-html={
                "Indicate whether this item is currently active and available for use"
              }
            >
              <CiCircleInfo style={{ fontSize: "17px", marginTop: "4px" }} />
            </div>
            <Tooltip
              anchorSelect=".my-tooltip-element"
              className="tooltip-element"
              delayHide={true}
              delayShow={true}
              style={{ wordBreak: "break-all" }}
            />
          </div>
        </div>
        <h1 className="text-xl font-semibold my-2">Item Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Dimensions
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-8 mb-2">
            <div className="d-flex flex-row">
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 30 }}
                type={"text"}
                value={value}
                placeholder={"L"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 input-bordered p-1"
              />
              <span>
                <input
                  placeholder="X"
                  disabled
                  className="input mb-2 input-bordered disabled-input mx-1"
                />
              </span>
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 30 }}
                type={"text"}
                value={value}
                placeholder={"B"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-1 input-bordered"
              />
              <span>
                <input
                  placeholder="X"
                  disabled
                  className="input mb-2 input-bordered disabled-input mx-1"
                />
              </span>
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 30 }}
                type={"text"}
                value={value}
                placeholder={"H"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-1 input-bordered"
              />
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 56 }}
                className="input mb-2 p-1 input-bordered ms-1"
              >
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="feet">feet</option>
                <option value="meter">meter</option>
              </select>
            </div>
          </div>
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Manufacturer
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              name="inch"
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="Manufacturer">Manufacturer 1</option>
              <option value="Manufacturer">Manufacturer 2</option>
              <option value="Manufacturer">Manufacturer 3</option>
              <option value="Manufacturer">Manufacturer 4</option>
            </select>
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                G.Weight
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 166 }}
                type={"text"}
                value={value}
                placeholder={"Weight"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 input-bordered"
              />
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
              >
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="grams">grams</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Chargable Weight
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 166 }}
                type={"text"}
                value={value}
                placeholder={"Weight"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 input-bordered"
              />
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
              >
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="grams">grams</option>
              </select>
            </div>
          </div>
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Brand
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Select or create Brand"}
              content={"Specify the brand associated with this item"}
              updateFormValue={updateFormValue}
            />
          </div> */}
        </div>
        <h1 className="text-xl font-semibold my-2">Asset Information</h1>
        <div className="row">
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Asset Category
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Select or create Asset Category"}
              content={
                "Assign this  item to a specific category or group for organizational purposes"
              }
              updateFormValue={updateFormValue}
            />
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Expected Life (Months)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Expected Life"}
              content={"Item anticipated lifespan"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Maintenance Interval (Days)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Maintenance Period"}
              content={"Specifies the timeframe for planned maintenance"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Expected Transactions
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Expected Trips"}
              content={"Anticipated number of item movements"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content "}>EAN/UPC</span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"EAN/UPC"}
              content={"Enter the UPC code if applicable for this item"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                HSN Code
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"HSN Code"}
              content={"Enter the HSN code if applicable for this item"}
              updateFormValue={updateFormValue}
            />
          </div>
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Tax Rate
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Select or create Tax Rate"}
              content={"Set the applicable tax rate for this item"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Cost Price
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Cost Price"}
              content={"Enter the cost price or acquisition cost of this item"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Sell Price
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Sell Price"}
              content={"Specify the selling price of this item"}
              updateFormValue={updateFormValue}
            />
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Scrap Value (%)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Scrap Value"}
              content={"Estimated end-of-life item worth"}
              updateFormValue={updateFormValue}
            />
          </div>
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
            onClick={handleCloseAddItemSpecification}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddItemSpecification;
