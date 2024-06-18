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

export const GatheringEmpty = () => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [flow, setFlow] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});
  const [tableView, setTableView] = useState(false);
  const [listViewButton, setListViewButton] = useState(false);
  const [savedRecordView, setSavedRecordView] = useState(false);
  const [recBranch, setRecBranch] = useState("");
  const [recBranchList, setRecBranchList] = useState([
    {
      id: 1,
      flow: "CH",
    },
    {
      id: 2,
      flow: "BLR",
    },
  ]);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      assetType: "Standard",
      assetCode: "PLT1213",
      expQty: "50",
      emptyQty: "8",
    },
    {
      id: 2,
      assetType: "Standard",
      assetCode: "LID1213",
      expQty: "50",
      emptyQty: "8",
    },
    {
      id: 3,
      assetType: "Standard",
      assetCode: "SW1213",
      expQty: "50",
      emptyQty: "8",
    },
    {
      id: 4,
      assetType: "Customized",
      assetCode: "IN1213",
      expQty: "100",
      emptyQty: "16",
    },
  ]);
  const [ListViewTableData, setListViewTableData] = useState([
    {
      id: 1,
      gatheredId: "1000001",
      gatheredDate: "15-05-2024",
      flow: "PUN-CH",
      recQty: "8",
      balQty: "42",
    },
  ]);

  const handleRecBranchChange = (e) => {
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
    setFlow("");
    // setTableData({});
    setErrors({});
    setTableView(false);
  };

  const handleSave = () => {
    // Validation
    const errors = {};
    if (!flow.trim()) {
      errors.flow = "Kit No is required";
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
      kit: flow,
      oemBinOutwardDetails: tableData.map((row) => ({
        asset: row.asset,
        assetCode: row.assetCode,
        qty: parseInt(row.qty),
      })),
      orgId: 0, // Replace 0 with actual value
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
        setFlow("");
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
      <div
        className="pt-8 card p-3 bg-base-100 shadow-xl mt-2"
        style={{ width: "85%", margin: "auto" }}
      >
        <div className="flex item-center mt-1">
          <Link to="/app/welcomeoem">
            <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
          </Link>
          <p className="text-2xl">
            <span>
              <strong className="ml-4">Gathering Empty</strong>
            </span>
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
        {/* </div> */}

        {listViewButton ? (
          <>
            <div className="row mt-4">
              <div className="overflow-x-auto w-full ">
                <table className="table table-hover w-full">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Gathered ID</th>
                      <th>Date</th>
                      {/* <th>Flow</th> */}
                      <th>REC QTY</th>
                      <th>Bal QTY</th>
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
                              handleSavedRecordView(row.gatheredId);
                            }}
                            style={{ cursor: "pointer", color: "blue" }}
                          >
                            {row.gatheredId}
                          </a>
                        </td>
                        <td>{row.gatheredDate}</td>
                        {/* <td>{row.flow}</td> */}
                        <td>{row.recQty}</td>
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
              {/* <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Doc Id:
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                value={1000000033}
                onChange={(e) => setDocId(e.target.value)}
                disabled
              />
            </div> */}
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
                      textField: { size: "small" },
                    }}
                    format="DD/MM/YYYY"
                    disabled
                  />
                </LocalizationProvider>
              </div>
              <div className="col-lg-2 col-md-4">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Receiver Branch:
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <select
                  name="Select Kit"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="form-select form-sz"
                  onChange={handleRecBranchChange}
                  value={recBranch}
                >
                  <option value="" selected>
                    Select a Branch
                  </option>
                  {recBranchList.length > 0 &&
                    recBranchList.map((list) => (
                      <option key={list.id} value={list.flow}>
                        {list.flow}
                      </option>
                    ))}
                </select>
                {errors.flow && (
                  <span className="error-text">{errors.flow}</span>
                )}
              </div>
            </div>
            {tableView && (
              <>
                <div className="row mt-2">
                  <div className="overflow-x-auto w-full ">
                    <table className="table table-hover w-full">
                      <thead>
                        <tr>
                          {/* <th>S.No</th> */}
                          <th>Asset Type</th>
                          <th>Asset Code</th>
                          <th>Inward Qty</th>
                          <th>EMPTY QTY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, index) => (
                          <tr key={row.id}>
                            {/* <td>{index + 1}</td> */}
                            <td>{row.assetType}</td>
                            <td>{row.assetCode}</td>
                            <td>{row.expQty}</td>
                            <td>
                              <input
                                type="text"
                                value={row.emptyQty}
                                onChange={(e) =>
                                  setTableData((prev) =>
                                    prev.map((r, i) =>
                                      i === index
                                        ? { ...r, emptyQty: e.target.value }
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
          <DialogContent className="mt-4">
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Gathered ID</TableCell>
                    <TableCell>1000001</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gathered Date</TableCell>
                    <TableCell>15-05-2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Flow</TableCell>
                    <TableCell>PUN-CH</TableCell>
                  </TableRow>
                  {tableData.map((row, index) => (
                    <TableRow>
                      <TableCell>{row.assetType}</TableCell>
                      <TableCell>{row.assetCode}</TableCell>
                      <TableCell>{row.emptyQty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer />
      {/* </div> */}
    </>
  );
};

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default GatheringEmpty;
