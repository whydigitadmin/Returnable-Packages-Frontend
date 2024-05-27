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
import {
  stringValidation,
  codeFieldValidation,
} from "../../utils/userInputValidation";

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

  useEffect(() => {
    getAllStockbranch();
  }, []);

  const getAllStockbranch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/stockbranchByOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.branch);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/stockbranch`,
          formData
        )
        .then((response) => {
          setBranch("");
          setBranchCode("");
          setErrors({});
          getAllStockbranch();
          toast.success("Bin Inward Saved Successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
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
          setBranch("");
          setBranchCode("");
          setErrors({});
          getAllStockbranch();
          setSelectedRowId("");
          toast.success("Stock Branch updated successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
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
    </div>
  );
};
