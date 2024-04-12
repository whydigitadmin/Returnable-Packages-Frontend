import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TitleCard from "../../components/Cards/TitleCard";

export const EmitterOutward = () => {
  const [selectedFlow, setSelectedFlow] = React.useState("");
  const [flowData, setFlowData] = React.useState([]);
  const [kitNO, setKitNO] = React.useState("");
  const [kitQty, setKitQty] = React.useState();
  const [balanceQty, setBalanceQty] = React.useState();
  const [netQtyReceived, setNetQtyReceived] = React.useState("");
  const [emitterOutwarId, setEmitterOutwarId] = React.useState("");
  const [displayFlowName, setDisplayFlowName] = React.useState();
  const [outwardVO, setOutwardVO] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );

  useEffect(() => {
    getAddressById();
    if (selectedFlow) {
      getOutwardDetails();
    }
  }, [selectedFlow]);

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
      toast.error("Network Error!");
    }
  };

  const getOutwardDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/emitterOutward/v1`,
        {
          params: {
            orgId: orgId,
            flowId: selectedFlow,
          },
        }
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setOutwardVO(response.data.paramObjectsMap.emitterOutwardVO.reverse());
      }
    } catch (error) {
      toast.error("Network Error!");
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
      toast.error("Network Error!");
    }
  };

  const handleSelectedFlow = (event) => {
    setSelectedFlow(event.target.value);
    getFlowNameById(event.target.value);
  };

  const handlePendingStatusClickIssued = (
    kitNumber,
    netQtyReceived,
    emitterOutwarId,
    balanceQTY
  ) => {
    setPendingPopupOpenIssued(true);
    setKitNO(kitNumber);
    setNetQtyReceived(netQtyReceived);
    setEmitterOutwarId(emitterOutwarId);
    setBalanceQty(balanceQTY);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "kitQty":
        if (value.length <= 4) {
          setKitQty(value);
          console.log("kitQty", value);
        }
        break;
    }
  };

  const handleUpdateInward = () => {
    const errors = {};
    if (!kitQty) {
      errors.kitQty = "kit Qty is required";
    }

    if (kitQty > balanceQty) {
      errors.kitQty = "kit qty is higher than balance qty";
    }
    if (Object.keys(errors).length === 0) {
      const requestData = {
        issueItemId: emitterOutwarId,
        kitNO,
        kitQty,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/updateOutwardKitQty`,
          requestData
        )
        .then((response) => {
          console.log("Response for UPADTE OUTWARD:", response.data);
          setPendingPopupOpenIssued(false);
          getOutwardDetails();
          setKitQty("");
          setErrors("");
          toast.success("Outward Qty updated");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Network Error!");
        });
    } else {
      setErrors(errors);
    }
  };

  const closePendingPopupIssued = () => {
    setPendingPopupOpenIssued(false);
    setKitQty("");
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <p className="ml-5 mt-3 text-2xl">
              <strong>Bin Outward</strong>
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
          <TitleCard title="" topMargin="mt-2">
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
                    <th>KIT</th>
                    {/* <th>kit Qty</th> */}
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
                  {outwardVO &&
                    outwardVO.map((l, k) => {
                      const balanceQtyy = l.netQtyReceived - l.kitReturnQTY;
                      const isUpdateBlocked =
                        l.netQtyReceived === l.kitReturnQTY;
                      return (
                        <tr key={k}>
                          {/* <td>{getPaymentStatus(l.status)}</td> */}
                          <td>
                            {isUpdateBlocked ? (
                              <img
                                src="/checked1.png"
                                alt="Favorite"
                                style={{
                                  width: "25px",
                                  height: "auto",
                                  marginRight: "6px",
                                  cursor: "no-drop", // Change cursor type
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
                                    l.kitNumber,
                                    l.netQtyReceived,
                                    l.issueItemId,
                                    balanceQtyy
                                  )
                                }
                              />
                            )}
                          </td>
                          <td>{l.rmNo}</td>
                          <td>{l.rmDate}</td>
                          <td>{l.imNo}</td>
                          <td>{l.imDate}</td>
                          <td>{l.inwardConfirmDate}</td>
                          <td>{l.kitNumber}</td>
                          <td>{l.netQtyReceived}</td>
                          <td>{l.kitReturnQTY}</td>
                          <td>{balanceQtyy}</td>
                          <td>{l.cycletime}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {outwardVO && outwardVO.length === 0 && (
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
            <div>
              <ToastContainer />
            </div>
            <div className="d-flex justify-content-between">
              <DialogTitle>Bin Outward</DialogTitle>
              <IoMdClose
                className="cursor-pointer w-8 h-8 mt-3 me-3"
                onClick={closePendingPopupIssued}
              />
            </div>
            <DialogContent>
              <div className="d-flex flex-column mb-4">
                <div className="d-flex justify-content-between">
                  <p className="font-medium">
                    Kit :&nbsp; <span className="font-bold">{kitNO}</span>
                  </p>
                  <p className="font-medium">
                    Net Received Qty : &nbsp;
                    <span className="font-bold">{netQtyReceived}</span>
                  </p>
                  <p className="font-medium">
                    Balance Qty : &nbsp;
                    <span className="font-bold">{balanceQty}</span>
                  </p>
                </div>
                {/* <div className="d-flex justify-content-between">
                  <p className="font-medium me-5">
                    Previous dispatched date:{" "}
                    <span className="font-bold">2024-03-17</span>
                  </p>
                  <p className="font-medium">
                    kit Qty: <span className="font-bold">2</span>
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
                      Kit Qty
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
                    onChange={handleInputChange}
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
                  onClick={handleUpdateInward}
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
