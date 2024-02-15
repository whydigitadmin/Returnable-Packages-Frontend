import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
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

function AddManufacturer({ addManufacturer }) {
  const [data, setData] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState();
  const [branch, setBranch] = useState();
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState(null);
  const [designation, setDesignation] = useState("");
  const [phoneNO, setPhone] = useState("");
  const [productionCapacity, setProductionCapacity] = useState("");
  const [notes, setNotes] = useState("");
  const [assetCategoryVO, setAssetCategoryVO] = useState([]);
  const [assetCategory, setAssetCategory] = useState("");
  const [assetCodeId, setAssetCodeId] = useState([]);
  const [assetCodeIdVO, setAssetCodeIdVO] = useState([]);
  const [assetName, setAssetName] = useState([]);
  const [assetNameVO, setAssetNameVO] = useState([]);
  const [brand, setBrand] = useState("");
  const [warranty, setWarranty] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [maintananceFrequency, setMaintananceFrequency] = useState("");
  const [productNotes, setProductNotes] = useState("");
  const [id, setId] = useState();
  const [active, setActive] = useState(true);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

  const handleCloseAddManufacturer = () => {
    addManufacturer(false);
  };

  useEffect(() => {
    getWareManufacture();
    getAllAssetCategory();
  }, []);

  const getWareManufacture = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/manufacturer?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        setData(response.data.paramObjectsMap.manufacturerVO);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAssetCategoryChange = (event) => {
    setAssetCategory(event.target.value);
    // Call function to fetch asset names based on the selected category
    getAssetNamesByCategory(event.target.value);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "company":
        setCompany(value);
        break;
      case "branch":
        setBranch(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "contactPerson":
        setContactPerson(value);
        break;
      case "designation":
        setDesignation(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "productionCapacity":
        setProductionCapacity(value);
        break;
      case "notes":
        setNotes(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "warranty":
        setWarranty(value);
        break;
      case "sellingPrice":
        setSellingPrice(value);
        break;
      case "leadTime":
        setLeadTime(value);
        break;
      case "maintananceFrequency":
        setMaintananceFrequency(value);
        break;
      case "productNotes":
        setProductNotes(value);
        break;
      // default:
      //   break;
    }
  };

  const handleManufacture = () => {
    const errors = {};

    if (!company) {
      errors.company = "Company Name is required";
    }
    if (!branch) {
      errors.branch = "branch is required";
    }
    if (!address) {
      errors.address = "address is required";
    }
    if (!email) {
      errors.email = "email is required";
    }
    if (!contactPerson) {
      errors.contactPerson = "ContactPerson is required";
    }
    if (!designation) {
      errors.designation = "Designation is required";
    }
    if (!phoneNO) {
      errors.phone = "Phone is required";
    }
    if (!productionCapacity) {
      errors.productionCapacity = "Production Capacity is required";
    }

    // if (!notes) {
    //   errors.notes = "Notes Capacity is required";
    // }

    if (Object.keys(errors).length === 0) {
      const formData = {
        assetCategory,
        assetCodeId,
        assetName,
        company,
        branch,
        address,
        contactPerson,
        designation,
        email,
        phoneNO,
        productionCapacity,
        id,
        manufacturerProductVO: [
          {
            active,
            assetCategory,
            assetCodeId,
            assetName,
            brand,
            id,
            leadTime,
            maintananceFrequency,
            notes: productNotes,
            orgId,
            sellingPrice,
            warranty,
          },
        ],
        notes,
        active,
        orgId,
      };

      console.log("test", formData);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/master/manufacturer`,
          formData
        )
        .then((response) => {
          console.log("Response:", response.data);
          addManufacturer(false);
          setCompany("");
          setBranch("");
          setAddress("");
          setContactPerson("");
          setDesignation("");
          setPhone("");
          setProductionCapacity("");
          setNotes("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If there are errors, update the state to display them
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-between">
          <h1 className="text-xl font-semibold mb-3">
            Manufacturer Basic Details
          </h1>
          <IoMdClose
            onClick={handleCloseAddManufacturer}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 my-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Company
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz"
              placeholder={""}
              name="company"
              value={company}
              onChange={handleInputChange}
            />
            {errors.company && (
              <span className="error-text">{errors.company}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 my-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Branch
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz"
              type={"text"}
              placeholder={""}
              name="branch"
              value={branch}
              onChange={handleInputChange}
            />
            {errors.branch && (
              <span className="error-text">{errors.branch}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Address
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz"
              placeholder={""}
              name="address"
              value={address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Email
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz"
              placeholder={""}
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Contact Person
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>

          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mt-2"
              placeholder={""}
              name="contactPerson"
              value={contactPerson}
              onChange={handleInputChange}
            />
            {errors.contactPerson && (
              <span className="error-text">{errors.contactPerson}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Designation
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mt-2"
              placeholder={""}
              name="designation"
              value={designation}
              onChange={handleInputChange}
            />
            {errors.designation && (
              <span className="error-text">{errors.designation}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Phone Number
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mt-2"
              placeholder={""}
              name="phone"
              value={phoneNO}
              onChange={handleInputChange}
            />
            {errors.phoneNO && (
              <span className="error-text">{errors.phoneNO}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Production Capacity
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              className="form-control form-sz mt-2"
              placeholder={""}
              name="productionCapacity"
              value={productionCapacity}
              onChange={handleInputChange}
            />
            {errors.productionCapacity && (
              <span className="error-text">{errors.productionCapacity}</span>
            )}
          </div>

          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Notes
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2 ">
            <textarea
              style={{ fontSize: "0.800rem" }}
              name="notes"
              value={notes}
              className="form-control w-full label"
              placeholder=""
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <label className="label mb-1">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-1">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>
        <h1 className="text-xl font-semibold my-3">Product Details</h1>
        <div className="row">
          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Asset Category
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
                Select an Asset Category
              </option>
              {assetCategoryVO.length > 0 &&
                assetCategoryVO.map((list) => (
                  <option key={list.id} value={list}>
                    {list}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Asset Name
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
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Asset Code
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
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Brand
              <FaStarOfLife className="must" />
            </span>
          </div>
          <div className="col-lg-3 col-md-3 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              value={brand}
              name="brand"
              placeholder={""}
              onChange={handleInputChange}
              className="form-control form-sz"
            />
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Warranty
              <FaStarOfLife className="must" />
            </span>
          </div>
          <div className="col-lg-3 col-md-3 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              name="warranty"
              value={warranty}
              placeholder={""}
              onChange={handleInputChange}
              className="form-control form-sz"
            />
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Selling Price
              <FaStarOfLife className="must" />
            </span>
          </div>
          <div className="col-lg-3 col-md-3 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type={"text"}
              name="sellingPrice"
              value={sellingPrice}
              placeholder={""}
              onChange={handleInputChange}
              className="form-control form-sz"
            />
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Del. Lead Time(Days)
              <FaStarOfLife className="must" />
            </span>
          </div>
          <div className="col-lg-3 col-md-3 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              name="leadTime"
              value={leadTime}
              placeholder={""}
              onChange={handleInputChange}
              className="form-control form-sz"
            />
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Maintenance Frequency(Days)
              <FaStarOfLife className="must" />
            </span>
          </div>
          <div className="col-lg-3 col-md-3 mb-2">
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              name="maintananceFrequency"
              value={maintananceFrequency}
              placeholder={""}
              onChange={handleInputChange}
              className="form-control form-sz"
            />
          </div>

          <div className="col-lg-3 col-md-3 mb-2">
            <span
              className={
                "label-text label-font-size text-base-content d-flex flex-row p-1"
              }
            >
              Product Notes
            </span>
          </div>
          <div className="col-lg-3 col-md-3 mb-2">
            <textarea
              value={productNotes}
              name="productNotes"
              style={{ fontSize: "0.800rem", width: "100%" }}
              className="form-control form-sz"
              placeholder=""
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        {/* <div className="d-flex justify-content-start">
          <button
            className="btn btn-ghost btn-lg text-sm col-xs-1 my-2"
            style={{ color: "blue" }}
            onClick={handleBillingOpen}
          >
            <IoIosAdd style={{ fontSize: 45, color: "blue" }} />
            <span className="text-form text-base">Product</span>
          </button>
        </div> */}
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={handleManufacture}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseAddManufacturer}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
        {/* <MaterialReactTable table={table} /> */}
      </div>
    </>
  );
}
export default AddManufacturer;
