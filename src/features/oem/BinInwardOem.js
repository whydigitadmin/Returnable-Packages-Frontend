import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
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
  const [tableView, setTableView] = useState(false);

  const [errors, setErrors] = useState({});
  const [flowList, setFlowList] = useState([
    {
      id: 1,
      flow: "PUN-CH",
    },
  ]);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      kitNo: "PLS1220/0524/1002",
      allotedKitQty: "50",
      recKitQty: "",
    },
  ]);

  const [ListViewTableData, setListViewTableData] = useState([
    {
      id: 1,
      inwardId: "1000001",
      date: "15-05-2024",
      kitNo: "10",
      recKitQty: "30",
    },
  ]);

  const handleFlowChange = (e) => {
    setFlow(e.target.value);
    setTableView(true);
  };
  const handleSavedRecordView = (e) => {
    setSavedRecordView(true);
  };
  const handleSavedRecordViewClose = (e) => {
    setSavedRecordView(false);
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
    if (!invDate.trim()) {
      errors.invDate = "Flow is required";
    }
    tableData.forEach((row) => {
      if (!row.asset.trim()) {
        errors.asset = "Asset is required";
      }
      if (!row.assetCode.trim()) {
        errors.assetCode = "Asset Code is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formData = {
      docDate: docDate.format("YYYY-MM-DD"),
      flow: flow,
      invNo: invNo,
      invDate: invDate,
      oemBinInwardDetails: tableData.map((row) => ({
        asset: row.asset,
        assetCode: row.assetCode,
        receivedQty: parseInt(row.receivedQty),
      })),
      orgId: 0,
    };

    axios
      .post("/api/oem/oemBinInward", formData)
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Bin inward saved successfully!");
        setDocId("");
        setDocDate(dayjs());
        setTableData([
          {
            id: 1,
            asset: "",
            assetCode: "",
            receivedQty: "",
          },
        ]);
        setErrors({});
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        // Optionally, show an error message
        toast.error("Failed to save bin inward.");
      });
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
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
                        <th>S.No</th>
                        <th>Inward ID</th>
                        <th>Date</th>
                        <th>Kit No</th>
                        <th>Rec Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ListViewTableData.map((row, index) => (
                        <tr key={row.id}>
                          <td>{index + 1}</td>
                          <td>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSavedRecordView(row.inwardId);
                              }}
                              style={{ cursor: "pointer", color: "blue" }}
                            >
                              {row.inwardId}
                            </a>
                          </td>
                          <td>{row.date}</td>
                          <td>{row.kitNo}</td>
                          <td>{row.recKitQty}</td>
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
                      flowList.map((list) => (
                        <option key={list.id} value={list.flow}>
                          {list.flow}
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
                      onChange={(date) => setDocDate(date)}
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
                    <div className="overflow-x-auto w-full ">
                      <table className="table table-hover w-full">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Kit No</th>
                            <th>Alloted Qty</th>
                            <th>REC QTY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, index) => (
                            <tr key={row.id}>
                              <td>{index + 1}</td>
                              <td>{row.kitNo}</td>
                              <td>{row.allotedKitQty}</td>
                              <td>
                                <input
                                  type="text"
                                  value={row.recKitQty}
                                  onChange={(e) =>
                                    setTableData((prev) =>
                                      prev.map((r, i) =>
                                        i === index
                                          ? { ...r, recKitQty: e.target.value }
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
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                        <td> {row.inwardId}</td>
                        <td>{row.date}</td>
                        <td>{row.kitNo}</td>
                        <td>{row.recKitQty}</td>
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
