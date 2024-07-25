import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoRecordsFound from "../../utils/NoRecordsFound";
import { Pagination } from "@mui/material";

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
  const [listViewTableData, setListViewTableData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [receiverId, setReceiverId] = React.useState(
    localStorage.getItem("receiverId")
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the starting index of the current page
  const startIndex = (page - 1) * rowsPerPage;
  // Slice the tableDataView array to get the rows for the current page
  const paginatedData = listViewTableData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const pendingPaginatedData = retrievalDetailsData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    getDocIdByTransportPickup();
    getAllVendorByOrgId();
    getRetrievalDetails();
    if (listViewButton) {
      getAllTransporterPickupByReceiverId();
    }
  }, [listViewButton]);

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

  const getAllTransporterPickupByReceiverId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/oem/getAllTranportPickupByReceiverId?receiverId=${receiverId}`
      );
      if (response.status === 200) {
        setListViewTableData(
          response.data.paramObjectsMap.transportPickupVO.reverse()
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllVendorByOrgId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getVendorList?orgId=${orgId}`
      );

      if (response.status === 200) {
        setTransporterList(
          response.data.paramObjectsMap.vendorVO.transportVendorVO
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
        setRetrievalDetailsData(
          response.data.paramObjectsMap.retrievalDetails.reverse()
        );
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

  const handleRowClick = (rowId) => {
    const isRowExpanded = expandedRows.includes(rowId);
    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((id) => id !== rowId)
      : [...expandedRows, rowId];
    setExpandedRows(newExpandedRows);

    const updatedListViewTableData = listViewTableData.map((row) => {
      if (row.id === rowId) {
        row.backgroundColor = isRowExpanded ? "" : "red";
      }
      return row;
    });

    setListViewTableData(updatedListViewTableData);
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
    } else if (driverPhoneNo.length !== 10) {
      errors.driverPhoneNo = "Driver Ph No must be 10 digit";
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
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
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
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error saving: " + error.message);
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
                    {pendingPaginatedData && pendingPaginatedData.length > 0 ? (
                      pendingPaginatedData.map((row, index) => (
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
              <div className="mt-4 d-flex justify-content-center">
                <Pagination
                  count={Math.ceil(retrievalDetailsData.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                />
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
                      <th>Pickup ID</th>
                      <th>Date & Time</th>
                      <th>Handover To</th>
                      <th>Handover By</th>
                      <th>Driver</th>
                      <th>Ph No</th>
                      <th>Vehicle</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData && paginatedData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <React.Fragment key={row.id}>
                          <tr style={{ backgroundColor: "red" }}>
                            <td>{row.docId}</td>
                            <td>{row.docDate}</td>
                            <td>{row.transPorter}</td>
                            <td>{row.handoverby}</td>
                            <td>{row.driverName}</td>
                            <td>{row.driverPhoneNo}</td>
                            <td>{row.vechicleNo}</td>
                            <td>
                              <a
                                href="#"
                                style={{ cursor: "pointer", color: "blue" }}
                              >
                                <button onClick={() => handleRowClick(row.id)}>
                                  {expandedRows.includes(row.id)
                                    ? "Hide"
                                    : "Show"}
                                </button>
                              </a>
                            </td>
                          </tr>

                          {expandedRows.includes(row.id) && (
                            <tr>
                              <td colSpan="10">
                                <table className="table table-success">
                                  <thead>
                                    <tr>
                                      <th className="text-center">Category</th>
                                      <th className="text-center">
                                        Asset Name
                                      </th>
                                      <th className="text-center">
                                        Asset Code
                                      </th>
                                      <th className="text-center">Pick QTY</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row.transportPickupDetailsVO.map(
                                      (detail) => (
                                        <tr key={detail.id}>
                                          <td className="text-center">
                                            {detail.category}
                                          </td>
                                          <td className="text-center">
                                            {detail.asset}
                                          </td>
                                          <td className="text-center">
                                            {detail.assetCode}
                                          </td>
                                          <td className="text-center">
                                            {detail.pickQty}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9}>
                          <NoRecordsFound
                            message={"Transporter Pickup Details Not Found..!"}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 d-flex justify-content-center">
                <Pagination
                  count={Math.ceil(listViewTableData.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                />
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
                        <label className="label mb-2">
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
                        <label className="label mb-2">
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
                        <label className="label mb-2">
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
                    <label className="label mb-2">
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
                    <label className="label mb-2">
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
                    <label className="label mb-2">
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
                  // onChange={(e) => {
                  //   const selectedOption = e.target.value;
                  //   const selectedTransporter = transporterList.find(
                  //     (transporter) => transporter.displyName === selectedOption
                  //   );
                  //   setHandoverTo(selectedOption);
                  //   setTransPorterId(
                  //     selectedTransporter ? selectedTransporter.id : null
                  //   );
                  // }}
                  value={handoverTo}
                  onChange={(e) => setHandoverTo(e.target.value)}
                >
                  <option value="" selected>
                    Select a Transporter
                  </option>
                  {transporterList.length > 0 &&
                    transporterList.map((list, index) => (
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
                  onChange={(e) => {
                    setDriver(
                      e.target.value.toUpperCase().replace(/[^A-Z\s]/g, "")
                    );
                  }}
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
                  maxLength={10}
                  onChange={(e) =>
                    setDriverPhoneNo(
                      e.target.value.toUpperCase().replace(/[^0-9]/g, "")
                    )
                  }
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
                  maxLength={15}
                  onChange={(e) =>
                    setVehicleNo(
                      e.target.value.toUpperCase().replace(/[^a-zA-Z0-9]/g, "")
                    )
                  }
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
