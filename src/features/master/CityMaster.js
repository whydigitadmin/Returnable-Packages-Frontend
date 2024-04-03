import { Box } from "@mui/material";

import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
//import DashBoardComponent from "./DashBoardComponent";
import axios from "axios";

export const CityMaster = () => {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = useState([]);
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCityData();
  }, []);

  const getCityData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/city`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.cityVO);
        setTableData(response.data.paramObjectsMap.cityVO);
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
      case "city":
        setCity(value);
        break;

      case "code":
        setCode(value);
        break;
    }
  };

  const handleCity = () => {
    console.log("test");
    const errors = {};
    if (!city) {
      errors.city = "City Name is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        cityName: city,
        cityCode: code,
        orgId,
        createdBy: userDetail.firstName,
        modifiedBy: userDetail.firstName,
        active: true,
        cancel: false,
        country: "India",
        state: "Tamilnadu",
      };
      console.log("test1", formData);
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/basicMaster/city`, formData)
        .then((response) => {
          console.log("Response:", response.data);
          getCityData();
          setCity("");
          setCode("");
          setErrors("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "cityid",
        header: "ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "cityName",
        header: "City",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "cityCode",
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
                CityName
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              value={city}
              name="city"
              // placeholder={"Enter"}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.city && <div className="error-text">{errors.city}</div>}
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
              // placeholder={"Enter"}
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
            {errors.code && <div className="error-text">{errors.code}</div>}
          </div>
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleCity}
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
