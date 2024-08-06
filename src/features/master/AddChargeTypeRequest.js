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

function AddChargeTypeRequest({ addItem, kitEditId }) {
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [chargeType, setChargeType] = useState("");
  const [chargeCode, setChargeCode] = useState("");
  const [product, setProduct] = useState("");
  const [chargeDescription, setChargeDescription] = useState("");
  const [localChargeDescription, setLocalChargeDescription] = useState("");
  const [sac, setSac] = useState("");
  const [sacDescription, setSacDescription] = useState("");
  const [salesAccount, setSalesAccount] = useState("");
  const [purchaseAccount, setPurchaseAccount] = useState("");
  const [taxable, setTaxable] = useState("");
  const [taxType, setTaxType] = useState("");
  const [ccFee, setCcFee] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [ccJob, setCcJob] = useState("");
  const [govtSAC, setGovtSAC] = useState("");
  const [exempted, setExempted] = useState("");
  const [gstTax, setGstTax] = useState("");
  const [gstControl, setGstControl] = useState("");
  const [service, setService] = useState("");
  const [type, setType] = useState("");
  const [active, setActive] = React.useState(true);
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );

  //   useEffect(() => {
  //     if (kitEditId) {
  //   getKitById();
  //     }
  //   }, [kitEditId]);

  const handleAddAssetDetails = () => {
    const errors = {};
    // if (!assetType) {
    //   errors.assetType = "Asset Type is required";
    // }

    if (Object.keys(errors).length === 0) {
    } else {
      setErrors(errors);
    }
  };

  // SAVE API
  //   const handleKitCreation = async () => {
  //     const errors = {};

  //     if (Object.keys(errors).length === 0) {
  //       try {
  //         if (response.data.status === "Error" || !response.data.status) {
  //           console.error("Error creating kit:", response.data.paramObjectsMap);
  //           toast.error("Kit creation failed!", {
  //             autoClose: 2000,
  //             theme: "colored",
  //           });
  //         } else {
  //           console.log("Kit created with successfully:", response.data);
  //           toast.success(
  //             "Kit " +
  //               response.data.paramObjectsMap.KitVO.kitNo +
  //               " created successfully!",
  //             {
  //               autoClose: 2000,
  //               theme: "colored",
  //             }
  //           );
  //           setTimeout(() => {
  //             // addItem(false);
  //           }, 2000);
  //         }
  //       } catch (error) {
  //         console.error("Error creating kit:", error);
  //         toast.error("Kit creation failed!", {
  //           autoClose: 2000,
  //           theme: "colored",
  //         });
  //       }
  //     } else {
  //       setErrors(errors);
  //     }
  //   };
  //   // UPDATE API
  //   const handleUpdateKit = async () => {
  //     const errors = {};

  //     if (Object.keys(errors).length === 0) {
  //       try {
  //         const kitData = {
  //           orgId,
  //           active,
  //           createdBy: userName,
  //         };
  //         const response = await axios.put(
  //           `${process.env.REACT_APP_API_URL}/api/master/updateKit`,
  //           kitData
  //         );
  //         if (response.data.status === "Error" || !response.data.status) {
  //           console.error("Error update kit:", response.data.paramObjectsMap);
  //           toast.error("Kit Updation failed!", {
  //             autoClose: 2000,
  //             theme: "colored",
  //           });
  //         } else {
  //           console.log("Kit Updated successfully:", response.data);

  //           toast.success(
  //             "Kit " +
  //               response.data.paramObjectsMap.KitVO.kitNo +
  //               " Updated successfully!",
  //             {
  //               autoClose: 2000,
  //               theme: "colored",
  //             }
  //           );
  //           // Add any further actions you want to take after successful kit creation
  //           setTimeout(() => {
  //             // handleItem();
  //           }, 3000);
  //         }
  //       } catch (error) {
  //         console.error("Error creating kit:", error);
  //         toast.error("Kit creation failed!", {
  //           autoClose: 2000,
  //           theme: "colored",
  //         });
  //       }
  //     } else {
  //       setErrors(errors);
  //     }
  //   };

  const handleItem = () => {
    // if (kitCode || partQuantity || kitAssetDTO > 0) {
    //   handleAssetOpen(true);
    // } else {
    //   handleAssetOpen(false);
    //   addItem(false);
    // }
    addItem(false);
  };
  const handleUserCreationClose = () => {
    addItem(false);
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
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Charge Type:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={chargeType}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a Charge Type
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.chargeType && (
              <span className="error-text">{errors.chargeType}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Charge Code:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="chargeCode"
              type="text"
              value={chargeCode}
              onChange={(e) => setChargeCode(e.target.value)}
            />
            {errors.chargeCode && (
              <span className="error-text">{errors.chargeCode}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Product:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={product}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a Product
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.product && (
              <span className="error-text">{errors.product}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Charge Description:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="chargeDescription"
              type="text"
              value={chargeDescription}
              onChange={(e) => setChargeDescription(e.target.value)}
            />
            {errors.chargeDescription && (
              <span className="error-text">{errors.chargeDescription}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Local Charge Description:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="localChargeDescription"
              type="text"
              value={localChargeDescription}
              onChange={(e) => setLocalChargeDescription(e.target.value)}
            />
            {errors.localChargeDescription && (
              <span className="error-text">
                {errors.localChargeDescription}
              </span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Service Account Code:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={sac}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a SAC
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.sac && <span className="error-text">{errors.sac}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                SAC Description:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="sacDescription"
              type="text"
              value={sacDescription}
              onChange={(e) => setSacDescription(e.target.value)}
            />
            {errors.sacDescription && (
              <span className="error-text">{errors.sacDescription}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Sales Account:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={salesAccount}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a Sales Account
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.salesAccount && (
              <span className="error-text">{errors.salesAccount}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Purchase Account:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={purchaseAccount}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a Purchase Account
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.purchaseAccount && (
              <span className="error-text">{errors.purchaseAccount}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Taxable:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="taxable"
              type="text"
              value={taxable}
              onChange={(e) => setTaxable(e.target.value)}
            />
            {errors.taxable && (
              <span className="error-text">{errors.taxable}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Tax Type:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={taxType}
            >
              <option value="" disabled>
                Select a Tax Type
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.taxType && (
              <span className="error-text">{errors.taxType}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                CC Fee Applicable:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="ccFee"
              type="text"
              value={ccFee}
              onChange={(e) => setCcFee(e.target.value)}
            />
            {errors.ccFee && <span className="error-text">{errors.ccFee}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Taxable %:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="taxPercentage"
              type="text"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
            />
            {errors.taxPercentage && (
              <span className="error-text">{errors.taxPercentage}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                CC Job:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="ccJob"
              type="text"
              value={ccJob}
              onChange={(e) => setCcJob(e.target.value)}
            />
            {errors.ccJob && <span className="error-text">{errors.ccJob}</span>}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Govt. SAC:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="govtSAC"
              type="text"
              value={govtSAC}
              onChange={(e) => setGovtSAC(e.target.value)}
            />
            {errors.govtSAC && (
              <span className="error-text">{errors.govtSAC}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Exempted:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={exempted}
            >
              <option value="" disabled>
                Select a Exempted
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.exempted && (
              <span className="error-text">{errors.exempted}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                GST Tax:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="gstTax"
              type="text"
              value={gstTax}
              onChange={(e) => setGstTax(e.target.value)}
            />
            {errors.gstTax && (
              <span className="error-text">{errors.gstTax}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                GST Control:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={gstControl}
            >
              <option value="" disabled>
                Select a GST Control
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.gstControl && (
              <span className="error-text">{errors.gstControl}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Service:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={service}
            >
              <option value="" disabled>
                Select a Service
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.service && (
              <span className="error-text">{errors.service}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Type:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={type}
            >
              <option value="" disabled>
                Select a Type
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.type && <span className="error-text">{errors.type}</span>}
          </div>
          {/* ACTIVE FIELD */}
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Active
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={active}
                  onChange={(e) => {
                    setActive(e.target.checked);
                  }}
                />
              }
            />
          </div>
        </div>
        {kitEditId ? (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              //   onClick={handleUpdateKit}
              className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="d-flex flex-row mt-3">
            <button
              type="button"
              //   onClick={handleKitCreation}
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
      {/* CLOSE CONFIRMATION MODAL
      <Dialog open={openConfirmationDialog}>
        <DialogContent>
          <p>Are you sure you want to close without saving changes?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>No</Button>
          <Button onClick={handleConfirmationYes}>Yes</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

export default AddChargeTypeRequest;
