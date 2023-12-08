import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
function DcOutwardConfig({ open }) {
  const handleCloseDcOutwardConfig = () => {
    open(false);
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleCloseDcOutwardConfig}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>RTI Outward Form Config</DialogTitle>
          <IoMdClose
            onClick={handleCloseDcOutwardConfig}
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
                  Branch
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
                  Destination Location
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
                  Palace of Supply
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
                  Source of Supply
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
                  Delivery Challan Number
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
                  Delivery Challan Date
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
                  Dispatched Date
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
                  Vehicle Type
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
                  Vehicle Number
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
                  Transport Vendor
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
                  Invoice Number
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
                  LR Number
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
                  ETA
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
                  Customer Notes
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
                  Shipping Charges
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
                  Adjustment
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
                  Terms and Conditions
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
                  Flow
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
                  Product Type
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
                  Product
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
                  Rate
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
                  Quantity
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
                  Amount
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
          <Button onClick={handleCloseDcOutwardConfig}>Cancel</Button>
          <Button component="label" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default DcOutwardConfig;
