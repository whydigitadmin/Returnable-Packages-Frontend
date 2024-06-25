import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import FlowCardComponent from "../../utils/FlowTable";
import LineChartComponent from "../../utils/LineChart";
import PieChartComponent from "../../utils/PieChartComponent";

export const FlowCard = () => {
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

  const headersVolumeBased = [
    { label: "Flow Name", key: "flowName" },
    { label: "Emitter", key: "emitter" },
    { label: "Receiver", key: "receiver" },
    { label: "KIT No", key: "kitNo" },
    { label: "Pool Qty", key: "poolQty" },
    { label: "Budgeted Qty (Till Date)", key: "budgetedQty" },
    { label: "Actual Qty (Till Date)", key: "actualQty" },
    { label: "Performance %", key: "performance", align: "right" },
  ];

  const dataVolumeBased = [
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1102,
      poolQty: 100,
      budgetedQty: 20,
      actualQty: 30,
      performance: "150%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1103,
      poolQty: 40,
      budgetedQty: 10,
      actualQty: 8,
      performance: "80%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1104,
      poolQty: 80,
      budgetedQty: 20,
      actualQty: 18,
      performance: "90%",
    },
  ];

  const headersCycleTimeBased = [
    { label: "Flow Name", key: "flowName" },
    { label: "Emitter", key: "emitter" },
    { label: "Receiver", key: "receiver" },
    { label: "KIT No", key: "kitNo" },
    { label: "Cycle Time (Excl. Reverse logistics)", key: "cycleTime" },
    { label: "Actual Cycle Time", key: "actualCycleTime" },
    { label: "Performance %", key: "performance", align: "right" },
  ];
  const dataCycleTimeBased = [
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1102,
      cycleTime: 20,
      actualCycleTime: 22,
      performance: "91%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1103,
      cycleTime: 20,
      actualCycleTime: 15,
      performance: "60%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1104,
      cycleTime: 15,
      actualCycleTime: 10,
      performance: "150%",
    },
  ];
  const headersNoOfJobs = [
    { label: "Flow Name", key: "flowName" },
    { label: "Emitter", key: "emitter" },
    { label: "Receiver", key: "receiver" },
    { label: "KIT No", key: "kitNo" },
    { label: "No. of Issue", key: "noOfIssue" },
    { label: "No. of Dehire", key: "noOfDehire" },
    {
      label: "Issue Vs. Dehire Ratio",
      key: "issueVsDehireRatio",
      align: "right",
    },
  ];

  const dataNoOfJobs = [
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1102,
      noOfIssue: 10,
      noOfDehire: 5,
      issueVsDehireRatio: "200%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1103,
      noOfIssue: 4,
      noOfDehire: 3,
      issueVsDehireRatio: "133%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1104,
      noOfIssue: 10,
      noOfDehire: 12,
      issueVsDehireRatio: "83%",
    },
  ];

  const headersIssueQtyVsDehireQty = [
    { label: "Flow Name", key: "flowName" },
    { label: "Emitter", key: "emitter" },
    { label: "Receiver", key: "receiver" },
    { label: "KIT No", key: "kitNo" },
    { label: "Total Issue Qty", key: "totalIssueQty" },
    { label: "Total Retrieval Qty", key: "totalRetrievalQty" },
    { label: "Avg Retrieval Qty", key: "avgRetrievalQty" },
    { label: "Performance %", key: "performance", align: "right" },
  ];

  const dataIssueQtyVsDehireQty = [
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1102,
      totalIssueQty: 30,
      totalRetrievalQty: 25,
      avgRetrievalQty: 5,
      performance: "83%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1103,
      totalIssueQty: 8,
      totalRetrievalQty: 8,
      avgRetrievalQty: 2,
      performance: "100%",
    },
    {
      flowName: "GB DW - TATA PNQ",
      emitter: "Gabriel",
      receiver: "Tata",
      kitNo: 1104,
      totalIssueQty: 18,
      totalRetrievalQty: 12,
      avgRetrievalQty: 4,
      performance: "67%",
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
        `${process.env.REACT_APP_API_URL}/api/master/flow?orgId=${orgId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const kitCodes = response.data.paramObjectsMap.flowVO.map(
          (flow) => flow.flowName
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
        <div className="row mb-4">
          <div className="col-lg-2 col-md-6 mb-2">
            <label className="label">
              <span className="label-text text-md font-semibold text-base-content d-flex flex-row">
                Flow
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
                Select Flow
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

        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <LineChartComponent />
          </div>
          <div className="col-lg-6 col-md-12">
            <PieChartComponent />
          </div>
        </div>

        <div className="col-lg-12">
          {" "}
          <FlowCardComponent
            title="Volume Based"
            headers={headersVolumeBased}
            data={dataVolumeBased}
          />
        </div>

        <div className="col-lg-12">
          <FlowCardComponent
            title="Cycle Time Based"
            headers={headersCycleTimeBased}
            data={dataCycleTimeBased}
          />
          <FlowCardComponent
            title="No. of Jobs"
            headers={headersNoOfJobs}
            data={dataNoOfJobs}
          />
          <FlowCardComponent
            title="Issue Qty vs Dehire Qty"
            headers={headersIssueQtyVsDehireQty}
            data={dataIssueQtyVsDehireQty}
          />
        </div>
      </div>
    </div>
  );
};
