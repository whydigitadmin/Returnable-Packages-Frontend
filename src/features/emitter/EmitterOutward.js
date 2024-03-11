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
  const [assignedFlow, setAssignFlow] = React.useState("");
  const [displayFlowName, setDisplayFlowName] = React.useState();
  const [inwardVO, setInwardVO] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );

  useEffect(() => {
    getDisplayName();
    // getOutwardDetails();
  }, [assignedFlow]);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userId}`
      );

      if (response.status === 200) {
        getAddressById(response.data.paramObjectsMap.userVO.customersVO.id);
        // getOutwardDetails(response.data.paramObjectsMap.userVO.customersVO.id);
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

  // const getOutwardDetails = async (value) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/emitter/viewEmitterInward`,
  //       {
  //         params: {
  //           orgId: orgId,
  //           emitterId: value,
  //           flowId: assignedFlow,
  //         },
  //       }
  //     );
  //     console.log("Response from API:", response.data);
  //     if (response.status === 200) {
  //       const InwardVO =
  //         response.data.paramObjectsMap.vwEmitterInwardVO.vwEmitterInwardVO;
  //       setInwardVO(
  //         response.data.paramObjectsMap.vwEmitterInwardVO.vwEmitterInwardVO
  //       );
  //       console.log("InwardVO", InwardVO);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

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
              <div className="p-1">
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
                        <option key={flowName.flowid} value={flowName.flowid}>
                          {flowName.flow}
                        </option>
                      ))}
                  </select>
                </div>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1">
                  {displayFlowName}
                </h4>
                {/* <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p> */}
              </div>
            </div>
          </div>
          <TitleCard title="Outward Manifest" topMargin="mt-2">
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Update</th>
                    <th>Part No</th>
                    <th>Part name</th>
                    <th>Part Qty</th>
                    <th>Kit No</th>
                    <th>Kit Qty</th>
                    <th>Balance kit</th>
                    <th>Emitter Inv no</th>
                    <th>Cycle Time (days) </th>
                    <th>Previous dispatch</th>
                    <th>O2O - TAT</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {bills.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{getPaymentStatus(l.status)}</td>
                    <td>{l.partno}</td>
                    <td>{l.partname}</td>
                    <td>{l.partqty}</td>
                    <td>{l.kitno}</td>
                    <td>{l.kitqty}</td>
                    <td>{l.balancekit}</td>
                    <td>{l.invoiceno}</td>
                    <td>{l.cycletime}</td>
                    <td>{l.previous}</td>
                    <td>{l.o2o}</td>
                  </tr>
                );
              })} */}
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
              <DialogTitle>Outward Manifest</DialogTitle>
              <IoMdClose
                className="cursor-pointer w-8 h-8 mt-3 me-3"
                onClick={closePendingPopupIssued}
              />
            </div>
            <DialogContent>
              <div className="row">
                <div className="col-lg-6 col-md-6 mb-2">
                  <label className="label">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      Part no
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 mb-2">
                  <input
                    className="form-control form-sz mb-2"
                    type={"text"}
                    placeholder={""}
                    // name="storageMapping"
                    // value={storageMapping}
                    // onChange={handleInputChange}
                  />
                  {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
                </div>
                <div className="col-lg-6 col-md-6 mb-2">
                  <label className="label">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      Part name
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 mb-2">
                  <input
                    className="form-control form-sz mb-2"
                    type={"text"}
                    placeholder={""}
                    // name="storageMapping"
                    // value={storageMapping}
                    // onChange={handleInputChange}
                  />
                  {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
                </div>
                <div className="col-lg-6 col-md-6">
                  <label className="label">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      Part Qty
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    className="form-control form-sz mb-2"
                    type={"text"}
                    placeholder={""}
                    // name="storageMapping"
                    // value={storageMapping}
                    // onChange={handleInputChange}
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
