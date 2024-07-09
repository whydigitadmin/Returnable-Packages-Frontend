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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import NoRecordsFound from "../../utils/NoRecordsFound";
import { Pagination } from "@mui/material";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

function BinOutward() {
  const [flow, setFlow] = React.useState("");
  const [flowData, setFlowData] = React.useState([]);
  const [kitData, setKitData] = useState([]);
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [kitNo, setKitNo] = useState("");
  const [orgin, setOrgin] = useState("");
  const [receiver, setReceiver] = useState("");
  const [destination, setDestination] = useState("");
  const [outwardKitQty, setOutwardKitQty] = useState("");
  const [avlQty, setAvlQty] = useState("");
  const [partName, setPartName] = useState("");
  const [partCode, setPartCode] = useState("");
  const [partQty, setPartQty] = useState("");
  const [filteredPartData, setFilteredPartData] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [emitterId, setEmitterId] = React.useState(
    localStorage.getItem("emitterId")
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("displayName")
  );
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [listViewButton, setListViewButton] = useState(false);
  const [ListViewTableData, setListViewTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [savedRecordView, setSavedRecordView] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the starting index of the current page
  const startIndex = (page - 1) * rowsPerPage;
  // Slice the tableDataView array to get the rows for the current page
  const paginatedData = ListViewTableData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    getAddressById();
    getOutwardDocId();
    getAllBinOutward();
  }, []);

  // LISTVIEW API
  const getAllBinOutward = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinOutward?emitterId=${emitterId}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setListViewTableData(
          response.data.paramObjectsMap.binOutwardVO.reverse()
        );
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSavedRecordViewById = async (rowId) => {
    console.log("THE SELECTED ROW ID IS:", rowId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinOutwardByDocId?docId=${rowId}`
      );

      if (response.status === 200) {
        setSavedRecordView(true);

        console.log(
          "THE SELECTED ROW DATA IS:",
          response.data.paramObjectsMap.binOutwardVO
        );
        setSelectedRowData(response.data.paramObjectsMap.binOutwardVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOutwardDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByBinOutward`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.binOutwardDocId);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectedFlow = (event) => {
    const selectedId = event.target.value;
    setFlow(selectedId);
    getFlowDetailsByFlowId(selectedId);
    getkitNameById(selectedId);
    setKitNo("");
    setPartCode("");
    setPartName("");
    setPartQty("");
    setAvlQty("");
    setOutwardKitQty("");
  };

  const handleSelectedKit = async (event) => {
    const selectedKitNo = event.target.value;
    setKitNo(selectedKitNo);
    await getEmitterOutwardList(selectedKitNo);
    await getAvailableKitQtyByEmitter(selectedKitNo);
  };

  const getEmitterOutwardList = async (kitNo) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getEmitterOutwardList?flowId=${flow}&kitNo=${kitNo}`
      );

      if (response.status === 200) {
        const filteredParts = response.data.paramObjectsMap.EmitterOutward;
        setFilteredPartData(filteredParts);
        setPartCode("");
        setPartName("");
        setPartQty("");
      } else {
        toast.error("Error fetching data!");
      }
    } catch (error) {
      toast.error("Network Error!");
    }
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
        // setUserName(userDetail.firstName);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const getFlowDetailsByFlowId = async (selectedId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${selectedId}`
      );

      if (response.status === 200) {
        setReceiver(response.data.paramObjectsMap.flowVO.receiver);
        setDestination(response.data.paramObjectsMap.flowVO.destination);
        setOrgin(response.data.paramObjectsMap.flowVO.orgin);
        // setReceiverData([...receiverInfo]);
      }
    } catch (error) {
      // toast.error("Network Error!");
    }
  };

  const getkitNameById = async (selectedId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${selectedId}`
      );

      if (response.status === 200) {
        const kits = response.data.paramObjectsMap.flowVO.flowDetailVO;

        const uniqueKitsMap = new Map();
        kits.forEach((kit) => {
          if (!uniqueKitsMap.has(kit.kitNo)) {
            uniqueKitsMap.set(kit.kitNo, {
              partNumber: kit.partNumber,
              kitNo: kit.kitNo,
            });
          }
        });

        const uniqueKitsArray = Array.from(uniqueKitsMap.values());

        setKitData(uniqueKitsArray);
      }
    } catch (error) {
      // toast.error("Network Error!");
    }
  };

  const handleSelectedPart = async (event) => {
    const selectedPartNo = event.target.value;
    setPartCode(selectedPartNo);

    const selectedPart = filteredPartData.find(
      (part) => part.partNo === selectedPartNo
    );
    if (selectedPart) {
      setPartName(selectedPart.partName);
      setPartQty(selectedPart.partQty);
    }
  };

  const getkitAssetDetailsByKitId = async (qty) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getkitAssetDetailsByKitId?kitCode=${kitNo}&quantity=${qty}`
      );

      if (response.status === 200) {
        setTableData(response.data.paramObjectsMap.kitAssetVO);
      }
    } catch (error) {
      // toast.error("Network Error!");
      console.error("Error fetching data:", error);
    }
  };

  const getAvailableKitQtyByEmitter = async (kitQty) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAvailableKitQtyByEmitter?emitterId=${emitterId}&flowId=${flow}&kitId=${kitQty}&orgId=${orgId}`
      );

      if (response.status === 200) {
        const avlKitQty = response.data.paramObjectsMap.avlKitQty;
        if (avlKitQty && avlKitQty.length > 0) {
          setAvlQty(avlKitQty[0].kitAvailQty);
        } else {
          toast.error("Bin Outward Kit Qty Not Found!!");
          setAvlQty("");
        }
      } else {
        toast.error("Error fetching data!");
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const handleKitQty = (event) => {
    const inputValue = event.target.value.toUpperCase().replace(/[^0-9]/g, "");
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue)) {
      if (newValue <= avlQty && newValue !== 0) {
        setOutwardKitQty(newValue);
        setErrors((prevErrors) => ({
          ...prevErrors,
          outwardKitQty: "",
        }));
        getkitAssetDetailsByKitId(newValue);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          outwardKitQty:
            'Kit Qty cannot be "zero" or cannot be more than "Available Kit Qty"',
        }));
      }
    } else {
      setOutwardKitQty("");
    }
  };

  const handleSave = () => {
    const errors = {};
    if (!flow) {
      errors.flow = "Flow is required";
    }

    if (!kitNo) {
      errors.kitNo = "Kit is required";
    }
    if (!partCode) {
      errors.partCode = "Part Number is required";
    }

    if (!receiver) {
      errors.receiver = "Receiver is required";
    }

    if (!outwardKitQty) {
      errors.outwardKitQty = "Outward Kit Qty is required";
    }

    if (Object.keys(errors).length === 0) {
      const requestData = {
        binOutwardDetailsDTO: tableData,
        createdBy: userName,
        destination,
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        emitter: displayName,
        emitterId,
        flowid: flow,
        kitNo,
        orgId,
        orgin,
        partCode,
        partName,
        outwardKitQty,
        receiver,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/binOutward`,
          requestData
        )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            showSuccessToast(response.data.paramObjectsMap.message);
            setFlow("");
            setReceiver("");
            setKitNo("");
            setPartCode("");
            setPartName("");
            setPartQty("");
            setAvlQty("");
            setDestination("");
            setOutwardKitQty("");
            setErrors("");
            getOutwardDocId();
            getAllBinOutward();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Network Error!");
        });
    } else {
      setErrors(errors);
    }
  };

  const handleSavedRecordView = (e) => {
    setSavedRecordView(true);
  };
  const handleSavedRecordViewClose = (e) => {
    setSavedRecordView(false);
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="flex items-center">
            <Link to="/app/welcomeEmitter">
              <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
            </Link>
            <p className="text-2xl">
              <strong className="ml-4">Bin Outward</strong>
            </p>
            <div className="ml-auto">
              {" "}
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
                        <th>Doc Id</th>
                        <th>Date</th>
                        <th>Emitter</th>
                        <th>Receiver</th>
                        <th>Flow</th>
                        <th>Kit</th>
                        <th>Part Name</th>
                        <th>Part No</th>
                        <th>Out Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData && paginatedData.length > 0 ? (
                        paginatedData.map((row) => (
                          <tr key={row.id}>
                            {/* <td>{index + 1}</td> */}
                            <td>
                              {row.docId}
                              {/* <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSavedRecordViewById(row.docId);
                                }}
                                style={{ cursor: "pointer", color: "blue" }}
                              >
                                {row.docId}
                              </a> */}
                            </td>
                            <td>{row.docDate}</td>
                            <td>{row.emitter}</td>
                            <td>{row.receiver}</td>
                            <td>{row.flow}</td>
                            <td>{row.kitNo}</td>
                            <td>{row.partName}</td>
                            <td>{row.partCode}</td>
                            <td>{row.outwardKitQty}</td>
                            {/* <td>{row.balQty}</td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9}>
                            <NoRecordsFound
                              message={"Bin Outward Details Not Found"}
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 d-flex justify-content-center">
                  <Pagination
                    count={Math.ceil(ListViewTableData.length / rowsPerPage)}
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
                    // disabled={viewBinAllotmentId ? true : false}
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
                  {errors.docDate && (
                    <span className="error-text mb-1">{errors.docDate}</span>
                  )}
                </div>
                {/* STOCK BRANCH FIELD */}
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
                      Receiver
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="receiver"
                    value={receiver}
                    disabled
                  />
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Destination
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="destination"
                    value={destination}
                    disabled
                  />
                </div>
                {/* KIT NAME FIELD */}
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Kit
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <select
                    className="form-select form-sz w-full mb-2"
                    value={kitNo}
                    onChange={handleSelectedKit}
                  >
                    <option value="" disabled>
                      Select a Kit
                    </option>
                    {kitData &&
                      kitData.map((kit) => (
                        <option key={kit.id} value={kit.kitNo}>
                          {kit.kitNo}
                        </option>
                      ))}
                  </select>
                  {errors.kitNo && (
                    <span className="error-text mb-1">{errors.kitNo}</span>
                  )}
                </div>

                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Part No
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <select
                    className="form-select form-sz w-full mb-2"
                    value={partCode}
                    onChange={handleSelectedPart}
                  >
                    <option value="" disabled>
                      Select a Part No
                    </option>
                    {filteredPartData &&
                      filteredPartData.map((kit) => (
                        <option key={kit.partNo} value={kit.partNo}>
                          {kit.partNo}
                        </option>
                      ))}
                  </select>
                  {errors.partCode && (
                    <span className="error-text mb-1">{errors.partCode}</span>
                  )}
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Part Name
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="partname"
                    value={partName}
                    disabled
                  />
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Part QTY
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="partQty"
                    value={partQty}
                    disabled
                  />
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Available Kit Qty
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    disabled
                    value={avlQty}
                  />
                </div>
                <div className="col-lg-2 col-md-4">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Outward Kit Qty
                      <FaStarOfLife className="must" />
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-4">
                  <input
                    className="form-control form-sz mb-2"
                    name="outwardKitQty"
                    value={outwardKitQty}
                    onChange={handleKitQty}
                  />
                  {errors.outwardKitQty && (
                    <span className="error-text mb-1">
                      {errors.outwardKitQty}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleSave}
                >
                  Bin Outward
                </button>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
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
        <DialogContent className="mt-3">
          <div className="row">
            <div className="overflow-x-auto w-full ">
              <table className="table table-hover w-full">
                <thead>
                  <tr>
                    <th>Outward ID</th>
                    <th>Date</th>
                    <th>Flow</th>
                    <th>Kit No</th>
                    <th>Receiver</th>
                    <th>Destination</th>
                    <th>Rec Kit QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRowData.map((row, index) => (
                    <tr key={row.id}>
                      <td> {row.docId}</td>
                      <td>{row.docDate}</td>
                      <td>{row.flow}</td>
                      <td>{row.kitNo}</td>
                      <td>{row.receiver}</td>
                      <td>{row.destination}</td>
                      <td>{row.outwardKitQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default BinOutward;
