import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import NoRecordsFound from "../../utils/NoRecordsFound";
import RetrievalManifestReport from "./RetrievalManifestReport/RetrievalManifestReport";

export const RetrivalManifest = () => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [receiverId, setReceiverId] = React.useState(
    localStorage.getItem("receiverId")
  );
  const [stockBranch, setStockBranch] = useState("");
  const [stockBranchList, setStockBranchList] = useState([]);
  const [toStockBranch, setToStockBranch] = React.useState("");
  const [warehouseLocationVO, setWarehouseLocationVO] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [listViewButton, setListViewButton] = useState(false);
  const [listViewTableData, setListViewTableData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [downloadDocId, setDownloadDocId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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
    getDocIdByRetreival();
    getOemStockBranchByUserId();
    getWarehouseLocationList();
    getAllRetrievalDetailsByReceiverId();
  }, []);

  const getDocIdByRetreival = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getDocIdByRetreival`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.retreivalDocid);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllRetrievalDetailsByReceiverId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getAllReterivalByReceiverId?receiverId=${receiverId}`
      );
      if (response.status === 200) {
        setListViewTableData(
          response.data.paramObjectsMap.retreivalVO.reverse()
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOemOutwardDetailsForRetreival = async (branch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getOemOutwardDetailsForRetreival?orgId=${orgId}&receiverId=${receiverId}&stockBranch=${branch}`
      );
      if (response.status === 200) {
        setTableData(response.data.paramObjectsMap.oemOutwardDetails);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const getWarehouseLocationList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/getOrginWarehouseByUserId?orgId=${orgId}&userId=${userId}`
      );

      if (response.status === 200) {
        setWarehouseLocationVO(response.data.paramObjectsMap.warehouse);
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
    setSelectedRows([]);
    setSelectedRowData("");
    setTableData("");
    setTableView(false);
    setStockBranch("");
    setToStockBranch("");
    setErrors({});
    setSelectAll(false);
  };

  const handleBack = () => {
    setOpenDialog(false);
  };

  const checkboxStyle = {
    width: "15px",
    height: "15px",
  };

  const handleHeaderCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIndexes = tableData.map((_, index) => index);
      setSelectedRows(allIndexes);
      setSelectedRowData(tableData);
    } else {
      setSelectedRows([]);
      setSelectedRowData([]);
    }
  };

  const handleCheckboxChange = (index, rowData) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    setSelectedRowData((prevData) =>
      prevData.includes(rowData)
        ? prevData.filter((data) => data !== rowData)
        : [...prevData, rowData]
    );
  };

  const handleListViewButtonChange = () => {
    setListViewButton(!listViewButton);
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
    setTableView(true);

    const selectedBranch = stockBranchList.find(
      (branch) => branch.stockBranch === selectedStockBranch
    );
    if (selectedBranch) {
      getOemOutwardDetailsForRetreival(selectedBranch.stockBranch);
      setSelectedRows([]);
      setSelectedRowData([]);
      setSelectAll(false);
    } else {
      // setSelectedStockBranch("");
    }
  };

  const handleWarehouseChange = (e) => {
    setToStockBranch(e.target.value);
  };

  const handleDownloadClick = (selectedDocId) => {
    setOpenDialog(true);
    setDownloadDocId(selectedDocId);
    console.log("Download Doc ID:", selectedDocId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const createRetreival = () => {
    const errors = {};
    if (!stockBranch) {
      errors.stockBranch = "Stock Branch is required";
    }
    if (!toStockBranch) {
      errors.toStockBranch = "Retreival warehouse is required";
    }
    if (selectedRows.length === 0) {
      errors.noSelection = "Please select at least one record to proceed.";
    }

    const retreivalDetailsDTO = selectedRowData.map((row) => ({
      outwardDocDate: row.outwardDocDate,
      outwardDocId: row.outwardDocId,
      stockbranch: stockBranch,
    }));
    const requestData = {
      // docId: docId,
      docDate,
      receiverId,
      fromStockBranch: stockBranch,
      toStockBranch,
      retreivalDetailsDTO,
      createdby: userName,
      orgId: orgId,
    };
    if (Object.keys(errors).length === 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/oem/createRetreival`,
          requestData
        )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            handleNew();
            getDocIdByRetreival();
            getAllRetrievalDetailsByReceiverId();
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
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
              <strong className="ml-4">
                Retrieval Manifest <span className="text-sm">Daywise</span>
              </strong>
            </p>
            <div className="ml-auto">
              <button
                type="button"
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={(e) => {
                  handleListViewButtonChange();
                }}
              >
                {listViewButton ? "Close" : "Assign"}
              </button>
            </div>
          </div>

          {listViewButton ? (
            <>
              <div className="row mt-4">
                <div className="col-lg-1 col-md-2">
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
                      Stock Branch:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-3 col-md-6">
                  <select
                    // name="Select Kit"
                    style={{
                      height: 40,
                      fontSize: "0.800rem",
                      width: "100%",
                    }}
                    className="form-select form-sz"
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
                  {errors.stockBranch && (
                    <span className="error-text mb-1">
                      {errors.stockBranch}
                    </span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4 mt-4">
                  <label className="label mb-4">
                    <span
                      className={
                        "label-text label-font-size text-base-content d-flex flex-row"
                      }
                    >
                      Retrieval Warehouse
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-3 col-md-6 mt-4">
                  <select
                    className="form-select form-sz w-full mb-2"
                    onChange={handleWarehouseChange}
                    value={toStockBranch}
                    name="toStockBranch"
                  >
                    <option value="" disabled>
                      Select Retrieval Warehouse
                    </option>
                    {warehouseLocationVO.length > 0 &&
                      warehouseLocationVO.map((list) => (
                        <option key={list.warehouseId} value={list.warehouse}>
                          {list.warehouse}
                        </option>
                      ))}
                  </select>
                  {errors.toStockBranch && (
                    <span className="error-text mb-1">
                      {errors.toStockBranch}
                    </span>
                  )}
                </div>
                {tableView && (
                  <>
                    <div className="overflow-x-auto w-full mt-4">
                      <table className="table table-hover w-full">
                        <thead>
                          <tr>
                            <th className="text-center">
                              <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleHeaderCheckboxChange}
                                style={checkboxStyle}
                              />
                              <span className="ps-2">Actions</span>
                            </th>
                            <th className="text-center">Bin Outward Id</th>
                            <th className="text-center">Outward Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData && tableData.length > 0 ? (
                            tableData.map((row, index) => (
                              <tr key={row.id}>
                                {/* <td>{index + 1}</td> */}
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={() =>
                                      handleCheckboxChange(index, row)
                                    }
                                    style={checkboxStyle}
                                  />
                                </td>
                                <td className="text-center">
                                  {row.outwardDocId}
                                </td>
                                <td className="text-center">
                                  {row.outwardDocDate}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={9}>
                                <NoRecordsFound
                                  message={"Retrieval Manifest Not Found..!"}
                                />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {errors.noSelection && (
                        <div className="error-text mb-3">
                          {errors.noSelection}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-4">
                      <button
                        type="button"
                        className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onClick={(e) => {
                          createRetreival();
                        }}
                      >
                        Proceed For Retrieval
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="row mt-4">
                <div className="overflow-x-auto w-full ">
                  <table className="table table-hover w-full">
                    <thead>
                      <tr>
                        <th>Retrieval ID</th>
                        <th>Retrieval Date</th>
                        <th>From Branch</th>
                        <th>Retrieval Branch</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData && paginatedData.length > 0 ? (
                        paginatedData.map((row, index) => (
                          <React.Fragment key={row.id}>
                            <tr style={{ backgroundColor: "red" }}>
                              <td
                                className="px-2 py-2 text-center d-flex justify-content-center"
                                style={{
                                  cursor: "pointer",
                                  color: "black",
                                }}
                              >
                                <img
                                  src="/RetrivalManifest-download.png"
                                  alt="pending-status-icon"
                                  title="add"
                                  onClick={() => handleDownloadClick(row.docId)}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    margin: "auto",
                                    hover: "pointer",
                                  }}
                                />
                              </td>
                              <td>{row.docDate}</td>
                              <td>{row.fromStockBranch}</td>
                              <td>{row.toStockBranch}</td>
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
                                          Bin Out DocId
                                        </th>
                                        <th className="text-center">
                                          Bin OutDoc Date
                                        </th>
                                        <th className="text-center">
                                          Outward Stock Branch
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {row.retreivalDetailsVO.map((detail) => (
                                        <tr key={detail.id}>
                                          <td className="text-center">
                                            {detail.outwardDocId}
                                          </td>
                                          <td className="text-center">
                                            {detail.outwardDocDate}
                                          </td>
                                          <td className="text-center">
                                            {detail.outwardStockBranch}
                                          </td>
                                        </tr>
                                      ))}
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
                              message={
                                "Retrieval Manifest Details Not Found..!"
                              }
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
          )}
        </div>
        <ToastContainer />
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="lg"
        >
          <DialogContent>
            <RetrievalManifestReport
              goBack={handleBack}
              docId={downloadDocId}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
