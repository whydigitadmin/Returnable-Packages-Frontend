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
import EditIcon from "@mui/icons-material/Edit";
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
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewPartStudy from "./NewPartStudy";
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
  const [editPartStudy, setEditPartStudy] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [tableData, setTableData] = useState([]);
  const [basicData, setBasicData] = useState(null);
  const [packagingData, setPackagingData] = useState(null);
  const [logisticsData, setLogisticsData] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState("");

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
    setEditPartStudy(false);
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
            <IconButton onClick={() => handleViewRow(row)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => handleEditRow(row)}>
              <EditIcon />
            </IconButton>
          </div>
        ),
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
    setBasicData(row.original);
    setPackagingData(row.original.packingDetailVO);
    setLogisticsData(row.original.logisticsVO);
    setStockData(row.original.stockDetailVO);
    setOpen(true);
  };

  const handleEditRow = (row) => {
    setSelectedRowId(row.original.refPsId);
    setEditPartStudy(true);
    console.log("THE SELECTED ROW ID IS:", row.original.refPsId);
  };

  return (
    <>
      {/* {(add && <NewPartStudy />) !!
      (editPartStudy && (<NewPartStudy />)) !! ( */}
      {(add && <NewPartStudy addPS={handleBack} />) ||
        (editPartStudy && (
          <NewPartStudy addPS={handleBack} editPSId={selectedRowId} />
        )) || (
          <>
            <div className="card w-full p-6 bg-base-100 shadow-xl">
              <div className="d-flex justify-content-end mb-2">
                <button
                  className="btn btn-ghost btn-lg text-sm col-xs-1"
                  style={{ color: "blue" }}
                  onClick={handleAddOpen}
                >
                  <img
                    src="/new.png"
                    alt="new-icon"
                    title="new"
                    style={{
                      width: 30,
                      height: 30,
                      margin: "auto",
                      hover: "pointer",
                    }}
                  />
                  <span
                    className="text-form text-base"
                    style={{ marginLeft: "10px" }}
                  >
                    Part Study
                  </span>
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
          {basicData && (
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-sm font-semibold"
              >
                BASIC DETAILS
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Part Study Id</TableCell>
                        <TableCell>{basicData.refPsId}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Part Study Date</TableCell>
                        <TableCell>{basicData.partStudyDate}</TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell>Emitter ID</TableCell>
                        <TableCell>{basicData.emitterId}</TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell>Part Name</TableCell>
                        <TableCell>{basicData.partName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Part No</TableCell>
                        <TableCell>{basicData.partNumber}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weight</TableCell>
                        <TableCell>{basicData.weight}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Part Volume</TableCell>
                        <TableCell>{basicData.partVolume}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Highest Volume</TableCell>
                        <TableCell>{basicData.highestVolume}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Lowest Volume</TableCell>
                        <TableCell>{basicData.lowestVolume}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          )}
          {packagingData && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-sm font-semibold"
              >
                PACKING DESIGN
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Length</TableCell>
                        <TableCell>{packagingData.length}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Breath</TableCell>
                        <TableCell>{packagingData.breath}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Height</TableCell>
                        <TableCell>{packagingData.height}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Existing Part</TableCell>
                        <TableCell>{packagingData.existingPart}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Part Sensitive</TableCell>
                        <TableCell>{packagingData.partSensitive}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Part Greasy</TableCell>
                        <TableCell>{packagingData.partGreasy}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Part Orientation</TableCell>
                        <TableCell>{packagingData.partOrientation}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Multiple Part In Single Unit</TableCell>
                        <TableCell>
                          {packagingData.multiPartInSingleUnit}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Stacking</TableCell>
                        <TableCell>{packagingData.stacking}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Nesting</TableCell>
                        <TableCell>{packagingData.nesting}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Remarks</TableCell>
                        <TableCell>{packagingData.remarks}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          )}
          {logisticsData && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-sm font-semibold"
              >
                LOGISTICS DETAILS
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Avg Lot Size</TableCell>
                        <TableCell>{logisticsData.avgLotSize}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dispatch Frequency</TableCell>
                        <TableCell>{logisticsData.dispatchFrequency}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dispatch To</TableCell>
                        <TableCell>{logisticsData.diapatchTo}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          )}
          {stockData && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-sm font-semibold"
              >
                STOCK KEEPING DAYS
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Emitter Store Days</TableCell>
                        <TableCell>{stockData.emitterStoreDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Emitter Line Days</TableCell>
                        <TableCell>{stockData.emitterLineDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>In Transit Days</TableCell>
                        <TableCell>{stockData.inTransitDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Receiver Line Storage Days</TableCell>
                        <TableCell>
                          {stockData.receiverLineStorageDays}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Receiver Manufacturing Line Days</TableCell>
                        <TableCell>
                          {stockData.receiverManufacturingLineDays}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Other Storage Days</TableCell>
                        <TableCell>{stockData.otherStorageDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Reverse Logistics Day</TableCell>
                        <TableCell>{stockData.reverseLogisticsDay}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Cycle Time</TableCell>
                        <TableCell>{stockData.totalCycleTime}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
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
