import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStarOfLife, FaTrash } from "react-icons/fa";

function POD({ addPod }) {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(null);
  const [refNo, setRefNo] = useState("");
  const [refDate, setRefDate] = useState(null);
  const [kitCode, setKitCode] = useState("");
  const [kitQty, setKitQty] = useState("");
  const [kitRQty, setKitRQty] = useState("");
  const [value, setValue] = React.useState(0);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
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

  const [tableData1, setTableData1] = useState([
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

  const handleAddRow1 = () => {
    const newRow1 = {
      id: tableData1.length + 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    };
    setTableData1([...tableData1, newRow1]);
  };

  const handleDeleteRow = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  const handleDeleteRow1 = (id) => {
    setTableData1(tableData1.filter((row) => row.id !== id));
  };
  const handleServiceSave = () => {
    const errors = {};

    const formData = {
      active: true,
      cancel: false,
      orgId,
      docId: docId,
      docDate: docDate,
      kitCode: kitCode,
      kitQty: kitQty,
      kitRqty: kitRQty,
      refDate: refDate,
      refNo: refNo,
      pod1DTO: tableData.map((row) => ({
        acceptQty: row.acceptQty,
        allotQty: row.allotQty,
        assetCode: row.assetCode,
        description: row.description,
      })),
      pod2DTO: tableData1.map((row) => ({
        acceptQty: row.acceptQty,
        allotQty: row.allotQty,
        rejectedQty: row.rejectedQty,
        returnQty: row.returnQty,
      })),
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/master/updateCreatePod`,
        formData
      )
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Handle displaying fields based on mode and tab selection
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handlePodClose = () => {
    addPod(false)
  }

  return (
    <div className="card w-full p-3 bg-base-100 shadow-xl mt-2">
      <div className="d-flex justify-content-end">
        <IoMdClose
          onClick={handlePodClose}
          className="cursor-pointer w-8 h-8 mb-3"
        />
      </div>
      <div className="row mt-3">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Doc Id <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="Doc Id"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6 mt-2">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Doc Date
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mt-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={docDate}
              onChange={(date) => setDocDate(date)}
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
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Ref No
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="Ref No"
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6 mt-2">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Ref Date
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6 mt-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={refDate}
              onChange={(date) => setRefDate(date)}
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
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Kit Code
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="kit code"
            value={kitCode}
            onChange={(e) => setKitCode(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
        <div className="col-lg-2 col-md-6">
          <label className="label mb-4">
            <span className="label-text label-font-size text-base-content d-flex flex-row">
              Kit QTY
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="Kit Qty"
            value={kitQty}
            onChange={(e) => setKitQty(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
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
              Kit R QTY
              <FaStarOfLife className="must" />
            </span>
          </label>
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            className="form-control form-sz mb-2"
            placeholder="kit return qty"
            value={kitRQty}
            onChange={(e) => setKitRQty(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9-\/\\]/g, '');
            }}
          />
          {/* {errors.docId && (
              <span className="error-text mb-1">{errors.docId}</span>
            )} */}
        </div>
      </div>

      <br></br>

      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Accepted Details"
            icon={<TbReport className="w-16 h-6" />}
            {...a11yProps(0)}
            value={0}

            // onClick={() => handleTabClick(2)}
          />
       
        </Tabs>
      </Box> */}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Accepted Details" />
          <Tab label="Rejected Details" />
        </Tabs>
      </Box>
      {value === 0 && (
        <div>
          <div>
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
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Action
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          S.No
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Asset Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Description
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Allot QTY
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Accept QTY
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
                              />
                            </td>
                            <td className="border px-2 py-2">
                              <input
                                type="text"
                                value={row.desc}
                                onChange={(e) =>
                                  setTableData((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, desc: e.target.value }
                                        : r
                                    )
                                  )
                                }
                              />
                            </td>
                            <td className="border px-2 py-2">
                              <input
                                type="text"
                                value={row.allotQty}
                                onChange={(e) =>
                                  setTableData((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, allotQty: e.target.value }
                                        : r
                                    )
                                  )
                                }
                              />
                            </td>
                            <td className="border px-2 py-2">
                              <input
                                type="text"
                                value={row.acceptQty}
                                onChange={(e) =>
                                  setTableData((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, acceptQty: e.target.value }
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
        </div>
      )}
      {value === 1 && (
        <div>
          <div>
            <div className="mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded"
                onClick={handleAddRow1}
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
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Action
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          S.No
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Asset Code
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Description
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Rejected QTY
                        </th>
                        <th className="px-2 py-2 bg-blue-500 text-white">
                          Ruturn QTY
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData1 &&
                        tableData1.map((row) => (
                          <tr key={row.id}>
                            <td className="border px-2 py-2">
                              <button
                                onClick={() => handleDeleteRow1(row.id)}
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
                                  setTableData1((prev) =>
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
                                value={row.assetCode}
                                onChange={(e) =>
                                  setTableData1((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, assetCode: e.target.value }
                                        : r
                                    )
                                  )
                                }
                              />
                            </td>
                            <td className="border px-2 py-2">
                              <input
                                type="text"
                                value={row.desc}
                                onChange={(e) =>
                                  setTableData1((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, desc: e.target.value }
                                        : r
                                    )
                                  )
                                }
                              />
                            </td>
                            <td className="border px-2 py-2">
                              <input
                                type="text"
                                value={row.rejQty}
                                onChange={(e) =>
                                  setTableData1((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, rejQty: e.target.value }
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
                                  setTableData1((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id
                                        ? { ...r, returnQty: e.target.value }
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
        </div>
      )}
    </div>
  );
};
export default POD;