import { Chip } from "@mui/material";
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
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import kit3 from "../../assets/gearbox.jpg";
import kit1 from "../../assets/images.jpg";
import kit2 from "../../assets/motor.png";
import kit4 from "../../assets/wire.jpeg";
import ToastComponent from "../../utils/ToastComponent";
import RequestSummaryTable from "./RequestSummaryTable";

import { styled } from "@mui/material/styles";

const ItemsPerPage = 10;

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function IssueReq() {
  // const [value, setValue] = React.useState(0);
  const [kitFields, setKitFields] = React.useState([{ kitNo: "", qty: "" }]);
  const [selectedKitNumbers, setSelectedKitNumbers] = React.useState([""]);
  const [partFields, setPartFields] = React.useState([{ partNo: "", qty: "" }]);
  const [selectedPartNumbers, setSelectedPartNumbers] = React.useState("");
  const [getkit, setGetKit] = React.useState("");
  const [getKitIds, setGetKitIds] = React.useState([]);
  const [partNoAndPartName, setPartNoAndPartName] = React.useState([]);
  const [selectedKitId, setSelectedKitId] = React.useState("");
  const [demandDate, setSelectedDate] = React.useState(null);
  const [errors, setErrors] = React.useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
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
  const [emitterId, setEmitterId] = useState(localStorage.getItem("emitterId"));
  const qtyInputRef = useRef(null);
  const [duplicateKitError, setDuplicateKitError] = useState(false);
  const [duplicatePartError, setDuplicatePartError] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [kitQtyy, setKitQtyy] = useState("");
  const [partNoAndPartNames, setPartNoAndPartNames] = useState({});
  const [selectedParts, setSelectedParts] = useState({});

  const today = dayjs();
  const maxDate = today.add(30, "day");

  const itemsPerPage = 5;

  const handleDetailsClick = (issue) => {
    setSelectedIssue(issue);
    setIsDialogOpen(true);
  };

  // useEffect(() => {
  //   // Initialize mode and value when component mounts
  //   setMode("KIT");
  //   setValue(0);
  // }, []);
  useEffect(() => {
    getIssueRequest();
  }, []);

  useEffect(() => {
    getDisplayName();
  }, [selectedFlowId]);

  useEffect(() => {
    // Check if the ref exists before trying to focus
    if (qtyInputRef.current) {
      qtyInputRef.current.focus();
    }
  }, [kitFields, partFields]);

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages based on the total number of items and items per page
  const totalPages = Math.ceil(bills.length / ItemsPerPage);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate start and end index of items for the current page
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = Math.min(startIndex + ItemsPerPage, bills.length);

  const getDisplayName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user/${userId}`
      );

      if (response.status === 200) {
        // setEmitterId(response.data.paramObjectsMap.userVO.customersVO.id);

        getAddressById(response.data.paramObjectsMap.userVO.customersVO.id);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Handle displaying fields based on mode and tab selection
  };

  const toggleMode = () => {
    const newMode = mode === "KIT" ? "PART" : "KIT";
    setMode(newMode);
    setValue(newMode === "PART" ? 1 : 0); // Reset tab value when mode changes
  };

  // const handleTabClick = (newValue) => {
  //   setValue(newValue);
  //   // Handle displaying fields based on mode and tab selection
  // };

  const handleIssueDateChange = (newDate) => {
    if (newDate) {
      // If a new date is selected
      const originalDateString = newDate;
      const formattedDate = dayjs(originalDateString).format("YYYY-MM-DD");
      setSelectedDate1(formattedDate);

      const currentDate = dayjs(); // Update currentDate with the current date

      if (currentDate) {
        const hoursDifference = originalDateString.diff(currentDate, "hour");
        if (hoursDifference <= 48) {
          setPriorityStatus("High Priority");
        } else {
          setPriorityStatus("Normal Priority");
        }
      }
    } else {
      // If the date is cleared
      setSelectedDate1(""); // Clear the selected date
      setPriorityStatus(""); // Clear the priority status
    }
  };

  const handleIdClick = (issueRequest) => {
    setSelectedIssue(issueRequest);
    setIsDialogOpen(true);
  };

  const getPriorityColor = () => {
    return priorityStatus === "High Priority" ? "red" : "green";
  };

  const handleKitNoChange = async (e, index) => {
    const selectedKitNo = e.target.value;

    // Check if the selected kit already exists
    const isDuplicate = kitFields.some(
      (field, i) => index !== i && field.kitNo === selectedKitNo
    );

    if (isDuplicate) {
      setDuplicateKitError(true);
      toast.error("The selected kit already exists", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getPartNoAndPartName?emitterId=${emitterId}&flowId=${selectedFlowId}&kitNo=${selectedKitNo}`
      );
      if (response.status === 200) {
        const partNoAndPartName =
          response.data.paramObjectsMap.partNoAndPartName;

        // Update partNoAndPartNames state
        updatePartNoAndPartNames(selectedKitNo, partNoAndPartName);

        // Update kitFields with selectedKitNo
        setKitFields((prevFields) => {
          const newFields = [...prevFields];
          newFields[index].kitNo = selectedKitNo;
          return newFields;
        });
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updatePartNoAndPartNames = (kitNo, partNoAndPartName) => {
    setPartNoAndPartNames((prev) => ({
      ...prev,
      [kitNo]: partNoAndPartName,
    }));

    console.log("Updated partNoAndPartNames:", partNoAndPartName);
  };

  // Function to get part details from partNoAndPartNames state
  const getPartDetails = (kitNo) => {
    return partNoAndPartNames[kitNo] || {};
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
      // console.error("Error fetching data:", error);
      toast.error("Network Error!");
    }
  };

  // useEffect(() => {
  //   console.log("Updated getkit:", getKitIds);
  // }, [getKitIds]);

  // const getAddressById = async (value) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/master/getAllFlowName?emitterId=${value}&orgId=${orgId}`
  //     );

  //     if (response.status === 200) {
  //       setAddress(response.data.paramObjectsMap.Flows);

  //       const validFlows = response.data.paramObjectsMap.Flows.filter(
  //         (flow) => typeof flow.flow === "string" && flow.flow.trim() !== ""
  //       ).map((flow) => ({ flowid: flow.flowid, flow: flow.flow }));

  //       setFlowData(validFlows);

  //       console.log("Addressss", flowData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const getAddressById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/getFlowByUserId?userId=${userId}`
      );

      if (response.status === 200) {
        console.log(
          "response.data.paramObjectsMap",
          response.data.paramObjectsMap
        );
        const validFlows = response.data.paramObjectsMap.flowVO
          .filter(
            (flow) =>
              typeof flow.flowName === "string" && flow.flowName.trim() !== ""
          )
          .map((flow) => ({ id: flow.id, flow: flow.flowName }));
        if (validFlows.length === 1) {
          setSelectedFlowId(validFlows[0].id);
          console.log("THE FIRST FLOW INDEX VALUE IS:", validFlows[0].id);
        }
        setFlowData(validFlows);
        console.log("validFlows", validFlows);
      }
    } catch (error) {
      // toast.error("Network Error!");
    }
  };

  const handleIssueReq = () => {
    console.log("test");
    const errors = {};

    const kitNoErrors = kitFields.some((field) => !field.kitNo);
    if (kitNoErrors) {
      errors.kitNo = "Kit is required";
    }
    if (!selectedDate1) {
      errors.selectedDate1 = "Date is required";
    }
    if (!selectedFlowId) {
      errors.selectedFlowId = "Flow is required";
    }

    // if (!demandDate) {
    //   errors.demandDate = "demand date is required";
    // }
    const kitQtyErrors = kitFields.some((field) => !field.qty);
    if (kitQtyErrors) {
      errors.kitQty = "Kit quantity is required";
    }

    const hasZeroQty = kitFields.some((field) => field.qty === "0");
    if (hasZeroQty) {
      errors.kitQty = "Kit quantity cannot be 0";
      // toast.error("Kit Quantity cannot be 0");
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        createdBy: userName,
        demandDate: selectedDate1,
        emitterId: emitterId,
        orgId,
        irType: "IR_KIT",
        flowTo: selectedFlowId,
        issueItemDTO: kitFields.map((field) => {
          const kit = getPartDetails(field.kitNo);
          console.log(`Kit details for ${field.kitNo}:`, kit); // Debugging

          return {
            kitName: field.kitNo,
            kitQty: field.qty,
            partName: kit.partName || "N/A",
            partNo: kit.partNo || "N/A",
            partQty: kit.partQty || 0,
          };
        }),
      };

      console.log("Final formData:", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/createIssueRequest`,
          formData
        )
        .then((response) => {
          // setAleartState(true);
          console.log("Response:", response.data);
          setKitFields([{ kitNo: "", qty: "" }]);
          setSelectedKitNumbers([""]);
          setSelectedKitId("");
          setSelectedKit("");
          setSelectedFlowId("");
          setSelectedPart(null);
          setSelectedDate1(null);
          getIssueRequest();
          setErrors("");
          toast.success("Bin Requested Successfully", {
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch((error) => {
          toast.error("Network Error!");
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
      errors.partNo = "Part is required";
    }

    if (!selectedFlowId) {
      errors.selectedFlowId = "Flow is required";
    }

    if (!selectedDate1) {
      errors.selectedDate1 = "Date is required";
    }
    const partQtyErrors = partFields.some((field) => !field.qty);
    if (partQtyErrors) {
      errors.partQty = "Part quantity is required";
    }

    if (kitQtyy === 0) {
      toast.error("Kit quantity cannot be 0");
      return; // Prevent further execution
    }
    if (Object.keys(errors).length === 0) {
      const issueItemDTO = partFields.map((field, index) => ({
        partNo: field.partNo,
        partQty: field.qty,
        kitQty: kitQtyy[index],
      }));
      const formData = {
        createdBy: userName,
        demandDate: selectedDate1,
        emitterId: emitterId,
        orgId,
        flowTo: selectedFlowId,
        irType: "IR_PART",
        issueItemDTO: issueItemDTO,
      };
      console.log("test1", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/emitter/createIssueRequest`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          // setAleartState(true);
          toast.success("Bin Requested Successfully", {
            autoClose: 2000,
            theme: "colored",
          });
          // setSelectedKitNumbers([""]);
          // setPartFields([{ partNo: "", qty: "" }]);
          // setSelectedPartNumbers([""]);
          // setSelectedKitId("");
          getIssueRequest();
          setSelectedPart(null);
          setSelectedFlowId("");
          setPartFields([{ partNo: "", qty: "" }]);
          setSelectedDate1(null);
          setErrors("");
          setKitQtyy("");
        })
        .catch((error) => {
          toast.error("Network Error!");
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  const getkitNameById = async () => {
    // setKitData([]);

    console.log("selectedFlowIdddddd", selectedFlowId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${selectedFlowId}`
      );

      if (response.status === 200) {
        setKitNames(response.data.paramObjectsMap.flowVO.flowDetailVO);
        console.log(
          "RESPONSE FOR TAKE KITQQQQQQQQQQQQQ",
          response.data.paramObjectsMap.flowVO.flowDetailVO
        );

        // const kitDataArray =
        //   response.data.paramObjectsMap.flowVO.flowDetailVO.map((kit) => ({
        //     id: kit.id,
        //     kitName: kit.kitNo,
        //     partName: kit.partName,
        //     partNumber: kit.partNumber,
        //     partQty: kit.partQty,
        //   }));

        // // Setting kitData in the state using a callback function
        // setKitData([...kitDataArray]);
        const kitDataArray =
          response.data.paramObjectsMap.flowVO.flowDetailVO.map((kit) => ({
            id: kit.id,
            kitName: kit.kitNo,
            partName: kit.partName,
            partNumber: kit.partNumber,
            partQty: kit.partQty,
          }));

        // Using a Set to keep track of unique kit names
        const uniqueKitNames = new Set();
        const uniqueKits = [];

        kitDataArray.forEach((kit) => {
          if (!uniqueKitNames.has(kit.kitName)) {
            uniqueKitNames.add(kit.kitName);
            uniqueKits.push(kit);
          }
        });

        // Setting kitData in the state with unique kit names
        setKitData([...uniqueKits]);
        console.log("first", [...uniqueKits]);

        const partDataArray =
          response.data.paramObjectsMap.flowVO.flowDetailVO.map((part) => ({
            id: part.id,
            partName: part.partNumber,
            partValue: part.partName,
            kitName: part.kitNo,

            partQty: part.partQty,
            // partNo:part.partNo
          }));

        // Setting kitData in the state using a callback function
        // setKitData([...kitDataArray]);

        setPartData([...partDataArray]);

        console.log("part Names:", partData);

        console("Testtt", kitData);
      }
    } catch (error) {
      // toast.error("Network Error!");
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

    const selectedPart = selectedParts[index];
    if (selectedPart) {
      const kitQty = selectedPart.partQty;
      const calculatedKitQty = Math.floor(e.target.value / kitQty);

      setKitQtyy((prevQty) => ({
        ...prevQty,
        [index]: calculatedKitQty,
      }));
    }
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
    console.log("Newwww", e.target.value);
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

  // const handleKitNoChange = (e, index) => {
  //   console.log("Event:", e);

  //   setKitFields((prevFields) => {
  //     const newFields = [...prevFields];
  //     newFields[index].kitNo = e.target.value;
  //     console.log("Previous kitFields:", prevFields);
  //     console.log("Updated kitFields:", newFields);
  //     return newFields;
  //   });
  // };

  const getPartNoAndPartName = async (kit) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getPartNoAndPartName?emitterId=${emitterId}&flowId=${selectedFlowId}&kitNo=${kit}`
      );
      if (response.status === 200) {
        setPartNoAndPartName(response.data.paramObjectsMap.partNoAndPartName);
        console.log(
          "partNoAndPartName",
          response.data.paramObjectsMap.partNoAndPartName
        );
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePartNoChange = (e, index) => {
    const selectedPartNo = e.target.value;
    const selectedPart = partData.find(
      (part) => part.partName === selectedPartNo
    );

    // Check for duplicate part numbers
    const isDuplicate = partFields.some(
      (field, i) => index !== i && field.partNo === selectedPartNo
    );

    if (isDuplicate) {
      setDuplicatePartError(true);
      toast.error("The selected part already exists", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setDuplicatePartError(false);
      setPartFields((prevFields) => {
        const newFields = [...prevFields];
        newFields[index].partNo = selectedPartNo;
        newFields[index].qty = "";
        return newFields;
      });

      // Store selected part details
      setSelectedParts((prevParts) => ({
        ...prevParts,
        [index]: selectedPart,
      }));

      setKitQtyy((prevQty) => ({
        ...prevQty,
        [index]: "", // Reset the kit quantity when part number changes
      }));

      console.log("SELECTED PART FROM DROPDOWN IS:", selectedPart);
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

  const getIssueRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequest?orgId=${orgId}&emitterId=${emitterId}&flowId=${selectedFlowId}`
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
        <div>
          <img
            src="/pending.png"
            alt="pending-status-icon"
            title="Pending"
            style={{ width: 30, height: 30, margin: "auto", hover: "pointer" }}
          />
        </div>
      );
    if (issueRequest === 1)
      return (
        <div>
          <img
            src="/inprogress.png"
            alt="Inprogress-status-icon"
            style={{ width: 30, height: 30, margin: "auto" }}
            // onClick={() =>
            //   handleInProgressStatusClick(selectedIssueRequest, selectedSubIndex)
            // }
          />
        </div>
      );
    if (issueRequest === 2)
      return (
        <div>
          <img
            src="/checked1.png"
            alt="completed-status-icon"
            style={{ width: 30, height: 30, margin: "auto" }}
          />
        </div>
      );
    else return <div className="badge badge-ghost">Unknown</div>;
  };

  const handlePendingStatusClick = (issueRequest, subIndex) => {
    console.log("Pending", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
  };

  const replaceSpacesWithHyphen = (partNo) => {
    return partNo.replace(/\s+/g, " - "); // Replace all occurrences of whitespace with '-'
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="container-sm">
        {aleartState ? (
          <ToastComponent content="Issue created successfully" type="success" />
        ) : (
          ""
        )}
        <div className="card bg-base-100 shadow-xl" style={{ height: "auto" }}>
          <div className="row p-4">
            <div className="col-md-12">
              <p className="text-2xl flex items-center">
                <Link to="/app/welcomeemitter">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8" />
                </Link>
                <span>
                  <strong className="ml-4">Bin Request</strong>
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
            className="row d-flex flex-row card bg-base-100 m-auto"
            style={{ width: "auto", height: "auto" }}
          >
            <div className="col-md-5">
              <div className="p-3">
                <div className="d-flex flex-row">
                  {/* <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  /> */}
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/128/854/854932.png"
                    }
                    alt="Favorite"
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "6px",
                      marginTop: "9px",
                    }}
                  />
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-1 mb-2">
                    Flow To <span style={{ color: "red" }}>*</span>
                  </h4>{" "}
                  <div className="d-flex flex-column">
                    <select
                      className="form-select w-56 h-10 mt-1 mb-2"
                      value={selectedFlowId}
                      onChange={handleFlowChange}
                    >
                      <option value="">Select a Flow</option>
                      {flowData &&
                        flowData.map((flowName) => (
                          <option key={flowName.id} value={flowName.id}>
                            {flowName.flow}
                          </option>
                        ))}
                    </select>
                    {errors.selectedFlowId && (
                      <span className="error-text">
                        {errors.selectedFlowId}
                      </span>
                    )}
                  </div>
                </div>

                {/* <h4 className="text-xl dark:text-slate-300 font-semibold ms-1">
                  -
                </h4> */}
                {/* <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p> */}
              </div>
            </div>
            <div className="col-md-1 mt-4">
              <label>
                <b>
                  Demand Date <span style={{ color: "red" }}>*</span>
                </b>
              </label>
            </div>
            <div className="col-md-3 mt-4">
              <div>
                {/* <label style={{ fontWeight: "bold" }}>Select Date</label> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={selectedDate1}
                    onChange={handleIssueDateChange}
                    minDate={today}
                    disableCloseOnSelect={true}
                    maxDate={maxDate}
                    slotProps={{
                      textField: {
                        size: "small",
                        clearable: true,
                        disabled: true,
                      }, // Disable the text field
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </div>

              {selectedDate1 ? ( // Only show the priority input table if a date is selected
                <Chip
                  label={priorityStatus}
                  size="small"
                  style={{
                    backgroundColor: getPriorityColor(priorityStatus),
                    color: "white",
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "1%",
                    fontSize: "11px",
                  }}
                />
              ) : (
                errors.selectedDate1 && (
                  <span className="error-text">{errors.selectedDate1}</span>
                )
              )}
            </div>

            <div className="col-md-3 mt-4">
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={mode === "PART"}
                    onChange={toggleMode}
                    color="primary"
                    sx={{ m: 1 }}
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
            </div>

            {/* <div className="col-md-5"></div>
            <div className="col-md-1"></div>
            {selectedDate1 && ( // Only show the priority input table if a date is selected
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control form-sz mb-2"
                  value={priorityStatus}
                  disabled
                  style={{ color: getPriorityColor(), marginTop: "5px" }}
                />
              </div>
            )} */}
          </div>

          <div className="row pt-4 pl-5 pr-5 pb-10">
            <div className="col-lg-12">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {mode === "KIT" && (
                    <Tab
                      label="KIT WISE"
                      icon={
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/3301/3301036.png"
                          width={30}
                          height={30}
                        ></img>
                      }
                      {...a11yProps(0)}
                      value={0}
                      // onClick={() => handleTabClick(0)}
                    />
                  )}
                  {mode === "PART" && (
                    <Tab
                      label="PART WISE"
                      icon={
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/11594/11594341.png"
                          width={30}
                          height={30}
                        ></img>
                      }
                      {...a11yProps(1)}
                      value={1}

                      // onClick={() => handleTabClick(1)}
                    />
                  )}
                  <Tab
                    label="REQ SUMMARY"
                    icon={
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/3875/3875980.png"
                        width={30}
                        height={30}
                      ></img>
                    }
                    {...a11yProps(2)}
                    value={2}

                    // onClick={() => handleTabClick(2)}
                  />
                </Tabs>
              </Box>
              {/* KIT TAB */}

              {mode === "KIT" && value === 0 && (
                <div
                  className="scrollable-container"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <CustomTabPanel value={value} index={0}>
                    {kitFields.map((field, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-3 col-md-6 mb-2">
                          <label className="label">
                            <span className="label-text font-semibold label-font-size text-base-content">
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
                          <div className="d-flex flex-column">
                            <select
                              className="form-select form-sz w-full mb-2"
                              value={field.kitNo}
                              onChange={(e) => handleKitNoChange(e, index)}
                            >
                              <option value="" disabled selected>
                                Select a kit
                              </option>
                              {kitData &&
                                kitData.map((kit) => (
                                  <option key={kit.id} value={kit.kitName}>
                                    {kit.kitName}
                                  </option>
                                ))}
                            </select>
                            {errors.kitNo && (
                              <span className="error-text">{errors.kitNo}</span>
                            )}
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-2">
                          <label className="label">
                            <span className="label-text label-font-size font-semibold text-base-content">
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
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/10995/10995791.png"
                                width={33}
                                height={33}
                                style={{ cursor: "pointer" }}
                              ></img>
                            </div>
                          ) : (
                            <div
                              onClick={() => handleRemoveField(index)}
                              style={{ marginTop: "42px" }}
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/8564/8564014.png"
                                width={28}
                                height={28}
                                style={{ cursor: "pointer" }}
                              ></img>
                            </div>
                          )}
                        </div>
                        {field.kitNo && (
                          <div className="col-lg-3 col-md-2 mt-10">
                            {partNoAndPartNames[field.kitNo] &&
                              partNoAndPartNames[field.kitNo].map(
                                (partInfo, i) => (
                                  <Chip
                                    key={i}
                                    label={`Part: ${replaceSpacesWithHyphen(
                                      partInfo.partNo
                                    )}`}
                                    variant="outlined"
                                    className="part-chip"
                                    style={{
                                      backgroundColor: "rgb(101 196 102)",
                                      borderColor: "#000000",
                                      color: "#ffffff",
                                    }}
                                  />
                                )
                              )}
                          </div>
                        )}
                        {field.kitNo && (
                          <DisplaySelectedPartInfo
                            selectedPartNo={selectedPartNumbers[index]}
                          />
                        )}
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
                </div>
              )}

              {/* PART TAB*/}

              {mode === "PART" && value === 1 && (
                <div
                  className="scrollable-container"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <CustomTabPanel value={value} index={1}>
                    {partFields.map((field, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-3 col-md-8 mb-2">
                          <label className="label">
                            <span
                              className={
                                "label-text label-font-size text-base-content font-semibold"
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
                          <div className="d-flex flex-column">
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
                            {errors.partNo && (
                              <span className="error-text">
                                {errors.partNo}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-8">
                          <label className="label">
                            <span
                              className={
                                "label-text label-font-size text-base-content font-semibold"
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
                            type="text"
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
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/10995/10995791.png"
                                width={33}
                                height={33}
                                style={{ cursor: "pointer" }}
                              ></img>
                            </div>
                          ) : (
                            <div
                              onClick={() => handleRemovePartField(index)}
                              style={{ marginTop: "42px" }}
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/8564/8564014.png"
                                width={28}
                                height={28}
                                style={{ cursor: "pointer" }}
                              ></img>
                            </div>
                          )}
                        </div>
                        {field.partNo && selectedParts[index] && (
                          <div className="col-lg-5 col-md-2 mt-11">
                            <Chip
                              label={`Kit: ${selectedParts[index].kitName}`}
                              variant="outlined"
                              className="part-chip "
                              style={{
                                backgroundColor: "rgb(101 196 102)",
                                borderColor: "#000000",
                                color: "#ffffff",
                              }}
                            />
                            <Chip
                              label={`Parts per Kit: ${selectedParts[index].partQty}`}
                              variant="outlined"
                              className="part-chip ml-2"
                              style={{
                                backgroundColor: "rgb(101 196 102)",
                                borderColor: "#000000",
                                color: "#ffffff",
                              }}
                            />
                            {kitQtyy[index] && kitQtyy[index] > 0 && (
                              <Chip
                                label={`Kit QTY: ${kitQtyy[index]}`}
                                variant="outlined"
                                className="part-chip ml-2"
                                style={{
                                  backgroundColor: "rgb(101 196 102)",
                                  borderColor: "#000000",
                                  color: "#ffffff",
                                }}
                              />
                            )}
                          </div>
                        )}
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
                </div>
              )}

              {value === 2 && (
                <div>
                  <CustomTabPanel value={value} index={2}>
                    <>
                      <RequestSummaryTable bills={bills} />
                    </>
                  </CustomTabPanel>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default IssueReq;
