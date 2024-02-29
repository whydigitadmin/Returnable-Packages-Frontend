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
import AddPackage from "./AddPackage";
import AddLogistics from "./AddLogistics";
import AddStockKeeping from "./AddStockKeeping";

function NewPartStudy() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [add, setAdd] = React.useState(false);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOpen = () => {
    setAdd(true);
  };

  useEffect(() => {
    // getStockDetails();
  }, []);

  const handleBack = () => {
    setAdd(false);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setAdd(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
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
        accessorKey: "endUserManufacturingLineDays",
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
        accessorKey: "totalCycleTime",
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
        accessorKey: "emptyPackagingReverseDays",
        header: "Empty Packaging Reverse LogisticsDays",
        size: 300,
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

  //   const table = useMaterialReactTable({
  //     data,
  //     columns,
  //   });

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
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
        <CustomTabPanel value={value} index={0}>
          <AddPartStudy handleBack={handlePrev} handleNext={handleNext} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AddPackage handleBack={handlePrev} handleNext={handleNext} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AddLogistics handleBack={handlePrev} handleNext={handleNext} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <AddStockKeeping handleBack={handlePrev} handleNext={handleNext} />
        </CustomTabPanel>
      </div>
    </>
  );
}

export default NewPartStudy;
