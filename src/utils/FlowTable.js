import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const FlowCardComponent = ({ title, headers, data }) => {
  const getPerformanceStyle = (value) => {
    const numericValue = parseInt(value, 10);
    return {
      fontWeight: "bold",
      color: numericValue >= 100 ? "green" : "red",
    };
  };

  return (
    <Box my={2}>
      <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  align={header.align || "left"}
                  style={{ fontWeight: "bold" }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? "#fafafa" : "inherit",
                }}
              >
                {headers.map((header, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    align={header.align || "left"}
                    style={
                      header.key === "performance"
                        ? getPerformanceStyle(row[header.key])
                        : {}
                    }
                  >
                    {row[header.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FlowCardComponent;
