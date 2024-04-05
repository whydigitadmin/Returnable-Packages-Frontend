import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaStarOfLife } from "react-icons/fa";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";

const statsData = [
  {
    title: "No of warehouse",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Active warehouse",
    value: "0",
    icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Low stock warehouses",
    value: "0",
    icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
  {
    title: "Average Transaction",
    value: "0",
    icon: <FaBoxOpen className="w-7 h-7 text-white dashicon" />,
    description: "",
  },
];

export const Terms = () => {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = useState([]);
  const [code, setCode] = useState("");
  const [termsCode, setTermsCode] = useState("");
  const [description, setDescription] = useState("");
  const [printRemarks, setPrintRemarks] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState(null);
  const [effectiveTo, setEffectiveTo] = useState(null);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState("");

  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const [formErrors, setFormErrors] = useState({
    UnitName: "",
    active: true,
  });

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
        setTableData(response.data.paramObjectsMap.termsAndConditionsVO);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "code":
        setCode(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "printRemarks":
        setPrintRemarks(value);
        break;
      case "termsCode":
        setTermsCode(value);
        break;
    }
  };

  const handleServiceSave = () => {
    const errors = {};

    if (!description) {
      errors.description = "Description is required";
    }
    if (!effectiveFrom) {
      errors.effectiveFrom = "Effective From is required";
    }
    if (!effectiveTo) {
      errors.effectiveTo = "Effective To is required";
    }
    if (!printRemarks) {
      errors.printRemarks = "PrintRemarks is required";
    }
    if (!termsCode) {
      errors.termsCode = "TermsCode is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        // id,
        orgId,
        effectiveFrom,
        effectiveTo,
        printRemarks,
        termsCode,
        details: description,
      };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/updateCreateTerms`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);

          setDescription("");
          setEffectiveFrom(null);
          setEffectiveTo(null);
          setPrintRemarks("");
          setTermsCode("");
          setErrors({});
          getTermsData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const columns = useMemo(
    () => [
      //   {
      //     accessorKey: "id",
      //     header: "ID",
      //     size: 50,
      //     muiTableHeadCellProps: {
      //       align: "first",
      //     },
      //     muiTableBodyCellProps: {
      //       align: "first",
      //     },
      //   },
      {
        accessorKey: "termsCode",
        header: "Code",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "details",
        header: "Terms and Condition",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "effectiveFrom",
        header: "Effective From",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "effectiveTo",
        header: "Effective To",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "printRemarks",
        header: "Print Remarks",
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

  return (
    <>
      {/* <h1 className="text-xl font-semibold mb-4 ms-4">Unit Details</h1> */}
      <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              value={termsCode}
              name="termsCode"
              // placeholder={"Enter"}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.termsCode && (
              <div className="error-text">{errors.termsCode}</div>
            )}
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Terms and conditions
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <textarea
              style={{ fontSize: "0.800rem", width: "100%" }}
              value={description}
              name="description"
              // placeholder={"Enter"}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.description && (
              <div className="error-text">{errors.description}</div>
            )}
          </div>
          {/* From Date */}
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Effective From:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={effectiveFrom}
                onChange={(date) => setEffectiveFrom(date)}
                slotProps={{
                  textField: { size: "small", clearable: true },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            {errors.effectiveFrom && (
              <span className="error-text mb-1">{errors.effectiveFrom}</span>
            )}
          </div>
          {/* To Date */}
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label mb-4">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Effective To:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={effectiveTo}
                onChange={(date) => setEffectiveTo(date)}
                slotProps={{
                  textField: { size: "small", clearable: true },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            {errors.effectiveTo && (
              <span className="error-text mb-1">{errors.effectiveTo}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Print Remarks
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              value={printRemarks}
              name="printRemarks"
              // placeholder={"Enter"}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.printRemarks && (
              <div className="error-text">{errors.printRemarks}</div>
            )}
          </div>

          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleServiceSave}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
          </div>
        </div>

        <div className="mt-4">
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "center",
                },
                size: 80,
              },
            }}
            columns={columns}
            data={tableData}
            editingMode="modal"
            enableColumnOrdering
            renderRowActions={({ row, table }) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                {/* <Tooltip arrow placement="right" title="Edit">
                      <IconButton style={{ color: "blue" }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
    
                    <Tooltip arrow placement="right" title="View">
                      <IconButton
                        color="primary"
                        // onClick={() => handleView(row.original)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip> */}
              </Box>
            )}
          />
        </div>
      </div>
    </>
  );
};
