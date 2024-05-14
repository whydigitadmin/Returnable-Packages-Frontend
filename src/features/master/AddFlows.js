import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife, FaTrash } from "react-icons/fa";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#0d6ef",
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

function AddFlows({ addFlows, editFlowId }) {
  const [flowName, setFlowName] = useState("");
  const [emitter, setEmitter] = useState("");
  const [receiver, setReceiver] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [editDestination, setEditDestination] = useState("");
  const [editFilteredList, setEditFilteredList] = useState([]);
  const [active, setActive] = useState(true);
  const [id, setId] = useState();
  const [kitNo, setKitName] = useState("");
  const [kitDesc, setKitDesc] = useState("");
  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState(null);
  const [partStudyNameVO, setPartStudyNameVO] = useState([]);
  const [cycleTime, setCycleTime] = useState(null);
  const [errors, setErrors] = useState("");
  const [receiverCustomersVO, setReceiverCustomersVO] = useState([]);
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [getkit, setGetKit] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [warehouseLocationVO, setWarehouseLocationVO] = useState([]);
  const [warehouseLocationValue, setWarehouseLocationValue] = useState("");
  const [openKitModal, setOpenKitModal] = React.useState(false);
  const [kitDTO, setKitDTO] = useState([]);
  const [city, setCity] = React.useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredCity, setFilteredCity] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage(""); // Clear the error message
  };

  useEffect(() => {
    getCustomersList();
    getAllKitData();
    getWarehouseLocationList();
    getStateData(); // city data api
    console.log("THE CITY FIELD VALIE IS:", city);
    {
      editFlowId && getFlowById();
      // editFlowId && editDestinationList();
      // handleFileterdCityChange();
    }
  }, []);
  const editDestinationList = async (value) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/city`
      );
      // console.log("API Response:", response);

      if (response.status === 200) {
        console.log("origin:", value);
        const cityVo = response.data.paramObjectsMap.cityVO;
        const filteredCity = cityVo.filter((list) => list.cityCode !== value);
        console.log("THE EDIT FILETERED CITY ARE:", filteredCity);
        setEditFilteredList(filteredCity);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Selected emitter ID:", emitter);
    console.log("emitterCustomersVO:", emitterCustomersVO);

    // Use the latest state value of emitterCustomersVO
    const selectedEmitter = emitterCustomersVO.find(
      (item) => parseInt(item.id) === parseInt(emitter)
    );

    console.log("Selected emitter:", selectedEmitter);

    if (selectedEmitter) {
      setDisplayName(selectedEmitter.displayName);
    } else {
      console.warn("Selected emitter not found!");
    }

    const selectedReceiver = receiverCustomersVO.find(
      (item) => parseInt(item.id) === parseInt(receiver)
    );

    console.log("Selected emitter:", selectedEmitter);

    if (selectedReceiver) {
      setReceiverName(selectedReceiver.displayName);
    } else {
      console.warn("Selected emitter not found!");
    }
  }, [emitter, emitterCustomersVO, receiverCustomersVO, receiver]);

  useEffect(() => {
    // Function to generate the flow name based on the first two letters of emitter, origin, and destination
    const generateFlowName = () => {
      // Check if all values are available

      console.log("Testtt", emitter, origin, destination);
      console.log("EmitterName", displayName);
      if (emitter && origin && destination && receiver) {
        const firstTwoEmitter = displayName.substring(0, 2).toUpperCase();
        const firstTwoOrigin = origin.substring(0, 3).toUpperCase();
        const firstTwoDestination = destination.substring(0, 3).toUpperCase();
        const firstTwoReceiver = receiverName.toUpperCase();
        const generatedName = `${firstTwoEmitter}-${firstTwoOrigin}-${firstTwoDestination}-${firstTwoReceiver}`;
        setFlowName(generatedName);
      }
    };

    // Call the function when emitter, origin, or destination changes
    generateFlowName();
  }, [displayName, origin, destination, receiverName]);

  const getFlowById = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/flow/${editFlowId}`
      );

      if (response.status === 200) {
        console.log(
          "GET FLOW BY ID API RESPONSE:",
          response.data.paramObjectsMap.flowVO
        );
        // handleFileterdCityChange();
        setFlowName(response.data.paramObjectsMap.flowVO.flowName);
        setEmitter(response.data.paramObjectsMap.flowVO.emitterId);
        setReceiver(response.data.paramObjectsMap.flowVO.receiverId);
        setOrigin(response.data.paramObjectsMap.flowVO.orgin);
        setEditDestination(response.data.paramObjectsMap.flowVO.destination);
        setWarehouseLocationValue(
          response.data.paramObjectsMap.flowVO.warehouseLocation
        );
        setKitDTO(response.data.paramObjectsMap.flowVO.flowDetailVO);
        // console.log("kit", response.data.paramObjectsMap.KitVO);
        editDestinationList(response.data.paramObjectsMap.flowVO.orgin);
      }
      // handleFileterdCityChange();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFlows = () => {
    addFlows(false);
  };

  const handleEmitterChange = async (event) => {
    const selectedEmitterId = event.target.value;
    setEmitter(selectedEmitterId);

    // Fetch part study ID
    getPartStudyId(selectedEmitterId); // Assuming this function fetches the part study ID
  };

  const handlePartName = (event) => {
    setPartName(event.target.value);
    getPartStudyNo(event.target.value);
  };
  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };
  const handleWarehouseLocationChange = (event) => {
    setWarehouseLocationValue(event.target.value);
  };
  const handleSelectKitName = (event) => {
    setKitName(event.target.value);
    getKitByKit(event.target.value);
  };

  const getPartStudyId = async (emitterId) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/searchPartStudyById`,
        {
          params: {
            orgId: orgId,
            emitterId: emitterId,
          },
        }
      );
      if (response.status === 200) {
        setPartStudyNameVO(
          response.data.paramObjectsMap.basicDetailVO.partName
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getPartStudyNo = async (partName) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/partStudy/searchPartStudyById`,
        {
          params: {
            orgId: orgId,
            emitterId: emitter,
            partName: partName,
          },
        }
      );
      if (response.status === 200) {
        setPartNumber(
          response.data.paramObjectsMap.basicDetailVO.partNumber[0]
        );
        const totalCycleTime =
          response.data.paramObjectsMap.basicDetailVO.basicDetailVO[0]
            .stockDetailVO.totalCycleTime;
        setCycleTime(totalCycleTime);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCustomersList = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getCustomersList?orgId=${orgId}`
      );

      if (response.status === 200) {
        setReceiverCustomersVO(
          response.data.paramObjectsMap.customersVO.receiverCustomersVO
        );
        setEmitterCustomersVO(
          response.data.paramObjectsMap.customersVO.emitterCustomersVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllKitData = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getallkit?orgId=${orgId}`
        // `${process.env.REACT_APP_API_URL}/api/master/assetGroup?orgId=${orgId}`,
      );

      if (response.status === 200) {
        setGetKit(response.data.paramObjectsMap.KitVO);
        console.log("kit", response.data.paramObjectsMap.KitVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "flowName":
        setFlowName(value);
        break;
      case "origin":
        setOrigin(value);
        break;
      case "destination":
        setDestination(value);
        break;
    }
  };

  const handleCityChange = (e) => {
    const selectedValue = e.target.value;
    setOrigin(selectedValue);
    const filteredCity = city.filter((list) => list.cityCode !== selectedValue);
    console.log("THE FILETERED CITY ARE:", filteredCity);
    setDestination("");
    setFilteredCity(filteredCity);
  };
  const handleEditDestinationChange = (e) => {
    setEditDestination(e.target.value);
  };
  // SAVE API
  const handleSave = () => {
    const errors = {};
    if (!flowName) {
      errors.flowName = "Flow name is required";
    }
    if (!emitter) {
      errors.emitter = "Emitter is required";
    }
    if (!receiver) {
      errors.receiver = "Receiver is required";
    }
    if (!origin) {
      errors.origin = "origin is required";
    }
    if (!destination) {
      errors.destination = "Destination is required";
    }
    if (!warehouseLocationValue) {
      errors.warehouseLocationValue = "Warehouse Location is required";
    }
    if (kitDTO.length === 0) {
      errors.kitDTO = "Please add at least one Kit detail";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        id,
        orgId,
        flowName,
        emitterId: emitter,
        receiverId: receiver,
        orgin: origin,
        destination,
        active,
        createdby: userName,
        modifiedby: userName,
        warehouseId: warehouseLocationValue,
        // warehouseLocation: warehouseLocationValue,
        flowDetailDTO: kitDTO,
      };

      Axios.post(`${process.env.REACT_APP_API_URL}/api/master/flow`, formData)
        .then((response) => {
          if (response.data.status === "Error") {
            console.error("Error creating kit:", response.data.paramObjectsMap);
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            console.log("Response:", response.data);
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });

            setTimeout(() => {
              addFlows(true);
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  // UPDATE API
  const handleUpdte = () => {
    const errors = {};
    if (!flowName) {
      errors.flowName = "Flow name is required";
    }
    if (!emitter) {
      errors.emitter = "Emitter is required";
    }
    if (!receiver) {
      errors.receiver = "Receiver is required";
    }
    if (!origin) {
      errors.origin = "origin is required";
    }
    if (!destination) {
      errors.destination = "Destination is required";
    }
    if (!warehouseLocationValue) {
      errors.warehouseLocationValue = "Warehouse Location is required";
    }
    if (kitDTO.length === 0) {
      errors.kitDTO = "Please add at least one Kit detail";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        id,
        orgId,
        flowName,
        emitterId: emitter,
        receiverId: receiver,
        orgin: origin,
        destination,
        active,
        createdby: userName,
        modifiedby: userName,
        warehouseId: warehouseLocationValue,
        // warehouseLocation: warehouseLocationValue,
        flowDetailDTO: kitDTO,
      };

      Axios.post(`${process.env.REACT_APP_API_URL}/api/master/flow`, formData)
        .then((response) => {
          console.log("Response:", response.data);
          addFlows(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const getStateData = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/basicMaster/city`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setCity(response.data.paramObjectsMap.cityVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getWarehouseLocationList = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/warehouse/getWarehouseLocationByOrgID?orgId=${orgId}`
      );

      if (response.status === 200) {
        setWarehouseLocationVO(response.data.paramObjectsMap.WarehouseLocation);
        console.log(
          "WarehouseLocation",
          response.data.paramObjectsMap.WarehouseLocation
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getKitByKit = async (kit) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/kitDetails?kitName=${kit}`
      );

      if (response.status === 200) {
        setKitDesc(response.data.paramObjectsMap.KitVO.kitDesc);
        console.log("kitDesc", response.data.paramObjectsMap.KitVO.kitDesc);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKitOpen = () => {
    setOpenKitModal(true);
  };

  const handleKitClose = () => {
    setOpenKitModal(false);
    setKitName("");
    setPartName("");
    setPartNumber("");
    setCycleTime("");
    setErrors({});
  };

  const handleAddKitDetails = () => {
    const errors = {};
    if (!kitNo) {
      errors.kitNo = "Kit is required";
    }
    if (!partName) {
      errors.partName = "Part Name is required";
    }
    if (!partNumber) {
      errors.partNumber = "Part Number is required";
    }
    if (!cycleTime) {
      errors.cycleTime = "Cycle Time is required";
    }
    if (Object.keys(errors).length === 0) {
      const existingKit = kitDTO.find(
        (kit) => kit.kitNo === kitNo && kit.partNumber === partNumber
      );
      if (existingKit) {
        toast.error("This kit and part number combination already exists", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        const existingPartNumber = kitDTO.find(
          (kit) => kit.partNumber === partNumber
        );
        if (existingPartNumber) {
          toast.error("This part number is already assigned to another kit", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          const newKitDetails = {
            kitNo,
            kitDesc,
            partName,
            partNumber,
            cycleTime,
            orgId,
          };
          setKitDTO([...kitDTO, newKitDetails]);
          handleKitClose();
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const handleDeleteRow = (index) => {
    const updatedKitDTO = [...kitDTO];
    updatedKitDTO.splice(index, 1);
    setKitDTO(updatedKitDTO);
  };

  // CLOSE BUTTON WITH CONFIRMATION
  const handleAddFlowClose = () => {
    if (
      flowName ||
      emitter ||
      receiver ||
      origin ||
      destination ||
      warehouseLocationValue ||
      kitDTO > 0
    ) {
      setOpenConfirmationDialog(true);
    } else {
      setOpenConfirmationDialog(false);
      addFlows(false); // USER CREATION SCREEN CLOSE AFTER UPDATE
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirmationYes = () => {
    setOpenConfirmationDialog(false);
    addFlows(false);
  };
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">Master Flow Details</h1>
          <IoMdClose
            // onClick={handleFlows}
            onClick={handleAddFlowClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>

        <div className="row">
          {/* flow Name field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Flow Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="flowName"
              value={flowName}
              onChange={handleInputChange}
              disabled
            />
            {errors.flowName && (
              <span className="error-text mb-1">{errors.flowName}</span>
            )}
          </div>
          {/* emitter field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Emitter
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleEmitterChange}
              value={emitter}
            >
              <option value="" disabled>
                Select an Emitter
              </option>
              {emitterCustomersVO.length > 0 &&
                emitterCustomersVO.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.displayName}
                  </option>
                ))}
            </select>
            {errors.emitter && (
              <span className="error-text mb-1">{errors.emitter}</span>
            )}
          </div>
          {/* receiver field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Receiver
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleReceiverChange}
              value={receiver}
            >
              <option value="" disabled>
                Select an Receiver
              </option>
              {receiverCustomersVO.length > 0 &&
                receiverCustomersVO.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.displayName}
                  </option>
                ))}
            </select>
            {errors.receiver && (
              <span className="error-text mb-1">{errors.receiver}</span>
            )}
          </div>

          {/* origin field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Origin
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleCityChange}
              value={origin}
              name="origin"
            >
              <option value="" disabled>
                Select an origin
              </option>
              {city.length > 0 &&
                city.map((list) => (
                  <option key={list.id} value={list.cityCode}>
                    {list.cityName}
                  </option>
                ))}
            </select>
            {errors.origin && (
              <span className="error-text mb-1">{errors.origin}</span>
            )}
          </div>

          {/* designation field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Destination
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            {editFlowId ? (
              <select
                className="form-select form-sz w-full mb-2"
                onChange={handleEditDestinationChange}
                value={editDestination}
                name="destination"
              >
                <option value="" disabled>
                  Select an destination
                </option>
                {editFilteredList.length > 0 &&
                  editFilteredList.map((list) => (
                    <option key={list.id} value={list.cityCode}>
                      {list.cityName}
                    </option>
                  ))}
              </select>
            ) : (
              <select
                className="form-select form-sz w-full mb-2"
                onChange={handleInputChange}
                value={destination}
                name="destination"
              >
                <option value="" disabled>
                  Select an destination
                </option>
                {filteredCity.length > 0 &&
                  filteredCity.map((list) => (
                    <option key={list.id} value={list.cityCode}>
                      {list.cityName}
                    </option>
                  ))}
              </select>
            )}
            {errors.destination && (
              <span className="error-text mb-1">{errors.destination}</span>
            )}
          </div>
          {/* active field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Warehouse Handling Location
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleWarehouseLocationChange}
              value={warehouseLocationValue}
            >
              <option value="" disabled>
                Select Warehouse Location
              </option>
              {warehouseLocationVO.length > 0 &&
                warehouseLocationVO.map((list) => (
                  <option key={list.warehouseId} value={list.warehouseId}>
                    {list.warehouseLocation}
                  </option>
                ))}
            </select>
            {errors.warehouseLocationValue && (
              <span className="error-text mb-1">
                {errors.warehouseLocationValue}
              </span>
            )}
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "d-flex flex-row label-text label-font-size text-base-content"
                }
              >
                Active
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>
        {/* ADD KIT BUTTON */}
        <div className="d-flex justify-content-between">
          <div className="ml-auto">
            <button
              className="btn btn-ghost btn-lg text-sm col-xs-1"
              style={{ color: "blue" }}
              onClick={handleKitOpen}
              disabled={emitter === ""}
            >
              <img
                src="/new.png"
                alt="new-icon"
                title="new"
                style={{
                  width: 30,
                  height: 30,
                  margin: "auto",
                  hover: "pointer",
                }}
              />
              <span
                className="text-form text-base"
                style={{ marginLeft: "10px" }}
              >
                Kit
              </span>
            </button>
            {errors.kitDTO && (
              <span className="error-text mb-1">{errors.kitDTO}</span>
            )}
          </div>
        </div>
        {kitDTO.length > 0 && (
          <div
            className="w-full p-3 bg-base-100 shadow-xl mt-2"
            style={{ borderRadius: 16 }}
          >
            <div className="text-xl font-semibold p-2">Kit & Part Details</div>
            <div className="divider mt-0 mb-0"></div>
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-center">Kit</th>
                    <th className="text-center">Part Name</th>
                    <th className="text-center">Part Number</th>
                    <th className="text-center">Cycle</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kitDTO.map((kit, index) => (
                    <tr key={index}>
                      <td className="text-center">{kit.kitNo}</td>
                      <td className="text-center">{kit.partName}</td>
                      <td className="text-center">{kit.partNumber}</td>
                      <td className="text-center">{kit.cycleTime}</td>
                      <td>
                        <FaTrash
                          onClick={() => handleDeleteRow(index)}
                          className="cursor-pointer w-6 h-6"
                          style={{ marginLeft: 10 }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="d-flex flex-row mt-3">
          {editFlowId ? (
            <>
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                // onClick={handleUpdte}
              >
                Update
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleFlows}
                className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openKitModal}
        onClose={handleKitClose}
      >
        <div>
          <ToastContainer />
        </div>
        <div className="d-flex justify-content-between">
          <DialogTitle>Add Kit & Part Details</DialogTitle>
          <IoMdClose
            onClick={handleKitClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText>
            <div className="row">
              {/* kit Name field */}
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Kit
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <select
                  className="form-select form-sz w-full"
                  value={kitNo}
                  onChange={handleSelectKitName}
                >
                  <option value="">Select a kit</option>
                  {getkit.map((kitId) => (
                    <option key={kitId.id} value={kitId.kitNo}>
                      {kitId.kitNo}
                    </option>
                  ))}
                </select>
                {errors.kitNo && (
                  <span className="error-text mb-1">{errors.kitNo}</span>
                )}
              </div>
              {/* Part Name */}
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Part Name
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <select
                  className="form-select form-sz w-full"
                  onChange={handlePartName}
                  value={partName}
                >
                  <option value="" disabled>
                    Select a part name
                  </option>
                  {partStudyNameVO.length > 0 &&
                    partStudyNameVO.map((list) => (
                      <option key={list.id} value={list}>
                        {list}
                      </option>
                    ))}
                </select>
                {errors.partName && (
                  <span className="error-text mb-1">{errors.partName}</span>
                )}
              </div>
              {/* part no field */}
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Kit Desc
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  disabled
                  value={kitDesc}
                />
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Part Number
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  disabled
                  value={partNumber}
                />
              </div>
              {/* cycle Time field */}
              <div className="col-lg-3 col-md-6">
                <label className="label mb-4">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Cycle Time
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz mb-2"
                  value={cycleTime}
                  disabled
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button onClick={handleKitClose}>Cancel</Button>
          <Button
            component="label"
            variant="contained"
            onClick={handleAddKitDetails}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* CLOSE CONFIRMATION MODAL */}
      <Dialog open={openConfirmationDialog}>
        <DialogContent>
          <p>Are you sure you want to close without saving changes?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>No</Button>
          <Button onClick={handleConfirmationYes}>Yes</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
}

export default AddFlows;
