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
  const [listViewButton, setListViewButton] = useState(false);
  const [savedRecordView, setSavedRecordView] = useState(false);
  const [allotedId, setAllotedId] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [loginUserId, setLoginUserId] = useState(
    localStorage.getItem("userId")
  );
  const [loginUserName, setLoginUserName] = useState(
    localStorage.getItem("userName")
  );
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

  const [errors, setErrors] = useState({});
  const [flowList, setFlowList] = useState([]);
  const [emitterOutwardList, setEmitterOutwardList] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [assetList, setAssetList] = useState([]);

  const [ListViewTableData, setListViewTableData] = useState([
    // {
    //   id: 1,
    //   inwardId: "1000001",
    //   date: "15-05-2024",
    //   kitNo: "PLS1220/0524/1002	",
    //   allotedQty: "50",
    //   recKitQty: "50",
    // },
  ]);

  useEffect(() => {
    getFlowByUserId();
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
        console.log(
          "FLOW LIST FROM API's ARE",
          response.data.paramObjectsMap.flowDetails.map((l) => l.flow)
        );
        setFlowList(response.data.paramObjectsMap.flowDetails);
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
        console.log(
          "FLOW LIST FROM API's ARE",
          response.data.paramObjectsMap.oemBinInwardVOs
        );
        setListViewTableData(response.data.paramObjectsMap.oemBinInwardVOs);
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

    const selectedAllotData = emitterOutwardList.filter(
      (l) => l.docId === e.target.value
    );
    console.log("THE SELECTED ALLOTED ID IS:", selectedAllotData);

    setTableView(true);

    if (Array.isArray(selectedAllotData) && selectedAllotData.length > 0) {
      setTableData(
        selectedAllotData.map((l) => ({
          kitNo: l.kitNo,
          allotedId: l.docId,
          allotedDate: l.docDate,
          allotedKitQty: l.outwardKitQty,
          partNo: l.partNo,
          partName: l.partName,
        }))
      );
    } else {
      setTableData([]);
    }
  };

  const getEmitterOutwardDetailsByFlowId = async (selectedFlowId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getOutwardDetailsByFlow?flowId=${selectedFlowId}&orgId=${orgId}`
      );
      if (response.status === 200) {
        console.log(
          "FLOW LIST FROM API's ARE",
          response.data.paramObjectsMap.outwardDe
        );
        console.log(
          "THE EMITTEROUTWARDLIST IS:",
          response.data.paramObjectsMap.outwardDe
        );

        setEmitterOutwardList(response.data.paramObjectsMap.outwardDe);
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
    if (!flow.trim()) {
      errors.flow = "Flow is required";
    }
    if (!invNo.trim()) {
      errors.invNo = "Invoice No is required";
    }
    // if (!invDate.trim()) {
    //   errors.invDate = "Flow is required";
    // }
    // tableData.forEach((row) => {
    //   if (!row.recKitQty.trim()) {
    //     errors.recKitQty = "Asset is required";
    //   }
    // });

    const formData = {
      docDate: docDate.format("YYYY-MM-DD"),
      flow: flow,
      outwardDocId: allotedId,
      grnNo: invNo,
      grnDate: invDate,
      kitNo: tableData.map((row) => row.kitNo).join(", "),
      recievedKitQty: tableData.map((row) => row.recKitQty).join(", "),
      oemBinInwardDetails: assetList.map((row) => ({
        asset: row.assetName,
        assetCode: row.assetCode,
        recievedQty: row.qty,
      })),
      orgId: orgId,
      createdBy: loginUserName,
    };
    console.log("THE DATA TO SAVE IS:", formData);
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
            // handleNew();
            // addUser(false);
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
                    <option value="" selected>
                      Select a Flow
                    </option>
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
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Alloted Id:
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
                      Select a Doc Id
                    </option>
                    {emitterOutwardList.length > 0 &&
                      emitterOutwardList.map((outwardList, index) => (
                        <option
                          key={outwardList.index}
                          value={outwardList.docId}
                        >
                          {outwardList.docId}
                        </option>
                      ))}
                  </select>
                  {errors.flow && (
                    <span className="error-text">{errors.flow}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Invoice No:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={`form-control form-sz mb-2 ${
                      errors.receivedKitQty && "border-red-500"
                    }`}
                    placeholder=""
                    value={invNo}
                    onChange={(e) => setInvNo(e.target.value)}
                  />
                  {errors.invNo && (
                    <span className="error-text mb-1">{errors.invNo}</span>
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
                              <th>Alloted Id</th>
                              <th>Alloted Date</th>
                              <th>Part Name</th>
                              <th>Part No</th>
                              <th>Kit No</th>
                              <th>Alloted Qty</th>
                              <th>REC QTY</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, index) => (
                              <tr key={row.id}>
                                {/* <td>{index + 1}</td> */}
                                <td>{row.allotedId}</td>
                                <td>{row.allotedDate}</td>
                                <td>{row.partName}</td>
                                <td>{row.partNo}</td>
                                <td>{row.kitNo}</td>
                                <td>{row.allotedKitQty}</td>
                                <td>
                                  {/* <input
                                    type="text"
                                    value={row.recKitQty}
                                    onChange={(e) =>
                                      setTableData((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                recKitQty: e.target.value,
                                              }
                                            : r
                                        )
                                      )
                                      // handleRecKitQtyChange(e)
                                    }
                                    
                                  /> */}
                                  <input
                                    type="text"
                                    value={row.recKitQty}
                                    onChange={(e) => {
                                      setTableData((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                recKitQty: e.target.value,
                                              }
                                            : r
                                        )
                                      );
                                      setTimeout(
                                        () =>
                                          handleRecKitQtyChange(e, row.kitNo),
                                        500
                                      );
                                    }}
                                  />

                                  {errors.qty && (
                                    <span className="error-text mb-1">
                                      {errors.qty}
                                    </span>
                                  )}
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
