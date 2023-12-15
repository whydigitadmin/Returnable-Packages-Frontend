import * as React from "react";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import ToolTip from "../../components/Input/Tooltip";

function AddPartStudy({ addPartStudy }) {
  const [formData, setFormData] = useState({
    sno: "",
    partStudyId: "",
    partStudyNo: "",
    partStudyDate: "",
    emitterId: "",
    receiverID: "",
    partStudyID: "",
    partName: "",
    partNo: "",
    weight: "",
    partVol: "",
    highvol: "",
    lowVol: "",
    document: null,
    active: true,
  });

  const [formErrors, setFormErrors] = useState({
    sno: "",
    partStudyId: "",
    partStudyNo: "",
    partStudyDate: "",
    emitterId: "",
    receiverID: "",
    partStudyID: "",
    partName: "",
    partNo: "",
    weight: "",
    partVol: "",
    highvol: "",
    lowVol: "",
    document: null,
    active: true,
  });

  const [value, setValue] = useState("");
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const updateInputValue = (val) => {
    setValue(val);
  };

  const handleCloseAddPartStudy = () => {
    addPartStudy(false);
  };

  const handlePartStudy = () => {
    const errors = {};
    if (!formData.sno.trim()) {
      errors.sno = "ID is required";
    }
    if (!formData.partStudyId.trim()) {
      errors.partStudyId = "Part Study ID  is required";
    }
    if (!formData.partStudyNo.trim()) {
      errors.partStudyNo = "Part Study No is required";
    }
    if (!formData.partStudyDate.trim()) {
      errors.partStudyDate = "partStudyDate is required";
    }
    if (!formData.emitterId.trim()) {
      errors.emitterId = "emitterId is required";
    }
    if (!formData.receiverID.trim()) {
      errors.receiverID = "receiverID is required";
    }
    if (!formData.partStudyID.trim()) {
      errors.partStudyID = "partStudyID is required";
    }
    if (!formData.partName.trim()) {
      errors.partName = "partName is required";
    }
    if (!formData.partNo.trim()) {
      errors.partNo = "partNo is required";
    }
    if (!formData.weight.trim()) {
      errors.weight = "weight is required";
    }
    if (!formData.partVol.trim()) {
      errors.partVol = "partVol is required";
    }
    if (!formData.highvol.trim()) {
      errors.highvol = "highvol is required";
    }
    if (!formData.lowVol.trim()) {
      errors.lowVol = "lowVol is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <h1 className="text-xl font-semibold mb-3">
          Basic Part Details & Geography
        </h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Study No
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <ToolTip
              placeholder={"Part Study No"}
              content={"Enter the Part Study No"}
              updateFormValue={updateFormValue}
              updateType="partStudyNo"
            />
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
            <ToolTip
              placeholder={"Part Study Date"}
              content={"Enter the Part Study Date"}
              updateFormValue={updateFormValue}
              updateType="partStudyDate"
            />
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
            <ToolTip
              placeholder={"Emitter ID"}
              content={"Enter the Emitter ID"}
              updateFormValue={updateFormValue}
              updateType="emitterId"
            />
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
            <ToolTip
              placeholder={"Receiver ID"}
              content={"Enter the Receiver ID"}
              updateFormValue={updateFormValue}
              updateType="receiverID"
            />
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
            <ToolTip
              placeholder={"Part Name"}
              content={"Name of the Part"}
              updateFormValue={updateFormValue}
              updateType="partName"
            />
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
            <ToolTip
              placeholder={"Part No"}
              content={"No of the Part"}
              updateFormValue={updateFormValue}
              updateType="partNo"
            />
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
                style={{ height: 40, fontSize: "0.800rem", width: 166 }}
                type={"text"}
                value={value}
                placeholder={"Weight"}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 input-bordered"
              />
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
              >
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="g">gm</option>
              </select>
            </div>
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
            <ToolTip
              placeholder={"Part Volume"}
              content={"Specify the QTY of the Part"}
              updateFormValue={updateFormValue}
              updateType="partVol"
            />
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
            <ToolTip
              placeholder={"Highest Volume"}
              content={"Specify the Highest volume of the Part"}
              updateFormValue={updateFormValue}
              updateType="highVol"
            />
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
            <ToolTip
              placeholder={"Lowest Volume"}
              content={"Specify the Lowest volume of the Part"}
              updateFormValue={updateFormValue}
              updateType="lowVol"
            />
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
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
