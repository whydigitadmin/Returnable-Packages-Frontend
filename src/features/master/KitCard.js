import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import PerformanceCharts from "../charts/components/PerformanceChart";
import PieChart from "../charts/components/PieChart";
import RatioComponent from "../charts/components/RatioComponent";

export const KitCard = () => {
  const [kitCode, setKitCode] = useState("");
  const [errors, setErrors] = useState({});
  const [kitData, setKitData] = useState(null);
  const [emitterData, setEmitterData] = useState([]);
  const [kitVO, setKitVO] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));

  const ratioData = [
    { id: 1, title: "Allotment vs Request", value1: 40, value2: 60 },
    { id: 2, title: "Bin's Allotted vs Bins' Request", value1: 80, value2: 20 },
  ];

  const dummyAssets = [
    {
      assetName: "PALLET",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWn58GsDht5XZiUJAqzQQXdIaPuznQ3QCb-A&usqp=CAU",
    },
    {
      assetName: "LID",
      imageUrl:
        "https://https://static.wixstatic.com/media/73b018_db17d09a…l_c,q_85,usm_0.66_1.00_0.01,enc_auto/Picture1.png.com/asset2.jpg",
    },
    {
      assetName: "SIDEWALL",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ZWDbdcChmgZ_h3CWKPdQKAXC5vBNztPOdw&usqp=CAU",
    },
    {
      assetName: "NoImage",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&usqp=CAU",
    },
  ];

  const handleInputChange = (event) => {
    const { value } = event.target;
    setKitCode(value);
    setErrors({});
  };

  useEffect(() => {
    getAllKit();
  }, []);

  const getAllKit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getallkit?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const kitCodes = response.data.paramObjectsMap.KitVO.map(
          (kit) => kit.kitNo
        );
        setKitVO(kitCodes);
        console.log("kitCodes", kitCodes);
        // Handle success
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = () => {
    setErrors({});
    if (!kitCode) {
      setErrors({ kitCode: "Kit code is required" });
      return;
    }
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/master/kitDetails?kitName=${kitCode}`
      )
      .then((response) => {
        setKitData(response.data.paramObjectsMap.KitVO);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/master/getEmitterAndReceiverByKitNo?kitNo=${kitCode}`
      )
      .then((response) => {
        setEmitterData(response.data.paramObjectsMap.emitterDetails);
        console.log("emitter", response.data.paramObjectsMap.emitterDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getCategoryColor = (assetCategory) => {
    switch (assetCategory) {
      case "Category A":
        return "bg-blue-500"; // Example color class for Category A
      case "Category B":
        return "bg-green-500"; // Example color class for Category B
      case "Category C":
        return "bg-yellow-500"; // Example color class for Category C
      default:
        return "bg-green-100"; // Default color if category doesn't match
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row">
          <div className="col-lg-2 col-md-6 mb-2">
            <label className="label">
              <span className="label-text text-md font-semibold text-base-content d-flex flex-row">
                Kit Code
                <FaStarOfLife className="must" />
              </span>
            </label>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <select
              className="form-select form-sz w-full mb-2"
              onChange={handleInputChange}
              value={kitCode}
              name="kit"
              // disabled={codeSelected}
            >
              <option value="" disabled>
                {" "}
                Select kit
              </option>
              {kitVO &&
                kitVO.map((kitCode, index) => (
                  <option key={index} value={kitCode}>
                    {kitCode}
                  </option>
                ))}
            </select>
            {errors.kitCode && (
              <div className="error-text">{errors.kitCode}</div>
            )}
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <button
              type="button"
              onClick={handleSave}
              style={{
                backgroundColor: "#3b71ca",
                padding: "8px 24px",
                fontSize: "14px",
                color: "white",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 4px 9px -4px rgba(59,113,202,0.3),0 4px 18px 0 rgba(59,113,202,0.2)",
                transition:
                  "background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
              }}
            >
              Search
            </button>
          </div>
        </div>
        {kitData && (
          <div className="d-flex flex-row">
            <label className="label">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
                Part Qty:
              </span>
            </label>
            <span className="dark:text-slate-300 text-left font-semibold mt-2 ms-1">
              {kitData.partQty}
            </span>
          </div>
        )}
        <div>
          {kitData && (
            <div className="d-flex flex-wrap col-md-12 gap-2 ">
              <div className="overflow-x-auto col-md-4 mt-2 bg-white border rounded-lg overflow-hidden shadow-md flex-grow-1 m-2">
                <table className="table w-full table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="font-semibold text-md">Asset Category</th>
                      <th className="font-semibold text-md">Asset Code</th>
                      <th className="font-semibold text-md">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kitData.kitAssetVO.map((asset, index) => {
                      const dummyAsset = dummyAssets.find(
                        (dummy) => dummy.assetName === asset.assetName
                      );
                      const imageUrl = dummyAsset
                        ? dummyAsset.imageUrl
                        : dummyAssets.find(
                            (asset) => asset.assetName === "NoImage"
                          ).imageUrl;

                      return (
                        <tr key={asset.id}>
                          <td>
                            <span
                              className={`badge ${getCategoryColor(
                                asset.assetCategory
                              )} text-sm text-green-800 border-none  text-xs font-semibold`}
                            >
                              {asset.assetCategory}
                            </span>
                          </td>
                          <td>{asset.assetCodeId}</td>
                          <td>{asset.quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto col-md-4 mt-2">
                <div className="">
                  <RatioComponent />
                </div>
              </div>
              <div className="d-flex flex-wrap flex-direction-row col-md-12 mt-2">
                {emitterData.length > 0 && (
                  <div className="d-flex flex-wrap col-md-12 mt-2">
                    {emitterData.map((kit, index) => (
                      <div
                        key={index}
                        className="bg-white border rounded-lg overflow-hidden shadow-md m-2"
                        style={{
                          flexBasis: "calc(33.3333% - 16px)",
                          flexGrow: 1,
                        }}
                      >
                        <div className="p-3">
                          <h3 className="text-md font-semibold mb-2">
                            PARTIES
                          </h3>
                          <div className="mb-2">
                            <p className="text-gray-600">
                              <span className="text-sm font-semibold">
                                Emitter:
                              </span>{" "}
                              <span className="text-sm">{kit.emitter}</span>
                            </p>
                            <p className="text-gray-600">
                              <span className="text-sm font-semibold">
                                Receiver:
                              </span>{" "}
                              <span className="text-sm">{kit.receiver}</span>
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold text-sm">
                                Flow:
                              </span>{" "}
                              <span className="text-sm">{kit.flow}</span>
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-200 text-yellow-800 rounded-full">
                                Min Dehire Qty: 15
                              </span>
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-200 text-blue-800 rounded-full">
                                Min Issue Qty: 20
                              </span>
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-200 text-green-800 rounded-full">
                                Kit Rotation: 40
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {kitData && (
            <div className="d-flex flex-direction-row gap-2">
              <div className="col-md-6">
                <PieChart />
              </div>
              {/* <div className="col-md-1"></div> */}
              <div className="col-md-6">
                <PerformanceCharts />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
