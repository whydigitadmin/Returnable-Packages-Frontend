import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ToastComponent from "../../utils/ToastComponent";

function AddStockKeeping({ refPsId, emitterName, handleBack, handleNext }) {
  const [emitterStoreDays, setEmitterStoreDays] = useState("");
  const [emitterLineDays, setEmitterLineDays] = useState("");
  const [inTransitDays, setInTransitDays] = useState("");
  const [receiverLineStorageDays, setReceiverLineStorageDays] = useState("");
  const [receiverManufacturingLineDays, setReceiverManufacturingLineDays] =
    useState("");
  const [otherStorageDays, setOtherStorageDays] = useState("");
  const [totalCycleTime, setTotalCycleTime] = useState("");
  const [reverseLogisticsDay, setReverseLogisticsDay] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "emitterStoreDays":
        setEmitterStoreDays(value);
        break;
      case "emitterLineDays":
        setEmitterLineDays(value);
        break;
      case "inTransitDays":
        setInTransitDays(value);
        break;
      case "receiverLineStorageDays":
        setReceiverLineStorageDays(value);
        break;
      case "receiverManufacturingLineDays":
        setReceiverManufacturingLineDays(value);
        break;
      case "otherStorageDays":
        setOtherStorageDays(value);
        break;
      case "totalCycleTime":
        setTotalCycleTime(value);
        break;
      case "reverseLogisticsDay":
        setReverseLogisticsDay(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (refPsId) {
      fetchStockDetails(refPsId);
    }
  }, [refPsId]);

  const fetchStockDetails = async (refPsId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/stockDetail/${refPsId}`
      );

      if (response.status === 200) {
        console.log("StockDetail", response.data);
        const StockDetail = response.data.paramObjectsMap.StockDetail;
        setEmitterStoreDays(StockDetail.emitterStoreDays);
        setEmitterLineDays(StockDetail.emitterLineDays);
        setInTransitDays(StockDetail.inTransitDays);
        setReceiverLineStorageDays(StockDetail.receiverLineStorageDays);
        setReceiverManufacturingLineDays(
          StockDetail.receiverManufacturingLineDays
        );
        setOtherStorageDays(StockDetail.otherStorageDays);
        setTotalCycleTime(StockDetail.totalCycleTime);
        setReverseLogisticsDay(StockDetail.reverseLogisticsDay);
        // setPartStudyDate({ startDate: new Date(basicDetailVO.partStudyDate) });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const generatePartStudyId = async () => {
    if (refPsId) {
      console.log("stockDetail called:");
      try {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/partStudy/generatePartStudyId?refPsId=${refPsId}`
          )
          .then((response) => {
            console.log(
              "Response stockDetail:",
              response.data.paramObjectsMap.message
            );
            // handleBackPartStudy();
            // handleNext();
            setMessage(response.data.paramObjectsMap.message);
            setTimeout(() => {
              window.location.reload(); // Reload the page
            }, 3000);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleBackPartStudy = () => {
    window.location.reload();
  };

  // const generatePartStudyId = () => {
  //   if (refPsId) {
  //     try {
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/api/partStudy/generatePartStudyId/${refPsId}`
  //       )
  //       if (response.status === 200) {
  //         console.log("StockDetail", response.data);
  //         const StockDetail = response.data.paramObjectsMap.StockDetail;
  //         setEmitterStoreDays(StockDetail.emitterStoreDays);
  //         setEmitterLineDays(StockDetail.emitterLineDays);
  //         setInTransitDays(StockDetail.inTransitDays);
  //         setReceiverLineStorageDays(StockDetail.receiverLineStorageDays);
  //         setReceiverManufacturingLineDays(
  //           StockDetail.receiverManufacturingLineDays
  //         );
  //         setOtherStorageDays(StockDetail.otherStorageDays);
  //         setTotalCycleTime(StockDetail.totalCycleTime);
  //         setReverseLogisticsDay(StockDetail.reverseLogisticsDay);
  //         // setPartStudyDate({ startDate: new Date(basicDetailVO.partStudyDate) });
  //       }
  //     }catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // };
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
    if (!receiverLineStorageDays) {
      errors.receiverLineStorageDays = "EndUser LineStorage Days is required";
    }
    if (!receiverManufacturingLineDays) {
      errors.receiverManufacturingLineDays =
        "EndUser Manufacturing Line Days  is required";
    }
    if (!otherStorageDays) {
      errors.otherStorageDays = " Other Storage Days is required";
    }
    if (!reverseLogisticsDay) {
      errors.reverseLogisticsDay = "Empty Packaging Reverse Days is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        emitterStoreDays,
        emitterLineDays,
        orgId,
        inTransitDays,
        receiverLineStorageDays,
        receiverManufacturingLineDays,
        otherStorageDays,
        totalCycleTime,
        reverseLogisticsDay,
        refPsId: refPsId ? refPsId : "",
      };
      console.log("test", formData);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/partStudy/stockDetail`,
          formData
        )
        .then((response) => {
          console.log("Response stockDetail:", response.data);
          generatePartStudyId();
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
      {message && <ToastComponent content={message} />}
      <div className="partstudy-font">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-4">Basic Details</h1>

          {/* <IoMdClose
            onClick={handleCloseAddStockKeeping}
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
          <h1 className="text-xl font-semibold mb-4">
            Stock Keeping (In Days)
          </h1>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Emitter Store
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
                Emitter Line
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
                InTransit
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
                Receiver Line Storage
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="receiverLineStorageDays"
              value={receiverLineStorageDays}
              onChange={handleInputChange}
            />
            {errors.receiverLineStorageDays && (
              <span className="error-text">
                {errors.receiverLineStorageDays}
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
                Receiver Manufacturing Line
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="receiverManufacturingLineDays"
              value={receiverManufacturingLineDays}
              onChange={handleInputChange}
            />
            {errors.receiverManufacturingLineDays && (
              <span className="error-text">
                {errors.receiverManufacturingLineDays}
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
                Other Storage
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
                  "label-text label-font-size text-base-content d-flex "
                }
              >
                Reverse Logistics
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mt-2"
              type={"text"}
              placeholder={""}
              name="reverseLogisticsDay"
              value={reverseLogisticsDay}
              onChange={handleInputChange}
            />
            {errors.reverseLogisticsDay && (
              <span className="error-text">{errors.reverseLogisticsDay}</span>
            )}
          </div>
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
            onClick={handleStock}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default AddStockKeeping;
