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

export const GatheringEmpty = () => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [errors, setErrors] = useState({});
  const [stockBranch, setStockBranch] = useState("");
  const [stockBranchList, setStockBranchList] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [listViewButton, setListViewButton] = useState(false);
  const [savedRecordView, setSavedRecordView] = useState(false);
  const [tableData, setTableData] = useState([]);
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
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );

  useEffect(() => {
    getOemStockBranchByUserId();
    getDocIdByGatheringEmpty();
  }, []);

  const getDocIdByGatheringEmpty = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getDocIdByGatheringEmpty`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.gatheringDocId);
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

  const handleRecBranchChange = (e) => {
    setStockBranch(e.target.value);
    getEmptyAssetDetailsForGathering(e.target.value);
    setTableView(true);
    setErrors({});
  };

  const getEmptyAssetDetailsForGathering = async (selectedStockBranch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getEmptyAssetDetailsForGathering?orgId=${orgId}&stockBranch=${selectedStockBranch}`
      );
      if (response.status === 200) {
        setTableData(response.data.paramObjectsMap.oemEmptyDetails);
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

  const handleNew = () => {
    setStockBranch("");
    // setTableData({});
    setErrors({});
    setTableView(false);
  };

  const handleSave = () => {
    const updatedTableData = tableData.map((row) => ({
      ...row,
      errorMsg: "",
    }));
    setTableData(updatedTableData);

    const errors = {};
    if (!stockBranch.trim()) {
      errors.stockBranch = "Stock Branch is required";
    }
    tableData.forEach((row, index) => {
      if (!row.emptyQty) {
        errors[`emptyQty${index}`] = "Empty Qty is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formData = {
      createdBy: userName,
      docId,
      docDate: docDate.format("YYYY-MM-DD"),
      gathereingEmptyDetailsDTO: tableData.map((row) => ({
        assetType: row.assetType,
        assetCode: row.assetCode,
        assetName: row.assetName,
        category: row.category,
        availqty: row.availqty,
        emptyQty: parseInt(row.emptyQty),
      })),
      orgId,
      stockBranch,
      receiverId: localStorage.getItem("receiverId"),
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/oem/createGatheringEmpty`,
        formData
      )
      .then((response) => {
        console.log("/api/oem/createGatheringEmpty:", response.data);
        setDocDate(dayjs());
        setStockBranch("");
        setTableView(false);
        setTableData([]);
        setErrors({});
        getDocIdByGatheringEmpty();
      })
      .catch((error) => {
        console.error("Error:", error);
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
              <strong className="ml-4">Empty Bin Count</strong>
            </span>
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
              <div className="col-lg-3 col-md-3">
                <select
                  name="Select Kit"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="form-select form-sz"
                  onChange={handleRecBranchChange}
                  value={stockBranch}
                >
                  <option value="" selected>
                    Select a Branch
                  </option>
                  {stockBranchList.length > 0 &&
                    stockBranchList.map((list) => (
                      <option key={list.destination} value={list.stockBranch}>
                        {list.stockBranch}
                      </option>
                    ))}
                </select>
                {errors.stockBranch && (
                  <span className="error-text">{errors.stockBranch}</span>
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
                          <th>Category</th>
                          <th>Asset Code</th>
                          <th>Available Qty</th>
                          <th>EMPTY QTY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData && tableData.length > 0 ? (
                          tableData.map((row, index) => (
                            <tr key={row.id}>
                              {/* <td>{index + 1}</td> */}
                              <td>{row.category}</td>
                              <td>{row.assetCode}</td>
                              <td className="ps-5">{row.availQty}</td>
                              <td className="d-flex flex-column">
                                <input
                                  type="text"
                                  value={row.emptyQty}
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
                                                  emptyQty: newValue,
                                                  errorMsg: "",
                                                }
                                              : r
                                          )
                                        );
                                        setErrors((prev) => ({
                                          ...prev,
                                          [`emptyQty${index}`]: "",
                                        }));
                                      } else {
                                        setTableData((prev) =>
                                          prev.map((r, i) =>
                                            i === index
                                              ? {
                                                  ...r,
                                                  emptyQty: "",
                                                  errorMsg: `Quantity must be between 1 and ${row.availQty}.`,
                                                }
                                              : r
                                          )
                                        );
                                        setErrors((prev) => ({
                                          ...prev,
                                          [`emptyQty${index}`]: "",
                                        }));
                                      }
                                    } else {
                                      setTableData((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                emptyQty: "",
                                                errorMsg: "",
                                              }
                                            : r
                                        )
                                      );
                                      setErrors((prev) => ({
                                        ...prev,
                                        [`emptyQty${index}`]: "",
                                      }));
                                    }
                                  }}
                                  className={`form-control form-sz mb-2 ${
                                    errors[`emptyQty${index}`]
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                  style={{ width: "50px" }}
                                />
                                {row.errorMsg && (
                                  <span className="error-text mb-1">
                                    {row.errorMsg}
                                  </span>
                                )}
                                {errors[`emptyQty${index}`] && (
                                  <span className="error-text mb-1">
                                    {errors[`emptyQty${index}`]}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={9}>
                              <NoRecordsFound
                                message={"Empty bins Not Found.!"}
                              />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={handleSave}
                  >
                    Proceed
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
