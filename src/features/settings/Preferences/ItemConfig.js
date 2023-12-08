import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
function ItemConfig({ open }) {
  const handleCloseItemConfig = () => {
    open(false);
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleCloseItemConfig}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Item Form Config</DialogTitle>
          <IoMdClose
            onClick={handleCloseItemConfig}
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
                  Name
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
                  SKU
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
                  Product Unit
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
                  Active
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
                  Dimensions
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
                  Length
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
                  Width
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
                  Weight
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
                  Manufacturer
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
                  EAN
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
                  Brand
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
            <p className="text-lg font-bold my-3 ms-4">Inventory Information</p>
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
                  Asset Category
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
                  Maintenance Period
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
                  Expected Life
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
                  Expected Trips
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
                  Scrap Value
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
                  HSN Code
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
                  Tax Rate
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
                  Cost Price
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
                  Sell Price
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
          <Button onClick={handleCloseItemConfig}>Cancel</Button>
          <Button component="label" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ItemConfig;
