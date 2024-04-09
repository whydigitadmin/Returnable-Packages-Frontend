import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife, FaTrash } from "react-icons/fa";

export const PoOrder = () => {
  const [company, setCompany] = useState("AIPACKS");
  const [address, setAddress] = useState("Bangalore");
  const [selfGST, setSelfGST] = useState("29ABMCS1982P1ZA");
  const [poNo, setPoNo] = useState("");
  const [poDate, setPoDate] = useState(null);
  const [apId, setApId] = useState("");
  const [ap, setAp] = useState("");
  const [apAddress, setAPAddress] = useState("");
  const [apgst, setApGst] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [shipto, setShipTo] = useState("");
  const [shiptoremarks, setShiptoremarks] = useState("");
  const [gstType, setGstType] = useState("");
  const [IGST, setIGST] = useState("");
  const [SGST, setGST] = useState("");
  const [CGST, setCGST] = useState("");
  const [terms, setTerms] = useState("PO ORDER");
  const [termsCode, setTermsCode] = useState([]);

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
    getTermsData();
  }, []);

  const getTermsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/terms`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const termsCodes =
          response.data.paramObjectsMap.termsAndConditionsVO.map(
            (term) => term.termsCode
          );
        setTermsCode(termsCodes); // Setting multiple 'termsCode'
        console.log("Terms Codes:", termsCodes);
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleServiceSave = () => {
    const errors = {};

    if (!address) {
      errors.address = "Address is required";
    }
    if (!apAddress) {
      errors.apAddress = "Address is required";
    }
    if (!apgst) {
      errors.apgst = "GST is required";
    }
    if (!apId) {
      errors.apId = "Vendor Id is required";
    }
    if (!CGST) {
      errors.CGST = " CGST is required";
    }
    if (!company) {
      errors.company = " Company is required";
    }
    if (!poDate) {
      errors.poDate = " PO date is required";
    }
    if (!gstType) {
      errors.gstType = " GST Type is required";
    }
    if (!IGST) {
      errors.IGST = " IGST Type is required";
    }
    if (!poNo) {
      errors.poNo = " PO Number is required";
    }
    if (!selfGST) {
      errors.selfGST = " Self GST is required";
    }
    if (!SGST) {
      errors.SGST = "SGST is required";
    }
    if (!shipto) {
      errors.shipto = "SGST is required";
    }
    if (!shiptoremarks) {
      errors.shiptoremarks = "Ship To Remarks is required";
    }
    if (!terms) {
      errors.terms = "Terms is required";
    }
    const formData = {
      active: true,
      address,
      apAddress,
      apGst: apgst,
      apId,
      cancel: false,
      cgst: CGST,
      company,
      date: poDate,
      gstType: gstType,
      igst: IGST,
      orgId,
      poNo,
      selfGst: selfGST,
      sgst: SGST,
      shipTo: shipto,
      shipToRemarks: shiptoremarks,
      terms,
      po1DTO: tableData.map((row) => ({
        amount: row.amount,
        currency: row.currency,
        description: row.description,
        exRate: row.exrate,
        hsnCode: row.hsncode,
        itemId: row.itemId,
        qty: row.qty,
        rate: row.rate,
        itemId: row.itemid,
      })),
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/master/updateCreatePo`,
        formData
      )
      .then((response) => {
        console.log("Response:", response.data);

        setAddress("");
        setAPAddress("");
        setApGst("");
        setApId("");
        // setErrors({});
        setCGST("");
        setCompany("");
        setPoDate(null);
        setGstType("");
        setIGST("");
        setPoNo("");
        setSelfGST("");
        setGST("");
        setShipTo("");
        setTerms("");
        setAp("");
        setShiptoremarks("");
        setTableData({});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteRow = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  return (
    <div className="card w-full p-3 bg-base-100 shadow-xl mt-2">
      <div className="row mt-3">
        {/* <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              company
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled
          />
         
        </div> */}
        {/* <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Address
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <textarea
            className="form-control form-sz mb-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled
          />
        
        </div> */}
        {/* <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Self GST
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={selfGST}
            onChange={(e) => setSelfGST(e.target.value)}
            disabled
          />
       
        </div> */}
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              <span style={{ color: "Red" }}>N</span>umber
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={poNo}
            onChange={(e) => setPoNo(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6 mt-2">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              <span style={{ color: "Red" }}>D</span>ate
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6 mt-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={poDate}
              onChange={(date) => setPoDate(date)}
              slotProps={{
                textField: { size: "small", clearable: true },
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          {/* {errors.toDate && (
              <span className="error-text mb-1">{errors.toDate}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              <span style={{ color: "Red" }}>V</span>ender ID
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={apId}
            onChange={(e) => setApId(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Vendor
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={ap}
            onChange={(e) => setAp(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Vendor Address <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={apAddress}
            onChange={(e) => setAPAddress(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Vendor GST <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={apgst}
            onChange={(e) => setApGst(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Ship To
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={shipto}
            onChange={(e) => setShipTo(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Ship To Remarks
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={shiptoremarks}
            onChange={(e) => setShiptoremarks(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              GST Type
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              IGST
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={IGST}
            onChange={(e) => setIGST(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              SGST
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={SGST}
            onChange={(e) => setGST(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              CGST
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz mb-2"
            value={CGST}
            onChange={(e) => setCGST(e.target.value)}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Terms
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <select
            className="form-select form-sz mb-2"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          >
            {termsCode.map((term, index) => (
              <option key={index} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
      </div>

      <br></br>
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
                  <th className="px-2 py-2 bg-blue-500 text-white">Item ID</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">
                    Description
                  </th>
                  <th className="px-2 py-2 bg-blue-500 text-white">HSN Code</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">Qty</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">Rate</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">Currency</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">Ex-rate</th>
                  <th className="px-2 py-2 bg-blue-500 text-white">Amount</th>
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
                        />
                      </td>

                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.itemid}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, itemid: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, description: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.hsncode}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, hsncode: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.qty}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, qty: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.rate}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, rate: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.currency}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, currency: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.exrate}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, exrate: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.amount}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, amount: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleServiceSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
