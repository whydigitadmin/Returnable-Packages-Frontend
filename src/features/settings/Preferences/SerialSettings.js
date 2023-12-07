import * as React from "react";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Barcode from "react-barcode";
function SerialSettings() {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const IOSSwitch = styled(({ placeholder, ...props }) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
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

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
    const message = !isSwitchOn
      ? "Serial Scanning is ON."
      : "Serial Scanning is OFF.";
    toast.info(message, { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <>
      <div className="row d-flex">
        <div className="col-6">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <label className="label mb-4">
                <span
                  className={"label-text label-font-size text-base-content"}
                >
                  Serial Scanning
                </span>
              </label>
            </div>
            <div className="col-lg-4 col-md-4">
              <FormControlLabel
                control={
                  <IOSSwitch
                    placeholder="Yes"
                    sx={{ m: 1 }}
                    defaultChecked={isSwitchOn}
                    onChange={handleSwitchChange}
                  />
                }
              />
            </div>
          </div>
          {isSwitchOn && (
            <div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <label className="label mb-4">
                    <span
                      className={"label-text label-font-size text-base-content"}
                    >
                      <strong>Serial nomenclature</strong>
                    </span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <label className="label mb-4">
                    <span
                      className={"label-text label-font-size text-base-content"}
                    >
                      Serial Prefix
                    </span>
                  </label>
                </div>
                <div className="col-lg-4 col-md-4">
                  <input
                    style={{ height: 40, width: "100%", fontSize: "0.800rem" }}
                    type={"text"}
                    // value={value}
                    placeholder={"Prefix"}
                    // onChange={(e) => updateInputValue(e.target.value)}
                    className="input mb-2 p-2 input-bordered"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <label className="label mb-4">
                    <span
                      className={"label-text label-font-size text-base-content"}
                    >
                      PO Id
                    </span>
                  </label>
                </div>
                <div className="col-lg-4 col-md-4">
                  <FormControlLabel
                    control={
                      <IOSSwitch sx={{ m: 1 }} defaultChecked disabled />
                    }
                  />
                </div>
              </div>
              <div className="d-flex flex-row mt-4">
                <button
                  type="button"
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        {isSwitchOn && (
          <div className="col-6">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <label className="label">
                  <span
                    className={"label-text label-font-size text-base-content"}
                  >
                    <strong style={{ fontSize: "24px" }}>
                      Barcode Details
                    </strong>
                  </span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <p style={{ fontSize: "12px" }}>Prefix:</p>
                <p style={{ fontSize: "12px" }}>PO ID: 00001</p>
                <p style={{ fontSize: "12px" }}>Month and Year: 11/23</p>
                <p style={{ fontSize: "12px" }}>Product ID: 00001</p>
                <p style={{ fontSize: "12px" }}>Count: 00001</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <Barcode value="0000111230000100001" />
                <p style={{ textAlign: "right", fontSize: "12px" }}>
                  Sample Barcode
                </p>
              </div>
            </div>
            {/* <p>{data}</p> */}
          </div>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
}
export default SerialSettings;
