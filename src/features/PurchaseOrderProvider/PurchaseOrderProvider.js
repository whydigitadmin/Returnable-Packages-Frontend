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
import axios from "axios";
import dayjs from "dayjs";
import numberToWords from "number-to-words";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import PoList from "./PoList";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  border: "1px solid black", // Ensure borders are applied to all sides
  "@media print": {
    border: "1px solid black", // Ensure borders are visible when printing
  },
}));

const StyledTableCellActions = styled(StyledTableCell)(({ theme }) => ({
  "@media print": {
    display: "none", // hide Actions cell when printing
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "@media print": {
    border: "1px solid black", // Ensure borders are visible between rows when printing
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  "@media print": {
    borderCollapse: "collapse", // Merge adjacent borders
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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "@media print": {
    display: "none", // Hide the delete button when printing
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  "@media print": {
    display: "none", // Hide the add row button when printing
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  "@media print": {
    border: "1px solid black", // Border around the entire table container when printing
    boxShadow: "none", // Remove shadow when printing
  },
}));

const PurchaseOrder = React.forwardRef((props, ref) => {
  const {
    poNumber,
    setPoNumber,
    vendorAddress,
    setVendorAddress,
    deliveryAddress,
    setDeliveryAddress,
    items,
    handleItemChange,
    handleAddRow,
    handleDeleteRow,
    subtotal,
    setSubtotal,
    gstType,
    handleGstCalculation,
    setTermsAndConditions,
    termsAndConditions,
    isPrintMode,
    sgst,
    cgst,
    igst,
    total,
    companyAddress,
    setCompanyAddress,
    editMode,
  } = props;

  const formatWithIndianCurrency = (number) => {
    // Convert number to words

    // Format number for Indian currency (Lakhs and Crores)
    const formatIndianCurrency = (number) => {
      if (number === 0) return "zero";
      const crore = Math.floor(number / 10000000);
      const lakh = Math.floor((number % 10000000) / 100000);
      const thousand = Math.floor((number % 100000) / 1000);
      const remainder = number % 1000;

      let formatted = "";

      if (crore > 0) {
        formatted += `${numberToWords.toWords(crore)} crore`;
      }

      if (lakh > 0) {
        if (formatted) formatted += " ";
        formatted += `${numberToWords.toWords(lakh)} lakh`;
      }

      if (thousand > 0) {
        if (formatted) formatted += " ";
        formatted += `${numberToWords.toWords(thousand)} thousand`;
      }

      if (remainder > 0) {
        if (formatted) formatted += " ";
        formatted += `${numberToWords.toWords(remainder)}`;
      }

      return formatted.trim();
    };

    // Use the function to get the formatted total in words
    return formatIndianCurrency(number);
  };

  const totalInWordsIndianCurrency = formatWithIndianCurrency(total);
  return (
    <div>
      <div>
        <ToastContainer />
      </div>
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
                <Box sx={{ textAlign: "left" }}>
                  {/* <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    SCM AI-PACKS Private Limited
                  </Typography> */}
                  {/* <Typography variant="subtitle1">
                    #23/1, T C Palya Main road, Hoysala Nagar, Ramamurthy Nagar,
                    Bangalore - 560010, Karnataka.
                  </Typography>
                  <Typography variant="subtitle1">
                    GSTIN: 29ABMCS1982P1ZA
                  </Typography> */}
                  <StyledTextField
                    fullWidth
                    sx={{ fontWeight: "bold", mb: 1 }}
                    variant="outlined"
                    multiline
                    // disabled={editMode}
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  />
                </Box>
                <Grid item xs={5}></Grid>
              </Grid>

              {/* Right Box */}
              <Grid item xs={5} sx={{ textAlign: "right" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  PURCHASE ORDER
                </Typography>
                <StyledTextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={props.poNumber}
                  onChange={(e) => props.setPoNumber(e.target.value)}
                  sx={{
                    maxWidth: 130,
                    fontWeight: "bold",
                  }}
                />
                <br></br>
                <StyledTextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={props.poDate}
                  onChange={(e) => props.setPoDate(e.target.value)}
                  sx={{
                    maxWidth: 130,
                    fontWeight: "bold",
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                Vendor Address:
              </Typography>
              <StyledTextField
                fullWidth
                variant="outlined"
                multiline
                value={props.vendorAddress}
                onChange={(e) => props.setVendorAddress(e.target.value)}
                sx={{ mb: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                Deliver To:
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

          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table
              sx={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    S.No
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Item & Description
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Qty
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Rate
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Amount
                  </TableCell>
                  <StyledTableCellActions
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Actions
                  </StyledTableCellActions>
                </TableRow>
              </TableHead>

              <TableBody>
                {props.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: "1px solid black" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        multiline
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
                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        sx={{ width: 100 }}
                        size="small"
                        variant="outlined"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          props.handleItemChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        sx={{ width: 100 }}
                        size="small"
                        value={item.rate}
                        onChange={(e) =>
                          props.handleItemChange(index, "rate", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      {item.amount.toFixed(2)}
                    </TableCell>
                    <StyledTableCellActions sx={{ border: "1px solid black" }}>
                      <StyledIconButton
                        onClick={() => props.handleDeleteRow(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </StyledIconButton>
                    </StyledTableCellActions>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={props.handleAddRow}
            sx={{ mb: 3 }}
          >
            Add Row
          </StyledButton>

          {/* Calculation Section */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            {/* <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Sub Total:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ₹ {props.subTotal.toFixed(2)}
            </Typography>
          </Box> */}

            {/* GST Type Selection */}

            {/* GST Type Selection */}
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gstType === "inter"}
                    onChange={() => handleGstCalculation("inter")}
                  />
                }
                label="Inter GST"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gstType === "intra"}
                    onChange={() => handleGstCalculation("intra")}
                  />
                }
                label="Intra GST"
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box sx={{ textAlign: "left", maxWidth: 500 }}>
                  <Typography sx={{ fontWeight: "bold", mt: 10 }}>
                    Total in Words: ₹ {totalInWordsIndianCurrency} only
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: "right", mb: 3 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    Subtotal: ₹ {subtotal.toFixed(2)}
                  </Typography>
                  {gstType === "intra" && (
                    <>
                      <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                        SGST (9%): ₹ {sgst.toFixed(2)}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                        CGST (9%): ₹ {cgst.toFixed(2)}
                      </Typography>
                    </>
                  )}
                  {gstType === "inter" && (
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                      IGST (18%): ₹ {igst.toFixed(2)}
                    </Typography>
                  )}
                  <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                    Total: ₹ {total.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* GST Calculation Result */}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Terms & Conditions:
            </Typography>

            <StyledTextField
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              placeholder="Enter terms and conditions"
            />
          </Box>

          <Box sx={{ textAlign: "left", mt: 4 }}>
            <Typography variant="body1">
              Authorized Signature: ________________________________
            </Typography>
          </Box>

          {/* <Box
            sx={{ mt: 4 }}
            className="print-footer"
            data-po-number={poNumber}
          /> */}
        </Container>
      </Paper>
    </div>
  );
});

const PurchaseOrderProvider = () => {
  const componentRef = useRef();

  // State for editable fields
  const [vendorAddress, setVendorAddress] = useState(
    // "XYZ Packaging Solutions\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore\nGSTIN: 29AACCU1713L1ZY"
    ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    // "SCM AI-PACKS Private Limited\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore - 560010"
    ""
  );

  const [companyAddress, setCompanyAddress] = useState(
    "SCM AI-PACKS Private Limited\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore\nGSTIN: 29ABMCS1982P1ZA"
  );
  const [poNumber, setPoNumber] = useState("");
  const [poVo, setPoVo] = useState([]);
  const [poDate, setPoDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [items, setItems] = useState([
    {
      description: "",
      quantity: 0,
      rate: 0,
      amount: 0,
    },
  ]);

  const [editMode, setEditMode] = useState(false);

  const [termsAndConditions, setTermsAndConditions] =
    useState(`1. Delivery Period: All the material must be delivered from your works within 1 week from the date of the purchase order.
2. Payment Terms: 30 days from invoice submission through NEFT or check.
3. Inspection & Testing: Inspection and quality check to be carried out by AI-PACKS designated executives during material dispatch.
4. Statutory Requirements: NA`);
  const [subtotal, setSubtotal] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [total, setTotal] = useState(0);
  const [orgId, setOrgId] = useState(
    parseInt(window.localStorage.getItem("orgId"))
  );
  const [gstType, setGstType] = useState(""); // "inter" or "intra"
  const [igst, setIgst] = useState(0);
  const [poData, setPoData] = useState([]);
  const [listView, setListView] = useState(false);

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
    documentTitle: `Purchase_Order-${poNumber}`,
    onBeforeGetContent: () => {
      if (!poNumber || poNumber.trim() === "") {
        showErrorToast("PO Number is a mandatory field.");
        return Promise.reject(); // Prevent the print if PO Number is empty
      }
      return Promise.resolve();
    },
    onAfterPrint: () => {
      if (poNumber && poNumber.trim() !== "") {
        postInvoice(); // Call your function after printing
      }
    },
  });

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 0,
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
    if (field === "quantity" || field === "rate") {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    setItems(newItems);
  };
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
    setSubtotal(subtotal);

    if (gstType === "inter") {
      const igst = subtotal * 0.18;
      setIgst(igst);
      setTotal(subtotal + igst);
    } else if (gstType === "intra") {
      const cgst = subtotal * 0.09;
      const sgst = subtotal * 0.09;
      setCgst(cgst);
      setSgst(sgst);
      setTotal(subtotal + cgst + sgst);
    } else {
      setIgst(0);
      setCgst(0);
      setSgst(0);
      setTotal(subtotal);
    }
  }, [items, gstType]);

  useEffect(() => {
    getInvoiceData();
  }, []);

  const createFormData = () => {
    const data = {
      vendorAddress,
      deliveryAddress,
      companyAddress,
      poNumber,
      poDate,
      items, // Items can remain as an array
      termsAndConditions,
      subtotal,
      sgst,
      cgst,
      total,
      gstType,
      igst,
      ...(editMode && { id: poVo?.id }),
    };

    return data;
  };
  // Example usage:

  // You can now use `formData` to make an API request

  const postInvoice = () => {
    const formData = createFormData();

    if (formData) {
      const formDataWithOrgId = { ...formData, orgId };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/master/createUpdateInvoice`,
          formDataWithOrgId
        )
        .then((response) => {
          console.log("Response:", response.data);

          if (response.data.statusFlag === "Error") {
            // showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            showSuccessToast(
              editMode
                ? "PO Updated Successfully"
                : response.data.paramObjectsMap.message
            );
            getInvoiceData();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showErrorToast("An error occurred while posting the invoice.");
        });
    } else {
      showErrorToast("No invoice data to post.");
    }
  };

  const getInvoiceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllInvoiceByOrgId?orgId=${orgId}`
      );
      if (response.status === 200) {
        setPoData(response.data.paramObjectsMap.invoiceVO.reverse());
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleListView = () => {
    setListView(!listView);
  };
  useEffect(() => {
    if (poVo && editMode) {
      setVendorAddress(poVo.vendorAddress || "");
      setDeliveryAddress(poVo.deliveryAddress || "");
      setCompanyAddress(poVo.companyAddress || "");
      setPoNumber(poVo.poNumber || "");
      setPoDate(poVo.poDate || "");
      setItems(poVo.productLines || []);
      setTermsAndConditions(poVo.termsAndConditions || "");
      setSubtotal(poVo.subtotal || 0);
      setSgst(poVo.sgst || 0);
      setCgst(poVo.cgst || 0);
      setTotal(poVo.total || 0);
      setGstType(poVo.gstType || "");
      setIgst(poVo.igst || 0);
    }
  }, [poVo, editMode]);

  const handleNew = () => {
    setVendorAddress("");
    setDeliveryAddress("");
    setPoNumber("");
    setPoDate(dayjs().format("DD/MM/YYYY"));
    setItems([
      {
        description: "",
        quantity: 0,
        rate: 0,
        amount: 0,
      },
    ]);
    // setTermsAndConditions("");
    setSubtotal(0);
    setSgst(0);
    setCgst(0);
    setTotal(0);
    setGstType("");
    setIgst(0);
    setEditMode(false);
  };

  return (
    <Container style={{ width: "1060px" }}>
      <Box sx={{ textAlign: "left", mb: 3, gap: 2, mr: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 4 }}
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          color="primary"
          onClick={handleListView}
        >
          View
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          color="primary"
          onClick={handleNew}
        >
          New
        </Button>
      </Box>
      {listView ? (
        <PoList
          poData={poData}
          onListView={handleListView}
          setPoVo={setPoVo}
          setEditMode={setEditMode}
        />
      ) : (
        <div>
          <PurchaseOrder
            ref={componentRef}
            vendorAddress={vendorAddress}
            setVendorAddress={setVendorAddress}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            poNumber={poNumber}
            poDate={poDate}
            setPoNumber={setPoNumber}
            items={items}
            handleItemChange={handleItemChange}
            handleAddRow={handleAddRow}
            handleDeleteRow={handleDeleteRow}
            subtotal={subtotal}
            sgst={sgst}
            cgst={cgst}
            handleGstCalculation={handleGstCalculation}
            igst={igst}
            setSgst={setSgst}
            setCgst={setCgst}
            setIgst={setIgst}
            gstType={gstType}
            total={total}
            subTotal={subtotal}
            termsAndConditions={termsAndConditions}
            setTermsAndConditions={setTermsAndConditions}
            isPrintMode={isPrintMode}
            companyAddress={companyAddress}
            setCompanyAddress={setCompanyAddress}
            editMode={editMode}
          />
        </div>
      )}
    </Container>
  );
};

export default PurchaseOrderProvider;
