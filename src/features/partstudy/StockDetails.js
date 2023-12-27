import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import AddStockKeeping from "./AddStockKeeping";

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

function StockDetails() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  const handleBack = () => {
    setAdd(false);
    // getWarehouseData();
  };

  // useEffect(() => {
  //   getWarehouseData();
  // }, []);

  // const getWarehouseData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/warehouse/view`
  //     );

  //     if (response.status === 200) {
  //       setData(response.data.paramObjectsMap.WarehouseVO);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

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
        accessorKey: "sno",
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
        accessorKey: "emitterStoreDays",
        header: "Emitter Store Days",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "emitterLineDays",
        header: "Emitter Line Days",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "inTransitDays",
        header: "InTransit Days",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "endUserLineStorageDays",
        header: "EndUser Line Storage Days",
        size: 250,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "endUserManufLineDays",
        header: "EndUser Manufacture LineDays",
        size: 300,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "otherStorageDays",
        header: "Other Storage Days",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "totCycleTime",
        header: "Total CycleTime",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "ePakRevDay",
        header: "Empty Packaging Reverse LogisticsDays",
        size: 300,
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
        <AddStockKeeping addStockKeeping={handleBack} />
      ) : (
        <>
          {/* <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div> */}
          <div className="">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleClickOpen}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={handleAddOpen}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add Stock Details
              </button>
            </div>
          </div>
          <div className="mt-4">
            <MaterialReactTable table={table} />
          </div>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
          >
            <div className="d-flex justify-content-between">
              <DialogTitle>Upload File</DialogTitle>
              <IoMdClose
                onClick={handleClose}
                className="cursor-pointer w-8 h-8 mt-3 me-3"
              />
            </div>
            <DialogContent>
              <DialogContentText className="d-flex flex-column">
                Choose a file to upload
                <div className="d-flex justify-content-center my-3">
                  <div className="col-4 ms-5">
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<FaCloudUploadAlt />}
                    >
                      Upload file
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </div>
                </div>
                <div className="col-6 my-3">
                  <Button
                    size="small"
                    component="label"
                    className="text-form"
                    variant="contained"
                    startIcon={<FiDownload />}
                  >
                    Download Sample File
                  </Button>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions className="mb-2 me-2">
              <Button onClick={handleClose}>Cancel</Button>
              <Button component="label" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

export default StockDetails;
