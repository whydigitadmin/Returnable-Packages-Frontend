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
  const [kit, setKit] = useState("");
  const [avlQty, setAvlQty] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [emitterId, setEmitterId] = React.useState(
    localStorage.getItem("emitterId")
  );
  const [invNo, setInvNo] = useState("");
  const [invDate, setInvDate] = useState(null);
  const [dispatchRemarks, setDispatchRemarks] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getAddressById();
    getOutwardDocId();
  }, []);

  const getOutwardDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByBinOutward`
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
    const dispatchDetailsDetails = selectedRowData.map((row) => ({
      binOutDocDate: row.binOutDate,
      binOutDocid: row.binOutId,
      kitNo: row.kitNo,
      partName: row.partName,
      partNo: row.partNo,
      qty: row.qty,
    }));
    const requestData = {
      docId: "",
      emitterId: emitterId,
      flow: flow,
      invoiceDate: invDate,
      invoiceNo: invNo,
      dispatchRemarks: dispatchRemarks,
      dispatchDetailsDTO: dispatchDetailsDetails,
      createdby: userName,
      orgId: orgId,
    };
    console.log("SELECTED CHECKBOX DATA'S", selectedRowData);
    console.log("DATA TO SAVE IS:", requestData);
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

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="row">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/welcomeemitter">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Emitter Dispatch</strong>
                </span>
              </p>
            </div>
          </div>

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
                  Flow
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
                  Invoice No
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
                            <td className="text-center">{row.binOutDate}</td>
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
              Save
            </button>
          </div>
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
