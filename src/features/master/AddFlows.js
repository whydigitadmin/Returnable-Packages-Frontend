import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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

function AddFlows({ addFlows }) {
  const [flowName, setFlowName] = useState("");
  const [emitter, setEmitter] = useState("");
  const [receiver, setReceiver] = useState("");
  const [orgin, setOrgin] = useState("");
  const [destination, setDestination] = useState("");
  const [active, setActive] = useState(true);
  const [id, setId] = useState();
  const [kitName, setKitName] = useState("");
  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState(null);
  const [partStudyNameVO, setPartStudyNameVO] = useState([]);
  const [cycleTime, setCycleTime] = useState(null);
  const [errors, setErrors] = useState("");
  const [receiverCustomersVO, setReceiverCustomersVO] = useState([]);
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [getkit, setGetKit] = React.useState([]);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));

  useEffect(() => {
    getCustomersList();
    getAllKitData();
  }, []);

  const handleFlows = () => {
    addFlows(false);
  };

  const handleEmitterChange = (event) => {
    setEmitter(event.target.value);
    getPartStudyId(event.target.value);
  };
  const handlePartName = (event) => {
    setPartName(event.target.value);
    getPartStudyNo(event.target.value);
  };
  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };
  const handleSelectKitName = (event) => {
    setKitName(event.target.value);
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
        `${process.env.REACT_APP_API_URL}/api/master/getallkit`
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
      case "orgin":
        setOrgin(value);
        break;
      case "destination":
        setDestination(value);
        break;
    }
  };

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
    if (!orgin) {
      errors.orgin = "Orgin is required";
    }
    if (!destination) {
      errors.destination = "Destination is required";
    }
    if (!kitName) {
      errors.kitName = "Kit name is required";
    }
    if (!partName) {
      errors.partName = "Part name is required";
    }
    if (!partNumber) {
      errors.partNumber = "Part number is required";
    }
    if (!cycleTime) {
      errors.cycleTime = "Cycle Time is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        id,
        orgId,
        flowName,
        emitterId: emitter,
        receiverId: receiver,
        orgin,
        destination,
        active,
        flowDetailDTO: [
          {
            kitName,
            partNumber,
            partName,
            cycleTime,
            active,
          },
        ],
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

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">Master Flow Details</h1>
          <IoMdClose
            onClick={handleFlows}
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
            />
            {errors.flowName && (
              <span className="error-text">{errors.flowName}</span>
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
          </div>

          {/* orgin field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Orgin
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="orgin"
              value={orgin}
              onChange={handleInputChange}
            />
            {errors.orgin && <span className="error-text">{errors.orgin}</span>}
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
            <input
              className="form-control form-sz mb-2"
              placeholder={""}
              name="destination"
              value={destination}
              onChange={handleInputChange}
            />
            {errors.destination && (
              <span className="error-text">{errors.destination}</span>
            )}
          </div>
          {/* active field */}
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
        <h1 className="text-xl font-semibold mb-4">Sub Flow Details</h1>

        <div className="row">
          {/* kit Name field */}
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Kit Name
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select form-sz w-full"
              value={kitName}
              onChange={handleSelectKitName}
            >
              <option value="">Select an Kit</option>
              {getkit.map((kitId) => (
                <option key={kitId.id} value={kitId.id}>
                  {kitId.id}
                </option>
              ))}
            </select>
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
              style={{ height: 40, fontSize: "0.800rem" }}
              className="input mb-2 w-full input-bordered ps-2"
              onChange={handlePartName}
              value={partName}
            >
              <option value="" disabled>
                Select a Part Study Name
              </option>
              {partStudyNameVO.length > 0 &&
                partStudyNameVO.map((list) => (
                  <option key={list.id} value={list}>
                    {list}
                  </option>
                ))}
            </select>
            {errors.partName && (
              <span className="error-text">{errors.partName}</span>
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
        <div className="d-flex flex-row mt-3">
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
        </div>
      </div>
    </>
  );
}

export default AddFlows;
