import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { FaLocationDot, FaPallet } from "react-icons/fa6";
import { MdDoubleArrow, MdPallet } from "react-icons/md";

import kit3 from "../../assets/gearbox.jpg";
import kit1 from "../../assets/images.jpg";
import kit2 from "../../assets/motor.png";
import kit4 from "../../assets/wire.jpeg";

function IssueReq() {
  const [value, setValue] = React.useState(0);
  const [kitFields, setKitFields] = React.useState([{ kitNo: "", qty: "" }]);
  const [selectedKitNumbers, setSelectedKitNumbers] = React.useState([""]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleQtyChange = (e, index) => {
    const newFields = [...kitFields];
    newFields[index].qty = e.target.value;
    setKitFields(newFields);
  };

  const handleAddField = () => {
    setKitFields([...kitFields, { kitNo: "", qty: "" }]);
    setSelectedKitNumbers([...selectedKitNumbers, ""]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...kitFields];
    newFields.splice(index, 1);
    setKitFields(newFields);

    const newSelectedKitNumbers = [...selectedKitNumbers];
    newSelectedKitNumbers.splice(index, 1);
    setSelectedKitNumbers(newSelectedKitNumbers);
  };

  const handleKitNoChange = (e, index) => {
    const newFields = [...kitFields];
    newFields[index].kitNo = e.target.value;
    setKitFields(newFields);

    const newSelectedKitNumbers = [...selectedKitNumbers];
    newSelectedKitNumbers[index] = e.target.value;
    setSelectedKitNumbers(newSelectedKitNumbers);
  };

  const getKitImageByNumber = (kitNo) => {
    switch (kitNo) {
      case "KIT012":
        return kit1;
      case "KIT017":
        return kit2;
      case "KIT004":
        return kit3;
      case "KIT015":
        return kit4;
      default:
        return ""; // You can provide a default image or handle it as per your requirement
    }
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
          </div>
          <div className="row">
            <div className="col-lg-4 card bg-base-100 shadow-xl m-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["StaticDatePicker"]}>
                  <StaticDatePicker
                    disablePast
                    minDate={dayjs().add(2, "day")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="col-lg-7 mt-4">
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
                {kitFields.map((field, index) => (
                  <div className="row" key={index}>
                    <div className="col-lg-4 col-md-6 mb-2">
                      <label className="label">
                        <span className="label-text label-font-size text-base-content">
                          KIT No :
                        </span>
                      </label>
                      <select
                        className="form-select form-sz w-full mb-2"
                        value={field.kitNo}
                        onChange={(e) => {
                          handleKitNoChange(e, index);
                        }}
                      >
                        <option value="">Select a Kit</option>
                        <option value="KIT012">KIT012</option>
                        <option value="KIT017">KIT017</option>
                        <option value="KIT004">KIT004</option>
                        <option value="KIT015">KIT015</option>
                      </select>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-2">
                      <label className="label">
                        <span className="label-text label-font-size text-base-content">
                          QTY :
                        </span>
                      </label>
                      <input
                        className="form-control form-sz mb-2"
                        type="text"
                        value={field.qty}
                        onChange={(e) => handleQtyChange(e, index)}
                      />
                    </div>

                    <div className="col-lg-1 col-md-2 mb-2">
                      {index === 0 ? (
                        <div
                          onClick={handleAddField}
                          style={{ marginTop: "42px" }}
                        >
                          <AddCircleOutlineIcon />
                        </div>
                      ) : (
                        <div
                          onClick={() => handleRemoveField(index)}
                          style={{ marginTop: "42px" }}
                        >
                          <HighlightOffIcon />
                        </div>
                      )}
                    </div>

                    {/* Display the static kit image */}
                    {selectedKitNumbers[index] && (
                      <div className="col-lg-3 col-md-2 mb-2">
                        <img
                          src={getKitImageByNumber(selectedKitNumbers[index])}
                          alt={`Kit ${selectedKitNumbers[index]} Image`}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
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
