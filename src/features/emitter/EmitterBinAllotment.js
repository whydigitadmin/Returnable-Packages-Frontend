import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

function EmitterBinAllotment({
  addBinAllotment,
  editBinRequestId,
  viewId,
  editBinKidId,
}) {
  const [addInwardManifeast, setAddInwardManifeast] = useState("");
  const [stockFrom, setStockFrom] = useState("");
  const [stockTo, setStockTo] = useState("");
  const [reqNo, setReqNo] = useState("");
  const [reqDate, setReqDate] = useState("");
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [emitter, setEmitter] = useState("");
  const [flow, setFlow] = useState("");
  const [flowId, setFlowId] = useState("");
  const [reqKitName, setReqKitName] = useState("");
  const [reqPartName, setReqPartName] = useState("");
  const [reqQty, setReqQty] = useState("");
  const [avlQty, setAvlQty] = useState(null);
  const [alotQty, setAlotQty] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [errors, setErrors] = useState({});
  const [filteredStockBranch, setFilteredStockBranch] = useState("");
  const [stockBranchList, setStockBranchList] = useState([]);
  const [reqNoList, setReqNoList] = useState([]);
  const [reqData, setReqData] = useState(null);
  const [emitterId, setEmitterId] = useState("");
  const [reqPartNo, setReqPartNo] = useState("");
  const [viewBinData, setViewBinData] = useState([]);
  const rfIdInputRef = useRef(null);
  const assetIdInputRef = useRef(null);
  const [data, setData] = React.useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [minQty, setMinQty] = useState("");
  const [allotDate, setAllotDate] = useState("");

  const [toDate, setToDate] = useState(null);
  const [extDate, setExtDate] = useState(null);
  const [finYear, setFinYear] = useState("");

  const [allAsset, setAllAsset] = useState("");
  const [aleartState, setAleartState] = useState(false);
  const [allocateErrorMsg, setAllocateErrorMsg] = useState(false);
  const [tableView, setTableView] = useState(false);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      assetId: "",
      rfId: "",
      asset: "",
      assetCode: "",
      qty: 1,
    },
  ]);

  const handleAddRow = () => {
    const hasEmptyAssetCode = tableData.some((row) => row.assetCode === "");

    if (!hasEmptyAssetCode) {
      const newRow = {
        id: tableData.length + 1,
        assetId: "",
        rfId: "",
        asset: "",
        assetCode: "",
        qty: 1,
      };
      setTableData([...tableData, newRow]);
    }
  };

  const [tableData1, setTableData1] = useState([
    {
      id: 1,
      assetId: "",
      rfId: "",
      asset: "",
      assetCode: "",
      qty: 1,
    },
  ]);

  useEffect(() => {
    if (viewId) {
      setTableView(true);
      viewAllotedBinByDocId();
    }
    console.log("VIEWID is:", viewId);
    getNewDocId();
    getBinRequestByReqNo();
    viewAllotedBinByDocId();
    getStockBranch();
  }, [tableData.assetCode, avlQty, flowId]);

  const getNewDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByBinallotment`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        console.log(
          "GET DocId FROM API Response:",
          response.data.paramObjectsMap.allotDocId
        );
        setDocId(response.data.paramObjectsMap.allotDocId);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getBinRequestByReqNo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getReqDetailsByOrgId?orgid=${orgId}&reqNo=${editBinRequestId}&kitNo=${editBinKidId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setReqData(response.data.paramObjectsMap.BinAllotment);

        console.log(
          "GET ONE BINREQ DETAILS FROM API Response:",
          response.data.paramObjectsMap.BinAllotment
        );
        setReqNo(response.data.paramObjectsMap.BinAllotment[0].reqNo);
        setReqDate(response.data.paramObjectsMap.BinAllotment[0].reqDate);
        setEmitter(response.data.paramObjectsMap.BinAllotment[0].emitter);
        setReqKitName(response.data.paramObjectsMap.BinAllotment[0].kitcode);
        setReqPartName(response.data.paramObjectsMap.BinAllotment[0].partname);
        setReqPartNo(response.data.paramObjectsMap.BinAllotment[0].partno);
        setReqQty(response.data.paramObjectsMap.BinAllotment[0].reqKitQty);
        setEmitterId(response.data.paramObjectsMap.BinAllotment[0].emitterid);
        setFlow(response.data.paramObjectsMap.BinAllotment[0].flow);
        setFlowId(response.data.paramObjectsMap.BinAllotment[0].flowid);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStockFromChange = (e) => {
    const selectedValue = e.target.value;
    setStockFrom(selectedValue);
    getAvlQtyByBranch(selectedValue);
  };
  const handleStockToChange = (e) => {
    const selectedValue = e.target.value;
    setStockTo(selectedValue);
  };

  const viewAllotedBinByDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllAllotmentById?docId=${viewId}`
      );
      if (response.status === 200) {
        setViewBinData(response.data.paramObjectsMap.binAllotmentNewVO);
        console.log(
          "API Response:",
          response.data.paramObjectsMap.binAllotmentNewVO
        );
        setDocId(response.data.paramObjectsMap.binAllotmentNewVO[0].docId);
        setAllotDate(
          response.data.paramObjectsMap.binAllotmentNewVO[0].docDate
        );
        setStockFrom(
          response.data.paramObjectsMap.binAllotmentNewVO[0].stockBranch
        );

        setReqNo(response.data.paramObjectsMap.binAllotmentNewVO[0].binReqNo);
        setReqDate(
          response.data.paramObjectsMap.binAllotmentNewVO[0].binReqDate
        );
        setEmitter(response.data.paramObjectsMap.binAllotmentNewVO[0].emitter);
        setFlow(response.data.paramObjectsMap.binAllotmentNewVO[0].flow);
        setReqKitName(
          response.data.paramObjectsMap.binAllotmentNewVO[0].kitCode
        );
        setReqPartName(
          response.data.paramObjectsMap.binAllotmentNewVO[0].partName
        );
        setReqQty(response.data.paramObjectsMap.binAllotmentNewVO[0].reqKitQty);
        setAvlQty(response.data.paramObjectsMap.binAllotmentNewVO[0].avlKitQty);
        setAlotQty(
          response.data.paramObjectsMap.binAllotmentNewVO[0].allotkKitQty
        );
        const viewTableData =
          response.data.paramObjectsMap.binAllotmentNewVO[0].binAllotmentDetailsVO.map(
            (row, index) => ({
              id: index + 1,
              assetId: row.tagCode,
              rfId: row.rfId,
              asset: row.asset,
              assetCode: row.assetCode,
              qty: row.qty,
            })
          );
        setTableData(viewTableData);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStockBranch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getBranchLocationByFlow?flowId=${flowId}&orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setStockBranchList(response.data.paramObjectsMap.assetDetailsVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAvlQtyByBranch = async (selectedValue) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAvalkitqtyByWarehouse?kitName=${reqKitName}&warehouse=${selectedValue}`
      );

      if (response.status === 200) {
        console.log(
          "AVL QTY FROM API IS:",
          response.data.paramObjectsMap.Avalkit[0].avlQty
        );
        setAvlQty(response.data.paramObjectsMap.Avalkit[0].avlQty);
        const a = response.data.paramObjectsMap.Avalkit[0].avlQty;
        if (a >= reqQty) {
          console.log("Req QTY is", reqQty);
          console.log("Avl kit is big");
          setAlotQty(reqQty);
          setMinQty(reqQty);
        } else {
          console.log("Req QTY is big");
          setAlotQty(a);
          setMinQty(a);
        }
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRow = (id) => {
    setTableData((prevTableData) =>
      prevTableData
        .filter((row) => row.id !== id)
        .map((row, index) => ({
          ...row,
          id: index + 1,
        }))
    );
  };

  const handleNew = () => {
    setDocId("");
    setStockFrom("");
    setReqNo("");
    setReqDate(null);
    setEmitter("");
    setFlow("");
    setReqKitName("");
    setReqPartName("");
    setReqQty("");
    setAvlQty("");
    setAlotQty("");
    setTableData([
      {
        id: 1,
        assetId: "",
        rfId: "",
        asset: "",
        assetCode: "",
        qty: "",
      },
    ]);
    setErrors({});
  };
  const handleSave = () => {
    console.log("testing");
    const errors = {};
    if (!docDate) {
      errors.docDate = "Doc Date is required";
    }

    if (!stockFrom) {
      errors.stockFrom = "Stock From is required";
    }

    if (!reqNo) {
      errors.reqNo = "Req No is required";
    }

    if (!reqDate) {
      errors.reqDate = "Req Date is required";
    }

    if (!emitter) {
      errors.emitter = "Emitter Name is required";
    }

    if (!reqQty) {
      errors.reqQty = "Req QTY is required";
    }
    if (!alotQty) {
      errors.alotQty = "Alote QTY is required";
    }

    const tableFormData = tableData.map((row) => ({
      asset: row.asset,
      assetCode: row.assetCode,
      qty: row.qty,
      rfId: row.rfId,
      tagCode: row.assetId,
    }));

    const isTableDataEmpty = tableFormData.some(
      (row) => row.rfId === "" || row.qrCode === ""
    );

    if (isTableDataEmpty) {
      errors.tableData = "Please fill all table fields";
    } else {
      delete errors.tableData;
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        stockBranch: stockFrom,
        binReqNo: reqNo,
        binReqDate: reqDate,
        emitterId: emitterId,
        flowId: flowId,
        flow: flow,
        kitCode: reqKitName,
        reqKitQty: reqQty,
        avlKitQty: avlQty,
        allotKitQty: alotQty,
        partCode: reqPartNo,
        partName: reqPartName,
        createdby: userName,
        orgId: orgId,
        binAllotmentDetailsDTO: tableFormData,
      };
      console.log("Data to save is:", formData);

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/binAllotment`,
          formData
        )
        .then((response) => {
          console.log("After save Response:", response.data);
          const responseDocId =
            response.data.paramObjectsMap.binAllotmentVO.docId;
          handleNew();
          toast.success(
            `Bin Allotment ${responseDocId} Created Successfully!`,
            {
              autoClose: 2000,
              theme: "colored",
            }
          );

          setTimeout(() => {
            addBinAllotment(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error(
            "Failed to Create Emitter Bin Allotment. Please try again."
          );
        });
    } else {
      setErrors(errors);
    }
  };

  const handleEmitterBinAllotmentClose = () => {
    addBinAllotment(false);
  };

  const handleRfIdChange = async (id, field, value) => {
    setTableData((prevTableData) =>
      prevTableData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );

    if (field === "rfId") {
      const isPasted =
        value.length > 1 &&
        value !== tableData.find((row) => row.id === id).rfId;

      if (isPasted) {
        const prevRfId = value;

        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/emitter/getTaggingDetailsByRfId?rfId=${prevRfId}`
          );

          if (response.status === 200) {
            const assetId =
              response.data.paramObjectsMap.assetTaggingDetailsVO.tagCode;
            const asset =
              response.data.paramObjectsMap.assetTaggingDetailsVO.asset;
            const assetCode =
              response.data.paramObjectsMap.assetTaggingDetailsVO.assetCode;

            const updatedTableData = tableData.map((r) =>
              r.id === id
                ? {
                    ...r,
                    assetId: assetId || "",
                    asset: asset || "",
                    assetCode: assetCode || "",
                    qty: 1,
                    rfId: prevRfId,
                  }
                : r
            );

            const lastRow = updatedTableData[updatedTableData.length - 1];
            if (!lastRow || lastRow.rfId !== "") {
              const newRow = {
                id: updatedTableData.length + 1,
                assetId: "",
                rfId: "",
                asset: "",
                assetCode: "",
                qty: "",
              };
              updatedTableData.push(newRow);
            }

            setTableData(updatedTableData);
            setTimeout(() => {
              rfIdInputRef.current.focus();
            }, 0);
          } else {
            console.error("API Error:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }
    }
  };

  const handleTagCodeChange = async (id, field, value) => {
    setTableData((prevTableData) =>
      prevTableData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );

    if (field === "assetId") {
      const isPasted =
        value.length > 1 &&
        value !== tableData.find((row) => row.id === id).assetId;

      if (isPasted) {
        const prevAssetId = value;

        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/emitter/getTaggingDetailsByTagCode?tagCode=${prevAssetId}`
          );

          if (response.status === 200) {
            const rfId =
              response.data.paramObjectsMap.assetTaggingDetailsVO.rfId;
            const asset =
              response.data.paramObjectsMap.assetTaggingDetailsVO.asset;
            const assetCode =
              response.data.paramObjectsMap.assetTaggingDetailsVO.assetCode;

            const updatedTableData = tableData.map((r) =>
              r.id === id
                ? {
                    ...r,
                    rfId: rfId || "",
                    asset: asset || "",
                    assetCode: assetCode || "",
                    qty: 1,
                    assetId: prevAssetId,
                  }
                : r
            );

            const lastRow = updatedTableData[updatedTableData.length - 1];
            if (!lastRow || lastRow.assetId !== "") {
              const newRow = {
                id: updatedTableData.length + 1,
                assetId: "",
                rfId: "",
                asset: "",
                assetCode: "",
                qty: "",
              };
              updatedTableData.push(newRow);
            }

            setTableData(updatedTableData);
            setTimeout(() => {
              assetIdInputRef.current.focus();
            }, 0);
          } else {
            console.error("API Error:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }
    }
  };

  const handleAllotedQtyChange = async () => {
    const handleCheckErrors = {};
    if (!stockFrom) {
      handleCheckErrors.stockFrom = "Stock From is required";
    }
    if (!alotQty) {
      handleCheckErrors.alotQty = "Allot QTY is required";
    }

    if (Object.keys(handleCheckErrors).length === 0) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/master/getRandomStockAssetDetails?branchCode=${stockFrom}&kitCode=${reqKitName}&qty=${alotQty}`
        );
        if (response.status === 200) {
          console.log(
            "API Response:",
            response.data.paramObjectsMap.StockDetails
          );
          const viewTableData = response.data.paramObjectsMap.StockDetails.map(
            (row, index) => ({
              id: index + 1,
              assetId: row.tagCode,
              rfId: row.rfId,
              asset: row.asset,
              assetCode: row.assetCode,
              qty: 1,
            })
          );
          setTableView(true);
          setTableData(viewTableData);
          setErrors({});
        } else {
          console.error("API Error:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setErrors(handleCheckErrors);
    }
  };

  return (
    <>
      <div className="pt-8 card w-full p-3 bg-base-100 shadow-xl mt-2">
        <div className="d-flex justify-content-end">
          {!viewId && (
            <>
              <div>
                <button
                  type="button"
                  className="bg-blue me-3 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleSave}
                >
                  Allot
                </button>
              </div>
            </>
          )}
          <Link to="/app/binallotmentdetails">
            <IoMdClose
              onClick={handleEmitterBinAllotmentClose}
              className="cursor-pointer w-8 h-8 mb-3"
            />
          </Link>
        </div>

        <div className="row mt-3">
          {/* DOC ID FIELD */}
          {viewId && (
            <>
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Doc Id:
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  placeholder="Auto Gen"
                  value={viewId ? viewId : docId}
                  onChange={(e) => setDocId(e.target.value)}
                  disabled
                />
                {errors.docId && (
                  <span className="error-text mb-1">{errors.docId}</span>
                )}
              </div>
            </>
          )}

          {viewId && (
            <>
              {viewId ? (
                <>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Alloted Date:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder="Auto Gen"
                      value={allotDate}
                      disabled
                    />
                    {errors.allotDate && (
                      <span className="error-text mb-1">
                        {errors.allotDate}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Doc Date:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
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
                </>
              )}
            </>
          )}

          {/* REQ NO FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Req No
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              name="reqno"
              value={reqNo}
              disabled
            />
            {errors.reqNo && <span className="error-text">{errors.reqNo}</span>}
          </div>
          {/* REQ DATE FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Req Date:
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              placeholder="Req Date"
              value={reqDate}
              disabled
            />
            {errors.reqData && (
              <span className="error-text mb-1">{errors.reqData}</span>
            )}
          </div>
          {/* EMITTER FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Emitter
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              name="emitter"
              value={emitter}
              disabled
            />
            {errors.emitter && (
              <span className="error-text">{errors.emitter}</span>
            )}
          </div>
          {/* Flow FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Flow
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              name="emitter"
              value={flow}
              disabled
            />
            {errors.flow && <span className="error-text">{errors.flow}</span>}
          </div>
          {/* KIT NAME FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Kit
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              name="kitName"
              value={reqKitName}
              disabled
            />
          </div>
          {/* REQ QTY FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Req QTY
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              name="reqQTY"
              value={reqQty}
              disabled
            />
            {errors.reqQty && (
              <span className="error-text">{errors.reqQty}</span>
            )}
          </div>
          {/* STOCK FROM FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Stock From
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          {viewId ? (
            <>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  name="stockFrom"
                  value={stockFrom}
                  disabled
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-3 col-md-6">
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={handleStockFromChange}
                  value={stockFrom}
                >
                  <option value="" disabled>
                    Select a Warehouse
                  </option>
                  {stockBranchList &&
                    stockBranchList.map((list, index) => (
                      <option key={index} value={list.branchCode}>
                        {list.branchCode}
                      </option>
                    ))}
                </select>
                {errors.stockFrom && (
                  <span className="error-text mb-1">{errors.stockFrom}</span>
                )}
              </div>
            </>
          )}

          {/* AVL QTY FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Avl QTY
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              name="avlQty"
              value={avlQty}
              disabled
            />
            {avlQty === 0 && <span className="error-text">QTY is empty</span>}
            {errors.avlQty && (
              <span className="error-text">{errors.avlQty}</span>
            )}
          </div>
          {/* ALLOCATE QTY FIELD */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Allocate QTY
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              name="alotQty"
              value={alotQty}
              onChange={(e) => {
                const inputValue = e.target.value
                  .toUpperCase()
                  .replace(/[^0-9]/g, "");
                const newValue = parseInt(inputValue, 10);
                if (!isNaN(newValue)) {
                  if (newValue <= minQty && newValue !== 0) {
                    setAlotQty(newValue);
                    setAllocateErrorMsg(false);
                  } else {
                    setAlotQty("");
                    setAllocateErrorMsg(true);
                  }
                } else {
                  setAlotQty("");
                }
              }}
              disabled={viewId ? true : false}
            />
            {allocateErrorMsg && (
              <span className="error-text">
                Allocate Qty is too low or exceed from Available Qty
              </span>
            )}
            {errors.alotQty && (
              <span className="error-text">{errors.alotQty}</span>
            )}
          </div>
        </div>
        {!viewId && (
          <>
            <div className="mt-4">
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleAllotedQtyChange}
              >
                Check
              </button>
            </div>
          </>
        )}

        {tableView && (
          <>
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          S.No
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          Tag Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          RF ID
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          Asset
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          Asset Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          QTY
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData &&
                        tableData.map((row) => (
                          <tr key={row.id}>
                            {/* <td className="border px-2 py-2">{row.id}</td> */}
                            <td className="px-2 py-2 text-center">{row.id}</td>
                            <td className="px-2 py-2 text-center">
                              {row.assetId}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {row.rfId}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {row.asset}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {row.assetCode}
                            </td>
                            <td className="px-2 py-2 text-center">{row.qty}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {errors.tableData && (
              <div className="error-text mt-2">{errors.tableData}</div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default EmitterBinAllotment;
