import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";

export const KitCard = () => {
  const [kitCode, setKitCode] = useState("");
  const [errors, setErrors] = useState({});
  const [kitData, setKitData] = useState(null);
  const [emitterData, setEmitterData] = useState([]);
  const [kitVO, setKitVO] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));

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

  return (
    <div style={{ width: "100%" }}>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="row">
          <div className="col-lg-2 col-md-6 mb-2">
            <label className="label">
              <span className="label-text label-font-size text-base-content d-flex flex-row">
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
                Part Quantity:
              </span>
            </label>
            <span className="dark:text-slate-300 text-left font-semibold mt-2 ms-1">
              {kitData.partQty}
            </span>
          </div>
        )}
        <div>
          {kitData && (
            <div className="overflow-x-auto w-full mt-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Asset Category</th>
                    <th>Asset Code</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {kitData.kitAssetVO.map((asset, index) => {
                    // Find the corresponding dummy asset for the current asset
                    const dummyAsset = dummyAssets.find(
                      (dummy) => dummy.assetName === asset.assetName
                    );

                    // Set the image URL based on whether a corresponding dummy asset was found
                    const imageUrl = dummyAsset
                      ? dummyAsset.imageUrl
                      : dummyAssets.find(
                          (asset) => asset.assetName === "NoImage"
                        ).imageUrl;

                    return (
                      <tr key={asset.id}>
                        <td style={{ position: "relative" }}>
                          <img
                            src={imageUrl}
                            alt="Mechanical Image"
                            style={{
                              width: "50px",
                              height: "50px",
                            }}
                            onMouseEnter={() => setHoveredImage(imageUrl)}
                            onMouseLeave={() => setHoveredImage(null)}
                          />
                        </td>
                        <td>{asset.assetCategory}</td>
                        <td>{asset.assetCodeId}</td>
                        <td>{asset.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {emitterData.length > 0 && (
            <div className="overflow-x-auto w-full mt-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Emitter</th>
                    <th>Receiver</th>
                    <th>Flow</th>
                  </tr>
                </thead>
                <tbody>
                  {emitterData.map((kit) => {
                    return (
                      <tr key={kit.id}>
                        <td>{kit.emitter}</td>
                        <td>{kit.receiver}</td>
                        <td>{kit.flow}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
