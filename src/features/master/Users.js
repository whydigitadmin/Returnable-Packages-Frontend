import React, { useEffect, useMemo } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AddUsers from "./AddUsers";
const columns = [
  { field: "id", headerName: "Sr. No", width: 90 },
  { field: "EmployeeID", headerName: "Employee ID", width: 160 },
  { field: "Name", headerName: "Name", width: 120 },
  { field: "Email", headerName: "Email", width: 180 },
  { field: "Phone", headerName: "Phone", width: 120 },
  { field: "Role", headerName: "Role", width: 120 },
  { field: "Action", headerName: "Action", width: 120 },
];

const data = [
  {
    id: 1,
    EmployeeID: "EMP001",
    Name: "John",
    Email: "John@gmail.com",
    Phone: "9087654321",
    Role: "Developer",
    Action: "Yes",
  },
];

function Users() {
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
    getAllUsersData();
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "userdetails_id",
        header: "Sr No",
        size: 50,
        muiTableHeadCellProps: {
          align: "first",
        },
        muiTableBodyCellProps: {
          align: "first",
        },
      },
      {
        accessorKey: "employee_type",
        header: "Employee Type",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "emploee_id",
        header: "Employee ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "employee_name",
        header: "Employee Name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "email_id",
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
        accessorKey: "conatct_no",
        header: "Phone",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "Active",
        header: "active",
        size: 50,
        muiTableHeadCellProps: {
          align: "end",
        },
        muiTableBodyCellProps: {
          align: "end",
        },
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    data,
    columns,
  });

  useEffect(() => {
    getAllUsersData();
  }, []);

  const getAllUsersData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/usersdetails/view`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.UsersDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {add ? (
        <AddUsers addusers={handleBack} />
      ) : (
        <div className="card w-full p-6 bg-base-100 shadow-xl">
          <h1 className="text-2xl font-semibold mt-4">Users</h1>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleAddOpen}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Add Users
            </button>
          </div>
          <div className="mt-4">
            <MaterialReactTable table={table} />
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
