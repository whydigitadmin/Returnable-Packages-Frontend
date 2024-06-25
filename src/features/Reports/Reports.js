import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { Link } from "react-router-dom";

function Reports() {
  const reports = [
    {
      title: "Allotment",
      link: "/app/allotmentreport",
      icon: LuFileSpreadsheet,
    },
    {
      title: "Asset Tagging",
      link: "/app/assettaggingreport",
      icon: LuFileSpreadsheet,
    },
    {
      title: "Asset Stock Report",
      link: "/app/assetstockreport",
      icon: LuFileSpreadsheet,
    },
    { title: "Material Request", link: "", icon: LuFileSpreadsheet },
    { title: "DC-Outward", link: "", icon: LuFileSpreadsheet },
    { title: "DC-Expense", link: "", icon: LuFileSpreadsheet },
    { title: "DC-Lead", link: "", icon: LuFileSpreadsheet },
  ];

  const cardStyle = {
    backgroundColor: "#e8f0fe",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "80%",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  };

  const cardIconStyle = {
    width: "27px",
    height: "27px",
    marginRight: "10px",
  };

  return (
    <div className="container card w-full p-6 bg-base-100 shadow-xl">
      <Grid container spacing={3}>
        {reports.map((report, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Link to={report.link} style={{ textDecoration: "none" }}>
              <Card style={cardStyle}>
                <CardContent style={{ padding: "5px", marginTop: "5px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LuFileSpreadsheet className="m-1" style={cardIconStyle} />
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ fontSize: "1.1rem", marginTop: "3px" }}
                    >
                      {report.title}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Reports;
