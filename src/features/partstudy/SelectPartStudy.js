import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function SelectPartStudy({
  setRefPsId,
  setEmitter,
  handleBack,
  handleNext,
  editPSId,
}) {
  const currentDate = new Date();
  //   const [refPsId, setRefPsId] = useState();
  const [partStudyId, setPartStudyId] = useState("");
  const [partStudyIdVO, setPartStudyIdVO] = useState([]);
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [partStudyDate, setPartStudyDate] = useState({
    startDate: currentDate,
    endDate: currentDate,
  });
  const [emitterId, setEmitterId] = useState("");
  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});

  const handleCloseAddPartStudy = () => {
    // addPartStudy(false);
  };
  const handleBackPartStudy = () => {
    window.location.reload();
  };

  //   const handleValueChange = (newValue) => {
  //     setPartStudyDate(newValue);
  //   };

  const handleEmitterChange = (event) => {
    setEmitterId(event.target.value);
    setPartStudyId("");
    setPartName("");
    setPartNumber("");
    getPartStudyId(event.target.value);
  };
  const handlePsIdChange = (event) => {
    setPartStudyId(event.target.value);
    getPartStudyName(event.target.value);
  };

  useEffect(() => {
    getPartStudyId(emitterId);
    getPartStudyName(partStudyId);
    getCustomersList();
    {
      editPSId && getPartStudyDetailsById();
    }
    console.log("EDIT ID CAME TO SelectPartStudy COMPONENT:", editPSId);
  }, []);

  const getPartStudyDetailsById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/basicDetails/${editPSId}`
      );
      if (response.status === 200) {
        console.log(
          "THE EMITTERID IN SELECTPARTSTUDY IS:",
          response.data.paramObjectsMap.basicDetailVO.emitterId
        );
        setEmitterId(response.data.paramObjectsMap.basicDetailVO.emitterId);
        setPartStudyId(editPSId);
        getPartStudyId(response.data.paramObjectsMap.basicDetailVO.emitterId);
        // getPartStudyId(editPSId);
        getPartStudyName(editPSId);
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

  const getPartStudyId = async (emitterId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/searchPartStudyById`,
        {
          params: {
            orgId: orgId,
            emitterId: emitterId,
          },
        }
      );
      if (response.status === 200) {
        setPartStudyIdVO(
          response.data.paramObjectsMap.basicDetailVO.partStudyId
        );

        console.log(
          "SET PART STUDY ID VO IS:",
          response.data.paramObjectsMap.basicDetailVO.partStudyId
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getPartStudyName = async (partStudyId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/searchPartStudyById`,
        {
          params: {
            orgId: orgId,
            emitterId: emitterId,
            refPsId: partStudyId,
          },
        }
      );
      if (response.status === 200) {
        setPartNumber(response.data.paramObjectsMap.basicDetailVO.partNumber);
        setPartName(response.data.paramObjectsMap.basicDetailVO.partName);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePartStudy = () => {
    const errors = {};
    if (!partStudyId) {
      errors.partStudyId = "Part Study ID is required";
    }
    if (!emitterId) {
      errors.emitterId = "Emitter is required";
    }
    if (Object.keys(errors).length === 0) {
      handleNext();
      setRefPsId(partStudyId);
      setEmitter(emitterId);
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="partstudy-font">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-2">Select Part Study</h1>
        </div>
        <div className="row">
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
              disabled={editPSId ? true : false}
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
              onChange={handlePsIdChange}
              value={partStudyId}
              disabled={editPSId ? true : false}
            >
              <option value="" disabled>
                Select a Part Study Id
              </option>
              {partStudyIdVO.length > 0 &&
                partStudyIdVO.map((list) => (
                  <option key={list.id} value={list}>
                    {list}
                  </option>
                ))}
            </select>
            {errors.partStudyId && (
              <span className="error-text">{errors.partStudyId}</span>
            )}
          </div>
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
              value={partName}
              disabled
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
              value={partNumber}
              disabled
            />
            {errors.partNumber && (
              <span className="error-text">{errors.partNumber}</span>
            )}
          </div>
          {/* <div className="col-lg-3 col-md-6 mb-2">
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
          </div> */}
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
            // onClick={handleNext}
            onClick={handlePartStudy}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default SelectPartStudy;
