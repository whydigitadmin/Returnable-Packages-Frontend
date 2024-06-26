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

export const RetrivalManifest = () => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [receiverId, setReceiverId] = React.useState(
    localStorage.getItem("receiverId")
  );
  const [stockBranch, setStockBranch] = useState("");
  const [selectedStockBranch, setSelectedStockBranch] = useState("");
  const [stockBranchList, setStockBranchList] = useState([]);
  const [toStockBranch, setToStockBranch] = React.useState("");
  const [warehouseLocationVO, setWarehouseLocationVO] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [retrievalTableData, setRetrievalTableData] = useState([
    {
      rmNo: "1000001",
      date: "15-06-2024",
      rQty: "10",
    },
  ]);
  const [tableView, setTableView] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [listViewButton, setListViewButton] = useState(false);
  const [listViewTableData, setListViewTableData] = useState([]);
  const [viewId, setViewId] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    getDocIdByRetreival();
    getOemStockBranchByUserId();
    getWarehouseLocationList();
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
    setSelectedRowData("");
    setTableData("");
    setTableView(false);
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
    // getAllDispatchDetail();
    setListViewButton(!listViewButton);
    setViewId("");
    // setTableData("");
  };

  const handleSavedRecordView = (rowId) => {
    setViewId(rowId);
    setListViewButton(false);
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
      setSelectedStockBranch(selectedBranch.stockBranch);
      getOemOutwardDetailsForRetreival(selectedBranch.stockBranch);
    } else {
      setSelectedStockBranch("");
    }
  };

  const handleWarehouseChange = (e) => {
    setToStockBranch(e.target.value);
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
    console.log("createRetreival", requestData);
    if (Object.keys(errors).length === 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/oem/createRetreival`,
          requestData
        )
        .then((response) => {
          handleNew();
          toast.success("Create Retreival Done Successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Network Error!");
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
                        {/* <th>S.No</th> */}
                        <th>RM No</th>
                        <th>Date</th>
                        <th>Retrieval QTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {retrievalTableData && retrievalTableData.length > 0 ? (
                        retrievalTableData.map((row, index) => (
                          <tr key={row.id}>
                            {/* <td>{index + 1}</td> */}
                            <td>{row.rmNo}</td>
                            <td>{row.date}</td>
                            <td>{row.rQty}</td>
                            {/*<td className="ps-5">{row.availQty}</td>
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
                                  errors.emptyQty && "border-red-500"
                                }`}
                                style={{ width: "50px" }}
                              />
                              {errors.emptyQty && (
                                <span className="error-text mb-1">
                                  {errors.emptyQty}
                                </span>
                              )}
                            </td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9}>
                            <NoRecordsFound
                              message={"Retrieval Manifest Not Found.!"}
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
