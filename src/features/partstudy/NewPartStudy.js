import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { FiTruck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { LuPackageOpen } from "react-icons/lu";
import { TbBuildingWarehouse, TbListDetails } from "react-icons/tb";
import AddLogistics from "./AddLogistics";
import AddPackage from "./AddPackage";
import AddPartStudy from "./AddPartStudy";
import AddStockKeeping from "./AddStockKeeping";
import SelectPartStudy from "./SelectPartStudy";

import { keyframes } from "styled-components";
function NewPartStudy({ addPS, editPSId }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [add, setAdd] = React.useState(false);
  const [ps, setPs] = React.useState(true);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [refPsId, setRefPsId] = useState(null);
  const [emitter, setEmitter] = useState(null);
  const [emitterName, setEmitterName] = useState("");
  const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

  // Ensure unique names for styled components
  const StyledToggleContainer = styled(Box)`
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  `;

  const StyledToggleButton = styled(Box)`
    padding: 8px 16px;
    margin: 4px;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? "#1976d2" : "#e0e0e0")};
    color: ${(props) => (props.selected ? "#ffffff" : "#000000")};
    animation: ${fadeIn} 0.3s ease-out;
    transition: background-color 0.3s, color 0.3s, transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  `;

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
    {
      editPSId && handlePs();
    }
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
    if (value < (ps ? 3 : 4)) {
      setValue(value + 1);
    }
  };

  const handlePrev = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  const handlePs = () => {
    setPs(!ps);
    setValue(0);
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

  const handlePartStudyClose = () => {
    addPS(false);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handlePartStudyClose}
            className="cursor-pointer w-8 h-8"
          />
        </div>
        {/* <div className="border rounded w-50 mb-3"> */}
        <div className="d-flex justify-content-center mb-2">
          <StyledToggleContainer>
            <StyledToggleButton
              selected={ps}
              onClick={() => handlePs({ target: { value: true } })}
            >
              <Typography>New Part Study</Typography>
            </StyledToggleButton>{" "}
            &nbsp;
            <StyledToggleButton
              selected={!ps}
              onClick={() => handlePs({ target: { value: false } })}
            >
              <Typography>Incomplete Part Study</Typography>
            </StyledToggleButton>
          </StyledToggleContainer>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          {ps ? (
            <Tabs
              value={value}
              // onChange={handleChange}
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
          ) : (
            <Tabs
              value={value}
              // onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                label="PART STUDY"
                icon={<TbListDetails className="w-16 h-6" />}
                {...a11yProps(0)}
              />
              <Tab
                label="BASIC DETAILS"
                icon={<TbListDetails className="w-16 h-6" />}
                {...a11yProps(1)}
              />
              <Tab
                label="PACKAGING DESIGN"
                icon={<LuPackageOpen className="w-16 h-6" />}
                {...a11yProps(2)}
              />
              <Tab
                label="LOGISTICS DETAILS"
                icon={<FiTruck className="w-16 h-6" />}
                {...a11yProps(3)}
              />
              <Tab
                label="STOCK KEEPING DAYS"
                icon={<TbBuildingWarehouse className="w-16 h-6" />}
                {...a11yProps(4)}
              />
            </Tabs>
          )}
        </Box>
        {ps ? (
          <>
            <CustomTabPanel value={value} index={0}>
              <AddPartStudy
                handleBack={handlePrev}
                handleNext={handleNext}
                setRefPsId={setRefPsId}
                setEmitter={setEmitter}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AddPackage
                handleBack={handlePrev}
                handleNext={handleNext}
                refPsId={refPsId}
                emitter={emitter}
                setEmitterName={setEmitterName}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <AddLogistics
                handleBack={handlePrev}
                handleNext={handleNext}
                refPsId={refPsId}
                emitter={emitter}
                emitterName={emitterName}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <AddStockKeeping
                handleBack={handlePrev}
                handleNext={handleNext}
                refPsId={refPsId}
                emitter={emitter}
                emitterName={emitterName}
              />
            </CustomTabPanel>
          </>
        ) : (
          <>
            <CustomTabPanel value={value} index={0}>
              <SelectPartStudy
                handleBack={handlePrev}
                handleNext={handleNext}
                setRefPsId={setRefPsId}
                setEmitter={setEmitter}
                editPSId={editPSId}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AddPartStudy
                handleBack={handlePrev}
                handleNext={handleNext}
                refPsId={refPsId}
                emitter={emitter}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <AddPackage
                handleBack={handlePrev}
                handleNext={handleNext}
                emitter={emitter}
                refPsId={refPsId}
                setEmitterName={setEmitterName}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <AddLogistics
                handleBack={handlePrev}
                handleNext={handleNext}
                emitter={emitter}
                refPsId={refPsId}
                emitterName={emitterName}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <AddStockKeeping
                handleBack={handlePrev}
                handleNext={handleNext}
                emitter={emitter}
                refPsId={refPsId}
                emitterName={emitterName}
              />
            </CustomTabPanel>
          </>
        )}
      </div>
    </>
  );
}

export default NewPartStudy;
