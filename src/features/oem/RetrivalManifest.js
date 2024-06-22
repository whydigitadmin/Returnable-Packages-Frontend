// import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
// import DialogActions from "@mui/material/DialogActions";
// import React, { useState } from "react";
// import { FaStarOfLife } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import TitleCard from "../../components/Cards/TitleCard";
// import dayjs from "dayjs";
// import { FaArrowCircleLeft } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const BILLS = [
//   {
//     assetCode: "IN1234",
//     asset: "INSERT",
//     dayOpening: "20",
//     dayEmpty: "10",
//     dayRetrieval: "10",
//     dayClosing: "20",
//     lastRetrieval: dayjs().format("DD-MM-YYYY"),
//   },
//   {
//     assetCode: "IN1234",
//     asset: "INSERT",
//     dayOpening: "20",
//     dayEmpty: "10",
//     dayRetrieval: "10",
//     dayClosing: "20",
//     lastRetrieval: dayjs().format("DD-MM-YYYY"),
//   },

//   // {
//   //   invoiceNo: "#4523",
//   //   amount: "34,989",
//   //   description: "Product usages",
//   //   status: "Pending",
//   //   generatedOn: moment(new Date())
//   //     .add(-30 * 2, "days")
//   //     .format("DD MMM YYYY"),
//   //   paidOn: "-",
//   // },

//   // {
//   //   invoiceNo: "#4453",
//   //   amount: "39,989",
//   //   description: "Product usages",
//   //   status: "Paid",
//   //   generatedOn: moment(new Date())
//   //     .add(-30 * 3, "days")
//   //     .format("DD MMM YYYY"),
//   //   paidOn: moment(new Date())
//   //     .add(-24 * 2, "days")
//   //     .format("DD MMM YYYY"),
//   // },
// ];

// export const RetrivalManifest = () => {
//   const [bills, setBills] = useState(BILLS);
//   const [isPendingPopupOpen, setPendingPopupOpen] = useState(false);
//   const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
//   const [selectedPendingBill, setSelectedPendingBill] = useState(null);

//   const [name, setName] = React.useState("");

//   const updateFormValue = (value) => {
//     // Handle the form value update
//     setName(value);
//   };

//   const handlePendingStatusClick = (bill) => {
//     setPendingPopupOpen(true);
//     setSelectedPendingBill(bill);
//   };

//   const handlePendingStatusClickIssued = (bill) => {
//     setPendingPopupOpenIssued(true);
//     setSelectedPendingBill(bill);
//   };

//   const closePendingPopup = () => {
//     setPendingPopupOpen(false);
//     setSelectedPendingBill(null);
//   };

//   const closePendingPopupIssued = () => {
//     setPendingPopupOpenIssued(false);
//     setSelectedPendingBill(null);
//   };

//   const getPaymentStatus = (status, bill) => {
//     return (
//       <div
//         className="badge bg-success text-white cursor-pointer"
//         onClick={() => handlePendingStatusClickIssued(bill)}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           className="h-5 w-5" // Adjust the size as needed
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//           />
//         </svg>
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* <div className="d-flex justify-content-end me-4">
//         <button
//           type="button"
//           onClick={handlePendingStatusClickIssued}
//           className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//         >
//           Empty Count
//         </button>
//       </div> */}
//       <div className="container-sm">
//         <div className="card bg-base-100 shadow-xl p-4">
//           <div className="d-flex flex-row">
//             <Link to="/app/welcomeoem">
//               <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
//             </Link>
//             <p className="text-2xl">
//               <strong className="ml-4">
//                 Retrieval Manifest <span className="text-sm">Daywise</span>
//               </strong>
//             </p>
//           </div>

//           {/* Invoice list in table format loaded constant */}
//           <div className="overflow-x-auto w-full ">
//             <table className="table table-hover w-full mt-5">
//               <thead>
//                 <tr>
//                   <th className="text-center">Asset Code</th>
//                   <th className="text-center">Asset</th>
//                   <th className="text-center">Opening</th>
//                   <th className="text-center">Empty</th>
//                   <th className="text-center">Retrieval</th>
//                   <th className="text-center">closing</th>
//                   <th className="text-center">Last Retrieval Date</th>
//                   <th className="text-center">Download</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bills.map((l, k) => {
//                   return (
//                     <tr key={k}>
//                       <td className="text-center">{l.assetCode}</td>
//                       <td className="text-center">{l.asset}</td>
//                       <td className="text-center">{l.dayOpening}</td>
//                       <td className="text-center">{l.dayEmpty}</td>
//                       <td className="text-center">{l.dayRetrieval}</td>
//                       <td className="text-center">{l.dayClosing}</td>
//                       <td className="text-center">{l.lastRetrieval}</td>
//                       <td>
//                         {/* <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
//                             <FontAwesomeIcon
//                               icon={faDownload}
//                               className="mr-1"
//                             />{" "}
//                             Download
//                           </button> */}
//                         <Link to="/app/RetrievalManifest-Report">
//                           <img
//                             src="/RetrivalManifest-download.png"
//                             alt="completed-status-icon"
//                             style={{
//                               width: 40,
//                               height: 40,
//                               margin: "auto",
//                               cursor: "pointer",
//                             }}
//                           />
//                         </Link>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* <Dialog
//             fullWidth={true}
//             maxWidth={"sm"}
//             open={isPendingPopupOpenIssued}
//             onClose={closePendingPopupIssued}
//           >
//             <div className="d-flex justify-content-between">
//               <DialogTitle>Empty Count Manifest</DialogTitle>
//               <IoMdClose
//                 className="cursor-pointer w-8 h-8 mt-3 me-3"
//                 onClick={closePendingPopupIssued}
//               />
//             </div>
//             <DialogContent>
//               <div className="row" style={{ padding: "0% 8% 0% 8%" }}>
//                 <div className="col-lg-1"></div>
//                 <div className="">
//                   <div>
//                     <div className="row mt-4">
//                       <div className="col-lg-4 col-md-6 mb-2">
//                         <label className="label">
//                           <span
//                             className={
//                               "label-text label-font-size text-base-content d-flex flex-row"
//                             }
//                           >
//                             Asset Name :
//                             <FaStarOfLife className="must" />
//                           </span>
//                         </label>
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-2">
//                         <input
//                           className="form-control form-sz mb-2"
//                           type={"text"}
//                           placeholder={""}
//                           // name="storageMapping"
//                           // value={storageMapping}
//                           // onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-lg-4 col-md-6 mb-2">
//                         <label className="label">
//                           <span
//                             className={
//                               "label-text label-font-size text-base-content d-flex flex-row"
//                             }
//                           >
//                             Asset Count :
//                             <FaStarOfLife className="must" />
//                           </span>
//                         </label>
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-2">
//                         <input
//                           className="form-control form-sz mb-2"
//                           type={"text"}
//                           placeholder={""}
//                           // name="storageMapping"
//                           // value={storageMapping}
//                           // onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-lg-4 col-md-6">
//                         <label className="label">
//                           <span
//                             className={
//                               "label-text label-font-size text-base-content d-flex flex-row"
//                             }
//                           >
//                             Day empty count :
//                             <FaStarOfLife className="must" />
//                           </span>
//                         </label>
//                       </div>
//                       <div className="col-lg-6 col-md-6">
//                         <input
//                           className="form-control form-sz mb-2"
//                           type={"text"}
//                           placeholder={""}
//                           // name="storageMapping"
//                           // value={storageMapping}
//                           // onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </DialogContent>
//             <div className="d-flex justify-content-center">
//               <DialogActions className="mb-2 me-2">
//                 <Button
//                   component="label"
//                   variant="contained"
//                   onClick={closePendingPopupIssued}
//                 >
//                   Confirm
//                 </Button>
//               </DialogActions>
//             </div>

//           </Dialog> */}

//         </div>
//       </div>
//     </>
//   );
// };

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
  const [tableData, setTableData] = useState([
    {
      binOutId: "1000001",
      binOutDate: "15-06-2024",
      // flow: "PUN-CH",
      // outQty: "8",
      // balQty: "42",
    },
    {
      binOutId: "1000002",
      binOutDate: "16-06-2024",
      // flow: "PUN-CH",
      // outQty: "8",
      // balQty: "42",
    },
  ]);
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
    // getAllDispatchDetail();
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
                        {/* <th className="text-center">Part Name</th>
                        <th className="text-center">Part No</th>
                        <th className="text-center">Kit</th>
                        <th className="text-center">Kit Qty</th> */}
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
                            {/* <td className="text-center">{row.partName}</td>
                            <td className="text-center">{row.partNo}</td>
                            <td className="text-center">{row.kitNo}</td>
                            <td className="text-center">{row.qty}</td> */}
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
                <div className="col-lg-4">
                  <button
                    type="button"
                    className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    // onClick={(e) => {
                    //   handleListViewButtonChange();
                    // }}
                  >
                    Proceed For Retrieval
                  </button>
                </div>
              </div>
              {/* {errors.tableData && (<div className="error-text mt-2">{errors.tableData}</div>)} */}
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
                        {/* <th>Category</th>
                        <th>Asset Code</th> */}
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

              {/* <div className="mt-2">
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div> */}
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
