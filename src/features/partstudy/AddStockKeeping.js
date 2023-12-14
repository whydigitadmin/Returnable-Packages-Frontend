import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
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

function AddStockKeeping({ addStockKeeping }) {
  const [formData, setFormData] = useState({
    sno: "",
    emitterStoreDays: "",
    emitterLineDays: "",
    inTransitDays: "",
    endUserLineStorageDays: "",
    endUserManufLineDays: "",
    otherStorageDays: "",
    totCycleTime: "",
    ePakRevDay: "",
    document: null,
    active: true,
  });

  const [formErrors, setFormErrors] = useState({
    sno: "",
    emitterStoreDays: "",
    emitterLineDays: "",
    inTransitDays: "",
    endUserLineStorageDays: "",
    endUserManufLineDays: "",
    otherStorageDays: "",
    totCycleTime: "",
    ePakRevDay: "",
    document: null,
    active: true,
  });

  const [value, setValue] = useState("");
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const updateInputValue = (val) => {
    setValue(val);
  };

  const handleCloseAddStockKeeping = () => {
    addStockKeeping(false);
  };

  const handleStockKeeping = () => {
    const errors = {};
    if (!formData.sno.trim()) {
      errors.sno = "ID is required";
    }
    if (!formData.partStudyId.trim()) {
      errors.partStudyId = "Part Study ID  is required";
    }
    if (!formData.partStudyNo.trim()) {
      errors.partStudyNo = "Part Study No is required";
    }
    if (!formData.partStudyDate.trim()) {
      errors.partStudyDate = "partStudyDate is required";
    }
    if (!formData.emitterId.trim()) {
      errors.emitterId = "emitterId is required";
    }
    if (!formData.receiverID.trim()) {
      errors.receiverID = "receiverID is required";
    }
	if (!formData.partStudyID.trim()) {
      errors.partStudyID = "partStudyID is required";
    }
	if (!formData.partName.trim()) {
      errors.partName = "partName is required";
    }
	if (!formData.partNo.trim()) {
      errors.partNo = "partNo is required";
    }
	if (!formData.weight.trim()) {
      errors.weight = "weight is required";
    }
	if (!formData.partVol.trim()) {
      errors.partVol = "partVol is required";
    }
	if (!formData.highvol.trim()) {
      errors.highvol = "highvol is required";
    }
	if (!formData.lowVol.trim()) {
      errors.lowVol = "lowVol is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
	}

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-3">
        Stock Keeping Days
        </h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                EmitterStoreDays
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Emitter Store Days"}
              content={"Enter the Part Study No"}
              updateFormValue={updateFormValue}
              updateType="emitterStoreDays"
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                EmitterLineDays
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"EmitterLineDays"}
              content={"Enter the Emitter Line Days"}
              updateFormValue={updateFormValue}
              updateType="emitterLineDays"
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                InTransit Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"InTransit Days"}
              content={"Enter the InTransit Days"}
              updateFormValue={updateFormValue}
              updateType="inTransitDays"
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                EndUser Line Storage Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"User Line Storage Days"}
              content={"Enter the EndUser Line Storage Days"}
              updateFormValue={updateFormValue}
              updateType="endUserLineStorageDays"
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                EndUser Manufacturing Line Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"EndUser Manufacturing Line Days"}
              content={"Enter the EndUser Manufacturing Line Days"}
              updateFormValue={updateFormValue}
              updateType="endUserManufLineDays"
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                OtherStorageDays
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Other Storage Days"}
              content={"Enter the Other Storage Days"}
              updateFormValue={updateFormValue}
              updateType="otherStorageDays"
            />
          </div>

          {/* <div className="col-lg-3 col-md-6 mb-2">
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
          </div> */}
        </div>
        <h1 className="text-xl font-semibold my-2">Part Basic Details</h1>
        {/* <div className="row">
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
                placeholder={"l"}
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
                placeholder={"b"}
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
                placeholder={"h"}
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
              </select>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size d-flex text-base-content "
                }
              >
                Total Cycle Time
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Total Cycle Time"}
              content={"Name of the Total Cycle Time"}
              updateFormValue={updateFormValue}
              updateType="totCycleTime"
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex "
                }
              >
                Empty Packaging Reverse Logistics Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Empty Packaging Reverse Logistics Days"}
              content={"Specify the Empty Packaging Reverse Logistics Days"}
              updateFormValue={updateFormValue}
              updateType="ePakRevDay"
            />
          </div>
          
        </div>
        {/* <h1 className="text-xl font-semibold my-2">Asset Information</h1>
         <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
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
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Expected Life (Days)
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
                Maintenance Period (Days)
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
                Expected Trips
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
          <div className="col-lg-3 col-md-6 mb-2">
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
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Scrap Value
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
        </div> */}
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseAddStockKeeping}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddStockKeeping;
