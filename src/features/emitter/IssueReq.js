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
  const [partFields, setPartFields] = React.useState([{ partNo: "", qty: "" }]);
  const [selectedPartNumbers, setSelectedPartNumbers] = React.useState("");

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

  const handleAddPartField = () => {
    setPartFields([...partFields, { partNo: "", qty: "" }]);
    setSelectedPartNumbers([...selectedPartNumbers, ""]);
  };

  const handleRemovePartField = (index) => {
    const newFields = [...partFields];
    newFields.splice(index, 1);
    setPartFields(newFields);
    const newSelectedPartNumbers = [...selectedPartNumbers];
    newSelectedPartNumbers.splice(index, 1);
    setSelectedPartNumbers(newSelectedPartNumbers);
  };

  const handlePartNoChange = (e, index) => {
    const newFields = [...partFields];
    newFields[index].partNo = e.target.value;
    setPartFields(newFields);

    const newSelectedPartNumbers = [...selectedPartNumbers];
    newSelectedPartNumbers[index] = e.target.value;
    setSelectedPartNumbers(newSelectedPartNumbers);
  };

  const handlePartQtyChange = (e, index) => {
    const newFields = [...partFields];
    newFields[index].qty = e.target.value;
    setPartFields(newFields);
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
        return "";
    }
  };

  const getPartImageByNumber = (partNo) => {
    switch (partNo) {
      case "Part0025":
        return kit1;
      case "Part0078":
        return kit2;
      case "Part0043":
        return kit3;
      case "Part0157":
        return kit4;
      default:
        return "";
    }
  };

  function DisplaySelectedPartInfo({ selectedPartNo }) {
    const partInfo = {
      Part0025: { kitNo: "KIT012", qty: 8 },
      Part0078: { kitNo: "KIT017", qty: 5 },
      Part0043: { kitNo: "KIT004", qty: 10 },
      Part0157: { kitNo: "KIT015", qty: 3 },
    };

    const info = partInfo[selectedPartNo];

    if (!info) {
      return null;
    }

    return (
      <>
        <div className="col-lg-4 col-md-8 text-xs ms-1 mb-2">
          KIT : <span className="font-bold">{info.kitNo}(25)</span>
        </div>
        <div className="col-lg-4 col-md-8 text-xs ms-1 mb-2">
          PARTS PER KIT: <span className="font-bold">{info.qty}</span>
        </div>
      </>
    );
  }
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
                <select className="form-select w-10/12 ms-1 mb-2">
                  <option value="Tata Motors-Pune">Tata Motors-Pune</option>
                  <option value="Tata Motors-Chennai">
                    Tata Motors-Chennai
                  </option>
                  <option value="Tata Motors-Mumbai">Tata Motors-Mumbai</option>
                </select>
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
                  <>
                    <div className="row" key={index}>
                      <div className="col-lg-4 col-md-6 mb-2">
                        <label className="label">
                          <span className="label-text label-font-size text-base-content">
                            KIT :
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
                            <AddCircleOutlineIcon className="cursor-pointer" />
                          </div>
                        ) : (
                          <div
                            onClick={() => handleRemoveField(index)}
                            style={{ marginTop: "42px" }}
                          >
                            <HighlightOffIcon className="cursor-pointer" />
                          </div>
                        )}
                      </div>

                      {/* Display the static kit image */}
                      {selectedKitNumbers[index] && (
                        <div className="col-lg-3 col-md-2 mb-2">
                          <img
                            src={getKitImageByNumber(selectedKitNumbers[index])}
                            alt={`Kit ${selectedKitNumbers[index]} Image`}
                            style={{ width: "90px", height: "90px" }}
                          />
                          <span
                            className="pt-1 ms-4"
                            style={{ fontSize: "12px" }}
                          >
                            PA00341
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                ))}
                <button
                  type="button"
                  // onClick={handleSubmit}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Submit
                </button>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                {partFields.map((field, index) => (
                  <div className="row" key={index}>
                    <div className="col-lg-4 col-md-8 mb-2">
                      <label className="label">
                        <span
                          className={
                            "label-text label-font-size text-base-content"
                          }
                        >
                          Part :
                        </span>
                      </label>
                      <select
                        className="form-select form-sz w-full"
                        value={field.partNo}
                        onChange={(e) => {
                          handlePartNoChange(e, index);
                        }}
                      >
                        <option value="">Select a Part</option>
                        <option value="Part0025">Part0025</option>
                        <option value="Part0078">Part0078</option>
                        <option value="Part0043">Part0043</option>
                        <option value="Part0157">Part0157</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-8">
                      <label className="label">
                        <span
                          className={
                            "label-text label-font-size text-base-content"
                          }
                        >
                          QTY :
                        </span>
                      </label>
                      <input
                        className="form-control form-sz"
                        type={"number"}
                        placeholder={""}
                        value={field.qty}
                        onChange={(e) => handlePartQtyChange(e, index)}
                      />
                    </div>
                    <div className="col-lg-1 col-md-2">
                      {index === 0 ? (
                        <div
                          onClick={handleAddPartField}
                          style={{ marginTop: "42px" }}
                        >
                          <AddCircleOutlineIcon className="cursor-pointer" />
                        </div>
                      ) : (
                        <div
                          onClick={() => handleRemovePartField(index)}
                          style={{ marginTop: "42px" }}
                        >
                          <HighlightOffIcon className="cursor-pointer" />
                        </div>
                      )}
                    </div>
                    {selectedPartNumbers[index] && (
                      <>
                        <div className="col-lg-3 col-md-2">
                          <img
                            src={getPartImageByNumber(
                              selectedPartNumbers[index]
                            )}
                            alt={`Kit ${selectedPartNumbers[index]} Image`}
                            style={{ width: "90px", height: "90px" }}
                          />
                          <span
                            className="pt-1 ms-4"
                            style={{ fontSize: "12px" }}
                          >
                            PA00341
                          </span>
                        </div>
                        <DisplaySelectedPartInfo
                          selectedPartNo={selectedPartNumbers[index]}
                        />
                      </>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  // onClick={handleSubmit}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Submit
                </button>
              </CustomTabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IssueReq;
