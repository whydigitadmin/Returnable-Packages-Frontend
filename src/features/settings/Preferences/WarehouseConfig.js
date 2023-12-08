import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
function WarehouseConfig({ open }) {
  const handleCloseWarehouseConfig = () => {
    open(false);
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleCloseWarehouseConfig}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Warehouse Form Config</DialogTitle>
          <IoMdClose
            onClick={handleCloseWarehouseConfig}
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
                  Warehouse Name
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
                  Warehouse Email
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
                  Warehouse Contact
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
                  Warehouse Address
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
                  Warehouse City
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
                  Warehouse Pincode
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
                  Warehouse State
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
                  Warehouse GST
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
          <Button onClick={handleCloseWarehouseConfig}>Cancel</Button>
          <Button component="label" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default WarehouseConfig;
