import RecyclingIcon from "@mui/icons-material/Recycling";
import { Box, Typography } from "@mui/material";

function GoGreen() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#4CAF50", // Green background color
        color: "#4CAF50", // White text color
        padding: "5px",
        borderRadius: "8px",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
        maxWidth: "200px", // Limit width to avoid stretching on larger screens
        margin: "0 auto", // Center align horizontally
        marginBottom: "20px", // Add space below component
      }}
    >
      <RecyclingIcon sx={{ fontSize: 20, marginRight: 1, color: "green" }} />{" "}
      {/* Eco icon with size and margin */}
      <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        Go Green!
      </Typography>
    </Box>
  );
}

export default GoGreen;
