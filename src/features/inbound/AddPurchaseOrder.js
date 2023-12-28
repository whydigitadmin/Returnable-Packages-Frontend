import * as React from "react";
import ToolTip from "../../components/Input/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

function AddPurchaseOrder({ addPurchase }) {
  const [docDate, setDocDate] = React.useState(null);
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const handlePurchase = () => {
    addPurchase(false);
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-4 ms-4">
            New Purchase Order
          </h1>
          <IoMdClose
            onClick={handlePurchase}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Vendor Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Select"}
              content={
                "The name of the supplier or vendor providing the product."
              }
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Deliver to
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Select"}
              content={
                "The designated location or address where the product should be delivered."
              }
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Purchase Order
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              name="Select Item"
              disabled
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="Transit">PO1111</option>
            </select>
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Purchase Order Date
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                // style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                slotProps={{
                  textField: {
                    size: "small",
                    clearable: true,
                  },
                }}
                value={docDate}
                onChange={(newValue) => setDocDate(newValue)}
              />
            </LocalizationProvider>
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Reference No
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Select"}
              content={
                "Enter a unique identifier or code for easy tracking and identification"
              }
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Payment Terms(Days)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Select"}
              content={
                "The number of days agreed upon for making payment after receiving the invoice from the vendor"
              }
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Delivery Terms(Days)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <ToolTip
              placeholder={"Select"}
              content={
                "The agreed-upon number of days within which the product should be delivered after placing the order."
              }
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className={"label-text label-font-size text-base-content"}>
                Import
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6">
            <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} />
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-4">Item Details</h1>
        <div className="row">
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Product Type
            </label>
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
              <option value="">Item</option>
              <option value="">ItemGroups</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label label-text label-font-size text-base-content mb-2">
              Product
            </label>
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
            </select>
          </div>
          <div className="col-lg-1 col-md-2">
            <label className="label label-text label-font-size text-base-content mb-2">
              Rate
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-1 col-md-2">
            <label className="label label-text label-font-size text-base-content mb-2">
              Quantity
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={"Enter"}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Tax
            </label>
            <select
              name="Select Item"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input mb-4 input-bordered ps-2"
            >
              <option value="">Select</option>
              <option value="">0%</option>
              <option value="">5%</option>
              <option value="">12%</option>
              <option value="">18%</option>
              <option value="">28%</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Amount
            </label>
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              // value={value}
              placeholder={""}
              // onChange={(e) => updateInputValue(e.target.value)}
              className="input mb-2 p-2 input-bordered"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 border-dotted border-2 border-black-600 text-center rounded mb-2">
          <button
            type="button"
            class="inline-block w-full px-2 pb-2 pt-2.5 text-xs font-medium leading-normal hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
          >
            + Add Item
          </button>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6  my-4">
            <label className="label label-text label-font-size text-base-content mb-2">
              Vendor Notes
            </label>
            <textarea
              style={{ fontSize: "0.800rem" }}
              className="form-control w-48 label"
              placeholder="Thanks for your business"
            ></textarea>
          </div>
          <div className="col-lg-6 col-md-6 my-4 border rounded py-2">
            <div className="d-flex justify-content-between">
              <div>
                <label className="label label-text label-font-size text-base-content mb-2">
                  Sub Total
                </label>
                <label className="label label-text label-font-size text-base-content mb-2">
                  Shipping Charges
                </label>
                <label className="label label-text label-font-size text-base-content mb-2">
                  Adjustment
                </label>
                <label className="label fw-bold label-text label-font-size text-base-content mb-2">
                  Total
                </label>
              </div>
              <div className="d-flex flex-column me-3 text-end">
                <p className="mb-3">₹0.00</p>
                <input
                  style={{ height: 40, fontSize: "0.800rem" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Enter"}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input mb-2 p-2 input-bordered"
                />
                <input
                  style={{ height: 40, fontSize: "0.800rem" }}
                  type={"text"}
                  // value={value}
                  placeholder={"Enter"}
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input mb-2 p-2 input-bordered"
                />
                <p className="fw-bold mt-2">₹0.00</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-3">
            <label className="label label-text label-font-size text-base-content mb-2">
              Terms & Conditions
            </label>
            <textarea
              style={{ fontSize: "0.800rem" }}
              className="form-control label"
              placeholder="Enter the term and conditions of your business to be displayed in your transaction"
            ></textarea>
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handlePurchase}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPurchaseOrder;
