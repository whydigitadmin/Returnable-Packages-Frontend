import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef, useMemo } from "react";
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

export const AdminBinRetrieval = () => {
  const [viewId, setViewId] = useState("");
  const [stockLoc, setStockLoc] = useState("");
  const [transporterDocId, setTransporterDocId] = useState("");
  const [docId, setDocId] = useState("");
  const [docDate, setDocDate] = useState(dayjs());
  const [stockBranchList, setStockBranchList] = useState([
    { id: 1, branchCode: "ch-pun" },
    { id: 2, branchCode: "tn-dl" },
  ]);
  const [transporterDocIdList, setTransporterDocIdList] = useState([
    { docId: "doc1" },
    { docId: "doc2" },
  ]);
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
  const [tableData, setTableData] = useState([
    {
      id: 1,
      category: "Pallet",
      assetCode: "PLT",
      asset: "PLT1210",
      assetQty: "10",
      reteriveQty: "10",
    },
  ]);

  const [listViewTableData, setListViewTableData] = useState([]);

  useEffect(() => {
    // getAllBinRetrievalData();
  }, []);

  const getNewDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getDocIdByBinallotment`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        console.log(
          "GET DocId FROM API Response:",
          response.data.paramObjectsMap.allotDocId
        );
        setDocId(response.data.paramObjectsMap.allotDocId);
      } else {
        console.error("API Error:", response.data);
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

  const columns = useMemo(
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
        header: "Req QTY",
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
    data,
    columns,
  });

  const handleStockLocChange = (e) => {
    setStockLoc(e.target.value);
  };
  const handleTransporterDocIdChange = (e) => {
    setTransporterDocId(e.target.value);
  };

  // const handleNew = () => {
  //   setDocId("");
  //   setStockLoc("");
  //   setReqNo("");
  //   setReqDate(null);
  //   setEmitter("");
  //   setFlow("");
  //   setReqKitName("");
  //   setReqPartName("");
  //   setReqQty("");
  //   setAvlQty("");
  //   setAlotQty("");
  //   setTableData([
  //     {
  //       id: 1,
  //       assetId: "",
  //       rfId: "",
  //       asset: "",
  //       assetCode: "",
  //       qty: "",
  //     },
  //   ]);
  //   setErrors({});
  // };
  // const handleSave = () => {
  //   console.log("testing");
  //   const errors = {};
  //   if (!docDate) {
  //     errors.docDate = "Doc Date is required";
  //   }

  //   if (!stockLoc) {
  //     errors.stockLoc = "Stock Branch is required";
  //   }

  //   if (!reqNo) {
  //     errors.reqNo = "Req No is required";
  //   }

  //   if (!reqDate) {
  //     errors.reqDate = "Req Date is required";
  //   }

  //   if (!emitter) {
  //     errors.emitter = "Emitter Name is required";
  //   }

  //   if (!reqQty) {
  //     errors.reqQty = "Req QTY is required";
  //   }
  //   if (!alotQty) {
  //     errors.alotQty = "Alote QTY is required";
  //   }

  //   const tableFormData = tableData.map((row) => ({
  //     asset: row.asset,
  //     assetCode: row.assetCode,
  //     qty: row.qty,
  //     rfId: row.rfId,
  //     tagCode: row.assetId,
  //   }));

  //   const isTableDataEmpty = tableFormData.some(
  //     (row) => row.rfId === "" || row.qrCode === ""
  //   );

  //   if (isTableDataEmpty) {
  //     errors.tableData = "Please fill all table fields";
  //   } else {
  //     delete errors.tableData;
  //   }

  //   if (Object.keys(errors).length === 0) {
  //     const formData = {
  //       docDate: docDate ? dayjs(docDate).format("YYYY-MM-DD") : null,
  //       stockBranch: stockLoc,
  //       binReqNo: reqNo,
  //       binReqDate: reqDate,
  //       emitterId: emitterId,
  //       flowId: flowId,
  //       flow: flow,
  //       kitCode: reqKitName,
  //       reqKitQty: reqQty,
  //       avlKitQty: avlQty,
  //       allotKitQty: alotQty,
  //       partCode: reqPartNo,
  //       partName: reqPartName,
  //       createdby: userName,
  //       orgId: orgId,
  //       binAllotmentDetailsDTO: tableFormData,
  //     };
  //     console.log("Data to save is:", formData);

  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/api/master/binAllotment`,
  //         formData
  //       )
  //       .then((response) => {
  //         console.log("After save Response:", response.data);
  //         const responseDocId =
  //           response.data.paramObjectsMap.binAllotmentVO.docId;
  //         handleNew();
  //         toast.success(
  //           `Bin Allotment ${responseDocId} Created Successfully!`,
  //           {
  //             autoClose: 2000,
  //             theme: "colored",
  //           }
  //         );

  //         setTimeout(() => {
  //           addBinAllotment(false);
  //         }, 2000);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         toast.error(
  //           "Failed to Create Emitter Bin Allotment. Please try again."
  //         );
  //       });
  //   } else {
  //     setErrors(errors);
  //   }
  // };

  return (
    <>
      <div className="pt-8 card w-full p-3 bg-base-100 shadow-xl mt-2">
        <div className="d-flex justify-content-end">
          {!viewId && (
            <>
              <div>
                <button
                  type="button"
                  className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={getAllBinRetrievalData}
                >
                  View
                </button>
              </div>
            </>
          )}
        </div>
        {listViewTableView ? (
          <>
            <div className="mt-2">
              <MaterialReactTable table={table} />
            </div>
          </>
        ) : (
          <>
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
                  placeholder="Auto Gen"
                  value={viewId ? viewId : docId}
                  onChange={(e) => setDocId(e.target.value)}
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
                    Stock Location
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={handleStockLocChange}
                  value={stockLoc}
                  disabled={viewId ? true : false}
                >
                  <option value="" disabled>
                    Select Stock Location
                  </option>
                  {stockBranchList &&
                    stockBranchList.map((list, index) => (
                      <option key={index} value={list.branchCode}>
                        {list.branchCode}
                      </option>
                    ))}
                </select>
                {errors.stockLoc && (
                  <span className="error-text mb-1">{errors.stockLoc}</span>
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
                <select
                  className="form-select form-sz w-full mb-2"
                  onChange={handleTransporterDocIdChange}
                  value={transporterDocId}
                  disabled={viewId ? true : false}
                >
                  <option value="" disabled>
                    Select Transporter DocId
                  </option>
                  {transporterDocIdList &&
                    transporterDocIdList.map((list, index) => (
                      <option key={index} value={list.docId}>
                        {list.docId}
                      </option>
                    ))}
                </select>
                {errors.transporterDocId && (
                  <span className="error-text mb-1">
                    {errors.transporterDocId}
                  </span>
                )}
              </div>
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

                        <th className="px-2 text-black border text-center">
                          Asset QTY
                        </th>
                        <th className="px-2 text-black border text-center">
                          Reterive Qty
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row) => (
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
                              {row.assetQty}
                            </td>

                            <td className="border px-2 py-2 text-center">
                              {row.reteriveQty}
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
                // onClick={handleSave}
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
      <ToastContainer />
    </>
  );
};

export default AdminBinRetrieval;
