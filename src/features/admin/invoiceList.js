import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

const InvoiceList = ({ invoices, onListView, setInvoiceVO }) => {
  const getInvoiceDataById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getInvoiceById?id=${id}`
      );
      if (response.status === 200) {
        const invoiceVO = response.data.paramObjectsMap.invoiceVO;

        // Set the id inside the invoiceVO object
        invoiceVO.id = id;

        setInvoiceVO(invoiceVO);
        onListView();

        // Remove existing invoiceData from localStorage
        window.localStorage.removeItem("invoiceData");

        // Storing the updated invoiceVO with id in localStorage
        window.localStorage.setItem("invoice", JSON.stringify(invoiceVO));
        window.location.reload();
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = (id) => {
    getInvoiceDataById(id);
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Typography variant="h6" style={{ padding: 20 }}>
        Invoice List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell>Client</TableCell>
            {/* Add other fields here */}
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell
                onClick={() => handleClick(invoice.id)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {invoice.poNo}
              </TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell>{invoice.invoiceDate}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              {/* Add other fields here */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceList;
