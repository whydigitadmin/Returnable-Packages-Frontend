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

export const EmitterOutward = () => {
  const [selectedFlow, setSelectedFlow] = React.useState("");
  const [flowData, setFlowData] = React.useState([]);
  const [emitterId, setEmitterId] = React.useState("");
  const [kit, setKit] = React.useState("");
  const [kitQty, setKitQty] = React.useState("");
  const [netQtyReceived, setNetQtyReceived] = React.useState("");
  const [displayFlowName, setDisplayFlowName] = React.useState();
  const [outwardVO, setOutwardVO] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );

  useEffect(() => {
    getDisplayName();
    if (selectedFlow) {
      getOutwardDetails();
    }
  }, [selectedFlow]);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userId}`
      );

      if (response.status === 200) {
        setEmitterId(response.data.paramObjectsMap.userVO.customersVO.id);
        getAddressById();
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

  const getOutwardDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/emitterOutward/v1`,
        {
          params: {
            orgId: orgId,
            // emitterId: value,
            flowId: selectedFlow,
          },
        }
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setOutwardVO(response.data.paramObjectsMap.emitterOutwardVO);
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

  const handlePendingStatusClickIssued = (kitNumber, netQtyReceived) => {
    setPendingPopupOpenIssued(true);
    setKit(kitNumber);
    setNetQtyReceived(netQtyReceived);
  };

  const closePendingPopupIssued = () => {
    setPendingPopupOpenIssued(false);
    // setNetQty("");
    // setReturnQty("");
    // setReturnReason("");
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <p className="ml-5 mt-3 text-2xl">
              <strong>Outward</strong>
            </p>
            <div className="col-lg-1">
              <div className="d-flex justify-content-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8 mt-4" />
                </Link>
              </div>
            </div>
            <div className="col-lg-5 card bg-base-100 shadow-xl mt-3 h-28">
              <div className="p-1">
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
                    Issued To -
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
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1">
                  {displayFlowName}
                </h4>
              </div>
            </div>
          </div>
          <TitleCard title="Outward Manifest" topMargin="mt-2">
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Update</th>
                    <th>Rm No</th>
                    <th>RM DATE</th>
                    {/* <th>Demand Date</th> */}
                    <th>IM No</th>
                    <th>IM Date</th>
                    <th>REC Date</th>
                    <th>Kit</th>
                    {/* <th>Kit Qty</th> */}
                    <th>Net Rec Qty</th>
                    <th>Return Qty</th>
                    <th>Bal Qty</th>
                    <th>Cycle Time (days) </th>
                    {/* <th>Emitter Inv no</th>
                    <th>Previous dispatch</th>
                    <th>O2O - TAT</th> */}
                  </tr>
                </thead>
                <tbody>
                  {outwardVO.map((l, k) => {
                    return (
                      <tr key={k}>
                        {/* <td>{getPaymentStatus(l.status)}</td> */}
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
                            onClick={() =>
                              handlePendingStatusClickIssued(
                                l.kitNumber,
                                l.netQtyReceived
                              )
                            }
                          />
                        </td>
                        <td>{l.rmNo}</td>
                        <td>{l.rmDate}</td>
                        <td>{l.imNo}</td>
                        <td>{l.imDate}</td>
                        <td>{l.inwardConfirmDate}</td>
                        <td>{l.kitNumber}</td>
                        <td>{l.netQtyReceived}</td>
                        <td>{l.kitReturnQTY}</td>
                        <td>{l.balanceQTY}</td>
                        <td>{l.cycletime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {outwardVO.length === 0 && (
                <h4 className="text-base dark:text-slate-300 font-semibold fst-italic text-center mt-4">
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
              <DialogTitle>Outward Manifest</DialogTitle>
              <IoMdClose
                className="cursor-pointer w-8 h-8 mt-3 me-3"
                onClick={closePendingPopupIssued}
              />
            </div>
            <DialogContent>
              <div className="d-flex flex-column mb-4">
                <div className="d-flex justify-content-between">
                  <p className="font-medium">
                    Kit: <span className="font-bold">{kit}</span>
                  </p>
                  <p className="font-medium">
                    Net Received Quantity:{" "}
                    <span className="font-bold">{netQtyReceived}</span>
                  </p>
                </div>
                {/* <div className="d-flex justify-content-between">
                  <p className="font-medium me-5">
                    Previous dispatched date:{" "}
                    <span className="font-bold">2024-03-17</span>
                  </p>
                  <p className="font-medium">
                    Kit Qty: <span className="font-bold">2</span>
                  </p>
                </div> */}
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <label className="label">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      KIT Qty
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    className="form-control form-sz mb-2"
                    type={"number"}
                    placeholder={""}
                    name="kitQty"
                    value={kitQty}
                    // onChange={handleInputChange}
                    max="9999"
                    maxLength="4"
                  />
                  {errors.kitQty && (
                    <span className="error-text">{errors.kitQty}</span>
                  )}
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
                  Confirm
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
};
