import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SessionExpiry({ sessionExpired }) {
  const [sessionExpiry, setSessionExpired] = React.useState(sessionExpired);
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );

  const handleClose = async () => {
    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/logout?userName=${userName}`,
          { headers }
        );
        if (response) {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
            localStorage.clear();
            window.location.href = "/login";
          }
        } else {
          console.error("API Error:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleLogin = () => {
    setSessionExpired(false);
    handleClose(); // Close the dialog after the login button is clicked
  };

  return (
    <div className="">
      <Dialog open={sessionExpiry}>
        <DialogTitle>Your Session Has Expired</DialogTitle>
        <DialogContent style={{ display: "flex", alignItems: "center" }}>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/11261/11261776.png"}
            alt="Session expired"
            style={{ width: "45px", marginRight: "10px" }}
          />
          <p>Please log in again to continue.</p>
        </DialogContent>
        <DialogActions style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SessionExpiry;
