import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ReactBarcode from "react-barcode";
import QRCode from "qrcode.react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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

export const AsstTagging = () => {
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [assetList, setAssetList] = React.useState([]);
  const [assetName, setAssetName] = React.useState([]);
  const [toDate, setToDate] = useState(null);
  const [showBarcodeScannerDialog, setShowBarcodeScannerDialog] =
    useState(false);
  const [showQRCodeScannerDialog, setShowQRCodeScannerDialog] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState("");
  const [selectedQRCode, setSelectedQRCode] = useState("");
  const [tagCodeList, setTagCodeList] = useState([]);
  const [assetValue, setAssetValue] = useState(""); // Example of defining assetValue state
  const [assetCodeValue, setAssetCodeValue] = useState(""); // Example of defining assetCodeValue state
  const [endNoValue, setEndNoValue] = useState(""); // Example of defining endNoValue state
  const [startNoValue, setStartNoValue] = useState(""); // Example of defining startNoValue state
  const [docId, setDocId] = useState(""); // State for docId
  const [docDate, setDocDate] = useState(null); // State for docDate
  const [assetCode, setAssetCode] = useState("");
  const [seqFrom, setSeqFrom] = useState("");
  const [seqTo, setSeqTo] = useState("");
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [selectedBarcodeRows, setSelectedBarcodeRows] = useState([]);
  const [selectedQRCodeRows, setSelectedQRCodeRows] = useState([]);

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

  const dataText = [
    {
      assetCode: "PLT",
      asset: "Pallet",
      tagCode: "AI24PLT0001",
    },
  ];

  useEffect(() => {
    getAllTagCode(assetValue, assetCodeValue, endNoValue, startNoValue);
    getAllAssetCode();
  }, [assetValue, assetCodeValue, endNoValue, startNoValue]);

  const getAllTagCode = async (asset, assetcode, endno, startno) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/Tagcode?asset=${assetName}&assetcode=${assetCode}&endno=${seqTo}&startno=${seqFrom}`
      );

      if (response.status === 200) {
        const tagcodes = response.data.paramObjectsMap.tagcode;
        if (Array.isArray(tagcodes)) {
          setTagCodeList(tagcodes);
        } else {
          setTagCodeList([]);
        }
        console.log("Test", tagcodes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleChangeAssetCode = (e) => {
    const selectedCode = e.target.value;
    const selectedAsset = assetList.find(
      (asset) => asset.assetCodeId === selectedCode
    );
    if (selectedAsset) {
      setAssetCode(selectedAsset.assetCodeId); // Set assetCode
      setAssetName(selectedAsset.assetName); // Set assetName
    } else {
      setAssetCode(""); // Set assetCode to an empty string if no option is selected
    }
  };

  const handleSave = async () => {
    const errors = {};

    if (!docId || !docId.trim()) {
      errors.docId = "Document ID is required";
    }
    if (!toDate) {
      errors.toDate = "Doc Date is required";
    }
    if (!assetCode) {
      errors.assetCode = "Asset Code is required";
    }
    if (!assetName || !assetName.trim()) {
      errors.assetName = "Asset Name is required";
    }
    if (!seqFrom || !seqFrom.trim()) {
      errors.seqFrom = "Seq From is required";
    }
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
          tagCode: item.TagCode,
        }));

        // Now proceed to save the data
        const formData = {
          asset: assetName,
          assetCode: assetCode,
          createdBy: userDetail.firstName,
          docDate: toDate,
          docId: docId,
          orgId: userDetail.orgId,
          seqFrom: seqFrom,
          seqTo: seqTo,
          taggingDetailsDTO: taggingDetailsDTO,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/master/assettagging`,
          formData
        );

        console.log("Response:", response.data);
        setDocId("");
        setToDate(null);
        setAssetCode("");
        setAssetName("");
        setSeqFrom("");
        setSeqTo("");
        // Clear table fields
        setTagCodeList([]);

        // Reset assetName state to an empty string or any default value
        setAssetName("");

        setErrors({});
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setErrors(errors);
    }
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

  // Function to handle printing Barcode or QR Code based on selected rows and type
  // const handlePrint = (selectedRows, type) => {
  //   // Filter the tagCodeList based on the selected rows and type (Barcode or QR Code)
  //   const selectedItems = tagCodeList.filter((_, index) =>
  //     selectedRows.includes(index)
  //   );

  //   // Create a new window for printing
  //   const printWindow = window.open("", "_blank");

  //   // Generate the content to be printed based on the type
  //   let content = "";
  //   if (type === "Barcode") {
  //     content = `
  //     <html>
  //       <head>
  //         <title>Print Barcode</title>
  //         <style>
  //           /* Add custom styles for the printed content */
  //           body { font-family: Arial, sans-serif; }
  //           .barcode { margin-bottom: 20px; }
  //           .scanner-image { max-width: 100px; max-height: 100px; }
  //         </style>
  //       </head>
  //       <body>
  //         <h2>Print Barcode</h2>
  //         <div class="barcode">
  //           ${selectedItems
  //             .map(
  //               (item) =>
  //                 `<h3>Scanner: ${item.Scanner}</h3>
  //                  <img class="scanner-image" src="${item.ScannerImage}" alt="Scanner Image" />
  //                  <p>Barcode for ${item.TagCode}:</p>
  //                  <img src="https://barcode.example.com/${item.TagCode}" alt="Barcode" />`
  //             )
  //             .join("")}
  //         </div>
  //       </body>
  //     </html>
  //   `;
  //   } else if (type === "QR Code") {
  //     content = `
  //     <html>
  //       <head>
  //         <title>Print QR Code</title>
  //         <style>
  //           /* Add custom styles for the printed content */
  //           body { font-family: Arial, sans-serif; }
  //           .qrcode { margin-bottom: 20px; }
  //           .scanner-image { max-width: 100px; max-height: 100px; }
  //         </style>
  //       </head>
  //       <body>
  //         <h2>Print QR Code</h2>
  //         <div class="qrcode">
  //           ${selectedItems
  //             .map(
  //               (item) =>
  //                 `<h3>Scanner: ${item.Scanner}</h3>
  //                  <img class="scanner-image" src="${item.ScannerImage}" alt="Scanner Image" />
  //                  <p>QR Code for ${item.TagCode}:</p>
  //                  <img src="https://qrcode.example.com/${item.TagCode}" alt="QR Code" />`
  //             )
  //             .join("")}
  //         </div>
  //       </body>
  //     </html>
  //   `;
  //   }

  //   // Write the content to the new window
  //   printWindow.document.write(content);

  //   // Close the document after printing
  //   printWindow.document.close();

  //   // Print the content
  //   printWindow.print();

  //   // Close the print window
  //   printWindow.close();
  // };

  const handlePrint = (selectedRows, type) => {
    // Filter the tagCodeList based on the selected rows and type (Barcode or QR Code)
    const selectedItems = tagCodeList.filter((_, index) =>
      selectedRows.includes(index)
    );

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate the content to be printed based on the type
    let content = `
        <html>
            <head>
                <title>Print ${type}</title>
                <style>
                    /* Add custom styles for the printed content */
                    body { font-family: Arial, sans-serif; }
                    .scanner-image { max-width: 100px; max-height: 100px; }
                </style>
            </head>
            <body>
                <h2>Print ${type}</h2>
    `;

    // Add barcode or QR code images to the content
    selectedItems.forEach((item) => {
      content += `
            <div>
                <h3>Scanner: ${item.Scanner}</h3>
                <img class="scanner-image" src="${
                  item.ScannerImage
                }" alt="Scanner Image" />
                <p>${type} for ${item.TagCode}:</p>
                ${
                  type === "Barcode"
                    ? `<ReactBarcode value="${item.TagCode}" />`
                    : `<QRCode value="${item.TagCode}" />`
                }
            </div>
        `;
    });

    // Close the HTML content
    content += `
            </body>
        </html>
    `;

    // Write the content to the new window
    printWindow.document.write(content);

    // Close the document after printing
    printWindow.document.close();

    // Print the content
    printWindow.print();

    // Close the print window
    printWindow.close();
  };

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
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
            onChange={(e) => setDocId(e.target.value)}
          />
          {errors.docId && <span className="error-text">{errors.docId}</span>}
        </div>

        {/* Doc Date */}
        <div className="col-lg-3 col-md-3">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Doc Date <FaStarOfLife className="must" /> &nbsp;
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={toDate}
              onChange={(date) => setToDate(date)}
              slotProps={{
                textField: { size: "small", clearable: true },
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          {errors.toDate && (
            <span className="error-text mb-1">{errors.toDate}</span>
          )}
        </div>

        {/* Asset Code */}
        <div className="col-lg-3 col-md-3">
          <label className="label mb-1">
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
            onChange={handleChangeAssetCode} // Call handleChangeAssetCode on change
          >
            <option value="">Select code</option>
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
        <div className="col-lg-3 col-md-3">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Asset <FaStarOfLife className="must" /> &nbsp;
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-3">
          <input
            className="form-control form-sz"
            type="text"
            name="assetName"
            value={assetName} // Set the value of the input field to the asset name state
            readOnly // Make the input field read-only to prevent manual editing
          />
          {errors.assetName && (
            <span className="error-text">{errors.assetName}</span>
          )}
        </div>

        {/* Seq From */}
        <div className="col-lg-3 col-md-3">
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
        </div>

        {/* Seq To */}
        <div className="col-lg-3 col-md-3">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Seq To <FaStarOfLife className="must" /> &nbsp;
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-3">
          <input
            className="form-control form-sz"
            type="text"
            value={seqTo}
            onChange={(e) => setSeqTo(e.target.value)}
          />
          {errors.seqTo && <span className="error-text">{errors.seqTo}</span>}
        </div>
      </div>

      <div className="d-flex flex-row mt-3">
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Save
        </button>
        <button
          type="button"
          // onClick={handleCloseAddItemSpecification}
          className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Cancel
        </button>
      </div>
      <div className="d-flex flex-row mt-5">
        <button
          type="button"
          onClick={handleGenerateTagcode}
          className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Generate Tagcode
        </button>
      </div>
      <button onClick={() => handlePrint(selectedBarcodeRows, "Barcode")}>
        Print Barcode
      </button>
      <button onClick={() => handlePrint(selectedQRCodeRows, "QR Code")}>
        Print QR Code
      </button>

      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {/* <th className="px-2 py-2 bg-blue-500 text-white">
                    {selectedRows.length === tagCodeList.length ? (
                      <input
                        type="checkbox"
                        checked
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    )}
                  </th> */}
                  <th className="px-2 py-2 bg-blue-500 text-white">
                    Asset Code
                  </th>
                  <th className="px-2 py-2 bg-blue-500 text-white">Asset</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">Tag Code</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">
                    <input
                      type="checkbox"
                      checked={
                        selectedBarcodeRows.length === tagCodeList.length
                      }
                      onChange={(e) => handleSelectAllBarcode(e.target.checked)}
                    />

                    <span className="ml-2">Bar Code</span>
                  </th>
                  <th className="px-2 py-2 bg-blue-500 text-white">
                    <input
                      type="checkbox"
                      checked={selectedQRCodeRows.length === tagCodeList.length}
                      onChange={(e) => handleSelectAllQRCode(e.target.checked)}
                    />
                    <span className="ml-2">QR Code</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tagCodeList.map((item, index) => (
                  <tr key={index}>
                    {/* <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td> */}
                    <td className="px-2 py-2">{item.AssetCode}</td>
                    <td className="px-2 py-2">{item.Asset}</td>
                    <td className="px-2 py-2">{item.TagCode}</td>
                    <td className="px-2 py-2">
                      <Button
                        onClick={() =>
                          handleOpenBarcodeScannerDialog(item.TagCode)
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selectedBarcodeRows.includes(index)}
                          onChange={() => handleSelectBarcodeRow(index)}
                        />
                        <span className="ml-2">Scan Barcode</span>
                      </Button>
                    </td>

                    <td className="px-2 py-2">
                      <Button
                        onClick={() =>
                          handleOpenQRCodeScannerDialog(item.TagCode)
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selectedQRCodeRows.includes(index)}
                          onChange={() => handleSelectQRCodeRow(index)}
                        />
                        <span className="ml-2">Scan QR Code</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
};
