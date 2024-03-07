import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { TbListDetails } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { LuWarehouse } from "react-icons/lu";
import { TbWeight } from "react-icons/tb";
import AddPartStudy from "./AddPartStudy";
import PackageDesign from "./PackageDesign";
import Logistics from "./Logistics";
import StockDetails from "./StockDetails";
import AddPackage from "./AddPackage";
import AddLogistics from "./AddLogistics";
import AddStockKeeping from "./AddStockKeeping";
import NewPartStudy from "./NewPartStudy";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

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

function Partstudy() {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [tableData, setTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null); // State to store selected row data

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
    getAllBasicDetail();
  };

  useEffect(() => {
    getAllBasicDetail();
  }, []);

  const getAllBasicDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/basicDetails`
      );

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.basicDetailVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
          <IconButton onClick={() => handleViewRow(row)}>
            <VisibilityIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "refPsId",
        header: "Part Study Id",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "partStudyDate",
        header: "Part Study Date",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "emitterId",
        header: "Emitter ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "partName",
        header: "Part Name",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "partNumber",
        header: "Part No",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "weight",
        header: "Weight",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "partVolume",
        header: "Part Volume",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "highestVolume",
        header: "Highest Volume",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "lowestVolume",
        header: "Lowest Volume",
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

  const handleNext = () => {
    if (value < 4) {
      setValue(value + 1);
    }
  };

  const handlePrev = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleViewRow = (row) => {
    setSelectedRowData(row.original);
    setOpen(true);
  };

  return (
    <>
      {add ? (
        <NewPartStudy />
      ) : (
        <>
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            <div className="d-flex justify-content-end mb-2">
              <button
                className="btn btn-ghost btn-lg text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleAddOpen}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">Part Study</span>
              </button>
            </div>
            <MaterialReactTable table={table} />
          </div>
        </>
      )}

      {/* Modal to display selected row data */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle style={{ borderBottom: "1px solid #ccc" }}>
          <div className="row">
            <div className="col-md-11">
              <Typography variant="h6">Part Study Details</Typography>
            </div>
            <div className="col-md-1">
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="mt-4">
          {selectedRowData && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Part Study Id</TableCell>
                    <TableCell>{selectedRowData.refPsId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Part Study Date</TableCell>
                    <TableCell>{selectedRowData.partStudyDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emitter ID</TableCell>
                    <TableCell>{selectedRowData.emitterId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Part Name</TableCell>
                    <TableCell>{selectedRowData.partName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Part No</TableCell>
                    <TableCell>{selectedRowData.partNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weight</TableCell>
                    <TableCell>{selectedRowData.weight}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Part Volume</TableCell>
                    <TableCell>{selectedRowData.partVolume}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Highest Volume</TableCell>
                    <TableCell>{selectedRowData.highestVolume}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lowest Volume</TableCell>
                    <TableCell>{selectedRowData.lowestVolume}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Partstudy;

// import React, { useMemo, useState, useEffect } from "react";
// import { IconButton, Tooltip, Box } from "@mui/material";
// import { Delete, Archive, QrCode2 } from "@mui/icons-material";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";
// import axios from "axios";
// import { FaBoxOpen, FaCloudUploadAlt } from "react-icons/fa";
// import { LuWarehouse } from "react-icons/lu";
// import { TbWeight } from "react-icons/tb";
// import EditIcon from "@mui/icons-material/Edit";

// const statsData = [
//   {
//     title: "No of warehouse",
//     value: "0",
//     icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
//     description: "",
//   },
//   {
//     title: "Active warehouse",
//     value: "0",
//     icon: <LuWarehouse className="w-7 h-7 text-white dashicon" />,
//     description: "",
//   },
//   {
//     title: "Low stock warehouses",
//     value: "0",
//     icon: <TbWeight className="w-7 h-7 text-white dashicon" />,
//     description: "",
//   },
//   {
//     title: "Average Transaction",
//     value: "0",
//     icon: <FaBoxOpen className="w-7 h-7 text-white dashicon" />,
//     description: "",
//   },
// ];

// const Partstudy = () => {
//   const [tableData, setTableData] = useState([]);
//   const [data, setData] = React.useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [add, setAdd] = React.useState(false);
//   // const [data, setData] = React.useState([]);
//   const [value, setValue] = React.useState(0);

//   useEffect(() => {
//     getAllBasicDetail();
//   }, []);

//   // Define columns for the table
//   const columns = useMemo(() => [
//     {
//       accessorKey: "partStudyId",
//       header: "Part Study Id",
//       enableColumnOrdering: false,
//       enableEditing: true,
//       enableSorting: false,
//       size: 80,
//     },
//     { accessorKey: "partStudyDate", header: "Part Study Date", size: 140 },
//     {
//       accessorKey: "emitterId",
//       header: "Emitter ID",
//       size: 140,
//     },
//     { accessorKey: "receiverId", header: "Receiver ID", size: 80 },
//     { accessorKey: "partName", header: "Part Name", size: 80 },
//     { accessorKey: "weight", header: "Weight", size: 80 },
//     { accessorKey: "weightUnit", header: "Weight Unit", size: 80 },
//     { accessorKey: "partVolume", header: "Part Volume", size: 80 },
//     { accessorKey: "highestVolume", header: "Highest Volume", size: 80 },
//     { accessorKey: "lowestVolume", header: "Lowest Volume", size: 80 },
//   ]);

//   const getAllBasicDetail = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/api/partStudy/basicDetails`
//       );

//       if (response.status === 200) {
//         setTableData(response.data.paramObjectsMap.basicDetailVO);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const table = useMaterialReactTable({
//     data,
//     columns,
//   });

//   // Function to handle saving row edits
//   const handleSaveRowEdits = ({ exitEditingMode, row, values }) => {
//     tableData[row.index] = values;
//     setTableData([...tableData]);
//     exitEditingMode();
//   };

//   // Function to handle cancelling row edits
//   const handleCancelRowEdits = () => {
//     // Any cleanup needed when cancelling row edits
//   };

//   // Function to handle deleting a row
//   const handleDeleteRow = (row) => {
//     tableData.splice(row.index, 1);
//     setTableData([...tableData]);
//   };

//   // Function to handle accepting a row
//   const handleAcceptRow = (row) => {
//     // Any action needed when accepting a row
//   };

//   // Render actions for each row
//   const renderRowActions = ({ row }) => (
//     <Box sx={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
//       {/* <Tooltip arrow placement="left" title="Delete">
//         <IconButton color="error" onClick={() => handleDeleteRow(row)}>
//           <Delete />
//         </IconButton>
//       </Tooltip>
//       <Tooltip arrow placement="bottom" title="Print QR Code">
//         <IconButton>
//           <QrCode2 />
//         </IconButton>
//       </Tooltip> */}
//       <Tooltip arrow placement="right" title="Accept">
//         <IconButton onClick={() => handleSaveRowEdits(row)}>
//           <EditIcon />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );

//   return (
//     <MaterialReactTable
//       columns={columns}
//       data={tableData}
//       enableEditing
//       editingMode="modal"
//       enableColumnOrdering
//       onEditingRowSave={handleSaveRowEdits}
//       onEditingRowCancel={handleCancelRowEdits}
//       renderRowActions={renderRowActions}
//     />
//   );
// };

// export default Partstudy;
