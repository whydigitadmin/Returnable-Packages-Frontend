import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Pagination from "@mui/material/Pagination";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { LiaQrcodeSolid } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoRecordsFound from "../../utils/NoRecordsFound";
import IssueManifestReport from "../issueManifestReport/IssueManifestReport";
import BinInwardDetailsDialogNew from "./BinInwardDetailDialogNew";
import BinInwardDetailsDialog from "./BinInwardDetailsDialog";

const DOCDATA = [
  {
    id: 1,
    SID: "IR",
    Prefix: "AI",
    Sequence: "00001",
    Suffix: "ABC",
    Type: "KT",
  },
];

// export const InwardManifest = () => {
function EmitterInwardNew({ addInwardManifeast }) {
  const [docdata, setDocData] = useState(DOCDATA);
  const [docDate, setDocDate] = useState(dayjs());
  const [toDate, setToDate] = useState(null);
  const [extDate, setExtDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [finYear, setFinYear] = useState("");
  const [stockFrom, setStockFrom] = useState("");
  const [stockTo, setStockTo] = useState("");
  const [allotedQty, setAllottedQty] = useState("");
  const [recKitQty, setRecKitQty] = useState("");
  const [allottedDate, setAllottedDate] = useState("");
  const [allotmentNo, setAllotmentNo] = useState("");
  const [flow, setFlow] = useState("");
  const [partName, setPartName] = useState("");
  const [partCode, setPartCode] = useState("");
  const [reqNo, setReqNo] = useState("");
  const [reqDate, setReqDate] = useState("");
  const [kitCode, setKitCode] = useState("");
  const [allotmentVO, setAllotmentVO] = useState([]);
  const [allotmentDetailVO, setAllotmentDetailVO] = useState([]);
  const [allotmentAssetDetailVO, setAllotmentAssetDetailVO] = useState([]);
  const [getAllotmentByIdVO, setGetAllotmentByIdVO] = useState([]);
  const [reqKitQty, setReqKitQty] = useState("");
  const [filteredStockBranch, setFilteredStockBranch] = useState("");
  const [toggleData, setToggleData] = useState(false);
  const [stockBranch, setStockBranch] = useState("");
  const [docId, setDocId] = useState("");
  const [showData, setShowData] = useState(false);
  const [allAsset, setAllAsset] = useState("");
  const [aleartState, setAleartState] = useState(false);
  const [binDocId, setBinDocId] = useState("");
  const [downloadDocId, setDownloadDocId] = useState(null);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      tagCode: "",
      asset: "",
      assetCode: "",
      allotQty: "",
      recQty: "",
      returnQty: "",
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenNew, setDialogOpenNew] = useState(false);
  const [selectedBinInwardDetails, setSelectedBinInwardDetails] = useState([]);

  const [view1, setView1] = useState(true);
  const [view2, setView2] = useState(false);
  const [view3, setView3] = useState(false);
  const [viewButton, setViewButton] = useState(false);
  const [returnRemarks, setReturnRemarks] = useState("");
  const [returnQty, setReturnQty] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [savedDocIdVO, setSavedDocIdVO] = useState([]);
  const [savedKitCodeVO, setSavedKitCodeVO] = useState([]);

  const [tableDataView, setTableDataView] = useState([
    {
      id: 1,
      docid: "",
      docDate: "",
      allotmentNo: "",
      allotDate: "",
      flow: "",
      kitCode: "",
      allotedQty: "",
      binInwardDetailsVO: [],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleDownloadClick = (selectedAllotNo) => {
    setOpenDialog(true);
    setDownloadDocId(selectedAllotNo);
    console.log("Download Doc ID:", selectedAllotNo);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the starting index of the current page
  const startIndex = (page - 1) * rowsPerPage;
  // Slice the tableDataView array to get the rows for the current page
  const paginatedData = tableDataView.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const [tableDataPending, setTableDataPending] = useState([
    {
      id: 1,
      allotNo: "",
      allotDate: "",
      flow: "",
      partName: "",
      kitCode: "",
      reqKitQty: "",
      allotKitQty: "",
    },
  ]);
  //   const [tableData, setTableData] = useState([]);

  //   const handleAddRow = () => {
  //     const newRow = {
  //       id: tableData.length + 1,
  //       sku: "",
  //       code: "",
  //       qty: "",
  //       stockValue: "",
  //       stockLoc: "",
  //       binLoc: "Bulk",
  //     };
  //     setTableData([...tableData, newRow]);
  //   };

  useEffect(() => {
    // 👆 daisy UI themes initialization
    getStockBranch();
    getAllAsset();
    getAllPendingBinInward();
    getInwardDocId();
  }, []);

  const handleStockFromChange = (e) => {
    const selectedValue = e.target.value;
    setAllotmentNo(selectedValue);
    getAllotmentDetails(selectedValue);
    getAllotmentAssetDetails(selectedValue);
  };

  const handleOpenDialog = (binInwardDetails) => {
    console.log("Test19", binInwardDetails);
    setSelectedBinInwardDetails(binInwardDetails);
    getDetailsByDocId(binInwardDetails);

    setDialogOpen(true);
  };

  const handleOpenDialogNew = (kitCode, quantity) => {
    getDetailsByKitId(kitCode, quantity);

    setDialogOpenNew(true);
  };

  const getAllAsset = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/asset?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        // Extracting assetName and skuId from each asset item
        const extractedAssets = response.data.paramObjectsMap.assetVO.map(
          (assetItem) => ({
            assetName: assetItem.assetName,
            assetCodeId: assetItem.assetCodeId,
          })
        );
        setAllAsset(extractedAssets);
        console.log("API:", extractedAssets);
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
        `${
          process.env.REACT_APP_API_URL
        }/api/master/getAllotmentNo?orgid=${orgId}&emitterId=${localStorage.getItem(
          "emitterId"
        )}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setAllotmentVO(response.data.paramObjectsMap.allotno);

        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDetailsByDocId = async (doc) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllBinInwardByDocid?docid=${doc}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setSavedDocIdVO(
          response.data.paramObjectsMap.binInwardVO.binInwardDetailsVO
        );

        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getInwardDocId = async (doc) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getDocIdByBinInward`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.binDocId);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDetailsByKitId = async (kitCode, quantity) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getkitAssetDetailsByKitId?kitCode=${kitCode}&quantity=${quantity}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setSavedKitCodeVO(response.data.paramObjectsMap.kitAssetVO);

        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllotmentDetails = async (selectedValue) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllotmentDetailsByOrgIdAndDocid?orgid=${orgId}&docid=${selectedValue}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setAllotmentDetailVO(response.data.paramObjectsMap.allotDetails);
        setAllottedDate(
          response.data.paramObjectsMap.allotDetails[0].allotDate
        );
        setAllotmentNo(selectedValue);
        setFlow(response.data.paramObjectsMap.allotDetails[0].flow);
        setPartName(response.data.paramObjectsMap.allotDetails[0].part);
        setPartCode(response.data.paramObjectsMap.allotDetails[0].partCode);
        setReqNo(response.data.paramObjectsMap.allotDetails[0].reqNo);
        setReqDate(response.data.paramObjectsMap.allotDetails[0].reqDate);

        setReqKitQty(response.data.paramObjectsMap.allotDetails[0].reqKitQty);
        setAllottedQty(
          response.data.paramObjectsMap.allotDetails[0].allotKitQty
        );
        setKitCode(response.data.paramObjectsMap.allotDetails[0].kitCode);

        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllotmentById = async (selectedValue) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getBinInwardById?id=${selectedValue}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const binInwardVO = response.data.paramObjectsMap.binInwardVO;

        // Map binInwardDetailsVO to the format expected by tableData
        const binInwardDetails = binInwardVO.binInwardDetailsVO.map(
          (detail, index) => ({
            id: index + 1,
            tagCode: detail.tagCode,
            asset: detail.asset,
            assetCode: detail.assetCode,
            allotQty: detail.allotQty,
            recQty: detail.recQty,
            // Add other properties as needed
          })
        );

        // Update tableData with binInwardDetails
        setTableData(binInwardDetails);

        // Set other state variables
        setGetAllotmentByIdVO(binInwardVO);
        setAllottedDate(binInwardVO.allotDate);
        setDocId(binInwardVO.docid);
        setDocDate(binInwardVO.docdate);
        setFlow(binInwardVO.flow);
        setReqNo(binInwardVO.reqNo);
        setReqDate(binInwardVO.binReqDate);
        setAllottedQty(binInwardVO.allotedQty);
        setKitCode(binInwardVO.kitCode);

        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllotmentAssetDetails = async (selectedValue) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllotmentAssetDetailsByOrgIdAndDocid?orgid=${orgId}&docid=${selectedValue}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const allotAssetDetails =
          response.data.paramObjectsMap.allotAssetDetails;

        // Map the API response to the format expected by tableData
        const updatedTableData = allotAssetDetails.map(
          (assetDetail, index) => ({
            id: index + 1, // Assuming this will be unique for each row
            tagCode: assetDetail.tagCode,
            asset: assetDetail.asset,
            assetCode: assetDetail.assetCode,
            allotQty: assetDetail.skuQty, // Adjust this according to your data structure
            recQty: assetDetail.recQty,
            returnQty: "", // Initialize this if needed
          })
        );

        // Update the tableData state with the new data
        setTableData(updatedTableData);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllBinInward = async (selectedValue) => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/api/master/getAllBinInwardById?orgId=${orgId}&emitterid=${localStorage.getItem(
          "emitterId"
        )}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const allotAssetDetails =
          response.data.paramObjectsMap.binInwardVO.reverse();

        const updatedTableData = allotAssetDetails.map(
          (assetDetail, index) => ({
            id: index + 1,
            docid: assetDetail.docid,
            docDate: assetDetail.docDate,
            allotmentNo: assetDetail.allotmentNo,
            allotDate: assetDetail.allotDate,
            flow: assetDetail.flow,
            kitCode: assetDetail.kitCode,
            part: assetDetail.part,
            partCode: assetDetail.partCode,
            allotedQty: assetDetail.allotedQty,
            binInwardId: assetDetail.binInwardId,
            reqKitQty: assetDetail.reqKitQty,
            binInwardDetailsVO: assetDetail.binInwardDetailsVO,
          })
        );

        setTableDataView(updatedTableData);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllPendingBinInward = async (selectedValue) => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/api/master/getWaitingBinInwardDetailsByEmitterAndOrgId?orgId=${orgId}&emitterid=${localStorage.getItem(
          "emitterId"
        )}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const allotAssetDetails = response.data.paramObjectsMap.allotDetails;

        const updatedTableData = allotAssetDetails.map(
          (assetDetail, index) => ({
            id: index + 1,
            allotNo: assetDetail.allotNo,
            allotDate: assetDetail.allotDate,
            flow: assetDetail.flow,
            partName: assetDetail.partName,
            partNo: assetDetail.partNo,
            kitCode: assetDetail.kitCode,
            reqKitQty: assetDetail.reqKitQty,
            allotKitQty: assetDetail.allotKitQty,
            binInwardId: assetDetail.binInwardId,
          })
        );

        setTableDataPending(updatedTableData);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRow = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    const errors = {};

    if (!allotmentNo) {
      errors.allotmentNo = "AllotmentNo is required";
    }

    const tableFormData = tableData.map((row) => ({
      tagCode: row.tagCode,
      asset: row.asset,
      assetCode: row.assetCode,
      allotQty: row.allottedQty,
      recQty: row.recQty,
      returnQty: row.returnQty,
    }));

    // Check if any table fields are empty

    if (Object.keys(errors).length === 0) {
      const formData = {
        binInwardDetailsDTO: tableFormData,
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        allotedQty,
        allotmentNo,
        flow,
        kitCode,
        partName,
        partCode,
        reqNo,
        binReqDate: reqDate,
        allotDate: allottedDate,
        orgId,
        emitterId: localStorage.getItem("emitterId"),
        reqKitQty,
        returnQty: returnQty ? returnQty : 0,
        returnRemarks,
        createdBy: userName,
      };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/emitter/updateCreateBinInward`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          // setAleartState(true);
          setDocDate(null);
          setDocId("");
          setReqDate("");
          setReqNo("");
          setRecKitQty("");
          setAllottedDate("");
          getAllPendingBinInward();
          setReqKitQty("");
          setFlow("");
          setKitCode("");
          setAllottedQty("");
          setErrors({});
          setReturnQty("");
          setReturnRemarks("");
          setView2(false);
          setView1(true);
          setTableData([
            {
              id: 1,
              tagCode: "",
              asset: "",
              assetCode: "",
              allotQty: "",
              recQty: "",
              returnQty: "",
            },
          ]);

          const formData1 = new FormData();
          for (let i = 0; i < uploadedFiles.length; i++) {
            formData1.append("file", uploadedFiles[i]);
          }
          formData1.append("allotNo", allotmentNo);

          axios
            .post(
              `${process.env.REACT_APP_API_URL}/api/emitter/uploadPodFilePath`,
              formData1,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((uploadResponse) => {
              console.log("File Upload Response:", uploadResponse.data);
              setAllotmentNo("");
              setSelectedFiles("");
              getAllPendingBinInward();
              // window.location.reload();
              // toast.success("Proof of Delivery Saved Successfully!", {
              //   autoClose: 2000,
              //   theme: "colored",
              // });
            })
            .catch((uploadError) => {
              console.error("File Upload Error:", uploadError);
            });
          toast.success("Bin Inward Updated Successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to update user. Please try again.");
        });
    } else {
      setErrors(errors);
    }
  };

  const handleInwardmanifeastClose = () => {
    addInwardManifeast(false);
  };

  const handleView = (binInwardId) => {
    setToggleData(!toggleData);
    console.log("binInwardId", binInwardId);
    setView2(true);
    setViewButton(true);
    setView1(false);
    getAllotmentDetails(binInwardId);
    getAllotmentAssetDetails(binInwardId);
  };

  const viewSavedRecords = () => {
    getAllBinInward();
    setShowData(true);
    // setView3(true);
    setView3(!view3);
    setViewButton(false);
    setView2(false);
    // setView2(!view2)
    // setView1(false);
    setView1(!view1);
  };
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
    }
    const fileNames = Array.from(files).map((file) => file.name);
    // Update the selectedFiles state with the array of file names
    setSelectedFiles(fileNames);
  };
  const handleBack = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div
        className="pt-8 card p-3 bg-base-100 shadow-xl mt-2"
        style={{ width: "85%", margin: "auto" }}
      >
        <div className="flex items-center mt-1">
          <Link to="/app/welcomeemitter" className="mr-4">
            <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
          </Link>{" "}
          <p className="text-2xl">
            <strong>
              {view1 ? "Pending Bin Inward Details" : " Bin Inward Details"}
            </strong>
          </p>
          {!viewButton && (
            <div className="ml-auto">
              {" "}
              <button
                type="button"
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={viewSavedRecords}
              >
                {view3 ? "Close" : "Inwarded Bins"}
              </button>
            </div>
          )}
        </div>

        {view1 && (
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="overflow-x-auto">
                <table className="table table-hover w-full">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th className="px-2 text-black border text-center">
                        Action
                      </th>
                      <th
                        className="px-2 text-black border text-center"
                        style={{ width: "15%" }}
                      >
                        Allotment No
                      </th>
                      <th
                        className="px-2 text-black border text-center"
                        style={{ paddingTop: "1%", paddingBottom: "1%" }}
                      >
                        Allotment Date
                      </th>

                      <th className="px-2 text-black border text-center">
                        Kit No
                      </th>
                      <th className="px-2 text-black border text-center">
                        Req Qty
                      </th>
                      <th className="px-2 text-black border text-center">
                        Alloted QTY
                      </th>

                      <th className="px-2 text-black border text-center">
                        Flow
                      </th>
                      <th className="px-2 text-black border text-center">
                        Part Name
                      </th>
                      <th className="px-2 text-black border text-center">
                        Part No
                      </th>

                      <th className="px-2 text-black border text-center">
                        Fulfillment %
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {tableDataPending && tableDataPending.length > 0 ? (
                      tableDataPending.map((row) => (
                        <tr key={row.id}>
                          <td
                            className="border px-2 py-2 text-center d-flex justify-content-center"
                            style={{
                              cursor: "pointer",
                              color: "black",
                            }}
                          >
                            <img
                              src="/RetrivalManifest-download.png"
                              alt="pending-status-icon"
                              title="add"
                              onClick={() => handleDownloadClick(row.allotNo)}
                              style={{
                                width: 30,
                                height: 30,
                                margin: "auto",
                                hover: "pointer",
                              }}
                            />
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleView(row.allotNo);
                              }}
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                width: "auto",
                                color: "blue",
                              }}
                            >
                              {row.allotNo}
                            </a>
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.allotDate}
                          </td>

                          <td className="border px-2 py-2 text-center">
                            {row.kitCode}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.reqKitQty}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.allotKitQty}
                          </td>

                          <td className="border px-2 py-2 text-center">
                            {row.flow}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.partName}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.partNo}
                          </td>

                          <td className="border px-2 py-2 text-center">
                            {/* {((row.allotKitQty / row.reqKitQty) * 100).toFixed(
                              2
                            )} */}
                            {(row.allotKitQty / row.reqKitQty) * 100}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10}>
                          <NoRecordsFound
                            message={"Pending Bin Inward not found"}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <>
          {" "}
          {view2 && (
            <div>
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
                    className="form-control form-sz mb-2"
                    //   placeholder="Doc Id"
                    value={docId}
                    onChange={(e) => setDocId(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Date:
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
                  {/* {errors.docDate && (
              <span className="error-text mb-1">{errors.docDate}</span>
            )} */}
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Allotment No
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder=""
                    value={allotmentNo}
                    onChange={(e) => setAllotmentNo(e.target.value)}
                    disabled
                  />
                  {errors.allotmentNo && (
                    <span className="error-text mb-2">
                      {errors.allotmentNo}
                    </span>
                  )}
                </div>

                <div className="col-lg-2 col-md-3 d-none">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Allotment Date{" "}
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3 d-none">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder=""
                    value={allottedDate}
                    onChange={(e) => setAllottedDate(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>
                <div className="col-lg-2 col-md-3 d-none">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Request No
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3 d-none">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder="Req No"
                    value={reqNo}
                    onChange={(e) => setReqNo(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>
                <div className="col-lg-2 col-md-3 d-none">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Request Date
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3 d-none">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder="Req Date"
                    value={reqDate}
                    onChange={(e) => setReqDate(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-md-3 d-none">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Flow
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3 d-none">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder="Flow"
                    value={flow}
                    onChange={(e) => setFlow(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Kit No
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder="Kit No"
                    value={kitCode}
                    onChange={(e) => setKitCode(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>

                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Req Kit QTY
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder="Alloted Kit Qty"
                    value={reqKitQty}
                    onChange={(e) => setReqKitQty(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>
                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Alloted Kit Qty
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className="form-control form-sz mb-2"
                    //   placeholder="Alloted Kit Qty"
                    value={allotedQty}
                    onChange={(e) => setAllottedQty(e.target.value)}
                    disabled
                  />
                  {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
                </div>

                {/* <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Return QTY
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className="form-control form-sz mb-2"
                    value={returnQty}
                    onChange={(e) => setReturnQty(e.target.value)}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    maxLength={4}
                  />
                </div>

                <div className="col-lg-2 col-md-3">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Return Remarks
                    </span>
                  </label>
                </div>
                <div className="col-lg-2 col-md-3">
                  <input
                    className="form-control form-sz mb-2"
                    value={returnRemarks}
                    onChange={(e) => setReturnRemarks(e.target.value)}
                  />
                </div> */}

                <div className="col-lg-2 col-md-6">
                  <label className="label mb-4">
                    <span className="label-text label-font-size text-base-content d-flex flex-row">
                      Upload Acknowledgement
                      {/* <FaStarOfLife className="must" /> */}
                    </span>
                  </label>
                </div>

                <div className="col-lg-2 col-md-6">
                  <input
                    type="file"
                    id="file-input"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <label htmlFor="file-input">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<FaCloudUploadAlt />}
                    >
                      Upload file
                    </Button>
                  </label>
                  <br />
                  {/* Display the selected file names */}
                  {selectedFiles.map((fileName, index) => (
                    <div style={{ font: "10px" }} key={index}>
                      {fileName}
                    </div>
                  ))}
                  {/* Display upload error */}
                  {errors.uploadError && (
                    <span className="error-text mb-1">
                      {errors.uploadFiles}
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded"
            onClick={handleAddRow}
          >
            + Add
          </button>
        </div> */}
              <div className="row mt-2">
                <div className="col-lg-12">
                  <div className="overflow-x-auto d-none">
                    <table className="w-full">
                      <thead>
                        <tr>
                          {/* <th className="px-2 py-2 bg-blue-500 text-white">Action</th> */}
                          <th className="px-2 py-2 bg-blue-500 text-white">
                            S.No
                          </th>
                          <th className="px-2 py-2 bg-blue-500 text-white">
                            Tag Code
                          </th>
                          <th className="px-2 py-2 bg-blue-500 text-white">
                            Asset
                          </th>
                          <th className="px-2 py-2 bg-blue-500 text-white">
                            Asset Code
                          </th>
                          <th className="px-2 py-2 bg-blue-500 text-white">
                            Alloted Qty
                          </th>
                          <th className="px-2 py-2 bg-blue-500 text-white">
                            Received Qty
                          </th>
                          {/* <th className="px-2 py-2 bg-blue-500 text-white">
                      Return Qty
                    </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData &&
                          tableData.map((row) => (
                            <tr key={row.id}>
                              {/* <td className="border px-2 py-2">
                          <button
                            onClick={() => handleDeleteRow(row.id)}
                            className="text-red-500"
                          >
                            <FaTrash style={{ fontSize: "18px" }} />
                          </button>
                        </td> */}
                              <td className="border px-2 py-2">
                                <input
                                  type="text"
                                  value={row.id}
                                  onChange={(e) =>
                                    setTableData((prev) =>
                                      prev.map((r) =>
                                        r.id === row.id
                                          ? { ...r, id: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                  disabled
                                  style={{ width: "100%" }}
                                />
                              </td>
                              <td className="border px-2 py-2">
                                <input
                                  type="text"
                                  value={row.tagCode}
                                  onChange={(e) =>
                                    setTableData((prev) =>
                                      prev.map((r) =>
                                        r.id === row.id
                                          ? { ...r, tagCode: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                  disabled
                                  style={{ width: "100%" }}
                                />
                              </td>
                              <td className="border px-2 py-2">
                                <input
                                  type="text"
                                  value={row.asset}
                                  onChange={(e) =>
                                    setTableData((prev) =>
                                      prev.map((r) =>
                                        r.id === row.id
                                          ? { ...r, asset: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                  disabled
                                  style={{ width: "100%" }}
                                />
                              </td>

                              <td className="border px-2 py-2">
                                <input
                                  type="text"
                                  value={row.assetCode}
                                  onChange={(e) =>
                                    setTableData((prev) =>
                                      prev.map((r) =>
                                        r.id === row.id
                                          ? { ...r, assetCode: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                  disabled
                                  style={{ width: "100%" }}
                                />
                              </td>

                              <td className="border px-2 py-2">
                                <input
                                  type="text"
                                  value={row.allotQty}
                                  onChange={(e) =>
                                    setTableData((prev) =>
                                      prev.map((r) =>
                                        r.id === row.id
                                          ? { ...r, allotQty: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                  disabled
                                  style={{ width: "100%" }}
                                />
                              </td>
                              <td className="border px-2 py-2">
                                <input
                                  type="text"
                                  value={row.recQty}
                                  disabled
                                  onChange={(e) =>
                                    setTableData((prev) =>
                                      prev.map((r) =>
                                        r.id === row.id
                                          ? { ...r, rec: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                />
                              </td>
                              {/* <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.returnQty}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, returnQty: e.target.value }
                                    : r
                                )
                              )
                            }
                            disabled
                          />
                        </td> */}
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
              <div className="">
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleSave}
                >
                  Bin Inward
                </button>
              </div>
            </div>
          )}
          {view3 && (
            <div className="col-lg-12 mt-6">
              <div className="overflow-x-auto">
                <table className="table table-hover w-full">
                  <thead>
                    <tr>
                      <th className="px-2 text-black border text-center">
                        Action
                      </th>
                      <th
                        className="text-black border px-2 text-center"
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          width: "13%",
                        }}
                      >
                        DocId
                      </th>
                      <th className="px-2 text-black border text-center">
                        DocDate
                      </th>
                      <th className="px-2 text-black border text-center">
                        Allotment No
                      </th>
                      <th className="px-2 text-black border text-center">
                        Allotment Date
                      </th>
                      <th className="px-2 text-black border text-center">
                        Flow
                      </th>
                      <th className="px-2 text-black border text-center">
                        Kit No
                      </th>
                      <th className="px-2 text-black border text-center">
                        Part Name
                      </th>
                      <th className="px-2 text-black border text-center">
                        Part No
                      </th>
                      <th className="px-2 text-black border text-center">
                        Req Qty
                      </th>
                      <th className="px-2 text-black border text-center">
                        Alloted QTY
                      </th>
                      <th className="px-2 text-black border text-center">
                        Fulfillment %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData && paginatedData.length > 0 ? (
                      paginatedData.map((row) => (
                        <tr key={row.id}>
                          <td
                            className="border px-2 py-2 text-center d-flex justify-content-center"
                            style={{
                              cursor: "pointer",
                              color: "black",
                            }}
                          >
                            {/* <IoMdDownload
                              className="w-7 h-7"
                              onClick={() =>
                                handleDownloadClick(row.allotmentNo)
                              }
                            /> */}
                            <img
                              src="/RetrivalManifest-download.png"
                              alt="pending-status-icon"
                              title="add"
                              onClick={() =>
                                handleDownloadClick(row.allotmentNo)
                              }
                              style={{
                                width: 30,
                                height: 30,
                                margin: "auto",
                                hover: "pointer",
                              }}
                            />
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <span
                              onClick={() => {
                                console.log("Row Data:", row);
                                handleOpenDialog(row.docid);
                              }}
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                width: "100%",
                                color: "blue",
                              }}
                            >
                              {row.docid}
                            </span>
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.docDate}
                          </td>

                          <td className="border px-2 py-2 text-center">
                            {row.allotmentNo}
                          </td>

                          <td className="border px-2 py-2 text-center">
                            {row.allotDate}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.flow}
                          </td>
                          <td className="border px-2 py-2 text-center text-center">
                            <span
                              onClick={() => {
                                console.log("Row Data:", row);
                                handleOpenDialogNew(
                                  row.kitCode,
                                  row.allotedQty
                                );
                              }}
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                width: "100%",
                                color: "blue",
                              }}
                            >
                              {row.kitCode}
                            </span>
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.part}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.partCode}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.reqKitQty}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {row.allotedQty}
                          </td>
                          <td className="border px-2 py-2 text-center">
                            {(row.allotedQty / row.reqKitQty) * 100}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={12}>
                          <NoRecordsFound
                            message={"Bin Inward Details Not Found"}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 d-flex justify-content-center">
                <Pagination
                  count={Math.ceil(tableDataView.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            </div>
          )}
        </>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          {/* Content of your dialog */}
          {/* Add your download logic or content here */}
          <IssueManifestReport goBack={handleBack} docId={downloadDocId} />
        </DialogContent>
      </Dialog>
      <ToastContainer />

      <BinInwardDetailsDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        binInwardDetails={savedDocIdVO}
      />
      <BinInwardDetailsDialogNew
        isOpen={dialogOpenNew}
        onClose={() => setDialogOpenNew(false)}
        binInwardDetails={savedKitCodeVO}
      />
    </>
  );
}

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default EmitterInwardNew;
