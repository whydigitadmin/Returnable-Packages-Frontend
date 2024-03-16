import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";

function EmitterInward() {
  const [flowData, setFlowData] = React.useState([]);
  const [selectedFlow, setSelectedFlow] = React.useState("");
  const [emitterId, setEmitterId] = React.useState("");
  const [displayFlowName, setDisplayFlowName] = React.useState();
  const [inwardVO, setInwardVO] = React.useState([]);
  const [issueItemInwardId, setIssueItemInwardId] = React.useState("");
  const [itemId, setItemId] = React.useState("");
  const [showNetQtyRecieved, setShowNetQtyRecieved] = React.useState("");
  const [netQtyRecieved, setNetQtyRecieved] = React.useState("");
  const [returnQty, setReturnQty] = React.useState("");
  const [returnReason, setReturnReason] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));

  useEffect(() => {
    getDisplayName();
    if (emitterId && selectedFlow) {
      getInwardDetails();
    }
  }, [emitterId, selectedFlow]);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userId}`
      );

      if (response.status === 200) {
        getAddressById();
        setEmitterId(response.data.paramObjectsMap.userVO.customersVO.id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAddressById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/getFlowByUserId?userId=${userId}`
      );

      if (response.status === 200) {
        const validFlows = response.data.paramObjectsMap.flowVO
          .filter(
            (flow) =>
              typeof flow.flowName === "string" && flow.flowName.trim() !== ""
          )
          .map((flow) => ({ id: flow.id, flow: flow.flowName }));
        setFlowData(validFlows);
        console.log("validFlows", validFlows);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getInwardDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/viewEmitterInward`,
        {
          params: {
            orgId: orgId,
            emitterId: emitterId,
            flowId: selectedFlow,
          },
        }
      );
      if (response.status === 200) {
        setInwardVO(
          response.data.paramObjectsMap.vwEmitterInwardVO.vwEmitterInwardVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFlowNameById = async (value) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${value}`
      );

      if (response.status === 200) {
        setDisplayFlowName(response.data.paramObjectsMap.flowVO.flowName);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectedFlow = (event) => {
    setSelectedFlow(event.target.value);
    getFlowNameById(event.target.value);
  };

  const handlePendingStatusClickIssued = (
    issueItemInwardId,
    itemId,
    issuedQty
  ) => {
    setIssueItemInwardId(issueItemInwardId);
    setItemId(itemId);
    setShowNetQtyRecieved(issuedQty);
    setPendingPopupOpenIssued(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "netQtyRecieved":
        if (value.length <= 4) {
          setNetQtyRecieved(value);
        }
        break;
      case "returnQty":
        if (value.length <= 4) {
          setReturnQty(value);
        }
        break;
      case "returnReason":
        setReturnReason(value);
        break;
    }
  };

  const handleUpdateInward = () => {
    const errors = {};
    if (!netQtyRecieved) {
      errors.netQtyRecieved = "Kit Qty is required";
    }
    if (Object.keys(errors).length === 0) {
      const requestData = {
        id: issueItemInwardId,
        issueItemId: itemId,
        netQtyRecieved,
        returnQty: returnQty ? returnQty : 0,
        status: returnReason ? returnReason : 0,
      };
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/emitter/emitterInward`,
          requestData
        )
        .then((response) => {
          console.log("Response for UPADTE INWARD:", response.data);
          setPendingPopupOpenIssued(false);
          getInwardDetails();
          setNetQtyRecieved("");
          setReturnQty("");
          setReturnReason("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const closePendingPopupIssued = () => {
    setPendingPopupOpenIssued(false);
    setNetQtyRecieved("");
    setReturnQty("");
    setReturnReason("");
    setErrors("");
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <p className="ml-5 mt-3 text-2xl">
              <strong>Inward</strong>
            </p>
            <div className="col-lg-1">
              <div className="d-flex justify-content-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8 mt-4" />
                </Link>
              </div>
            </div>
            <div className="col-lg-5 card bg-base-100 shadow-xl mt-3 h-28">
              <div className="p-2">
                <div className="d-flex flex-row">
                  <img
                    src="/destination.png"
                    alt="Favorite"
                    style={{
                      width: "30px",
                      height: "25px",
                      marginRight: "6px",
                      marginTop: "12px",
                    }}
                  />
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-2 mb-2">
                    Flow To -
                  </h4>
                  <select
                    className="form-select w-72 h-10 mt-1 mb-2"
                    value={selectedFlow}
                    onChange={handleSelectedFlow}
                  >
                    <option value="">Select a Flow</option>
                    {flowData &&
                      flowData.map((flowName) => (
                        <option key={flowName.id} value={flowName.id}>
                          {flowName.flow}
                        </option>
                      ))}
                  </select>
                </div>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1 mb-2">
                  {displayFlowName}
                </h4>
              </div>
            </div>
          </div>
          <TitleCard title="Inward Manifest" topMargin="mt-2">
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Update</th>
                    <th>RM No</th>
                    <th>RM Date</th>
                    <th>Demand Date</th>
                    <th>IM No</th>
                    <th>IM Date</th>
                    <th>Kit No</th>
                    <th>Flow</th>
                    <th>Req Qty</th>
                    <th>Issued Qty</th>
                    <th>Net Rec Qty</th>
                    <th>Return</th>
                    <th>TAT (Hrs)</th>
                    <th>Part</th>
                  </tr>
                </thead>
                <tbody>
                  {inwardVO.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>
                          {l.netRecAcceptStatus ? (
                            <img
                              src="/edit1.png"
                              alt="Favorite"
                              style={{
                                width: "25px",
                                height: "auto",
                                marginRight: "6px",
                                cursor: "not-allowed",
                              }}
                            />
                          ) : (
                            <img
                              src="/edit1.png"
                              alt="Favorite"
                              style={{
                                width: "25px",
                                height: "auto",
                                marginRight: "6px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handlePendingStatusClickIssued(
                                  l.issueItemInwardId,
                                  l.itemId,
                                  l.issuedQty
                                )
                              }
                            />
                          )}
                          {/* <img
                            src="/edit1.png"
                            alt="Favorite"
                            style={{
                              width: "25px",
                              height: "auto",
                              marginRight: "6px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handlePendingStatusClickIssued(
                                l.issueItemInwardId,
                                l.itemId,
                                l.issuedQty
                              )
                            }
                          /> */}
                        </td>
                        <td>{l.requestId}</td>
                        <td>{l.requestedDate}</td>
                        <td>{l.demandDate}</td>
                        <td>{l.issueItemInwardId}</td>
                        <td>{l.reachedDate}</td>
                        <td>{l.kitName}</td>
                        <td>{l.flowName}</td>
                        <td>{l.kitQty}</td>
                        <td>{l.issuedQty}</td>
                        <td>{l.netQtyRecieved}</td>
                        <td>{l.returnQty}</td>
                        <td>{l.tat}</td>
                        <td>{l.partName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {inwardVO.length === 0 && (
                <h4 className="text-base dark:text-slate-300 font-semibold text-center fst-italic mt-4">
                  No records to display..!!
                </h4>
              )}
            </div>
          </TitleCard>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={isPendingPopupOpenIssued}
            onClose={closePendingPopupIssued}
          >
            <div className="d-flex justify-content-between">
              <DialogTitle>Inward Manifest</DialogTitle>
              <IoMdClose
                className="cursor-pointer w-8 h-8 mt-3 me-3"
                onClick={closePendingPopupIssued}
              />
            </div>
            <DialogContent>
              <p className="font-bold mb-4">
                Issued Quantity {showNetQtyRecieved}
              </p>
              <div className="row">
                <div className="col-lg-4 col-md-4 mb-2">
                  <label className="label">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      Net Qty Received
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 mb-2">
                  <input
                    className="form-control form-sz mb-2"
                    type={"number"}
                    placeholder={""}
                    name="netQtyRecieved"
                    value={netQtyRecieved}
                    onChange={handleInputChange}
                    max="9999"
                    maxLength="4"
                  />
                  {errors.netQtyRecieved && (
                    <span className="error-text">{errors.netQtyRecieved}</span>
                  )}
                </div>
                <div className="col-lg-4 col-md-4 mb-2">
                  <label className="label">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      Return Qty
                      {/* <FaStarOfLife className="must" /> */}
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 mb-2">
                  <input
                    className="form-control form-sz mb-2"
                    type={"text"}
                    placeholder={""}
                    value={returnQty}
                    name="returnQty"
                    onChange={handleInputChange}
                    max="9999"
                    maxLength="4"
                  />
                  {errors.returnQty && (
                    <span className="error-text">{errors.returnQty}</span>
                  )}
                </div>
                <div className="col-lg-4 col-md-6">
                  <label className="label">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      Reason for Return
                      {/* <FaStarOfLife className="must" /> */}
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    className="form-control form-sz mb-2"
                    type={"text"}
                    placeholder={""}
                    name="returnReason"
                    value={returnReason}
                    onChange={handleInputChange}
                  />
                  {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
                </div>
              </div>
            </DialogContent>
            <div className="d-flex justify-content-center">
              <DialogActions className="mb-2 me-2">
                <Button
                  component="label"
                  variant="contained"
                  onClick={handleUpdateInward}
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
        </div>
      </div>
    </>
  );
}
export default EmitterInward;
