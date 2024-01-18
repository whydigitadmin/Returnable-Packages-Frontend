import React, { useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { TbListDetails } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { TbBuildingWarehouse } from "react-icons/tb";

function EmitterTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  return (
    <>
      <div className="card bg-base-100 shadow-xl mb-4">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              label="NEW REQUEST"
              icon={<TbListDetails className="w-16 h-6" />}
              {...a11yProps(0)}
            />
            <Tab
              label="NEW ISSUE"
              icon={<LuPackageOpen className="w-16 h-6" />}
              {...a11yProps(1)}
            />
            <Tab
              label="CONFIRM / RETURN REQUEST"
              icon={<FiTruck className="w-16 h-6" />}
              {...a11yProps(2)}
            />
            <Tab
              label="TRANSFER OUT"
              icon={<TbBuildingWarehouse className="w-16 h-6" />}
              {...a11yProps(3)}
            />
            <Tab
              label="UPDATES @ TRANSFER OUT"
              icon={<TbBuildingWarehouse className="w-16 h-6" />}
              {...a11yProps(4)}
            />
            <Tab
              label="DEHIRE @ OEM"
              icon={<TbBuildingWarehouse className="w-16 h-6" />}
              {...a11yProps(5)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="row">
            <div className="col-lg-3 card bg-base-100 shadow-xl mb-4 pe-2">
              <div className="">
                <h4 className="text-2xl font-semibold mt-4 mb-3">Site</h4>
                <p className="ms-2 mb-3">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
        <CustomTabPanel value={value} index={2}></CustomTabPanel>
        <CustomTabPanel value={value} index={3}></CustomTabPanel>
        <CustomTabPanel value={value} index={4}></CustomTabPanel>
        <CustomTabPanel value={value} index={5}></CustomTabPanel>
      </div>
    </>
  );
}
export default EmitterTab;
