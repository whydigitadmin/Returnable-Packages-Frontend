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
import NoRecordsFound from "../../utils/NoRecordsFound";

const TransporterPickup = ({}) => {
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [handoverTo, setHandoverTo] = useState("");
  const [transPorterId, setTransPorterId] = useState("");
  const [transPortDocNo, setTransPortDocNo] = useState("");
  const [driver, setDriver] = useState("");
  const [driverPhoneNo, setDriverPhoneNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [listViewButton, setListViewButton] = useState(false);
  const [pendingView, setPendingView] = useState(true);
  const [transactionView, setTransactionView] = useState(false);
  const [transporterPickupDetails, setTransporterPickupDetails] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [pickupData, setPickupData] = useState([]);
  const [retrievalDetailsData, setRetrievalDetailsData] = useState([]);
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [receiverId, setReceiverId] = React.useState(
    localStorage.getItem("receiverId")
  );

  useEffect(() => {
    getDocIdByTransportPickup();
    getAllVendorByOrgId();
    getRetrievalDetails();
  }, []);

  const getDocIdByTransportPickup = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getDocIdByTransportPickup`
      );

      if (response.status === 200) {
        setDocId(response.data.paramObjectsMap.transportPickupDocid);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllVendorByOrgId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getVendorByOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        setTransporterList(
          response.data.paramObjectsMap.vendorVO.filter(
            (user) => user.venderType === "Transport"
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRetrievalDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getRetrievalDetails?orgId=${orgId}&receiverId=${receiverId}`
      );

      if (response.status === 200) {
        setRetrievalDetailsData(response.data.paramObjectsMap.retrievalDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTransactionView = (row) => {
    setTransactionView(true);
    setPendingView(false);
    getRetrievalDeatilsforPickupFillgrid(row);

    const transporterPickup = retrievalDetailsData.filter(
      (data) => data.rmId !== row.rmId
    );

    if (transporterPickup.length > 0) {
      setTransporterPickupDetails(transporterPickup[0]);
    } else {
      setTransporterPickupDetails({});
    }
  };

  const getRetrievalDeatilsforPickupFillgrid = async (rmId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getRetrievalDeatilsforPickupFillgrid?orgId=${orgId}&rmNo=${rmId}`
      );

      if (response.status === 200) {
        setPickupData(response.data.paramObjectsMap.retrievalDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNew = () => {
    setHandoverTo("");
    setDriver("");
    setDriverPhoneNo("");
    setVehicleNo("");
    // setTableData({});
    setErrors({});
  };

  const handleSave = () => {
    const errors = {};
    if (!handoverTo) {
      errors.handoverTo = "Handover To is required";
    }

    if (!transPortDocNo) {
      errors.transPortDocNo = "DocNo is required";
    }
    if (!driver) {
      errors.driver = "Driver is required";
    }

    if (!driverPhoneNo) {
      errors.driverPhoneNo = "Driver Ph No is required";
    }

    if (!vehicleNo) {
      errors.vehicleNo = "Vehicle No is required";
    }

    if (Object.keys(errors).length === 0) {
      const requestData = {
        createdby: userName,
        docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
        driverName: driver,
        driverPhoneNo,
        fromStockBranch: transporterPickupDetails.fromStockBranch,
        handoverby: userName,
        orgId,
        receiverId,
        rmDate: transporterPickupDetails.rmDate,
        rmNo: transporterPickupDetails.rmId,
        toStockBranch: transporterPickupDetails.toStockBranch,
        transPortDocNo,
        transPorter: handoverTo,
        transPorterId,
        transportPickupDetailsDTO: pickupData,
        vechicleNo: vehicleNo,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/oem/createTransportPickp`,
          requestData
        )
        .then((response) => {
          console.log("requestData", requestData);
          setDriver("");
          setDriverPhoneNo("");
          setTransPortDocNo("");
          setVehicleNo("");
          setHandoverTo("");
          setPickupData("");
          setTransactionView(false);
          setPendingView(true);
          setErrors("");
          getDocIdByTransportPickup();
          getRetrievalDetails();
          // toast.success("Outward Qty updated");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Network Error!");
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div
        className="pt-8 card p-3 bg-base-100 shadow-xl mt-2"
        style={{ width: "85%", margin: "auto" }}
      >
        <div className="flex items-center mt-3">
          <Link to="/app/welcomeoem" className="mr-4">
            <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
          </Link>
          <p className="text-2xl">
            <strong>
              {listViewButton
                ? "Transporter Pickup"
                : "Pending Transporter Pickup"}
            </strong>
          </p>
          <div className="ml-auto">
            {!transactionView && (
              <button
                type="button"
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={(e) => {
                  setListViewButton(!listViewButton);
                  setPendingView(!pendingView);
                }}
              >
                {listViewButton ? "Close" : "View"}
              </button>
            )}
          </div>
        </div>

        {pendingView && (
          <>
            <div className="row mt-4">
              <div className="overflow-x-auto w-full ">
                <table className="table table-hover w-full">
                  <thead>
                    <tr>
                      <th className="text-center">Retrieval Manifest No</th>
                      <th className="text-center">Retrieval Date</th>
                      <th className="text-center">From Stock Branch</th>
                      <th className="text-center">To Stock Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retrievalDetailsData && retrievalDetailsData.length > 0 ? (
                      retrievalDetailsData.map((row, index) => (
                        <tr key={row.index}>
                          <td className="text-center">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleTransactionView(row.rmId);
                              }}
                              style={{ cursor: "pointer", color: "blue" }}
                            >
                              {row.rmId}
                            </a>
                          </td>
                          <td className="text-center">{row.rmDate}</td>
                          <td className="text-center">{row.fromStockBranch}</td>
                          <td className="text-center">{row.toStockBranch}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9}>
                          <NoRecordsFound
                            message={
                              "Pending Transporter Pickup Details Not Found..!"
                            }
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {listViewButton && (
          <>
            <div className="row mt-4">
              <div className="overflow-x-auto w-full ">
                <table className="table table-hover w-full">
                  <thead>
                    <tr>
                      <th className="text-center">S.No</th>
                      <th className="text-center">Pickup ID</th>
                      <th className="text-center">Date & Time</th>
                      <th className="text-center">Handover To</th>
                      <th className="text-center">Handover By</th>
                      <th className="text-center">Driver</th>
                      <th className="text-center">Ph No</th>
                      <th className="text-center">Vehicle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retrievalDetailsData.map((row, index) => (
                      <tr key={row.id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{row.pickId}</td>
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
        )}

        {transactionView && transporterPickupDetails && (
          <>
            <div className="row mt-4">
              {Array.isArray(transporterPickupDetails) ? (
                transporterPickupDetails.map((info) => {
                  return (
                    <>
                      <div className="col-lg-2 col-md-3">
                        <label className="label mb-4">
                          <span className="label-text label-font-size text-base-content d-flex flex-row">
                            RETRIEVAL MANIFEST NO:
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <input
                          className="form-control form-sz mb-2"
                          value={info.rmId}
                          disabled
                        />
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <label className="label mb-4">
                          <span className="label-text label-font-size text-base-content d-flex flex-row">
                            RETRIEVAL DATE:
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <input
                          className="form-control form-sz mb-2"
                          value={info.rmDate}
                          disabled
                        />
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <label className="label mb-4">
                          <span className="label-text label-font-size text-base-content d-flex flex-row">
                            FROM STOCK BRANCH:
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <input
                          className="form-control form-sz mb-2"
                          value={info.fromStockBranch}
                          disabled
                        />
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <label className="label mb-4">
                          <span className="label-text label-font-size text-base-content d-flex flex-row">
                            TO STOCK BRANCH:
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <input
                          className="form-control form-sz mb-2"
                          value={info.toStockBranch}
                          disabled
                        />
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div className="col-lg-2 col-md-3">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        RETRIEVAL MANIFEST NO:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <input
                      className="form-control form-sz mb-2"
                      value={transporterPickupDetails.rmId || ""}
                      disabled
                    />
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        RETRIEVAL DATE:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <input
                      className="form-control form-sz mb-2"
                      value={transporterPickupDetails.rmDate || ""}
                      disabled
                    />
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        FROM STOCK BRANCH:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <input
                      className="form-control form-sz mb-2"
                      value={transporterPickupDetails.fromStockBranch || ""}
                      disabled
                    />
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        TO STOCK BRANCH:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <input
                      className="form-control form-sz mb-2"
                      value={transporterPickupDetails.toStockBranch || ""}
                      disabled
                    />
                  </div>
                </>
              )}
              <div className="col-lg-2 col-md-3">
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
                  disabled
                />
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
                    const selectedOption = e.target.value;
                    const selectedTransporter = transporterList.find(
                      (transporter) => transporter.displyName === selectedOption
                    );
                    setHandoverTo(selectedOption);
                    setTransPorterId(
                      selectedTransporter ? selectedTransporter.id : null
                    );
                  }}
                  value={handoverTo}
                >
                  <option value="" selected>
                    Select a Transporter
                  </option>
                  {transporterList.length > 0 &&
                    transporterList.map((list) => (
                      <option key={list.id} value={list.displyName}>
                        {list.displyName}
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
                    Transporter Doc No:
                  </span>
                </label>
              </div>
              <div className="col-lg-2 col-md-3">
                <input
                  className={`form-control form-sz mb-2 ${
                    errors.transPortDocNo && "border-red-500"
                  }`}
                  value={transPortDocNo}
                  onChange={(e) => setTransPortDocNo(e.target.value)}
                />
                {errors.transPortDocNo && (
                  <span className="error-text">{errors.transPortDocNo}</span>
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
                  className="form-control form-sz mb-2"
                  value={userName}
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
                    errors.driverPhoneNo && "border-red-500"
                  }`}
                  placeholder=""
                  value={driverPhoneNo}
                  onChange={(e) => setDriverPhoneNo(e.target.value)}
                />
                {errors.driverPhoneNo && (
                  <span className="error-text mb-1">
                    {errors.driverPhoneNo}
                  </span>
                )}
              </div>
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

              <div>
                <div className="row mt-4">
                  <div className="overflow-x-auto w-full ">
                    <table className="table table-hover w-full">
                      <thead>
                        <tr>
                          <th className="text-center">Asset Code</th>
                          <th className="text-center">Category</th>
                          <th className="text-center">Asset</th>
                          <th className="text-center">Pickup Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pickupData.map((row, index) => (
                          <tr key={row.index}>
                            <td className="text-center">{row.assetCode}</td>
                            <td className="text-center">{row.category}</td>
                            <td className="text-center">{row.asset}</td>
                            <td className="text-center">{row.pickQty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleSave}
              >
                Pickup
              </button>
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                // onClick={handleNew}
                onClick={() => {
                  setTransactionView(!transactionView);
                  setPendingView(true);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default TransporterPickup;
