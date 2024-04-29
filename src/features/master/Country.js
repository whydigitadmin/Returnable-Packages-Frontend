import { Box } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";

//import DashBoardComponent from "./DashBoardComponent";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Country = () => {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = useState([]);
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [errors, setErrors] = useState({});
  const [openView, setOpenView] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  //   const [edit, setEdit] = React.useState(false);

  const handleViewClose = () => {
    setOpenView(false);
  };

  //   const handleViewRow = (row) => {
  //     setSelectedRowData(row.original);
  //     console.log("setSelectedRowData", row.original);
  //   };

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.id);
    setCountry(row.original.country);
    setCode(row.original.countryCode);
    console.log("Selected row id:", row.original.id);
  };

  useEffect(() => {
    getCountryData();
  }, []);

  const getCountryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/country`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.countryVO);
        setTableData(response.data.paramObjectsMap.countryVO);
        //console.log(response.data.paramObjectsMap.countryVO)
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
      case "country":
        setCountry(value);
        break;

      case "code":
        setCode(value);
        break;
    }
  };

  const handleCountry = () => {
    console.log("test");
    const errors = {};
    if (!country) {
      errors.country = "Country Name is required";
    }
    if (!code) {
      errors.code = "Code is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        country: country,
        countryCode: code,
        orgId,
        createdBy: userDetail.firstName,
        modifiedBy: userDetail.firstName,
        active: true,
        cancel: false,
      };
      console.log("test1", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/country`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);

          getCountryData();
          setCountry("");
          setCode("");
          setErrors("");
          toast.success("Country Created successfully", {
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };


  // SAVE COUNTRY WITH DESKTOP NOTIFICATION
  // const handleCountry = () => {
  //   console.log("test");
  //   const errors = {};
  //   if (!country) {
  //     errors.country = "Country Name is required";
  //   }
  //   if (!code) {
  //     errors.code = "Code is required";
  //   }
  //   if (Object.keys(errors).length === 0) {
  //     const formData = {
  //       country: country,
  //       countryCode: code,
  //       orgId,
  //       createdBy: userDetail.firstName,
  //       modifiedBy: userDetail.firstName,
  //       active: true,
  //       cancel: false,
  //     };
  //     console.log("test1", formData);
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/api/basicMaster/country`,
  //         formData
  //       )
  //       .then((response) => {
  //         console.log("Response:", response.data);

  //         getCountryData();
  //         setCountry("");
  //         setCode("");
  //         setErrors("");

  //         // Display desktop notification if supported and permission granted
  //         if ("Notification" in window && Notification.permission === "granted") {
  //           new Notification("Country Created successfully");
  //         } else if ("Notification" in window && Notification.permission !== "denied") {
  //           Notification.requestPermission().then((permission) => {
  //             if (permission === "granted") {
  //               new Notification("Country Created successfully");
  //             }
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   } else {
  //     // If there are errors, update the state to display them
  //     setErrors(errors);
  //   }
  // };








  const handleUpdateCountry = () => {
    console.log("test");
    const errors = {};
    if (!country) {
      errors.country = "Country Name is required";
    }
    if (!code) {
      errors.code = "Code is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        country: country,
        countryCode: code,
        orgId,
        createdBy: userDetail.firstName,
        modifiedBy: userDetail.firstName,
        active: true,
        cancel: false,
        id: selectedRowId,
      };
      console.log("test1", formData);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/country`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);

          getCountryData();
          setCountry("");
          setCode("");
          setErrors("");
          toast.success("Country Updated successfully", {
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Country Updated Failed");
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
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
            {/* <IconButton onClick={() => handleViewRow(row)}>
                <VisibilityIcon />
              </IconButton> */}
            <IconButton onClick={() => handleEditRow(row)}>
              <EditIcon />
            </IconButton>
          </div>
        ),
      },
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
        accessorKey: "country",
        header: "Country",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "countryCode",
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

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      {/* <h1 className="text-xl font-semibold mb-4 ms-4">Unit Details</h1> */}
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        {/* <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div> */}

        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Country
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              value={country}
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z\s]/g, "");
              }}
              name="country"
              // placeholder={"Enter"}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.country && (
              <div className="error-text">{errors.country}</div>
            )}
          </div>

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
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              // placeholder={"Enter"}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.code && <div className="error-text">{errors.code}</div>}
          </div>
          {selectedRowId ? (
            <div className="d-flex flex-row mt-3">
              <button
                type="button"
                onClick={handleUpdateCountry}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="d-flex flex-row mt-3">
              <button
                type="button"
                onClick={handleCountry}
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Save
              </button>
              <button
                type="button"
                //onClick={handleCloseWarehouse}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Cancel
              </button>
            </div>
          )}
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
