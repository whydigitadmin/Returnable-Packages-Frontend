import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BinOutwardOem({}) {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [kitName, setKitName] = useState("");
  const [outwardKitQty, setOutwardKitQty] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState({});

  const [tableData, setTableData] = useState([
    {
      id: 1,
      asset: "",
      assetCode: "",
      qty: "",
    },
  ]);

  const handleSave = () => {
    // Validation
    const errors = {};
    if (!kitName.trim()) {
      errors.kitName = "Kit No is required";
    }
    if (!outwardKitQty.trim()) {
      errors.outwardKitQty = "Outward Kit Qty is required";
    }
    tableData.forEach((row) => {
      if (!row.asset.trim()) {
        errors.asset = "Asset is required";
      }
      if (!row.assetCode.trim()) {
        errors.assetCode = "Asset Code is required";
      }
      if (!row.qty.trim()) {
        errors.qty = "Qty is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no validation errors, proceed to save
    const formData = {
      createdBy: "string", // Replace "string" with actual value
      docDate: docDate.format("YYYY-MM-DD"),
      kit: kitName,
      oemBinOutwardDetails: tableData.map((row) => ({
        asset: row.asset,
        assetCode: row.assetCode,
        qty: parseInt(row.qty),
      })),
      orgId: 0, // Replace 0 with actual value
      outwardKitQty: parseInt(outwardKitQty),
    };

    axios
      .post("/api/oem/updateCreateOemBinOutward", formData)
      .then((response) => {
        // Handle successful response
        console.log("Response:", response.data);
        // Optionally, show a success message
        toast.success("Bin Outward saved successfully!");
        // Reset input fields
        setDocId("");
        setDocDate(dayjs()); // Reset to current date
        setKitName("");
        setOutwardKitQty("");
        setTableData([
          {
            id: 1,
            asset: "",
            assetCode: "",
            qty: "",
          },
        ]);
        setErrors({}); // Clear errors
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        // Optionally, show an error message
        toast.error("Failed to save bin inward.");
      });
  };

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="row">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Bin Outward</strong>
                </span>
              </p>
            </div>
          </div>

          <div className="row mt-4">
            {/* DOC ID FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Doc Id:
                  {/* <FaStarOfLife className="must" /> */}
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <input
                className="form-control form-sz mb-2"
                placeholder="Doc Id"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
              />
            </div>
            {/* DOC DATE FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Doc Date:
                  {/* <FaStarOfLife className="must" /> */}
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={docDate}
                  onChange={(date) => setDocDate(date)}
                  slotProps={{
                    textField: { size: "small", clearable: true },
                  }}
                  format="DD/MM/YYYY"
                  disabled
                />
              </LocalizationProvider>
            </div>
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Kit No
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-3">
              <input
                className={`form-control form-sz mb-2 ${
                  errors.kitName && "border-red-500"
                }`}
                placeholder="Kit No"
                value={kitName}
                onChange={(e) => setKitName(e.target.value)}
              />
              {errors.kitName && (
                <span className="error-text mb-1">{errors.kitName}</span>
              )}
            </div>
            {/* PART NAME FIELD */}
            <div className="col-lg-2 col-md-4">
              <label className="label mb-4">
                <span className="label-text label-font-size text-base-content d-flex flex-row">
                  Outward Kit Qty
                  {/* <FaStarOfLife className="must" /> */}
                </span>
              </label>
            </div>
            <div className="col-lg-2 col-md-3">
              <input
                className={`form-control form-sz mb-2 ${
                  errors.outwardKitQty && "border-red-500"
                }`}
                placeholder="Outward Kit Qty"
                value={outwardKitQty}
                onChange={(e) => setOutwardKitQty(e.target.value)}
              />
              {errors.outwardKitQty && (
                <span className="error-text mb-1">{errors.outwardKitQty}</span>
              )}
            </div>
          </div>
          {/* <div className="row mt-2">
            <div className="col-lg-12">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        Action
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        S.No
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        Asset
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        Asset Code
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        QTY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={row.id}>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={index + 1}
                            disabled
                            style={{ width: "100%" }}
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.asset}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r, i) =>
                                  i === index
                                    ? { ...r, asset: e.target.value }
                                    : r
                                )
                              )
                            }
                            className={`form-control form-sz mb-2 ${
                              errors.asset && "border-red-500"
                            }`}
                            style={{ width: "100%" }}
                          />
                          {errors.asset && (
                            <span className="error-text mb-1">
                              {errors.asset}
                            </span>
                          )}
                        </td>

                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.assetCode}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r, i) =>
                                  i === index
                                    ? { ...r, assetCode: e.target.value }
                                    : r
                                )
                              )
                            }
                            className={`form-control form-sz mb-2 ${
                              errors.assetCode && "border-red-500"
                            }`}
                            style={{ width: "100%" }}
                          />
                          {errors.assetCode && (
                            <span className="error-text mb-1">
                              {errors.assetCode}
                            </span>
                          )}
                        </td>

                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.qty}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r, i) =>
                                  i === index
                                    ? { ...r, qty: e.target.value }
                                    : r
                                )
                              )
                            }
                            className={`form-control form-sz mb-2 ${
                              errors.qty && "border-red-500"
                            }`}
                            style={{ width: "100%" }}
                          />
                          {errors.qty && (
                            <span className="error-text mb-1">
                              {errors.qty}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
          {/* {errors.tableData && (<div className="error-text mt-2">{errors.tableData}</div>)} */}
          <div className="mt-4">
            <button
              type="button"
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default BinOutwardOem;
