import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BinOutward() {
  const [flow, setFlow] = React.useState("");
  const [flowData, setFlowData] = React.useState([]);
  const [kitData, setKitData] = useState([]);
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [kit, setKit] = useState("");
  const [orgin, setOrgin] = useState("");
  const [receiver, setReceiver] = useState("");
  const [destination, setDestination] = useState("");
  const [outwardKitQty, setOutwardKitQty] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [emitterId, setEmitterId] = React.useState(
    localStorage.getItem("emitterId")
  );
  const [userName, setUserName] = useState("");
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getAddressById();
  }, []);

  const handleSelectedFlow = (event) => {
    const selectedId = event.target.value;
    setFlow(selectedId);
    getFlowDetailsByFlowId(selectedId);
    getkitNameById(selectedId);
  };

  const handleSelectedKit = (event) => {
    setKit(event.target.value);
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
        setUserName(userDetail.firstName);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const getFlowDetailsByFlowId = async (selectedId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${selectedId}`
      );

      if (response.status === 200) {
        setReceiver(response.data.paramObjectsMap.flowVO.receiver);
        setDestination(response.data.paramObjectsMap.flowVO.destination);
        setOrgin(response.data.paramObjectsMap.flowVO.orgin);
        console.log("receiverInfo", response.data.paramObjectsMap.flowVO);
        // setReceiverData([...receiverInfo]);
      }
    } catch (error) {
      // toast.error("Network Error!");
    }
  };

  const getkitNameById = async (selectedId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${selectedId}`
      );

      if (response.status === 200) {
        const kitDataArray =
          response.data.paramObjectsMap.flowVO.flowDetailVO.map((kit) => ({
            id: kit.id,
            kitName: kit.kitName,
          }));

        setKitData([...kitDataArray]);
      }
    } catch (error) {
      // toast.error("Network Error!");
    }
  };

  const getkitAssetDetailsByKitId = async (qty) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getkitAssetDetailsByKitId?kitCode=${kit}&quantity=${qty}`
      );

      if (response.status === 200) {
        setTableData(response.data.paramObjectsMap.kitAssetVO);
        console.log("kitAssetVO", response.data.paramObjectsMap.kitAssetVO);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const handleKitQty = (event) => {
    const qty = event.target.value;
    setOutwardKitQty(qty);
    getkitAssetDetailsByKitId(qty);
  };

  const handleSave = () => {
    const errors = {};
    if (!flow) {
      errors.flow = "Flow is required";
    }

    if (!kit) {
      errors.kit = "Kit is required";
    }

    if (!receiver) {
      errors.receiver = "Receiver is required";
    }

    if (!outwardKitQty) {
      errors.outwardKitQty = "Outward Kit Qty is required";
    }

    if (Object.keys(errors).length === 0) {
      const requestData = {
        binOutwardDetails: tableData,
        createdBy: userName,
        destination,
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        emitter: userName,
        emitterId,
        flow,
        kit,
        orgId,
        orgin,
        outwardKitQty,
        receiver,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/binOutward`,
          requestData
        )
        .then((response) => {
          console.log("Response for BIN OUTWARD:", response.data);
          setFlow("");
          setReceiver("");
          setKit("");
          setDestination("");
          setOutwardKitQty("");
          setErrors("");
          // toast.success("Outward Qty updated");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Network Error!");
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="row">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Bin Outward</strong>
                </span>
              </p>
            </div>
          </div>

          <div className="row mt-4">
            {/* DOC ID FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Doc Id:
                  {/* <FaStarOfLife className="must" /> */}
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                placeholder="Doc Id"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                // disabled={viewBinAllotmentId ? true : false}
                disabled
              />
              {errors.docId && (
                <span className="error-text mb-1">{errors.docId}</span>
              )}
            </div>
            {/* DOC DATE FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Doc Date:
                  {/* <FaStarOfLife className="must" /> */}
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={docDate}
                  onChange={(date) => setDocDate(date)}
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  format="DD/MM/YYYY"
                  disabled
                />
              </LocalizationProvider>
              {errors.docDate && (
                <span className="error-text mb-1">{errors.docDate}</span>
              )}
            </div>
            {/* STOCK BRANCH FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Flow
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <select
                className="form-select form-sz w-full mb-2"
                value={flow}
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
              {errors.flow && (
                <span className="error-text mb-1">{errors.flow}</span>
              )}
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Receiver
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                name="receiver"
                value={receiver}
                disabled
              />
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Destination
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                name="destination"
                value={destination}
                disabled
              />
            </div>
            {/* KIT NAME FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Kit
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <select
                className="form-select form-sz w-full mb-2"
                value={kit}
                onChange={handleSelectedKit}
              >
                <option value="" disabled>
                  Select a Kit
                </option>
                {kitData &&
                  kitData.map((kit) => (
                    <option key={kit.id} value={kit.kitName}>
                      {kit.kitName}
                    </option>
                  ))}
              </select>
              {errors.kit && (
                <span className="error-text mb-1">{errors.kit}</span>
              )}
            </div>
            {/* PART NAME FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Outward Kit Qty
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                name="outwardKitQty"
                value={outwardKitQty}
                onChange={handleKitQty}
              />
              {errors.outwardKitQty && (
                <span className="error-text mb-1">{errors.outwardKitQty}</span>
              )}
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Invoice no
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                name="invoice"
                // value={invoice}
                maxLength={15}
              />
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Dispatch remarks
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                name="dispatch"
                // value={dispatch}
              />
            </div>
          </div>
          <div className="mt-2">
            <button
              type="button"
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default BinOutward;
