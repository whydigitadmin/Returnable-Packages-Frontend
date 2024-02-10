import * as React from "react";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { default as Axios, default as axios } from "axios";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
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
  const [assetCodeVO, setAssetCodeVO] = useState([]);
  const [assetCategoryVO, setAssetCategoryVO] = useState([]);
  const [assetCategory, setAssetCategory] = useState("");
  const [assetCodeId, setAssetCodeId] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetQty, setAssetQty] = useState("");
  const [brand, setBrand] = useState("");
  const [length, setLength] = useState("");
  const [breath, setBreath] = useState("");
  const [height, setHeight] = useState("");
  const [dimUnit, setDimUnit] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [eanUpc, setEanUpc] = useState("");
  const [expectedLife, setExpectedLife] = useState("");
  const [expectedTrips, setExpectedTrips] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [id, setId] = useState();
  const [maintanencePeriod, setMaintanencePeriod] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [scrapValue, setScrapValue] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [active, setActive] = React.useState(true);
  const [errors, setErrors] = useState({});
  const [selectedValue, setSelectedValue] = useState("Select Asset Group");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItemCategory, setSelectedItemCategory] = useState("");
  const [showStandardDropdown, setShowStandardDropdown] = useState(false);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);
  const [selectedAssetCategoryId, setSelectedAssetCategoryId] = useState("");
  const handleAssetCategoryChange = (event) => {
    setAssetCategory(event.target.value);
    // Call function to fetch asset names based on the selected category
    getAssetNamesByCategory(event.target.value);
  };
  useEffect(() => {
    getAllAssetCategory();
    // getAllAssetGroup();
    // populateAssetDropdowns();
  }, []);

  const getAllAssetCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllAssetCategory`
      );

      if (response.status === 200) {
        const assetCategories = response.data.paramObjectsMap.assetCategoryVO;
        setAssetCategoryVO(assetCategories);
        if (assetCategories.length > 0) {
          setAssetCategory(assetCategories[0].assetCategory);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAssetNamesByCategory = async (category) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAssetGroupByCategoryType`
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        const assetGroupVO = response.data.paramObjectsMap.assetGroupVO;
        // Filter asset names based on the selected category
        const assetNames = assetGroupVO[category];
        setAssetCodeVO(assetNames);
        console.log("assetName", assetNames);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // function populateAssetDropdowns() {
  //   // Step 1: Fetch data from the API endpoint
  //   fetch("http://139.5.189.195:9088/api/master/assetGroup")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Step 2: Parse the response body
  //       const assetGroupVO = data.paramObjectsMap.assetGroupVO;

  //       // Step 3: Create a mapping between assetName and assetCodeId
  //       const assetMap = {};
  //       assetGroupVO.forEach((asset) => {
  //         assetMap[asset.assetName] = asset.assetCodeId;
  //       });

  //       // Step 4: Populate dropdown with assetNames
  //       const dropdown = document.getElementById("assetDropdown");
  //       assetGroupVO.forEach((asset) => {
  //         const option = document.createElement("option");
  //         option.text = asset.assetName;
  //         dropdown.add(option);
  //       });

  //       // Step 5: Implement change event listener on dropdown
  //       dropdown.addEventListener("change", function () {
  //         // Step 6: Update dropdown value with assetCodeId
  //         const selectedAssetName = this.value;
  //         const selectedAssetCodeId = assetMap[selectedAssetName];
  //         document.getElementById("assetCodeIdDropdown").value =
  //           selectedAssetCodeId;
  //       });
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "assetQty":
        setAssetQty(value);
        break;
      case "value":
        setValue(value);
        break;
      case "length":
        setLength(value);
        break;
      case "breath":
        setBreath(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "dimUnit":
        setDimUnit(value);
        break;
      case "costPrice":
        setCostPrice(value);
        break;
      case "eanUpc":
        setEanUpc(value);
        break;
      case "expectedLife":
        setExpectedLife(value);
        break;
      case "expectedTrips":
        setExpectedTrips(value);
        break;
      case "hsnCode":
        setHsnCode(value);
        break;
      case "maintanencePeriod":
        setMaintanencePeriod(value);
        break;
      case "manufacturer":
        setManufacturer(value);
        break;
      case "scrapValue":
        setScrapValue(value);
        break;
      case "sellPrice":
        setSellPrice(value);
        break;
      case "taxRate":
        setTaxRate(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "weightUnit":
        setWeightUnit(value);
        break;
      case "orgId":
        setOrgId(value);
        break;
      // default:
      //   break;
    }
  };

  const handleAsset = () => {
    const errors = {};
    if (!weight) {
      errors.weight = "Weight Name is required";
    }
    if (!taxRate) {
      errors.taxRate = "Tax Rate is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        active,
        assetCategory,
        assetCodeId,
        assetName,
        brand,
        breath,
        costPrice,
        dimUnit,
        eanUpc,
        expectedLife,
        expectedTrips,
        height,
        id,
        length,
        hsnCode,
        maintanencePeriod,
        manufacturer,
        scrapValue,
        sellPrice,
        taxRate,
        weight,
        weightUnit,
        orgId,
      };
      Axios.post(`${process.env.REACT_APP_API_URL}/api/master/asset`, formData)
        .then((response) => {
          console.log("Response:", response.data);
          addItem(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const handleUnitChange = (e) => {
    setDimUnit(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeightUnit(e.target.value);
  };

  const handleManufacturerChange = (e) => {
    setManufacturer(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleAssetClose = () => {
    addItem(false);
  };

  // const handleAssetCodeIdChange = (e) => {
  //   const selectedValue = e.target.value;
  //   const [selectedAssetName, selectedAssetCodeId] = selectedValue.split(",");
  //   setAssetName(selectedAssetName);
  //   setAssetCodeId(selectedAssetCodeId);
  // };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">Create Asset</h1>
          <IoMdClose
            onClick={handleAssetClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>

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
              className="form-select form-sz w-full mb-2"
              onChange={handleAssetCategoryChange}
              value={assetCategory}
            >
              <option value="" disabled>
                Select an Asset Category
              </option>
              {assetCategoryVO.length > 0 &&
                assetCategoryVO.map((list) => (
                  <option key={list.id} value={list.assetCategory}>
                    {list.assetCategory}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Asset Name
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={(e) => setAssetName(e.target.value)}
              value={assetName}
            >
              <option value="" disabled>
                Select an Asset Name
              </option>
              {Object.values(assetCodeVO).map((assets, index) => (
                <optgroup key={index} label={Object.keys(assetCodeVO)[index]}>
                  {assets.map((asset) => (
                    <option key={asset.assetCodeId} value={asset.assetName}>
                      {asset.assetName}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Asset Code :
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full mb-2"
              // onChange={(e) => {
              //   // When an asset name is selected, set the corresponding asset code ID
              //   setAssetCodeId(e.target.value);

              // }}
              value={assetCodeId}
            >
              <option value="" disabled>
                Select an Asset Code
              </option>
              <option value={assetCodeId}>STD-PL-176012</option>
            </select>
          </div>
          {/* {showStandardDropdown && (
            <>
              <div className="col-lg-3 col-md-6 mb-2">
                <select
                  name="Select Item"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="input mb-2 input-bordered ps-2"
                >
                  <option value="">STD-PL-1268</option>
                  <option value="">STD-LD-1025</option>
                  <option value="">STD-SW-1450</option>
                  <option value="">STD-SW-1390</option>
                  <option value="">STD-PL-1150</option>
                  <option value="">STD-LD-1110</option>
                  <option value="">STD-PL-1280</option>
                  <option value="">STD-SW-1370</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <ToolTip
                  placeholder={"Quantity"}
                  content={
                    "The unique identifier or code for this item in your system"
                  }
                  updateFormValue={updateFormValue}
                  updateType="sku"
                />
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
                  <option value="">CMZ-IN-2535</option>
                  <option value="">CMZ-PP-2050</option>
                  <option value="">CMZ-IN-2140</option>
                  <option value="">CMZ-SS-2000</option>
                  <option value="">CMZ-PP-2160</option>
                  <option value="">CMZ-SS-2100</option>
                  <option value="">CMZ-PP-2400</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <ToolTip
                  placeholder={"Quantity"}
                  content={
                    "The unique identifier or code for this item in your system"
                  }
                  updateFormValue={updateFormValue}
                  updateType="sku"
                />
              </div>
            </>
          )} */}
        </div>
        {selectedAssetCategoryId && (
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Asset Code
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6 mb-2 col-sm-8">
              <input
                className="form-control form-sz mb-2"
                type="text"
                readOnly
                disabled
                value={selectedAssetCategoryId}
              />
            </div>
            <div className="col-lg-3 col-md-6 mb-2">
              <label className="label">
                <span
                  className={"label-text label-font-size text-base-content"}
                >
                  Asset Qty :
                </span>
              </label>
            </div>
            <div className="col-lg-3 col-md-6 mb-2">
              <input
                placeholder=""
                className="input mb-2 input-bordered form-sz w-full"
                name="assetQty"
                value={assetQty}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        )}
        <div className="row">
          {/* <div className="col-lg-3 col-md-6 mb-2"></div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Asset/SKU No FROM
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              disabled
              type={"number"}
              placeholder={"100"}
              // name="warehouseCode"
              // value={warehouseCode}
              // onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Asset/SKU No TO
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              disabled
              type={"number"}
              placeholder={"200"}
              // name="warehouseCode"
              // value={warehouseCode}
              // onChange={handleInputChange}
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
                style={{ width: 30 }}
                name="length"
                value={length}
                placeholder={"L"}
                className="input mb-2 input-bordered p-1 form-sz"
                onChange={handleCategoryChange}
              />
              <span>
                <input
                  placeholder="X"
                  disabled
                  className="input mb-2 input-bordered disabled-input mx-1"
                />
              </span>
              <input
                style={{ width: 30 }}
                name="breath"
                value={breath}
                placeholder={"B"}
                className="input mb-2 p-1 input-bordered form-sz"
                onChange={handleCategoryChange}
              />
              <span>
                <input
                  placeholder="X"
                  disabled
                  className="input mb-2 input-bordered disabled-input mx-1"
                />
              </span>
              <input
                style={{ width: 30 }}
                name="height"
                value={height}
                placeholder={"H"}
                className="input mb-2 p-1 input-bordered form-sz"
                onChange={handleCategoryChange}
              />
              <select
                name="dimUnit"
                style={{ width: 56 }}
                className="input mb-2 p-1 form-sz input-bordered ms-1"
                value={dimUnit}
                onChange={handleUnitChange}
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
            <select
              name="manufacturer"
              className="input mb-2 p-1 form-sz input-bordered w-full"
              value={manufacturer}
              onChange={handleManufacturerChange}
            >
              <option value="" disabled>
                Select an Asset Manufacturer
              </option>
              <option value="Manufacturer1">Manufacturer 1</option>
              <option value="Manufacturer2">Manufacturer 2</option>
              <option value="Manufacturer3">Manufacturer 3</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Brand
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              name="Brand"
              className="input mb-2 form-sz input-bordered w-full"
              value={brand}
              onChange={handleBrandChange}
            >
              <option value="" disabled>
                Select an Brand
              </option>
              <option value="Brand1">Brand 1</option>
              <option value="Brand2">Brand 2</option>
              <option value="Brand3">Brand 3</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                G. Weight
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                style={{ width: 166 }}
                placeholder=""
                name="weight"
                className="input mb-2 input-bordered form-sz"
                value={weight}
                onChange={handleCategoryChange}
              />
              <select
                name="weightUnit"
                style={{ width: 60 }}
                className="input mb-2 p-1 input-bordered form-sz ms-1"
                value={weightUnit}
                onChange={handleWeightChange}
              >
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="g">g</option>
              </select>
            </div>
            {errors.weight && (
              <span className="error-text">{errors.weight}</span>
            )}
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
                style={{ width: 166 }}
                value={value}
                name="value"
                placeholder={""}
                onChange={handleCategoryChange}
                className="input mb-2 form-sz input-bordered"
              />
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
              >
                <option value="" disabled>
                  Unit
                </option>
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="grams">grams</option>
              </select>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content "}>EAN/UPC</span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="eanUpc"
              value={eanUpc}
              onChange={handleCategoryChange}
            />
          </div>
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
              updateType="assetCategory"
            />
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Expected Life (Days)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="expectedLife"
              value={expectedLife}
              onChange={handleCategoryChange}
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
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="maintanencePeriod"
              value={maintanencePeriod}
              onChange={handleCategoryChange}
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
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="expectedTrips"
              value={expectedTrips}
              onChange={handleCategoryChange}
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
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="hsnCode"
              value={hsnCode}
              onChange={handleCategoryChange}
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
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="taxRate"
              value={taxRate}
              onChange={handleCategoryChange}
            />
            {errors.taxRate && (
              <span className="error-text">{errors.taxRate}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Cost Price
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="costPrice"
              value={costPrice}
              onChange={handleCategoryChange}
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
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="sellPrice"
              value={sellPrice}
              onChange={handleCategoryChange}
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
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="scrapValue"
              value={scrapValue}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleAsset}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleAssetClose}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddItem;
