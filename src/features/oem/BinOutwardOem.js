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
import NoRecordsFound from "../../utils/NoRecordsFound";
import { Pagination } from "@mui/material";

function BinOutwardOem({}) {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});
  const [listViewButton, setListViewButton] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [stockBranch, setStockBranch] = useState("");
  const [selectedStockBranch, setSelectedStockBranch] = useState("");
  const [stockBranchList, setStockBranchList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [listViewTableData, setListViewTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the starting index of the current page
  const startIndex = (page - 1) * rowsPerPage;
  // Slice the tableDataView array to get the rows for the current page
  const paginatedData = listViewTableData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    getOemStockBranchByUserId();
    getOutwardDocId();
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
        setListViewTableData(
          response.data.paramObjectsMap.oemBinOutwardVO.reverse()
        );
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

    if (findEmptyOutQty.length === 0) {
      errors.outQty = "Atleast 1 Out Qty should be enter";
    }

    const formData = {
      docDate: docDate.format("YYYY-MM-DD"),
      // docId,
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
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/oem/oemBinOutward`,
          formData
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
            setDocDate(dayjs());
            setStockBranch("");
            setTableData([]);
            setTableView(false);
            setErrors({});
            getOutwardDocId();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error saving: " + error.message);
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
              <div className="row mt-4">
                <div className="overflow-x-auto w-full ">
                  <table className="table table-hover w-full">
                    <thead>
                      <tr>
                        <th>Outward ID</th>
                        <th>Outward Date</th>
                        <th>Stock Branch</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData && paginatedData.length > 0 ? (
                        paginatedData.map((row, index) => (
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
                                  <button
                                    onClick={() => handleRowClick(row.id)}
                                  >
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
                                  <table className="table table-success">
                                    <thead>
                                      <tr>
                                        <th className="text-center">
                                          Category
                                        </th>
                                        <th className="text-center">
                                          Asset Code
                                        </th>
                                        <th className="text-center">Asset</th>
                                        <th className="text-center">
                                          OutWard QTY
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {row.oemBinOutwardDetails.map(
                                        (detail) => (
                                          <tr key={detail.id}>
                                            <td className="text-center">
                                              {detail.category}
                                            </td>
                                            <td className="text-center">
                                              {detail.assetCode}
                                            </td>
                                            <td className="text-center">
                                              {detail.asset}
                                            </td>
                                            <td className="text-center">
                                              {detail.outQty}
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
                              message={"Bin Outward Details Not Found..!"}
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 d-flex justify-content-center">
                  <Pagination
                    count={Math.ceil(listViewTableData.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                  />
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
