import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
function FlowsConfig({ open }) {
  const handleCloseFlowsConfig = () => {
    open(false);
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleCloseFlowsConfig}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Flows Form Config</DialogTitle>
          <IoMdClose
            onClick={handleCloseFlowsConfig}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText className="d-flex flex-column">
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Flow Name
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Flow Info
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Flow Type
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Flow Active
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Orgin Type
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Select Orgin
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Destination Type
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Select Destination
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <p className="text-lg font-bold my-3 ms-4">Item Details</p>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Item Type
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Select Item
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Cycle Time
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Rental Terms
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  defaultChecked
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label className="label label-text label-font-size text-base-content">
                  Fixed Rental Charge
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  type="checkbox"
                  defaultChecked
                  id="flexCheckDefault"
                />
                <label
                  className="label label-text label-font-size text-base-content"
                  for="flexCheckDefault"
                >
                  DHR
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  type="checkbox"
                  defaultChecked
                  id="flexCheckDefault"
                />
                <label
                  className="label label-text label-font-size text-base-content"
                  for="flexCheckDefault"
                >
                  Issue Charge
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 d-flex flex-row">
                <input
                  style={{ marginTop: 10 }}
                  className="form-check-input me-1"
                  type="checkbox"
                  defaultChecked
                  id="flexCheckDefault"
                />
                <label
                  className="label label-text label-font-size text-base-content"
                  for="flexCheckDefault"
                >
                  Return Charge
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  style={{ height: 30, fontSize: "0.800rem", width: "100%" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Type for alias.."}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered mt-1 p-2"
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button>Reset</Button>
          <Button onClick={handleCloseFlowsConfig}>Cancel</Button>
          <Button component="label" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default FlowsConfig;
