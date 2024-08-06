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

function AddGroup({ addItem, kitEditId }) {
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [groupName, setGroupName] = useState("");
  const [gstTaxFlag, setGstTaxFlag] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [coaList, setCoaList] = useState("");
  const [account, setAccount] = useState("");
  const [type, setType] = useState("");
  const [interBranch, setInterBranch] = useState(true);
  const [control, setControl] = useState(true);
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [currency, setCurrency] = useState("");
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
                Group Name:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={groupName}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a Group Name
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.groupName && (
              <span className="error-text">{errors.groupName}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                GST Tax Flag:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={gstTaxFlag}
              // disabled={categorySelected}
            >
              <option value="" disabled>
                Select a GST Tax Flag
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.gstTaxFlag && (
              <span className="error-text">{errors.gstTaxFlag}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Account Code:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="accountCode"
              type="text"
              value={accountCode}
              onChange={(e) => setAccountCode(e.target.value)}
            />
            {errors.accountCode && (
              <span className="error-text">{errors.accountCode}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                COA List:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={coaList}
            >
              <option value="" disabled>
                Select a COA List
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.coaList && (
              <span className="error-text">{errors.coaList}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Account/ Group Name:
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <input
              className="form-control form-sz mb-2 p-2"
              name="account"
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            {errors.account && (
              <span className="error-text">{errors.account}</span>
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
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Interbranch A/c
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={interBranch}
                  onChange={(e) => {
                    setInterBranch(e.target.checked);
                  }}
                />
              }
            />
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <label className="label">
              <span className={"label-text label-font-size text-base-content"}>
                Control A/c
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={control}
                  onChange={(e) => {
                    setControl(e.target.checked);
                  }}
                />
              }
            />
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Category:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={category}
            >
              <option value="" disabled>
                Select a Category
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.category && (
              <span className="error-text">{errors.category}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Branch:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={branch}
            >
              <option value="" disabled>
                Select a Branch
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.branch && (
              <span className="error-text">{errors.branch}</span>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <label className="label">
              <span
                className={
                  "label-text label-font-size text-base-content d-flex flex-row"
                }
              >
                Currency:
                {/* <FaStarOfLife className="must" /> */}
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mt-2">
            <select
              className="form-select form-sz w-full mb-2"
              //   onChange={handleAssetCategoryChange}
              value={currency}
            >
              <option value="" disabled>
                Select a Currency
              </option>
              {/* {categoryVO.length > 0 &&
                    categoryVO.map((name) => (
                      <option key={name.id} value={name}>
                        {name}
                      </option>
                    ))} */}
              <option value="One">One</option>
            </select>
            {errors.currency && (
              <span className="error-text">{errors.currency}</span>
            )}
          </div>
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

export default AddGroup;
