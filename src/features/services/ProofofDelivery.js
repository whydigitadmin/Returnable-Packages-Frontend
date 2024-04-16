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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";



function ProofofDelivery({ addPod }) {
  const [docId, setDocId] = useState("");
  // const [docDate, setDocDate] = useState(null);
  const [docDate, setDocDate] = useState(dayjs());

  const [refNo, setRefNo] = useState("");
  const [refDate, setRefDate] = useState(null);
  const [kitCode, setKitCode] = useState("");
  const [kitQty, setKitQty] = useState("");
  const [kitRQty, setKitRQty] = useState("");
  const [value, setValue] = React.useState(0);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem("userName"));
  const [errors, setErrors] = useState({});


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
    setUploadedFiles(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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


  const handleNew = () => {
    setDocId("")
    setRefNo("")
    setRefDate(null)
    setKitCode("")
    setKitQty("")
    setKitRQty("")

  };

  const handleSavePod = () => {
    const errors = {};
    console.log("fn called")

    if (!docId) {
      errors.docId = "DocID is required";
    }
    if (!docDate) {
      errors.docDate = "Doc Date is required";
    }
    if (!refNo) {
      errors.refNo = "Ref No is required";
    }
    if (!refDate) {
      errors.refDate = "Ref Date is required";
    }
    if (!kitCode) {
      errors.kitCode = "Kit Code is required";
    }
    if (!kitQty) {
      errors.kitQty = "Kit QTY is required";
    }
    if (!kitRQty) {
      errors.kitRQty = "Kit Return QTY is required";
    }
    if (uploadedFiles[0] === null || uploadedFiles[0] === "") {
      errors.uploadFiles = "Upload File is required.";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {

        // docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        docDate: docDate,
        docId: docId,
        kitCode: kitCode,
        kitQty: kitQty,
        kitRQty: kitRQty,
        rfDate: refDate,
        rfNo: refNo,
        orgId: orgId,
        createdBy: loginUserName,

      }
      console.log("Form Data is:", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/createProofOfDelivery`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          const { docId, rfNo } = response.data.paramObjectsMap.proofOfDeliveryVO;

          const formData1 = new FormData();
          for (let i = 0; i < uploadedFiles.length; i++) {
            formData1.append("file", uploadedFiles[i]);
          }
          formData1.append("docId", docId);
          formData1.append("refNo", rfNo);

          axios
            .post(
              `${process.env.REACT_APP_API_URL}/api/master/uploadFileProofOfDelivery`,
              formData1,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((uploadResponse) => {
              console.log("File Upload Response:", uploadResponse.data);
              toast.success("Proof of Delivery Saved Successfully!", {
                autoClose: 2000,
                theme: "colored",
              });
              handleNew();
              setTimeout(() => {
                addPod(false)

              }, 2500);
            })
            .catch((uploadError) => {
              console.error("File Upload Error:", uploadError);
            });

        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to Save. Please try again.");
        });
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          {errors.docId && (
            <span className="error-text mb-1">{errors.docId}</span>
          )}
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
              disabled
            />
          </LocalizationProvider>
          {errors.docDate && (
            <span className="error-text mb-1">{errors.docDate}</span>
          )}
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
          {errors.refNo && (
            <span className="error-text mb-1">{errors.refNo}</span>
          )}
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
          {errors.refDate && (
            <span className="error-text mb-1">{errors.refDate}</span>
          )}
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
          {errors.kitCode && (
            <span className="error-text mb-1">{errors.kitCode}</span>
          )}
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
              e.target.value = e.target.value.replace(/\D/g, ''); // Allow only numbers
            }}
          />
          {errors.kitQty && (
            <span className="error-text mb-1">{errors.kitQty}</span>
          )}
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
              e.target.value = e.target.value.replace(/\D/g, '');
            }}
          />
          {errors.kitRQty && (
            <span className="error-text mb-1">{errors.kitRQty}</span>
          )}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Upload Receipt
              {/* <FaStarOfLife className="must" /> */}
            </span>
          </label>
        </div>

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
          <br />
          {errors.uploadError && (
            <span className="error-text mb-1">{errors.uploadFiles}</span>
          )}
        </div>
      </div>

      <br></br>
      <div className="d-flex flex-row mt-1">
        <button
          onClick={handleSavePod}
          type="button"
          className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleNew}
          className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ProofofDelivery;