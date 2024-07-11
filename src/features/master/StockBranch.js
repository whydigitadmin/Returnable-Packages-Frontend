import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sampleFile from "../../assets/sampleFiles/sample_data_unit.xlsx";
import BulkUploadDialog from "../../utils/BulkUoloadDialog";
import SessionExpiry from "../../utils/SessionExpiry";
import { refreshAuthToken } from "../../utils/refreshAuthToken";
import {
  codeFieldValidation,
  stringValidation,
} from "../../utils/userInputValidation";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#0d6ef",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const StockBranch = () => {
  const [branch, setBranch] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [data, setData] = React.useState([]);
  const [active, setActive] = useState(true);
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [open, setOpen] = React.useState(false);
  const [tokenId, setTokenId] = React.useState(localStorage.getItem("tokenId"));
  const [sessionExpired, setSessionExpired] = React.useState(false);

  const apiUrl = `${process.env.REACT_APP_API_URL}/api/master/ExcelUploadForStockBranch`;

  useEffect(() => {
    getAllStockbranch();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = (event) => {
    // Handle file upload
    console.log(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle submit
    console.log("Submit clicked");
    handleClose();
  };

  const getAllStockbranch = async () => {
    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/stockbranchByOrgId?orgId=${orgId}`,
        { headers }
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.branch);
        await refreshAuthToken();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        setSessionExpired(true);
      }
    }
  };

  const handleSave = () => {
    const errors = {};

    if (!branch) {
      errors.branch = "Branch is required";
    }
    if (!branchCode) {
      errors.branchCode = "Code is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        active,
        orgId,
        branchCode,
        branch,
        createdby: userName,
      };
      const token = localStorage.getItem("token");
      let headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      }
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/stockbranch`,
          formData,
          { headers }
        )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            showSuccessToast(response.data.paramObjectsMap.message);
            setBranch("");
            setBranchCode("");
            setErrors({});
            getAllStockbranch();
            setSelectedRowId("");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to Save Bin Inward. Please try again.");
        });
    } else {
      setErrors(errors);
    }
  };
  const handleUpdate = () => {
    const errors = {};

    if (!branch) {
      errors.branch = "Branch is required";
    }
    if (!branchCode) {
      errors.branchCode = "Code is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        active,
        id: selectedRowId,
        branchCode,
        branch,
        createdby: userName,
      };
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/updateStockBranch`,
          formData
        )
        .then((response) => {
          if (response.data.statusFlag === "Error") {
            showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            showSuccessToast(response.data.paramObjectsMap.message);
            setBranch("");
            setBranchCode("");
            setErrors({});
            getAllStockbranch();
            setSelectedRowId("");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to update Stock Branch. Please try again.");
        });
    } else {
      setErrors(errors);
    }
  };

  const handleEditRow = (row) => {
    setErrors({});
    setSelectedRowId(row.original.id);
    setBranch(row.original.branch);
    setBranchCode(row.original.branchCode);
    if (row.original.active === "In-Active") {
      setActive(false);
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
            <Tooltip
              title={
                row.original.eflag
                  ? "Editing is disabled for this Stock Branch"
                  : ""
              }
              arrow
              disableHoverListener={!row.original.eflag}
            >
              <span>
                <IconButton
                  onClick={() => handleEditRow(row)}
                  disabled={row.original.eflag}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: "branch",
        header: "Branch",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "branchCode",
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
        accessorKey: "active",
        header: "Active",
        size: 50,
        muiTableHeadCellProps: {
          textAlign: "center",
        },
        muiTableBodyCellProps: {
          textAlign: "center",
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl">
      <div className="row">
        <div className="col-lg-2 col-md-2">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Branch <FaStarOfLife className="must" /> &nbsp; :
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            name="branch"
            value={branch}
            maxLength={20}
            onInput={stringValidation}
            onChange={(e) => {
              setBranch(e.target.value);
            }}
          />
          {errors.branch && <span className="error-text">{errors.branch}</span>}
        </div>
        <div className="col-lg-2 col-md-2">
          <label className="label mb-4">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row"
              }
            >
              Code <FaStarOfLife className="must" /> &nbsp; :
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6">
          <input
            className="form-control form-sz"
            type={"text"}
            name="code"
            value={branchCode}
            maxLength={6}
            onInput={codeFieldValidation}
            onChange={(e) => {
              setBranchCode(e.target.value);
            }}
          />
          {errors.branchCode && (
            <span className="error-text">{errors.branchCode}</span>
          )}
        </div>
        <div className="col-lg-2 col-md-6 mb-2">
          <label className="label">
            <span className={"label-text label-font-size text-base-content"}>
              Active
            </span>
          </label>
        </div>
        <div className="col-lg-2 col-md-6 mb-2">
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                checked={active}
                onChange={(e) => {
                  setActive(e.target.checked);
                }}
              />
            }
          />
        </div>
        {/* <BulkUploadDialog
          open={open}
          onOpenClick={handleClickOpen}
          handleClose={handleClose}
          dialogTitle="Upload File"
          uploadText="Upload file"
          downloadText="Sample File"
          onSubmit={handleSubmit}
          sampleFileDownload={sampleFile} // Change this to the actual path of your sample file
          handleFileUpload={handleFileUpload}
          apiUrl={apiUrl}
        /> */}
      </div>
      {selectedRowId ? (
        <div className="d-flex flex-row">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Update
          </button>
        </div>
      ) : (
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-4">
        <MaterialReactTable table={table} />
      </div>
      <ToastContainer />
      {sessionExpired && <SessionExpiry sessionExpired={sessionExpired} />}
    </div>
  );
};
