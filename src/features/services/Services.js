import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { MaterialReactTable, useMaterialReactTable, } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaStarOfLife } from "react-icons/fa";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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

function Services() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = useState([]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRowId, setSelectedRowId] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [errors, setErrors] = useState("");
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );

  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const [formErrors, setFormErrors] = useState({
    UnitName: "",
    active: true,
  });

  useEffect(() => {
    getAllServiceData();
  }, []);

  const getAllServiceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/Services?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.Services);

      } else {

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
    }
  };

  const handleUpdateService = () => {
    const errors = {};
    if (!code) {
      errors.code = "Code is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        id: selectedRowId,
        code,
        description,
        orgid: orgId,
        createdBy: userDetail.firstName,

      };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/updateCreateService`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          setCode("");
          setDescription("");
          setErrors({})
          getAllServiceData()
          setSelectedRowId("")
          toast.success("Service updated successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Service Failed to Update");
        });
    } else {
      setErrors(errors);
    }
  };
  const handleSaveService = () => {
    const errors = {};
    if (!code) {
      errors.code = "Code is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        code,
        description,
        orgid: orgId,
        createdBy: userDetail.firstName,

      };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/updateCreateService`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          setCode("");
          setDescription("");
          setErrors({})
          toast.success("Service saved successfully!", {
            autoClose: 2000,
            theme: "colored",
          });
          getAllServiceData();
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("service Failed to Save");
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
        accessorKey: "code",
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
        accessorKey: "description",
        header: "Description",
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
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ cell: { value } }) => (
          <span>{value ? "Active" : "Active"}</span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
  });
  const handleEditRow = (row) => {
    setErrors({});
    setSelectedRowId(row.original.id);
    setDescription(row.original.description)
    setCode(row.original.code)
  };

  return (
    <>
      {/* <h1 className="text-xl font-semibold mb-4 ms-4">Unit Details</h1> */}
      <div className="card w-full p-6 bg-base-100 shadow-xl">
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
              value={code}
              name="code"
              maxLength={2}
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase().replace(/[^A-Za-z]/g, '');
              }}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.code && <div className="error-text">{errors.code}</div>}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Description
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              value={description}
              name="description"
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.description && (
              <div className="error-text">{errors.description}</div>
            )}
          </div>
          {selectedRowId ? (<div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleUpdateService}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          </div>) : (
            <div className="d-flex flex-row mt-3">
              <button
                type="button"
                onClick={handleSaveService}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Save
              </button>
              <button
                type="button"
                // onClick={handleSaveService}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Cancel
              </button>
            </div>
          )}

        </div>

        <div className="mt-4">
          <MaterialReactTable table={table} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Services;
