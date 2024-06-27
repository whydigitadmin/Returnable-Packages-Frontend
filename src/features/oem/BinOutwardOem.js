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
import DialogContent from "@mui/material/DialogContent";
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
import NoRecordsFound from "../../utils/NoRecordsFound";
import WtTooltip from "../user/components/WtTooltip";

function BinOutwardOem({}) {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});
  const [listViewButton, setListViewButton] = useState(false);
  const [savedRecordView, setSavedRecordView] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [stockBranch, setStockBranch] = useState("");
  const [selectedStockBranch, setSelectedStockBranch] = useState("");
  const [stockBranchList, setStockBranchList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const [listViewTableData, setListViewTableData] = useState([]);

  useEffect(() => {
    getOemStockBranchByUserId();
    getOutwardDocId();
    // getFlowByUserId();
    if (listViewButton) {
      getAllOutwardedDetailsByOrgId();
    }
  }, [listViewButton]);

  const getAllOutwardedDetailsByOrgId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getAllOemBinOutward?orgId=${orgId}`
      );
      if (response.status === 200) {
        setListViewTableData(response.data.paramObjectsMap.oemBinOutwardVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOutwardDocId = async (doc) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getDocIdByOemBinOutward`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.oemBinOutwardDocId);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOemStockBranchByUserId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getOemStockBranchByUserId?orgId=${orgId}&userId=${userId}`
      );
      if (response.status === 200) {
        setStockBranchList(response.data.paramObjectsMap.branch);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectionChange = (event) => {
    const selectedStockBranch = event.target.value;
    setStockBranch(selectedStockBranch);

    const selectedBranch = stockBranchList.find(
      (branch) => branch.stockBranch === selectedStockBranch
    );
    if (selectedBranch) {
      setSelectedStockBranch(selectedBranch.stockBranch);
      getOemStockDetailsForBinOutward(selectedBranch.stockBranch);
    } else {
      setSelectedStockBranch("");
    }
  };

  const getOemStockDetailsForBinOutward = (branch) => {
    if (Object.keys(errors).length === 0) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/oem/getOemStockDetailsForBinOutward?stockBranch=${branch}`
        )
        .then((response) => {
          if (response.data.status === "Error") {
            console.error("Error creating kit:", response.data.paramObjectsMap);
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            setTableData(response.data.paramObjectsMap.stockDetails);
            setTableView(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
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

  const handleRowClick = (rowId) => {
    const isRowExpanded = expandedRows.includes(rowId);
    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((id) => id !== rowId)
      : [...expandedRows, rowId];
    setExpandedRows(newExpandedRows);

    const updatedListViewTableData = listViewTableData.map((row) => {
      if (row.id === rowId) {
        row.backgroundColor = isRowExpanded ? "" : "red";
      }
      return row;
    });

    setListViewTableData(updatedListViewTableData);
  };

  const handleNew = () => {
    setTableData({});
    setTableView(false);
    setStockBranch("");
    setErrors({});
  };

  const handleSave = () => {
    const updatedTableData = tableData.map((row) => ({
      ...row,
      errorMsg: "",
    }));
    setTableData(updatedTableData);

    const errors = {};
    if (!stockBranch) {
      errors.stockBranch = "Stock Branch is required";
    }

    const findEmptyOutQty = tableData.filter(
      (row) => row.outQty !== undefined && row.outQty !== ""
    );
    console.log("THE FIND EMPTY QTY IS:", findEmptyOutQty);

    if (findEmptyOutQty.length === 0) {
      errors.outQty = "Atleast 1 Out Qty should be enter";
    }

    const formData = {
      docDate: docDate.format("YYYY-MM-DD"),
      docId,
      id: 0,
      oemBinOutwardDetails: findEmptyOutQty.map((row) => ({
        asset: row.assetName,
        assetCode: row.assetCode,
        availqty: row.availQty,
        category: row.category,
        id: 0,
        outQty: row.outQty,
      })),
      orgId: orgId,
      stockBranch: stockBranch,
      createdby: userName,
      receiverId: localStorage.getItem("receiverId"),
    };

    if (Object.keys(errors).length === 0) {
      console.log("THE DATA TO SAVE IS:", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/oem/oemBinOutward`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          toast.success("Bin Outward saved successfully!");
          setDocDate(dayjs());
          setStockBranch("");
          setTableData([]);
          setTableView(false);
          setErrors({});
          getOutwardDocId();
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to save bin inward.");
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
              <strong className="ml-4">Bin Outward</strong>
            </p>
            <div className="ml-auto">
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
              {/* <div className="row mt-4">
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
                      {listViewTableData.map((row, index) => (
                        <tr key={row.id}>
                    
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
              </div> */}
              <div className="row mt-4">
                <div className="overflow-x-auto w-full ">
                  <table className="table table-hover w-full">
                    <thead>
                      <tr>
                        <th>Outward ID</th>
                        <th>Outward Date</th>
                        <th>Stock Branch</th>
                        {/* <th>Invoice No</th>
                        <th>Invoice Date</th>
                        <th>Dispatch ID</th>
                        <th>OEM Inward No</th>
                        <th>OEM Inward Date</th> */}
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listViewTableData.map((row, index) => (
                        <React.Fragment key={row.id}>
                          <tr style={{ backgroundColor: "red" }}>
                            <td>{row.docId}</td>
                            <td>{row.docDate}</td>
                            <td>{row.stockBranch}</td>
                            {/* <td>{row.invoiceNo}</td>
                            <td>{row.invoiceDate}</td>
                            <td>{row.dispatchId}</td>
                            <td>{row.oemInwardNo}</td>
                            <td>{row.oemInwardDate}</td> */}
                            <td>
                              <a
                                href="#"
                                style={{ cursor: "pointer", color: "blue" }}
                              >
                                <button onClick={() => handleRowClick(row.id)}>
                                  {expandedRows.includes(row.id)
                                    ? "Hide Details"
                                    : "Show Details"}
                                </button>
                              </a>
                            </td>
                          </tr>

                          {expandedRows.includes(row.id) && (
                            <tr>
                              <td colSpan="10">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th
                                        className="text-center"
                                        style={{
                                          backgroundColor: "green",
                                        }}
                                      >
                                        Category
                                      </th>
                                      <th
                                        className="text-center"
                                        style={{ backgroundColor: "green" }}
                                      >
                                        Asset Code
                                      </th>
                                      <th
                                        className="text-center"
                                        style={{ backgroundColor: "green" }}
                                      >
                                        Asset
                                      </th>
                                      <th
                                        className="text-center"
                                        style={{ backgroundColor: "green" }}
                                      >
                                        OutWard QTY
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row.oemBinOutwardDetails.map((detail) => (
                                      <tr key={detail.id}>
                                        <td
                                          className="text-center"
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.category}
                                        </td>
                                        <td
                                          className="text-center"
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.assetCode}
                                        </td>
                                        <td
                                          className="text-center"
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.asset}
                                        </td>
                                        <td
                                          className="text-center"
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.outQty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
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
                <div className="col-lg-1 col-md-2">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Doc Id:
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
                      Stock Branch:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-3 col-md-6">
                  <select
                    // name="Select Kit"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className={`form-select form-sz mb-2 ${
                      errors.stockBranch && "border-red-500"
                    }`}
                    onChange={handleSelectionChange}
                    value={stockBranch}
                  >
                    <option value="" selected>
                      Select a Stock Branch
                    </option>
                    {stockBranchList.length > 0 &&
                      stockBranchList.map((list) => (
                        <option key={list.destination} value={list.stockBranch}>
                          {list.stockBranch}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {tableView && (
                <>
                  <div className="row mt-2">
                    <div className="overflow-x-auto w-full ">
                      <table className="table table-hover w-full">
                        <thead>
                          <tr>
                            <th className="text-center">Category</th>
                            <th className="text-center">Asset Code</th>
                            <th className="text-center">Total Empty QTY</th>
                            <th>Outward QTY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData && tableData.length > 0 ? (
                            tableData.map((row, index) => (
                              <tr key={row.id}>
                                {/* <td>{index + 1}</td> */}
                                <td className="text-center">{row.category}</td>
                                <td className="text-center">{row.assetCode}</td>
                                <td className="text-center">{row.availQty}</td>
                                <td className="d-flex flex-row">
                                  <input
                                    type="text"
                                    value={row.outQty}
                                    onChange={(e) => {
                                      const inputValue = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                      );
                                      const newValue = parseInt(inputValue, 10);

                                      if (!isNaN(newValue)) {
                                        if (
                                          newValue <= row.availQty &&
                                          newValue > 0
                                        ) {
                                          setTableData((prev) =>
                                            prev.map((r, i) =>
                                              i === index
                                                ? {
                                                    ...r,
                                                    outQty: newValue,
                                                    errorMsg: "",
                                                  }
                                                : r
                                            )
                                          );
                                          setErrors((prev) => ({
                                            ...prev,
                                            [`outQty${index}`]: "",
                                          }));
                                        } else {
                                          setTableData((prev) =>
                                            prev.map((r, i) =>
                                              i === index
                                                ? {
                                                    ...r,
                                                    outQty: "",
                                                    errorMsg:
                                                      row.availQty === "2"
                                                        ? `Quantity must be 1 or ${row.availQty}.`
                                                        : row.availQty === "1"
                                                        ? `Quantity must be ${row.availQty}`
                                                        : `Quantity must be between 1 and ${row.availQty}.`,
                                                  }
                                                : r
                                            )
                                          );
                                          // setErrors((prev) => ({
                                          //   ...prev,
                                          //   [`outQty${index}`]: "",
                                          // }));
                                        }
                                      } else {
                                        setTableData((prev) =>
                                          prev.map((r, i) =>
                                            i === index
                                              ? {
                                                  ...r,
                                                  outQty: "",
                                                  errorMsg: "",
                                                }
                                              : r
                                          )
                                        );
                                        // setErrors((prev) => ({
                                        //   ...prev,
                                        //   [`outQty${index}`]: "",
                                        // }));
                                      }
                                    }}
                                    className={`form-control form-sz mb-2 ${
                                      errors[`outQty${index}`]
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                    style={{ width: "50px" }}
                                  />
                                  {row.errorMsg && (
                                    <span className="error-text mb-1 ms-2">
                                      {row.errorMsg}
                                    </span>
                                  )}
                                  {/* {errors[`outQty${index}`] && (
                                    <span className="error-text mb-1 ms-2">
                                      {errors[`outQty${index}`]}
                                    </span>
                                  )} */}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={9}>
                                <NoRecordsFound
                                  message={"Bin outward details Not Found.!"}
                                />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {errors.outQty && (
                        <span className="error-text mb-1 ms-2">
                          {errors.outQty}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={handleSave}
                    >
                      Outward
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

                  {/* {listViewTableData.map((row, index) => (
                    <TableRow>
                      <TableCell>{row.assetCode}</TableCell>
                      <TableCell>{row.outQty}</TableCell>
                    </TableRow>
                  ))} */}
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
