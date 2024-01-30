import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import AddManufacturer from "./AddManufacturer";

function ManufacturerDetails() {
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
  };

  useEffect(() => {
    getWareManufacture();
  }, []);

  const getWareManufacture = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/manufacturer?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.manufacturerVO);
        setTableData(response.data.paramObjectsMap.manufacturerVO);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "SNo",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "company",
        header: "Company",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
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
        accessorKey: "address",
        header: "Address",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Email",
        header: "Email",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "contactPerson",
        header: "Contact Person",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "PhNo",
        header: "Phone No",
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
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <>
      {add ? (
        <AddManufacturer addManufacturer={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <div className="">
            <div className="flex justify-end">
              <button
                className="btn btn-ghost btn-lg text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleAddOpen}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Manufacture</span>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <MaterialReactTable table={table} />
          </div>
        </div>
      )}
    </>
  );
}

export default ManufacturerDetails;
