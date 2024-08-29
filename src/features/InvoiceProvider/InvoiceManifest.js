import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  border: "1px solid black",
  "@media print": {
    border: "1px solid black",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "@media print": {
    border: "1px solid black",
  },
}));
const StyledTable = styled(Table)(({ theme }) => ({
  "@media print": {
    border: "1px solid black",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  [`@media print`]: {
    border: "none",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      padding: 0,
    },
  },
}));

const StyledTableCellActions = styled(StyledTableCell)(({ theme }) => ({
  "@media print": {
    display: "none",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "@media print": {
    display: "none",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  "@media print": {
    display: "none",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  "@media print": {
    boxShadow: "none",
  },
}));

const PurchaseOrder = React.forwardRef((props, ref) => {
  return (
    <div style={{ maxWidth: 1060 }}>
      <Paper
        ref={ref}
        elevation={3}
        sx={{ padding: 4, fontFamily: "Roboto, sans-serif" }}
      >
        <Container>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              {/* Left Box */}
              <Grid item xs={2}>
                <img src="/AI_Packs.png" style={{ width: "150px" }}></img>
              </Grid>
              <Grid item xs={5}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  multiline
                  className="mt-3"
                  value={props.companyAddress}
                  onChange={(e) => props.setCompanyAddress(e.target.value)}
                  sx={{ mb: 1 }}
                />
              </Grid>

              {/* Right Box */}
              <Grid item xs={5} sx={{ textAlign: "right" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  INVOICE
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flexBasis: "30%", maxWidth: 200 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    Invoice No:
                  </Typography>
                  <StyledTextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={props.invoiceNumber}
                    onChange={(e) => props.setInvoiceNumber(e.target.value)}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>

                <Box sx={{ flexBasis: "30%", maxWidth: 200 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    Invoice Date:
                  </Typography>
                  <StyledTextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={props.invoiceDate}
                    onChange={(e) => props.setInvoiceDate(e.target.value)}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>

                <Box sx={{ flexBasis: "30%", maxWidth: 200 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    Terms:
                  </Typography>
                  <StyledTextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={props.terms}
                    onChange={(e) => props.setItems(e.target.value)}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>

                <Box sx={{ flexBasis: "30%", maxWidth: 200 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    Due Date:
                  </Typography>
                  <StyledTextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={props.dueDate}
                    onChange={(e) => props.setDueDate(e.target.value)}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>

                <Box sx={{ flexBasis: "30%", maxWidth: 200 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    Service Month:
                  </Typography>
                  <StyledTextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={props.serviceMonth}
                    onChange={(e) => props.setServiceMonth(e.target.value)}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Bill To
              </Typography>
              <StyledTextField
                fullWidth
                variant="outlined"
                multiline
                value={props.billTo}
                onChange={(e) => props.setBillTo(e.target.value)}
                sx={{ mb: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Ship To:
              </Typography>
              <StyledTextField
                fullWidth
                variant="outlined"
                multiline
                value={props.deliveryAddress}
                onChange={(e) => props.setDeliveryAddress(e.target.value)}
                sx={{ mb: 1 }}
              />
            </Grid>
          </Grid>

          <StyledTableContainer component={Paper} sx={{ mb: 3 }}>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Item & Description</StyledTableCell>
                  <StyledTableCell>Qty</StyledTableCell>
                  <StyledTableCell>Rate</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCellActions>Actions</StyledTableCellActions>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.items.map((item, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <StyledTextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={item.description}
                        onChange={(e) =>
                          props.handleItemChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <StyledTextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          props.handleItemChange(index, "qty", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <StyledTextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          props.handleItemChange(index, "rate", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>{item.amount.toFixed(2)}</TableCell>
                    <StyledTableCellActions>
                      <StyledIconButton
                        onClick={() => props.handleDeleteRow(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </StyledIconButton>
                    </StyledTableCellActions>
                  </StyledTableRow>
                ))}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>

          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={props.handleAddRow}
            sx={{ mb: 3 }}
          >
            Add Row
          </StyledButton>

          <Box sx={{ textAlign: "right", mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.gstType === "inter"}
                  onChange={() => props.handleGstCalculation("inter")}
                />
              }
              label="Inter GST"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.gstType === "intra"}
                  onChange={() => props.handleGstCalculation("intra")}
                />
              }
              label="Intra GST"
            />
          </Box>

          {/* GST Calculation Result */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              Subtotal: ₹ {props.subtotal.toFixed(2)}
            </Typography>
            {props.gstType === "intra" && (
              <>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  SGST (9%): ₹ {props.sgst.toFixed(2)}
                </Typography>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  CGST (9%): ₹ {props.cgst.toFixed(2)}
                </Typography>
              </>
            )}
            {props.gstType === "inter" && (
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                IGST (18%): ₹ {props.igst.toFixed(2)}
              </Typography>
            )}
            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              Total: ₹ {props.total.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Terms & Conditions:
            </Typography>
            <Typography variant="body2">
              1. The payment should be made by way of Account Payee Cheque /
              Demand Draft / NEFT / RTGS in the name of “SCM AIPACKS PVT LTD”
            </Typography>
            <Typography variant="body2">
              2. Any Discrepancy in the invoice shall be informed within 7 days
              of the invoice submission.
            </Typography>
            <Typography variant="body2">
              3. Interest at 2% p.m. or part thereof will be charged if the bill
              is not paid on the due date.
            </Typography>
            <Typography variant="body2">
              4. Any dispute is subject to Bangalore Jurisdiction.
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left", mt: 4, mb: 3 }}>
            <Typography variant="body1">
              Authorized Signature: ________________________________
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left", mb: 3 }}>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              Bank Name: KOTAK MAHINDRA BANK LIMITED
            </Typography>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              Account Name: SCM AIPACKS PVT LTD
            </Typography>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              Account No: 786786787
            </Typography>
            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              IFSC: KKBK675465
            </Typography>
          </Box>
        </Container>
      </Paper>
    </div>
  );
});

const InvoiceManifest = () => {
  const componentRef = useRef();

  // State for editable fields
  const [companyAddress, setCompanyAddress] = useState(
    "SCM AI-PACKS Private Limited\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore - 560010"
  );
  const [billTo, setBillTo] = useState(
    "XYZ Packaging Solutions\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore\nGSTIN: 29AACCU1713L1ZY"
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    "SCM AI-PACKS Private Limited\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore - 560010"
  );
  const [invoiceNumber, setInvoiceNumber] = useState("AIP/24-25/119");
  const [invoiceDate, setInvoiceDate] = useState("01/08/2024");
  const [terms, setTerms] = useState("Net 30");
  const [dueDate, setDueDate] = useState("01/09/2024");
  const [serviceMonth, setServiceMonth] = useState("June & July 2024");
  const [items, setItems] = useState([
    {
      description: "Item 1 Description",
      qty: 424,
      rate: 619.0,
      amount: 424 * 619.0,
    },
    {
      description: "Item 2 Description",
      qty: 1672,
      rate: 617.0,
      amount: 1672 * 617.0,
    },
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [total, setTotal] = useState(0);

  const [gstType, setGstType] = useState(""); // "inter" or "intra"
  const [igst, setIgst] = useState(0);

  // Function to handle GST calculation
  const handleGstCalculation = (type) => {
    setGstType(type);
    const gstRate = 0.18;
    const halfGstRate = gstRate / 2;

    let calculatedIgst = 0;
    let calculatedCgst = 0;
    let calculatedSgst = 0;

    if (type === "inter") {
      calculatedIgst = subtotal * gstRate;
      calculatedCgst = 0;
      calculatedSgst = 0;
    } else if (type === "intra") {
      calculatedIgst = 0;
      calculatedCgst = subtotal * halfGstRate;
      calculatedSgst = subtotal * halfGstRate;
    }

    setIgst(calculatedIgst);
    setCgst(calculatedCgst);
    setSgst(calculatedSgst);
    setTotal(subtotal + calculatedIgst + calculatedCgst + calculatedSgst);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Purchase_Order",
  });

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        description: "",
        qty: 0,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = newItems[index].qty * newItems[index].rate;
    setItems(newItems);
  };

  useEffect(() => {
    const calcSubtotal = items.reduce((acc, item) => acc + item.amount, 0);
    const calcSgst = calcSubtotal * 0.09;
    const calcCgst = calcSubtotal * 0.09;
    const calcTotal = calcSubtotal + calcSgst + calcCgst;
    setSubtotal(calcSubtotal);
    setSgst(calcSgst);
    setCgst(calcCgst);
    setTotal(calcTotal);
  }, [items]);

  return (
    <Container>
      <div className="text-right mb-3">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ mt: 3 }}
        >
          Print Invoice
        </Button>
      </div>

      <PurchaseOrder
        ref={componentRef}
        companyAddress={companyAddress}
        setCompanyAddress={setCompanyAddress}
        billTo={billTo}
        setBillTo={setBillTo}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
        invoiceDate={invoiceDate}
        setInvoiceDate={setInvoiceDate}
        terms={terms}
        setTerms={setTerms}
        dueDate={dueDate}
        setDueDate={setDueDate}
        serviceMonth={serviceMonth}
        setServiceMonth={setServiceMonth}
        items={items}
        handleItemChange={handleItemChange}
        handleDeleteRow={handleDeleteRow}
        handleAddRow={handleAddRow}
        subtotal={subtotal}
        sgst={sgst}
        cgst={cgst}
        igst={igst}
        gstType={gstType}
        total={total}
        handleGstCalculation={handleGstCalculation}
      />
    </Container>
  );
};

export default InvoiceManifest;
