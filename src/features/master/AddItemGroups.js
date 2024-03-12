import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaStarOfLife } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { FaEdit, FaSave } from "react-icons/fa";

function AddItemGroups({ addItem }) {
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
    setPartQuantity("");
    setShowPartQuantity(false);
    setErrors({});
  };
  const handleKitId = (event) => {
    setId(event.target.value);
  };

  const handleQuantityEditChange = (event, index) => {
    const { value } = event.target;
    const updatedKitAssetDTO = [...kitAssetDTO];
    updatedKitAssetDTO[index].quantity = value;
    setKitAssetDTO(updatedKitAssetDTO);
  };

  const handlePartQuantityEditChange = (event, index) => {
    const { value } = event.target;
    const updatedKitAssetDTO = [...kitAssetDTO];
    updatedKitAssetDTO[index].partQuantity = value;
    setKitAssetDTO(updatedKitAssetDTO);
  };

  const handleQuantityChange = (event) => {
    setAssetQty(event.target.value);
  };
  const handlePartQuantityChange = (event) => {
    setPartQuantity(event.target.value);
  };

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

  const handleItem = () => {
    addItem(false);
  };

  const handleDeleteRow = (index) => {
    const updatedKitAssetDTO = [...kitAssetDTO];
    updatedKitAssetDTO.splice(index, 1);
    setKitAssetDTO(updatedKitAssetDTO);
  };

  const handleToggleEdit = (index) => {
    const updatedKitAssets = [...kitAssetDTO];
    updatedKitAssets[index].isEditable = true; // Set isEditable to true for the clicked row
    setKitAssetDTO(updatedKitAssets); // Update the state
  };

  // Function to save changes made in the input fields for a specific row
  const handleSaveRow = (index) => {
    const updatedKitAssets = [...kitAssetDTO];
    updatedKitAssets[index].isEditable = false; // Set isEditable to false for the clicked row
    setKitAssetDTO(updatedKitAssets); // Update the state
    // You may also want to handle saving the changes to the backend here
  };

  // const handleEditRow = (index) => {
  //   // Get the data of the selected row from kitAssetDTO
  //   const selectedAsset = kitAssetDTO[index];

  //   // Update the state variables with the data of the selected row
  //   setAssetCategory(selectedAsset.assetCategory);
  //   setAssetName(selectedAsset.assetName);
  //   setAssetCodeId(selectedAsset.assetCodeId);
  //   setAssetQty(selectedAsset.quantity);
  //   setPartQuantity(selectedAsset.partQuantity);

  //   // Open the Dialog box for editing
  //   setOpenAssetModal(true);
  // };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          <IoMdClose
            onClick={handleItem}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <label className="label mt-2">
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
              className="form-control form-sz mb-2 p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 uppercase"
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
                <img
                  src="/new.png"
                  alt="new-icon"
                  title="new"
                  style={{ width: 30, height: 30, margin: "auto", hover: "pointer" }} />
                <span className="text-form text-base" style={{ marginLeft: "10px" }}>Asset</span>
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
                    <th className="text-center">Type</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Code</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Part/Insert</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kitAssetDTO.map((asset, index) => (
                    <tr key={index}>
                      <td className="text-center">{asset.assetCategory}</td>
                      <td className="text-center">{asset.assetName}</td>
                      <td className="text-center">{asset.assetCodeId}</td>
                      <td className="text-center">
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
                      <td className="text-center">
                        {asset.isEditable ? (
                          <input
                            type="number"
                            value={asset.partQuantity}
                            onChange={(e) =>
                              handlePartQuantityEditChange(e, index)
                            }
                            className="form-control"
                            style={{
                              width: "100px",
                              padding: "6px",
                              textAlign: "center",
                            }}
                          />
                        ) : (
                          asset.partQuantity
                        )}
                      </td>
                      <div className="d-flex">
                        <div className="col-4 text-center">
                          <td>
                            {asset.isEditable ? (
                              <FaSave
                                onClick={() => handleSaveRow(index)}
                                className="cursor-pointer w-6 h-6"
                                style={{ marginLeft: 10 }}
                              />
                            ) : (
                              <FaEdit
                                onClick={() => handleToggleEdit(index)}
                                className="cursor-pointer w-6 h-6"
                                style={{ marginLeft: 10 }}
                              />
                            )}
                            {/* <br /> */}
                          </td>
                        </div>
                        <div className="col-8 text-center">
                          <td>
                            <FaTrash
                              onClick={() => handleDeleteRow(index)}
                              className="cursor-pointer w-6 h-6"
                              style={{ marginLeft: 10 }}
                            />
                          </td>
                        </div>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
      </div>
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
          {/* <Button onClick={handleAssetClose}>Cancel</Button> */}
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
