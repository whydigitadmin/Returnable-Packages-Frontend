import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaStarOfLife, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

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

function AddKit({ addItem, kitEditId }) {
  const [openAssetModal, setOpenAssetModal] = React.useState(false);
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [assetType, setAssetType] = useState("");
  const [assetCodeId, setAssetCodeId] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetNameList, setAssetNameList] = useState([]);
  const [assetQty, setAssetQty] = useState();
  const [assetCode, setAssetCode] = useState("");
  const [assetDesc, setAssetDesc] = useState();
  const [emitter, setEmitter] = useState("");
  const [partCode, setPartCode] = useState("");
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [partName, setPartName] = useState("");
  const [partQuantity, setPartQuantity] = useState();
  const [showPartQuantity, setShowPartQuantity] = useState(false);
  const [errors, setErrors] = useState({});
  const [kitCode, setKitCode] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [kitAssetDTO, setKitAssetDTO] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState(false);
  const [selectedName, setSelectedName] = useState(false);
  const [selectedCode, setSelectedCode] = useState(false);
  const [assetCodeList, setAssetCodeList] = useState([]);
  const [kitDesc, setKitDesc] = useState("");
  const [active, setActive] = React.useState(true);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  useEffect(() => {
    getCustomersList();
    getAllAssetType();
    if (kitEditId) {
      getKitById();
    }
  }, [assetCodeList]);

  const handleEmitterChange = (event) => {
    setEmitter(event.target.value);
  };
  const handlePartCode = (event) => {
    setPartCode(event.target.value);
  };

  const getCustomersList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getCustomersList?orgId=${orgId}`
      );

      if (response.status === 200) {
        setEmitterCustomersVO(
          response.data.paramObjectsMap.customersVO.emitterCustomersVO
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // CLOSE BUTTON WITH CONFIRMATION
  const handleUserCreationClose = () => {
    if (kitCode || kitDesc || partQuantity || kitAssetDTO > 0) {
      setOpenConfirmationDialog(true);
    } else {
      setOpenConfirmationDialog(false);
      addItem(false);
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirmationYes = () => {
    setOpenConfirmationDialog(false);
    addItem(false);
  };

  const getKitById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/kit/${kitEditId}`
      );
      if (response.status === 200) {
        console.log("kits", response.data.paramObjectsMap.KitVO);
        setKitCode(response.data.paramObjectsMap.KitVO.kitNo);
        setKitDesc(response.data.paramObjectsMap.KitVO.kitDesc);
        setPartQuantity(response.data.paramObjectsMap.KitVO.partQty);
        setKitAssetDTO(response.data.paramObjectsMap.KitVO.kitAssetVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAssetOpen = () => {
    setOpenAssetModal(true);
  };

  const handleAssetClose = () => {
    setOpenAssetModal(false);
    setAssetType("");
    setAssetCodeId("");
    setAssetName("");
    setAssetQty("");
    setAssetCode("");
    setAssetDesc("");
    setAssetNameList("");
    setAssetCodeList("");
    setEmitter("");
    setPartCode("");
    setShowPartQuantity(false);
    setErrors({});
    setSelectedAssetType(false);
    setSelectedName(false);
    setSelectedCode(false);
  };

  const handleKitId = (event) => {
    const { value } = event.target;

    console.log("kit", value);
    const kitExists = kitAssetDTO.some((asset) => asset.kitCode === value);
    console.log("kitee", kitExists);

    if (kitExists) {
      console.log("test", kitExists);
      toast.error("The Kit ID already exists.", {
        position: "top-center",
      });
    } else {
      setKitCode(value);
    }
  };

  const handleQuantityEditChange = (event, index) => {
    const { value } = event.target;
    const updatedKitAssetDTO = [...kitAssetDTO];

    updatedKitAssetDTO[index].quantity = value;
    setKitAssetDTO(updatedKitAssetDTO);
  };

  const handleQuantityChange = (event) => {
    setAssetQty(event.target.value);
  };
  const handlePartQuantityChange = (event) => {
    setPartQuantity(event.target.value);
  };

  const handleAssetTypeChange = (event) => {
    const selectedAssetType = event.target.value;
    setAssetType(selectedAssetType);
    setAssetName("");
    setAssetCodeId("");
    setAssetCode("");
    setAssetDesc("");
    setAssetQty("");
    setEmitter("");
    setPartCode("");
    getAssetNamesByCategory(selectedAssetType);
  };

  const handleAssetNameChange = (event) => {
    setAssetName(event.target.value);
    setSelectedName(true);
    getAssetPrefixByCategory(event.target.value);
    getAssetCodeByCategory(event.target.value);
  };

  const handleAssetCodeNewChange = (event) => {
    setAssetCode(event.target.value);
    const selectedAssetcode = event.target.value;

    const tempAssetDesc = assetCodeList.find(
      (list) => list.assetCodeId === selectedAssetcode
    );
    console.log("THE ASSET DESCRIPTIONS IS:", tempAssetDesc);
    setAssetDesc(tempAssetDesc.assetName);
    setPartCode(tempAssetDesc.manufacturePartCode);

    const tempEmitter = emitterCustomersVO.find(
      (list) => list.id === parseInt(tempAssetDesc.belongsTo)
    );
    console.log("Emitter Name is:", tempEmitter.displayName);

    setEmitter(tempEmitter.displayName);
  };

  const handleAssetCodeChange = (event) => {
    const selectedAssetCodeId = event.target.value;
    const codeExists = kitAssetDTO.some(
      (asset) => asset.assetCodeId === selectedAssetCodeId
    );
    if (codeExists) {
      toast.error("The Asset code already exists.", {
        autoClose: 2000,
        theme: "colored",
        position: "top-center",
      });
    } else {
      setAssetCodeId(selectedAssetCodeId);
      setSelectedCode(true);
    }
  };
  // GET ALL ASSET TYPE
  const getAllAssetType = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllAssetCategory?orgId=${orgId}`
      );

      if (response.status === 200) {
        const assetTypes = response.data.paramObjectsMap.assetCategoryVO;
        setAssetTypeList(assetTypes);
        console.log("type", assetTypes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetNamesByCategory = async (category) => {
    console.log("Asset Category API Called");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/assetGroup`,
        {
          params: {
            orgId: orgId,
            assetCategory: category,
          },
        }
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setAssetNameList(response.data.paramObjectsMap.assetGroupVO.category);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetPrefixByCategory = async (name) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/assetGroup`,
        {
          params: {
            orgId: orgId,
            assetCategory: assetType,
            assetName: name,
          },
        }
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setAssetCodeId(
          response.data.paramObjectsMap.assetGroupVO.categoryCode[0]
        );
        console.log(
          "THE ASSET CODE ID IS:",
          response.data.paramObjectsMap.assetGroupVO.categoryCode[0]
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // GET ASSETCODE BY CATEGORY
  const getAssetCodeByCategory = async (name) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllAssetByCategory?category=${name}&orgId=${orgId}`
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setAssetCodeList(response.data.paramObjectsMap.assetVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNew = () => {
    setKitCode("");
    setKitDesc("");
    setPartQuantity("");
    setKitAssetDTO("");
    setAssetType("");
    setAssetName("");
    setAssetCodeId("");
    setAssetCode("");
    setAssetDesc("");
    setAssetQty("");
  };
  // Update this function to add asset details to the state
  const handleAddAssetDetails = () => {
    const errors = {};
    if (!assetType) {
      errors.assetType = "Asset Type is required";
    }
    if (!assetCodeId) {
      errors.assetCodeId = "Code is required";
    }
    if (!assetName) {
      errors.assetName = "Name is required";
    }
    if (!assetQty) {
      errors.assetQty = "Asset Quantity is required";
    }
    if (Object.keys(errors).length === 0) {
      const newAssetDetails = {
        assetType: assetType,
        assetCategory: assetName,
        categoryCode: assetCodeId,
        assetCodeId: assetCode,
        assetDesc: assetDesc,
        quantity: assetQty,
        belongsTo: emitter,
        manufacturePartCode: partCode,
      };
      setKitAssetDTO([...kitAssetDTO, newAssetDetails]);
      handleAssetClose();
    } else {
      setErrors(errors);
    }
  };

  // SAVE API
  const handleKitCreation = async () => {
    const errors = {};
    if (!kitCode) {
      errors.kitCode = "Kit Id is required";
    }
    if (!kitDesc) {
      errors.kitDesc = "Kit Description is required";
    }
    if (!partQuantity) {
      errors.partQuantity = "Part Quantity is required";
    }
    if (kitAssetDTO.length === 0) {
      errors.kitAssetDTO = "Please add at least one asset detail";
    }
    if (Object.keys(errors).length === 0) {
      try {
        const kitData = {
          kitNo: kitCode,
          kitDesc,
          partQuantity,
          kitAssetDTO,
          orgId,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/master/createkit`,
          kitData
        );
        if (response.data.status === "Error" || !response.data.status) {
          console.error("Error creating kit:", response.data.paramObjectsMap);
          toast.error("Kit creation failed!", {
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          console.log("Kit created with successfully:", response.data);
          handleNew();
          toast.success(
            "Kit " +
              response.data.paramObjectsMap.KitVO.kitNo +
              " created successfully!",
            {
              autoClose: 2000,
              theme: "colored",
            }
          );
          setTimeout(() => {
            addItem(false);
          }, 2000);
        }
      } catch (error) {
        console.error("Error creating kit:", error);
        toast.error("Kit creation failed!", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } else {
      setErrors(errors);
    }
  };
  // UPDATE API
  const handleUpdateKit = async () => {
    const errors = {};
    if (!kitCode) {
      errors.kitCode = "Kit Id is required";
    }
    if (!kitDesc) {
      errors.kitDesc = "Kit Description is required";
    }
    if (!partQuantity) {
      errors.partQuantity = "Part Quantity is required";
    }
    if (kitAssetDTO.length === 0) {
      errors.kitAssetDTO = "Please add at least one asset detail";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const kitData = {
          id: kitEditId,
          kitNo: kitCode,
          kitDesc,
          partQuantity,
          kitAssetDTO,
          orgId,
        };
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/master/updateKit`,
          kitData
        );
        if (response.data.status === "Error" || !response.data.status) {
          console.error("Error update kit:", response.data.paramObjectsMap);
          toast.error("Kit Updation failed!", {
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          console.log("Kit Updated successfully:", response.data);

          toast.success(
            "Kit " +
              response.data.paramObjectsMap.KitVO.kitNo +
              " Updated successfully!",
            {
              autoClose: 2000,
              theme: "colored",
            }
          );
          // Add any further actions you want to take after successful kit creation
          setTimeout(() => {
            // handleItem();
            addItem(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Error creating kit:", error);
        toast.error("Kit creation failed!", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } else {
      setErrors(errors);
    }
  };

  const handleItem = () => {
    if (kitCode || partQuantity || kitAssetDTO > 0) {
      handleAssetOpen(true);
    } else {
      handleAssetOpen(false);
      addItem(false);
    }
  };

  const handleDeleteRow = (index) => {
    const updatedKitAssetDTO = [...kitAssetDTO];
    updatedKitAssetDTO.splice(index, 1);
    setKitAssetDTO(updatedKitAssetDTO);
  };

  const handleToggleEdit = (index) => {
    const updatedKitAssets = [...kitAssetDTO];
    updatedKitAssets[index].isEditable = true;
    setKitAssetDTO(updatedKitAssets);
  };

  const handleSaveRow = (index) => {
    const updatedKitAssets = [...kitAssetDTO];
    updatedKitAssets[index].isEditable = false;
    setKitAssetDTO(updatedKitAssets);
  };

  const handleSwitchChange = (event) => {
    setActive(event.target.checked);
    console.log("THE CHECKED STATUS IS:", event.target.checked);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end mb-2">
          <IoMdClose
            onClick={handleUserCreationClose}
            className="cursor-pointer w-8 h-8"
          />
        </div>
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="row">
              {/* KIT ID FIELD */}
              <div className="col-lg-3 col-md-6 mt-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Kit Id
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mt-2">
                <input
                  className="form-control form-sz mb-2 p-2 uppercase"
                  name="kitCode"
                  type="text"
                  value={kitCode}
                  onInput={handleKitId}
                  // placeholder={"PLS0000/MMYY/0000"}
                  required
                />
                {errors.kitCode && (
                  <span className="error-text">{errors.kitCode}</span>
                )}
              </div>
              {/* KIT DESC FIELD */}
              <div className="col-lg-3 col-md-6 mt-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Kit Description
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mt-2">
                <input
                  className="form-control form-sz mb-2 p-2 uppercase"
                  name="kitCode"
                  type="text"
                  value={kitDesc}
                  onChange={(e) => setKitDesc(e.target.value)}
                />
                {errors.kitDesc && (
                  <span className="error-text">{errors.kitDesc}</span>
                )}
              </div>
              <div className="col-lg-3 col-md-6 mt-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Part Quantity
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mt-2">
                <input
                  className="form-control form-sz mb-2"
                  name="partQuantity"
                  type="number"
                  value={partQuantity}
                  onChange={handlePartQuantityChange}
                />
                {errors.partQuantity && (
                  <span className="error-text">{errors.partQuantity}</span>
                )}
              </div>
              {/* ACTIVE FIELD */}
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={"label-text label-font-size text-base-content"}
                  >
                    Active
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      onChange={handleSwitchChange}
                      defaultChecked
                    />
                  }
                />
              </div>
            </div>
          </div>

          {/* </div> */}
          <div className="col-lg-3 col-md-12 text-right">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-ghost btn-lg text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleAssetOpen}
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
                  Asset
                </span>
              </button>
            </div>
            {errors.kitAssetDTO && (
              <span className="error-text">{errors.kitAssetDTO}</span>
            )}
          </div>
        </div>
        {kitAssetDTO.length > 0 && (
          <div
            className="w-full p-3 bg-base-100 shadow-xl mt-2"
            style={{ borderRadius: 16 }}
          >
            <div className="text-xl font-semibold p-2">Asset Details</div>
            <div className="divider mt-0 mb-0"></div>
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="">Type</th>
                    <th className="">Category</th>
                    <th className="">AssetCode</th>
                    <th className="">Quantity</th>
                    {/* <th className="">Part/Insert</th> */}
                    <th className="">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kitAssetDTO.map((asset, index) => (
                    <tr key={index}>
                      <td className="">{asset.assetType}</td>
                      <td className="">{asset.assetCategory}</td>
                      <td className="">{asset.assetCodeId}</td>
                      <td className="">
                        {asset.isEditable ? (
                          <input
                            type="number"
                            value={asset.quantity}
                            onChange={(e) => handleQuantityEditChange(e, index)}
                            className="form-control"
                            style={{
                              width: "100px",
                              padding: "6px",
                              textAlign: "center",
                            }}
                          />
                        ) : (
                          asset.quantity
                        )}
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2">
                            {asset.isEditable ? (
                              <FaSave
                                onClick={() => handleSaveRow(index)}
                                className="cursor-pointer w-6 h-6"
                              />
                            ) : (
                              <FaEdit
                                onClick={() => handleToggleEdit(index)}
                                className="cursor-pointer w-6 h-6"
                              />
                            )}
                          </div>
                          <div className="col-md-2">
                            <FaTrash
                              onClick={() => handleDeleteRow(index)}
                              className="cursor-pointer w-6 h-6"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {kitEditId ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleUpdateKit}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleKitCreation}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleItem}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {/* ASSET DETAILS DIALOG */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openAssetModal}
        onClose={handleAssetClose}
      >
        <div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
          />
        </div>
        <div className="d-flex justify-content-between">
          <DialogTitle>Add Asset Details</DialogTitle>
          <IoMdClose
            onClick={handleAssetClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText>
            <div className="row">
              {/* ASSET TYPE FIELD */}
              <div className="col-lg-3 col-md-3 mb-2">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row p-1"
                  }
                >
                  Asset Type
                  <FaStarOfLife className="must" />
                </span>
              </div>
              <div className="col-lg-3 col-md-3 mb-2">
                <select
                  name="Select Asset"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="input input-bordered ps-2"
                  onChange={handleAssetTypeChange}
                  value={assetType}
                >
                  <option value="" selected>
                    Select an Asset Type
                  </option>
                  {assetTypeList.length > 0 &&
                    assetTypeList.map((list) => (
                      <option key={list.id} value={list.assetType}>
                        {list.assetType}
                      </option>
                    ))}
                </select>
                {errors.assetType && (
                  <span className="error-text">{errors.assetType}</span>
                )}
              </div>
              {/* ASSET NAME FIELD */}
              <div className="col-lg-3 col-md-3 mb-2">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row p-1"
                  }
                >
                  Category
                  <FaStarOfLife className="must" />
                </span>
              </div>
              <div className="col-lg-3 col-md-3 mb-2">
                <select
                  name="Select Asset"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="input input-bordered ps-2"
                  onChange={handleAssetNameChange}
                  value={assetName}
                >
                  <option value="" disabled>
                    Select an Asset Name
                  </option>
                  {assetNameList.length > 0 &&
                    assetNameList.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))}
                </select>
                {errors.assetName && (
                  <span className="error-text">{errors.assetName}</span>
                )}
              </div>
              {/* CATEGORY CODE FIELD */}
              <div className="col-lg-3 col-md-3 mb-2">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row p-1"
                  }
                >
                  Category Code
                  <FaStarOfLife className="must" />
                </span>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz"
                  type="text"
                  name="category code"
                  value={assetCodeId}
                  disabled
                />
                {errors.assetCodeId && (
                  <span className="error-text">{errors.assetCodeId}</span>
                )}
              </div>
              {/* ASSET CODE FIELD */}
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Asset Code
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-3 mb-2">
                <select
                  name=""
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="input input-bordered ps-2"
                  onChange={handleAssetCodeNewChange}
                  value={assetCode}
                >
                  <option value="" disabled>
                    Select an Asset Code
                  </option>
                  {assetCodeList.length > 0 &&
                    assetCodeList.map((name) => (
                      <option key={name.id} value={name.assetCodeId}>
                        {name.assetCodeId}
                      </option>
                    ))}
                </select>
                {errors.assetCode && (
                  <span className="error-text">{errors.assetCode}</span>
                )}
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="label mb-2">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Belongs to
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz"
                  onChange={handleEmitterChange}
                  value={emitter}
                  disabled
                />
                {errors.emitter && (
                  <span className="error-text mb-1">{errors.emitter}</span>
                )}
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="label mb-2">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Manufacture Part Code
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6">
                <input
                  className="form-control form-sz"
                  onChange={handlePartCode}
                  value={partCode}
                  disabled
                />
                {errors.partName && (
                  <span className="error-text mb-1">{errors.partName}</span>
                )}
              </div>
              {/* ASSET DESCRIPTION FIELD */}
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Asset Description
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz"
                  type="text"
                  name="assetDesc"
                  value={assetDesc}
                  disabled
                />
                {errors.assetDesc && (
                  <span className="error-text">{errors.assetDesc}</span>
                )}
              </div>
              {/* ASSET QTY FIELD */}
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="label">
                  <span
                    className={
                      "label-text label-font-size text-base-content d-flex flex-row"
                    }
                  >
                    Asset Quantity
                    <FaStarOfLife className="must" />
                  </span>
                </label>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <input
                  className="form-control form-sz"
                  type="number"
                  name="assetQty"
                  value={assetQty}
                  onChange={handleQuantityChange}
                />
                {errors.assetQty && (
                  <span className="error-text">{errors.assetQty}</span>
                )}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button
            component="label"
            variant="contained"
            onClick={handleAddAssetDetails}
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
    </>
  );
}

export default AddKit;
