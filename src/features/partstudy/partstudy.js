import React, { useMemo, useEffect } from "react";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAdd(false);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
        accessorKey: "id",
        header: "ID",
        size: 50,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "partStudyId",
        header: "Part Study Id",
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
        accessorKey: "receiverId",
        header: "Receiver ID",
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
        accessorKey: "weightUnit",
        header: "Weight Unit",
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

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        {/* <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
            {statsData.map((d, k) => {
              return <DashBoardComponent key={k} {...d} colorIndex={k} />;
            })}
          </div> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              label="BASIC DETAILS"
              icon={<TbListDetails className="w-16 h-6" />}
              {...a11yProps(0)}
            />
            <Tab
              label="PACKAGING DESIGN"
              icon={<LuPackageOpen className="w-16 h-6" />}
              {...a11yProps(1)}
            />
            <Tab
              label="LOGISTICS DETAILS"
              icon={<FiTruck className="w-16 h-6" />}
              {...a11yProps(2)}
            />
            <Tab
              label="STOCK KEEPING DAYS"
              icon={<TbBuildingWarehouse className="w-16 h-6" />}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={1}>
          <PackageDesign />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Logistics />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <StockDetails />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={0}>
          {add ? (
            <AddPartStudy addPartStudy={handleBack} />
          ) : (
            <>
              <div className="">
                <div className="flex justify-between">
                  <button
                    className="btn btn-ghost btn-lg text-sm col-xs-1 p-0 pe-2"
                    style={{ color: "blue" }}
                    onClick={handleClickOpen}
                  >
                    <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                    <span className="text-form text-base">Upload</span>
                  </button>
                  <button
                    className="btn btn-ghost btn-lg text-sm col-xs-1 p-0 pe-2"
                    style={{ color: "blue" }}
                    onClick={handleAddOpen}
                  >
                    <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                    <span className="text-form text-base">Part Study</span>
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
                    <div className="d-flex justify-content-center">
                      <div className="col-lg-4 text-center my-3">
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
                    <div className="col-lg-4 mt-3">
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
        </CustomTabPanel>
      </div>
    </>
  );
}

export default Partstudy;
