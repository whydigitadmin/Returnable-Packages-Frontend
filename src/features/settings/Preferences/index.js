import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import Alias from "./alias";
import AccessRigths from "./AccessRights";
import TransactionSeries from "./TransactionSeries";
import SerialSettings from "./SerialSettings";

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

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

function Preferences() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab className="text-form" label="Alias" {...a11yProps(0)} />
              <Tab
                className="text-form"
                label="Transaction Series"
                {...a11yProps(1)}
              />
              <Tab
                className="text-form"
                label="Serial Settings"
                {...a11yProps(2)}
              />
              <Tab
                className="text-form"
                label="Access Rights"
                {...a11yProps(3)}
              />
              <Tab className="text-form" label="Page size" {...a11yProps(4)} />
              <Tab
                className="text-form"
                label="Theme Configuration"
                {...a11yProps(5)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Alias />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TransactionSeries />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <SerialSettings />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <AccessRigths />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <div>
              <h5 className="my-3">Page Size</h5>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  10 items
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  20 items
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  30 items
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  50 items
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  100 items
                </label>
              </div>
              <button
                type="button"
                className="bg-blue mt-3 me-5 inline-block rounded bg-primary h-fit px-6 pb-1 pt-1 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Submit
              </button>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <div className="d-flex flex-row mb-2">
              <h5 className="my-3">Font Size:</h5>
              <div className="w-36 mx-3">
                <Slider
                  style={{ color: "#20A8D8" }}
                  valueLabelDisplay="auto"
                  slots={{
                    valueLabel: ValueLabelComponent,
                  }}
                  aria-label="custom thumb label"
                  defaultValue={14}
                />
              </div>
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                type={"text"}
                // value={value}
                placeholder={"Enter"}
                defaultValue={14}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="d-flex flex-row mb-2">
              <h5 className="my-3">Border Radius:</h5>
              <div className="w-36 mx-3">
                <Slider
                  style={{ color: "#20A8D8" }}
                  valueLabelDisplay="auto"
                  slots={{
                    valueLabel: ValueLabelComponent,
                  }}
                  aria-label="custom thumb label"
                  defaultValue={6}
                />
              </div>
              <input
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                type={"text"}
                // value={value}
                placeholder={"Enter"}
                defaultValue={6}
                // onChange={(e) => updateInputValue(e.target.value)}
                className="input mb-2 p-2 input-bordered"
              />
            </div>
            <div className="d-flex flex-row mb-2">
              <h5 className="my-3">Border Color:</h5>
              <input
                type="color"
                className="form-control form-control-color mt-2 ms-3"
                id="exampleColorInput"
                value="#20A8D8"
                title="Choose your color"
              />
            </div>
            <button
              type="button"
              className="bg-blue mt-3 me-5 inline-block rounded bg-primary h-fit px-6 pb-1 pt-1 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Apply
            </button>
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}

export default Preferences;
