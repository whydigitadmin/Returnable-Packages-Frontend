import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";
import TitleCard from "../../components/Cards/TitleCard";

const steps = ["Issue manifest", "Mode of Transport "];

function IssueManifest() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [bills, setBills] = useState([]);
  const [isPendingPopupOpen, setPendingPopupOpen] = useState(false);
  const [isInProgressPopupOpen, setInProgressPopupOpen] = useState(false);
  const [isIssuedPopupOpen, setIssuedPopupOpen] = useState(false);
  const [selectedIssueRequest, setSelectedIssueRequest] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [emitterLocationVO, setEmitterLocationVO] = useState([]);

  const [emitter, setEmitter] = useState("");
  const [emitterId, setEmitterId] = useState("");
  const [qty, setQty] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [selectedWarehouseId, setSelectedWarehouseId] = useState();
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [demoState, setDemoState] = useState(false);

  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(() => {
    getIssueRequest();
  }, [emitterId]);

  const handleQtyChange = (e, index) => {
    const newQty = [...qty];
    newQty[index] = e.target.value;
    setQty(newQty);
  };

  const openPendingPopup = () => {
    setPendingPopupOpen(true);
  };

  const closePendingPopup = () => {
    setPendingPopupOpen(false);
    setQty("");
  };

  const openInProgressPopup = () => {
    setInProgressPopupOpen(true);
  };

  const closeInProgressPopup = () => {
    setInProgressPopupOpen(false);
  };

  const openIssuedPopup = () => {
    setIssuedPopupOpen(true);
  };

  const closeIssuedPopup = () => {
    setIssuedPopupOpen(false);
  };

  const handlePendingStatusClick = (issueRequest, subIndex) => {
    console.log("Pending", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
    openPendingPopup();
  };
  const handleInProgressStatusClick = (issueRequest, subIndex) => {
    console.log("InProgress", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
    openInProgressPopup();
  };
  const handleIssuedStatusClick = (issueRequest, subIndex) => {
    console.log("Issued", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
    openIssuedPopup();
  };

  // randomStatus code

  const handleIssueKit = (item) => {
    console.log("test");
    const errors = {};
    // if (!unit) {
    //   errors.unit = "Unit Name is required";
    // }
    // if (Object.keys(errors).length === 0) {
    const formData = {
      approvelId: userId,
      approverName: userDetail.firstName,
      issueItemId: item.id,
      issueRequestId: selectedIssueRequest.id,
      issuedQty: qty,
    };
    console.log("test1", formData);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/emitter/issueRequestQtyApprovel`,
        formData
      )
      .then((response) => {
        console.log("Response:", response.data);
        getIssueRequest(emitterId);
        closePendingPopup();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // else {
  //   // If there are errors, update the state to display them
  //   setErrors(errors);
  // }

  // const getPaymentStatus = (issueStatus, selectedIssueRequest) => {
  //   const randomStatus = issueStatus;
  //   if (randomStatus === 0)
  //     return (
  //       <div
  //         className="badge bg-danger text-white cursor-pointer w-full"
  //         onClick={() =>
  //           handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
  //         }
  //       >
  //         {console.log("Testing", selectedIssueRequest)}
  //         Pending
  //       </div>
  //     );
  //   if (randomStatus === 1)
  //     return (
  //       <div
  //         className="badge bg-warning text-white cursor-pointer w-full"
  //         onClick={() =>
  //           handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
  //         }
  //       >
  //         WIP
  //       </div>
  //     );
  //   if (randomStatus === 2)
  //     return (
  //       <div
  //         className="badge bg-success text-white cursor-pointer w-full"
  //         onClick={() =>
  //           handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
  //         }
  //       >
  //         Issued
  //       </div>
  //     );
  //   else return <div className="badge badge-ghost">Unknown</div>;
  // };

  const getPaymentStatus = (issueStatus, selectedIssueRequest) => {
    const randomStatus = issueStatus;
    if (randomStatus === 0)
      return (
        <div>
          <img
            src="/pending.png"
            alt="pending-status-icon"
            title="Pending"
            style={{ width: 30, height: 30, margin: "auto", cursor: "pointer" }}
            onClick={() =>
              handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
            }
          />
        </div>
      );
    if (randomStatus === 1)
      return (
        <div>
          <img
            src="/inprogress.png"
            alt="Inprogress-status-icon"
            style={{ width: 30, height: 30, margin: "auto", cursor: "pointer" }}
            onClick={() =>
              handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
            }
          />
        </div>
      );
    if (randomStatus === 2)
      return (
        <div>
          <img
            src="/checked1.png"
            alt="completed-status-icon"
            style={{ width: 30, height: 30, margin: "auto", cursor: "pointer" }}
            onClick={() =>
              handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
            }
          />
        </div>
      );
    else return <div className="badge badge-ghost">Unknown</div>;
  };



  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  const handleEmitterChange = (event) => {
    const selectedWarehouseLocation = event.target.value;

    // Find the corresponding warehouse object in emitterLocationVO based on the selected location
    const selectedWarehouse = emitterLocationVO.find(
      (warehouse) => warehouse.warehouseLocation === selectedWarehouseLocation
    );

    // Update the state with the selected warehouse ID
    setSelectedWarehouseId(
      selectedWarehouse ? selectedWarehouse.warehouseId : ""
    );

    setEmitter(selectedWarehouseLocation); // If needed, you can also update the 'emitter' state with the selected location
    getCustomersList(selectedWarehouse);
  };

  const handleEmitterIdChange = (event) => {
    const selectedEmitterId = event.target.value;

    getIssueRequest(selectedEmitterId);

    console.log("emitterID", emitterId);
  };

  const getCustomersList = async (selectedWarehouse) => {
    console.log("Test@", selectedWarehouse);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getemitterByWarehouseId?orgid=${orgId}&warehouseid=${selectedWarehouse.warehouseId}`
      );

      if (response.status === 200) {
        setEmitterCustomersVO(response.data.paramObjectsMap.emitters);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLocationList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/getWarehouseByUserID?userId=${userId}`
      );

      if (response.status === 200) {
        setEmitterLocationVO(response.data.paramObjectsMap.warehouseVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getIssueRequest = async (selectedEmitterId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequest?orgId=${orgId}&emitterId=${selectedEmitterId}`
      );

      if (response.status === 200) {
        setBills(response.data.paramObjectsMap.issueRequestVO);
        setEmitterId(selectedEmitterId);
        console.log(
          "getIssueRequest",
          response.data.paramObjectsMap.issueRequestVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-5 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-7 h-7"
                    style={{ marginTop: 17 }}
                  />
                  <h4 className="text-2xl font-semibold mt-3 ms-1 mb-3">
                    Warehouse Location
                  </h4>
                </div>
                {/* <h4 className="text-xl dark:text-slate-300 font-semibold mb-2">
                  SCM AI-PACKS PVT LTD
                </h4> */}
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={handleEmitterChange}
                  value={emitter}
                >
                  <option value="" disabled>
                    Select an Location
                  </option>
                  {emitterLocationVO.length > 0 &&
                    emitterLocationVO.map((list) => (
                      <option key={list.id} value={list.warehouseLocation}>
                        {list.warehouseLocation}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16 h-16"
                style={{ marginTop: 50 }}
              />
            </div>
            <div className="col-lg-5 card bg-base-100 shadow-xl ms-2 mt-3">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-7 h-7"
                    style={{ marginTop: 17 }}
                  />
                  <h4 className="text-2xl font-semibold mt-3 ms-1 mb-3">
                    Issued To
                  </h4>
                </div>
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={handleEmitterIdChange}
                  value={emitterId}
                >
                  <option value="" disabled selected>
                    Select an Emitter
                  </option>
                  {emitterCustomersVO.length > 0 &&
                    emitterCustomersVO.map((list) => (
                      <option key={list.id} value={list.emitterId}>
                        {list.emitterName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <>
            <TitleCard title="Issue Manifest Details" topMargin="mt-2">
              {/* Invoice list in table format loaded constant */}
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>RM No.</th>
                      <th>RM Date</th>
                      <th>Demand Date</th>
                      <th>Flow Name</th>
                      <th>TAT (Hrs)</th>
                      <th>Req Item</th>
                      {/* <th>Bal Qty</th>
                      <th>Req Qty</th>
                      <th>KIT NO</th>
                      <th>Part Name/No</th> */}
                      <th>Status</th>
                    </tr>
                  </thead>
                  {bills.length > 0 && (
                    <tbody>
                      {bills.map((issueRequest, index) => (
                        <React.Fragment key={index}>
                          {issueRequest.issueItemVO.map((item, subIndex) => (
                            <tr key={`${index}-${subIndex}`}>
                              {subIndex === 0 && (
                                <>
                                  <td rowSpan={issueRequest.issueItemVO.length}>
                                    {issueRequest.id}
                                  </td>
                                  <td rowSpan={issueRequest.issueItemVO.length}>
                                    {moment(issueRequest.requestedDate).format(
                                      "DD-MM-YY"
                                    )}
                                  </td>
                                  <td rowSpan={issueRequest.issueItemVO.length}>
                                    {moment(issueRequest.demandDate).format(
                                      "DD-MM-YY"
                                    )}
                                  </td>
                                  <td rowSpan={issueRequest.issueItemVO.length}>
                                    {issueRequest.flowName}
                                  </td>
                                  <td
                                    rowSpan={issueRequest.issueItemVO.length}
                                    className="text-center"
                                  >
                                    {issueRequest.tat}
                                  </td>
                                  <td
                                    rowSpan={issueRequest.issueItemVO.length}
                                    className="text-center"
                                  >
                                    {issueRequest.totalIssueItem}
                                  </td>
                                  {/* <td
                                  rowSpan={issueRequest.issueItemVO.length}
                                  className="text-center"
                                >
                                  {issueRequest.partQty}
                                </td> */}
                                </>
                              )}
                              {/* <td>{issueRequest.kitQty}</td>
                            <td>{issueRequest.kitNo}</td>
                            <td>{issueRequest.partNo}</td> */}
                              {/* <td
                              onClick={() =>
                                handlePendingStatusClick(issueRequest, subIndex)
                              }
                            >
                              {getPaymentStatus(issueRequest.issueStatus)}
                            </td> */}

                              {/* Random Status Code */}

                              <td
                                style={{ width: 100 }}
                              // onClick={() =>
                              //   handlePendingStatusClick(issueRequest, subIndex)
                              // }
                              >
                                {getPaymentStatus(
                                  issueRequest.issueStatus,
                                  issueRequest
                                )}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  )}
                </table>

                {bills.length === 0 && (
                  <h4 className="text-base dark:text-slate-300 font-semibold text-center fst-italic mt-4">
                    No records to display..!!
                  </h4>
                )}
              </div>
            </TitleCard>
            {/* Pending Modal Popup */}
            <Dialog
              fullWidth={true}
              maxWidth={"md"}
              open={isPendingPopupOpen}
              onClose={closePendingPopup}
            >
              <div className="d-flex justify-content-between">
                <DialogTitle>Issue Manifest</DialogTitle>
                <IoMdClose
                  className="cursor-pointer w-8 h-8 mt-3 me-3"
                  onClick={closePendingPopup}
                />
              </div>
              <DialogContent>
                <DialogContentText className="d-flex flex-column">
                  <div className="d-flex justify-content-end">
                    <div>
                      <div className="text-dark">
                        Request.Manifest No:
                        {selectedIssueRequest?.id}
                      </div>
                      <div className="text-dark">
                        Manifest Date :
                        {moment(selectedIssueRequest?.requestedDate).format(
                          "DD/MM/YYYY"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex flex-row text-dark mt-3"
                    style={{ marginLeft: "70px" }}
                  >
                    {selectedIssueRequest?.irType === "IR_PART" && (
                      <div>
                        <div className="ms-1">
                          {/* Displaying partName and partQty in a table */}

                          <table className="table">
                            <thead>
                              <tr>
                                <th>Part Name</th>
                                <th>Part Quantity</th>
                                <th>Issue Quantity</th>
                                <th>Balance Quantity</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedIssueRequest?.issueItemVO.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <td>{item.partName}</td>
                                    <td>{item.partQty}</td>
                                    <td>
                                      {/* Issue Quantity input box */}
                                      <input
                                        className="form-control form-sz mb-2"
                                        placeholder="Issue Quantity"
                                        name={`issueQty-${index}`}
                                        value={qty[index] || ""}
                                        onChange={(e) =>
                                          handleQtyChange(e, index)
                                        }
                                        disabled={
                                          selectedIssueRequest.issueStatus === 2
                                        }
                                      />
                                    </td>
                                    <td>
                                      {/* Displaying Balance Quantity (adjust the logic based on your requirement) */}
                                      {item.balanceQty}
                                    </td>
                                    <td>
                                      {/* Button for issuing kit in this row */}
                                      {selectedIssueRequest.issueStatus !==
                                        2 ? (
                                        <Button
                                          variant="contained"
                                          onClick={() => handleIssueKit(item)}
                                        >
                                          Issue
                                        </Button>
                                      ) : (
                                        <div>
                                          <img
                                            src="/checked1.png"
                                            alt="completed-status-icon"
                                            style={{ width: 30, height: 30, margin: "auto" }}
                                          />
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {selectedIssueRequest?.irType === "IR_KIT" && (
                      <>
                        {/* <div className="ms-4">Kit No : </div> */}
                        <div className="ms-1">
                          {/* Displaying kitName and kitQty in a table */}
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Kit Name</th>
                                <th>Kit Quantity</th>
                                <th>Issue Quantity</th>
                                <th>Balance Quantity</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedIssueRequest?.issueItemVO.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <td>{item.kitName}</td>
                                    <td>{item.kitQty}</td>
                                    <td>
                                      {/* Issue Quantity input box */}
                                      <input
                                        className="form-control form-sz mb-2"
                                        placeholder="Issue Quantity"
                                        name={`issueQty-${index}`}
                                        value={qty[index] || ""}
                                        disabled={
                                          selectedIssueRequest.issueStatus === 2
                                        }
                                        onChange={(e) =>
                                          handleQtyChange(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      {/* Displaying Balance Quantity (adjust the logic based on your requirement) */}
                                      {item.balanceQty}
                                    </td>
                                    <td>
                                      {/* Button for issuing kit in this row */}
                                      {selectedIssueRequest.issueStatus !==
                                        2 ? (
                                        <Button
                                          variant="contained"
                                          onClick={() => handleIssueKit(item)}
                                        >
                                          Issue
                                        </Button>
                                      ) : (
                                        <div>
                                          <img
                                            src="/checked1.png"
                                            alt="completed-status-icon"
                                            style={{ width: 30, height: 30, margin: "auto" }}
                                          />
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                  {/* <div className="col-lg-6 text-dark mt-3">
                    Demand Qty : {selectedIssueRequest?.totalIssueItem}
                  </div> */}
                  <div className="col-lg-6 mt-3 font-bold text-xl"></div>
                  <div className="your-form-container d-flex flex-wrap"></div>
                </DialogContentText>
              </DialogContent>

              <DialogContentText>
                <center className="text-dark mb-2">
                  Issued by AIPACKS - Karthi-19/01/2024-10:00AM
                </center>
              </DialogContentText>
            </Dialog>

            {/* Inprogress Modal */}

            <Dialog
              fullWidth={true}
              maxWidth={"sm"}
              open={isInProgressPopupOpen}
              onClose={closeInProgressPopup}
            >
              <div className="d-flex justify-content-between">
                <DialogTitle>Issue Manifest</DialogTitle>
                <IoMdClose
                  className="cursor-pointer w-8 h-8 mt-3 me-3"
                  onClick={closeInProgressPopup}
                />
              </div>

              <div className="d-flex justify-content-center">
                <DialogActions className="mb-2 me-2">
                  {/* <Button onClick={closePendingPopup}>Cancel</Button> */}
                  <Button
                    component="label"
                    variant="contained"
                    onClick={closePendingPopup}
                  >
                    Proceed
                  </Button>
                </DialogActions>
              </div>
              <DialogContentText>
                <center className="text-dark mb-2">
                  Issued by AIPACKS - Karthi-19/01/2024-10:00AM
                </center>
              </DialogContentText>
            </Dialog>

            {/* Issued Manifest Modal */}
          </>
        </div>
      </div>
    </>
  );
}
export default IssueManifest;
