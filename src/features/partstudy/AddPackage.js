import React, { useState } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { styled } from "@mui/material/styles";
import { FaStarOfLife } from "react-icons/fa";

function AddPackage({ addPackage }) {
  const [id, setId] = useState();
  const [length, setLength] = useState("");
  const [breath, setBreath] = useState("");
  const [height, setHeight] = useState("");
  const [dimUnit, setDimUnit] = useState("");
  const [existingPart, setExistingPart] = useState("");
  const [currentPackingStudy, setCurrentPackingStudy] = useState("");
  const [currentPackingChallenges, setCurrentPackingChallenges] = useState("");
  const [noOfParts, setNoOfParts] = useState("");
  const [partSensitive, setPartSensitive] = useState("");
  const [greasy, setGreasy] = useState("");
  const [partOrientation, setPartOrientation] = useState("");
  const [multiPartInSingleSocket, setMultiPartInSingleSocket] = useState("");
  const [stacking, setStacking] = useState("");
  const [nesting, setNesting] = useState("");
  const [remarks, setRemarks] = useState("");
  const [partImage, setPartImage] = useState("");
  const [existingPackingImage, setExistingPackingImage] = useState("");
  const [partDrawing, setPartDrawing] = useState("");
  const [approvedPackingTechnicalDrawing, setApprovedPackingTechnicalDrawing] =
    useState("");
  const [approvedCommercialContract, setApprovedCommercialContract] =
    useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});

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

  const handlePackageChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "existingPart":
        setExistingPart(value);
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
      case "currentPackingStudy":
        setCurrentPackingStudy(value);
        break;
      case "currentPackingChallenges":
        setCurrentPackingChallenges(value);
        break;
      case "noOfParts":
        setNoOfParts(value);
        break;
      case "partSensitive":
        setPartSensitive(value);
        break;
      case "greasy":
        setGreasy(value);
        break;
      case "partOrientation":
        setPartOrientation(value);
        break;
      case "multiPartInSingleSocket":
        setMultiPartInSingleSocket(value);
        break;
      case "stacking":
        setStacking(value);
        break;
      case "nesting":
        setNesting(value);
        break;
      case "remarks":
        setRemarks(value);
        break;
      case "partImage":
        setPartImage(value);
        break;
      case "existingPackingImage":
        setExistingPackingImage(value);
        break;
      case "partDrawing":
        setPartDrawing(value);
        break;
      case "approvedPackingTechnicalDrawing":
        setApprovedPackingTechnicalDrawing(value);
        break;
      case "approvedCommercialContract":
        setApprovedCommercialContract(value);
        break;
    }
  };

  const handlePackage = () => {
    const errors = {};
    if (!existingPart) {
      errors.existingPart = "Existing Part is required";
    }
    if (!currentPackingStudy) {
      errors.currentPackingStudy = "Current Packing Study is required";
    }
    if (!currentPackingChallenges) {
      errors.currentPackingChallenges =
        "Current Packing Challenges is required";
    }
    if (!noOfParts) {
      errors.noOfParts = "Number Of Parts is required";
    }
    if (!partSensitive) {
      errors.partSensitive = "Part Sensitive is required";
    }
    if (!greasy) {
      errors.greasy = "Part greasy is required";
    }
    if (!partOrientation) {
      errors.partOrientation = "Part Orientation is required";
    }
    if (!multiPartInSingleSocket) {
      errors.multiPartInSingleSocket = "MultiPart In Single Socket is required";
    }
    if (!stacking) {
      errors.stacking = "Stacking is required";
    }
    if (!nesting) {
      errors.nesting = "Nesting is required";
    }
    if (!remarks) {
      errors.remarks = "Remarks is required";
    }
    if (!partImage) {
      errors.partImage = "Part Image is required";
    }
    if (!existingPackingImage) {
      errors.existingPackingImage = "Existing Packing Image is required";
    }
    if (!partDrawing) {
      errors.partDrawing = "Part Drawing is required";
    }
    if (!approvedPackingTechnicalDrawing) {
      errors.approvedPackingTechnicalDrawing =
        "Approved Packing Technical Drawing is required";
    }
    if (!approvedCommercialContract) {
      errors.approvedCommercialContract =
        "Approved Commercial Contract is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        id,
        existingPart,
        length,
        breath,
        height,
        dimUnit,
        currentPackingStudy,
        currentPackingChallenges,
        noOfParts,
        partSensitive,
        greasy,
        partOrientation,
        multiPartInSingleSocket,
        stacking,
        nesting,
        remarks,
        partImage,
        existingPackingImage,
        partDrawing,
        approvedPackingTechnicalDrawing,
        approvedCommercialContract,
        orgId,
      };
      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/partStudy/packingDetail`,
        formData
      )
        .then((response) => {
          console.log("Response:", response.data);
          addPackage(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const handleClosePackage = () => {
    addPackage(false);
  };

  return (
    <>
      <div className="partstudy-font">
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
                value={length}
                placeholder={"L"}
                className="input mb-2 input-bordered p-1"
                onChange={handlePackageChange}
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
                value={breath}
                placeholder={"B"}
                className="input mb-2 p-1 mx-1 input-bordered"
                onChange={handlePackageChange}
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
                value={height}
                placeholder={"H"}
                className="input mb-2 p-1 mx-1 input-bordered"
                onChange={handlePackageChange}
              />
              <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
                value={dimUnit}
              >
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="feet">feet</option>
              </select>
            </div>
          </div>
          {errors.dimUnit && (
            <div className="d-flex flex-column">
              <div className="error-text">{errors.dimUnit}</div>
            </div>
          )}
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
              value={existingPart}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.existingPart && (
              <div className="error-text">{errors.existingPart}</div>
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="currentPackingStudy"
              value={currentPackingStudy}
              onChange={handlePackageChange}
            />
            {errors.currentPackingStudy && (
              <div className="error-text">{errors.currentPackingStudy}</div>
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="currentPackingChallenges"
              value={currentPackingChallenges}
              onChange={handlePackageChange}
            />
            {errors.currentPackingChallenges && (
              <div className="error-text">
                {errors.currentPackingChallenges}
              </div>
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="noOfParts"
              value={noOfParts}
              onChange={handlePackageChange}
            />
            {errors.noOfParts && (
              <div className="error-text">{errors.noOfParts}</div>
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
              value={partSensitive}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.partSensitive && (
              <div className="error-text">{errors.partSensitive}</div>
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
              value={greasy}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.greasy && <div className="error-text">{errors.greasy}</div>}
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
              value={partOrientation}
            >
              <option value="Horizontal">Horizontal</option>
              <option value="Vertical">Vertical</option>
              <option value="Diagonal">Diagonal</option>
            </select>
            {errors.partOrientation && (
              <div className="error-text">{errors.partOrientation}</div>
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
              value={multiPartInSingleSocket}
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
              value={stacking}
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
              value={nesting}
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="remarks"
              value={remarks}
              onChange={handlePackageChange}
            />
            {errors.remarks && (
              <div className="error-text">{errors.remarks}</div>
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="partDrawing"
              value={partDrawing}
              onChange={handlePackageChange}
            />
            {errors.partDrawing && (
              <div className="error-text">{errors.partDrawing}</div>
            )}
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="approvedPackingTechnicalDrawing"
              value={approvedPackingTechnicalDrawing}
              onChange={handlePackageChange}
            />
            {errors.approvedPackingTechnicalDrawing && (
              <div className="error-text">
                {errors.approvedPackingTechnicalDrawing}
              </div>
            )}
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="approvedCommercialContract"
              value={approvedCommercialContract}
              onChange={handlePackageChange}
            />
            {errors.approvedCommercialContract && (
              <div className="error-text">
                {errors.approvedCommercialContract}
              </div>
            )}
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handlePackage}
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
