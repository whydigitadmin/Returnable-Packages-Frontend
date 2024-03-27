import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { FaStarOfLife } from "react-icons/fa";

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

export const ChargeCode = () => {
  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Code <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="Code"
            //   value={entityLegalName}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.entityLegalName && (
              <span className="error-text">{errors.entityLegalName}</span>
            )} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Description
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="Description"
            //   value={displyName}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.displyName && (
              <span className="error-text">{errors.displyName}</span>
            )} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Service Code
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="Service Code"
            //   value={email}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.email && <span className="error-text">{errors.email}</span>} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span className={"label-text label-font-size text-base-content"}>
              RCode
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="RCode"
            //   value={phoneNumber}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.phoneNumber && (
            <span className="error-text">{errors.phoneNumber}</span>
          )} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              CCode
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="CCode"
            //   value={email}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.email && <span className="error-text">{errors.email}</span>} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              RLedger
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="RLedger"
            //   value={email}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.email && <span className="error-text">{errors.email}</span>} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              CLedger
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="CLedger"
            //   value={email}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.email && <span className="error-text">{errors.email}</span>} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              From Date:
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              // value={fromDate}
              // onChange={handleIssueDateChange}
              // minDate={currentDate}
              slotProps={{
                textField: { size: "small", clearable: true },
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          {/* {errors.flowName && (
                  <span className="error-text mb-1">{errors.flowName}</span>
                )} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              To Date:
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              // value={fromDate}
              // onChange={handleIssueDateChange}
              // minDate={currentDate}
              slotProps={{
                textField: { size: "small", clearable: true },
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          {/* {errors.flowName && (
                  <span className="error-text mb-1">{errors.flowName}</span>
                )} */}
        </div>
        <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              GST
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            // placeholder={"Enter"}
            name="GST"
            //   value={email}
            //   onChange={handleInputChange}
            //   disabled={isSubmitting}
          />
          {/* {errors.email && <span className="error-text">{errors.email}</span>} */}
        </div>
        {/* <div className="col-lg-3 col-md-6">
          <label className="label mb-4">
            <span className={"label-text label-font-size text-base-content"}>
              Vendor Activate Portal
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <FormControlLabel
            control={<IOSSwitch disabled sx={{ m: 1 }} defaultChecked />}
          />
        </div> */}
        {/* <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div> */}
        <div className="d-flex flex-row mt-1 mb-2">
          <button
            type="button"
            //   onClick={handleVender}
            //   disabled={addressShow === true}
            //   style={{ cursor: addressShow ? "not-allowed" : "pointer" }}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            //   onClick={handleCloseAddVendor}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
