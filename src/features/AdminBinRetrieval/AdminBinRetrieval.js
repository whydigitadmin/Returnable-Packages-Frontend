import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { FaStarOfLife } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import NoRecordsFound from "../../utils/NoRecordsFound";
import DashBoardComponent from "../master/DashBoardComponent";
import { FaUser } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import EditIcon from "@mui/icons-material/Edit";

export const AdminBinRetrieval = () => {
  const [viewId, setViewId] = useState("");
  const [editId, setEditId] = useState("");
  const [stockLoc, setStockLoc] = useState("");
  const [transporterDocId, setTransporterDocId] = useState("");
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [fromStockBranch, setfromStockBranch] = useState("");
  const [toStockBranch, setToStockBranch] = useState("");
  const [transportPickDate, setTransportPickDate] = useState("");
  const [transporter, setTransporter] = useState("");
  const [transporterDocNo, setTransporterDocNo] = useState("");
  const [handoverBy, setHandoverBy] = useState("");
  const [driver, setDriver] = useState("");
  const [driverPhNo, setDriverPhNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [tableDataView, setTableDataView] = useState(true);
  const [retrievaledData, setRetrievaledData] = useState(false);
  const [pendingData, setPendingData] = useState([]);

  const [listViewTableView, setListViewTableView] = useState(false);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [loginUserId, setLoginUserId] = React.useState(
    localStorage.getItem("userId")
  );
  const [loginUserName, setLoginUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [tableData, setTableData] = useState([]);

  const [listViewTableData, setListViewTableData] = useState([]);
  const [statsData, setStatsData] = useState([
    {
      title: "Total Bin Retrievals",
      value: "0",
      icon: <MdGroups className="w-7 h-7 text-white dashicon" />,
      description: "",
    },
    {
      title: "Completed Bin Retrievals",
      value: "0",
      icon: <FaUser className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "Pending Bin Retrievals",
      value: "0",
      icon: <FaUser className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "--",
      value: "0",
      icon: <FaDatabase className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
  ]);

  useEffect(() => {
    getAllPendingBinRetrievalData();
    if (editId) {
      getNewDocId();
    }
  }, [editId]);
  useEffect(() => {
    console.log("Pending Data:", pendingData);
  }, [pendingData]);

  const getNewDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getDocIdByBinRetrieval`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        console.log(
          "GET DocId FROM API Response:",
          response.data.paramObjectsMap.binRetrievalDocid
        );
        setDocId(response.data.paramObjectsMap.binRetrievalDocid);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllPendingBinRetrievalData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getPendingBinRetrievalPickup?orgId=${orgId}&userId=${loginUserId}`
      );

      if (response.status === 200) {
        setPendingData(response.data.paramObjectsMap.pendingBinRetrieval);
        console.log(
          "THE PENDING DATA FROM API IS",
          response.data.paramObjectsMap.pendingBinRetrieval
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllBinRetrievalData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequestreportByOrgId?OrgId=${orgId}&userId=${loginUserId}`
      );

      if (response.status === 200) {
        const allRequests = response.data.paramObjectsMap.issueRequestVO;
        setData(allRequests.reverse());
        setListViewTableView(!listViewTableView);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditRow = async (row) => {
    console.log("the row data is:", row.original);
    setEditId(row.original.pickupNo);
    setTransporterDocId(row.original.pickupNo);
    setfromStockBranch(row.original.fromStockBranch);
    setToStockBranch(row.original.toStockBranch);
    setTransportPickDate(row.original.pickupDate);
    setTransporter("no original data");
    setTransporterDocNo(row.original.transportDocNo);
    setHandoverBy("no original data");
    setDriver(row.original.driverName);
    setDriverPhNo(row.original.driverPhoneNo);
    setVehicleNo(row.original.vehicleNo);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getTransportPickupDetailsByDocid?orgId=${orgId}&pickupDocId=${row.original.pickupNo}`
      );

      if (response.status === 200) {
        console.log(
          "THE TABLE DATA IS:",
          response.data.paramObjectsMap.transportPickpDetails
        );
        setTableData(response.data.paramObjectsMap.transportPickpDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleEditRow = useCallback(
  //   (row) => {
  //     console.log("Row data:", row.original);

  //     const editData = pendingData.find(
  //       (item) => item.pickupNo === row.original.pickupNo
  //     );

  //     console.log("edit data is :", editData);

  //     if (editData) {
  //       setEditId(editData.pickupNo);
  //       setTransporterDocId(editData.pickupNo);
  //     } else {
  //       console.error("No matching data found for row:", row);
  //     }
  //   },
  //   [pendingData]
  // );

  const pendingColumns = useMemo(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableSorting: false,
        enableColumnOrdering: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <div>
            <IconButton onClick={() => handleEditRow(row)}>
              <EditIcon />
            </IconButton>
          </div>
        ),
      },
      {
        accessorKey: "pickupNo",
        header: "Pickup No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "pickupDate",
        header: "Pickup Date",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "fromStockBranch",
        header: "From",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "toStockBranch",
        header: "To",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "vehicleNo",
        header: "Vehicle No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        accessorKey: "driverName",
        header: "Driver Name",
        size: 250,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "driverPhoneNo",
        header: "Ph No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );
  const retrievaledColumns = useMemo(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableSorting: false,
        enableColumnOrdering: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <div>
            <IconButton
            // onClick={() => handleEditRow(row)}
            >
              <VisibilityIcon />
            </IconButton>
          </div>
        ),
      },
      {
        accessorKey: "reqKitQty",
        header: "Completed",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "reqNo",
        header: "Req No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "reqDate",
        header: "Req Date",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "emitter",
        header: "Emitter",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        accessorKey: "flow",
        header: "Flow",
        size: 250,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "kitCode",
        header: "Kit No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    data: listViewTableView ? retrievaledData : pendingData,
    columns: listViewTableView ? retrievaledColumns : pendingColumns,
  });

  const handleListViewButtonChange = () => {
    setListViewTableView(!listViewTableView);
  };
  const handleTransactionViewClose = () => {
    setEditId("");
    setViewId("");
  };

  const handleSave = () => {
    const errors = {};
    if (!docId) {
      errors.docId = "DocID is required";
    }

    const tableFormData = tableData.map((row) => ({
      category: row.category,
      asset: row.asset,
      assetCode: row.assetCode,
      invqty: row.invQty,
      recqty: row.reteriveQty,
      shotQty: row.shortQty,
    }));

    const formData = {
      binRetrievalDetailsDTO: tableFormData,
      createdby: loginUserName,
      docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
      driverName: driver,
      driverPhoneNo: driverPhNo,
      fromStockBranch: fromStockBranch,
      handOverBy: handoverBy,
      orgId: orgId,
      pickupDate: transportPickDate,
      pickupDocId: transporterDocId,
      retrievalWarehouse: toStockBranch,
      toStockBranch: toStockBranch,
      transPortDocNo: transporterDocNo,
      transPorter: transporter,
      vechicleNo: vehicleNo,
    };
    if (Object.keys(errors).length === 0) {
      console.log("Data to save is:", formData);
    } else {
      setErrors(errors);
    }

    // if (Object.keys(errors).length === 0) {
    //   const formData = {
    //     binRetrievalDetailsDTO: tableFormData,
    //     createdby: loginUserName,
    //     docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
    //     driverName: driver,
    //     driverPhoneNo: driverPhNo,
    //     fromStockBranch: fromStockBranch,
    //     handOverBy: handoverBy,
    //     orgId: orgId,
    //     pickupDate: transportPickDate,
    //     pickupDocId: transporterDocId,
    //     retrievalWarehouse: toStockBranch,
    //     toStockBranch: toStockBranch,
    //     transPortDocNo: transporterDocNo,
    //     transPorter: transporter,
    //     vechicleNo: vehicleNo,
    //   };
    //   console.log("Data to save is:", formData);

    //   axios
    //     .post(
    //       `${process.env.REACT_APP_API_URL}/api/master/createBinRetrieval`,
    //       formData
    //     )
    //     .then((response) => {
    //       console.log("After save Response:", response.data);
    //       const responseDocId =
    //         response.data.paramObjectsMap.binRetrievalVO.docId;
    //       // handleNew();
    //       toast.success(
    //         `Bin Retrieval ${responseDocId} Created Successfully!`,
    //         {
    //           autoClose: 2000,
    //           theme: "colored",
    //         }
    //       );

    //       setTimeout(() => {
    //         handleTransactionViewClose();
    //       }, 2000);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       toast.error(
    //         "Failed to Create Emitter Bin Retrieval. Please try again."
    //       );
    //     });
    // } else {
    //   setErrors(errors);
    // }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        {!(editId || viewId) ? (
          <>
            {/* DASHBOARD COMPONENT */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {statsData.map((d, k) => (
                <DashBoardComponent key={k} {...d} colorIndex={k} />
              ))}
            </div>

            <div className="">
              <div className="flex justify-content-between mt-4 w-full">
                <h1 className="text-xl font-semibold mt-3">
                  {listViewTableView
                    ? "Retrievaled Bin Details"
                    : "Pending Retrieval Details"}
                </h1>

                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1 mb-2"
                  style={{
                    color: "blue",
                    border: "1px solid grey",
                  }}
                  onClick={handleListViewButtonChange}
                >
                  <img
                    src="/issuemanifest1.png"
                    alt="pending-status-icon"
                    title="add"
                    style={{
                      width: 30,
                      height: 30,
                      margin: "auto",
                      hover: "pointer",
                    }}
                  />
                  <span
                    className="text-form text-base"
                    style={{ marginLeft: "10px", color: "green" }}
                  >
                    {listViewTableView
                      ? "Pending Reterieval Bins"
                      : "Reterieval Bins"}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-2">
              <MaterialReactTable table={table} />
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-end">
              <IoMdClose
                onClick={handleTransactionViewClose}
                className="cursor-pointer w-8 h-8 mb-3"
              />
            </div>

            <div className="row mt-3">
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Doc Id:
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  // placeholder="Auto Gen"
                  value={viewId ? viewId : docId}
                  // onChange={(e) => setDocId(e.target.value)}
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
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Transporter DocId
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  placeholder=""
                  value={transporterDocId}
                  disabled
                />
                {errors.transporterDocId && (
                  <span className="error-text mb-1">
                    {errors.transporterDocId}
                  </span>
                )}
              </div>
              {tableDataView && (
                <>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        From Stock Branch:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={fromStockBranch}
                      onChange={(e) => setfromStockBranch(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        To Stock Branch:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={toStockBranch}
                      onChange={(e) => setToStockBranch(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Transporter Pickup Date:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={transportPickDate}
                      onChange={(e) => setTransportPickDate(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Transporter:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={transporter}
                      onChange={(e) => setTransporter(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Transporter Doc No:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={transporterDocNo}
                      onChange={(e) => setTransporterDocNo(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Handover By:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={handoverBy}
                      onChange={(e) => setHandoverBy(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Driver:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={driver}
                      onChange={(e) => setDriver(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Driver PhNo:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={driverPhNo}
                      onChange={(e) => setDriverPhNo(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label className="label mb-4">
                      <span className="label-text label-font-size text-base-content d-flex flex-row">
                        Vehicle No:
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <input
                      className="form-control form-sz mb-2"
                      placeholder=""
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      disabled
                    />
                  </div>
                </>
              )}
            </div>

            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="overflow-x-auto">
                  <table className="table table-hover w-full">
                    <thead>
                      <tr>
                        <th
                          className="px-2 text-black border text-center"
                          style={{ width: "15%" }}
                        >
                          Category
                        </th>
                        <th
                          className="px-2 text-black border text-center"
                          style={{ paddingTop: "1%", paddingBottom: "1%" }}
                        >
                          Asset Code
                        </th>
                        <th
                          className="px-2 text-black border text-center"
                          style={{ paddingTop: "1%", paddingBottom: "1%" }}
                        >
                          Asset
                        </th>
                        <th
                          className="px-2 text-black border text-center"
                          style={{ paddingTop: "1%", paddingBottom: "1%" }}
                        >
                          Inv Quantity
                        </th>
                        <th
                          className="px-2 text-black border text-center"
                          style={{ paddingTop: "1%", paddingBottom: "1%" }}
                        >
                          Retrieve Qty
                        </th>
                        <th
                          className="px-2 text-black border text-center"
                          style={{ paddingTop: "1%", paddingBottom: "1%" }}
                        >
                          Short / Damage Qty
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row, index) => (
                          <tr key={row.id}>
                            <td className="border px-2 py-2 text-center">
                              {row.category}
                            </td>
                            <td className="border px-2 py-2 text-center">
                              {row.assetCode}
                            </td>
                            <td className="border px-2 py-2 text-center">
                              {row.asset}
                            </td>
                            <td className="border px-2 py-2 text-center">
                              {row.invQty}
                            </td>
                            <td>
                              <input
                                type="text"
                                value={row.reteriveQty}
                                onChange={(e) => {
                                  const inputValue = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const newValue = parseInt(inputValue, 10);

                                  if (!isNaN(newValue)) {
                                    if (
                                      newValue <= row.invQty &&
                                      newValue > 0
                                    ) {
                                      setTableData((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                reteriveQty: newValue,
                                                errorMsg: "",
                                                tempCalc: row.invQty - newValue,
                                              }
                                            : r
                                        )
                                      );
                                    } else {
                                      setTableData((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                reteriveQty: "",
                                                errorMsg:
                                                  row.invQty === 1
                                                    ? `Quantity must be ${row.invQty}`
                                                    : `Quantity must be between 1 and ${row.invQty}.`,
                                              }
                                            : r
                                        )
                                      );
                                    }
                                  } else {
                                    setTableData((prev) =>
                                      prev.map((r, i) =>
                                        i === index
                                          ? {
                                              ...r,
                                              reteriveQty: "",
                                              errorMsg: "",
                                            }
                                          : r
                                      )
                                    );
                                  }
                                }}
                                className="border px-2 py-2 text-center"
                                style={{ width: "50px" }}
                              />
                              {row.errorMsg && (
                                <span className="error-text mb-1 ms-2">
                                  {row.errorMsg}
                                </span>
                              )}
                            </td>

                            <td className="d-flex flex-row">
                              <input
                                type="text"
                                value={row.damageQty}
                                disabled={row.tempCalc > 0 ? false : true}
                                onChange={(e) => {
                                  const inputValue = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const newValue = parseInt(inputValue, 10);

                                  if (!isNaN(newValue)) {
                                    if (
                                      newValue <= row.tempCalc &&
                                      newValue > 0
                                    ) {
                                      setTableData((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                damageQty: newValue,
                                                damageErrorMsg: "",
                                              }
                                            : r
                                        )
                                      );
                                    } else {
                                      setTableData((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                damageQty: "",
                                                damageErrorMsg:
                                                  row.tempCalc === 1
                                                    ? `Quantity must be ${row.tempCalc}`
                                                    : `Quantity must be between 1 and ${row.tempCalc}.`,
                                              }
                                            : r
                                        )
                                      );
                                    }
                                  } else {
                                    setTableData((prev) =>
                                      prev.map((r, i) =>
                                        i === index
                                          ? {
                                              ...r,
                                              damageQty: "",
                                              damageErrorMsg: "",
                                            }
                                          : r
                                      )
                                    );
                                  }
                                }}
                                className="border px-2 py-2 text-center"
                                style={{ width: "50px" }}
                              />
                              {row.damageErrorMsg && (
                                <span className="error-text mb-1 ms-2">
                                  {row.damageErrorMsg}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10}>
                            <NoRecordsFound
                              message={"Pending Bin Inward not found"}
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                // onClick={handleNew}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminBinRetrieval;
