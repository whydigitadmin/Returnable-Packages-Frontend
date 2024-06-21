import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { default as Axios, default as axios } from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stringAndNoAndSpecialCharValidation } from "../../utils/userInputValidation";

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

function AddAsset({ addItem, editItemId }) {
  const [value, setValue] = useState("");
  const [assetTypeVO, setAssetTypeVO] = useState([]);
  const [assetType, setAssetType] = useState([]);
  const [assetTypeSelected, setAssetTypeSelected] = useState(false);
  const [assetCodeId, setAssetCodeId] = useState("");
  const [category, setCategory] = useState("");
  const [categoryVO, setCategoryVO] = useState([]);
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryCode, setCategoryCode] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetQty, setAssetQty] = useState();
  const [length, setLength] = useState("");
  const [breath, setBreath] = useState("");
  const [brand, setBrand] = useState("");
  const [chargableWeight, setChargableWeight] = useState("");
  const [height, setHeight] = useState("");
  const [dimUnit, setDimUnit] = useState("");
  const [design, setDesign] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [emitter, setEmitter] = useState("");
  const [emitterCustomersVO, setEmitterCustomersVO] = useState([]);
  const [eanUpc, setEanUpc] = useState("");
  const [expectedLife, setExpectedLife] = useState("");
  const [expectedTrips, setExpectedTrips] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [id, setId] = useState("");
  const [maintanencePeriod, setMaintanencePeriod] = useState();
  const [manufacturePartCode, setManufacturePartCode] = useState("");
  const [materialIdentification, setMaterialIdentification] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [scrapValue, setScrapValue] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [skuTo, setSkuTo] = useState();
  const [skuFrom, setSkuFrom] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const [active, setActive] = React.useState(true);
  const [errors, setErrors] = useState({});
  const [warehouse, setWarehouse] = useState("");
  const [poVO, setPoVO] = useState([]);
  const [poNo, setPoNo] = useState("");
  const [poDate, setPoDate] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleAssetTypeChange = (event) => {
    const selectedCategory = event.target.value;
    setAssetType(selectedCategory);
    setCategory("");
    setCategoryCode("");
    setAssetTypeSelected(true);
    getAssetNamesByCategory(selectedCategory);
  };

  const handleAssetCategoryChange = (event) => {
    const selectedType = event.target.value;
    setCategory(selectedType);
    setCategorySelected(true);
    getAssetIdByName(event.target.value);
  };

  const handleEmitterChange = (event) => {
    setEmitter(event.target.value);
  };
  const handleMaterialChange = (event) => {
    setMaterialIdentification(event.target.value);
  };
  const handleDesignChange = (event) => {
    setDesign(event.target.value);
  };

  //   const handleAssetCodeChange = (event) => {
  //     const selectedAssetCodeId = event.target.value;
  //     console.log("Test", selectedAssetCodeId);
  //     setAssetCodeId(selectedAssetCodeId);
  //     setCodeSelected(true);

  //     // Check if a valid Asset Code is selected
  //     // if (selectedAssetCodeId) {
  //     //   setShowAssetQtyInput(true); // Show Asset Qty input
  //     // } else {
  //     //   setShowAssetQtyInput(false); // Hide Asset Qty input
  //     // }

  //     // if (selectedAssetCodeId) {
  //     //   setShowQuantity(false); // Show Asset Qty input
  //     // } else {
  //     //   setShowQuantity(true); // Hide Asset Qty input
  //     // }
  //     // Call function to fetch asset names based on the selected category
  //     getAssetDimById(selectedAssetCodeId);
  //   };

  //   const handleAssetCodeChange = (event) => {
  //     setCategoryCode(event.target.value);
  //     console.log("setCategoryCode", event.target.value);
  //   };

  useEffect(() => {
    getCustomersList();
    getAllAssetCategory();
    editItemId && getAssetNamesByCategory();
    getPOList();
    editItemId && getItemByAssetCode();
  }, []);

  const getItemByAssetCode = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAssetByOrgId?assetId=${editItemId}&orgId=${orgId}`
      );

      if (response.status === 200) {
        // setUserData(response.data.paramObjectsMap.userVO);
        console.log("Edit User Details", response.data.paramObjectsMap.assetVO);
        setId(response.data.paramObjectsMap.assetVO.id);
        setAssetType(response.data.paramObjectsMap.assetVO.assetType);
        setCategory(response.data.paramObjectsMap.assetVO.category);
        setCategoryCode(response.data.paramObjectsMap.assetVO.categoryCode);
        setAssetCodeId(response.data.paramObjectsMap.assetVO.assetCodeId);
        setAssetName(response.data.paramObjectsMap.assetVO.assetName);
        setLength(response.data.paramObjectsMap.assetVO.length);
        setBreath(response.data.paramObjectsMap.assetVO.breath);
        setEmitter(response.data.paramObjectsMap.assetVO.belongsTo);
        setDesign(response.data.paramObjectsMap.assetVO.design);
        if (response.data.paramObjectsMap.assetVO.active === "In-Active") {
          setActive(false);
        }
        setChargableWeight(
          response.data.paramObjectsMap.assetVO.chargableWeight
        );
        setHeight(response.data.paramObjectsMap.assetVO.height);
        setEanUpc(response.data.paramObjectsMap.assetVO.eanUpc);
        setMaterialIdentification(
          response.data.paramObjectsMap.assetVO.materialIdentification
        );
        setManufacturePartCode(
          response.data.paramObjectsMap.assetVO.manufacturePartCode
        );
        setWeight(response.data.paramObjectsMap.assetVO.weight);
        setValue(response.data.paramObjectsMap.assetVO.chargableWeight);
        setExpectedLife(response.data.paramObjectsMap.assetVO.expectedLife);
        setMaintanencePeriod(
          response.data.paramObjectsMap.assetVO.maintanencePeriod
        );
        setExpectedTrips(response.data.paramObjectsMap.assetVO.expectedTrips);
        setHsnCode(response.data.paramObjectsMap.assetVO.hsnCode);
        setTaxRate(response.data.paramObjectsMap.assetVO.taxRate);
        setCostPrice(response.data.paramObjectsMap.assetVO.costPrice);
        setSellPrice(response.data.paramObjectsMap.assetVO.sellPrice);
        setScrapValue(response.data.paramObjectsMap.assetVO.scrapValue);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPOList = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getPoNoByCreateAsset?orgId=${orgId}`
      );

      if (response.status === 200) {
        setPoVO(response.data.paramObjectsMap.pono);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllAssetCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllAssetCategory?orgId=${orgId}`
      );

      if (response.status === 200) {
        const assetCategories = response.data.paramObjectsMap.assetCategoryVO;
        setAssetTypeVO(assetCategories);
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
      if (response.status === 200) {
        setCategoryVO(response.data.paramObjectsMap.assetGroupVO.category);
        console.log(
          "Response from category:",
          response.data.paramObjectsMap.assetGroupVO.assetGroupVO.category
        );
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
      if (response.status === 200) {
        setCategoryCode(
          response.data.paramObjectsMap.assetGroupVO.categoryCode[0]
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   const getAssetDimById = async (category) => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/master/assetGroup`,
  //         {
  //           params: {
  //             orgId: orgId,
  //             assetCodeId: category,
  //           },
  //         }
  //       );
  //       console.log("Response from API:", response.data);
  //       if (response.status === 200) {
  //         setSkuFrom(response.data.paramObjectsMap.assetGroupVO.skuLatestCount);
  //         setManufacturerVO(response.data.paramObjectsMap.assetGroupVO.company);
  //         setBrandVO(response.data.paramObjectsMap.assetGroupVO.brand);
  //         const units = response.data.paramObjectsMap.assetGroupVO.assetGroupVO;

  //         if (units.length > 0) {
  //           setLength(units[0].length);
  //           setBreath(units[0].breath);
  //           setHeight(units[0].height);
  //           // setDimUnit(units[0].dimUnit);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   const calculateSkuTo = (assetQty, skuFrom) => {
  //     const calculatedSkuTo = parseInt(skuFrom) + parseInt(assetQty);
  //     return calculatedSkuTo;
  //   };

  const getCustomersList = async () => {
    try {
      const response = await Axios.get(
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

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      //   case "assetQty":
      //     setAssetQty(value);
      //     setSkuTo(calculateSkuTo(value, skuFrom));
      //     break;
      //   case "skuFrom":
      //     setSkuFrom(value);
      //     setSkuTo(calculateSkuTo(assetQty, value));
      //     break;
      //   case "skuTo":
      //     setSkuTo(value);
      //     break;
      case "assetName":
        setAssetName(value);
        break;
      case "assetCodeId":
        setAssetCodeId(value);
        break;
      case "value":
        setValue(value);
        break;
      case "length":
        setLength(value);
        break;
      case "breath":
        setBreath(value);
        break;
      case "chargableWeight":
        setChargableWeight(value);
        break;
      case "height":
        setHeight(value);
        break;
      // case "dimUnit":
      //   setDimUnit(value);
      //   break;
      case "costPrice":
        setCostPrice(value);
        break;
      case "manufacturePartCode":
        setManufacturePartCode(value);
        break;
      case "eanUpc":
        setEanUpc(value);
        break;
      case "expectedLife":
        setExpectedLife(value);
        break;
      case "expectedTrips":
        setExpectedTrips(value);
        break;
      case "hsnCode":
        setHsnCode(value);
        break;
      case "maintanencePeriod":
        setMaintanencePeriod(value);
        break;
      case "manufacturer":
        setManufacturer(value);
        break;
      case "scrapValue":
        setScrapValue(value);
        break;
      case "sellPrice":
        setSellPrice(value);
        break;
      case "taxRate":
        setTaxRate(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "weightUnit":
        setWeightUnit(value);
        break;
      case "poNo":
        setPoNo(value);
        const selectedPo = poVO.find((po) => po.pono === value);
        const selectedPoDate = selectedPo ? selectedPo.podate : ""; // Get the date of the selected PO
        setPoDate(selectedPoDate);
        break;
      case "poDate":
        setPoDate(value);
        break;
      case "orgId":
        setOrgId(value);
        break;
      // default:
      //   break;
    }
  };

  const handleAsset = () => {
    const errors = {};
    // if (!weight) {
    //   errors.weight = "Weight Name is required";
    // }
    if (!taxRate) {
      errors.taxRate = "Tax Rate is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        active,
        assetType,
        categoryCode,
        assetCodeId,
        assetName,
        category,
        belongsTo: emitter,
        brand,
        breath,
        chargableWeight,
        costPrice,
        design,
        dimUnit,
        eanUpc,
        expectedLife,
        expectedTrips,
        height,
        id,
        length,
        hsnCode,
        maintanencePeriod,
        manufacturePartCode,
        materialIdentification,
        manufacturer,
        scrapValue,
        sellPrice,
        taxRate,
        skuFrom,
        skuTo,
        weight,
        weightUnit,
        orgId,
        // poDate,
        // poNo,
        createdby: userName,
        modifiedby: userName,
      };
      Axios.post(`${process.env.REACT_APP_API_URL}/api/master/asset`, formData)
        .then((response) => {
          if (response.data.statusFlag === "Error") {
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
            addItem(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const handleUpdateAsset = () => {
    const errors = {};
    // if (!weight) {
    //   errors.weight = "Weight Name is required";
    // }
    if (!taxRate) {
      errors.taxRate = "Tax Rate is required";
    }
    if (Object.keys(errors).length === 0) {
      const formData = {
        active,
        assetType,
        categoryCode,
        assetCodeId,
        category,
        assetName,
        belongsTo: emitter,
        brand,
        breath,
        chargableWeight,
        costPrice,
        design,
        dimUnit,
        eanUpc,
        expectedLife,
        expectedTrips,
        height,
        id,
        length,
        hsnCode,
        maintanencePeriod,
        manufacturePartCode,
        materialIdentification,
        manufacturer,
        scrapValue,
        sellPrice,
        taxRate,
        skuFrom,
        skuTo,
        weight,
        weightUnit,
        createdby: userName,
        modifiedby: userName,
        orgId,
      };
      Axios.put(`${process.env.REACT_APP_API_URL}/api/master/asset`, formData)
        .then((response) => {
          if (response.data.statusFlag === "Error") {
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
              addItem(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const handleAssetClose = () => {
    if (
      warehouse ||
      assetType ||
      category > 0 ||
      assetCodeId > 0 ||
      categoryCode ||
      assetQty ||
      height ||
      skuFrom ||
      skuTo ||
      length ||
      breath ||
      chargableWeight ||
      height ||
      eanUpc ||
      weight ||
      value ||
      expectedLife ||
      expectedTrips ||
      hsnCode ||
      taxRate ||
      costPrice ||
      sellPrice ||
      scrapValue
    ) {
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

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleAssetClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex"
                }
              >
                Type
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleAssetTypeChange}
              value={assetType}
              // disabled={assetTypeSelected}
            >
              <option value="" disabled>
                Select an Type
              </option>
              {assetTypeVO.length > 0 &&
                assetTypeVO.map((list) => (
                  <option key={list.id} value={list.assetType}>
                    {list.assetType}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Category
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleAssetCategoryChange}
              value={category}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categoryVO.length > 0 &&
                categoryVO.map((name) => (
                  <option key={name.id} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span
                className={
                  " d-flex flex-row label-text label-font-size text-base-content"
                }
              >
                Category Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            {/* <select
              className="form-select form-sz w-full mb-2"
            //   onChange={handleAssetCodeChange}
              value={categoryCode}
              disabled
            >
              {categoryCodeVO.length > 0 &&
                categoryCodeVO.map((name) => (
                  <option key={name.id} value={name}>
                    {name}
                  </option>
                ))}
            </select> */}
            <input
              className="form-control form-sz mb-2"
              value={categoryCode}
              disabled
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
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
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <input
              className="form-control form-sz mb-2"
              name="assetCodeId"
              type="text"
              value={assetCodeId}
              onChange={handleCategoryChange}
              onInput={stringAndNoAndSpecialCharValidation}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
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
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <input
              className="form-control form-sz mb-2"
              name="assetName"
              type="text"
              value={assetName}
              onChange={handleCategoryChange}
              onInput={stringAndNoAndSpecialCharValidation}
            />
          </div>

          {/* <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Po No
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleCategoryChange}
              value={poNo}
              name="poNo"
            >
              <option value="" disabled>
                Select a Po No
              </option>
              {poVO.length > 0 &&
                poVO.map((name, index) => (
                  <option key={index} value={name.pono}>
                    {name.pono}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                PO Date <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <input
              className="form-control form-sz mb-2"
              disabled
              type={"text"}
              placeholder={""}
              name="poDate"
              value={poDate}
              onChange={handleCategoryChange}
            />
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={(e) => {
                    setActive(e.target.checked);
                  }}
                  checked={active}
                />
              }
            />
          </div>
        </div>

        {/* <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                SKU No FROM
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              disabled
              type={"number"}
              placeholder={""}
              name="skuFrom"
              value={skuFrom}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                SKU No TO
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              className="form-control form-sz mb-2"
              disabled
              type={"number"}
              placeholder={""}
              name="skuTo"
              value={skuTo}
              onChange={handleCategoryChange}
            />
          </div>
        </div> */}

        <h1 className="text-xl font-semibold my-2">Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mb-4">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Belongs to
                {/* <FaStarOfLife className="must" /> */}
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
          <div className="col-lg-3 col-md-6 mb-2 col-sm-4">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Size Identification
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-8 mb-2">
            <div className="d-flex flex-row">
              <input
                style={{ width: 46 }}
                name="length"
                type="number"
                value={length}
                placeholder={"L"}
                className="input mb-2 input-bordered p-1 form-sz"
                onChange={handleCategoryChange}
              />
              <span>
                <input
                  placeholder="X"
                  className="input mb-2 input-bordered disabled-input mx-1"
                  disabled
                />
              </span>
              <input
                style={{ width: 46 }}
                name="breath"
                value={breath}
                type="number"
                placeholder={"B"}
                className="input mb-2 p-1 input-bordered form-sz"
                onChange={handleCategoryChange}
              />
              <span>
                <input
                  placeholder="X"
                  className="input mb-2 input-bordered disabled-input mx-1"
                  disabled
                />
              </span>
              <input
                style={{ width: 46 }}
                name="height"
                value={height}
                type="number"
                placeholder={"H"}
                className="input mb-2 p-1 input-bordered form-sz"
                onChange={handleCategoryChange}
              />
              {/* <select
                name="dimUnit"
                style={{ width: 56 }}
                className="input mb-2 p-1 form-sz input-bordered ms-1"
                value={dimUnit}
                disabled
                onChange={handleUnitChange}
              >
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="feet">feet</option>
              </select> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content "}>
                Material identification
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              name="material"
              className="form-select form-sz w-full mb-2"
              value={materialIdentification}
              onChange={handleMaterialChange}
            >
              <option value="" disabled>
                Select a Material
              </option>
              <option value="Plastic">Plastic</option>
              <option value="Wooden">Wooden</option>
              <option value="Metal">Metal</option>
              <option value="Cardboard">Cardboard</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content "}>Design</span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              name="design"
              className="form-select form-sz w-full mb-2"
              value={design}
              onChange={handleDesignChange}
            >
              <option value="" disabled>
                Select a design
              </option>
              <option value="Only Sleeve foldable">Only Sleeve foldable</option>
              <option value="With pallet and foldable">
                With pallet and foldable
              </option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content "}>
                Manufacture part code
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="manufacturePartCode"
              type="text"
              value={manufacturePartCode}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text text-base-content "}>EAN/UPC</span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="eanUpc"
              type="number"
              value={eanUpc}
              onChange={handleCategoryChange}
            />
          </div>
          {/* <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Manufacturer
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              name="manufacturer"
              className="input mb-2 p-1 form-sz input-bordered w-full"
              value={manufacturer}
              onChange={handleManufacturerChange}
            >
              <option value="" disabled>
                Select an Manufacturer
              </option>
              {manufacturerVO.length > 0 &&
                manufacturerVO.map((name) => (
                  <option key={name.id} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Brand
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              name="Brand"
              className="input mb-2 form-sz input-bordered w-full"
              value={brand}
              onChange={handleBrandChange}
            >
              <option value="" disabled>
                Select an Brand
              </option>
              {brandVO.length > 0 &&
                brandVO.map((name) => (
                  <option key={name.id} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div> */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Gross Weight (kg)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                placeholder=""
                name="weight"
                type="number"
                className="input mb-2 input-bordered form-sz w-full"
                value={weight}
                onChange={handleCategoryChange}
              />
              {/* <select
                name="weightUnit"
                style={{ width: 60 }}
                className="input mb-2 p-1 input-bordered form-sz ms-1"
                value={weightUnit}
                onChange={handleWeightChange}
              >
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="g">g</option>
              </select> */}
            </div>
            {errors.weight && (
              <span className="error-text">{errors.weight}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content "}>
                Chargeable Weight (kg)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <div className="d-flex flex-row">
              <input
                value={chargableWeight}
                name="chargableWeight"
                placeholder={""}
                type="number"
                onChange={handleCategoryChange}
                className="input mb-2 form-sz input-bordered w-full"
              />
              {/* <select
                name="inch"
                style={{ height: 40, fontSize: "0.800rem", width: 60 }}
                className="input mb-2 p-1 input-bordered ms-1"
              >
                <option value="" disabled>
                  Unit
                </option>
                <option value="kg">kg</option>
                <option value="tonne">tonne</option>
                <option value="grams">grams</option>
              </select> */}
            </div>
          </div>
        </div>
        <h1 className="text-xl font-semibold my-2">Information</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Expected Life (Days)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="expectedLife"
              type="number"
              value={expectedLife}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Maintenance Period (Days)
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="maintanencePeriod"
              value={maintanencePeriod}
              type="number"
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Expected Trips
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="expectedTrips"
              type="number"
              value={expectedTrips}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                HSN Code
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="hsnCode"
              value={hsnCode}
              type="number"
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Tax Rate
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="taxRate"
              type="number"
              value={taxRate}
              onChange={handleCategoryChange}
            />
            {errors.taxRate && (
              <span className="error-text">{errors.taxRate}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Cost Price
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="costPrice"
              value={costPrice}
              type="number"
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Sell Price
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="sellPrice"
              value={sellPrice}
              type="number"
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Scrap Value
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <input
              placeholder=""
              className="input mb-2 input-bordered form-sz w-full"
              name="scrapValue"
              value={scrapValue}
              type="number"
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        {editItemId ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleUpdateAsset}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              onClick={handleAsset}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleAssetClose}
              className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

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

export default AddAsset;
