import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import ToastComponent from "../../utils/ToastComponent";

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

export const InwardManifest = () => {
  const [docdata, setDocData] = useState(DOCDATA);
  const [docDate, setDocDate] = useState(dayjs());
  const [toDate, setToDate] = useState(null);
  const [extDate, setExtDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [finYear, setFinYear] = useState("");
  const [stock, setStock] = useState("");
  const [stockBranch, setStockBranch] = useState("");
  const [docId, setDocId] = useState("");
  const [allAsset, setAllAsset] = useState("");
  const [aleartState, setAleartState] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    };
    setTableData([...tableData, newRow]);
  };

  useEffect(() => {
    // 👆 daisy UI themes initialization
    getStockBranch();
    getAllAsset();
  }, []);

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

  const handleDoctypeSave = () => {
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

    if (!stock) {
      errors.stock = "Stock branch is required";
    }

    if (!docId) {
      errors.docId = "DocId is required";
    }

    if (!docDate) {
      errors.docDate = "To Date is required";
    }

    // const tableFormData = tableData.map((row) => ({
    //   scode: row.scode,
    //   prefix: row.prefix,
    //   sequence: row.sequence,
    //   sufix: row.sufix,
    //   type: row.type,
    // }));

    const tableFormData = tableData.map((row) => ({
      skuDetail: row.skuDetail,
      skucode: row.skucode,
      skuQty: row.skuQty,
      stockValue: row.stockValue,
      stockLocation: row.stockLocation,
      binLocation: row.binLocation,
    }));

    // Check if any table fields are empty
    const isTableDataEmpty = tableFormData.some(
      (row) =>
        row.skuDetail === "" ||
        row.skucode === "" ||
        row.skuQty === "" ||
        row.stockValue === "" ||
        row.stockLocation === "" ||
        row.binLocation === ""
    );

    if (isTableDataEmpty) {
      errors.tableData = "Please fill all table fields";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        assetInwardDetailDTO: tableFormData,
        docId,
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        stockBranch: stock,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/assetInward`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          setAleartState(true);
          setDocData(DOCDATA);
          setDocDate(null);
          setDocId("");
          setStock("");
          setErrors({});

          setTableData([
            {
              id: 1,
              skuDetail: "",
              skucode: "",
              skuQty: "",
              stockValue: "",
              stockLocation: "",
              binLocation: "",
            },
          ]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="pt-8 card w-full p-3 bg-base-100 shadow-xl mt-2">
        {aleartState && (
          <ToastComponent content="Bin Inwarded successfully" type="success" />
        )}
        <div className="row mt-3">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Doc Id:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              placeholder="Doc Id"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
            />
            {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Doc Date:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
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
            {errors.docDate && (
              <span className="error-text mb-1">{errors.docDate}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Stock Branch
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            >
              <option value="" disabled>
                Select Stock Branch
              </option>
              {stockBranch.length > 0 &&
                stockBranch.map((list) => (
                  <option key={list.id} value={list.branchCode}>
                    {list.branchCode}
                  </option>
                ))}
            </select>
            {errors.stock && (
              <span className="error-text mb-1">{errors.stock}</span>
            )}
          </div>
        </div>
        <div className="mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded"
            onClick={handleAddRow}
          >
            + Add
          </button>
        </div>
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-2 bg-blue-500 text-white">S.No</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      SKU Details
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      SKU Code
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">Qty</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Stock Value
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Stock Location
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Bin Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData &&
                    tableData.map((row) => (
                      <tr key={row.id}>
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
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <select
                            value={row.skuDetail}
                            onChange={(e) => {
                              const selectedAssetName = e.target.value;
                              const selectedAsset = allAsset.find(
                                (asset) => asset.assetName === selectedAssetName
                              );
                              const assetCodeId = selectedAsset
                                ? selectedAsset.assetCodeId
                                : "";

                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? {
                                        ...r,
                                        skuDetail: selectedAssetName,
                                        skucode: assetCodeId,
                                      }
                                    : r
                                )
                              );
                            }}
                          >
                            <option disabled selected>
                              {" "}
                              --Select--
                            </option>
                            {allAsset &&
                              allAsset.map((list) => (
                                <option
                                  key={list.assetCodeId}
                                  value={list.assetName}
                                >
                                  {list.assetName}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="border px-2 py-2">
                          <select
                            value={row.skucode}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, skucode: e.target.value }
                                    : r
                                )
                              )
                            }
                            disabled
                          >
                            <option disabled selected>
                              --Select--
                            </option>
                            {allAsset.length > 0 &&
                              allAsset.map((list) => (
                                <option
                                  key={list.assetCodeId}
                                  value={list.assetCodeId}
                                >
                                  {list.assetCodeId}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.skuQty}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, skuQty: e.target.value }
                                    : r
                                )
                              )
                            }
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.stockValue}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, stockValue: e.target.value }
                                    : r
                                )
                              )
                            }
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.stockLocation}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, stockLocation: e.target.value }
                                    : r
                                )
                              )
                            }
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.binLocation}
                            onChange={(e) =>
                              setTableData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, binLocation: e.target.value }
                                    : r
                                )
                              )
                            }
                            defaultValue="Bulk"
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
            onClick={handleDoctypeSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

DocumentType.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default InwardManifest;
