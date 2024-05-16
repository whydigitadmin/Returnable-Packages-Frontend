import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const TransporterPickup = ({}) => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [handoverTo, setHandoverTo] = useState("");
  const [driver, setDriver] = useState("");
  const [driverPhNo, setDriverPhNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [loginUserName, setLoginUserName] = useState(
    localStorage.getItem("userName")
  );
  const [listViewButton, setListViewButton] = useState(false);
  const [savedRecordView, setSavedRecordView] = useState(false);
  const [transporterList, setTransporterList] = useState([
    { id: 1, name: "Safe Express" },
  ]);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      asset: "",
      assetCode: "",
      receivedQty: "",
    },
  ]);

  const [ListViewTableData, setListViewTableData] = useState([
    {
      id: 1,
      pickId: "1000001",
      date: "15-05-2024",
      handTo: "Safe Express",
      handBy: loginUserName,
      driver: "Devaraj",
      phNo: "9876543210",
      vehicle: "TN01AB1213",
    },
  ]);

  const handleSavedRecordView = (e) => {
    setSavedRecordView(true);
  };
  const handleSavedRecordViewClose = (e) => {
    setSavedRecordView(false);
  };

  const handleNew = () => {
    setHandoverTo("");
    setDriver("");
    setDriverPhNo("");
    setVehicleNo("");
    // setTableData({});
    setErrors({});
  };

  // const handleSave = () => {
  //   // Validation
  //   const errors = {};
  //   if (!kitNo.trim()) {
  //     errors.kitNo = "Kit No is required";
  //   }
  //   if (!receivedKitQty.trim()) {
  //     errors.receivedKitQty = "Received Kit Qty is required";
  //   }
  //   tableData.forEach((row) => {
  //     if (!row.asset.trim()) {
  //       errors.asset = "Asset is required";
  //     }
  //     if (!row.assetCode.trim()) {
  //       errors.assetCode = "Asset Code is required";
  //     }
  //     if (!row.receivedQty.trim()) {
  //       errors.receivedQty = "Received Qty is required";
  //     }
  //   });

  //   if (Object.keys(errors).length > 0) {
  //     setErrors(errors);
  //     return;
  //   }

  //   // If no validation errors, proceed to save
  //   const formData = {
  //     createdBy: "string", // Replace "string" with actual value
  //     docDate: docDate.format("YYYY-MM-DD"),
  //     kitno: kitNo,
  //     oemBinInwardDetails: tableData.map((row) => ({
  //       asset: row.asset,
  //       assetCode: row.assetCode,
  //       receivedQty: parseInt(row.receivedQty),
  //     })),
  //     orgId: 0, // Replace 0 with actual value
  //     receivedKitQty: parseInt(receivedKitQty),
  //   };

  //   axios
  //     .post("/api/oem/oemBinInward", formData)
  //     .then((response) => {
  //       // Handle successful response
  //       console.log("Response:", response.data);
  //       // Optionally, show a success message
  //       toast.success("Bin inward saved successfully!");
  //       // Reset input fields
  //       setDocId("");
  //       setDocDate(dayjs()); // Reset to current date
  //       setKitNo("");
  //       setReceivedKitQty("");
  //       setTableData([
  //         {
  //           id: 1,
  //           asset: "",
  //           assetCode: "",
  //           receivedQty: "",
  //         },
  //       ]);
  //       setErrors({}); // Clear errors
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error:", error);
  //       // Optionally, show an error message
  //       toast.error("Failed to save bin inward.");
  //     });
  // };

  return (
    <>
      <div
        className="pt-8 card p-3 bg-base-100 shadow-xl mt-2"
        style={{ width: "85%", margin: "auto" }}
      >
        <div className="flex items-center mt-3">
          <Link to="/app/welcomeoem" className="mr-4">
            <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
          </Link>{" "}
          <p className="text-2xl">
            <strong>Transporter Pickup</strong>
          </p>
          <div className="ml-auto">
            {" "}
            <button
              type="button"
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={(e) => {
                setListViewButton(!listViewButton);
              }}
            >
              {listViewButton ? "Close" : "View"}
            </button>
          </div>
        </div>

        {listViewButton ? (
          <>
            <div className="row mt-4">
              <div className="overflow-x-auto w-full ">
                <table className="table table-hover w-full">
                  <thead>
                    <tr>
                      <th className="text-center">S.No</th>
                      <th className="text-center">Pickup ID</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">Handover To</th>
                      <th className="text-center">Handover By</th>
                      <th className="text-center">Driver</th>
                      <th className="text-center">Ph No</th>
                      <th className="text-center">Vehicle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListViewTableData.map((row, index) => (
                      <tr key={row.id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          {/* <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSavedRecordView(row.gatheredId);
                            }}
                            style={{ cursor: "pointer", color: "blue" }}
                          >
                            {row.pickId}
                          </a> */}
                          {row.pickId}
                        </td>
                        <td className="text-center">{row.date}</td>
                        <td className="text-center">{row.handTo}</td>
                        <td className="text-center">{row.handBy}</td>
                        <td className="text-center">{row.driver}</td>
                        <td className="text-center">{row.phNo}</td>
                        <td className="text-center">{row.vehicle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row mt-4">
              {/* <div className="col-lg-2 col-md-3">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Doc Id:
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <input
                  className={`form-control form-sz mb-2 ${
                    errors.docId && "border-red-500"
                  }`}
                  placeholder=""
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                />
              </div> */}
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
              </div>
              <div className="col-lg-2 col-md-3">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Handover To:
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <select
                  name="Select Transporter"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="form-select form-sz"
                  onChange={(e) => {
                    setHandoverTo(e.target.value);
                  }}
                  value={handoverTo}
                >
                  <option value="" selected>
                    Select an Transporter
                  </option>
                  {transporterList.length > 0 &&
                    transporterList.map((list) => (
                      <option key={list.id} value={list.name}>
                        {list.name}
                      </option>
                    ))}
                </select>
                {errors.handoverTo && (
                  <span className="error-text">{errors.handoverTo}</span>
                )}
              </div>

              <div className="col-lg-2 col-md-3">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Handover By:
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <input
                  className={`form-control form-sz mb-2 ${
                    errors.receivedKitQty && "border-red-500"
                  }`}
                  value={loginUserName}
                  disabled
                />
              </div>
              <div className="col-lg-2 col-md-3">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Driver:
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <input
                  className={`form-control form-sz mb-2 ${
                    errors.driver && "border-red-500"
                  }`}
                  placeholder=""
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                />
                {errors.driver && (
                  <span className="error-text mb-1">{errors.driver}</span>
                )}
              </div>
              <div className="col-lg-2 col-md-3">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Driver Ph No:
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <input
                  className={`form-control form-sz mb-2 ${
                    errors.driverPhNo && "border-red-500"
                  }`}
                  placeholder=""
                  value={driverPhNo}
                  onChange={(e) => setDriverPhNo(e.target.value)}
                />
                {errors.driverPhNo && (
                  <span className="error-text mb-1">{errors.driverPhNo}</span>
                )}
              </div>
              {/* </div> */}
              <div className="col-lg-2 col-md-3">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Vehicle No:
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <input
                  className={`form-control form-sz mb-2 ${
                    errors.vehicleNo && "border-red-500"
                  }`}
                  placeholder=""
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                />
                {errors.vehicleNo && (
                  <span className="error-text mb-1">{errors.vehicleNo}</span>
                )}
              </div>
            </div>
            <div className="">
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                // onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleNew}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      <ToastContainer />

      {/* VIEW MODAL */}
      <Dialog
        open={savedRecordView}
        onClose={handleSavedRecordViewClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
          <div className="row">
            <div className="col-md-11">
              <Typography variant="h6">Detailed View</Typography>
            </div>
            <div className="col-md-1">
              <IconButton
                onClick={handleSavedRecordViewClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="mt-4">
          {/* <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gathered ID</TableCell>
                      <TableCell>1000001</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gathered Date</TableCell>
                      <TableCell>15-05-2024</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Flow</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pallet</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lid</TableCell>
                      <TableCell>
                        {selectedRowData.userAddressVO.address1}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SideWall</TableCell>
                      <TableCell>
                        {selectedRowData.userAddressVO.city}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Insert</TableCell>
                      <TableCell>
                        {selectedRowData.userAddressVO.state}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country</TableCell>
                      <TableCell>
                        {selectedRowData.userAddressVO.country}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PinCode</TableCell>
                      <TableCell>{}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer> */}
          <div className="row mt-4">
            <div className="overflow-x-auto w-full ">
              <table className="table table-hover w-full">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Gathered ID</th>
                    <th>Gathered Date</th>
                    <th>Flow</th>
                    <th>REC QTY</th>
                    <th>Bal QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {ListViewTableData.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td> {row.gatheredId}</td>
                      <td>{row.gatheredDate}</td>
                      <td>{row.flow}</td>
                      <td>{row.recQty}</td>
                      <td>{row.balQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

TransporterPickup.propTypes = {
  addInwardManifeast: PropTypes.func,
};

export default TransporterPickup;
