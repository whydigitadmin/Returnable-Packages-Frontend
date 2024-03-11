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
  const [assignedFlow, setAssignFlow] = React.useState("");
  const [displayFlowName, setDisplayFlowName] = React.useState();
  const [inwardVO, setInwardVO] = React.useState([]);
  const [netQty, setNetQty] = React.useState("");
  const [returnQty, setReturnQty] = React.useState("");
  const [returnReason, setReturnReason] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
  const [selectedPendingBill, setSelectedPendingBill] = useState(null);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));

  useEffect(() => {
    getDisplayName();
    getInwardDetails();
  }, [assignedFlow]);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userId}`
      );

      if (response.status === 200) {
        getAddressById(response.data.paramObjectsMap.userVO.customersVO.id);
        getInwardDetails(response.data.paramObjectsMap.userVO.customersVO.id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAddressById = async (value) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllFlowName?emitterId=${value}&orgId=${orgId}`
      );

      if (response.status === 200) {
        const validFlows = response.data.paramObjectsMap.Flows.filter(
          (flow) => typeof flow.flow === "string" && flow.flow.trim() !== ""
        ).map((flow) => ({ flowid: flow.flowid, flow: flow.flow }));
        setFlowData(validFlows);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getInwardDetails = async (value) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/viewEmitterInward`,
        {
          params: {
            orgId: orgId,
            emitterId: value,
            flowId: assignedFlow,
          },
        }
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        const InwardVO =
          response.data.paramObjectsMap.vwEmitterInwardVO.vwEmitterInwardVO;
        setInwardVO(
          response.data.paramObjectsMap.vwEmitterInwardVO.vwEmitterInwardVO
        );
        console.log("InwardVO", InwardVO);
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
    setAssignFlow(event.target.value);
    getFlowNameById(event.target.value);
  };

  const handlePendingStatusClickIssued = () => {
    setPendingPopupOpenIssued(true);
  };

  const closePendingPopupIssued = () => {
    setPendingPopupOpenIssued(false);
    setNetQty("");
    setReturnQty("");
    setReturnReason("");
  };

  const handleNetQtyReceivedChange = (event) => {
    let input = event.target.value;
    input = input.replace(/[^0-9]/g, "");
    if (input.length > 4) {
      input = input.slice(0, 4);
    }
    setNetQty(input);
  };

  const handleReturnQtyChange = (event) => {
    let input = event.target.value;
    input = input.replace(/[^0-9]/g, "");
    if (input.length > 4) {
      input = input.slice(0, 4);
    }
    setReturnQty(input);
  };

  const handleReturnReasonChange = (event) => {
    setReturnReason(event.target.value);
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
            {/* <div className="col-lg-4 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 14 }}
                  />
                  <h4 className="text-xl font-semibold pt-1 mt-2 ms-1 mb-2">
                    Location -
                  </h4>
                  <h4 className="text-2xl font-semibold ms-1 mt-2">Gabriel</h4>
                </div>
              </div>
              <p className="mb-3">
                29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                Pune, Maharashtra, 410501 India
              </p>
            </div> */}
            {/* <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 70 }}
              />
            </div> */}
            <div className="col-lg-5 card bg-base-100 shadow-xl mt-3 h-28">
              <div className="p-2">
                <div className="d-flex flex-row">
                  {/* <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  /> */}
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
                    // onChange={(e) => setSelectedFlow(e.target.value)}
                    onChange={handleSelectedFlow}
                  >
                    <option value="">Select a Flow</option>
                    {flowData &&
                      flowData.map((flowName) => (
                        <option key={flowName.flowid} value={flowName.flowid}>
                          {flowName.flow}
                        </option>
                      ))}
                  </select>
                </div>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1 mb-2">
                  {displayFlowName}
                </h4>
                {/* <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p> */}
              </div>
            </div>
          </div>
          <TitleCard title="Inward Manifest" topMargin="mt-2">
            {/* Invoice list in table format loaded constant */}
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Update</th>
                    <th>RM No.</th>
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
                          <img
                            src="/edit1.png"
                            alt="Favorite"
                            style={{
                              width: "25px",
                              height: "auto",
                              marginRight: "6px",
                              cursor: "pointer",
                            }}
                            onClick={() => handlePendingStatusClickIssued(l)} // Call handlePendingStatusClickIssued function with the bill object
                          />
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
                <h4 className="text-base dark:text-slate-300 font-semibold text-center mt-4">
                  Data Not Found..!!
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
                    type={"text"}
                    placeholder={""}
                    value={netQty}
                    onChange={handleNetQtyReceivedChange}
                    max={4}
                  />
                  {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
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
                    onChange={handleReturnQtyChange}
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
                    value={returnReason}
                    onChange={handleReturnReasonChange}
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
                  onClick={closePendingPopupIssued}
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
