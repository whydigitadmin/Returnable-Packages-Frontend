import CloseIcon from "@material-ui/icons/Close";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaPallet } from "react-icons/fa6";
import { MdPallet } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { Link } from "react-router-dom";
import kit3 from "../../assets/gearbox.jpg";
import kit1 from "../../assets/images.jpg";
import kit2 from "../../assets/motor.png";
import kit4 from "../../assets/wire.jpeg";
import ToastComponent from "../../utils/ToastComponent";

function IssueReq() {
  // const [value, setValue] = React.useState(0);
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
  const [errorMessage, setErrorMessage] = useState("");
  const [flowData, setFlowData] = useState([]);
  const [selectedFlowId, setSelectedFlowId] = useState("");
  const [kitNames, setKitNames] = useState([]);
  const [kitData, setKitData] = useState([]);
  const [partData, setPartData] = useState([]);
  const currentDate = dayjs();
  const [selectedDate1, setSelectedDate1] = useState(null); // Initialize selectedDate with the current date
  const [priorityStatus, setPriorityStatus] = useState("");
  const [mode, setMode] = useState("KIT"); // Default mode is KIT
  const [value, setValue] = React.useState(0);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emitterId, setEmitterId] = useState();
  const qtyInputRef = useRef(null);

  useEffect(() => {
    getDisplayName();
  }, [selectedFlowId]);

  useEffect(() => {
    // Check if the ref exists before trying to focus
    if (qtyInputRef.current) {
      qtyInputRef.current.focus();
    }
  }, [kitFields, partFields]);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userId}`
      );

      if (response.status === 200) {
        setEmitterId(response.data.paramObjectsMap.userVO.customersVO.id);

        getAddressById(response.data.paramObjectsMap.userVO.customersVO.id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 2) {
      // If REQ SUMMARY tab is clicked
      // Handle displaying REQ SUMMARY fields here
    }
  };

  const toggleMode = () => {
    const newMode = mode === "KIT" ? "PART" : "KIT";
    setMode(newMode);
    setValue(""); // Reset tab value when mode changes
  };

  const handleIssueDateChange = (newDate) => {
    const originalDateString = newDate;
    const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
    setSelectedDate1(formattedDate);
    console.log("FORMATTED DATE IS", selectedDate1);

    const hoursDifference = originalDateString.diff(currentDate, "hour");
    if (hoursDifference <= 48) {
      setPriorityStatus("High Priority");
    } else {
      setPriorityStatus("Normal Priority");
    }
  };
  const handleIdClick = (issueRequest) => {
    setSelectedIssue(issueRequest);
    setIsDialogOpen(true);
  };

  const getPriorityColor = () => {
    return priorityStatus === "High Priority" ? "red" : "green";
  };

  useEffect(() => {
    getAllKitData();

    getIssueRequest();
  }, [selectedFlowId, kitData]);

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

  // useEffect(() => {
  //   console.log("Updated getkit:", getKitIds);
  // }, [getKitIds]);

  const getAddressById = async (value) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllFlowName?emitterId=${value}&orgId=${orgId}`
      );

      if (response.status === 200) {
        setAddress(response.data.paramObjectsMap.Flows);

        const validFlows = response.data.paramObjectsMap.Flows.filter(
          (flow) => typeof flow.flow === "string" && flow.flow.trim() !== ""
        ).map((flow) => ({ flowid: flow.flowid, flow: flow.flow }));

        setFlowData(validFlows);

        console.log("Addressss", flowData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIssueReq = () => {
    console.log("test");
    const errors = {};

    const kitNoErrors = kitFields.some((field) => !field.kitNo);
    // if (kitNoErrors) {
    //   errors.kitNo = "kit Id is required";
    // }
    if (!selectedDate1) {
      errors.selectedDate1 = "date is required";
    }

    // if (!demandDate) {
    //   errors.demandDate = "demand date is required";
    // }
    const kitQtyErrors = kitFields.some((field) => !field.qty);
    if (kitQtyErrors) {
      errors.kitQty = "kit quantity is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        demandDate: selectedDate1,
        emitterId: emitterId,
        orgId,
        irType: "IR_KIT",
        flowTo: selectedFlowId,
        issueItemDTO: kitFields.map((field) => ({
          kitName: field.kitNo,
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
          setSelectedKitId("");
          setSelectedDate(null);
          getIssueRequest();
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
    // if (partNoErrors) {
    //   errors.partNo = "part is required";
    // }

    if (!selectedDate1) {
      errors.selectedDate1 = "date is required";
    }
    const partQtyErrors = partFields.some((field) => !field.qty);
    if (partQtyErrors) {
      errors.partQty = "part is required";
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        demandDate: selectedDate1,
        orgId,
        flowTo: selectedFlowId,
        irType: "IR_PART",
        issueItemDTO: partFields.map((field) => ({
          partNo: field.partNo,
          partQty: field.qty,
          // partName: field.partValue,
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
          setAleartState(true);
          // setSelectedKitNumbers([""]);
          // setPartFields([{ partNo: "", qty: "" }]);
          // setSelectedPartNumbers([""]);
          // setSelectedKitId("");
          getIssueRequest();
          setPartFields([{ partNo: "", qty: "" }]);
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

  const getkitNameById = async () => {
    // setKitData([]);

    // console.log("selectedFlowId", selectedFlowId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${selectedFlowId}`
      );

      if (response.status === 200) {
        setKitNames(response.data.paramObjectsMap.flowVO.flowDetailVO);

        const kitDataArray =
          response.data.paramObjectsMap.flowVO.flowDetailVO.map((kit) => ({
            id: kit.id,
            kitName: kit.kitName,
          }));

        // Setting kitData in the state using a callback function
        setKitData([...kitDataArray]);

        const partDataArray =
          response.data.paramObjectsMap.flowVO.flowDetailVO.map((part) => ({
            id: part.id,
            partName: part.partNumber,
            partValue: part.partName,
            // partNo:part.partNo
          }));

        // Setting kitData in the state using a callback function
        // setKitData([...kitDataArray]);

        setPartData([...partDataArray]);

        console.log("part Names:", partData);

        console("Testtt", kitData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

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

  // const handlePartNoChange = (e, index) => {
  //   const newFields = [...partFields];
  //   newFields[index].partNo = e.target.value;
  //   setPartFields(newFields);

  //   const newSelectedPartNumbers = [...selectedPartNumbers];
  //   newSelectedPartNumbers[index] = e.target.value;
  //   setSelectedPartNumbers(newSelectedPartNumbers);
  // };

  const handlePartQtyChange = (e, index) => {
    const newFields = [...partFields];
    newFields[index].qty = e.target.value;
    setPartFields(newFields);
    qtyInputRef.current.focus();
  };

  const handleQtyChange = (e, index) => {
    const newFields = [...kitFields];
    newFields[index].qty = e.target.value;
    setKitFields(newFields);

    // Set focus on the input field
    qtyInputRef.current.focus();
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

  const handleFlowChange = (e) => {
    const selectedId = e.target.value;
    setSelectedFlowId(selectedId);

    setKitData([]);
    setFlowData("");
    console.log("Newwww", selectedFlowId);
  };

  useEffect(() => {
    getkitNameById();
  }, [selectedFlowId]);

  // const handleKitNoChange = (e, index) => {
  //   const newFields = [...kitFields];
  //   newFields[index].kitNo = e.target.value;
  //   setKitFields(newFields);

  //   console.log("Testing", kitFields);

  //   // Use kit ID instead of kit number
  //   const newSelectedKitNumbers = [...selectedKitNumbers];
  //   newSelectedKitNumbers[index] = e.target.value.toUpperCase();
  //   setSelectedKitNumbers(newSelectedKitNumbers);
  // };

  const handleKitNoChange = (e, index) => {
    console.log("Event:", e);

    setKitFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index].kitNo = e.target.value;
      console.log("Previous kitFields:", prevFields);
      console.log("Updated kitFields:", newFields);
      return newFields;
    });
  };

  const handlePartNoChange = (e, index) => {
    setPartFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index].partNo = e.target.value;
      // newFields[index].partName = e.target.value;
      console.log("Updated PartttttttFields:", newFields); // Log the updated state
      return newFields;
    });
  };
  // const handlePartNoChange = (e, index) => {
  //   const { name, value } = e.target;

  //   setPartFields((prevFields) => {
  //     const newFields = [...prevFields];
  //     newFields[index] = {
  //       ...newFields[index],
  //       [name]: value,
  //     };
  //     console.log("Updated PartFields:", newFields); // Log the updated state
  //     return newFields;
  //   });
  // };

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
        const sortedIssueRequestVO =
          response.data.paramObjectsMap.issueRequestVO
            .slice() // Create a shallow copy to avoid mutating the original array
            .sort((a, b) => b.id - a.id); // Sort based on the 'id' property in descending order

        setBills(sortedIssueRequestVO);

        console.log("getIssueRequest", sortedIssueRequestVO);
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
          <div className="row p-4">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Issue Request</strong>
                </span>
              </p>
            </div>
          </div>
          {/* <div className="col-lg-4 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
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
            </div> */}
          <div
            className="row d-flex flex-row card bg-base-100 shadow-xl m-auto"
            style={{ width: "1000px" }}
          >
            <div className="col-md-5">
              <div className="p-3">
                <div className="d-flex flex-row">
                  {/* <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  /> */}
                  <img
                    src="/destination.png"
                    alt="Favorite"
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "6px",
                      marginTop: "12px",
                    }}
                  />
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-1 mb-2">
                    Flow To <span style={{ color: "red" }}>*</span>
                  </h4>
                  <select
                    className="form-select w-56 h-10 mt-1 mb-2"
                    value={selectedFlowId}
                    onChange={handleFlowChange}
                  >
                    <option value="">Select a Flow</option>
                    {flowData &&
                      flowData.map((flowName) => (
                        <option key={flowName.flowid} value={flowName.flowid}>
                          {flowName.flow}
                        </option>
                      ))}
                  </select>
                </div>

                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1 mb-2">
                  -
                </h4>
                {/* <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p> */}
              </div>
            </div>
            <div className="col-md-1 mt-4">
              <label>
                <b>
                  {" "}
                  Date <span style={{ color: "red" }}>*</span>
                </b>
              </label>
            </div>
            <div className="col-md-4 mt-4">
              <div>
                {/* <label style={{ fontWeight: "bold" }}>Select Date</label> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={selectedDate1}
                    onChange={handleIssueDateChange}
                    minDate={currentDate}
                    slotProps={{
                      textField: { size: "small", clearable: true },
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </div>

              <p>
                <strong style={{ fontSize: "12px" }}>
                  (<span style={{ color: "red" }}>*</span> Issue Within 48Hrs
                  Considered as High Priroity)
                </strong>
              </p>
              {errors.selectedDate1 && (
                <span className="error-text">{errors.selectedDate1}</span>
              )}
            </div>
            {selectedDate1 && ( // Only show the priority input table if a date is selected
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control form-sz mb-2 mt-4"
                  value={priorityStatus}
                  disabled
                  style={{ color: getPriorityColor(), marginTop: "5px" }}
                />
              </div>
            )}
          </div>

          <div className="row pt-4 pl-5 pr-5 pb-10">
            <div className="col-lg-12">
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === "PART"}
                    onChange={toggleMode}
                    color="primary"
                  />
                }
                labelPlacement="start"
                label={<span style={{ fontWeight: "bold" }}>KIT</span>}
              />
              <FormControlLabel
                control={<div />} // This is to leave the control empty
                labelPlacement="start"
                label={<span style={{ fontWeight: "bold" }}>PART</span>}
              />
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {/* {mode === "KIT" && ( */}
                  <Tab
                    label="KIT WISE"
                    icon={<MdPallet className="w-16 h-6" />}
                    {...a11yProps(0)}
                  />
                  {/* )} */}
                  {/* {mode === "PART" && ( */}
                  <Tab
                    label="PART WISE"
                    icon={<FaPallet className="w-16 h-6" />}
                    {...a11yProps(1)}
                  />
                  {/* )} */}
                  <Tab
                    label="REQ SUMMARY"
                    icon={<TbReport className="w-16 h-6" />}
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>

              <div
                className="scrollable-container"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {/* KIT TAB */}
                {mode === "KIT" && value === 0 && (
                  <CustomTabPanel value={value} index={0}>
                    {kitFields.map((field, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-4 col-md-6 mb-2">
                          <label className="label">
                            <span className="label-text label-font-size text-base-content">
                              KIT{" "}
                              <b>
                                <span
                                  style={{ color: "red", fontSize: "18px" }}
                                >
                                  *
                                </span>
                              </b>
                            </span>
                          </label>
                          <select
                            className="form-select form-sz w-full"
                            value={field.kitNo}
                            onChange={(e) => handleKitNoChange(e, index)}
                          >
                            <option value="" disabled>
                              Select a kit
                            </option>
                            {kitData &&
                              kitData.map((kit) => (
                                <option key={kit.id} value={kit.kitName}>
                                  {kit.kitName}
                                </option>
                              ))}
                          </select>
                          <div></div>
                        </div>
                        {errors.kitNo && (
                          <span className="error-text">{errors.kitNo}</span>
                        )}

                        <div className="col-lg-4 col-md-6 mb-2">
                          <label className="label">
                            <span className="label-text label-font-size text-base-content">
                              QTY{" "}
                              <b>
                                <span
                                  style={{ color: "red", fontSize: "18px" }}
                                >
                                  *
                                </span>
                              </b>
                            </span>
                          </label>
                          <input
                            ref={qtyInputRef}
                            key={index}
                            className="form-control form-sz mb-2"
                            name="kitQty"
                            type="number"
                            // value={field.qty}
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
                        <div className="col-lg-3 col-md-2">
                          {/* Display the static kit image */}
                          {selectedKitNumbers[index] ? (
                            <>
                              <img
                                src={getKitImageByNumber(
                                  selectedKitNumbers[index]
                                )}
                                alt={`Kit ${selectedKitNumbers[index]} Image`}
                                style={{
                                  width: "90px",
                                  height: "90px",
                                }}
                              />
                              <span
                                className="pt-1"
                                style={{ fontSize: "12px" }}
                              >
                                PA00341
                              </span>
                            </>
                          ) : (
                            <img
                              src="/partImage2.png"
                              style={{
                                width: "40px",
                                height: "40px",
                                marginTop: "35px",
                              }}
                            />
                          )}
                        </div>
                        <DisplaySelectedPartInfo
                          selectedPartNo={selectedPartNumbers[index]}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleIssueReq}
                      className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Submit
                    </button>
                  </CustomTabPanel>
                )}
              </div>

              <div
                className="scrollable-container"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {/* PART TAB*/}
                {mode === "PART" && value === 1 && (
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
                              Part{" "}
                              <b>
                                <span
                                  style={{ color: "red", fontSize: "18px" }}
                                >
                                  *
                                </span>
                              </b>
                            </span>
                          </label>
                          <select
                            className="form-select form-sz w-full"
                            value={field.partNo}
                            onChange={(e) => {
                              handlePartNoChange(e, index);
                            }}
                          >
                            <option value="" disabled>
                              Select a part
                            </option>
                            {partData &&
                              partData.map((part) => (
                                <option key={part.id} value={part.partName}>
                                  {part.partName}
                                </option>
                              ))}
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
                              QTY{" "}
                              <b>
                                <span
                                  style={{ color: "red", fontSize: "18px" }}
                                >
                                  *
                                </span>
                              </b>
                            </span>
                          </label>
                          <input
                            className="form-control form-sz"
                            type="number"
                            placeholder={""}
                            ref={qtyInputRef}
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
                        <div className="col-lg-3 col-md-2">
                          {selectedPartNumbers[index] ? (
                            <>
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
                            </>
                          ) : (
                            // Display default image if part number is not selected
                            <img
                              src="/partImage2.png" // Replace with your default image path
                              alt="Default Image"
                              style={{
                                width: "40px",
                                height: "40px",
                                marginTop: "35px",
                              }}
                            />
                          )}
                        </div>
                        <DisplaySelectedPartInfo
                          selectedPartNo={selectedPartNumbers[index]}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handlePartReq}
                      style={{ marginTop: "5px" }}
                      className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Submit
                    </button>
                  </CustomTabPanel>
                )}
              </div>
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
                            <th>Details</th>
                            <th>RM No.</th>
                            <th>RM Date</th>
                            <th>Demand Date</th>
                            <th>Flow Name</th>
                            {/* <th>Allocated Time - HRS</th> */}
                            {/* <th>Status</th> */}
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
                                        <td>
                                          <button
                                            className="badge bg-primary text-white"
                                            onClick={() =>
                                              handleIdClick(issueRequest)
                                            }
                                          >
                                            View
                                          </button>
                                        </td>

                                        <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                        >
                                          {issueRequest.id}
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
                                          {issueRequest.flowName}
                                        </td>
                                        {/* <td
                                          rowSpan={
                                            issueRequest.issueItemVO.length
                                          }
                                          className="text-center"
                                        >
                                          {issueRequest.tat}
                                        </td> */}
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
                                      {/* {getPaymentStatus(
                                        issueRequest.issueStatus
                                      )} */}
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

                    <Dialog
                      open={isDialogOpen}
                      onClose={() => setIsDialogOpen(false)}
                      maxWidth="sm" // You can adjust the size by changing "md" to other values like "sm", "lg", "xl", or a specific pixel value
                      fullWidth
                    >
                      <DialogTitle>
                        Details for RM No. {selectedIssue && selectedIssue.id}
                        <IconButton
                          aria-label="close"
                          onClick={() => setIsDialogOpen(false)}
                          style={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </DialogTitle>
                      <DialogContent
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <p>
                          <strong>RM Date:</strong>{" "}
                          {selectedIssue &&
                            moment(selectedIssue.requestedDate).format(
                              "DD-MM-YY"
                            )}
                        </p>
                        <p>
                          <strong>Demand Date:</strong>{" "}
                          {selectedIssue &&
                            moment(selectedIssue.demandDate).format("DD-MM-YY")}
                        </p>
                        <p>
                          <strong>Flow Name:</strong>{" "}
                          {selectedIssue && selectedIssue.flowName}
                        </p>

                        {/* Display issueItemVO details in a table */}
                        <br></br>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                {selectedIssue &&
                                selectedIssue.irType === "IR_PART" ? (
                                  <>
                                    <TableCell>
                                      <b>Part No</b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Kit No</b>{" "}
                                    </TableCell>
                                    <TableCell>
                                      <b>Quantity</b>
                                    </TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell>
                                      <b>Kit No </b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Quantity</b>
                                    </TableCell>
                                  </>
                                )}

                                <TableCell>
                                  <b>Status</b>
                                </TableCell>
                                {/* Add more columns if needed */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedIssue &&
                                selectedIssue.issueItemVO.map((item) => (
                                  <TableRow key={item.id}>
                                    {selectedIssue.irType === "IR_PART" ? (
                                      <>
                                        <TableCell>{item.partNo}</TableCell>
                                        <TableCell>{item.kitName}</TableCell>
                                        <TableCell>{item.partQty}</TableCell>
                                      </>
                                    ) : (
                                      <>
                                        <TableCell>{item.kitName}</TableCell>
                                        <TableCell>{item.kitQty}</TableCell>
                                      </>
                                    )}

                                    {/* Add more cells for additional columns */}
                                    <TableCell>
                                      {getPaymentStatus(item.issueItemStatus)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </DialogContent>
                      {/* <DialogActions>
                        <Button
                          onClick={() => setIsDialogOpen(false)}
                          color="primary"
                        >
                          Close
                        </Button>
                      </DialogActions> */}
                    </Dialog>
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
