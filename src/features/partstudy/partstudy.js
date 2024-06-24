import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { FiDownload } from "react-icons/fi";
import logo from "../../assets/AI_Packs.png";
import NewPartStudy from "./NewPartStudy";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import { FaBoxes, FaTruck } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
import { MdMapsHomeWork } from "react-icons/md";
import DashBoardComponent from "../master/DashBoardComponent";

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

  const [statsData, setStatsData] = useState([
    {
      title: "Total Count",
      value: "0",
      icon: <MdMapsHomeWork className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      title: "Active",
      value: "0",
      icon: <FaTruck className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },

    {
      // title: "Cycle Time",
      title: "Completed",
      value: "0",
      icon: <LuTimerReset className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
    {
      // title: "Unique Item/Item group",
      title: "InComplete",
      value: "0",
      icon: <FaBoxes className="w-5 h-5 text-white dashicon-sm" />,
      description: "",
    },
  ]);

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
        // Update the state with basicDetailVO data
        setData(response.data.paramObjectsMap.basicDetailVO);

        // Calculate the counts
        const totalFlowCount =
          response.data.paramObjectsMap.basicDetailVO.length;
        const activeFlowsCount =
          response.data.paramObjectsMap.basicDetailVO.filter(
            (item) => item.active === "Active"
          ).length;
        const completedFlowsCount =
          response.data.paramObjectsMap.basicDetailVO.filter(
            (item) => item.eflag === true
          ).length;

        const InCompleteCount = totalFlowCount - completedFlowsCount;

        // Update statsData with the new counts
        const updatedStatsData = statsData.map((item) => {
          if (item.title === "Total Count") {
            return {
              ...item,
              value: totalFlowCount.toString(),
            };
          }
          if (item.title === "Active") {
            return {
              ...item,
              value: activeFlowsCount.toString(),
            };
          }
          if (item.title === "Completed") {
            return {
              ...item,
              value: completedFlowsCount.toString(),
            };
          }
          if (item.title === "InComplete") {
            return {
              ...item,
              value: InCompleteCount.toString(),
            };
          }
          return item; // Return unchanged for other items
        });

        // Update the state with the new statsData
        setStatsData(updatedStatsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Correct path to your image
  const handleDownloadPDF = (row) => {
    const doc = new jsPDF();

    // Add your local image to the PDF
    const imgData = logo;
    const imgWidth = 30; // Adjust width as needed
    const imgHeight = 30; // Adjust height as needed
    const imgXPosition = 12; // Adjust x position as needed
    const imgYPosition = 10; // Adjust y position as needed
    doc.addImage(
      imgData,
      "PNG",
      imgXPosition,
      imgYPosition,
      imgWidth,
      imgHeight
    );

    // Add heading next to the logo
    const headingText = "Part Study Details";
    const headingXPosition = imgXPosition + imgWidth + 30; // Position next to the logo
    const headingYPosition = imgYPosition + imgHeight / 2 + 3; // Vertically center align with the image
    doc.setFontSize(20); // Set font size for heading
    doc.text(headingText, headingXPosition, headingYPosition);

    // Watermark content and style
    const watermarkContent = "Strictly Confidential";
    const watermarkFontSize = 40;
    const watermarkColor = "#CCCCCC"; // Light gray color

    const addWatermark = (doc, pageIndex) => {
      doc.setFontSize(watermarkFontSize);
      doc.setTextColor(watermarkColor);

      // Set opacity
      doc.setGState(new doc.GState({ opacity: 0.3 }));

      let x = doc.internal.pageSize.getWidth() / 2;
      let y = doc.internal.pageSize.getHeight() / 2;

      // Adjust position for the first page
      if (pageIndex === 1) {
        x += 20; // Move left
        y += 40; // Move down
      }

      doc.text(watermarkContent, x, y, { angle: 50, align: "center" });

      // Reset the opacity to default for subsequent content
      doc.setGState(new doc.GState({ opacity: 1 }));
    };

    // Adding content to the document
    doc.setFontSize(12);
    doc.text("Basic Details", 14, 45); // Adjust y position to account for the image and heading height

    const basicData = row.original;
    const packagingData = row.original.packingDetailVO;
    const logisticsData = row.original.logisticsVO;
    const stockData = row.original.stockDetailVO;

    doc.autoTable({
      startY: 50, // Adjust startY to account for the image and heading height
      head: [["Field", "Value"]],
      body: [
        ["Emitter", basicData.emitterDisplayName],
        ["Part Study Id", basicData.refPsId],
        ["Part Study Date", basicData.partStudyDate],
        ["Part Name", basicData.partName],
        ["Part No", basicData.partNumber],
        ["Weight", basicData.weight],
        ["Part Volume", basicData.partVolume],
        ["Highest Volume", basicData.highestVolume],
        ["Lowest Volume", basicData.lowestVolume],
        ["Active", basicData.active],
      ],
      margin: { top: 10 },
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
    });

    doc.text("Packaging Design", 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Field", "Value"]],
      body: [
        ["Length", packagingData.length],
        ["Breath", packagingData.breath],
        ["Height", packagingData.height],
        ["Existing Part", packagingData.existingPart],
        ["Part Sensitive", packagingData.partSensitive],
        ["Part Greasy", packagingData.partGreasy],
        ["Part Orientation", packagingData.partOrientation],
        ["Multiple Part In Single Unit", packagingData.multiPartInSingleUnit],
        ["Stacking", packagingData.stacking],
        ["Nesting", packagingData.nesting],
        ["Remarks", packagingData.remarks],
      ],
      margin: { top: 10 },
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
    });

    let finalY = doc.lastAutoTable.finalY + 20; // Calculate final Y position

    if (finalY + 20 > doc.internal.pageSize.height) {
      doc.addPage();
      finalY = 20; // Reset Y position for new page
    }

    doc.text("Logistics Details", 14, finalY);
    doc.autoTable({
      startY: finalY + 5,
      head: [["Field", "Value"]],
      body: [
        ["Avg Lot Size", logisticsData.avgLotSize],
        ["Dispatch Frequency", logisticsData.dispatchFrequency],
        ["Dispatch To", logisticsData.diapatchTo],
      ],
      margin: { top: 10 },
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
    });

    finalY = doc.lastAutoTable.finalY + 20; // Calculate final Y position

    if (finalY + 20 > doc.internal.pageSize.height) {
      doc.addPage();
      finalY = 20; // Reset Y position for new page
    }

    doc.text("Stock Keeping Days", 14, finalY);
    doc.autoTable({
      startY: finalY + 5,
      head: [["Field", "Value"]],
      body: [
        ["Emitter Store Days", stockData.emitterStoreDays],
        ["Emitter Line Days", stockData.emitterLineDays],
        ["In Transit Days", stockData.inTransitDays],
        ["Receiver Line Storage Days", stockData.receiverLineStorageDays],
        [
          "Receiver Manufacturing Line Days",
          stockData.receiverManufacturingLineDays,
        ],
        ["Other Storage Days", stockData.otherStorageDays],
        ["Reverse Logistics Day", stockData.reverseLogisticsDay],
        ["Total Cycle Time", stockData.totalCycleTime],
      ],
      margin: { top: 10 },
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
    });

    // Add watermark to each page
    for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
      doc.setPage(i);
      addWatermark(doc, i);
    }

    // Save the PDF with a specific filename
    doc.save(`${basicData.partName}_PartStudy.pdf`);
  };
  //   const doc = new jsPDF();
  //   doc.setFontSize(12); // Reduced font size

  //   // Add logo
  //   // const imgData =
  //   //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  //   // doc.addImage(imgData, "PNG", 10, 10, 50, 20); // Adjust the coordinates and size as needed

  //   doc.text("Part Study Basic Details", 14, 15);

  //   const basicData = row.original;
  //   const packagingData = row.original.packingDetailVO;
  //   const logisticsData = row.original.logisticsVO;
  //   const stockData = row.original.stockDetailVO;

  //   doc.autoTable({
  //     startY: 20,
  //     head: [["Field", "Value"]],
  //     body: [
  //       ["Part Study Id", basicData.refPsId],
  //       ["Part Study Date", basicData.partStudyDate],
  //       ["Part Name", basicData.partName],
  //       ["Part No", basicData.partNumber],
  //       ["Weight", basicData.weight],
  //       ["Part Volume", basicData.partVolume],
  //       ["Highest Volume", basicData.highestVolume],
  //       ["Lowest Volume", basicData.lowestVolume],
  //       ["Active", basicData.active],
  //     ],
  //     margin: { top: 10 },
  //     theme: "grid",
  //     styles: { fontSize: 10, cellPadding: 2 }, // Reduce font size and cell padding
  //   });

  //   doc.text("Packaging Design", 14, doc.lastAutoTable.finalY + 10);
  //   doc.autoTable({
  //     startY: doc.lastAutoTable.finalY + 15,
  //     head: [["Field", "Value"]],
  //     body: [
  //       ["Length", packagingData.length],
  //       ["Breath", packagingData.breath],
  //       ["Height", packagingData.height],
  //       ["Existing Part", packagingData.existingPart],
  //       ["Part Sensitive", packagingData.partSensitive],
  //       ["Part Greasy", packagingData.partGreasy],
  //       ["Part Orientation", packagingData.partOrientation],
  //       ["Multiple Part In Single Unit", packagingData.multiPartInSingleUnit],
  //       ["Stacking", packagingData.stacking],
  //       ["Nesting", packagingData.nesting],
  //       ["Remarks", packagingData.remarks],
  //     ],
  //     margin: { top: 10 },
  //     theme: "grid",
  //     styles: { fontSize: 10, cellPadding: 2 },
  //   });

  //   doc.text("Logistics Details", 14, doc.lastAutoTable.finalY + 10);
  //   doc.autoTable({
  //     startY: doc.lastAutoTable.finalY + 15,
  //     head: [["Field", "Value"]],
  //     body: [
  //       ["Avg Lot Size", logisticsData.avgLotSize],
  //       ["Dispatch Frequency", logisticsData.dispatchFrequency],
  //       ["Dispatch To", logisticsData.diapatchTo],
  //     ],
  //     margin: { top: 10 },
  //     theme: "grid",
  //     styles: { fontSize: 10, cellPadding: 2 },
  //   });

  //   doc.addPage(); // Add a new page for Stock Keeping Days

  //   doc.text("Stock Keeping Days", 14, 15);
  //   doc.autoTable({
  //     startY: 20,
  //     head: [["Field", "Value"]],
  //     body: [
  //       ["Emitter Store Days", stockData.emitterStoreDays],
  //       ["Emitter Line Days", stockData.emitterLineDays],
  //       ["In Transit Days", stockData.inTransitDays],
  //       ["Receiver Line Storage Days", stockData.receiverLineStorageDays],
  //       [
  //         "Receiver Manufacturing Line Days",
  //         stockData.receiverManufacturingLineDays,
  //       ],
  //       ["Other Storage Days", stockData.otherStorageDays],
  //       ["Reverse Logistics Day", stockData.reverseLogisticsDay],
  //       ["Total Cycle Time", stockData.totalCycleTime],
  //     ],
  //     margin: { top: 10 },
  //     theme: "grid",
  //     styles: { fontSize: 10, cellPadding: 2 },
  //   });

  //   doc.save(`${basicData.partName}_PartStudy.pdf`);
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        size: 120,
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => handleViewRow(row)}
              style={{ margin: "0 4px" }}
            >
              <VisibilityIcon />
            </IconButton>
            <Tooltip
              title={
                row.original.eflag
                  ? "Editing is disabled for this Part Study"
                  : ""
              }
              arrow
              disableHoverListener={!row.original.eflag}
            >
              <span>
                <IconButton
                  onClick={() => handleEditRow(row)}
                  disabled={row.original.eflag}
                  style={{ margin: "0 4px" }}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Pdf Download">
              <IconButton
                onClick={() => handleDownloadPDF(row)}
                style={{ margin: "0 4px" }}
              >
                <FiDownload />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },

      {
        accessorKey: "emitterDisplayName",
        header: "Emitter",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
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
      {(add && <NewPartStudy addPS={handleBack} />) ||
        (editPartStudy && (
          <NewPartStudy addPS={handleBack} editPSId={selectedRowId} />
        )) || (
          <>
            <div className="card w-full p-6 bg-base-100 shadow-xl">
              <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {statsData.map((d, k) => {
                  return <DashBoardComponent key={k} {...d} colorIndex={k} />;
                })}
              </div>
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
                      <TableRow>
                        <TableCell>Active</TableCell>
                        <TableCell>{basicData.active}</TableCell>
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
