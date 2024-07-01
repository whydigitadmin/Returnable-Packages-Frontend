import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import JsBarcode from "jsbarcode";
import QRCodeLib from "qrcode";
import QRCode from "qrcode.react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ReactBarcode from "react-barcode";
import { FaStarOfLife } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#0d6ef",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export function AsstTagging({ addTagging, viewId }) {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [assetList, setAssetList] = React.useState([]);
  const [assetName, setAssetName] = React.useState([]);
  const [toDate, setToDate] = useState(currentDate);
  const [showBarcodeScannerDialog, setShowBarcodeScannerDialog] =
    useState(false);
  const [showQRCodeScannerDialog, setShowQRCodeScannerDialog] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState("");
  const [selectedQRCode, setSelectedQRCode] = useState("");
  const [tagCodeList, setTagCodeList] = useState([]);
  const [viewTagCodeList, setViewTagCodeList] = useState([]);
  const [assetValue, setAssetValue] = useState(""); // Example of defining assetValue state
  const [assetCodeValue, setAssetCodeValue] = useState(""); // Example of defining assetCodeValue state
  const [endNoValue, setEndNoValue] = useState(""); // Example of defining endNoValue state
  const [startNoValue, setStartNoValue] = useState(""); // Example of defining startNoValue state
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [seqFrom, setSeqFrom] = useState("");
  const [seqTo, setSeqTo] = useState("");
  const [generateFlag, setGenerateFlag] = useState(false);
  const [disableFlag, setDisableFlag] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [selectedBarcodeRows, setSelectedBarcodeRows] = useState([]);
  const [selectedQRCodeRows, setSelectedQRCodeRows] = useState([]);
  const [cancelledAssets, setCancelledAssets] = useState([]);
  const [assetCategory, setAssetCategory] = useState("");
  const [assetCategoryList, setAssetCategoryList] = useState([]);
  const [poNo, setPoNo] = useState("");
  const [poDate, setPoDate] = useState(null);
  const [poList, setPoList] = useState([]);

  const handleOpenBarcodeScannerDialog = (tagCode) => {
    setSelectedBarcode(tagCode);
    setShowBarcodeScannerDialog(true);
  };

  const handleCloseBarcodeScannerDialog = () => {
    setShowBarcodeScannerDialog(false);
  };

  const handleOpenQRCodeScannerDialog = (tagCode) => {
    setSelectedQRCode(tagCode);
    setShowQRCodeScannerDialog(true);
  };

  const handleCloseQRCodeScannerDialog = () => {
    setShowQRCodeScannerDialog(false);
  };

  const handleBarcodeScan = (data) => {
    setSelectedBarcode(data);
    handleCloseBarcodeScannerDialog();
  };

  const handleQRCodeScan = (data) => {
    setSelectedQRCode(data);
    handleCloseQRCodeScannerDialog();
  };

  useEffect(
    () => {
      // getAllTagCode(assetValue, assetCodeValue, endNoValue, startNoValue);
      // getAllAssetCode();
      getAllAssetCategory();
      console.log("VIEW ID IS:", viewId);
    },
    []
    // [assetValue, assetCodeValue, endNoValue, startNoValue]
  );

  useEffect(() => {
    if (viewId) {
      getAllAssetTaggingByViewId();
      getAssetCodeByCategory(assetCategory);
      setShowTable(true);
    } else {
      getAssetDocid();
    }
  }, []);

  const getAllAssetTaggingByViewId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAssetTagById?id=${viewId}`
      );

      if (response.status === 200) {
        console.log(response.data.paramObjectsMap.assetTaggingVO);
        setDocId(response.data.paramObjectsMap.assetTaggingVO.docid);
        setDocDate(response.data.paramObjectsMap.assetTaggingVO.docDate);
        setAssetCategory(response.data.paramObjectsMap.assetTaggingVO.category);
        setAssetCode(response.data.paramObjectsMap.assetTaggingVO.assetCode);
        setAssetName(response.data.paramObjectsMap.assetTaggingVO.asset);
        setSeqTo(response.data.paramObjectsMap.assetTaggingVO.seqTo);
        setViewTagCodeList(
          response.data.paramObjectsMap.assetTaggingVO.taggingDetails
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllTagCode = async () => {
    const errors = {};

    // if (!poNo) {
    //   errors.poNo = "Po No is required";
    // }
    // if (!poDate) {
    //   errors.poDate = "Po Date is required";
    // }
    if (!assetCode) {
      errors.assetCode = "Asset Code is required";
    }
    if (!assetCategory) {
      errors.assetCategory = "Asset Category is required";
    }
    if (!assetName) {
      errors.assetName = "Asset Name is required";
    }
    if (!seqTo) {
      errors.seqTo = "QTY is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/master/Tagcode?asset=${assetName}&assetcode=${assetCode}&category=${assetCategory}&endno=${seqTo}`
        );

        if (response.status === 200) {
          const tagcodes = response.data.paramObjectsMap.tagcode;
          setGenerateFlag(true);
          setDisableFlag(true);
          setShowTable(true);
          setErrors({});
          // setPoDate(null);

          if (Array.isArray(tagcodes)) {
            setTagCodeList(tagcodes);
          } else {
            setTagCodeList([]);
          }
          console.log("tagcodes", tagcodes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const getAllAssetCode = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/asset?orgId=${orgId}`
      );

      if (response.status === 200) {
        setAssetList(response.data.paramObjectsMap.assetVO);
        setAssetName(response.data.paramObjectsMap.assetVO.assetName);
        console.log("Test", response.data.paramObjectsMap);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetDocid = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getDocIdByAssetTagging`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.assetTagDocId);
        // console.log(response.data.paramObjectsMap.assetInwardVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllAssetCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/assetGroup`,
        {
          params: {
            orgId: orgId,
            // assetCategory: assetType,
            // assetName: name,
          },
        }
      );

      if (response.status === 200) {
        const assetCategories =
          response.data.paramObjectsMap.assetGroupVO.category;
        // response.data.paramObjectsMap.assetGroupVO.assetGroupVO.category;
        console.log(
          "THE ASSET CATEGORY IS:",
          response.data.paramObjectsMap.assetGroupVO.category
        );
        setAssetCategoryList(assetCategories);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetCodeByCategory = async (name) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllAssetByCategory?category=${name}&orgId=${orgId}`
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setAssetList(response.data.paramObjectsMap.assetVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAssetCategoryChange = (event) => {
    setAssetCategory(event.target.value);
    getAssetCodeByCategory(event.target.value);
    setAssetCode("");
    setAssetName("");
  };

  const handlePoDateChange = (date) => {
    setPoDate(dayjs(date).format("DD-MM-YYYY"));
    console.log("THE SELECTED PODATE IS:", dayjs(date).format("DD-MM-YYYY"));
  };

  const handleChangeAssetCode = (e) => {
    const selectedCode = e.target.value;
    const selectedAsset = assetList.find(
      (asset) => asset.assetCodeId === selectedCode
    );
    if (selectedAsset) {
      setAssetCode(selectedAsset.assetCodeId);
      setAssetName(selectedAsset.assetName);
    } else {
      setAssetCode("");
    }
  };

  const handleSave = async () => {
    const errors = {};

    // if (!docId || !docId.trim()) {
    //   errors.docId = "Document ID is required";
    // }
    if (!toDate) {
      errors.toDate = "Doc Date is required";
    }
    if (!assetCode) {
      errors.assetCode = "Asset Code is required";
    }
    if (!assetName || !assetName.trim()) {
      errors.assetName = "Asset Name is required";
    }
    // if (!seqFrom || !seqFrom.trim()) {
    //   errors.seqFrom = "Seq From is required";
    // }
    if (!seqTo || !seqTo.trim()) {
      errors.seqTo = "Seq To is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Call getAllTagCode with the respective parameters
        await getAllTagCode(
          assetValue,
          assetCodeValue,
          endNoValue,
          startNoValue
        );

        const taggingDetailsDTO = tagCodeList.map((item) => ({
          asset: item.Asset,
          assetCode: item.AssetCode,
          category: item.category,
          tagCode: item.TagCode,
          rfId: item.RFIDCode,
        }));

        // Now proceed to save the data
        const formData = {
          docId: docId,
          docDate: currentDate,
          category: assetCategory,
          assetCode: assetCode,
          asset: assetName,
          // seqFrom: seqFrom,
          poNo,
          poDate,
          seqTo: seqTo,
          taggingDetailsDTO: taggingDetailsDTO,
          orgId: orgId,
          createdBy: userName,
        };

        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/master/assettagging`,
            formData
          )
          .then((response) => {
            if (response.data.statusFlag === "Error") {
              showErrorToast(response.data.paramObjectsMap.errorMessage);
              // toast.error(response.data.paramObjectsMap.errorMessage, {
              //   autoClose: 2000,
              //   theme: "colored",
              // });
            } else {
              console.log("Response:", response.data);
              showSuccessToast(response.data.paramObjectsMap.message);
              // toast.success(response.data.paramObjectsMap.message, {
              //   autoClose: 2000,
              //   theme: "colored",
              // });
              setTimeout(() => {
                handleCancelAsset();
                addTagging(false);
              }, 3000);
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // setErrors(errors);
      showErrorToast(errors);
    }
  };

  const handleCancelAsset = () => {
    // Clear all input fields
    setToDate(currentDate);
    setAssetCode("");
    setAssetName("");
    setSeqFrom("");
    setSeqTo("");
    setPoNo("");
    setPoDate(null);
    setAssetCategory("");
    // Clear table fields
    setTagCodeList([]);
    setViewTagCodeList([]);
    // Clear selected rows
    setSelectedBarcodeRows([]);
    setSelectedQRCodeRows([]);
    // Clear cancelled assets
    setCancelledAssets([]);
    setGenerateFlag(false);
    setDisableFlag(false);
    setShowTable(false);
  };

  const handleGenerateTagcode = () => {
    getAllTagCode();
  };

  // Function to handle selecting individual row in barcode table
  const handleSelectBarcodeRow = (index) => {
    if (selectedBarcodeRows.includes(index)) {
      setSelectedBarcodeRows(
        selectedBarcodeRows.filter((rowIndex) => rowIndex !== index)
      );
    } else {
      setSelectedBarcodeRows([...selectedBarcodeRows, index]);
    }
  };

  // Function to handle selecting all rows in barcode table
  const handleSelectAllBarcode = (checked) => {
    if (checked) {
      const allRows = Array.from(
        { length: tagCodeList.length },
        (_, index) => index
      );
      setSelectedBarcodeRows(allRows);
    } else {
      setSelectedBarcodeRows([]);
    }
  };

  // Function to handle selecting all rows in barcode table
  const handleViewSelectAllBarcode = (checked) => {
    if (checked) {
      const allRows = Array.from(
        { length: viewTagCodeList.length },
        (_, index) => index
      );
      setSelectedBarcodeRows(allRows);
    } else {
      setSelectedBarcodeRows([]);
    }
  };

  // Function to handle selecting individual row in QR code table
  const handleSelectQRCodeRow = (index) => {
    if (selectedQRCodeRows.includes(index)) {
      setSelectedQRCodeRows(
        selectedQRCodeRows.filter((rowIndex) => rowIndex !== index)
      );
    } else {
      setSelectedQRCodeRows([...selectedQRCodeRows, index]);
    }
  };

  // Function to handle selecting all rows in QR code table
  const handleSelectAllQRCode = (checked) => {
    if (checked) {
      const allRows = Array.from(
        { length: tagCodeList.length },
        (_, index) => index
      );
      setSelectedQRCodeRows(allRows);
    } else {
      setSelectedQRCodeRows([]);
    }
  };
  // Function to handle selecting all rows in QR code table
  const handleViewSelectAllQRCode = (checked) => {
    if (checked) {
      const allRows = Array.from(
        { length: viewTagCodeList.length },
        (_, index) => index
      );
      setSelectedQRCodeRows(allRows);
    } else {
      setSelectedQRCodeRows([]);
    }
  };

  const handlePrint = async (selectedRows, type) => {
    const selectedItems = tagCodeList.filter((_, index) =>
      selectedRows.includes(index)
    );

    const printWindow = window.open("", "_blank");

    let content = `
        <html>
            <head>
                <title>Print ${type}</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .scanner-image { max-width: 100px; max-height: 100px; }
                </style>
            </head>
            <body>
                <h2>Print ${type}</h2>
    `;

    selectedItems.forEach((item) => {
      content += `
            <div>
                <img class="scanner-image" src="${
                  item.ScannerImage
                }" alt="Scanner Image" />
                <p>${type} for ${item.TagCode}:</p>
                <canvas id="${type.toLowerCase()}-${item.TagCode}"></canvas>
            </div>
        `;
    });

    content += `
            </body>
        </html>
    `;

    printWindow.document.write(content);

    selectedItems.forEach(async (item) => {
      const canvas = printWindow.document.getElementById(
        `${type.toLowerCase()}-${item.TagCode}`
      );
      if (type === "Barcode") {
        JsBarcode(canvas, item.TagCode);
      } else {
        try {
          await generateQRCode(canvas, item.TagCode);
        } catch (error) {
          console.error("Failed to generate QR code:", error);
        }
      }
    });

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };
  const handleViewPrint = async (selectedRows, type) => {
    const selectedItems = viewTagCodeList.filter((_, index) =>
      selectedRows.includes(index)
    );

    const printWindow = window.open("", "_blank");

    let content = `
        <html>
            <head>
                <title>Print ${type}</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .scanner-image { max-width: 100px; max-height: 100px; }
                </style>
            </head>
            <body>
                <h2>Print ${type}</h2>
    `;

    selectedItems.forEach((item) => {
      content += `
            <div>
                <img class="scanner-image" src="${
                  item.ScannerImage
                }" alt="Scanner Image" />
                <p>${type} for ${item.tagCode}:</p>
                <canvas id="${type.toLowerCase()}-${item.tagCode}"></canvas>
            </div>
        `;
    });

    content += `
            </body>
        </html>
    `;

    printWindow.document.write(content);

    selectedItems.forEach(async (item) => {
      const canvas = printWindow.document.getElementById(
        `${type.toLowerCase()}-${item.tagCode}`
      );
      if (type === "Barcode") {
        JsBarcode(canvas, item.tagCode);
      } else {
        try {
          await generateQRCode(canvas, item.tagCode);
        } catch (error) {
          console.error("Failed to generate QR code:", error);
        }
      }
    });

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const generateQRCode = async (canvas, text) => {
    try {
      await QRCodeLib.toCanvas(canvas, text); // Use renamed QRCodeLib
    } catch (error) {
      throw error;
    }
  };

  const handleRFIDCodeChange = (newRFIDCode, rowIndex) => {
    // Update the tagCodeList array with the new RFID code at the specified index
    setTagCodeList((prevTagCodeList) => {
      // Make a copy of the previous state to avoid mutating it directly
      const updatedTagCodeList = [...prevTagCodeList];
      // Update the RFID code of the specified row
      updatedTagCodeList[rowIndex].RFIDCode = newRFIDCode;
      return updatedTagCodeList;
    });
  };

  const handleAssetTaggingClose = () => {
    addTagging(false);
  };

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
      <div>
        <ToastContainer />
      </div>
      <div className="flex justify-content-end">
        <IoMdClose
          onClick={handleAssetTaggingClose}
          className="cursor-pointer w-8 h-8 mb-3"
        />
      </div>
      <div className="row">
        {/* Doc Id */}
        <div className="col-lg-3 col-md-3">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Doc Id <FaStarOfLife className="must" /> &nbsp;
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-3">
          <input
            className="form-control form-sz"
            type="text"
            value={docId}
            // onChange={(e) => setDocId(e.target.value)}
            disabled
          />
          {/* {errors.docId && <span className="error-text">{errors.docId}</span>} */}
        </div>

        {/* Doc Date */}
        <div className="col-lg-3 col-md-3">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Doc Date <FaStarOfLife className="must" /> &nbsp;
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-4">
          <input
            className="form-control form-sz"
            type="text"
            name="assetName"
            disabled
            value={viewId ? docDate : currentDate}
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-4 col-sm-4">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Po No
              {/* <FaStarOfLife className="must" /> */}
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 col-sm-4">
          <input
            className="form-control form-sz"
            onChange={(e) => setPoNo(e.target.value)}
            value={poNo}
            name="poNo"
            disabled={disableFlag || viewId ? true : false}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
          />
          {errors.poNo && <span className="error-text">{errors.poNo}</span>}
        </div>
        <div className="col-lg-3 col-md-6 mb-4 col-sm-4">
          <label className="label">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              PO Date
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 col-sm-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={poDate}
              disabled={disableFlag || viewId ? true : false}
              onChange={(newDate) => setPoDate(newDate)}
              slotProps={{
                textField: { size: "small", clearable: true },
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>

          {errors.poDate && <span className="error-text">{errors.poDate}</span>}
        </div>

        {/* ASSET CATEGORY FIELD */}
        <div className="col-lg-3 col-md-3 mb-4">
          <span
            className={
              "label-text label-font-size text-base-content d-flex flex-row p-1"
            }
          >
            Asset Category
            <FaStarOfLife className="must" />
          </span>
        </div>
        <div className="col-lg-3 col-md-3 mb-4">
          <select
            name="Select Category"
            style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
            className="input input-bordered ps-2"
            onChange={handleAssetCategoryChange}
            value={assetCategory}
            disabled={disableFlag || viewId ? true : false}
          >
            <option value="" selected>
              Select a Asset Category
            </option>
            {assetCategoryList.length > 0 &&
              assetCategoryList.map((list) => (
                <option key={list.id} value={list}>
                  {list}
                </option>
              ))}
          </select>
          {errors.assetCategory && (
            <span className="error-text">{errors.assetCategory}</span>
          )}
        </div>

        {/* Asset Code */}
        <div className="col-lg-3 col-md-3 mb-4">
          <label className="label">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Asset Code
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-3">
          <select
            className="form-select form-sz w-full mb-2"
            value={assetCode}
            onChange={handleChangeAssetCode}
            disabled={disableFlag || viewId ? true : false}
          >
            <option value="">Select a code</option>
            {assetList.map((code) => (
              <option key={code.id} value={code.assetCodeId}>
                {code.assetCodeId}
              </option>
            ))}
          </select>
          {errors.assetCode && (
            <span className="error-text mb-4">{errors.assetCode}</span>
          )}
        </div>

        {/* Asset */}
        <div className="col-lg-3 col-md-4">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Asset Desc
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-4">
          <input
            className="form-control form-sz"
            type="text"
            name="assetName"
            disabled
            value={assetName}
            readOnly
          />
          {errors.assetName && (
            <span className="error-text">{errors.assetName}</span>
          )}
        </div>

        {/* Seq From */}
        {/* <div className="col-lg-3 col-md-3">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Seq From <FaStarOfLife className="must" /> &nbsp;
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-3">
          <input
            className="form-control form-sz"
            type="text"
            value={seqFrom}
            onChange={(e) => setSeqFrom(e.target.value)}
          />
          {errors.seqFrom && (
            <span className="error-text">{errors.seqFrom}</span>
          )}
        </div> */}

        {/* Seq To */}
        <div className="col-lg-3 col-md-3">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Qty <FaStarOfLife className="must" /> &nbsp;
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-3">
          <input
            className="form-control form-sz"
            type="text"
            value={seqTo}
            onChange={(e) => setSeqTo(e.target.value)}
            disabled={disableFlag || viewId ? true : false}
          />
          {errors.seqTo && <span className="error-text">{errors.seqTo}</span>}
        </div>
      </div>

      {!viewId && (
        <>
          <div className="d-flex flex-row mt-3">
            {generateFlag ? (
              <div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelAsset}
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGenerateTagcode}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Generate Tagcode
              </button>
            )}
          </div>
        </>
      )}
      {/* <div className="d-flex flex-row mt-3">
        {generateFlag ? (
          <div>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelAsset}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGenerateTagcode}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Generate Tagcode
          </button>
        )}
      </div> */}
      {/* <div className="d-flex flex-row mt-4">

      </div> */}
      {/* <div className="row mt-4">
        <div className="col-md-6 d-flex justify-content-start">
          <button
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrint(selectedBarcodeRows, "Barcode")}
          >
            Print Barcode
          </button>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrint(selectedQRCodeRows, "QR Code")}
          >
            Print QR Code
          </button>
        </div>
      </div> */}
      {showTable && (
        <div
          className="row mt-4"
          style={{ overflowX: "auto", maxHeight: "400px" }}
        >
          <div className="col-lg-12">
            <div className="overflow-x-auto">
              {viewId ? (
                <>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Asset
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Asset Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Tag Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={
                              selectedBarcodeRows.length ===
                              viewTagCodeList.length
                            }
                            onChange={(e) =>
                              handleViewSelectAllBarcode(e.target.checked)
                            }
                          />
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <span className="ml-2">Bar Code</span>
                          <span className="ml-2">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() =>
                                handleViewPrint(selectedBarcodeRows, "Barcode")
                              }
                            >
                              <MdPrint style={{ fontSize: "20px" }} />
                            </button>
                          </span>
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={
                              selectedQRCodeRows.length ===
                              viewTagCodeList.length
                            }
                            onChange={(e) =>
                              handleViewSelectAllQRCode(e.target.checked)
                            }
                          />
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <span className="ml-2">QR Code</span>
                          <span className="ml-2">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() =>
                                handleViewPrint(selectedQRCodeRows, "QR Code")
                              }
                            >
                              <MdPrint style={{ fontSize: "20px" }} />
                            </button>
                          </span>
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          RFID Code
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewTagCodeList.map((item, index) => (
                        <tr key={index}>
                          <td className="px-2 py-2">{item.category}</td>
                          <td className="px-2 py-2">{item.assetCode}</td>
                          <td className="px-2 py-2">{item.tagCode}</td>
                          {/* SELECT ALL BARCODE CHECKBOX FIELD */}
                          <td className="px-2 py-2">
                            <input
                              type="checkbox"
                              style={{ cursor: "pointer" }}
                              checked={selectedBarcodeRows.includes(index)}
                              onChange={() => handleSelectBarcodeRow(index)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <Button
                              onClick={() =>
                                handleOpenBarcodeScannerDialog(item.tagCode)
                              }
                            >
                              <span className="ml-2">Scan Barcode</span>
                            </Button>
                          </td>
                          {/* SELECT ALL QRCODE CHECKBOX FIELD */}
                          <td className="px-2 py-2">
                            <input
                              type="checkbox"
                              style={{ cursor: "pointer" }}
                              checked={selectedQRCodeRows.includes(index)}
                              onChange={() => handleSelectQRCodeRow(index)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <Button
                              onClick={() =>
                                handleOpenQRCodeScannerDialog(item.tagCode)
                              }
                            >
                              <span className="ml-2">Scan QR Code</span>
                            </Button>
                          </td>
                          <td className="px-2 py-2">{item.rfId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Asset
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Asset Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Tag Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={
                              selectedBarcodeRows.length === tagCodeList.length
                            }
                            onChange={(e) =>
                              handleSelectAllBarcode(e.target.checked)
                            }
                          />
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <span className="ml-2">Bar Code</span>
                          <span className="ml-2">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() =>
                                handlePrint(selectedBarcodeRows, "Barcode")
                              }
                            >
                              <MdPrint style={{ fontSize: "20px" }} />
                            </button>
                          </span>
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={
                              selectedQRCodeRows.length === tagCodeList.length
                            }
                            onChange={(e) =>
                              handleSelectAllQRCode(e.target.checked)
                            }
                          />
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          <span className="ml-2">QR Code</span>
                          <span className="ml-2">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() =>
                                handlePrint(selectedQRCodeRows, "QR Code")
                              }
                            >
                              <MdPrint style={{ fontSize: "20px" }} />
                            </button>
                          </span>
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          RFID Code
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tagCodeList.map((item, index) => (
                        <tr key={index}>
                          <td className="px-2 py-2">{item.category}</td>
                          <td className="px-2 py-2">{item.AssetCode}</td>
                          <td className="px-2 py-2">{item.TagCode}</td>
                          <td className="px-2 py-2">
                            <input
                              type="checkbox"
                              style={{ cursor: "pointer" }}
                              checked={selectedBarcodeRows.includes(index)}
                              onChange={() => handleSelectBarcodeRow(index)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <Button
                              onClick={() =>
                                handleOpenBarcodeScannerDialog(item.TagCode)
                              }
                            >
                              <span className="ml-2">Scan Barcode</span>
                            </Button>
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="checkbox"
                              style={{ cursor: "pointer" }}
                              checked={selectedQRCodeRows.includes(index)}
                              onChange={() => handleSelectQRCodeRow(index)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <Button
                              onClick={() =>
                                handleOpenQRCodeScannerDialog(item.TagCode)
                              }
                            >
                              <span className="ml-2">Scan QR Code</span>
                            </Button>
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="text"
                              value={item.RFIDCode}
                              onChange={(e) =>
                                handleRFIDCodeChange(e.target.value, index)
                              }
                              className="px-2 py-1 border rounded"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Barcode Scanner Dialogue */}
      <Dialog
        open={showBarcodeScannerDialog}
        onClose={handleCloseBarcodeScannerDialog}
      >
        <DialogTitle>Scan Barcode</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactBarcode
              value={selectedBarcode}
              width={2}
              height={50}
              fontSize={15}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBarcodeScannerDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* QR Code Scanner Dialogue */}
      <Dialog
        open={showQRCodeScannerDialog}
        onClose={handleCloseQRCodeScannerDialog}
      >
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <QRCode
              delay={300}
              onError={(error) => console.log(error)}
              onScan={handleQRCodeScan}
              style={{ width: "100%" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQRCodeScannerDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AsstTagging;
