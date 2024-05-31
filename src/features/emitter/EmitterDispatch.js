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

export const EmitterDispatch = () => {
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
  const [avlQty, setAvlQty] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [emitterId, setEmitterId] = React.useState(
    localStorage.getItem("emitterId")
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("displayName")
  );
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([
    {
      binOutId: "24BO10016",
      date: "29-05-2024",
      part: "PART1234",
      kit: "KIT1234",
      qty: 10,
    },
    {
      binOutId: "24BO10017",
      date: "29-05-2024",
      part: "PART12345",
      kit: "KIT12345",
      qty: 5,
    },
  ]);
  const [tableView, setTableView] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getAddressById();
    getOutwardDocId();
  }, []);

  const getOutwardDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByBinOutward`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.binOutwardDocId);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectedFlow = (event) => {
    const selectedId = event.target.value;
    setFlow(selectedId);
    getFlowDetailsByFlowId(selectedId);
    getkitNameById(selectedId);
    setTableView(true);
  };

  const handleSelectedKit = (event) => {
    const kitQty = event.target.value;
    setKit(kitQty);
    getAvailableKitQtyByEmitter(kitQty);
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
        // setUserName(userDetail.firstName);
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
            kitNo: kit.kitNo,
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
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const getAvailableKitQtyByEmitter = async (kitQty) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAvailableKitQtyByEmitter?emitterId=${emitterId}&flowId=${flow}&kitId=${kitQty}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setAvlQty(response.data.paramObjectsMap.avlKitQty[0].kitAvailQty);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const handleKitQty = (event) => {
    const qty = event.target.value;

    if (qty === "" || (parseInt(qty, 10) <= avlQty && parseInt(qty, 10) >= 0)) {
      setOutwardKitQty(qty);
      setErrors((prevErrors) => ({
        ...prevErrors,
        outwardKitQty: "",
      }));
      getkitAssetDetailsByKitId(qty);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        outwardKitQty: "Outward Kit Qty cannot exceed Available Kit Qty",
      }));
    }
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
        binOutwardDetailsDTO: tableData,
        createdBy: userName,
        destination,
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        emitter: displayName,
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
          setFlow("");
          setReceiver("");
          setKit("");
          setAvlQty("");
          setDestination("");
          setOutwardKitQty("");
          setErrors("");
          getOutwardDocId();
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

  const checkboxStyle = {
    width: "20px",
    height: "20px",
  };

  const handleCheckboxChange = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="row">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/welcomeemitter">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Emitter Dispatch</strong>
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
            {/* <div className="col-lg-2 col-md-4">
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
                    <option key={kit.id} value={kit.kitNo}>
                      {kit.kitNo}
                    </option>
                  ))}
              </select>
              {errors.kit && (
                <span className="error-text mb-1">{errors.kit}</span>
              )}
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Available Kit Qty
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                disabled
                value={avlQty}
              />
            </div>
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
            </div>*/}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Invoice no
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                name="invoice"
                maxLength={15}
              />
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Invoice Date:
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
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Dispatch remarks
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

          {tableView && (
            <>
              <div className="row mt-2">
                <div className="overflow-x-auto w-full ">
                  <table className="table table-hover w-full">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Bin Out Id</th>
                        <th>Date</th>
                        <th>Part</th>
                        <th>Kit</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={row.id}>
                          {/* <td>{index + 1}</td> */}
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(index)}
                              onChange={() => handleCheckboxChange(index)}
                              style={checkboxStyle}
                            />
                          </td>
                          <td>{row.binOutId}</td>
                          <td>{row.date}</td>
                          <td>{row.part}</td>
                          <td>{row.kit}</td>
                          <td>{row.qty}</td>
                          {/* <td>
                            <input
                              type="text"
                              value={row.outQty}
                              onChange={(e) =>
                                setTableData((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? { ...r, outQty: e.target.value }
                                      : r
                                  )
                                )
                              }
                              className={`form-control form-sz mb-2 ${
                                errors.qty && "border-red-500"
                              }`}
                              style={{ width: "50px" }}
                            />
                            {errors.qty && (
                              <span className="error-text mb-1">
                                {errors.qty}
                              </span>
                            )}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* {errors.tableData && (<div className="error-text mt-2">{errors.tableData}</div>)} */}
            </>
          )}

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
};

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
