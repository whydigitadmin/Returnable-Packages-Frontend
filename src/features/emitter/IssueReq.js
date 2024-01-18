import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { MdPallet } from "react-icons/md";
import { FaPallet } from "react-icons/fa6";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
function IssueReq() {
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
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-3 card bg-base-100 shadow-xl m-3">
              <div className="">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold ms-2 w-7 h-7"
                    style={{ marginTop: 30 }}
                  />
                  <h4 className="text-2xl font-semibold mt-4 pt-1 ms-1 mb-4">
                    Location
                  </h4>
                </div>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-3">
                  Gabriel
                </h4>
                <p className="ms-2 mb-3">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
            <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 100 }}
              />
            </div>
            <div className="col-lg-3 card bg-base-100 shadow-xl m-3">
              <div className="">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold ms-2 w-7 h-7"
                    style={{ marginTop: 30 }}
                  />
                  <h4 className="text-2xl font-semibold mt-4 pt-1 ms-1 mb-4">
                    Flow To
                  </h4>
                </div>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-2 mb-3">
                  Tata Motors- Pune
                </h4>
                <p className="ms-2 mb-3">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-4 card bg-base-100 shadow-xl m-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["StaticDatePicker"]}>
                  <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="col-lg-5 m-5">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab
                    label="KIT WISE"
                    icon={<MdPallet className="w-16 h-6" />}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="PART WISE"
                    icon={<FaPallet className="w-16 h-6" />}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-2">
                    <label className="label">
                      <span
                        className={
                          "label-text label-font-size text-base-content"
                        }
                      >
                        KIT No :
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <select
                      className="form-select form-sz w-full mb-2"
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    >
                      <option value="">KIT012</option>
                      <option value="">KIT017</option>
                      <option value="">KIT004</option>
                      <option value="">KIT015</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-2"></div>
                  <div className="col-lg-3 col-md-6 mb-2">
                    <label className="label">
                      <span
                        className={
                          "label-text label-font-size text-base-content"
                        }
                      >
                        QTY :
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <input
                      className="form-control form-sz mb-2"
                      type={"number"}
                      placeholder={""}
                      // name="warehouseCode"
                      // value={warehouseCode}
                      // onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-2">
                    <label className="label">
                      <span
                        className={
                          "label-text label-font-size text-base-content"
                        }
                      >
                        Part No :
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <select
                      className="form-select form-sz w-full mb-2"
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    >
                      <option value="">Part0025</option>
                      <option value="">Part0078</option>
                      <option value="">Part0043</option>
                      <option value="">Part0157</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-2"></div>
                  <div className="col-lg-3 col-md-6 mb-2">
                    <label className="label">
                      <span
                        className={
                          "label-text label-font-size text-base-content"
                        }
                      >
                        QTY :
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <input
                      className="form-control form-sz mb-2"
                      type={"number"}
                      placeholder={""}
                      // name="warehouseCode"
                      // value={warehouseCode}
                      // onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CustomTabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IssueReq;
