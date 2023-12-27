import React, { useState } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import ToolTip from "../../components/Input/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IoMdClose } from "react-icons/io";
import { styled } from "@mui/material/styles";
import { FaStarOfLife } from "react-icons/fa";

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

function AddPackage({ addPackage }) {
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
    warehouse_name: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    gst: "",
    document: null,
    active: true,
  });

  const [formErrors, setFormErrors] = useState({
    warehouse_name: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    gst: "",
    document: null,
    active: true,
  });

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

  const updateFormValue = ({ updateType, value }) => {
    setFormData({ ...formData, [updateType]: value });
    // console.log(updateType);
  };

  const updateInputValue = (val) => {
    setValue(val);
  };

  const handleClosePackage = () => {
    addPackage(false);
  };

  //   const handlePackage = () => {
  //     const errors = {};
  //     if (!formData.warehouse_name.trim()) {
  //       errors.warehouse_name = "Warehouse Name is required";
  //     }
  //     if (!formData.country.trim()) {
  //       errors.country = "Country is required";
  //     }
  //     if (!formData.state.trim()) {
  //       errors.state = "State is required";
  //     }
  //     if (!formData.city.trim()) {
  //       errors.city = "City is required";
  //     }
  //     if (!formData.address.trim()) {
  //       errors.address = "Address is required";
  //     }
  //     if (!formData.pincode.trim()) {
  //       errors.pincode = "Pincode is required";
  //     }
  //     if (Object.keys(errors).length > 0) {
  //       setFormErrors(errors);
  //       return;
  //     }

  //     Axios.post(`${process.env.REACT_APP_API_URL}/api/warehouse/view`, formData)
  //       .then((response) => {
  //         console.log("Response:", response.data);
  //         addWarehouse(true);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-4 ms-4">Package Details</h1>
          <IoMdClose
            onClick={handleClosePackage}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Dimension
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 50 }}
                type={"number"}
                value={value}
                placeholder={"L"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 input-bordered p-1"
              />
              {/* <span>
                <input
                  placeholder="X"
                  disabled
                  className="input mb-2 input-bordered disabled-input mx-1"
                />
              </span> */}
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 50 }}
                type={"number"}
                value={value}
                placeholder={"B"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-1 mx-1 input-bordered"
              />
              {/* <span>
                <input
                  placeholder="X"
                  disabled
                  className="input mb-2 input-bordered disabled-input mx-1"
                />
              </span> */}
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 50 }}
                type={"number"}
                value={value}
                placeholder={"H"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-1 mx-1 input-bordered"
              />
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
              >
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="feet">feet</option>
              </select>
            </div>
            {formErrors.warehouse_name && (
              <div className="error-text">{formErrors.warehouse_name}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Existing Part
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {formErrors.country && (
              <div className="error-text">{formErrors.country}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Current Packaging Study
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Enter"}
              content={""}
              updateFormValue={updateFormValue}
              updateType="address"
            />
            {formErrors.address && (
              <div className="error-text">{formErrors.address}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Current Packaging Challenges
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Enter"}
              content={""}
              updateFormValue={updateFormValue}
              updateType="city"
            />
            {formErrors.city && (
              <div className="error-text">{formErrors.city}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                No of Parts Per Current Packaging
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Enter"}
              content={""}
              updateFormValue={updateFormValue}
              updateType="state"
            />
            {formErrors.state && (
              <div className="error-text">{formErrors.state}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Sensitive
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {formErrors.country && (
              <div className="error-text">{formErrors.country}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Greasy
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {formErrors.pincode && (
              <div className="error-text">{formErrors.pincode}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Part Orientation
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="Horizontal">Horizontal</option>
              <option value="Vertical">Vertical</option>
              <option value="Diagonal">Diagonal</option>
            </select>
            {formErrors.gst && (
              <div className="error-text">{formErrors.gst}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Multi Part In Single Pocket
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Stacking
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Nesting
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 p-1 w-full input-bordered"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Remarks
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Enter"}
              content={""}
              updateFormValue={updateFormValue}
              updateType="address"
            />
            {formErrors.address && (
              <div className="error-text">{formErrors.address}</div>
            )}
          </div>
          <h1 className="text-xl font-semibold mb-4 ms-4">Attachments</h1>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Image
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <Button
              component="label"
              variant="contained"
              className="text-form mb-2"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Existing Packaging Image
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <Button
              component="label"
              variant="contained"
              className="text-form mb-2"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            {formErrors.address && (
              <div className="error-text">{formErrors.address}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Drawing 2D 3D
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Enter"}
              content={""}
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
                Approved Packaging Technical Drawing
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Enter"}
              content={""}
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
                Approved Commercial Contract
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Enter"}
              content={""}
              updateFormValue={updateFormValue}
            />
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            // onClick={handlePackage}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClosePackage}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPackage;
