import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VisuallyHiddenInput = ({ ...props }) => (
  <input type="file" style={{ display: "none" }} {...props} />
);

const BulkUploadDialog = ({
  open,
  handleClose,
  dialogTitle,
  uploadText,
  downloadText,
  onSubmit,
  sampleFileDownload,
  handleFileUpload,
  onOpenClick,
  apiUrl,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    handleFileUpload(event);
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("files", selectedFile);

      try {
        const response = await axios.post(
          `${apiUrl}?orgId=${orgId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        toast.success("Data Uploaded Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        // Extract error message from response
        const errorMessage =
          error.response?.data?.errorMessage || "Error uploading file";
        toast.error(errorMessage, {
          autoClose: 2000,
          theme: "colored",
        });
      }

      handleClose();
      onSubmit();
    }
  };

  return (
    <div>
      <>
        <ToastContainer />
      </>
      <Button
        className="btn btn-ghost btn-lg text-sm col-xs-1"
        style={{ color: "blue" }}
        onClick={onOpenClick}
      >
        <img
          src="/upload.png"
          alt="pending-status-icon"
          title="add"
          style={{
            width: 30,
            height: 30,
            margin: "auto",
            cursor: "pointer",
          }}
        />
        <span className="text-form text-base" style={{ marginLeft: "10px" }}>
          Bulk Upload
        </span>
      </Button>

      <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between align-items-center p-1">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <IoMdClose
            onClick={handleClose}
            className="cursor-pointer"
            style={{ fontSize: "1.5rem" }}
          />
        </div>
        <DialogContent>
          <DialogContentText className="text-center mb-2">
            Choose a file to upload
          </DialogContentText>
          <div className="d-flex justify-content-center mb-2">
            <Button
              component="label"
              variant="contained"
              startIcon={<FaCloudUploadAlt />}
              style={{ textTransform: "none", padding: "6px 12px" }}
            >
              {uploadText}
              <VisuallyHiddenInput onChange={handleFileChange} />
            </Button>
          </div>
          {selectedFile && (
            <div className="text-center mb-2" style={{ fontSize: "0.875rem" }}>
              Selected file: {selectedFile.name}
              <Button
                size="small"
                onClick={handleCancelFile}
                variant="text"
                color="secondary"
                style={{
                  marginLeft: "10px",
                  textTransform: "none",
                  padding: "2px 4px",
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          <div className="d-flex justify-content-center mb-2">
            <Button
              size="small"
              component="a"
              href={sampleFileDownload}
              variant="outlined"
              startIcon={<FiDownload />}
              style={{ textTransform: "none", padding: "4px 8px" }}
            >
              {downloadText}
            </Button>
          </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-between p-2">
          <Button
            onClick={handleClose}
            style={{ textTransform: "none", padding: "4px 8px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ textTransform: "none", padding: "4px 8px" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BulkUploadDialog;
