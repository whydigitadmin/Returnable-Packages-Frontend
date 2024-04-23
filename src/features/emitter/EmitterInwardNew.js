import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DOCDATA = [
  {
    id: 1,
    SID: "IR",
    Prefix: "AI",
    Sequence: "00001",
    Suffix: "ABC",
    Type: "KT",
  },
];

// export const InwardManifest = () => {
function EmitterInwardNew({ addInwardManifeast }) {
  const [docdata, setDocData] = useState(DOCDATA);
  const [docDate, setDocDate] = useState(dayjs());
  const [toDate, setToDate] = useState(null);
  const [extDate, setExtDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [finYear, setFinYear] = useState("");
  const [stockFrom, setStockFrom] = useState("");
  const [stockTo, setStockTo] = useState("");
  const [filteredStockBranch, setFilteredStockBranch] = useState("");

  const [stockBranch, setStockBranch] = useState("");
  const [docId, setDocId] = useState("");
  const [allAsset, setAllAsset] = useState("");
  const [aleartState, setAleartState] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      tagCode: "",
      asset: "",
      assetCode: "",
      allottedQty: "",
      receivedQty: "",
      returnQty: "",
    },
  ]);
  //   const [tableData, setTableData] = useState([]);

  //   const handleAddRow = () => {
  //     const newRow = {
  //       id: tableData.length + 1,
  //       sku: "",
  //       code: "",
  //       qty: "",
  //       stockValue: "",
  //       stockLoc: "",
  //       binLoc: "Bulk",
  //     };
  //     setTableData([...tableData, newRow]);
  //   };

  useEffect(() => {
    // 👆 daisy UI themes initialization
    getStockBranch();
    getAllAsset();
  }, []);

  const handleStockFromChange = (e) => {
    const selectedValue = e.target.value;
    setStockFrom(selectedValue);
    // Filter out the selected value from the options of Source To dropdown
    const filteredBranches = stockBranch.filter(
      (branch) => branch.branchCode !== selectedValue
    );
    setStockTo(""); // Reset the Source To dropdown value
    setFilteredStockBranch(filteredBranches);
  };

  const getAllAsset = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/asset?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        // Extracting assetName and skuId from each asset item
        const extractedAssets = response.data.paramObjectsMap.assetVO.map(
          (assetItem) => ({
            assetName: assetItem.assetName,
            assetCodeId: assetItem.assetCodeId,
          })
        );
        setAllAsset(extractedAssets);
        console.log("API:", extractedAssets);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStockBranch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/stockbranchByOrgId?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setStockBranch(response.data.paramObjectsMap.branch);

        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRow = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    const errors = {};
    // if (!docdata[0].Prefix) {
    //   errors.prefix = "Prefix is required";
    // }
    // if (!docdata[0].SID) {
    //   errors.scode = "SID is required";
    // }
    // if (!docdata[0].Sequence) {
    //   errors.sequence = "Sequence is required";
    // }
    // if (!docdata[0].Suffix) {
    //   errors.sufix = "Suffix is required";
    // }
    // if (!docdata[0].Type) {
    //   errors.type = "Type is required";
    // }

    if (!stockFrom) {
      errors.stockFrom = "Source from is required";
    }
    // const tableFormData = tableData.map((row) => ({
    //   scode: row.scode,
    //   prefix: row.prefix,
    //   sequence: row.sequence,
    //   sufix: row.sufix,
    //   type: row.type,
    // }));

    const tableFormData = tableData.map((row) => ({
      skuDetail: row.sku,
      skucode: row.code,
      skuQty: row.qty,
      stockValue: row.stockValue,
      stockLocation: row.stockLoc,
      binLocation: "test",
      // stockValue: row.stockValue,
      // stockLocation: row.stockLoc,
      // binLocation: row.binLoc,
    }));

    // Check if any table fields are empty
    const isTableDataEmpty = tableFormData.some(
      (row) =>
        row.sku === "" ||
        row.code === "" ||
        row.qty === "" ||
        row.stockValue === "" ||
        row.stockLoc === "" ||
        row.binLoc === ""
    );

    if (isTableDataEmpty) {
      errors.tableData = "Please fill all table fields";
    } else {
      delete errors.tableData;
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        assetInwardDetailDTO: tableFormData,
        docId,
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        stockBranch: stockTo,
        sourceFrom: stockFrom,
        orgId,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/assetInward`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          // setAleartState(true);
          setDocData(DOCDATA);
          setDocDate(null);
          setDocId("");
          setStockFrom("");
          setStockTo("");
          setErrors({});

          setTableData([
            {
              id: 1,
              sku: "",
              code: "",
              qty: "",
              stockValue: "",
              stockLoc: "",
              binLoc: "",
            },
          ]);
          toast.success("Stock Branch Updated Successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to update user. Please try again.");
        });
    } else {
      setErrors(errors);
    }
  };

  const handleInwardmanifeastClose = () => {
    addInwardManifeast(false);
  };
  return (
    <>
      <div
        className="pt-8 card p-3 bg-base-100 shadow-xl mt-2"
        style={{ width: "85%", margin: "auto" }}
      >
        <div className="flex items-center mt-3">
          <Link to="/app/EmitterLanding" className="mr-4">
            <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
          </Link>{" "}
          <p className="text-2xl">
            <strong>Bin Inward</strong>
          </p>
          {/* <div className="flex items-center justify-content-end">
            <IoMdClose
              onClick={handleInwardmanifeastClose}
              className="cursor-pointer w-8 h-8"
            />
          </div> */}
        </div>

        <div className="row mt-3">
          <div className="col-lg-2 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Doc Id:
              </span>
            </label>
          </div>
          <div className="col-lg-2 col-md-3">
            <input
              className="form-control form-sz mb-2"
              placeholder="Doc Id"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
            />
            {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
          </div>
          <div className="col-lg-2 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Doc Date:
              </span>
            </label>
          </div>
          <div className="col-lg-2 col-md-3">
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
            {/* {errors.docDate && (
              <span className="error-text mb-1">{errors.docDate}</span>
            )} */}
          </div>
          <div className="col-lg-2 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Allotment No
              </span>
            </label>
          </div>
          <div className="col-lg-2 col-md-3">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleStockFromChange}
              value={stockFrom}
            >
              <option value="" disabled>
                Select Allotment
              </option>
              {stockBranch.length > 0 &&
                stockBranch.map((list) => (
                  <option key={list.id} value={list.branchCode}>
                    {list.branchCode}
                  </option>
                ))}
            </select>
            {errors.stockFrom && (
              <span className="error-text mb-1">{errors.stockFrom}</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Request No
              </span>
            </label>
          </div>
          <div className="col-lg-2 col-md-3">
            <input
              className="form-control form-sz mb-2"
              placeholder="Req No"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              disabled
            />
            {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
          </div>
          <div className="col-lg-2 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Flow
              </span>
            </label>
          </div>
          <div className="col-lg-2 col-md-3">
            <input
              className="form-control form-sz mb-2"
              placeholder="Flow"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              disabled
            />
            {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
          </div>
          <div className="col-lg-2 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Kit No
              </span>
            </label>
          </div>
          <div className="col-lg-2 col-md-3">
            <input
              className="form-control form-sz mb-2"
              placeholder="Kit No"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              disabled
            />
            {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
          </div>
          <div className="col-lg-2 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Alloted Kit Qty
              </span>
            </label>
          </div>
          <div className="col-lg-2 col-md-3">
            <input
              className="form-control form-sz mb-2"
              placeholder="Alloted Kit Qty"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              disabled
            />
            {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
          </div>
        </div>
        {/* <div className="mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded"
            onClick={handleAddRow}
          >
            + Add
          </button>
        </div> */}
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {/* <th className="px-2 py-2 bg-blue-500 text-white">Action</th> */}
                    <th className="px-2 py-2 bg-blue-500 text-white">S.No</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Tag Code
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">Asset</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Asset Code
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Alloted Qty
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Received Qty
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Return Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData &&
                    tableData.map((row) => (
                      <tr key={row.id}>
                        {/* <td className="border px-2 py-2">
                          <button
                            onClick={() => handleDeleteRow(row.id)}
                            className="text-red-500"
                          >
                            <FaTrash style={{ fontSize: "18px" }} />
                          </button>
                        </td> */}
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.id}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, id: e.target.value }
                                    : r
                                )
                              )
                            }
                            disabled
                            style={{ width: "100%" }}
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.tagCode}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, tagCode: e.target.value }
                                    : r
                                )
                              )
                            }
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
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, asset: e.target.value }
                                    : r
                                )
                              )
                            }
                            disabled
                            style={{ width: "100%" }}
                          />
                        </td>

                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.assetCode}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, assetCode: e.target.value }
                                    : r
                                )
                              )
                            }
                            disabled
                            style={{ width: "100%" }}
                          />
                        </td>

                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.assetCode}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, allottedQty: e.target.value }
                                    : r
                                )
                              )
                            }
                            disabled
                            style={{ width: "100%" }}
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.receivedQty}
                            disabled
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, receivedQty: e.target.value }
                                    : r
                                )
                              )
                            }
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.returnQty}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, returnQty: e.target.value }
                                    : r
                                )
                              )
                            }
                            disabled
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {errors.tableData && (
          <div className="error-text mt-2">{errors.tableData}</div>
        )}
        <div className="mt-4">
          <button
            type="button"
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default EmitterInwardNew;
