import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function AddLogistics({ refPsId, emitterName, handleBack, handleNext }) {
  const [avgLotSize, setAvgLotSize] = useState("");
  const [dispatchFrequency, setDispatchFrequency] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});
  const [diapatchTo, setDispatchTo] = useState("");

  useEffect(() => {
    if (refPsId) {
      fetchLogisiticDetails(refPsId);
    }
  }, [refPsId]);

  const fetchLogisiticDetails = async (refPsId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/logistics/${refPsId}`
      );

      if (response.status === 200) {
        console.log("logisticsVO", response.data);
        const logisticsVO = response.data.paramObjectsMap.logisticsVO;
        setAvgLotSize(logisticsVO.avgLotSize);
        setDispatchFrequency(logisticsVO.dispatchFrequency);
        setDispatchTo(logisticsVO.diapatchTo);
        // setPartStudyDate({ startDate: new Date(basicDetailVO.partStudyDate) });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "avgLotSize":
        setAvgLotSize(value);
        break;
      case "dispatchFrequency":
        setDispatchFrequency(value);
        break;
      case "diapatchTo":
        setDispatchTo(value);
        break;
      default:
        break;
    }
  };

  const handleLogistic = () => {
    const errors = {};
    console.log("test");
    if (!avgLotSize) {
      errors.avgLotSize = "Lot size Name is required";
    }
    if (!dispatchFrequency) {
      errors.dispatchFrequency = "Dispatch frequency is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        avgLotSize,
        dispatchFrequency,
        orgId,
        diapatchTo,
        refPsId: refPsId ? refPsId : "",
      };
      console.log("test", formData);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/partStudy/logistics`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          handleNext();
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
          <h1 className="text-xl font-semibold mb-4">Basic Details</h1>
          {/* <IoMdClose
            onClick={handleCloseLogistics}
            className="cursor-pointer w-8 h-8 mb-3"
          /> */}
        </div>
        <div className="row">
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
              disabled
              placeholder={""}
              name="partStudyId"
              value={refPsId}
            />
          </div>
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
            <input
              className="form-control form-sz mb-2"
              disabled
              placeholder={""}
              name="emitterName"
              value={emitterName}
            />
          </div>
        </div>
        <div className="row">
          <h1 className="text-xl font-semibold mb-4">Logistics</h1>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Avg Lot Size:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              placeholder={""}
              name="avgLotSize"
              value={avgLotSize}
              onChange={handleInputChange}
            />
            {errors.avgLotSize && (
              <span className="error-text">{errors.avgLotSize}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Dispatch Frequency:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              type={"text"}
              placeholder={""}
              name="dispatchFrequency"
              value={dispatchFrequency}
              onChange={handleInputChange}
            />
            {errors.dispatchFrequency && (
              <span className="error-text">{errors.dispatchFrequency}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Dispatch To:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="diapatchTo"
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-4 w-full input-bordered ps-2"
              value={diapatchTo}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>{" "}
              {/* Add a default option */}
              <option value="Direct">Direct</option>
              <option value="End-user Warehouse">End-user Warehouse</option>
              <option value="Emitter Interim Warehouse">
                Emitter Interim Warehouse
              </option>
            </select>
          </div>
          {/* <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Transportation To:
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <select
              name="transpotationTo"
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-4 w-full input-bordered ps-2"
              value={transpotationTo}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>{" "}
              Add a default option
              <option value="Part Load">Part Load</option>
              <option value="Full Truck Load">Full Truck Load</option>
            </select>
          </div> */}
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            onClick={handleBack}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleLogistic}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save & Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AddLogistics;
