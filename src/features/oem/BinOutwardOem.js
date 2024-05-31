import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
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
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

function BinOutwardOem({}) {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [flow, setFlow] = useState("");
  const [kitName, setKitName] = useState("");
  const [outwardKitQty, setOutwardKitQty] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});
  const [listViewButton, setListViewButton] = useState(false);
  const [savedRecordView, setSavedRecordView] = useState(false);
  const [tableView, setTableView] = useState(false);

  const [flowList, setFlowList] = useState([
    {
      id: 1,
      flow: "PUN-CH",
    },
  ]);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      asset: "Pallet",
      assetCode: "PLT1213",
      expQty: "50",
      outQty: "8",
    },
    {
      id: 1,
      asset: "Lid",
      assetCode: "LID1213",
      expQty: "50",
      outQty: "8",
    },
    {
      id: 1,
      asset: "SideWall",
      assetCode: "SW1213",
      expQty: "50",
      outQty: "8",
    },
    {
      id: 1,
      asset: "Insert",
      assetCode: "IN1213",
      expQty: "100",
      outQty: "16",
    },
  ]);

  const [ListViewTableData, setListViewTableData] = useState([
    {
      id: 1,
      outwardId: "1000001",
      date: "15-05-2024",
      flow: "PUN-CH",
      outQty: "8",
      balQty: "42",
    },
  ]);

  const handleSavedRecordView = (e) => {
    setSavedRecordView(true);
  };
  const handleSavedRecordViewClose = (e) => {
    setSavedRecordView(false);
  };

  const handleFlowChange = (e) => {
    setFlow(e.target.value);
    setTableView(true);
  };

  const handleNew = () => {
    setFlow("");
    // setTableData({})
    setTableView(false);
    setErrors({});
  };

  const handleSave = () => {
    // Validation
    const errors = {};
    if (!kitName.trim()) {
      errors.kitName = "Kit No is required";
    }
    if (!outwardKitQty.trim()) {
      errors.outwardKitQty = "Outward Kit Qty is required";
    }
    tableData.forEach((row) => {
      if (!row.asset.trim()) {
        errors.asset = "Asset is required";
      }
      if (!row.assetCode.trim()) {
        errors.assetCode = "Asset Code is required";
      }
      if (!row.qty.trim()) {
        errors.qty = "Qty is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no validation errors, proceed to save
    const formData = {
      createdBy: "string", // Replace "string" with actual value
      docDate: docDate.format("YYYY-MM-DD"),
      kit: kitName,
      oemBinOutwardDetails: tableData.map((row) => ({
        asset: row.asset,
        assetCode: row.assetCode,
        qty: parseInt(row.qty),
      })),
      orgId: 0, // Replace 0 with actual value
      outwardKitQty: parseInt(outwardKitQty),
    };

    axios
      .post("/api/oem/updateCreateOemBinOutward", formData)
      .then((response) => {
        // Handle successful response
        console.log("Response:", response.data);
        // Optionally, show a success message
        toast.success("Bin Outward saved successfully!");
        // Reset input fields
        setDocId("");
        setDocDate(dayjs()); // Reset to current date
        setKitName("");
        setOutwardKitQty("");
        setTableData([
          {
            id: 1,
            asset: "",
            assetCode: "",
            qty: "",
          },
        ]);
        setErrors({}); // Clear errors
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
                        <th>Outward ID</th>
                        <th>Date</th>
                        <th>Flow</th>
                        <th>Out Qty</th>
                        <th>Bal Qty</th>
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
                                handleSavedRecordView(row.gatheredId);
                              }}
                              style={{ cursor: "pointer", color: "blue" }}
                            >
                              {row.outwardId}
                            </a>
                          </td>
                          <td>{row.date}</td>
                          <td>{row.flow}</td>
                          <td>{row.outQty}</td>
                          <td>{row.balQty}</td>
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
                    disabled
                  />
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
                {/* <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Kit No
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={`form-control form-sz mb-2 ${
                      errors.kitName && "border-red-500"
                    }`}
                    placeholder="Kit No"
                    value={kitName}
                    onChange={(e) => setKitName(e.target.value)}
                  />
                  {errors.kitName && (
                    <span className="error-text mb-1">{errors.kitName}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Outward Kit Qty
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={`form-control form-sz mb-2 ${
                      errors.outwardKitQty && "border-red-500"
                    }`}
                    placeholder="Outward Kit Qty"
                    value={outwardKitQty}
                    onChange={(e) => setOutwardKitQty(e.target.value)}
                  />
                  {errors.outwardKitQty && (
                    <span className="error-text mb-1">
                      {errors.outwardKitQty}
                    </span>
                  )}
                </div> */}
              </div>
              {tableView && (
                <>
                  <div className="row mt-2">
                    <div className="overflow-x-auto w-full ">
                      <table className="table table-hover w-full">
                        <thead>
                          <tr>
                            <th>Asset</th>
                            <th>Asset Code</th>
                            <th>EXP QTY</th>
                            <th>Out QTY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, index) => (
                            <tr key={row.id}>
                              {/* <td>{index + 1}</td> */}
                              <td>{row.asset}</td>
                              <td>{row.assetCode}</td>
                              <td>{row.expQty}</td>
                              <td>
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
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Outward ID</TableCell>
                    <TableCell>1000001</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>15-05-2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Flow</TableCell>
                    <TableCell>PUN-CH</TableCell>
                  </TableRow>

                  {tableData.map((row, index) => (
                    <TableRow>
                      <TableCell>{row.assetCode}</TableCell>
                      <TableCell>{row.outQty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default BinOutwardOem;
