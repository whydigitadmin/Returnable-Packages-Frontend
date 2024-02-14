import React, { useEffect, useState } from "react";
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
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import PropTypes from "prop-types";
import { FaLocationDot, FaPallet } from "react-icons/fa6";
import { MdDoubleArrow, MdPallet } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import kit3 from "../../assets/gearbox.jpg";
import kit1 from "../../assets/images.jpg";
import kit2 from "../../assets/motor.png";
import kit4 from "../../assets/wire.jpeg";
import ToastComponent from "../../utils/ToastComponent";

function IssueReq() {
  const [value, setValue] = React.useState(0);
  const [kitFields, setKitFields] = React.useState([{ kitNo: "", qty: "" }]);
  const [selectedKitNumbers, setSelectedKitNumbers] = React.useState([""]);
  const [partFields, setPartFields] = React.useState([{ partNo: "", qty: "" }]);
  const [selectedPartNumbers, setSelectedPartNumbers] = React.useState("");
  const [getkit, setGetKit] = React.useState("");
  const [getKitIds, setGetKitIds] = React.useState([]);
  const [selectedKitId, setSelectedKitId] = React.useState("");
  const [demandDate, setSelectedDate] = React.useState(null);
  const [errors, setErrors] = React.useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [address, setAddress] = React.useState({});
  const [aleartState, setAleartState] = React.useState("");
  const [flowNames, setFlowNames] = React.useState([]);
  const [selectedFlow, setSelectedFlow] = React.useState("");
  const [bills, setBills] = useState([]);
  const [selectedIssueRequest, setSelectedIssueRequest] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);

  useEffect(() => {
    getAllKitData();
    getAddressById();
    getIssueRequest();
  }, []);

  const getAllKitData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getallkit`
      );

      if (response.status === 200) {
        setGetKit(response.data.paramObjectsMap.KitVO);
        const kitsData = response.data.paramObjectsMap.KitVO;
        const kitIds = kitsData.map((kit) => kit.id);
        setGetKitIds(kitIds);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Updated getkit:", getKitIds);
  }, [getKitIds]);

  const getAddressById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow?emitterId=${userId}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setAddress(response.data.paramObjectsMap.flowVO);
        const validFlowNames = response.data.paramObjectsMap.flowVO
          .map((flow) => flow.flowName)
          .filter((flowName) => typeof flowName === "string");

        setFlowNames(validFlowNames);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIssueReq = () => {
    console.log("test");
    const errors = {};

    const kitNoErrors = kitFields.some((field) => !field.kitNo);
    if (kitNoErrors) {
      errors.kitNo = "kit Id is required";
    }

    if (!demandDate) {
      errors.demandDate = "demand date is required";
    }
    const kitQtyErrors = kitFields.some((field) => !field.qty);
    if (kitQtyErrors) {
      errors.kitQty = "kit quantity is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        demandDate,
        orgId,
        // flowTo,
        issueItemDTO: kitFields.map((field) => ({
          kitNo: field.kitNo,
          kitQty: field.qty,
        })),
      };
      console.log("test1", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/createIssueRequest`,
          formData
        )
        .then((response) => {
          setAleartState(true);
          console.log("Response:", response.data);
          setKitFields([{ kitNo: "", qty: "" }]);
          setSelectedKitNumbers([""]);
          // setPartFields([{ partNo: "", qty: "" }]);
          // setSelectedPartNumbers([""]);
          setSelectedKitId("");
          setSelectedDate(null);
          setErrors("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  const handlePartReq = () => {
    console.log("test");
    const errors = {};

    const partNoErrors = partFields.some((field) => !field.partNo);
    if (partNoErrors) {
      errors.partNo = "part is required";
    }

    if (!demandDate) {
      errors.demandDate = "date is required";
    }
    const partQtyErrors = partFields.some((field) => !field.qty);
    if (partQtyErrors) {
      errors.partQty = "part is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        demandDate,
        orgId,
        // flowTo,
        issueItemDTO: partFields.map((field) => ({
          partNo: field.partNo,
          partQty: field.qty,
        })),
      };
      console.log("test1", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/createIssueRequest`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          setPartFields([{ partNo: "", qty: "" }]);
          // setSelectedKitNumbers([""]);
          // setPartFields([{ partNo: "", qty: "" }]);
          // setSelectedPartNumbers([""]);
          // setSelectedKitId("");
          setSelectedDate(null);
          setErrors("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (newDate) => {
    // Update the state with the selected date
    const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

    // Update the state with the formatted date
    setSelectedDate(formattedDate);

    console.log("Selected Date:", newDate);
    console.log("Formatted Date:", formattedDate);
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

  // Modify this function to handle kit number change

  const getKitImageByNumber = (kitNo) => {
    const kitId = kitNo.toUpperCase();
    switch (kitId) {
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

  const handleKitNoChange = (e, index) => {
    const newFields = [...kitFields];
    newFields[index].kitNo = e.target.value;
    setKitFields(newFields);

    // Use kit ID instead of kit number
    const newSelectedKitNumbers = [...selectedKitNumbers];
    newSelectedKitNumbers[index] = e.target.value.toUpperCase();
    setSelectedKitNumbers(newSelectedKitNumbers);
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

  const getIssueRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequest`
      );

      if (response.status === 200) {
        setBills(response.data.paramObjectsMap.issueRequestVO);
        console.log(
          "getIssueRequest",
          response.data.paramObjectsMap.issueRequestVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPaymentStatus = (issueRequest, bill) => {
    if (issueRequest === 0)
      return (
        <div
          className="badge bg-danger text-white"
          // onClick={() => handlePendingStatusClick(issueRequest)}
        >
          Pending
        </div>
      );
    if (issueRequest === 1)
      return (
        <div
          className="badge bg-warning text-white"
          // onClick={() => handlePendingStatusClick(issueRequest)}
        >
          Inprogress
        </div>
      );
    if (issueRequest === 2)
      return (
        <div
          className="badge bg-success text-white"
          // onClick={() => handlePendingStatusClick(issueRequest)}
        >
          Issued
        </div>
      );
    else return <div className="badge badge-ghost">Unknown</div>;
  };

  const handlePendingStatusClick = (issueRequest, subIndex) => {
    console.log("Pending", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
  };

  return (
    <>
      <div className="container-sm">
        {aleartState ? (
          <ToastComponent content="Issue created successfully" />
        ) : (
          ""
        )}
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-1">
              <div className="d-flex justify-content-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8 mt-4" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 14 }}
                  />
                  <h4 className="text-xl font-semibold pt-1 mt-2 ms-1 mb-2">
                    Location -
                  </h4>
                  <h4 className="text-2xl font-semibold ms-1 mt-2">Gabriel</h4>
                </div>
              </div>
              <p className="mb-3">
                29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                Pune, Maharashtra, 410501 India
              </p>
            </div>
            <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 70 }}
              />
            </div>
            <div className="col-lg-4 card bg-base-100 shadow-xl ms-2 mt-3">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  />
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-1 mb-2">
                    Flow To -
                  </h4>
                  <select
                    className="form-select w-56 h-10 mt-1 mb-2"
                    value={selectedFlow}
                    onChange={(e) => setSelectedFlow(e.target.value)}
                  >
                    <option value="">Select a Flow</option>
                    {flowNames &&
                      flowNames.map((flowName) => (
                        <option key={flowName} value={flowName}>
                          {flowName}
                        </option>
                      ))}
                  </select>
                </div>

                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1 mb-2">
                  Tata Motors- Pune
                </h4>
                <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 card bg-base-100 shadow-xl m-4 h-fit">
              {errors.demandDate && (
                <span className="error-text">{errors.demandDate}</span>
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["StaticDatePicker"]}>
                  <StaticDatePicker
                    disablePast
                    minDate={dayjs().add(2, "day")}
                    value={demandDate} // Set the selected date
                    onChange={(newDate) => handleDateChange(newDate)} // Handle date change
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
                  <Tab
                    label="REQ SUMMARY"
                    icon={<TbReport className="w-16 h-6" />}
                    {...a11yProps(2)}
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
                          className="form-select form-sz w-full"
                          value={field.kitNo}
                          onChange={(e) => handleKitNoChange(e, index)}
                        >
                          <option value="">Select a Kit</option>
                          {getKitIds.map((kitId) => (
                            <option key={kitId} value={kitId}>
                              {kitId}
                            </option>
                          ))}
                        </select>
                        {errors.kitNo && (
                          <span className="error-text">{errors.kitNo}</span>
                        )}
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
                        {errors.kitQty && (
                          <span className="error-text">{errors.kitQty}</span>
                        )}
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
                  onClick={handleIssueReq}
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
                    {errors.partNo && (
                      <span className="error-text">{errors.partNo}</span>
                    )}
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
                      {errors.partQty && (
                        <span className="error-text">{errors.partQty}</span>
                      )}
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
                  onClick={handlePartReq}
                  className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Submit
                </button>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={2}>
                <>
                  <div
                    className="w-full p-2 bg-base-100 shadow-xl"
                    style={{ borderRadius: 16 }}
                  >
                    <div className="text-xl font-semibold p-3">
                      Issue Manifest Details
                    </div>
                    <div className="divider mt-0 mb-0"></div>
                    <div className="overflow-x-auto w-full "></div>
                    {/* Invoice list in table format loaded constant */}
                    <div className="overflow-x-auto w-full ">
                      <table className="table w-full">
                        <thead>
                          <tr>
                            <th>RM No.</th>
                            <th>RM Date</th>
                            <th>Demand Date</th>
                            <th>Flow Name</th>
                            <th>TAT (Hrs)</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bills.map((issueRequest, index) => (
                            <React.Fragment key={index}>
                              {issueRequest.issueItemVO.map(
                                (item, subIndex) => (
                                  <tr key={`${index}-${subIndex}`}>
                                    {subIndex === 0 && (
                                      <>
                                        <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                        >
                                          {issueRequest.reqAddressId}
                                        </td>
                                        <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                        >
                                          {moment(
                                            issueRequest.requestedDate
                                          ).format("DD-MM-YY")}
                                        </td>
                                        <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                        >
                                          {moment(
                                            issueRequest.demandDate
                                          ).format("DD-MM-YY")}
                                        </td>
                                        <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                        >
                                          {issueRequest.flowTo}
                                        </td>
                                        <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                          className="text-center"
                                        >
                                          48
                                        </td>
                                        {/* <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                          className="text-center"
                                        >
                                          {issueRequest.totalIssueItem}
                                        </td>
                                        <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                          className="text-center"
                                        >
                                          {issueRequest.partQty}
                                        </td> */}
                                      </>
                                    )}
                                    <td
                                    // onClick={() =>
                                    //   handlePendingStatusClick(
                                    //     issueRequest,
                                    //     subIndex
                                    //   )
                                    // }
                                    >
                                      {getPaymentStatus(
                                        issueRequest.issueStatus
                                      )}
                                    </td>

                                    {/* Random Status Code */}
                                    {/* 
                                    <td
                                      style={{ width: 100 }}
                                      // onClick={() =>
                                      //   handlePendingStatusClick(issueRequest, subIndex)
                                      // }
                                    >
                                      {getPaymentStatus()}
                                    </td> */}
                                  </tr>
                                )
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              </CustomTabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IssueReq;
