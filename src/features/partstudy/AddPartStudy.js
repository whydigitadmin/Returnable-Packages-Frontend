import * as React from "react";
import { useState } from "react";
import Axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function AddPartStudy({ addPartStudy }) {
  const [id, setId] = useState();
  const [partStudyNo, setPartStudyNo] = useState();
  const [partStudyDate, setPartStudyDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [emitterId, setEmitterId] = useState();
  const [receiverId, setReceiverId] = useState();
  const [partName, setPartName] = useState();
  const [partNumber, setPartNumber] = useState();
  const [weight, setWeight] = useState();
  const [weightUnit, setWeightUnit] = useState();
  const [partValue, setPartValue] = useState();
  const [highestValue, setHighestValue] = useState();
  const [lowestValue, setLowestValue] = useState();
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});

  const handlePartChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "partStudyNo":
        setPartStudyNo(value);
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
      case "partValue":
        setPartValue(value);
        break;
      case "highestValue":
        setHighestValue(value);
        break;
      case "lowestValue":
        setLowestValue(value);
        break;
    }
  };

  const handleCloseAddPartStudy = () => {
    addPartStudy(false);
  };

  const handleWeightChange = (e) => {
    setWeightUnit(e.target.value);
  };

  const handleValueChange = (newValue) => {
    setPartStudyDate(newValue);
  };

  const handlePartStudy = () => {
    const errors = {};
    if (!partStudyNo) {
      errors.partStudyNo = "Part Study Number is required";
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
    if (!partValue) {
      errors.partValue = "Part Volume is required";
    }
    if (!highestValue) {
      errors.highestValue = "Highest Volume is required";
    }
    if (!lowestValue) {
      errors.lowestValue = "Lowest Volume is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        id,
        partStudyNo,
        partStudyDate: partStudyDate.startDate,
        emitterId,
        receiverId,
        partName,
        partNumber,
        weight,
        weightUnit,
        partValue,
        highestValue,
        lowestValue,
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
          <h1 className="text-xl font-semibold mb-4 ms-4">
            Basic Part Details & Geography
          </h1>
          <IoMdClose
            onClick={handleCloseAddPartStudy}
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
                Part Study ID
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="partStudyNo"
              value={partStudyNo}
              onChange={handlePartChange}
            />
            {errors.partStudyNo && (
              <span className="error-text">{errors.partStudyNo}</span>
            )}
          </div>
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="emitterId"
              value={emitterId}
              onChange={handlePartChange}
            />
            {errors.emitterId && (
              <span className="error-text">{errors.emitterId}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Receiver ID
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="receiverId"
              value={receiverId}
              onChange={handlePartChange}
            />
            {errors.receiverId && (
              <span className="error-text">{errors.receiverId}</span>
            )}
          </div>
        </div>
        <h1 className="text-xl font-semibold my-2">Part Basic Details</h1>
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
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
                value={weightUnit}
                onChange={handleWeightChange}
              >
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="g">gm</option>
              </select>
            </div>
            {errors.weight && (
              <span className="error-text">{errors.weight}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex "
                }
              >
                Part Volume
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="partValue"
              value={partValue}
              onChange={handlePartChange}
            />
            {errors.partValue && (
              <span className="error-text">{errors.partValue}</span>
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
              name="highestValue"
              value={highestValue}
              onChange={handlePartChange}
            />
            {errors.highestValue && (
              <span className="error-text">{errors.highestValue}</span>
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
              name="lowestValue"
              value={lowestValue}
              onChange={handlePartChange}
            />
            {errors.lowestValue && (
              <span className="error-text">{errors.lowestValue}</span>
            )}
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handlePartStudy}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseAddPartStudy}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPartStudy;
