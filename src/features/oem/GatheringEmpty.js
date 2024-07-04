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
  const [tableData, setTableData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const [listViewTableData, setListViewTableData] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [receiverId, setReceiverId] = React.useState(
    localStorage.getItem("receiverId")
  );

  useEffect(() => {
    getOemStockBranchByUserId();
    getDocIdByGatheringEmpty();
    if (listViewButton) {
      getAllGatheringByReceiverId();
    }
  }, [listViewButton]);

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

  const getAllGatheringByReceiverId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getAllGatheringEmptyByReceiverId?receiverId=${receiverId}`
      );
      if (response.status === 200) {
        setListViewTableData(response.data.paramObjectsMap.gatheringEmptyVO);
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
    const findEmptyQty = tableData.filter(
      (row) => row.emptyQty !== undefined && row.emptyQty !== ""
    );
    console.log("THE EMPTY QTY FIELD INCLUDED DATA IS", findEmptyQty);

    if (findEmptyQty.length === 0) {
      errors.invalidEmptyQty = "Atleast 1 Empty Qty field should be enter";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const formData = {
      createdBy: userName,
      docId,
      docDate: docDate.format("YYYY-MM-DD"),
      gathereingEmptyDetailsDTO: findEmptyQty.map((row) => ({
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

    console.log("THE DATA TO SAVE IS:", formData);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/oem/createGatheringEmpty`,
        formData
      )
      .then((response) => {
        if (response.data.statusFlag === "Error") {
          toast.error(response.data.paramObjectsMap.errorMessage, {
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          setDocDate(dayjs());
          setStockBranch("");
          setTableView(false);
          setTableData([]);
          setErrors({});
          getDocIdByGatheringEmpty();
          console.log("Response:", response.data);
          toast.success(response.data.paramObjectsMap.message, {
            autoClose: 2000,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Saving." + error.message);
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

        {listViewButton ? (
          <>
            <div className="row mt-4">
              <div className="overflow-x-auto w-full ">
                <table className="table table-hover w-full">
                  <thead>
                    <tr>
                      <th>Gathered ID</th>
                      <th>Date</th>
                      <th>Rec Branch</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listViewTableData && listViewTableData.length > 0 ? (
                      listViewTableData.map((row, index) => (
                        <React.Fragment key={row.id}>
                          <tr style={{ backgroundColor: "red" }}>
                            <td>{row.docId}</td>
                            <td>{row.docDate}</td>
                            <td>{row.stockBranch}</td>

                            <td>
                              <a
                                href="#"
                                style={{ cursor: "pointer", color: "blue" }}
                              >
                                <button onClick={() => handleRowClick(row.id)}>
                                  {expandedRows.includes(row.id)
                                    ? "Hide"
                                    : "Show"}
                                </button>
                              </a>
                            </td>
                          </tr>

                          {expandedRows.includes(row.id) && (
                            <tr>
                              <td colSpan="10">
                                <table className="table  table-success">
                                  <thead>
                                    <tr>
                                      <th className="text-center">Category</th>
                                      <th className="text-center">
                                        Asset Name
                                      </th>
                                      <th className="text-center">
                                        Asset Code
                                      </th>
                                      <th className="text-center">Empty QTY</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row.gathereingEmptyDetailsVO.map(
                                      (detail) => (
                                        <tr key={detail.id}>
                                          <td className="text-center">
                                            {detail.category}
                                          </td>
                                          <td className="text-center">
                                            {detail.assetName}
                                          </td>
                                          <td className="text-center">
                                            {detail.assetCode}
                                          </td>
                                          <td className="text-center">
                                            {detail.emptyQty}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9}>
                          <NoRecordsFound
                            message={"Empty Bin's Not Found..!"}
                          />
                        </td>
                      </tr>
                    )}
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
                              <td className="d-flex flex-row">
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
                                      } else {
                                        setTableData((prev) =>
                                          prev.map((r, i) =>
                                            i === index
                                              ? {
                                                  ...r,
                                                  emptyQty: "",
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
                    {errors.invalidEmptyQty && (
                      <span className="error-text mb-1 ms-2">
                        {errors.invalidEmptyQty}
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
