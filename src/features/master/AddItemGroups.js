import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { FaBox, FaCube, FaCubes, FaStarOfLife } from "react-icons/fa";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import TitleCard from "../../components/Cards/TitleCard";

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

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

function AddItemGroups({ addItem }) {
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("Select Required Asset");
  const [showAdditionalDropdown, setShowAdditionalDropdown] = useState(false);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);
  const [openAssetModal, setOpenAssetModal] = React.useState(false);
  const [assetCategoryVO, setAssetCategoryVO] = useState([]);
  const [assetCategory, setAssetCategory] = useState("");
  const [assetCodeId, setAssetCodeId] = useState([]);
  const [assetCodeIdVO, setAssetCodeIdVO] = useState([]);
  const [assetName, setAssetName] = useState([]);
  const [assetNameVO, setAssetNameVO] = useState([]);
  const [assetQty, setAssetQty] = useState();
  const [partQuantity, setPartQuantity] = useState();
  const [showPartQuantity, setShowPartQuantity] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openCheck, setOpenCheck] = React.useState(false);
  // const [selectedValues, setSelectedValues] = useState([]);
  const [addKit, setAddKit] = React.useState(false);
  const [standardName, setStandardName] = React.useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [pallet, setPallet] = React.useState(false);
  const [lid, setLid] = React.useState(false);
  const [sw, setSw] = React.useState(false);
  const [bound, setBound] = React.useState(false);
  const [rack, setRack] = React.useState(false);
  const [temperature, setTemperature] = React.useState(false);
  const [palletQty, setPalletQty] = React.useState("");
  const [lidQty, setLidQty] = React.useState("");
  const [swQty, setSwQty] = React.useState("");
  const [openQty, setOpenQty] = React.useState("");
  const [boundQty, setBoundQty] = React.useState("");
  const [rackQty, setRackQty] = React.useState("");
  const [temperatureQty, setTemperatureQty] = React.useState("");
  const [errors, setErrors] = useState({});
  const [id, setId] = useState();
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [kitAssetDTO, setKitAssetDTO] = useState([]);

  // Update this function to add asset details to the state
  const handleAddAssetDetails = () => {
    const errors = {};
    if (!assetCategory) {
      errors.assetCategory = "Asset Type is required";
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
    if (showPartQuantity && !partQuantity) {
      errors.partQuantity = "Part Quantity is required";
    }
    if (Object.keys(errors).length === 0) {
      const newAssetDetails = {
        assetCategory,
        assetCodeId,
        assetName,
        quantity: assetQty,
        partQuantity,
      };
      setKitAssetDTO([...kitAssetDTO, newAssetDetails]);
      handleAssetClose();
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  useEffect(() => {
    getAllAssetCategory();
  }, []);

  const handleAssetOpen = () => {
    setOpenAssetModal(true);
  };
  const handleAssetClose = () => {
    setOpenAssetModal(false);
    setAssetCategory("");
    setAssetCodeId("");
    setAssetName("");
    setAssetQty("");
    setShowPartQuantity(false);
  };
  const handleKitId = (event) => {
    setId(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setAssetQty(event.target.value);
  };
  const handlePartQuantityChange = (event) => {
    setPartQuantity(event.target.value);
  };

  // const handleAssetCategoryChange = (event) => {
  //   setAssetCategory(event.target.value);
  //   // Call function to fetch asset names based on the selected category
  //   getAssetNamesByCategory(event.target.value);
  // };

  const handleAssetCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setAssetCategory(selectedCategory);
    // Toggle visibility of part quantity input based on the selected category
    setShowPartQuantity(selectedCategory === "CUSTOMIZED");
    // Call function to fetch asset names based on the selected category
    getAssetNamesByCategory(selectedCategory);
  };

  const handleAssetNameChange = (event) => {
    setAssetName(event.target.value);
    // Call function to fetch asset names based on the selected category
    getAssetIdByName(event.target.value);
  };

  const handleAsseCodeChange = (event) => {
    const selectedAssetCodeId = event.target.value;
    setAssetCodeId(selectedAssetCodeId);
  };

  const getAllAssetCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/assetGroup`
      );

      if (response.status === 200) {
        const assetCategories =
          response.data.paramObjectsMap.assetGroupVO.assetCategory;
        setAssetCategoryVO(assetCategories);

        if (assetCategories.length > 0) {
          setAssetCategory(assetCategories[0].assetCategory);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetNamesByCategory = async (category) => {
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
        const assetGroupVO = response.data.paramObjectsMap.assetGroupVO;
        // // Filter asset names based on the selected category

        setAssetNameVO(response.data.paramObjectsMap.assetGroupVO.assetName);
        console.log("assetName", assetGroupVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAssetIdByName = async (category) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/assetGroup`,
        {
          params: {
            orgId: orgId,
            assetName: category,
          },
        }
      );
      console.log("Response from API:", response.data);
      if (response.status === 200) {
        setAssetCodeIdVO(
          response.data.paramObjectsMap.assetGroupVO.assetCodeId
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKitCreation = async () => {
    const errors = {};
    if (!id) {
      errors.id = "Kit Id is required";
    }
    if (kitAssetDTO.length === 0) {
      errors.kitAssetDTO = "Please add at least one asset detail";
    }
    if (Object.keys(errors).length === 0) {
      try {
        const kitData = {
          id,
          kitAssetDTO,
          orgId,
          // Add other properties from your form if needed
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/master/createkit`,
          kitData
        );
        console.log("Kit created successfully:", response.data);
        // Add any further actions you want to take after successful kit creation
        handleItem();
      } catch (error) {
        console.error("Error creating kit:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const [formValues, setFormValues] = useState({
    id: "",
    kitAssetDTO: [
      {
        assetCategory: "",
        assetName: "",
        quantity: "",
      },
      {
        assetCategory: "",
        assetName: "",
        quantity: "",
      },
    ],
    orgId: localStorage.getItem("orgId"),
    partId: "",
    partQty: "",
  });

  // Function to handle form submission
  const handleSubmit = () => {
    // Access form values from state
    console.log(formValues);
    setAddKit(true);
  };

  // const handleKitCreation = () => {
  //   const errors = {};

  //   if (!formValues.id) {
  //     errors.id = "Kit id is required";
  //   }

  //   const kitAssetDTO = [];

  //   if (pallet && palletQty) {
  //     kitAssetDTO.push({
  //       assetCategory: "Standard", // or a more appropriate category
  //       assetName: "Pallet", // or the actual name based on your logic
  //       quantity: palletQty,
  //     });
  //   }

  //   if (lid && lidQty) {
  //     kitAssetDTO.push({
  //       assetCategory: "Standard", // or a more appropriate category
  //       assetName: "Lid", // or the actual name based on your logic
  //       quantity: lidQty,
  //     });
  //   }
  //   if (sw && swQty) {
  //     kitAssetDTO.push({
  //       assetCategory: "Standard", // or a more appropriate category
  //       assetName: "side wall", // or the actual name based on your logic
  //       quantity: swQty,
  //     });
  //   }

  //   if (open && openQty) {
  //     kitAssetDTO.push({
  //       assetCategory: "Customized", // or a more appropriate category
  //       assetName: "Insert", // or the actual name based on your logic
  //       quantity: openQty,
  //     });
  //   }

  //   if (bound && boundQty) {
  //     kitAssetDTO.push({
  //       assetCategory: "Customized", // or a more appropriate category
  //       assetName: "PP Box", // or the actual name based on your logic
  //       quantity: boundQty,
  //     });
  //   }

  //   setFormValues((prevFormValues) => ({
  //     ...prevFormValues,
  //     kitAssetDTO,
  //   }));

  //   // Update userData with the hashed password
  //   if (Object.keys(errors).length === 0) {
  //     const kitData = {
  //       id: formValues.id,
  //       kitAssetDTO,
  //       orgId: localStorage.getItem("orgId"),
  //       partId: "",
  //       partQty: "",
  //     };
  //     // Valid data, perform API call or other actions
  //     axios
  //       .post(`${process.env.REACT_APP_API_URL}/api/master/createkit`, kitData)
  //       .then((response) => {
  //         console.log("User saved successfully!", response.data);
  //         addItem(true);
  //         setFormValues({
  //           id: "",
  //           kitAssetDTO: [
  //             {
  //               assetCategory: "",
  //               assetName: "",
  //               quantity: "",
  //             },
  //             {
  //               assetCategory: "",
  //               assetName: "",
  //               quantity: "",
  //             },
  //           ],
  //           orgId: localStorage.getItem("orgId"),
  //           partId: "",
  //           partQty: "",
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error saving user:", error.message);
  //       });
  //   } else {
  //     setErrors(errors);
  //   }
  // };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleItem = () => {
    addItem(false);
  };
  const handleStandardChip = (event) => {
    const {
      target: { value },
    } = event;
    setStandardName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeChip = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handlePallet = () => {
    setPallet(!pallet);
    if (pallet === false) {
      setPalletQty("");
    }
  };
  const handleLid = () => {
    setLid(!lid);
    if (lid === false) {
      setLidQty("");
    }
  };
  const handleSw = () => {
    setSw(!sw);
    if (sw === false) {
      setSwQty("");
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    if (open === false) {
      setOpenQty("");
    }
  };
  const handleBound = () => {
    setBound(!bound);
    if (bound === false) {
      setBoundQty("");
    }
  };
  const handleRack = () => {
    setRack(!rack);
    if (rack === false) {
      setRackQty("");
    }
  };
  const handlePalletChange = (event) => {
    setPalletQty(event.target.value);
    if (pallet === false) {
      setPalletQty("");
    }
  };
  const handleLidChange = (event) => {
    setLidQty(event.target.value);
    if (lid === false) {
      setLidQty("");
    }
  };
  const handleSideChange = (event) => {
    setSwQty(event.target.value);
    if (sw === false) {
      setSwQty("");
    }
  };
  const handleOpenChange = (event) => {
    setOpenQty(event.target.value);
    if (open === false) {
      setOpenQty("");
    }
  };
  const handleBoundChange = (event) => {
    setBoundQty(event.target.value);
    if (bound === false) {
      setBoundQty("");
    }
  };
  const handleRackChange = (event) => {
    setRackQty(event.target.value);
    if (rack === false) {
      setRackQty("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Handle other fields
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        {/* <h1 className="text-xl font-semibold mb-4">Create kit</h1> */}
        <div className="d-flex justify-content-end">
          {/* <h1 className="text-xl font-semibold mb-3">
            Create Kit
          </h1> */}
          <IoMdClose
            onClick={handleItem}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
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
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 uppercase"
              name="id"
              value={id}
              onChange={handleKitId}
              placeholder={"PLS0000/MMYY/0000"}
              required
            />
            {errors.id && <span className="error-text">{errors.id}</span>}
          </div>
          <div className="col-lg-3 col-md-6"></div>
          <div className="col-lg-3 col-md-6">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-ghost btn-lg text-sm col-xs-1"
                style={{ color: "blue" }}
                onClick={handleAssetOpen}
              >
                <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
                <span className="text-form text-base">ASSET</span>
              </button>
            </div>
            {errors.kitAssetDTO && (
              <span className="error-text">{errors.kitAssetDTO}</span>
            )}
          </div>
        </div>
        {kitAssetDTO.length > 0 && (
          <div
            className="w-full p-3 bg-base-100 shadow-xl"
            style={{ borderRadius: 16 }}
          >
            <div className="text-xl font-semibold p-2">Asset Details</div>
            <div className="divider mt-0 mb-0"></div>
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Quantity</th>
                    <th>Part/Insert</th>
                  </tr>
                </thead>
                <tbody>
                  {kitAssetDTO.map((asset, index) => (
                    <tr key={index}>
                      <td>{asset.assetCategory}</td>
                      <td>{asset.assetName}</td>
                      <td>{asset.assetCodeId}</td>
                      <td>{asset.quantity}</td>
                      <td>{asset.partQuantity}</td>
                      {/* Add more columns if needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* <div className="row">
          <div className="col-lg-3 col-md-3 mb-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Standard Asset
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-3">
            <FormControl fullWidth size="small">
              <InputLabel
                id="demo-multiple-chip-label"
                style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              >
                Standard Asset
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip-label"
                multiple
                value={standardName}
                onChange={handleStandardChip}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Standard Asset"
                  />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem
                  className="form-sz"
                  value={"Pallet"}
                  onClick={handlePallet}
                >
                  Pallet
                </MenuItem>
                <MenuItem className="form-sz" value={"Lid"} onClick={handleLid}>
                  Lid
                </MenuItem>
                <MenuItem
                  className="form-sz"
                  value={"Side Wall"}
                  onClick={handleSw}
                >
                  Side Wall
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col-lg-3 col-md-3">
            {pallet && (
              <>
                <label className="label">
                  <span
                    className={"label-text label-font-size text-base-content"}
                  >
                    Pallet Quantity
                  </span>
                </label>
              </>
            )}
            {lid && (
              <label className="label">
                <span
                  className={"label-text label-font-size text-base-content"}
                >
                  Lid Quantity
                </span>
              </label>
            )}
            {sw && (
              <label className="label">
                <span
                  className={"label-text label-font-size text-base-content"}
                >
                  Side Wall Quantity
                </span>
              </label>
            )}
          </div>
          <div className="col-lg-3 col-md-3">
            {pallet && (
              <>
                <input
                  className="form-control form-sz mb-2"
                  type={"number"}
                  value={palletQty}
                  onChange={handlePalletChange}
                  placeholder={""}
                  required
                />
              </>
            )}
            {lid && (
              <>
                <input
                  className="form-control form-sz mb-2"
                  type={"number"}
                  value={lidQty}
                  onChange={handleLidChange}
                  placeholder={""}
                  required
                />
              </>
            )}
            {sw && (
              <>
                <input
                  className="form-control form-sz mb-2"
                  type={"number"}
                  value={swQty}
                  onChange={handleSideChange}
                  placeholder={""}
                  required
                />
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Customize Asset
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-3">
            <FormControl fullWidth size="small">
              <InputLabel
                id="demo-multiple-chip-label"
                style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              >
                Customized Asset
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip-label"
                multiple
                value={personName}
                onChange={handleChangeChip}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Customized Asset"
                  />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  value={"Insert"}
                  onClick={handleOpen}
                >
                  Insert
                </MenuItem>
                <MenuItem
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  value={"PP Box"}
                  onClick={handleBound}
                >
                  PP Box
                </MenuItem>
                <MenuItem
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  value={"Sperated Sheets"}
                  onClick={handleRack}
                >
                  Sperated Sheets
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-lg-3 col-md-3">
            {open && (
              <>
                <label className="label">
                  <span
                    className={"label-text label-font-size text-base-content"}
                  >
                    Insert Quantity
                  </span>
                </label>
              </>
            )}
            {bound && (
              <>
                <label className="label">
                  <span
                    className={"label-text label-font-size text-base-content"}
                  >
                    PP Box Quantity
                  </span>
                </label>
              </>
            )}
            {rack && (
              <>
                <label className="label">
                  <span
                    className={"label-text label-font-size text-base-content"}
                  >
                    Sperated Sheets Quantity
                  </span>
                </label>
              </>
            )}
          </div>
          <div className="col-lg-3 col-md-3">
            {open && (
              <input
                style={{
                  height: 40,
                  fontSize: "0.800rem",
                  width: "100%",
                }}
                className="form-control mb-2"
                type={"number"}
                value={openQty}
                onChange={handleOpenChange}
                placeholder={""}
                required
              />
            )}
            {bound && (
              <input
                style={{
                  height: 40,
                  fontSize: "0.800rem",
                  width: "100%",
                }}
                className="form-control mb-2"
                type={"number"}
                value={boundQty}
                onChange={handleBoundChange}
                placeholder={""}
                required
              />
            )}
            {rack && (
              <input
                style={{
                  height: 40,
                  fontSize: "0.800rem",
                  width: "100%",
                }}
                className="form-control mb-2"
                type={"number"}
                value={rackQty}
                onChange={handleRackChange}
                placeholder={""}
                required
              />
            )}
          </div>
        </div> */}
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
        <br></br>
        {/* 
        {addKit && <KitSelection />} */}
      </div>
      {/* <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openCheck}
        onClose={handleClose}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Check Avalilability</DialogTitle>
          <IoMdClose
            onClick={handleClose}
            className="cursor-pointer w-8 h-8 mt-3 me-3"
          />
        </div>
        <DialogContent>
          <DialogContentText style={{ color: "#333", textAlign: "center" }}>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCube style={{ marginRight: "10px", color: "#4caf50" }} />{" "}
              Available Pallet Count:{" "}
              <span className="ml-2" style={{ color: "green" }}>
                50
              </span>
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaBox style={{ marginRight: "10px", color: "#ff9800" }} />{" "}
              Available Lid Count:{" "}
              <span className="ml-2" style={{ color: "orange" }}>
                10
              </span>
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCubes style={{ marginRight: "10px", color: "#2196f3" }} />{" "}
              Available Sidewall Count:{" "}
              <span className="ml-2" style={{ color: "red" }}>
                0
              </span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", padding: "10px", width: "100%" }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openAssetModal}
        onClose={handleAssetClose}
      >
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
              <div className="col-lg-3 col-md-3 mb-2">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row p-1"
                  }
                >
                  Type
                  <FaStarOfLife className="must" />
                </span>
              </div>
              <div className="col-lg-3 col-md-3 mb-2">
                <select
                  name="Select Asset"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="input input-bordered ps-2"
                  onChange={handleAssetCategoryChange}
                  value={assetCategory}
                >
                  <option value="" disabled>
                    Select an Asset Type
                  </option>
                  {assetCategoryVO.length > 0 &&
                    assetCategoryVO.map((list) => (
                      <option key={list.id} value={list}>
                        {list}
                      </option>
                    ))}
                </select>
                {errors.assetCategory && (
                  <span className="error-text">{errors.assetCategory}</span>
                )}
              </div>

              <div className="col-lg-3 col-md-3 mb-2">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row p-1"
                  }
                >
                  Name
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
                  {assetNameVO.length > 0 &&
                    assetNameVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))}
                </select>
                {errors.assetName && (
                  <span className="error-text">{errors.assetName}</span>
                )}
              </div>

              <div className="col-lg-3 col-md-3 mb-2">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row p-1"
                  }
                >
                  Code
                  <FaStarOfLife className="must" />
                </span>
              </div>
              <div className="col-lg-3 col-md-3 mb-2">
                <select
                  name="Select Asset"
                  style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
                  className="input input-bordered ps-2"
                  onChange={handleAsseCodeChange}
                  value={assetCodeId}
                >
                  <option value="" disabled>
                    Select an Asset Code
                  </option>
                  {assetCodeIdVO.length > 0 &&
                    assetCodeIdVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))}
                </select>
                {errors.assetCodeId && (
                  <span className="error-text">{errors.assetCodeId}</span>
                )}
              </div>
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
                  className="form-control form-sz mb-2"
                  name="assetQty"
                  value={assetQty}
                  onChange={handleQuantityChange}
                />
                {errors.assetQty && (
                  <span className="error-text">{errors.assetQty}</span>
                )}
              </div>
              {showPartQuantity && ( // Conditionally render the Part Quantity input field
                <>
                  <div className="col-lg-3 col-md-6 mb-2">
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
                  <div className="col-lg-3 col-md-6 mb-2">
                    <input
                      className="form-control form-sz mb-2"
                      name="partQuantity"
                      value={partQuantity}
                      onChange={handlePartQuantityChange}
                    />
                    {errors.partQuantity && (
                      <span className="error-text">{errors.partQuantity}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2 me-2">
          <Button onClick={handleAssetClose}>Cancel</Button>
          <Button
            component="label"
            variant="contained"
            onClick={handleAddAssetDetails}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItemGroups;
