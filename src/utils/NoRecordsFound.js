import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const NoRecordsFound = ({ message }) => {
  return (
    <Box
      textAlign="center"
      mt={3}
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/128/3812/3812094.png"
        style={{ margin: "auto", marginBottom: "10px" }}
        width={40}
        height={40}
        alt="No Record Icon"
      />
      <Typography variant="h6" color="textSecondary">
        <h6 style={{ fontSize: "12px" }}>{message}</h6>
      </Typography>
    </Box>
  );
};

NoRecordsFound.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoRecordsFound;
