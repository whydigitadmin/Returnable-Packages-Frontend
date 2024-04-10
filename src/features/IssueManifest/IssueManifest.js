import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import TitleCard from "../../components/Cards/TitleCard";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoRecordsFound from "../../utils/NoRecordsFound";

import GetAvailKitQty from "./GetAvailKitQty";

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
  const [errors, setErrors] = useState("");
  const [emitter, setEmitter] = useState("");
  const [emitterId, setEmitterId] = useState("");
  const [qty, setQty] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [selectedWarehouseId, setSelectedWarehouseId] = useState();
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [demoState, setDemoState] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [maxPartQty, setMaxPartQty] = useState("");
  const [kitQuantity, setKitQuantity] = useState("");
  const [selectedItemKit, setSelectedItemKit] = useState("");
  const [warehouseLocationId, setWarehouseLocationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableKitQty, setAvailableKitQty] = useState("");

  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(() => {
    getIssueRequest();
  }, [emitterId, bills]);

  const handleQtyChange = (e, index) => {
    const newQty = {
      ...qty,
      [index]: e.target.value,
    };
    // newQty[index] = e.target.value;
    setQty(newQty);
  };

  const openPendingPopup = () => {
    setPendingPopupOpen(true);
  };

  const closePendingPopup = () => {
    setPendingPopupOpen(false);
    setQty({});
    setSelectedItemIds("");
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

  // const handleIssueKit = () => {
  //   for (const itemId of selectedItemIds) {
  //     const issuedQty = qty[itemId];
  //     if (!issuedQty || issuedQty <= 0) {
  //       throw new Error("Issued quantity cannot be empty or zero");
  //     }
  //   }

  //   const formData = {
  //     approvedId: userId,
  //     approverName: userDetail.firstName,
  //     issueRequestId: selectedIssueRequest.id,
  //     issueRequestItemApprovelDTO: selectedItemIds.map((itemId) => ({
  //       issueItemId: itemId,
  //       issuedQty: qty[itemId] || 0, // Assuming qty is an object with item IDs as keys
  //     })),
  //   };

  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/api/emitter/issueRequestQtyApprovel`,
  //       formData
  //     )
  //     .then((response) => {
  //       console.log("Response:", response.data);
  //       getIssueRequest(emitterId);
  //       setToast(true);
  //       closePendingPopup();
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const availQty = (qty) => {
    console.log("AvailQty", qty);
    setAvailableKitQty(qty);
  };

  const handleIssueKit = () => {
    console.log("Available", availableKitQty);
    try {
      // Check if any issued quantity is empty
      // for (const itemId of selectedItemIds) {
      //   const issuedQty = qty[itemId];
      //   if (!issuedQty && issuedQty !== 0) {
      //     return; // Exit the function if any issued quantity is empty
      //   }
      // }
      // for (const itemId of selectedItemIds) {
      //   const issuedQty = qty[itemId];
      //   if (!issuedQty && issuedQty !== 0) {
      //     return; // Exit the function if any issued quantity is empty
      //   }
      //   if (issuedQty > availableKitQty) {
      //     return;
      //   }
      // }

      for (const itemId of selectedItemIds) {
        const issuedQty = qty[itemId];
        if (!issuedQty && issuedQty !== 0) {
          return; // Exit the function if any issued quantity is empty
        }

        if (issuedQty > availableKitQty) {
          toast.error(
            "Invalid quantity: Issued quantity cannot be greater than available quantity",
            {
              autoClose: 3000,
              theme: "colored",
            }
          );
          return; // Exit the function if any issued quantity is greater than available quantity
        }
        const kitQty = selectedIssueRequest?.issueItemVO.find(
          (item) => item.id === itemId
        )?.kitQty;
        if (issuedQty > kitQty) {
          toast.error(
            "Invalid quantity: Issued quantity cannot be greater than demand quantity",
            {
              autoClose: 3000,
              theme: "colored",
            }
          );
          return; // Exit the function if any issued quantity is greater than demand quantity
        }
      }

      // Prepare formData
      const formData = {
        approvedId: userId,
        approverName: userDetail.firstName,
        issueRequestId: selectedIssueRequest.id,
        issueRequestItemApprovelDTO: selectedItemIds.map((itemId) => ({
          issueItemId: itemId,
          issuedQty: qty[itemId] || 0,
        })),
      };

      // Make POST request only if issued quantity is not empty
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/issueRequestQtyApprovel`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          getIssueRequest(emitterId);
          closePendingPopup();
          toast.success("Bin issued successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {}
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

  const handleSelectItem = (itemId) => {
    const newSelectedItems = [...selectedItemIds];

    if (newSelectedItems.includes(itemId)) {
      // If the item is already selected, remove it
      const index = newSelectedItems.indexOf(itemId);
      newSelectedItems.splice(index, 1);
    } else {
      // If the item is not selected, add it to the list
      newSelectedItems.push(itemId);
    }

    setSelectedItemIds(newSelectedItems);
  };

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
        <div style={{ display: "flex" }}>
          <img
            src="/checked1.png"
            alt="completed-status-icon"
            style={{ width: 30, height: 30, margin: "auto", cursor: "pointer" }}
            onClick={() =>
              handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
            }
          />
          <img
            src="/download.png"
            alt="completed-status-icon"
            style={{ width: 30, height: 30, margin: "auto", cursor: "pointer" }}
          />
        </div>
      );
    else return <div className="badge badge-ghost">Unknown</div>;
  };

  const getPaymentStatusDummy = (issueStatus, selectedIssueRequest) => {
    const randomStatus = issueStatus;
    if (randomStatus === 0)
      return (
        <div>
          <img
            src="/pending.png"
            alt="pending-status-icon"
            title="Pending"
            // style={{ width: 30, height: 30, margin: "auto", cursor: "pointer" }}
          />
        </div>
      );
    if (randomStatus === 1)
      return (
        <div>
          <img
            src="/inprogress.png"
            alt="Inprogress-status-icon"
            // style={{ width: 40, height: 40, margin: "auto", cursor: "pointer" }}
          />
        </div>
      );
    if (randomStatus === 2)
      return (
        <div style={{ display: "flex" }}>
          <img
            src="/checked1.png"
            alt="completed-status-icon"
            style={{ width: 40, height: 40, margin: "auto", cursor: "pointer" }}
          />
          {/* <img
            src="/download.png"
            alt="completed-status-icon"
            style={{ width: 40, height: 40, margin: "auto", cursor: "pointer" }}
          /> */}
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

    setWarehouseLocationId(selectedWarehouse.warehouseId);
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

  const handlePartStudyUpdate = () => {
    const errors = {};

    if (!kitQuantity) {
      errors.kitQuantity = "Kit Quantity is required";
    }

    if (Object.keys(errors).length === 0) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/loadKitQty?kitQty=${kitQuantity}&irItemId=${selectedItemKit.id}`
        )
        .then((response) => {
          setErrors("");
          setKitQuantity("");
          getIssueRequest(emitterId);
          closePendingPopup();
          closeInProgressPopup();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const getKitQtyByPartId = async (item) => {
    setInProgressPopupOpen(true);
    setSelectedItemKit(item);
    console.log("partCheck", item);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/maxPartQtyPerKit?orgId=${orgId}&emitterId=${emitterId}&partNumber=${item.partNo}&flowId=${selectedIssueRequest.flowTo}`
      );

      if (response.status === 200) {
        setMaxPartQty(
          response.data.paramObjectsMap.maxPartQtyPerKitVO.MaxPartQtyPerKitVO[0]
        );
        getIssueRequest(emitterId);

        console.log("check", emitterId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getIssueRequest = async (selectedEmitterId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequest?orgId=${orgId}&emitterId=${selectedEmitterId}&warehouseLocationId=${warehouseLocationId}`
      );

      if (response.status === 200) {
        const issueRequests = response.data.paramObjectsMap.issueRequestVO;
        const reversedIssueRequests = issueRequests.reverse(); // Reverse the order of the array

        setBills(reversedIssueRequests);
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
                  <img
                    src="/location.png"
                    style={{
                      width: "28px",
                      height: "35px",
                      marginTop: "12px",
                      marginRight: "4px",
                    }}
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
                  {emitterLocationVO &&
                    emitterLocationVO.map((list) => (
                      <option key={list.id} value={list.warehouseLocation}>
                        {list.warehouseLocation}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-lg-1">
              <img
                src="	https://cdn-icons-png.flaticon.com/128/10246/10246448.png"
                width={85}
                height={40}
                style={{ marginTop: 50 }}
              ></img>
            </div>
            <div className="col-lg-5 card bg-base-100 shadow-xl ms-2 mt-3">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <img
                    src="/location.png"
                    style={{
                      width: "28px",
                      height: "35px",
                      marginTop: "12px",
                      marginRight: "4px",
                    }}
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
            <TitleCard title="" topMargin="mt-2">
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
                      {/* <th>Req Qty</th>
                      <th>KIT NO</th> */}
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
                                  <td rowSpan={issueRequest.issueItemVO.length}>
                                    {issueRequest.tat}
                                  </td>
                                  <td rowSpan={issueRequest.issueItemVO.length}>
                                    {issueRequest.totalIssueItem}
                                  </td>
                                  {/* <td>{issueRequest.kitQty}</td>
                                  <td>{issueRequest.kitName}</td> */}
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
                  <NoRecordsFound message="No Records to diaplay!" />
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
              <div>
                <ToastContainer />
              </div>
              <div className="d-flex justify-content-between">
                <DialogTitle>
                  Bin Allotment For{" "}
                  {selectedIssueRequest?.irType === "IR_PART" ? "Part" : "Kit"}
                </DialogTitle>
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
                    // style={{ marginLeft: "10px" }}
                  >
                    {selectedIssueRequest?.irType === "IR_PART" && (
                      <div>
                        <div className="ms-1">
                          {/* Displaying partName and partQty in a table */}

                          <table className="table">
                            <thead>
                              <tr>
                                <th>Select</th>
                                <th>Kit Name</th>
                                <th>Available Qty</th>
                                <th>Part Name</th>
                                <th>Demand Qty</th>
                                {selectedIssueRequest?.issueStatus !== 2 ? (
                                  <th>Issue Qty</th>
                                ) : (
                                  <th>Issued Qty</th>
                                )}
                                <th>Balance Qty</th>
                                <th>Update Kit Qty</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedIssueRequest?.issueItemVO.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <td>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            value={item.id}
                                            checked={selectedItemIds.includes(
                                              item.id
                                            )}
                                            onChange={() =>
                                              handleSelectItem(item.id)
                                            }
                                          />
                                        }
                                        label=""
                                      />
                                    </td>
                                    <td>{item.kitName}</td>
                                    <td>
                                      <GetAvailKitQty
                                        item={item}
                                        warehouseLocationId={
                                          warehouseLocationId
                                        }
                                        availQty={availQty}
                                      />
                                    </td>
                                    <td>{item.partName}</td>
                                    <td>{item.partQty}</td>
                                    {selectedIssueRequest?.issueStatus !== 2 ? (
                                      <td>
                                        {/* Issue Quantity input box */}
                                        <input
                                          className="form-control form-sz mb-2"
                                          placeholder="Issue Qty"
                                          name={`issueQty-${index}`}
                                          value={qty[item.id] || ""}
                                          disabled={
                                            !selectedItemIds.includes(
                                              item.id
                                            ) ||
                                            selectedIssueRequest.issueStatus ===
                                              2
                                          }
                                          onChange={(e) =>
                                            handleQtyChange(e, item.id)
                                          }
                                        />
                                      </td>
                                    ) : (
                                      <td>{item.issuedQty}</td>
                                    )}
                                    <td>{item.balanceQty}</td>
                                    <td>
                                      <div>
                                        <img
                                          src={
                                            "https://cdn-icons-png.flaticon.com/128/4059/4059902.png"
                                          }
                                          alt="will-issue-icon"
                                          style={{
                                            width: 40,
                                            height: 40,
                                            margin: "auto",
                                            cursor: "pointer",
                                          }}
                                          onClick={
                                            item.issueStatus !== 2
                                              ? () => getKitQtyByPartId(item)
                                              : null
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        {/* Button for issuing part in this row */}
                                        {selectedIssueRequest.issueStatus ===
                                        2 ? (
                                          // <Button
                                          //   variant="contained"
                                          //   onClick={() => handleIssueKit(item)}
                                          // >
                                          //   Issue
                                          // </Button>
                                          <div>
                                            <img
                                              src="/checked1.png"
                                              alt="completed-status-icon"
                                              style={{
                                                width: 30,
                                                height: 30,
                                                margin: "auto",
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div>
                                            <img
                                              src={"/will_issue.png"}
                                              alt="will-issue-icon"
                                              style={{
                                                width: 40,
                                                height: 40,
                                                margin: "auto",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                handleIssueKit(item)
                                              }
                                            />
                                          </div>
                                        )}
                                      </div>{" "}
                                    </td>{" "}
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
                          <table
                            className="table"
                            style={{
                              marginLeft:
                                selectedIssueRequest?.issueStatus !== 2
                                  ? "40px"
                                  : "80px",
                            }}
                          >
                            <thead>
                              <tr>
                                <th>Select</th>
                                <th>Kit Name</th>
                                <th>Available Kit</th>
                                <th>Demand Qty</th>
                                {selectedIssueRequest?.issueStatus !== 2 ? (
                                  <th>Issue Qty</th>
                                ) : (
                                  <th>Issued Qty</th>
                                )}

                                {/* <th>Balance Qty</th> */}
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedIssueRequest?.issueItemVO.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <td>
                                      {" "}
                                      <td>
                                        {/* Material-UI Checkbox for selecting item */}
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              value={item.id}
                                              checked={selectedItemIds.includes(
                                                item.id
                                              )}
                                              onChange={() =>
                                                handleSelectItem(item.id)
                                              }
                                            />
                                          }
                                          label=""
                                        />
                                      </td>
                                    </td>

                                    <td>{item.kitName}</td>
                                    <td>
                                      <GetAvailKitQty
                                        item={item}
                                        warehouseLocationId={
                                          warehouseLocationId
                                        }
                                        availQty={availQty}
                                      />
                                    </td>
                                    <td>{item.kitQty}</td>
                                    {selectedIssueRequest?.issueStatus !== 2 ? (
                                      <td>
                                        {/* Issue Quantity input box */}
                                        <input
                                          className="form-control form-sz mb-2"
                                          placeholder="Issue Qty"
                                          style={{ width: "50%" }}
                                          name={`issueQty-${index}`}
                                          value={qty[item.id] || ""}
                                          disabled={
                                            !selectedItemIds.includes(
                                              item.id
                                            ) ||
                                            selectedIssueRequest.issueStatus ===
                                              2
                                            // item.balanceQty === 0
                                            // availableKit < item.kitQty // Disable if available quantity is less than demand quantity
                                          }
                                          onChange={(e) =>
                                            handleQtyChange(e, item.id)
                                          }
                                        />
                                      </td>
                                    ) : (
                                      <td>{item.issuedQty}</td>
                                    )}

                                    <td>
                                      {/* Button for issuing part in this row */}
                                      {item.approvedStatus ? (
                                        // <Button
                                        //   variant="contained"
                                        //   onClick={() => handleIssueKit(item)}
                                        // >
                                        //   Issue
                                        // </Button>
                                        <div>
                                          <img
                                            src="/checked1.png"
                                            alt="completed-status-icon"
                                            style={{
                                              width: 30,
                                              height: 30,
                                              margin: "auto",
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <div>
                                          <img
                                            src={"/will_issue.png"}
                                            alt="will-issue-icon"
                                            style={{
                                              width: 40,
                                              height: 40,
                                              margin: "auto",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => handleIssueKit(item)}
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
                <DialogTitle>Update Kit</DialogTitle>
                <IoMdClose
                  className="cursor-pointer w-8 h-8 mt-3 me-3"
                  onClick={closeInProgressPopup}
                />
              </div>
              <DialogContent>
                <div>
                  Max part per kit :{" "}
                  {maxPartQty.partNumber === selectedItemKit.partNo &&
                    maxPartQty.maxPartQty}
                </div>
                <br></br>
                <TextField
                  label="Kit Quantity"
                  type="number"
                  value={kitQuantity}
                  onChange={(e) => setKitQuantity(e.target.value)}
                  fullWidth
                />
                {errors.kitQuantity && (
                  <span className="error-text">{errors.kitQuantity}</span>
                )}
              </DialogContent>

              <div className="d-flex justify-content-center">
                <DialogActions className="mb-2 me-2">
                  {/* <Button onClick={closePendingPopup}>Cancel</Button> */}
                  <Button
                    component="label"
                    variant="contained"
                    onClick={handlePartStudyUpdate}
                  >
                    Update
                  </Button>
                </DialogActions>
              </div>
              <DialogContentText>
                {/* <center className="text-dark mb-2">
                  Issued by AIPACKS - Karthi-19/01/2024-10:00AM
                </center> */}
              </DialogContentText>
            </Dialog>

            {/* Issued Manifest Modal */}
          </>
          <div>
            {" "}
            {/* {toast && (
              <ToastComponent content="Quantity issued" type="success" />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
export default IssueManifest;
