import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import AddPackage from "./AddPackage";
import {
  stringValidation,
  stringAndNoValidation,
  stringAndNoAndSpecialCharValidation,
} from "../../utils/userInputValidation";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

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

function AddPartStudy({
  setRefPsId,
  refPsId,
  handleBack,
  handleNext,
  setEmitter,
}) {
  const currentDate = new Date();
  // const [refPsId, setRefPsId] = useState("");
  const [partStudyId, setPartStudyId] = useState();
  const [showPartStudyId, setShowPartStudyId] = useState(false);
  const [selectPartStudy, setSelectPartStudy] = useState();
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [partStudyDate, setPartStudyDate] = useState({
    startDate: currentDate,
    endDate: currentDate,
  });
  const [emitterId, setEmitterId] = useState("");
  const [partName, setPartName] = useState();
  const [partNumber, setPartNumber] = useState();
  const [weight, setWeight] = useState();
  const [weightUnit, setWeightUnit] = useState("kg");
  const [partVolume, setPartVolume] = useState();
  const [highestVolume, setHighestVolume] = useState();
  const [lowestVolume, setLowestVolume] = useState();
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [errors, setErrors] = useState({});
  const [active, setActive] = React.useState(true);

  const handlePartChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      // case "partStudyDate":
      //   setPartStudyDate(value);
      //   break;
      case "emitterId":
        setEmitterId(value);
        break;
      case "partName":
        setPartName(value);
        break;
      case "partNumber":
        setPartNumber(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "partVolume":
        setPartVolume(value);
        break;
      case "highestVolume":
        setHighestVolume(value);
        break;
      case "lowestVolume":
        setLowestVolume(value);
        break;
    }
  };

  const handleSelectPartChange = (event) => {
    setSelectPartStudy(event.target.value);
    if (event.target.value === "ExistingPartStudy") {
      setShowPartStudyId(true);
    } else {
      setShowPartStudyId(false);
    }
  };
  const handleCloseAddPartStudy = () => {
    // addPartStudy(false);
  };
  const handleBackPartStudy = () => {
    window.location.reload();
  };

  const handleValueChange = (newValue) => {
    setPartStudyDate(newValue);
  };

  const handleEmitterChange = (event) => {
    setEmitterId(event.target.value);
  };

  useEffect(() => {
    console.log("THE REF PS ID IS:", refPsId);
    if (refPsId) {
      fetchPartStudyDetails(refPsId);
    }
    getCustomersList();
  }, [refPsId]);

  const fetchPartStudyDetails = async (refPsId) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/basicDetails/${refPsId}`
      );

      if (response.status === 200) {
        console.log("basicDetailVO", response.data);
        const basicDetailVO = response.data.paramObjectsMap.basicDetailVO;
        if (
          response.data.paramObjectsMap.basicDetailVO.active === "In-Active"
        ) {
          setActive(false);
        }
        setPartStudyId(basicDetailVO.refPsId);
        setEmitterId(basicDetailVO.emitterId);
        setPartName(basicDetailVO.partName);
        setPartNumber(basicDetailVO.partNumber);
        setWeight(basicDetailVO.weight);
        setPartVolume(basicDetailVO.partVolume);
        setHighestVolume(basicDetailVO.highestVolume);
        setLowestVolume(basicDetailVO.lowestVolume);
        setPartStudyDate({ startDate: new Date(basicDetailVO.partStudyDate) });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCustomersList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getCustomersList?orgId=${orgId}`
      );
      if (response.status === 200) {
        setEmitterCustomersVO(
          response.data.paramObjectsMap.customersVO.emitterCustomersVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePartStudy = () => {
    const errors = {};
    // if (!partStudyId) {
    //   errors.partStudyId = "Part Study Number is required";
    // }
    // if (!partStudyDate.startDate) {
    //   errors.partStudyDate = "Part Study Date is required";
    // }
    if (!emitterId) {
      errors.emitterId = "Emitter Id is required";
    }
    if (!partName) {
      errors.partName = "Part Name is required";
    }
    if (!partNumber) {
      errors.partNumber = "Part Number is required";
    }
    if (!weight) {
      errors.weight = "Weight is required";
    }
    if (!partVolume) {
      errors.partVolume = "Part Volume is required";
    }
    if (!highestVolume) {
      errors.highestVolume = "Highest Volume is required";
    }
    if (!lowestVolume) {
      errors.lowestVolume = "Lowest Volume is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        // partStudyId,
        emitterId,
        highestVolume,
        lowestVolume,
        orgId,
        partName,
        partNumber,
        partStudyDate: partStudyDate.startDate,
        partVolume,
        // refPsId,
        weight,
        active,
        createdBy: userName,
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/partStudy/basicDetails`,
        formData
      )
        .then((response) => {
          console.log("Response for handlePartStudy called", response.data);
          handleNext();
          setRefPsId(response.data.paramObjectsMap.basicDetailVO.refPsId);
          setEmitter(response.data.paramObjectsMap.basicDetailVO.emitterId);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };
  const handlePartStudyUpdate = () => {
    const errors = {};
    // if (!partStudyId) {
    //   errors.partStudyId = "Part Study Number is required";
    // }
    // if (!partStudyDate.startDate) {
    //   errors.partStudyDate = "Part Study Date is required";
    // }
    if (!emitterId) {
      errors.emitterId = "Emitter Id is required";
    }
    if (!partName) {
      errors.partName = "Part Name is required";
    }
    if (!partNumber) {
      errors.partNumber = "Part Number is required";
    }
    if (!weight) {
      errors.weight = "Weight is required";
    }
    if (!partVolume) {
      errors.partVolume = "Part Volume is required";
    }
    if (!highestVolume) {
      errors.highestVolume = "Highest Volume is required";
    }
    if (!lowestVolume) {
      errors.lowestVolume = "Lowest Volume is required";
    }
    const formData = {
      refPsId: partStudyId,
      emitterId,
      highestVolume,
      lowestVolume,
      orgId,
      partName,
      partNumber,
      partStudyDate: partStudyDate.startDate,
      partVolume,
      // refPsId,
      weight,
      active,
    };
    console.log("THE AKJFDLASVJSNVKJSALF", formData);
    if (Object.keys(errors).length === 0) {
      const formData = {
        refPsId: partStudyId,
        emitterId,
        highestVolume,
        lowestVolume,
        orgId,
        partName,
        partNumber,
        partStudyDate: partStudyDate.startDate,
        partVolume,
        // refPsId,
        createdBy: userName,
        weight,
        active,
      };
      Axios.put(
        `${process.env.REACT_APP_API_URL}/api/partStudy/basicDetails`,
        formData
      )
        .then((response) => {
          console.log("Response: handlePartStudyUpdate called", response.data);
          handleNext();
          setRefPsId(response.data.paramObjectsMap.basicDetailVO.refPsId);
          setEmitter(response.data.paramObjectsMap.basicDetailVO.emitterId);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="partstudy-font">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-2">Basic Details</h1>
          {/* <IoMdClose
            onClick={handleCloseAddPartStudy}
            className="cursor-pointer w-8 h-8 mb-3"
          /> */}
        </div>
        <div className="row">
          {/*
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Study Date
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="select-border">
              <Datepicker
                useRange={false}
                asSingle={true}
                popoverDirection="down"
                value={partStudyDate}
                onChange={handleValueChange}
              />
            </div>
            {errors.partStudyDate && (
              <span className="error-text">{errors.partStudyDate}</span>
            )}
          </div>*/}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Emitter
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleEmitterChange}
              value={emitterId}
            >
              <option value="" disabled>
                Select an Emitter
              </option>
              {emitterCustomersVO.length > 0 &&
                emitterCustomersVO.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.displayName}
                  </option>
                ))}
            </select>
            {errors.emitterId && (
              <span className="error-text">{errors.emitterId}</span>
            )}
          </div>
          {refPsId && (
            <>
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    PS ID
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz mb-2"
                  value={partStudyId}
                  disabled
                />
              </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size d-flex text-base-content "
                }
              >
                Part Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              type="text"
              name="partName"
              value={partName}
              onChange={handlePartChange}
              onInput={stringAndNoAndSpecialCharValidation}
            />
            {errors.partName && (
              <span className="error-text">{errors.partName}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex "
                }
              >
                Part No
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              type="text"
              name="partNumber"
              value={partNumber}
              onChange={handlePartChange}
              onInput={stringAndNoAndSpecialCharValidation}
            />
            {errors.partNumber && (
              <span className="error-text">{errors.partNumber}</span>
            )}
          </div>
          <h1 className="text-xl font-semibold my-2">
            Volume Details{" "}
            <span className="text-sm font-normal">(Per Month)</span>
          </h1>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex "
                }
              >
                Weight
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                className="form-control form-sz mb-2"
                placeholder={""}
                type="number"
                name="weight"
                value={weight}
                onChange={handlePartChange}
                // onInput={stringAndNoValidation}
              />
              {/* <select
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
                value={weightUnit}
                onChange={handleWeightChange}
              >
                <option value="">unit</option>
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="gm">gm</option>
              </select> */}
            </div>
            <div className="d-flex flex-column">
              {errors.weight && (
                <span className="error-text">{errors.weight}</span>
              )}
              {/* {errors.weightUnit && (
                <span className="error-text">{errors.weightUnit}</span>
              )} */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex "
                }
              >
                Average Volume
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              type="number"
              name="partVolume"
              value={partVolume}
              onChange={handlePartChange}
            />
            {errors.partVolume && (
              <span className="error-text">{errors.partVolume}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content d-flex "}>
                Highest Volume
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              type="number"
              name="highestVolume"
              value={highestVolume}
              onChange={handlePartChange}
            />
            {errors.highestVolume && (
              <span className="error-text">{errors.highestVolume}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content d-flex "}>
                Lowest Volume
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              type="number"
              name="lowestVolume"
              value={lowestVolume}
              onChange={handlePartChange}
            />
            {errors.lowestVolume && (
              <span className="error-text">{errors.lowestVolume}</span>
            )}
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
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={active}
                  onChange={(e) => {
                    setActive(e.target.checked);
                  }}
                />
              }
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            onClick={handleBackPartStudy}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Back
          </button>
          {refPsId ? (
            <button
              type="button"
              onClick={handlePartStudyUpdate}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save & Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePartStudy}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save & Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default AddPartStudy;
