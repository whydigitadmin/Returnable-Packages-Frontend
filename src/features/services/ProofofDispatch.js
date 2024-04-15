import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStarOfLife, FaTrash } from "react-icons/fa";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";


function ProofofDispatch({ addPod }) {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(null);
  const [refNo, setRefNo] = useState("");
  const [refDate, setRefDate] = useState(null);
  const [kitCode, setKitCode] = useState("");
  const [kitQty, setKitQty] = useState("");
  const [kitRQty, setKitRQty] = useState("");
  const [value, setValue] = React.useState(0);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [tableData, setTableData] = useState([
    {
      id: 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    },
  ]);
  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    };
    setTableData([...tableData, newRow]);
  };

  const [tableData1, setTableData1] = useState([
    {
      id: 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    },
  ]);

  const handleAddRow1 = () => {
    const newRow1 = {
      id: tableData1.length + 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    };
    setTableData1([...tableData1, newRow1]);
  };

  const handleDeleteRow = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  const handleDeleteRow1 = (id) => {
    setTableData1(tableData1.filter((row) => row.id !== id));
  };

  const handleFileUpload = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Process the file as needed, such as uploading to a server
      console.log('File:', file);
    }
  };


  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleServiceSave = () => {
    const errors = {};

    const formData = {
      active: true,
      cancel: false,
      orgId,
      docId: docId,
      docDate: docDate,
      kitCode: kitCode,
      kitQty: kitQty,
      kitRqty: kitRQty,
      refDate: refDate,
      refNo: refNo,
      pod1DTO: tableData.map((row) => ({
        acceptQty: row.acceptQty,
        allotQty: row.allotQty,
        assetCode: row.assetCode,
        description: row.description,
      })),
      pod2DTO: tableData1.map((row) => ({
        acceptQty: row.acceptQty,
        allotQty: row.allotQty,
        rejectedQty: row.rejectedQty,
        returnQty: row.returnQty,
      })),
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/master/updateCreatePod`,
        formData
      )
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Handle displaying fields based on mode and tab selection
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handlePodClose = () => {
    addPod(false)
  }

  return (
    <div className="card w-full p-3 bg-base-100 shadow-xl mt-2">
      <div className="d-flex justify-content-end">
        <IoMdClose
          onClick={handlePodClose}
          className="cursor-pointer w-8 h-8 mb-3"
        />
      </div>
      <div className="row mt-3">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Doc Id <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="Doc Id"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6 mt-2">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Doc Date
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mt-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={docDate}
              onChange={(date) => setDocDate(date)}
              slotProps={{
                textField: { size: "small", clearable: true },
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          {/* {errors.toDate && (
              <span className="error-text mb-1">{errors.toDate}</span>
            )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Ref No
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="Ref No"
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6 mt-2">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Ref Date
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mt-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={refDate}
              onChange={(date) => setRefDate(date)}
              slotProps={{
                textField: { size: "small", clearable: true },
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          {/* {errors.toDate && (
              <span className="error-text mb-1">{errors.toDate}</span>
            )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Kit Code
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="kit code"
            value={kitCode}
            onChange={(e) => setKitCode(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Kit QTY
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="Kit Qty"
            value={kitQty}
            onChange={(e) => setKitQty(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Kit R QTY
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="kit return qty"
            value={kitRQty}
            onChange={(e) => setKitRQty(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Upload Receipt
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        {/* <div className="col-lg-3 col-md-6">
          <Button
            component="label"
            variant="contained"
            startIcon={<FaCloudUploadAlt />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </div> */}
        <div className="col-lg-3 col-md-6">
          <input
            type="file"
            id="file-input"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload files
            </Button>
          </label>
        </div>
      </div>

      <br></br>
    </div>
  );
};
export default ProofofDispatch;