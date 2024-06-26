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

export const EmitterDispatch = () => {
  const [flow, setFlow] = React.useState("");
  const [flowData, setFlowData] = React.useState([]);
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [emitterId, setEmitterId] = React.useState(
    localStorage.getItem("emitterId")
  );
  const [invNo, setInvNo] = useState("");
  const [invDate, setInvDate] = useState(null);
  const [grnNo, setGrnNo] = useState("");
  const [grnDate, setGrnDate] = useState(null);
  const [dispatchRemarks, setDispatchRemarks] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [listViewButton, setListViewButton] = useState(false);
  const [listViewTableData, setListViewTableData] = useState([]);
  const [viewId, setViewId] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    getAddressById();
    getDocIdByDispatch();
    // getAllDispatchDetail();
    // if (viewId) {
    //   getAllDispatchDetail();
    //   // setDocId("abc");
    // } else {
    //   getDocIdByDispatch();
    // }
  }, []);

  const getDocIdByDispatch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByDispatch`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.binOutwardDocId);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllDispatchDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllDispatch?emitterId=${emitterId}`
      );
      if (response.status === 200) {
        setListViewTableData(response.data.paramObjectsMap.dispatchVO);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const handleSelectedFlow = (event) => {
    const selectedId = event.target.value;
    setFlow(selectedId);
    getEmitterDispatchByFlowId(selectedId);
    setTableView(true);
  };

  const getAddressById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/getFlowByUserId?userId=${userId}`
      );

      if (response.status === 200) {
        const validFlows = response.data.paramObjectsMap.flowVO
          .filter(
            (flow) =>
              typeof flow.flowName === "string" && flow.flowName.trim() !== ""
          )
          .map((flow) => ({ id: flow.id, flow: flow.flowName }));
        setFlowData(validFlows);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const getEmitterDispatchByFlowId = async (selectedId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getEmitterDispatchByFlowId?emitterId=${emitterId}&flowId=${selectedId}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setTableData(response.data.paramObjectsMap.EmitterDispatch);
      }
    } catch (error) {
      toast.error("Network Error!");
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
    setFlow("");
    setInvNo("");
    setInvDate(null);
    setDispatchRemarks("");
    setSelectedRowData("");
    setTableData("");
    setTableView(false);
  };

  const handleSave = () => {
    const errors = {};
    if (!flow) {
      errors.flow = "Flow is required";
    }
    if (!invDate) {
      errors.invDate = "Invoice Date is required";
    }
    if (!invNo) {
      errors.invNo = "Invoice No is required";
    }
    const dispatchDetailsDetails = selectedRowData.map((row) => ({
      binOutDocDate: row.binOutDate,
      binOutDocid: row.binOutId,
      kitNo: row.kitNo,
      partName: row.partName,
      partNo: row.partNo,
      qty: row.qty,
    }));
    const requestData = {
      docId: docId,
      emitterId: emitterId,
      flowId: flow,
      invoiceDate: invDate,
      invoiceNo: invNo,
      dispatchRemarks: dispatchRemarks,
      dispatchDetailsDTO: dispatchDetailsDetails,
      createdby: userName,
      orgId: orgId,
    };
    if (Object.keys(errors).length === 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/createDispatch`,
          requestData
        )
        .then((response) => {
          handleNew();
          toast.success("Dispatch Completed Successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Network Error!");
        });
    } else {
      setErrors(errors);
    }
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
    getAllDispatchDetail();
    setListViewButton(!listViewButton);
    setViewId("");
    setFlow("");
    // setTableData("");
  };

  const handleSavedRecordView = (rowId) => {
    setViewId(rowId);
    setListViewButton(false);
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="flex items-center">
            <Link to="/app/welcomeemitter">
              <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
            </Link>
            <p className="text-2xl">
              <strong className="ml-4">Emitter Dispatch</strong>
            </p>
            <div className="ml-auto">
              {" "}
              <button
                type="button"
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={(e) => {
                  handleListViewButtonChange();
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
                        {/* <th>S.No</th> */}
                        <th>DocId</th>
                        <th>Date</th>
                        <th>Flow</th>
                        <th>Invoice No</th>
                        <th>Invoice Date</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listViewTableData.map((row, index) => (
                        <React.Fragment key={row.id}>
                          <tr style={{ backgroundColor: "red" }}>
                            <td>{row.docId}</td>
                            <td>{row.docDate}</td>
                            <td>{row.flow}</td>
                            <td>{row.invoiceNo}</td>
                            <td>{row.invoiceDate}</td>
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
                              <td colSpan="6">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th
                                        style={{
                                          backgroundColor: "green",
                                        }}
                                      >
                                        Bin Out Docid
                                      </th>
                                      <th style={{ backgroundColor: "green" }}>
                                        Bin Out Doc Date
                                      </th>
                                      <th style={{ backgroundColor: "green" }}>
                                        Part Name
                                      </th>
                                      <th style={{ backgroundColor: "green" }}>
                                        Part No
                                      </th>
                                      <th style={{ backgroundColor: "green" }}>
                                        Kit No
                                      </th>
                                      <th style={{ backgroundColor: "green" }}>
                                        Qty
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row.dispatchDetailsVO.map((detail) => (
                                      <tr key={detail.id}>
                                        <td
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.binOutDocid}
                                        </td>
                                        <td
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.binOutDocDate}
                                        </td>
                                        <td
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.partName}
                                        </td>
                                        <td
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.partNo}
                                        </td>
                                        <td
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.kitNo}
                                        </td>
                                        <td
                                          style={{
                                            backgroundColor: "yellow",
                                          }}
                                        >
                                          {detail.qty}
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
                  {errors.docId && (
                    <span className="error-text mb-1">{errors.docId}</span>
                  )}
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
                  {errors.docDate && (
                    <span className="error-text mb-1">{errors.docDate}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Flow:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <select
                    className="form-select form-sz w-full mb-2"
                    value={flow}
                    onChange={handleSelectedFlow}
                  >
                    <option value="">Select a Flow</option>
                    {flowData &&
                      flowData.map((flowName) => (
                        <option key={flowName.id} value={flowName.id}>
                          {flowName.flow}
                        </option>
                      ))}
                  </select>
                  {errors.flow && (
                    <span className="error-text mb-1">{errors.flow}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Invoice No:
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="invoice"
                    maxLength={15}
                    value={invNo}
                    onChange={(e) => setInvNo(e.target.value)}
                  />
                  {errors.invNo && (
                    <span className="error-text mb-1">{errors.invNo}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Invoice Date:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      value={invDate}
                      onChange={(date) =>
                        setInvDate(dayjs(date).format("YYYY-MM-DD"))
                      }
                      slotProps={{
                        textField: { size: "small" },
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  {errors.invDate && (
                    <span className="error-text mb-1">{errors.invDate}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Receiver Inward No:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="grnNo"
                    maxLength={15}
                    value={grnNo}
                    disabled
                    onChange={(e) => setGrnNo(e.target.value)}
                  />
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      {/* GRN Date: */}
                      Receiver Inward Date:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      disabled
                      value={grnDate}
                      onChange={(date) =>
                        setGrnDate(dayjs(date).format("YYYY-MM-DD"))
                      }
                      slotProps={{
                        textField: { size: "small" },
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  {errors.grnDate && (
                    <span className="error-text mb-1">{errors.grnDate}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Dispatch Remarks:
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="dispatch"
                    value={dispatchRemarks}
                    onChange={(e) => setDispatchRemarks(e.target.value)}
                  />
                </div>
              </div>

              {tableView && (
                <>
                  <div className="row mt-2">
                    <div className="overflow-x-auto w-full ">
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
                            <th className="text-center">Part Name</th>
                            <th className="text-center">Part No</th>
                            <th className="text-center">Kit</th>
                            <th className="text-center">Kit Qty</th>
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
                                <td className="text-center">{row.binOutId}</td>
                                <td className="text-center">
                                  {row.binOutDate}
                                </td>
                                <td className="text-center">{row.partName}</td>
                                <td className="text-center">{row.partNo}</td>
                                <td className="text-center">{row.kitNo}</td>
                                <td className="text-center">{row.qty}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={9}>
                                <NoRecordsFound
                                  message={"Emitter Dispatch Details Not Found"}
                                />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* {errors.tableData && (<div className="error-text mt-2">{errors.tableData}</div>)} */}
                </>
              )}

              <div className="mt-2">
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleSave}
                >
                  Dispatch
                </button>
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
