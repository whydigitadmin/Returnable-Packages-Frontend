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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

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
  const [tableData, setTableData] = useState([]);
  const [listViewButton, setListViewButton] = useState(false);
  // const [ListViewTableData, setListViewTableData] = useState([
  //   {
  //     id: 1,
  //     outwardId: "1000001",
  //     date: "15-05-2024",
  //     flow: "PUN-CH",
  //     outQty: "8",
  //     balQty: "42",
  //   },
  // ]);
  const [ListViewTableData, setListViewTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [savedRecordView, setSavedRecordView] = useState(false);

  useEffect(() => {
    getAddressById();
    getOutwardDocId();
    getAllBinOutward();
  }, []);

  // LISTVIEW API
  const getAllBinOutward = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinOutward?orgId=${orgId}`
      );

      if (response.status === 200) {
        console.log(
          "THE LISTVIEW DATA'S ARE:",
          response.data.paramObjectsMap.binOutwardVO
        );
        setListViewTableData(response.data.paramObjectsMap.binOutwardVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSavedRecordViewById = async (rowId) => {
    console.log("THE SELECTED ROW ID IS:", rowId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinOutwardByDocId?docId=24BO10009`
      );

      if (response.status === 200) {
        setSavedRecordView(true);

        console.log(
          "THE SELECTED ROW DATA IS:",
          response.data.paramObjectsMap.binOutwardVO
        );
        setSelectedRowData(response.data.paramObjectsMap.binOutwardVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const handleSavedRecordView = (e) => {
    setSavedRecordView(true);
  };
  const handleSavedRecordViewClose = (e) => {
    setSavedRecordView(false);
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="flex items-center">
            <Link to="/app/welcomeEmitter">
              <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
            </Link>
            <p className="text-2xl">
              <strong className="ml-4">Bin Outward</strong>
            </p>
            <div className="ml-auto">
              {" "}
              <button
                type="button"
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={(e) => {
                  setListViewButton(!listViewButton);
                }}
              >
                {listViewButton ? "Close" : "View"}
              </button>
            </div>
          </div>
          {listViewButton ? (
            <>
              {/* LISTVIEW TABLE */}
              <div className="row mt-4">
                <div className="overflow-x-auto w-full ">
                  <table className="table table-hover w-full">
                    <thead>
                      <tr>
                        <th>Doc Id</th>
                        <th>Date</th>
                        <th>Emitter</th>
                        <th>Receiver</th>
                        <th>Flow</th>
                        <th>Kit</th>
                        <th>Out Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ListViewTableData.map((row, index) => (
                        <tr key={row.id}>
                          {/* <td>{index + 1}</td> */}
                          <td>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSavedRecordViewById(row.docId);
                              }}
                              style={{ cursor: "pointer", color: "blue" }}
                            >
                              {row.docId}
                            </a>
                          </td>
                          <td>{row.docDate}</td>
                          <td>{row.emitter}</td>
                          <td>{row.receiver}</td>
                          <td>{row.flow}</td>
                          <td>{row.kitNo}</td>
                          <td>{row.outwardKitQty}</td>
                          {/* <td>{row.balQty}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
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
                        <option key={kit.id} value={kit.kitNo}>
                          {kit.kitNo}
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
                    <span className="error-text mb-1">
                      {errors.outwardKitQty}
                    </span>
                  )}
                </div>
                {/* <div className="col-lg-2 col-md-4">
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
                // value={invoice}
                maxLength={15}
              />
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
            </div> */}
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
            </>
          )}
        </div>
        <ToastContainer />
      </div>
      {/* VIEW MODAL */}
      <Dialog
        open={savedRecordView}
        onClose={handleSavedRecordViewClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
          <div className="row">
            <div className="col-md-11">
              <Typography variant="h6">Detailed View</Typography>
            </div>
            <div className="col-md-1">
              <IconButton
                onClick={handleSavedRecordViewClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="mt-3">
          <div className="row">
            <div className="overflow-x-auto w-full ">
              <table className="table table-hover w-full">
                <thead>
                  <tr>
                    <th>Outward ID</th>
                    <th>Date</th>
                    <th>Flow</th>
                    <th>Kit No</th>
                    <th>Receiver</th>
                    <th>Destination</th>
                    <th>Rec Kit QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRowData.map((row, index) => (
                    <tr key={row.id}>
                      <td> {row.docId}</td>
                      <td>{row.docDate}</td>
                      <td>{row.flow}</td>
                      <td>{row.kitNo}</td>
                      <td>{row.receiver}</td>
                      <td>{row.destination}</td>
                      <td>{row.outwardKitQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default BinOutward;
