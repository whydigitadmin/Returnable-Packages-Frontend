import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadingIcon from "@mui/icons-material/Downloading";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import BadgeWithIcon from "../../utils/BadgeWithIcon";

function InternalPage() {
  const dispatch = useDispatch();

  const [totAllotedReq, setTotAllotedReq] = useState("");
  const [totReq, setTotReq] = useState("");
  const [data, setData] = useState("");
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [loginUserId, setLoginUserId] = useState(
    localStorage.getItem("userId")
  );

  useEffect(() => {
    // dispatch(setPageTitle({ title: "Home" }));
    dispatch(setPageTitle({ title: "Dashboard" }));
    getAllBinAllotmentData();
    getAllBinRequest();
  }, [dispatch]);

  const getAllBinAllotmentData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getAllBinAllotmentByOrgId?orgId=${orgId}`
      );

      if (response.status === 200) {
        setTotAllotedReq(response.data.paramObjectsMap.binAllotmentNewVO);
        console.log(
          "TOTAL ALLOTED REQUEST COUNT:",
          response.data.paramObjectsMap.binAllotmentNewVO.length
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllBinRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequestreportByOrgId?OrgId=${orgId}&userId=${loginUserId}`
      );

      if (response.status === 200) {
        const allRequests = response.data.paramObjectsMap.issueRequestVO;
        setData(allRequests);

        const totalRequests = totAllotedReq + allRequests.length;
        setTotReq(totalRequests);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cardStyle = {
    width: "90%",
    backgroundColor: "#d2fbd0",
    marginBottom: "5px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: "10px",
  };

  const cardIconStyle = {
    width: "32px",
    height: "32px",
    marginRight: "10px",
  };

  const badgeContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div className="container card w-9/12 p-4 bg-white-800 shadow-xl">
      {/* <h1 className="text-2xl font-medium mb-4">Home</h1> */}
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <Link to="/app/binallotmentdetails">
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/issue.png"
                    alt="Bin Allotment"
                    style={cardIconStyle}
                  />
                  <h5 className="text-md font-semibold ">Bin Allotment</h5>
                </div>
                <div style={badgeContainerStyle}>
                  <BadgeWithIcon
                    badgeContent={data.length}
                    color="primary"
                    tooltipTitle="Pending Requests"
                    IconComponent={DownloadingIcon}
                    pendingReqData={data}
                    type="Pending"
                  />
                  <BadgeWithIcon
                    badgeContent={totAllotedReq.length}
                    color="primary"
                    tooltipTitle="Completed Requests"
                    completedReqData={totAllotedReq}
                    IconComponent={CheckCircleIcon}
                    type="Completed"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <Link to="">
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/issue.png"
                    alt="Bin Retrieval"
                    style={cardIconStyle}
                  />
                  <h5 className="text-md font-semibold ">
                    Bin Retrieval Inward
                  </h5>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <h1 className="text-xl font-semibold mt-4 mb-3 col-12">
          Asset Stock Transfer
        </h1>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <Link to="/app/inwardManifestDetails">
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/incoming.png"
                    alt="Asset Inward"
                    style={cardIconStyle}
                  />
                  <h5 className="text-md font-semibold ">Stock Transfer</h5>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* <div className="col-lg-6 col-md-6 col-sm-12">
          <Link to="/app/EmptyRetrievalManifest">
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/outgoing.png"
                    alt="Asset Outward"
                    style={cardIconStyle}
                  />
                  <h5 className="text-md font-semibold ">Asset Transfer</h5>
                </div>
              </div>
            </div>
          </Link>
        </div> */}

        <h1 className="text-xl font-semibold mt-4 mb-3 col-12">Reports</h1>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <Link to="/app/reports">
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src="/stock.png" alt="Report" style={cardIconStyle} />
                  <h5 className="text-md font-semibold ">Report</h5>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
