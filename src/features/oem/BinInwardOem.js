import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStarOfLife } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const BinInwardOem = ({}) => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [flow, setFlow] = useState("");
  const [invNo, setInvNo] = useState("");
  const [invDate, setInvDate] = useState(null);
  const [oemInwardNo, setOemInwardNo] = useState("");
  const [oemInwardDate, setOemInwardDate] = useState(null);
  const [listViewButton, setListViewButton] = useState(false);
  const [savedRecordView, setSavedRecordView] = useState(false);
  const [allotedId, setAllotedId] = useState("");
  const [tableView, setTableView] = useState(false);
  const [loginUserId, setLoginUserId] = useState(
    localStorage.getItem("userId")
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});
  const [flowList, setFlowList] = useState([]);
  const [emitterOutwardList, setEmitterOutwardList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [ListViewTableData, setListViewTableData] = useState([]);

  useEffect(() => {
    getFlowByUserId();
    getInwardDocId();
    if (listViewButton) {
      getAllInwardedDetailsByOrgId();
    }
  }, []);

  const getFlowByUserId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getFlowByUserId?orgId=${orgId}&userId=${loginUserId}`
      );
      if (response.status === 200) {
        setFlowList(response.data.paramObjectsMap.flowDetails);
        if (response.data.paramObjectsMap.flowDetails.length === 1) {
          setFlow(response.data.paramObjectsMap.flowDetails[0].flowId);
          getEmitterOutwardDetailsByFlowId(
            response.data.paramObjectsMap.flowDetails[0].flowId
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllInwardedDetailsByOrgId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getAllOemBinInward?orgId=${orgId}`
      );
      if (response.status === 200) {
        setListViewTableData(response.data.paramObjectsMap.oemBinInwardVOs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getInwardDocId = async (doc) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getDocIdByOemBinInward`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.oemBinInwardDocId);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSavedRecordView = (e) => {
    setSavedRecordView(true);
  };
  const handleSavedRecordViewClose = (e) => {
    setSavedRecordView(false);
  };

  const handleFlowChange = (e) => {
    setFlow(e.target.value);
    getEmitterOutwardDetailsByFlowId(e.target.value);
  };
  const handleInvDateChange = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setInvDate(formattedDate);
  };

  const handleAllotedIdChange = (e) => {
    setAllotedId(e.target.value);
    getBininwardListByDocId(e.target.value);
  };

  const getEmitterOutwardDetailsByFlowId = async (selectedFlowId) => {
    console.log("THE FLOW ID IS:", selectedFlowId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByFlowOnEmitterDispatchScreen?FlowId=${selectedFlowId}`
      );
      if (response.status === 200) {
        setEmitterOutwardList(response.data.paramObjectsMap.EmitterOutward);
        if (response.data.paramObjectsMap.EmitterOutward.length === 1) {
          setAllotedId(response.data.paramObjectsMap.EmitterOutward.DocId);
        }
      }
    } catch (error) {}
  };

  const getBininwardListByDocId = async (DocId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getBininwardListByDocId?DocId=${DocId}`
      );
      if (response.status === 200) {
        const selectedAllotData = response.data.paramObjectsMap.EmitterOutward;
        setTableView(true);

        if (Array.isArray(selectedAllotData) && selectedAllotData.length > 0) {
          setTableData(
            selectedAllotData.map((l) => ({
              kitNo: l.kitNo,
              allotedId: l.allotedId,
              allotedDate: l.allotedDate,
              allotedKitQty: l.reqKitQty,
              partNo: l.partNo,
              partName: l.partName,
            }))
          );
        } else {
          setTableData([]);
        }
      }
    } catch (error) {}
  };

  const handleRecKitQtyChange = async (e, kitNo) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getkitAssetDetailsByKitId?kitCode=${kitNo}&quantity=${e.target.value}`
      );
      if (response.status === 200) {
        console.log(
          "ASSET DETAILS ARE:",
          response.data.paramObjectsMap.kitAssetVO
        );
        const viewTableData = response.data.paramObjectsMap.kitAssetVO.map(
          (row, index) => ({
            id: index + 1,
            assetCode: row.assetCode,
            assetCategory: row.assetCategory,
            assetName: row.asset,
            qty: row.qty,
          })
        );
        console.log("THE ASSET LIST IS:", viewTableData);
        setAssetList(viewTableData);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNew = () => {
    setTableView(false);
    setFlow("");
    // setTableData({});
    setErrors({});
  };

  const handleSave = () => {
    const errors = {};
    if (!flow) {
      errors.flow = "Flow is required";
    }
    if (!allotedId) {
      errors.allotedId = "Dispatch is required";
    }
    if (!invNo.trim()) {
      errors.invNo = "Invoice No is required";
    }

    const formData = {
      docDate: docDate.format("YYYY-MM-DD"),
      flowId: flow,
      docId: docId,
      invoiceNo: invNo,
      invoiceDate: invDate,
      dispatchId: allotedId,
      oemBinInwardDetails: tableData.map((row) => ({
        receivedKitQty: row.receivedKitQty,
        allotedQty: row.allotedKitQty,
        kitNo: row.kitNo,
        outwardDocDate: row.allotedDate,
        outwardDocId: row.allotedId,
        partName: row.partName,
        partNo: row.partNo,
      })),
      orgId: orgId,
      createdBy: userName,
    };
    console.log("THE DATA TO SAVE IS oemBinInward:", formData);
    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }

    if (Object.keys(errors).length === 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/oem/oemBinInward`,
          formData,
          { headers }
        )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            console.log("Response:", response.data);
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
            setFlow("");
            setAllotedId("");
            setInvNo("");
            setInvDate(null);
            setTableView(false);
          }
        })
        .catch((error) => {
          console.error("Error saving user:", error.message);
          toast.error("Error saving user: " + error.message);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="flex items-center">
            <Link to="/app/welcomeoem">
              <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
            </Link>
            <p className="text-2xl">
              <strong className="ml-4">Bin Inward</strong>
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
                        {/* <th>S.No</th> */}
                        <th>Inward ID</th>
                        <th>Date</th>
                        <th>Kit No</th>
                        <th>Rec Qty</th>
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
                                handleSavedRecordView(row.docId);
                              }}
                              style={{ cursor: "pointer", color: "blue" }}
                            >
                              {row.docId}
                            </a>
                          </td>
                          <td>{row.docDate}</td>
                          <td>{row.kitNo}</td>
                          <td>{row.recievedKitQty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-3">
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Doc Id:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={`form-control form-sz mb-2 ${
                      errors.docId && "border-red-500"
                    }`}
                    placeholder=""
                    value={docId}
                    onChange={(e) => setDocId(e.target.value)}
                    disabled
                  />
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Doc Date:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
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
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Flow:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <select
                    name="Select Kit"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="form-select form-sz"
                    onChange={handleFlowChange}
                    value={flow}
                  >
                    {flowList.length > 1 && (
                      <option value="" selected>
                        Select a Flow
                      </option>
                    )}
                    {flowList.length > 0 &&
                      flowList.map((list, index) => (
                        <option key={list.flowId} value={list.flowId}>
                          {list.flow}
                        </option>
                      ))}
                  </select>
                  {errors.flow && (
                    <span className="error-text">{errors.flow}</span>
                  )}
                </div>
                {/* <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Dispatch Id:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <select
                    name="Select Kit"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="form-select form-sz"
                    onChange={handleAllotedIdChange}
                    value={allotedId}
                  >
                    <option value="" selected>
                      Select a DispatchId
                    </option>
                    {emitterOutwardList.length > 0 &&
                      emitterOutwardList.map((outwardList, index) => (
                        <option
                          key={outwardList.index}
                          value={outwardList.DocId}
                        >
                          {outwardList.DocId}
                        </option>
                      ))}
                  </select>
                  {errors.allotedId && (
                    <span className="error-text">{errors.allotedId}</span>
                  )}
                </div> */}
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Invoice No:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>

                <div className="col-lg-2 col-md-3">
                  <select
                    name="Select Invoice"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className="form-select form-sz"
                    onChange={handleAllotedIdChange}
                    value={invNo}
                  >
                    <option value="" selected>
                      Select a Invoice
                    </option>
                    {emitterOutwardList.length > 0 &&
                      emitterOutwardList.map((outwardList, index) => (
                        <option
                          key={outwardList.index}
                          value={outwardList.DocId}
                        >
                          {outwardList.DocId}
                        </option>
                      ))}
                  </select>
                  {errors.invNo && (
                    <span className="error-text">{errors.invNo}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Invoice Date:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      value={invDate}
                      onChange={handleInvDateChange}
                      slotProps={{
                        textField: { size: "small" },
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </div>

                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      OEM Inward No:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={`form-control form-sz mb-2 ${
                      errors.oemInwardNo && "border-red-500"
                    }`}
                    placeholder=""
                    value={oemInwardNo}
                    onChange={(e) => setOemInwardNo(e.target.value)}
                  />
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      OEM Inward Date:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      value={oemInwardDate}
                      onChange={handleInvDateChange}
                      slotProps={{
                        textField: { size: "small" },
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </div>
              </div>
              {tableView && (
                <>
                  <div className="row mt-2">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="overflow-x-auto w-full ">
                        <table className="table table-hover w-full">
                          <thead>
                            <tr>
                              {/* <th>S.No</th> */}
                              <th className="text-center">Alloted Id</th>
                              <th className="text-center">Alloted Date</th>
                              <th className="text-center">Part Name</th>
                              <th className="text-center">Part No</th>
                              <th className="text-center">Kit No</th>
                              <th className="text-center">Alloted Qty</th>
                              <th className="text-center">REC QTY</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, index) => (
                              <tr key={row.id}>
                                {/* <td>{index + 1}</td> */}
                                <td className="text-center">{row.allotedId}</td>
                                <td className="text-center">
                                  {row.allotedDate}
                                </td>
                                <td className="text-center">{row.partName}</td>
                                <td className="text-center">{row.partNo}</td>
                                <td className="text-center">{row.kitNo}</td>
                                <td className="text-center">
                                  {row.allotedKitQty}
                                </td>
                                <td className="text-center">
                                  <div className="d-flex flex-column">
                                    <input
                                      type="number"
                                      className="border border-black rounded"
                                      style={{ width: 50 }}
                                      value={row.receivedKitQty}
                                      onChange={(e) => {
                                        const inputValue = parseInt(
                                          e.target.value,
                                          10
                                        );
                                        if (isNaN(inputValue)) {
                                          setTableData((prev) =>
                                            prev.map((r, i) =>
                                              i === index
                                                ? {
                                                    ...r,
                                                    receivedKitQty: "",
                                                  }
                                                : r
                                            )
                                          );
                                          setErrors((prevErrors) => ({
                                            ...prevErrors,
                                            receivedKitQty: "",
                                          }));
                                        } else if (
                                          inputValue >= 0 &&
                                          inputValue <= row.allotedKitQty
                                        ) {
                                          setTableData((prev) =>
                                            prev.map((r, i) =>
                                              i === index
                                                ? {
                                                    ...r,
                                                    receivedKitQty: inputValue,
                                                  }
                                                : r
                                            )
                                          );
                                          setErrors((prevErrors) => ({
                                            ...prevErrors,
                                            receivedKitQty: "",
                                          }));
                                        } else {
                                          setErrors((prevErrors) => ({
                                            ...prevErrors,
                                            receivedKitQty:
                                              "Can't Exceed with Allocated QTY",
                                          }));
                                        }
                                      }}
                                    />

                                    {errors.receivedKitQty && (
                                      <span className="error-text mb-1">
                                        {errors.receivedKitQty}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* {errors.tableData && (<div className="error-text mt-2">{errors.tableData}</div>)} */}
                </>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleNew}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
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
                      <th>Inward ID</th>
                      <th>Date</th>
                      <th>Kit No</th>
                      <th>Rec Kit QTY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListViewTableData.map((row, index) => (
                      <tr key={row.id}>
                        <td> {row.docId}</td>
                        <td>{row.docDate}</td>
                        <td>{row.kitNo}</td>
                        <td>{row.recievedKitQty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

BinInwardOem.propTypes = {
  addInwardManifeast: PropTypes.func,
};

export default BinInwardOem;
