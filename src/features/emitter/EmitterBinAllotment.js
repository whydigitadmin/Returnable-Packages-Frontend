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
const EmitterBinAllotment = () => {
    const [addInwardManifeast, setAddInwardManifeast] = useState("");
    const [stockBranch, setStockBranch] = useState("");
    const [reqNo, setReqNo] = useState("");
    const [reqDate, setReqDate] = useState("");
    const [docId, setDocId] = useState("");
    const [docDate, setDocDate] = useState(dayjs());
    const [emitter, setEmitter] = useState("");
    const [reqQty, setreqQty] = useState("");
    const [avlQty, setAvlQty] = useState("");
    const [alotQty, setAlotQty] = useState("");


    const [docdata, setDocData] = useState(DOCDATA);
    const [toDate, setToDate] = useState(null);
    const [extDate, setExtDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
    const [finYear, setFinYear] = useState("");
    const [stockFrom, setStockFrom] = useState("");
    const [stockTo, setStockTo] = useState("");
    const [filteredStockBranch, setFilteredStockBranch] = useState("");

    const [stockBranchList, setStockBranchList] = useState("");
    const [allAsset, setAllAsset] = useState("");
    const [aleartState, setAleartState] = useState(false);

    const reqNoList = [
        { id: 1, rNo: "24BR10001" },
        { id: 2, rNo: "24BR10002" },
        { id: 3, rNo: "24BR10003" },
    ];
    const [tableData, setTableData] = useState([
        {
            id: 1,
            assetId: "",
            rfId: "",
            qrCode: "",
            barcode: "",
            assetType: "",
            category: "",
            qty: "",
            // sku: "",
            // code: "",
            // qty: "",
            // stockValue: "",
            // stockLoc: "",
            // binLoc: "Bulk",
        },
    ]);

    const handleAddRow = () => {
        const newRow = {
            id: tableData.length + 1,
            assetId: "",
            rfId: "",
            qrCode: "",
            barcode: "",
            assetType: "",
            category: "",
            qty: "",
            // sku: "",
            // code: "",
            // qty: "",
            // stockValue: "",
            // stockLoc: "",
            // binLoc: "Bulk",
        };
        setTableData([...tableData, newRow]);
    };

    useEffect(() => {
        // 👆 daisy UI themes initialization
        getStockBranch();
        getAllAsset();
    }, []);

    const handleStockBranchChange = (e) => {
        const selectedValue = e.target.value;
        setStockBranch(selectedValue);
        // Filter out the selected value from the options of Source To dropdown
        // const filteredBranches = stockBranch.filter(
        //     (branch) => branch.branchCode !== selectedValue
        // );
        // setStockTo("");
        // setFilteredStockBranch(filteredBranches);
    };
    const handleReqNoChange = (e) => {
        setReqNo(e.target.value);
    };
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
                setStockBranchList(response.data.paramObjectsMap.branch);

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
    const handleKeyDown = (e, row) => {
        if (e.key === "Tab" && row.id === tableData[tableData.length - 1].id) {
            e.preventDefault();
            handleAddRow();
        }
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

        if (!stockTo) {
            errors.stockTo = "Source To is required";
        }

        if (!docId) {
            errors.docId = "DocId is required";
        }

        if (!docDate) {
            errors.docDate = "To Date is required";
        }
        if (tableData[0].code === "") {
            errors.code = "Code field is Required";
        }
        if (tableData[0].qty === "") {
            errors.qty = "QTY field is Required";
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
        addInwardManifeast(false)
    }
    return (
        <>
            <div className="pt-8 card w-full p-3 bg-base-100 shadow-xl mt-2">

                {/* <div className="d-flex justify-content-end">
                    <IoMdClose
                        onClick={handleInwardmanifeastClose}
                        className="cursor-pointer w-8 h-8 mb-3"
                    />
                </div> */}


                <div className="row mt-3">
                    {/* DOC ID FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Doc Id:
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <input
                            className="form-control form-sz mb-2"
                            placeholder="Auto Generated"
                            value={docId}
                            onChange={(e) => setDocId(e.target.value)}
                        />
                        {errors.docId && (
                            <span className="error-text mb-1">{errors.docId}</span>
                        )}
                    </div>
                    {/* DOC DATE FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Doc Date:
                                {/* <FaStarOfLife className="must" /> */}
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
                    {/* STOCK BRANCH FIELD */}
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
                            onChange={handleStockBranchChange}
                            value={stockBranch}
                        >
                            <option value="" disabled>
                                Select Stock Branch
                            </option>
                            {stockBranchList.length > 0 &&
                                stockBranchList.map((list) => (
                                    <option key={list.id} value={list.branchCode}>
                                        {list.branchCode}
                                    </option>
                                ))}
                        </select>
                        {errors.stockBranch && (
                            <span className="error-text mb-1">{errors.stockBranch}</span>
                        )}
                    </div>

                    {/* REQ NO FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Req No
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <select
                            className="form-select form-sz w-full mb-2"
                            onChange={handleReqNoChange}
                            value={reqNo}
                        >
                            <option value="" disabled>
                                Select Req No
                            </option>
                            {reqNoList.length > 0 &&
                                reqNoList.map((list) => (
                                    <option key={list.id} value={list.rNo}>
                                        {list.rNo}
                                    </option>
                                ))}
                        </select>
                        {errors.reqNo && (
                            <span className="error-text mb-1">{errors.reqNo}</span>
                        )}
                    </div>

                    {/* REQ DATE FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Req Date:
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                value={reqDate}
                                // onChange={(date) => setDocDate(date)}
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

                    {/* EMITTER FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Emitter
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <input
                            className="form-control form-sz mb-2"
                            name="emitter"
                            value={emitter}
                        // onInput={(e) => {
                        //     e.target.value = e.target.value.toUpperCase();
                        // }}
                        // onChange={handleInputChange}
                        />
                        {errors.emitter && (
                            <span className="error-text">{errors.emitter}</span>
                        )}
                    </div>
                    {/* REQ QTY FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Req QTY
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <input
                            className="form-control form-sz mb-2"
                            name="reqQTY"
                            value={reqQty}
                        // onInput={(e) => {
                        //     e.target.value = e.target.value.toUpperCase();
                        // }}
                        // onChange={handleInputChange}
                        />
                        {errors.reqQty && (
                            <span className="error-text">{errors.reqQty}</span>
                        )}
                    </div>
                    {/* AVL QTY FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Avl QTY
                                {/* <FaStarOfLife className="must" /> */}
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <input
                            className="form-control form-sz mb-2"
                            name="avlQty"
                            value={avlQty}
                        // onInput={(e) => {
                        //     e.target.value = e.target.value.toUpperCase();
                        // }}
                        // onChange={handleInputChange}
                        />
                        {errors.avlQty && (
                            <span className="error-text">{errors.avlQty}</span>
                        )}
                    </div>
                    {/* ALLOCATE QTY FIELD */}
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Allocate QTY
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <input
                            className="form-control form-sz mb-2"
                            name="alotQty"
                            value={alotQty}
                            onChange={(e) => setAlotQty(e.target.value)}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                            }}
                            maxLength={8}

                        />
                        {errors.alotQty && (
                            <span className="error-text">{errors.alotQty}</span>
                        )}
                    </div>


                    {/* <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Source From
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <select
                            className="form-select form-sz w-full mb-2"
                            onChange={handleStockFromChange}
                            value={stockFrom}
                        >
                            <option value="" disabled>
                                Select Stock Branch
                            </option>
                            {stockBranchList.length > 0 &&
                                stockBranchList.map((list) => (
                                    <option key={list.id} value={list.branchCode}>
                                        {list.branchCode}
                                    </option>
                                ))}
                        </select>
                        {errors.stockFrom && (
                            <span className="error-text mb-1">{errors.stockFrom}</span>
                        )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <label className="label mb-4">
                            <span className="label-text label-font-size text-base-content d-flex flex-row">
                                Source To
                                <FaStarOfLife className="must" />
                            </span>
                        </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <select
                            className="form-select form-sz w-full mb-2"
                            onChange={(e) => setStockTo(e.target.value)}
                            value={stockTo}
                        >
                            <option value="" disabled>
                                Select Stock Branch
                            </option>
                            {filteredStockBranch &&
                                filteredStockBranch.map((list) => (
                                    <option key={list.id} value={list.branchCode}>
                                        {list.branchCode}
                                    </option>
                                ))}
                        </select>
                        {errors.stockTo && (
                            <span className="error-text mb-1">{errors.stockTo}</span>
                        )}
                    </div> */}
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
                                        <th className="px-2 py-2 bg-blue-500 text-white">Action</th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">S.No</th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Asset ID
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            RF ID
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            QR Code
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Barcode
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Asset Type
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Category
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            QTY
                                        </th>

                                        {/* <th className="px-2 py-2 bg-blue-500 text-white">
                                            SKU
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Code
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">QTY</th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Stock Value
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Stock Location
                                        </th>
                                        <th className="px-2 py-2 bg-blue-500 text-white">
                                            Bin Location
                                        </th> */}
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
                                                        value={row.assetId}
                                                        onChange={(e) => {

                                                            setTableData((prev) =>
                                                                prev.map((r) =>
                                                                    r.id === row.id ? { ...r, assetId: e.target.value } : r
                                                                )
                                                            );
                                                        }}
                                                    // style={{ width: "100%", border: errors && errors.assetId ? "1px solid red" : "1px solid #ccc" }}
                                                    // key={`AssetId-${row.id}`}
                                                    />
                                                </td>
                                                <td className="border px-2 py-2">
                                                    <input
                                                        type="text"
                                                        value={row.rfId}
                                                        onChange={(e) => {

                                                            setTableData((prev) =>
                                                                prev.map((r) =>
                                                                    r.id === row.id ? { ...r, rfId: e.target.value } : r
                                                                )
                                                            );
                                                        }}
                                                    // style={{ width: "100%", border: errors && errors.rfId ? "1px solid red" : "1px solid #ccc" }}
                                                    // key={`code-${row.id}`}
                                                    />
                                                </td>
                                                <td className="border px-2 py-2">
                                                    <input
                                                        type="text"
                                                        value={row.qrCode}
                                                        onChange={(e) => {

                                                            setTableData((prev) =>
                                                                prev.map((r) =>
                                                                    r.id === row.id ? { ...r, qrCode: e.target.value } : r
                                                                )
                                                            );
                                                        }}
                                                    // style={{ width: "100%", border: errors && errors.qrCode ? "1px solid red" : "1px solid #ccc" }}
                                                    // key={`AssetId-${row.id}`}
                                                    />
                                                </td>
                                                <td className="border px-2 py-2">
                                                    <input
                                                        type="text"
                                                        value={row.barcode}
                                                        onChange={(e) => {

                                                            setTableData((prev) =>
                                                                prev.map((r) =>
                                                                    r.id === row.id ? { ...r, barcode: e.target.value } : r
                                                                )
                                                            );
                                                        }}
                                                    // style={{ width: "100%", border: errors && errors.rfId ? "1px solid red" : "1px solid #ccc" }}
                                                    // key={`code-${row.id}`}
                                                    />
                                                </td>
                                                <td className="border px-2 py-2">
                                                    <input
                                                        type="text"
                                                        value={row.assetType}
                                                        onChange={(e) => {

                                                            setTableData((prev) =>
                                                                prev.map((r) =>
                                                                    r.id === row.id ? { ...r, assetType: e.target.value } : r
                                                                )
                                                            );
                                                        }}
                                                    // style={{ width: "100%", border: errors && errors.qrCode ? "1px solid red" : "1px solid #ccc" }}
                                                    // key={`AssetId-${row.id}`}
                                                    />
                                                </td>
                                                <td className="border px-2 py-2">
                                                    <input
                                                        type="text"
                                                        value={row.category}
                                                        onChange={(e) => {

                                                            setTableData((prev) =>
                                                                prev.map((r) =>
                                                                    r.id === row.id ? { ...r, category: e.target.value } : r
                                                                )
                                                            );
                                                        }}
                                                    // style={{ width: "100%", border: errors && errors.rfId ? "1px solid red" : "1px solid #ccc" }}
                                                    // key={`code-${row.id}`}
                                                    />
                                                </td>

                                                <td className="border px-2 py-2">
                                                    <input
                                                        type="text"
                                                        value={row.qty}
                                                        onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            if (inputValue == "" || /^\d+$/.test(inputValue) && inputValue.length <= 8) {
                                                                setTableData((prev) =>
                                                                    prev.map((r) =>
                                                                        r.id === row.id ? { ...r, qty: inputValue } : r
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        onKeyDown={(e) => handleKeyDown(e, row)}

                                                        style={{ width: "100%", border: errors && errors.qty ? "1px solid red" : "1px solid #ccc" }}
                                                        key={`QTY-${row.id}`}
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
};

DocumentType.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default EmitterBinAllotment