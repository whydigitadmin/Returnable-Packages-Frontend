import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

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
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successfulUploads, setSuccessfulUploads] = useState(0); // State for successful uploads count
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    handleFileUpload(event);
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
    setErrorMessage("");
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    setSuccessMessage("");
    setSuccessfulUploads(0); // Reset successful uploads count
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("files", selectedFile);

      try {
        const response = await axios.post(
          `${apiUrl}?orgId=${orgId}&createdBy=${userDetail.firstName}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.status) {
          console.log("File uploaded successfully:", response.data);
          const { message, successfulUploads } = response.data.paramObjectsMap;
          setSuccessMessage(message);
          setSuccessfulUploads(successfulUploads);
          setSuccessDialogOpen(true);
          setSelectedFile(null);
        } else {
          const errorMessage =
            response.data.paramObjectsMap.errorMessage ||
            "Error uploading file";
          setErrorMessage(errorMessage);
          setErrorDialogOpen(true);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        const errorMessage =
          error.response?.data?.paramObjectsMap?.errorMessage ||
          error.response?.data?.message ||
          "Error uploading file";
        setErrorMessage(errorMessage);
        setErrorDialogOpen(true);
      }

      handleClose();
      onSubmit();
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <Button
        className="btn btn-primary btn-md text-sm col-xs-1"
        style={{ color: "blue" }}
        onClick={onOpenClick}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/1091/1091885.png"
          alt="pending-status-icon"
          title="add"
          style={{
            width: 30,
            height: 30,
            margin: "auto",
            cursor: "pointer",
          }}
        />
        <span
          className="text-form text-black font-semibold"
          style={{ marginLeft: "5px" }}
        >
          Bulk Upload
        </span>
      </Button>

      <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between align-items-center p-1">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <IconButton onClick={handleClose} style={{ color: "#f44336" }}>
            <IoMdClose style={{ fontSize: "1.5rem" }} />
          </IconButton>
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

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={errorDialogOpen}
        onClose={handleErrorDialogClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "10px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/753/753345.png"
            width={30}
            height={30}
            alt="Error Icon"
            style={{ marginRight: "10px" }}
          />
          <Typography variant="h6" component="span" style={{ flexGrow: 1 }}>
            Upload Failed
          </Typography>
          <IconButton
            onClick={handleErrorDialogClose}
            style={{ color: "grey" }}
          >
            <IoMdClose style={{ fontSize: "1.5rem" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorMessage.split(", ").map((msg, index) => (
              <Typography
                key={index}
                variant="body2"
                style={{ marginBottom: "5px" }}
              >
                {msg}
              </Typography>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={successDialogOpen}
        onClose={handleSuccessDialogClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "10px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/14090/14090371.png"
            height={40}
            width={40}
            alt="Success Icon"
            style={{ marginRight: "10px" }}
          />
          <Typography variant="h6" component="span" style={{ flexGrow: 1 }}>
            Upload Successful
          </Typography>
          <IconButton
            onClick={handleSuccessDialogClose}
            style={{ color: "#4caf50" }}
          >
            <IoMdClose style={{ fontSize: "1.5rem" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2">
              Successful Uploads: {successfulUploads}
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkUploadDialog;
