import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
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

function AddItem({ addItem }) {
  const [value, setValue] = useState("");
  const [selectedItemCategory, setSelectedItemCategory] = useState("");
  const [lengthValue, setLengthValue] = useState("");
  const [breadthValue, setBreadthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedValue, setSelectedValue] = useState("Select Asset Group");
  const [showStandardDropdown, setShowStandardDropdown] = useState(false);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    // Check if the selected value should show the additional dropdown
    setShowStandardDropdown(e.target.value == "Standard");
    setShowVariableDropdown(e.target.value == "Variable");
  };

  const [formData, setFormData] = useState({
    active: true,
    assetCategory: "",
    brand: "",
    breath: 0,
    costPrice: "",
    dimUnit: "",
    expectedLife: "",
    expectedTrips: "",
    height: 0,
    hsnCode: "",
    id: 0,
    length: 0,
    maintanencePeriod: "",
    manufacturer: "",
    name: "",
    productUnit: "",
    scrapValue: "",
    sellPrice: "",
    sku: "",
    taxRate: "",
    uanUpc: "",
    weight: 0,
    weightUnit: "",
    itemCategory: "",
    // Add more fields as needed...
  });

  const updateFormValue = ({ updateType, value }) => {
    if (updateType === "assetCategory") {
      setFormData({ ...formData, assetCategory: value });
    } else if (updateType === "dimUnit") {
      setFormData({ ...formData, dimUnit: value });
    } else if (updateType === "weightUnit") {
      setSelectedWeight(value); // Update the selected weight state
      setFormData({ ...formData, weightUnit: value }); // Update the weightUnit field in formData
    } else if (updateType === "itemCategory") {
      setSelectedCategory(value); // Update the selected weight state
      setFormData({ ...formData, itemCategory: value });
    } else {
      setFormData({ ...formData, [updateType]: value });
    }
    // console.log(updateType);
  };

  const updateLengthValue = (val) => {
    setLengthValue(val);
  };

  const updateBreadthValue = (val) => {
    setBreadthValue(val);
  };

  const updateHeightValue = (val) => {
    setHeightValue(val);
  };

  const updateInputValue = (val) => {
    setValue(val);
  };

  const handleAssetClose = () => {
    addItem(false);
  };

  const handleAsset = () => {
    const additionalData = {
      // Add your additional fields here
      // For example:
      breath: breadthValue,
      height: heightValue,
      length: lengthValue,
      // ...
    };

    const updatedFormData = { ...formData, ...additionalData };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/master/asset`,
        updatedFormData
      )
      .then((response) => {
        console.log("Response:", response.data);

        addItem(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-3">Create Asset</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Asset Group
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-2 input-bordered ps-2"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              <option value="">Select Asset Group</option>
              <option value="Standard">Standard</option>
              <option value="Variable">Variable</option>
              <option value="Semi Standard">Semi Standard</option>
              <option value="Semi Variable">Semi Variable</option>
            </select>
          </div>
          {showStandardDropdown && (
            <>
              <div className="col-lg-3 col-md-6 mb-2">
                <select
                  name="Select Item"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="input mb-2 input-bordered ps-2"
                >
                  <option value="Pallet">Pallet</option>
                  <option value="lid">Lid</option>
                  <option value="Side Wall">Side Wall</option>
                </select>
              </div>
            </>
          )}
          {showVariableDropdown && (
            <>
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
            </>
          )}
        </div>
        <div className="row">
          {/* <div className="col-lg-3 col-md-6 mb-2"></div> */}
          <div className="col-lg-3 col-md-6 mb-2">
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
              updateType="sku"
            />
          </div>
        </div>
        <h1 className="text-xl font-semibold my-2">Asset Details</h1>
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
                value={lengthValue}
                placeholder={"l"}
                onChange={(e) => updateLengthValue(e.target.value)}
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
                value={breadthValue}
                placeholder={"b"}
                onChange={(e) => updateBreadthValue(e.target.value)}
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
                value={heightValue}
                placeholder={"h"}
                onChange={(e) => updateHeightValue(e.target.value)}
                className="input mb-2 p-1 input-bordered"
              />
              <select
                name="dimUnit"
                style={{ height: 40, fontSize: "0.800rem", width: 56 }}
                className="input mb-2 p-1 input-bordered ms-1"
                value={formData.dimUnit} // Set the selected value to the state value
                onChange={(e) =>
                  updateFormValue({
                    updateType: "dimUnit",
                    value: e.target.value,
                  })
                }
              >
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="feet">feet</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Manufacturer
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Select or create Manufacturer"}
              content={"Name of the manufacturer or producer of this  item"}
              updateFormValue={updateFormValue}
              updateType="manufacturer"
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Weight
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 166 }}
                type="text"
                value={formData.weight} // Assuming weight value is stored in formData.weight
                placeholder="Weight"
                onChange={(e) =>
                  updateFormValue({
                    updateType: "weight",
                    value: e.target.value,
                  })
                }
                className="input mb-2 input-bordered"
              />
              <select
                name="weightUnit"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
                value={selectedWeight} // Set the selected value to the state value
                onChange={(e) =>
                  updateFormValue({
                    updateType: "weightUnit",
                    value: e.target.value,
                  })
                }
              >
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="g">g</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
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
              updateType="brand"
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
              updateType="uanUpc"
            />
          </div>
        </div>
        <h1 className="text-xl font-semibold my-2">Asset Information</h1>
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
              updateType="assetCategory"
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
              updateType="expectedLife"
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
              updateType="maintenancePeriod"
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
              updateType="expectedTrips"
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
              updateType="hsnCode"
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
              updateType="taxRate"
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
              updateType="costPrice"
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
              updateType="sellPrice"
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
              updateType="scrapValue"
            />
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleAsset}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleAssetClose}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddItem;
