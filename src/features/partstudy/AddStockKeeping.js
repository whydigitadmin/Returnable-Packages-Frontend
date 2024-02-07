import axios from "axios";
import React, { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function AddStockKeeping({ addStockKeeping }) {
  const [emitterStoreDays, setEmitterStoreDays] = useState("");
  const [emitterLineDays, setEmitterLineDays] = useState("");
  const [inTransitDays, setInTransitDays] = useState("");
  const [endUserLineStorageDays, setEndUserLineStorageDays] = useState("");
  const [endUserManufacturingLineDays, setEndUserManufacturingLineDays] =
    useState("");
  const [otherStorageDays, setOtherStorageDays] = useState("");
  const [totalCycleTime, setTotalCycleTime] = useState("");
  const [emptyPackagingReverseDays, setEmptyPackagingReverseDays] =
    useState("");
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("test", value);

    switch (name) {
      case "emitterStoreDays":
        setEmitterStoreDays(value);
        break;
      case "emitterLineDays":
        setEmitterLineDays(value);
        break;
      case "inTransitDays": // Added case for Dispatch To
        setInTransitDays(value);
        break;
      case "endUserLineStorageDays": // Added case for Transportation To
        setEndUserLineStorageDays(value);
        break;

      case "endUserManufacturingLineDays": // Added case for Transportation To
        setEndUserManufacturingLineDays(value);
        break;
      case "otherStorageDays": // Added case for Transportation To
        setOtherStorageDays(value);
        break;
      case "totalCycleTime": // Added case for Transportation To
        setTotalCycleTime(value);
        break;
      case "emptyPackagingReverseDays": // Added case for Transportation To
        setEmptyPackagingReverseDays(value);
        break;
      default:
        break;
    }
  };
  const handleCloseAddStockKeeping = () => {
    addStockKeeping(false);
  };

  const handleStock = () => {
    const errors = {};
    console.log("test");
    if (!emitterStoreDays) {
      errors.emitterStoreDays = "Emitter Store Days is required";
    }
    if (!emitterLineDays) {
      errors.emitterLineDays = "Emitter Line Days required";
    }
    if (!inTransitDays) {
      errors.inTransitDays = "InTransitDays is required";
    }
    if (!endUserLineStorageDays) {
      errors.endUserLineStorageDays = "EndUser LineStorage Days is required";
    }
    if (!endUserManufacturingLineDays) {
      errors.endUserManufacturingLineDays =
        "EndUser Manufacturing Line Days  is required";
    }
    if (!otherStorageDays) {
      errors.otherStorageDays = " Other Storage Days is required";
    }

    if (!totalCycleTime) {
      errors.totalCycleTime = "Total Cycle Time is required";
    }
    if (!emptyPackagingReverseDays) {
      errors.emptyPackagingReverseDays =
        "Empty Packaging Reverse Days is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        emitterStoreDays,
        emitterLineDays,
        orgId,
        inTransitDays, // Include Dispatch To in the formData
        endUserLineStorageDays,
        endUserManufacturingLineDays,
        otherStorageDays,
        totalCycleTime,
        emptyPackagingReverseDays,
      };
      console.log("test", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/partStudy/stockDetail`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
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
            Stock Keeping Days
          </h1>
          <IoMdClose
            onClick={handleCloseAddStockKeeping}
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
                Emitter Store Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="emitterStoreDays"
              value={emitterStoreDays}
              onChange={handleInputChange}
            />
            {errors.emitterStoreDays && (
              <span className="error-text">{errors.emitterStoreDays}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Emitter Line Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="emitterLineDays"
              value={emitterLineDays}
              onChange={handleInputChange}
            />
            {errors.emitterLineDays && (
              <span className="error-text">{errors.emitterLineDays}</span>
            )}
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
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="inTransitDays"
              value={inTransitDays}
              onChange={handleInputChange}
            />
            {errors.inTransitDays && (
              <span className="error-text">{errors.inTransitDays}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Receiver Line Storage Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="endUserLineStorageDays"
              value={endUserLineStorageDays}
              onChange={handleInputChange}
            />
            {errors.endUserLineStorageDays && (
              <span className="error-text">
                {errors.endUserLineStorageDays}
              </span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Receiver Manufacturing Line Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="endUserManufacturingLineDays"
              value={endUserManufacturingLineDays}
              onChange={handleInputChange}
            />
            {errors.endUserManufacturingLineDays && (
              <span className="error-text">
                {errors.endUserManufacturingLineDays}
              </span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Other Storage Days
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="otherStorageDays"
              value={otherStorageDays}
              onChange={handleInputChange}
            />
            {errors.otherStorageDays && (
              <span className="error-text">{errors.otherStorageDays}</span>
            )}
          </div>
        </div>
        {/* <h1 className="text-xl font-semibold my-2"></h1> */}
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
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="totalCycleTime"
              value={totalCycleTime}
              onChange={handleInputChange}
            />
            {errors.totalCycleTime && (
              <span className="error-text">{errors.totalCycleTime}</span>
            )}
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
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="emptyPackagingReverseDays"
              value={emptyPackagingReverseDays}
              onChange={handleInputChange}
            />
            {errors.emptyPackagingReverseDays && (
              <span className="error-text">
                {errors.emptyPackagingReverseDays}
              </span>
            )}
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleStock}
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
