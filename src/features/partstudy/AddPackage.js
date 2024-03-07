import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { styled } from "@mui/material/styles";
import { FaStarOfLife } from "react-icons/fa";

function AddPackage({
  refPsId,
  handleBack,
  handleNext,
  emitter,
  setEmitterName,
}) {
  const [displayName, setDisplayName] = useState("");
  const [id, setId] = useState();
  const [length, setLength] = useState("");
  const [breath, setBreath] = useState("");
  const [height, setHeight] = useState("");
  // const [partUnit, setPartUnit] = useState("");
  const [existingPart, setExistingPart] = useState("");
  const [selectPs, setSelectPs] = useState(false);
  const [currentPackingStudy, setCurrentPackingStudy] = useState("");
  const [currentPackingChallenges, setCurrentPackingChallenges] = useState("");
  const [noOfParts, setNoOfParts] = useState("");
  const [partSensitive, setPartSensitive] = useState();
  const [partGreasy, setPartGreasy] = useState("");
  const [partOrientation, setPartOrientation] = useState("");
  const [multiPartInSingleUnit, setMultiPartInSingleUnit] = useState("");
  const [stacking, setStacking] = useState("");
  const [nesting, setNesting] = useState("");
  const [remarks, setRemarks] = useState("");
  const [partImage, setPartImage] = useState(null);
  const [existingPackingImage, setExistingPackingImage] = useState(null);
  const [partDrawing, setPartDrawing] = useState("");
  const [approvedPackingTechnicalDrawing, setApprovedPackingTechnicalDrawing] =
    useState("");
  const [approvedCommercialContract, setApprovedCommercialContract] =
    useState("");
  const [partStudyId, setPartStudyId] = useState(refPsId);
  const [emitterStudyId, setEmitterStudyId] = useState(emitter);
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
      case "partGreasy":
        setPartGreasy(value);
        break;
      case "partOrientation":
        setPartOrientation(value);
        break;
      case "multiPartInSingleUnit":
        setMultiPartInSingleUnit(value);
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
    console.log("Response handlePackage Click");
    const errors = {};
    // if (!length) {
    //   errors.length = "Length is required";
    // }
    // if (!breath) {
    //   errors.breath = "Breath is required";
    // }
    // if (!height) {
    //   errors.height = "Height is required";
    // }
    // if (!existingPart) {
    //   errors.existingPart = "Existing Part is required";
    // }
    // if (!currentPackingStudy) {
    //   errors.currentPackingStudy = "Current Packing Study is required";
    // }
    // if (!currentPackingChallenges) {
    //   errors.currentPackingChallenges =
    //     "Current Packing Challenges is required";
    // }
    // if (!noOfParts) {
    //   errors.noOfParts = "Number Of Parts is required";
    // }
    // if (!partSensitive) {
    //   errors.partSensitive = "Part Sensitive is required";
    // }
    // if (!partGreasy) {
    //   errors.partGreasy = "Part greasy is required";
    // }
    // if (!partOrientation) {
    //   errors.partOrientation = "Part Orientation is required";
    // }
    // if (!multiPartInSingleUnit) {
    //   errors.multiPartInSingleUnit = "Multi Part In Single Pocket is required";
    // }
    // if (!stacking) {
    //   errors.stacking = "Stacking is required";
    // }
    // if (!nesting) {
    //   errors.nesting = "Nesting is required";
    // }
    // if (!remarks) {
    //   errors.remarks = "Remarks is required";
    // }
    // if (!partDrawing) {
    //   errors.partDrawing = "Part Drawing is required";
    // }
    // if (!approvedPackingTechnicalDrawing) {
    //   errors.approvedPackingTechnicalDrawing =
    //     "Approved Packing Technical Drawing is required";
    // }
    // if (!approvedCommercialContract) {
    //   errors.approvedCommercialContract =
    //     "Approved Commercial Contract is required";
    // }
    if (Object.keys(errors).length === 0) {
      console.log("Response server called Click");
      const formData = {
        id,
        existingPart,
        length,
        breath,
        height,
        // currentPackingStudy,
        currentPackingChallenges,
        noOfParts,
        partSensitive,
        partGreasy,
        partOrientation,
        multiPartInSingleUnit,
        stacking,
        nesting,
        remarks,
        refPsId: refPsId ? refPsId : "",
        // partImage,
        // existingPackingImage,
        // partDrawing,
        // approvedPackingTechnicalDrawing,
        // approvedCommercialContract,
        orgId,
      };
      Axios.put(
        `${process.env.REACT_APP_API_URL}/api/partStudy/updatePackingDetail`,
        formData
      )
        .then((response) => {
          console.log("Response:", response.data);
          handleNext();
          // addPackage(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    getDisplayNameById();
    if (refPsId) {
      fetchPackageDetails(refPsId);
    }
  }, [refPsId]);

  const getDisplayNameById = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/customers/${emitterStudyId}`
      );

      if (response.status === 200) {
        const customer = response.data.paramObjectsMap.customersVO;
        if (customer) {
          const displayName = customer.displayName;
          console.log("customer.displayName", displayName);
          setDisplayName(displayName);
          setEmitterName(displayName);
        } else {
          setDisplayName("Customer not found");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPackageDetails = async (refPsId) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/packageDetail/${refPsId}`
      );

      if (response.status === 200) {
        console.log("packageDetail", response.data);
        const packingDetailVO = response.data.paramObjectsMap.packingDetailVO;
        setPartStudyId(packingDetailVO.refPsId);
        setLength(packingDetailVO.length);
        setBreath(packingDetailVO.breath);
        setHeight(packingDetailVO.height);
        setExistingPart(packingDetailVO.existingPart);
        // currentPackingStudy(packingDetailVO.currentPackingStudy);
        setCurrentPackingChallenges(packingDetailVO.currentPackingChallenges);
        setNoOfParts(packingDetailVO.noOfParts);
        setPartSensitive(packingDetailVO.partSensitive);
        setPartGreasy(packingDetailVO.partGreasy);
        setPartOrientation(packingDetailVO.partOrientation);
        setMultiPartInSingleUnit(packingDetailVO.multiPartInSingleUnit);
        setStacking(packingDetailVO.stacking);
        setNesting(packingDetailVO.nesting);
        setRemarks(packingDetailVO.remarks);
        // setPartStudyDate({ startDate: new Date(basicDetailVO.partStudyDate) });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePart = (event) => {
    setExistingPart(event.target.value);
    if (event.target.value === "Yes") {
      setSelectPs(true);
    } else {
      setSelectPs(false);
    }
  };

  // const handleUnitChange = (e) => {
  //   setPartUnit(e.target.value);
  // };
  const handlePartGreasy = (e) => {
    setPartGreasy(e.target.value);
  };
  const handlePartOrientation = (e) => {
    setPartOrientation(e.target.value);
  };
  const handleMultiPart = (e) => {
    setMultiPartInSingleUnit(e.target.value);
  };
  const handleStacking = (e) => {
    setStacking(e.target.value);
  };
  const handlePartSensitive = (e) => {
    setPartSensitive(e.target.value);
  };
  const handleNesting = (e) => {
    setNesting(e.target.value);
  };

  const handleClosePackage = () => {
    // addPackage(false);
  };

  return (
    <>
      <div className="partstudy-font">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-4">Basic Details</h1>
          {/* <IoMdClose
            onClick={handleClosePackage}
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
            {/* <select
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 w-full input-bordered ps-2"
              value={partStudyId}
              // onChange={handleInputChange}
            >
              <option value="">Select an option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select> */}
            <input
              className="form-control form-sz mb-2"
              disabled
              placeholder={""}
              name="partStudyId"
              value={refPsId}
            />
            {errors.partStudyId && (
              <span className="error-text">{errors.partStudyId}</span>
            )}
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
              name="displayName"
              value={displayName}
            />
          </div>
        </div>
        <div className="row">
          <h1 className="text-xl font-semibold mb-4">Package Details</h1>
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
                style={{ height: 40, fontSize: "0.800rem", width: 69 }}
                name="length"
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
                style={{ height: 40, fontSize: "0.800rem", width: 69 }}
                name="breath"
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
                style={{ height: 40, fontSize: "0.800rem", width: 69 }}
                name="height"
                value={height}
                placeholder={"H"}
                className="input mb-2 p-1 mx-1 input-bordered"
                onChange={handlePackageChange}
              />
              {/* <select
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
                value={partUnit}
                onChange={handleUnitChange}
              >
                <option value="">unit</option>
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="feet">feet</option>
              </select> */}
            </div>
            <div className="d-flex flex-column">
              {errors.length && (
                <div className="error-text">{errors.length}</div>
              )}
              {errors.breath && (
                <div className="error-text">{errors.breath}</div>
              )}
              {errors.height && (
                <div className="error-text">{errors.height}</div>
              )}
              {/* {errors.partUnit && (
                <div className="error-text">{errors.partUnit}</div>
              )} */}
            </div>
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
              value={existingPart}
              onChange={handlePart}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.existingPart && (
              <div className="error-text">{errors.existingPart}</div>
            )}
          </div>
          {selectPs && (
            <>
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
                <textarea
                  style={{ fontSize: "0.800rem" }}
                  className="form-control label label-text label-font-size text-base-content"
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
                    Parts Per Packaging
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
            </>
          )}
          {/* <div className="col-lg-3 col-md-6 mb-2">
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
          </div> */}

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
              onChange={handlePartSensitive}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
              value={partGreasy}
              onChange={handlePartGreasy}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.partGreasy && (
              <div className="error-text">{errors.partGreasy}</div>
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
              value={partOrientation}
              onChange={handlePartOrientation}
            >
              <option value="">Select an option</option>
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
              value={multiPartInSingleUnit}
              onChange={handleMultiPart}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.multiPartInSingleUnit && (
              <div className="error-text">{errors.multiPartInSingleUnit}</div>
            )}
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
              onChange={handleStacking}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.stacking && (
              <div className="error-text">{errors.stacking}</div>
            )}
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
              onChange={handleNesting}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.nesting && (
              <div className="error-text">{errors.nesting}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Remarks
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
          <h1 className="text-xl font-semibold mb-4">Attachments</h1>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Part Image
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
            {errors.approvedCommercialContract && (
              <div className="error-text">
                {errors.approvedCommercialContract}
              </div>
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
            onClick={handlePackage}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save & Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPackage;
