import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";

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

export const DocumentType = () => {
  const [docdata, setDocData] = useState(DOCDATA);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [extDate, setExtDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [finYear, setFinYear] = useState("");
  const [tableData, setTableData] = useState([
    { id: 1, column1: "", column2: "", column3: "", column4: "", column5: "" },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
    };
    setTableData([...tableData, newRow]);
  };

  const handleDoctypeSave = () => {
    const errors = {};
    if (!docdata[0].Prefix) {
      errors.prefix = "Prefix is required";
    }
    if (!docdata[0].SID) {
      errors.scode = "SID is required";
    }
    if (!docdata[0].Sequence) {
      errors.sequence = "Sequence is required";
    }
    if (!docdata[0].Suffix) {
      errors.sufix = "Suffix is required";
    }
    if (!docdata[0].Type) {
      errors.type = "Type is required";
    }

    if (!finYear) {
      errors.finYear = "Fin Year is required";
    }

    if (!fromDate) {
      errors.fromDate = "From Date is required";
    }

    if (!toDate) {
      errors.toDate = "To Date is required";
    }

    if (!extDate) {
      errors.extDate = "Ext Date is required";
    }

    const tableFormData = tableData.map((row) => ({
      scode: row.scode,
      prefix: row.prefix,
      sequence: row.sequence,
      sufix: row.sufix,
      type: row.type,
    }));

    // Check if any table fields are empty
    const isTableDataEmpty = tableFormData.some(
      (row) =>
        row.scode === "" ||
        row.prefix === "" ||
        row.sequence === "" ||
        row.sufix === "" ||
        row.type === ""
    );

    if (isTableDataEmpty) {
      errors.tableData = "Please fill all table fields";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        dmapDetailsDTO: tableFormData,
        extDate: extDate ? dayjs(extDate).format("YYYY-MM-DD") : null,
        finYear: finYear,
        fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
        orgId: orgId ? parseInt(orgId) : 0,
        toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/api/master/dmap`, formData)
        .then((response) => {
          console.log("Response:", response.data);
          // setDocData(DOCDATA);
          setFromDate(null);
          setToDate(null);
          setExtDate(null);
          setFinYear("");
          setErrors({});
          setTableData(null);
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
        <div className="row mt-3">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Fin Year:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              placeholder="Enter Fin Year"
              value={finYear}
              onChange={(e) => setFinYear(e.target.value)}
            />
            {errors.finYear && (
              <span className="error-text mb-1">{errors.finYear}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                From Date:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                slotProps={{
                  textField: { size: "small", clearable: true },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            {errors.fromDate && (
              <span className="error-text mb-1">{errors.fromDate}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                To Date:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={toDate}
                onChange={(date) => setToDate(date)}
                slotProps={{
                  textField: { size: "small", clearable: true },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            {errors.toDate && (
              <span className="error-text mb-1">{errors.toDate}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Ext Date:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={extDate}
                onChange={(date) => setExtDate(date)}
                slotProps={{
                  textField: { size: "small", clearable: true },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            {errors.extDate && (
              <span className="error-text mb-1">{errors.extDate}</span>
            )}
          </div>
        </div>
        <div className="mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            onClick={handleAddRow}
          >
            + Add Row
          </button>
        </div>
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-2 bg-blue-500 text-white">S.No</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">STD</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">Prefix</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">
                      Sequence
                    </th>
                    <th className="px-2 py-2 bg-blue-500 text-white">Suffix</th>
                    <th className="px-2 py-2 bg-blue-500 text-white">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
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
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.scode}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, scode: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.prefix}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, prefix: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.sequence}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, sequence: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.sufix}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, sufix: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.type}
                          onChange={(e) =>
                            setTableData((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, type: e.target.value }
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

export default DocumentType;
