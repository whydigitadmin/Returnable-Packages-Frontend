import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

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

function InwardManifest({ addInwardManifeast, viewAssetInwardId }) {
  const [docdata, setDocData] = useState(DOCDATA);
  const [docDate, setDocDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(null);
  const [extDate, setExtDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [finYear, setFinYear] = useState("");
  const [stockFrom, setStockFrom] = useState("");
  const [stockTo, setStockTo] = useState("");
  const [filteredStockBranch, setFilteredStockBranch] = useState("");
  const rfIdInputRef = useRef(null);
  const assetIdInputRef = useRef(null);
  const [assetCategory, setAssetCategory] = useState("");
  const [assetCategoryList, setAssetCategoryList] = useState([]);
  const [assetList, setAssetList] = React.useState([]);
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [assetTaggingDetailsVO, setAssetTaggingDetailsVO] = React.useState([]);
  const [branchAssetList, setBranchAssetList] = React.useState([]);
  const [assetCode, setAssetCode] = useState("");
  const [availQty, setAvailQty] = useState("");
  const [transferQty, setTransferQty] = useState("");
  const [stockBranch, setStockBranch] = useState("");
  const [docId, setDocId] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [allAsset, setAllAsset] = useState("");
  const [aleartState, setAleartState] = useState(false);
  const [transferQtyErrorMsg, setTransferQtyErrorMsg] = useState("");
  const [viewStockFrom, setViewStockFrom] = useState("");
  const [viewStockTo, setViewStockTo] = useState("");
  const [viewAssetCode, setViewAssetCode] = useState("");

  const [viewTable, setviewTable] = useState([]);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      assetId: "",
      rfId: "",
      sku: "",
      code: "",
      qty: "",
      stockValue: "",
      stockLoc: "",
      binLoc: "",
    },
  ]);
  const [assetTaggingDetails, setAssetTaggingDetails] = useState([
    {
      asset: "",
      rfId: "",
      tagCode: "",
      assetCode: "",
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      assetId: "",
      rfId: "",
      sku: "",
      code: "",
      qty: "",
      stockValue: "",
      stockLoc: "",
      binLoc: "Bulk",
    };
    setTableData([...tableData, newRow]);
  };

  useEffect(() => {
    getStockBranch();
    getAllAsset();
    getNewDocId();
    getAllAssetCategory();
  }, []);

  useEffect(() => {
    if (viewAssetInwardId) {
      getAssetInwardDetailsById();
    }
  }, []);

  const handleAssetCategoryChange = (event) => {
    setAssetCategory(event.target.value);
    getAssetCodeByCategory(event.target.value);
  };

  const handleChangeAssetCode = (e) => {
    const selectedCode = e.target.value;
    const selectedAsset = assetList.find(
      (asset) => asset.assetCodeId === selectedCode
    );
    if (selectedAsset) {
      setAssetCode(selectedAsset.assetCodeId); // Set assetCode
      // setAssetName(selectedAsset.assetName); // Set assetName
      getAvailAssetDetailsByBranchForAssetInward(selectedAsset.assetCodeId);
    } else {
      setAssetCode(""); // Set assetCode to an empty string if no option is selected
    }
  };

  const getAvailAssetDetailsByBranchForAssetInward = async (value) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAvailAssetDetailsByBranchForAssetInward?category=${assetCategory}&orgId=${orgId}&stockBranch=${stockFrom}`
      );

      if (response.status === 200) {
        const assetDetails = response.data.paramObjectsMap.assetDetailsVO;
        setBranchAssetList(assetDetails);
        console.log("assetDetailsVO", assetDetails);
        const asset = assetDetails.find((item) => item.assetCode === value);
        if (asset) {
          setAvailQty(asset.avalqty);
        } else {
          setAvailQty(null); // or handle the case where the assetCode is not found
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetDetailsForAssetInward = async () => {
    const errors = {};
    if (!transferQty) {
      errors.transferQty = "Transfer Qty is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/master/getAssetDetailsForAssetInward?assetCode=${assetCode}&orgId=${orgId}&qty=${transferQty}&stockBranch=${stockFrom}`
        );

        if (response.status === 200) {
          const assetDetails =
            response.data.paramObjectsMap.assetTaggingDetailsVO;

          let serialNumberCounter = 0;

          const assetsWithSerialNumber = assetDetails.map((asset) => ({
            ...asset,
            serialNumber: ++serialNumberCounter,
          }));
          setAssetTaggingDetails(assetsWithSerialNumber);
          setShowTable(true);
          setErrors("");
          console.log("serialNumber:", assetsWithSerialNumber);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setErrors(errors);
    }
  };
  const getAssetCodeByCategory = async (name) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllAssetByCategory?category=${name}&orgId=${orgId}`
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setAssetList(response.data.paramObjectsMap.assetVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllAssetCategory = async () => {
    try {
      const response = await axios.get(
        // `${process.env.REACT_APP_API_URL}/api/master/assetGroup`,
        `${process.env.REACT_APP_API_URL}/api/master/getAllActiveAssetcategory`,
        {
          params: {
            orgId: orgId,
            // assetCategory: assetType,
            // assetName: name,
          },
        }
      );

      if (response.status === 200) {
        const assetCategories = response.data.paramObjectsMap.category;
        // response.data.paramObjectsMap.assetGroupVO.assetGroupVO.category;
        console.log(
          "THE ASSET CATEGORY IS:",
          response.data.paramObjectsMap.category
        );
        setAssetCategoryList(assetCategories);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetInwardDetailsById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAssetInwardDocId?docId=${viewAssetInwardId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        console.log("first");

        setDocId(response.data.paramObjectsMap.assetInwardVO.docId);
        setDocDate(response.data.paramObjectsMap.assetInwardVO.docDate);
        // setStockFrom(response.data.paramObjectsMap.assetInwardVO.sourceFrom);
        setViewStockFrom(
          response.data.paramObjectsMap.assetInwardVO.sourceFrom
        );
        // setStockTo(response.data.paramObjectsMap.assetInwardVO.stockBranch);
        setViewStockTo(response.data.paramObjectsMap.assetInwardVO.stockBranch);
        setAssetCategory(response.data.paramObjectsMap.assetInwardVO.category);
        setViewAssetCode(response.data.paramObjectsMap.assetInwardVO.assetCode);
        setTransferQty(response.data.paramObjectsMap.assetInwardVO.qty);
        const tempAssetInwardTable =
          response.data.paramObjectsMap.assetInwardVO.assetInwardDetailVO.map(
            (row, index) => ({
              id: index + 1,
              assetId: row.tagCode,
              rfId: row.rfId,
              sku: row.skuDetail,
              code: row.skucode,
              qty: row.skuQty,
              stockValue: row.stockValue,
              stockLoc: row.stockLocation,
              binLoc: row.binLocation,
            })
          );

        setviewTable(tempAssetInwardTable);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getNewDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getDocIdByAssetInward`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.assetInwardDocId);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStockFromChange = (e) => {
    const selectedValue = e.target.value;
    setStockFrom(selectedValue);
    const filteredBranches = stockBranch.filter(
      (branch) => branch.warehouseLocation !== selectedValue
    );
    setStockTo("");
    setFilteredStockBranch(filteredBranches);
  };

  const getAllAsset = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/asset?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
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

  // OLD
  // const getStockBranch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/master/ActivestockbranchByOrgId?orgId=${orgId}`
  //     );
  //     console.log("API Response:", response);

  //     if (response.status === 200) {
  //       setStockBranch(response.data.paramObjectsMap.branch);
  //     } else {
  //       console.error("API Error:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const getStockBranch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/activeWarehouse?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setStockBranch(response.data.paramObjectsMap.WarehouseVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRow = (id) => {
    setTableData((prevTableData) =>
      prevTableData
        .filter((row) => row.id !== id)
        .map((row, index) => ({
          ...row,
          id: index + 1,
        }))
    );
  };

  const handleTagCodeChange = async (id, field, value) => {
    setTableData((prevTableData) =>
      prevTableData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );

    if (field === "assetId") {
      const isPasted =
        value.length > 1 &&
        value !== tableData.find((row) => row.id === id).assetId;

      if (isPasted) {
        const prevAssetId = value;

        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/emitter/getTaggingDetailsByTagCode?tagCode=${prevAssetId}`
          );

          if (response.status === 200) {
            const rfId =
              response.data.paramObjectsMap.assetTaggingDetailsVO.rfId;
            const sku =
              response.data.paramObjectsMap.assetTaggingDetailsVO.asset;
            const skuCode =
              response.data.paramObjectsMap.assetTaggingDetailsVO.assetCode;

            const updatedTableData = tableData.map((r) =>
              r.id === id
                ? {
                    ...r,
                    rfId: rfId || "",
                    sku: sku || "",
                    code: skuCode || "",
                    qty: 1,
                    binLoc: "Bulk",
                    assetId: prevAssetId,
                  } // Retain RF ID value
                : r
            );

            const lastRow = updatedTableData[updatedTableData.length - 1];
            if (!lastRow || lastRow.assetId !== "") {
              const newRow = {
                id: updatedTableData.length + 1,
                assetId: "",
                rfId: "",
                sku: "",
                code: "",
                qty: "",
                stockValue: "",
                stockLoc: "",
                binLoc: "",
              };

              updatedTableData.push(newRow);
            }

            setTableData(updatedTableData);
            setTimeout(() => {
              assetIdInputRef.current.focus();
            }, 0);
          } else {
            console.error("API Error:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }
    }
  };

  const handleRfIdChange = async (id, field, value) => {
    setTableData((prevTableData) =>
      prevTableData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );

    if (field === "rfId") {
      const isPasted =
        value.length > 1 &&
        value !== tableData.find((row) => row.id === id).rfId;

      if (isPasted) {
        const prevRfId = value;

        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/emitter/getTaggingDetailsByRfId?rfId=${prevRfId}`
          );

          if (response.status === 200) {
            const assetId =
              response.data.paramObjectsMap.assetTaggingDetailsVO.tagCode;
            const sku =
              response.data.paramObjectsMap.assetTaggingDetailsVO.asset;
            const skuCode =
              response.data.paramObjectsMap.assetTaggingDetailsVO.assetCode;

            const updatedTableData = tableData.map((r) =>
              r.id === id
                ? {
                    ...r,
                    assetId: assetId || "",
                    sku: sku || "",
                    code: skuCode || "",
                    binLoc: "Bulk",
                    qty: 1,
                    rfId: prevRfId,
                  } // Retain RF ID value
                : r
            );

            const lastRow = updatedTableData[updatedTableData.length - 1];
            if (!lastRow || lastRow.rfId !== "") {
              const newRow = {
                id: updatedTableData.length + 1,
                assetId: "",
                rfId: "",
                sku: "",
                code: "",
                qty: "",
                stockValue: "",
                stockLoc: "",
                binLoc: "",
              };
              updatedTableData.push(newRow);
            }

            setTableData(updatedTableData);
            setTimeout(() => {
              rfIdInputRef.current.focus();
            }, 0);
          } else {
            console.error("API Error:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }
    }
  };

  const handleNew = () => {
    setDocData(DOCDATA);
    setDocDate(null);
    setDocId("");
    setStockFrom("");
    setStockTo("");
    setErrors({});
  };

  const handleSave = () => {
    const errors = {};

    if (!stockFrom) {
      errors.stockFrom = "Source from is required";
    }

    if (!stockTo) {
      errors.stockTo = "Source To is required";
    }

    if (!docId) {
      errors.docId = "DocId is required";
    }

    if (!docDate) {
      errors.docDate = "To Date is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        createdBy: userName,
        sourceFrom: stockFrom,
        stockBranch: stockTo,
        orgId,
        assetInwardDetailDTO: assetTaggingDetails.map((asset) => ({
          binLocation: "bulk",
          rfId: asset.rfId,
          skuDetail: asset.asset,
          skuQty: 1,
          skucode: asset.assetCode,
          stockLocation: "string",
          stockValue: 0,
          tagCode: asset.tagCode,
        })),
        assetCode,
        category: assetCategory,
        qty: transferQty,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/assetInward`,
          formData
        )
        .then((response) => {
          console.log("Response for POST assetInward:", response.data);
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            console.log("Response:", response.data);
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 3000,
              theme: "colored",
            });
            handleNew();
            setTimeout(() => {
              addInwardManifeast(false);
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error saving user: " + error.message);
        });
    } else {
      setErrors(errors);
    }
  };

  const handleInwardmanifeastClose = () => {
    addInwardManifeast(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase().replace(/[^0-9]/g, "");
    const newValue = parseInt(inputValue, 10);

    if (!isNaN(newValue)) {
      if (newValue <= availQty && newValue !== 0) {
        setTransferQty(newValue);
        setTransferQtyErrorMsg(false);
        setErrors((prevErrors) => ({ ...prevErrors, transferQty: "" }));
      } else {
        setTransferQty("");
        setTransferQtyErrorMsg(true);
      }
    } else {
      setTransferQty("");
    }
  };

  return (
    <>
      <div className="pt-8 card w-full p-3 bg-base-100 shadow-xl mt-2">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleInwardmanifeastClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
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
              disabled
            />
            {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Doc Date:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              placeholder="Doc Date"
              value={docDate}
              disabled
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Source From
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          {viewAssetInwardId ? (
            <>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  placeholder="viewStockFrom"
                  value={viewStockFrom}
                  disabled
                />
              </div>
            </>
          ) : (
            <div className="col-lg-3 col-md-6">
              <select
                className="form-select form-sz w-full mb-2"
                onChange={handleStockFromChange}
                value={stockFrom}
                disabled={viewAssetInwardId ? true : false}
              >
                <option value="" disabled>
                  Select Warehouse
                </option>
                <option value="AI POOL">AI POOL</option>

                {/* </option> */}
                {stockBranch.length > 0 &&
                  stockBranch.map((list) => (
                    <option key={list.id} value={list.warehouseLocation}>
                      {list.warehouseLocation}
                    </option>
                  ))}
              </select>
              {errors.stockFrom && (
                <span className="error-text mb-1">{errors.stockFrom}</span>
              )}
            </div>
          )}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Source To
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          {viewAssetInwardId ? (
            <>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  placeholder="viewStockTo"
                  value={viewStockTo}
                  disabled
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-3 col-md-6">
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={(e) => setStockTo(e.target.value)}
                  value={stockTo}
                  disabled={viewAssetInwardId ? true : false}
                >
                  <option value="" disabled>
                    Select Stock Branch
                  </option>
                  {filteredStockBranch &&
                    filteredStockBranch.map((list) => (
                      <option key={list.id} value={list.warehouseLocation}>
                        {list.warehouseLocation}
                      </option>
                    ))}
                </select>
                {errors.stockTo && (
                  <span className="error-text mb-1">{errors.stockTo}</span>
                )}
              </div>
            </>
          )}
          <div className="col-lg-3 col-md-3 mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Asset Category
              <FaStarOfLife className="must" />
            </span>
          </div>
          <div className="col-lg-3 col-md-3 mb-4">
            <select
              name="Select Category"
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              className="input input-bordered ps-2"
              onChange={handleAssetCategoryChange}
              value={assetCategory}
              // disabled={viewAssetInwardId ? true : false}
              disabled={
                viewAssetInwardId || !stockFrom || !stockTo ? true : false
              }
            >
              <option value="" selected>
                Select an Asset Category
              </option>
              {assetCategoryList.length > 0 &&
                assetCategoryList.map((list) => (
                  <option key={list.id} value={list}>
                    {list}
                  </option>
                ))}
            </select>
            {errors.assetCategory && (
              <span className="error-text">{errors.assetCategory}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-3 mb-4">
            <label className="label">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Asset Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          {viewAssetInwardId ? (
            <>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  placeholder="viewStockTo"
                  value={viewAssetCode}
                  disabled
                />
              </div>
            </>
          ) : (
            <div className="col-lg-3 col-md-3">
              <select
                className="form-select form-sz w-full mb-2"
                value={assetCode}
                onChange={handleChangeAssetCode}
              >
                <option value="">Select code</option>
                {assetList.map((code) => (
                  <option key={code.id} value={code.assetCodeId}>
                    {code.assetCodeId}
                  </option>
                ))}
              </select>
              {errors.assetCode && (
                <span className="error-text mb-4">{errors.assetCode}</span>
              )}
            </div>
          )}

          {!viewAssetInwardId && (
            <>
              <div className="col-lg-3 col-md-3">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Available Qty
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-3">
                <input
                  className="form-control form-sz"
                  type="number"
                  value={availQty}
                  disabled
                />
              </div>
            </>
          )}
          <div className="col-lg-3 col-md-3">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Transfer Qty
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-3">
            {/* <input
              className="form-control form-sz mb-2"
              name="transferQty"
              value={transferQty}
              onChange={(e) => {
                const inputValue = e.target.value
                  .toUpperCase()
                  .replace(/[^0-9]/g, "");
                const newValue = parseInt(inputValue, 10);
                if (!isNaN(newValue)) {
                  if (newValue <= availQty && newValue !== 0) {
                    setTransferQty(newValue);
                    setTransferQtyErrorMsg(false);
                  } else {
                    setTransferQty("");
                    setTransferQtyErrorMsg(true);
                  }
                } else {
                  setTransferQty("");
                }
              }}
              disabled={viewAssetInwardId ? true : false}
            />
            {transferQtyErrorMsg && (
              <span className="error-text">
                Transfer Qty is too low or exceed from Available Qty
              </span>
            )}
            {transferQty && (
              <span className="error-text">{errors.transferQty}</span>
            )} */}
            <input
              className="form-control form-sz mb-2"
              name="transferqty"
              value={transferQty}
              onChange={handleInputChange}
              disabled={viewAssetInwardId ? true : false}
            />
            {transferQtyErrorMsg && (
              <span className="error-text">
                Transfer Qty is too low or exceeds the Available Qty
              </span>
            )}
            {errors.transferQty && (
              <span className="error-text">{errors.transferQty}</span>
            )}
          </div>
        </div>
        {!viewAssetInwardId && (
          <>
            <div className="d-flex flex-row mt-2">
              <button
                type="button"
                className="bg-blue me-3 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={getAssetDetailsForAssetInward}
              >
                Check
              </button>
              {showTable && (
                <div className="">
                  <button
                    type="button"
                    className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={handleSave}
                  >
                    Proceed
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {showTable && (
          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        S.No
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        Tag Code
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        RF ID
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        Asset Code
                      </th>
                      <th className="px-2 py-2 bg-blue-500 text-white text-center">
                        Asset
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetTaggingDetails.map((item, index) => (
                      <tr key={index}>
                        <td className="px-2 py-2 text-center">
                          {item.serialNumber}
                        </td>
                        <td className="px-2 py-2 text-center">
                          {item.tagCode}
                        </td>
                        <td className="px-2 py-2 text-center">{item.rfId}</td>
                        <td className="px-2 py-2 text-center">
                          {item.assetCode}
                        </td>
                        <td className="px-2 py-2 text-center">{item.asset}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {viewAssetInwardId && (
          <>
            <div className="row mt-3">
              <div className="col-lg-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          S.No
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          Tag Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          RF ID
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          Asset Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white text-center">
                          Asset
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewTable &&
                        viewTable.map((row, index) => (
                          <tr key={index}>
                            <td className="px-2 py-2 text-center">{row.id}</td>
                            <td className="px-2 py-2 text-center">
                              {row.assetId}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {row.rfId}
                            </td>
                            <td className="px-2 py-2 text-center">{row.sku}</td>
                            <td className="px-2 py-2 text-center">
                              {row.code}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* <div className="row mt-2">
          <div className="col-lg-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-2 bg-blue-500 text-white">Action</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">S.No</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Tag Code
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">RF ID</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">SKU</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">Code</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">QTY</th>
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
                          <button
                            onClick={() => handleDeleteRow(row.id)}
                            className="text-red-500"
                          >
                            <FaTrash style={{ fontSize: "18px" }} />
                          </button>
                        </td>

                        <td className="border px-2 py-2">{row.id}</td>
                        <td>
                          <input
                            type="text"
                            name="assetId"
                            value={row.assetId}
                            onChange={(e) =>
                              handleTagCodeChange(
                                row.id,
                                "assetId",
                                e.target.value
                              )
                            }
                            ref={assetIdInputRef}
                            disabled={viewAssetInwardId ? true : false}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="rfId"
                            value={row.rfId}
                            onChange={(e) =>
                              handleRfIdChange(row.id, "rfId", e.target.value)
                            }
                            ref={rfIdInputRef}
                            style={{ width: "100%" }}
                            disabled={viewAssetInwardId ? true : false}
                          />
                        </td>
                        <td>{row.sku}</td>
                        <td>{row.code}</td>
                        <td>{row.qty}</td>
                        <td>{row.stockValue}</td>
                        <td>{row.stockLoc}</td>
                        <td>{row.binLoc}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
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

export default InwardManifest;
