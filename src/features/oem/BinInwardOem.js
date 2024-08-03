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
import NoRecordsFound from "../../utils/NoRecordsFound";
import { Pagination } from "@mui/material";

const BinInwardOem = ({}) => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [flow, setFlow] = useState("");
  const [invNo, setInvNo] = useState("");
  const [invDate, setInvDate] = useState("");
  const [oemInwardNo, setOemInwardNo] = useState("");
  const [oemInwardDate, setOemInwardDate] = useState(null);
  const [listViewButton, setListViewButton] = useState(false);
  const [allotedId, setAllotedId] = useState("");
  const [tableView, setTableView] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [loginUserId, setLoginUserId] = useState(
    localStorage.getItem("userId")
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});
  const [flowList, setFlowList] = useState([]);
  const [emitterOutwardList, setEmitterOutwardList] = useState([]);
  const [tableData, setTableData] = useState([]);
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
    getFlowByUserId();
    getInwardDocId();
    if (listViewButton) {
      getAllInwardedDetailsByOrgId();
    }
  }, [listViewButton]);

  const getFlowByUserId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getFlowByUserId?orgId=${orgId}&userId=${loginUserId}`
      );
      if (response.status === 200) {
        setFlowList(response.data.paramObjectsMap.flowDetails);
        if (response.data.paramObjectsMap.flowDetails.length === 1) {
          setFlow(response.data.paramObjectsMap.flowDetails[0].flowId);
          getEmitterOutwardDetailsByFlowId(
            response.data.paramObjectsMap.flowDetails[0].flowId
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllInwardedDetailsByOrgId = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/api/oem/getAllOemBinInward?orgId=${orgId}&receiverId=${localStorage.getItem(
          "receiverId"
        )}`
      );
      if (response.status === 200) {
        setListViewTableData(
          response.data.paramObjectsMap.oemBinInwardVOs.reverse()
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getInwardDocId = async (doc) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getDocIdByOemBinInward`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.oemBinInwardDocId);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFlowChange = (e) => {
    setFlow(e.target.value);
    getEmitterOutwardDetailsByFlowId(e.target.value);
  };

  const handleInvNoChange = (e) => {
    setInvNo(e.target.value);
    const selectedInvNo = emitterOutwardList.find(
      (i) => i.invoiceNo === e.target.value
    );
    setAllotedId(selectedInvNo.DocId);
    setInvDate(selectedInvNo.invoiceDate);
    getBininwardListByDocId(selectedInvNo.DocId);
  };

  const getEmitterOutwardDetailsByFlowId = async (selectedFlowId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByFlowOnEmitterDispatchScreen?FlowId=${selectedFlowId}`
      );
      if (response.status === 200) {
        setEmitterOutwardList(response.data.paramObjectsMap.EmitterOutward);
        if (response.data.paramObjectsMap.EmitterOutward.length === 1) {
          setAllotedId(response.data.paramObjectsMap.EmitterOutward.DocId);
        }
      }
    } catch (error) {}
  };

  const getBininwardListByDocId = async (DocId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getBininwardListByDocId?DocId=${DocId}`
      );
      if (response.status === 200) {
        const selectedAllotData = response.data.paramObjectsMap.EmitterOutward;
        setTableView(true);

        if (Array.isArray(selectedAllotData) && selectedAllotData.length > 0) {
          setTableData(
            selectedAllotData.map((l) => ({
              kitNo: l.kitNo,
              allotedId: l.allotedId,
              allotedDate: l.allotedDate,
              allotedKitQty: l.reqKitQty,
              partNo: l.partNo,
              partName: l.partName,
            }))
          );
        } else {
          setTableData([]);
        }
      }
    } catch (error) {}
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
    setTableView(false);
    setInvNo("");
    setFlow("");
    setInvDate("");
    setAllotedId("");
    setOemInwardNo("");
    setOemInwardDate(null);
    setTableData({});
    setErrors({});
  };

  const handleSave = () => {
    const errors = {};
    if (!flow) {
      errors.flow = "Flow is required";
    }
    if (!oemInwardNo) {
      errors.oemInwardNo = "OEM Inward No is required";
    }
    if (!invNo.trim()) {
      errors.invNo = "Invoice No is required";
    }
    if (oemInwardDate === null) {
      errors.oemInwardDate = "OEM Inward Date is required";
    }

    const formData = {
      docDate: docDate.format("YYYY-MM-DD"),
      flowId: flow,
      // docId: docId,
      docDate: docDate,
      invoiceNo: invNo,
      invoiceDate: invDate,
      dispatchId: allotedId,
      oemInwardNo: oemInwardNo,
      oemInwardDate: oemInwardDate,
      oemBinInwardDetails: tableData.map((row) => ({
        receivedKitQty: row.allotedKitQty,
        allotedQty: row.allotedKitQty,
        kitNo: row.kitNo,
        outwardDocDate: row.allotedDate,
        outwardDocId: row.allotedId,
        partName: row.partName,
        partNo: row.partNo,
      })),
      orgId: orgId,
      createdBy: userName,
      receiverId: localStorage.getItem("receiverId"),
    };
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
            setEmitterOutwardList([]);
            handleNew();
            getInwardDocId();
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
                        <th>Inward ID</th>
                        <th>Date</th>
                        <th>Flow</th>
                        <th>Invoice No</th>
                        <th>Invoice Date</th>
                        <th>Dispatch ID</th>
                        <th>OEM Inward No</th>
                        <th>OEM Inward Date</th>
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
                              <td>{row.flow}</td>
                              <td>{row.invoiceNo}</td>
                              <td>{row.invoiceDate}</td>
                              <td>{row.dispatchId}</td>
                              <td>{row.oemInwardNo}</td>
                              <td>{row.oemInwardDate}</td>
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
                                  <table className="table table-bordered table-success">
                                    <thead>
                                      <tr>
                                        <th className="text-center">
                                          Bin Out Docid
                                        </th>
                                        <th className="text-center">
                                          Bin Out Doc Date
                                        </th>
                                        <th className="text-center">
                                          Part Name
                                        </th>
                                        <th className="text-center">Part No</th>
                                        <th className="text-center">Kit No</th>
                                        <th className="text-center">
                                          Alloted Kit QTY
                                        </th>
                                        <th className="text-center">
                                          Received Kit QTY
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {row.oemBinInwardDetails.map((detail) => (
                                        <tr key={detail.id}>
                                          <td className="text-center">
                                            {detail.outwardDocId}
                                          </td>
                                          <td className="text-center">
                                            {detail.outwardDocDate}
                                          </td>
                                          <td className="text-center">
                                            {detail.partName}
                                          </td>
                                          <td className="text-center">
                                            {detail.partNo}
                                          </td>
                                          <td className="text-center">
                                            {detail.kitNo}
                                          </td>
                                          <td className="text-center">
                                            {detail.allotedQty}
                                          </td>
                                          <td className="text-center">
                                            {detail.receivedKitQty}
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
                              message={"Bin Inward Details Not Found..!"}
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
                    {flowList.length > 1 && (
                      <option value="" selected>
                        Select a Flow
                      </option>
                    )}
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

                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Invoice No:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>

                <div className="col-lg-2 col-md-3">
                  <select
                    name="Select Invoice"
                    style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                    className={`form-select form-sz mb-2 ${
                      errors.invNo && "border-red-500"
                    }`}
                    onChange={handleInvNoChange}
                    value={invNo}
                  >
                    <option value="" selected>
                      Select a Invoice
                    </option>
                    {emitterOutwardList.length > 0 &&
                      emitterOutwardList.map((outwardList, index) => (
                        <option
                          key={outwardList.index}
                          value={outwardList.invoiceNo}
                        >
                          {outwardList.invoiceNo}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Dispatch ID:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={"form-control form-sz mb-2"}
                    placeholder=""
                    value={allotedId}
                    disabled
                  />
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Invoice Date:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={"form-control form-sz mb-2"}
                    placeholder=""
                    value={invDate}
                    disabled
                  />
                </div>

                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      OEM Inward No:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className={`form-control form-sz mb-2 ${
                      errors.oemInwardNo && "border-red-500"
                    }`}
                    placeholder=""
                    value={oemInwardNo}
                    onChange={(e) => setOemInwardNo(e.target.value)}
                  />
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      OEM Inward Date:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      value={oemInwardDate}
                      onChange={(newDate) =>
                        setOemInwardDate(dayjs(newDate).format("YYYY-MM-DD"))
                      }
                      slotProps={{
                        textField: {
                          size: "small",
                          error: !!errors.oemInwardDate,
                          // helperText: errors.oemInwardDate,
                          InputProps: {
                            className: errors.oemInwardDate
                              ? "border-red-500"
                              : "",
                          },
                        },
                      }}
                      format="DD/MM/YYYY"
                      // minDate={dayjs().subtract(15, "day")} // Minimum date is 30 days before today
                      // maxDate={dayjs()}
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
                              <th className="text-center">Alloted Id</th>
                              <th className="text-center">Alloted Date</th>
                              <th className="text-center">Part Name</th>
                              <th className="text-center">Part No</th>
                              <th className="text-center">Kit No</th>
                              <th className="text-center">Alloted Qty</th>
                              <th className="text-center">REC QTY</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, index) => (
                              <tr key={row.id}>
                                {/* <td>{index + 1}</td> */}
                                <td className="text-center">{row.allotedId}</td>
                                <td className="text-center">
                                  {row.allotedDate}
                                </td>
                                <td className="text-center">{row.partName}</td>
                                <td className="text-center">{row.partNo}</td>
                                <td className="text-center">{row.kitNo}</td>
                                <td className="text-center">
                                  {row.allotedKitQty}
                                </td>
                                <td className="text-center">
                                  {row.allotedKitQty}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={handleSave}
                    >
                      Inward
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
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

BinInwardOem.propTypes = {
  addInwardManifeast: PropTypes.func,
};

export default BinInwardOem;
