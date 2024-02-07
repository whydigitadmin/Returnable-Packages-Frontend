import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
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

function AddItemSpecification({ addItemSpecification }) {
  const [id, setId] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    "Select an Asset Category"
  );
  const [assetName, setAssetName] = useState("");
  const [assetCategoryVO, setAssetCategoryVO] = useState([]);
  const [assetCategory, setAssetCategory] = useState("");
  const [length, setLength] = useState();
  const [breath, setBreath] = useState();
  const [height, setHeight] = useState();
  const [dimUnit, setDimUnit] = useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [active, setActive] = React.useState(true);
  const [errors, setErrors] = useState({});
  const [showStandardDropdown, setShowStandardDropdown] = useState(false);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);

  const handleSelectChange = (e) => {
    setAssetCategory(e.target.value);
  };
  const handleUnitChange = (e) => {
    setDimUnit(e.target.value);
  };

  // const handleItem = () => {
  //   addItem(false);
  // };

  useEffect(() => {
    getAllAssetCategory();
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
        // setData(response.data.paramObjectsMap.assetCategoryVO);
        // setTableData(response.data.paramObjectsMap.assetCategoryVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "assetName":
        setAssetName(value);
        break;
      case "id":
        setId(value);
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
      // default:
      //   break;
    }
  };

  const handleAssetCategory = () => {
    const errors = {};
    if (!id) {
      errors.id = "Asset Code is required";
    }
    if (!assetName) {
      errors.assetName = "Asset Name is required";
    }
    if (!length) {
      errors.length = "Length is required";
    }
    if (!breath) {
      errors.breath = "Breath is required";
    }
    if (!height) {
      errors.height = "Height is required";
    }
    if (!dimUnit) {
      errors.dimUnit = "Unit is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        assetCategory,
        assetName,
        length,
        breath,
        height,
        dimUnit,
        orgId,
        id,
        active,
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/master/assetGroup`,
        formData
      )
        .then((response) => {
          console.log("Response:", response.data);
          setAssetName("");
          setLength("");
          setHeight("");
          setBreath("");
          setDimUnit("");
          setId("");
          addItemSpecification(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  const handleCloseAddItemSpecification = () => {
    addItemSpecification(true);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">Asset Specification</h1>
          <IoMdClose
            onClick={handleCloseAddItemSpecification}
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
              onChange={handleSelectChange}
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
          <div className="col-lg-6 col-md-12 mb-2"></div>
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="assetName"
              value={assetName}
              onChange={handleCategoryChange}
            />
            {errors.assetName && (
              <span className="error-text">{errors.assetName}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex"
                }
              >
                Asset Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              // type={"text"}
              // placeholder={
              //   (showStandardDropdown && "STD-") ||
              //   (showVariableDropdown && "CMZ-")
              // }
              name="id"
              value={id}
              onChange={handleCategoryChange}
            />
            {errors.id && <span className="error-text">{errors.id}</span>}
          </div>
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
                name="length"
                value={length}
                placeholder={"L"}
                onChange={handleCategoryChange}
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
                name="breath"
                value={breath}
                placeholder={"B"}
                onChange={handleCategoryChange}
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
                name="height"
                value={height}
                placeholder={"H"}
                onChange={handleCategoryChange}
                className="input mb-2 p-1 input-bordered"
              />
              <select
                style={{ height: 40, fontSize: "0.800rem", width: 56 }}
                className="input mb-2 p-1 input-bordered ms-1"
                value={dimUnit}
                onChange={handleUnitChange}
              >
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="feet">feet</option>
                <option value="meter">meter</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2"></div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              {errors.length && (
                <span className="error-text">{errors.length}</span>
              )}
              {errors.breath && (
                <span className="error-text">{errors.breath}</span>
              )}
              {errors.height && (
                <span className="error-text">{errors.height}</span>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleAssetCategory}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseAddItemSpecification}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddItemSpecification;
