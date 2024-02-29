import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function AddPartStudy({ addPartStudy, handleBack, handleNext }) {
  const [id, setId] = useState();
  const [partStudyId, setPartStudyId] = useState();
  const [showPartStudyId, setShowPartStudyId] = useState(false);
  const [selectPartStudy, setSelectPartStudy] = useState();
  const [receiverCustomersVO, setReceiverCustomersVO] = useState([]);
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [partStudyDate, setPartStudyDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [emitterId, setEmitterId] = useState();
  const [receiverId, setReceiverId] = useState();
  const [partName, setPartName] = useState();
  const [partNumber, setPartNumber] = useState();
  const [weight, setWeight] = useState();
  const [weightUnit, setWeightUnit] = useState("");
  const [partVolume, setPartVolume] = useState();
  const [highestVolume, setHighestVolume] = useState();
  const [lowestVolume, setLowestVolume] = useState();
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});

  const handlePartChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "partStudyId":
        setPartStudyId(value);
        break;
      case "partStudyDate":
        setPartStudyDate(value);
        break;
      case "emitterId":
        setEmitterId(value);
        break;
      case "receiverId":
        setReceiverId(value);
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
      case "weightUnit":
        setWeightUnit(value);
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
    addPartStudy(false);
  };
  const handleBackPartStudy = () => {
    window.location.reload();
  };

  const handleWeightChange = (e) => {
    setWeightUnit(e.target.value);
  };

  const handleValueChange = (newValue) => {
    setPartStudyDate(newValue);
  };

  const handleEmitterChange = (event) => {
    setEmitterId(event.target.value);
  };
  const handleReceiverChange = (event) => {
    setReceiverId(event.target.value);
  };
  useEffect(() => {
    getCustomersList();
  }, []);

  const getCustomersList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getCustomersList?orgId=${orgId}`
      );

      if (response.status === 200) {
        setReceiverCustomersVO(
          response.data.paramObjectsMap.customersVO.receiverCustomersVO
        );
        setEmitterCustomersVO(
          response.data.paramObjectsMap.customersVO.emitterCustomersVO
        );
        console.log(
          "Emitter",
          response.data.paramObjectsMap.customersVO.emitterCustomersVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePartStudy = () => {
    const errors = {};
    if (!partStudyId) {
      errors.partStudyId = "Part Study Number is required";
    }
    if (!partStudyDate.startDate) {
      errors.partStudyDate = "Part Study Date is required";
    }
    if (!emitterId) {
      errors.emitterId = "Emitter Id is required";
    }
    if (!receiverId) {
      errors.receiverId = "Receiver Id is required";
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
    if (!weightUnit) {
      errors.weightUnit = "Weight Unit is required";
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
        id,
        partStudyId,
        partStudyDate: partStudyDate.startDate,
        emitterId,
        receiverId,
        partName,
        partNumber,
        weight,
        weightUnit,
        partVolume,
        highestVolume,
        lowestVolume,
        orgId,
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/partStudy/basicDetails`,
        formData
      )
        .then((response) => {
          console.log("Response:", response.data);
          addPartStudy(false);
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
          {/* <h1 className="text-xl font-semibold mb-4">
            Basic Part Details & Geography
          </h1> */}
          <h1 className="text-xl font-semibold mb-2">Basic Details</h1>
          {/* <IoMdClose
            onClick={handleCloseAddPartStudy}
            className="cursor-pointer w-8 h-8 mb-3"
          /> */}
          {/* <h1 className="text-xl font-semibold my-2">Basic Details</h1> */}
        </div>
        <div className="row">
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Select Part Study
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 w-full input-bordered ps-2"
              value={selectPartStudy}
              onChange={handleSelectPartChange}
            >
              <option value="">Select an option</option>
              <option value="NewPartStudy">New Part Study</option>
              <option value="ExistingPartStudy">Incomplete Part Study</option>
            </select>
            {errors.partStudyId && (
              <span className="error-text">{errors.partStudyId}</span>
            )}
          </div>
          {showPartStudyId && (
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
                <select
                  style={{ height: 40, fontSize: "0.800rem" }}
                  className="input mb-2 w-full input-bordered ps-2"
                  value={partStudyId}
                  // onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {errors.partStudyId && (
                  <span className="error-text">{errors.partStudyId}</span>
                )}
              </div>
            </>
          )} */}
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
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Emitter ID
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
                Select an Type
              </option>
              {emitterCustomersVO.length > 0 &&
                emitterCustomersVO.map((list) => (
                  <option key={list.id} value={list.displayName}>
                    {list.displayName}
                  </option>
                ))}
            </select>
            {errors.emitterId && (
              <span className="error-text">{errors.emitterId}</span>
            )}
          </div>
        </div>

        {/* <h1 className="text-xl font-semibold my-2">Basic Details</h1> */}
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
              name="partName"
              value={partName}
              onChange={handlePartChange}
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
              name="partNumber"
              value={partNumber}
              onChange={handlePartChange}
            />
            {errors.partNumber && (
              <span className="error-text">{errors.partNumber}</span>
            )}
          </div>
          <h1 className="text-xl font-semibold my-2">Volume Details</h1>
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
                name="weight"
                value={weight}
                onChange={handlePartChange}
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
              name="lowestVolume"
              value={lowestVolume}
              onChange={handlePartChange}
            />
            {errors.lowestVolume && (
              <span className="error-text">{errors.lowestVolume}</span>
            )}
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
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save & Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPartStudy;
