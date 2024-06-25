import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadingIcon from "@mui/icons-material/Downloading";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import BadgeWithIcon from "../../utils/BadgeWithIcon";

function InternalPage() {
  const dispatch = useDispatch();

  const [totAllotedReq, setTotAllotedReq] = useState([]);
  const [data, setData] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
  const [loginUserId, setLoginUserId] = useState(
    localStorage.getItem("userId")
  );

  useEffect(() => {
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
        setData(response.data.paramObjectsMap.issueRequestVO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cardStyle = {
    width: "100%",
    backgroundColor: "#d2fbd0",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    borderBottom: "1px solid #e0e0e0",
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
    <div className="container card w-full p-6 bg-base-100 shadow-xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Link
            to="/app/binallotmentdetails"
            style={{ textDecoration: "none" }}
          >
            <Card style={cardStyle}>
              <CardContent style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/issue.png"
                    alt="Bin Allotment"
                    style={cardIconStyle}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Bin Allotment
                  </Typography>
                </div>
                <div style={badgeContainerStyle}>
                  <BadgeWithIcon
                    badgeContent={data.length}
                    color="primary"
                    tooltipTitle="Pending Requests"
                    IconComponent={DownloadingIcon}
                    pendingReqData={data}
                    type="Pending"
                    page="Dashboard"
                  />
                  <BadgeWithIcon
                    badgeContent={totAllotedReq.length}
                    color="primary"
                    tooltipTitle="Completed Requests"
                    completedReqData={totAllotedReq}
                    IconComponent={CheckCircleIcon}
                    type="Completed"
                    page="DashboardCom"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to="/app/adminbinretrieval" style={{ textDecoration: "none" }}>
            <Card style={cardStyle}>
              <CardContent style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/issue.png"
                    alt="Bin Retrieval"
                    style={cardIconStyle}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Bin Retrieval Inward
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link
            to="/app/inwardManifestDetails"
            style={{ textDecoration: "none" }}
          >
            <Card style={cardStyle}>
              <CardContent style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/incoming.png"
                    alt="Asset Inward"
                    style={cardIconStyle}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Asset Stock Transfer
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to="/app/reports" style={{ textDecoration: "none" }}>
            <Card style={cardStyle}>
              <CardContent style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src="/stock.png" alt="Report" style={cardIconStyle} />
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Reports
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to="/app/KitCard" style={{ textDecoration: "none" }}>
            <Card style={cardStyle}>
              <CardContent style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/128/10468/10468543.png"
                    }
                    alt="Kit Card"
                    style={cardIconStyle}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Kit Card
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to="/app/FlowCard" style={{ textDecoration: "none" }}>
            <Card style={cardStyle}>
              <CardContent style={cardHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/128/10468/10468543.png"
                    }
                    alt="Flow Card"
                    style={cardIconStyle}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Flow Card
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default InternalPage;
