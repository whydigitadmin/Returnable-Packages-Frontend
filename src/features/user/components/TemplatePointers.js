import { Box, Typography } from "@mui/material";

function TemplatePointers() {
  return (
    <>
      {/* Copyright component */}
      <Box
        sx={{
          textAlign: "right",
          py: 1,
          px: 2,
          color: "black",
          // position: "absolute",
          color: "rgba(0, 0, 0, 0.8)",
          marginTop: "476px",
          // marginLeft: "200px",
          top: "20px",
          right: "20px",
          zIndex: 1000, // Ensure it appears above other content
        }}
      >
        {/* <Typography variant="body2" sx={{ fontSize: "12px" }}>
          Copyrights &copy; 2022 - {new Date().getFullYear()} WhyDigit. All
          Rights Reserved.
        </Typography> */}
        <img
          src="https://cdn-icons-png.flaticon.com/128/2391/2391092.png"
          width={25}
          height={25}
        ></img>{" "}
        &nbsp;
        {/* Eco icon with size and margin */}
        <Typography
          variant="body2"
          sx={{ fontSize: "13px", fontWeight: "bold", marginTop: "3px" }}
        >
          #GoGreen
        </Typography>
        {/* Additional Copyright details can be added here */}
      </Box>

      <Box
        sx={{
          textAlign: "right",
          py: 1,
          px: 2,
          color: "black",
          position: "absolute",
          color: "rgba(0, 0, 0, 0.6)",
          marginTop: "455px",
          marginLeft: "240px",
          top: "24px",
          right: "145px",
          zIndex: 1000, // Ensure it appears above other content
        }}
      >
        {/* <div style={{ fontSize: "13px", color: "green" }}>#Go Green</div> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#E8F5E9", // Light green background
            color: "green",
            padding: "10px 20px",
            // borderRadius: "8px",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "250px",
            // margin: "20px auto", // Center align horizontally
            textAlign: "center",
          }}
        >
          {/* <RecyclingIcon sx={{ fontSize: 20, color: "green" }} /> &nbsp; */}
          <img
            src="https://cdn-icons-png.flaticon.com/128/2391/2391092.png"
            width={25}
            height={25}
          ></img>{" "}
          &nbsp;
          {/* Eco icon with size and margin */}
          <Typography
            variant="body2"
            sx={{ fontSize: "13px", fontWeight: "bold", marginTop: "3px" }}
          >
            #GoGreen
          </Typography>
        </Box>
      </Box>
      {/* <GoGreen /> */}
      {/* <Box
        sx={{
          textAlign: "right",
          py: 1,
          px: 2,
          color: "rgba(0, 0, 0, 0.6)", // Use a slightly lighter color for opacity
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Typography variant="body2">
          &copy; 2022 - {new Date().getFullYear()} WhyDigits. All Rights Reserved.
        </Typography>
      </Box> */}
    </>
  );
}

export default TemplatePointers;
