import axios from "axios";
import React, { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";

export const KitCard = () => {
  const [kitCode, setKitCode] = useState("");
  const [errors, setErrors] = useState({});
  const [kitData, setKitData] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  const imgAssets = [
    "https://www.vidhataindia.com/wp-content/uploads/2017/11/SlideImg3.png",
    "https://media.istockphoto.com/id/528918828/photo/automotive-engine-3d-illustration.jpg?s=612x612&w=0&k=20&c=M8AZRuzrAK-aVAY_Gf5PaVjgbQ8PCqAmxeJH64Jsb28=",
  ];

  const handleInputChange = (event) => {
    const { value } = event.target;
    setKitCode(value);
    setErrors({});
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
            <input
              style={{ height: 40, fontSize: "0.800rem", width: "100%" }}
              type="text"
              value={kitCode}
              name="kit"
              onChange={handleInputChange}
              className="input input-bordered p-2"
            />
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
          <div className="overflow-x-auto w-full mt-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Asset Category</th>
                  <th>Asset Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {kitData.kitAssetVO.map((asset, index) => (
                  <tr key={asset.id}>
                    <td style={{ position: "relative" }}>
                      <img
                        src={imgAssets[index % imgAssets.length]}
                        alt="Mechanical Image"
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                        onMouseEnter={() =>
                          setHoveredImage(imgAssets[index % imgAssets.length])
                        }
                        onMouseLeave={() => setHoveredImage(null)}
                      />
                    </td>
                    <td>{asset.assetCategory}</td>
                    <td>{asset.assetName}</td>
                    <td>{asset.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
