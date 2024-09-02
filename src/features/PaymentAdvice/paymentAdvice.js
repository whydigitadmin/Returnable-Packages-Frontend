import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Container,
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

import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/system";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import PaymentAdviceList from "./PaymentAdviceList";

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

const PaymentAdviceFields = React.forwardRef((props, ref) => {
  const {
    setPaymentMode,
    setDate,
    items,
    handleItemChange,
    handleAddRow,
    handleDeleteRow,
    amount,
    companyAddress,
    setCompanyAddress,
    date,
    paymentMode,
    billerAddress,
    setBillerAddress,
    handlePaymentItemChange,
    paymentDetails,
    editMode,
  } = props;

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
          <Box sx={{ mb: 1 }}>
            <Box sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Payment Advice
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {/* Left Box */}
              <Grid item xs={2}>
                <img src="/AI_Packs.png" style={{ width: "100px" }}></img>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ textAlign: "left" }}>
                  <StyledTextField
                    fullWidth
                    sx={{ fontWeight: "bold" }}
                    variant="outlined"
                    multiline
                    // disabled={editMode}
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <StyledTextField
                fullWidth
                variant="outlined"
                multiline
                value={billerAddress}
                onChange={(e) => setBillerAddress(e.target.value)}
                sx={{ mb: 1, mt: 2 }}
              />
            </Grid>

            <Grid
              container
              xs={5}
              sx={{ textAlign: "right", justifyContent: "flex-end" }}
            >
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                  Date :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  sx={{
                    maxWidth: 170,
                    fontWeight: "bold",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                  Mode :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  sx={{
                    maxWidth: 170,
                    fontWeight: "bold",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ mt: 1, mb: 1 }}>
              Dear Sir/Madam,<br></br>
              Please find below the payment details
            </Typography>
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
                    Bill Reference
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Bill Date
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
                {items?.map((item, index) => (
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
                        value={item.billReference}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "billReference",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        sx={{ width: 130 }}
                        size="small"
                        variant="outlined"
                        value={item.date}
                        onChange={(e) =>
                          handleItemChange(index, "date", e.target.value)
                        }
                      />
                    </TableCell>

                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        sx={{ width: 130 }}
                        size="small"
                        type="number"
                        variant="outlined"
                        value={item.amount}
                        onChange={(e) =>
                          handleItemChange(index, "amount", e.target.value)
                        }
                      />
                    </TableCell>
                    <StyledTableCellActions sx={{ border: "1px solid black" }}>
                      <StyledIconButton
                        onClick={() => handleDeleteRow(index)}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3, // Adjust the bottom margin as needed
            }}
          >
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddRow}
            >
              Add Row
            </StyledButton>

            <Box sx={{ textAlign: "center", mr: 4 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Net Amount: ₹ {amount}
              </Typography>
            </Box>
          </Box>

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
                    Payment Mode
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Transfered To
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Instrument Details
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#7D797D", // Set your desired background color here
                    }}
                  >
                    Issued From
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
                </TableRow>
              </TableHead>

              <TableBody>
                {paymentDetails?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        sx={{ width: 150 }}
                        size="small"
                        variant="outlined"
                        multiline
                        value={item.paymentMode}
                        onChange={(e) =>
                          handlePaymentItemChange(
                            index,
                            "paymentMode",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <StyledTextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="A/C No"
                          value={item.accountNo}
                          onChange={(e) =>
                            handlePaymentItemChange(
                              index,
                              "accountNo",
                              e.target.value
                            )
                          }
                        />
                        <StyledTextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="Bank"
                          value={item.bank}
                          onChange={(e) =>
                            handlePaymentItemChange(
                              index,
                              "bank",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <StyledTextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="UTR Number"
                          value={item.utrNo}
                          onChange={(e) =>
                            handlePaymentItemChange(
                              index,
                              "utrNo",
                              e.target.value
                            )
                          }
                        />
                        {/* <Divider sx={{ border: "1px solid black" }} /> */}
                        <StyledTextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="Date"
                          value={item.paymentDate}
                          onChange={(e) =>
                            handlePaymentItemChange(
                              index,
                              "paymentDate",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        variant="outlined"
                        multiline
                        sx={{ width: 100 }}
                        size="small"
                        value={item.issuedFrom}
                        onChange={(e) =>
                          handlePaymentItemChange(
                            index,
                            "issuedFrom",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid black" }}>
                      <StyledTextField
                        fullWidth
                        variant="outlined"
                        multiline
                        sx={{ width: 100 }}
                        size="small"
                        value={item.paymentAmount}
                        onChange={(e) =>
                          handlePaymentItemChange(
                            index,
                            "paymentAmount",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Paper>
    </div>
  );
});

const PaymentAdvice = () => {
  const componentRef = useRef();

  // State for editable fields
  const [billerAddress, setBillerAddress] = useState(
    // "XYZ Packaging Solutions\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore\nGSTIN: 29AACCU1713L1ZY"
    ""
  );

  const [companyAddress, setCompanyAddress] = useState(
    "SCM AI-PACKS Private Limited\n#23/1, T C Palya Main road, Hoysala Nagar, Bangalore\nGSTIN: 29ABMCS1982P1ZA"
  );
  const [paymentMode, setPaymentMode] = useState("");
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [poVo, setPoVo] = useState([]);
  //   const [poDate, setPoDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [items, setItems] = useState([
    {
      billReference: "",
      poVo: "",
      amount: "",
    },
  ]);

  const [paymentDetails, setPaymentDetails] = useState([
    {
      paymentMode: "",
      accountNo: "",
      bank: "",
      utrNo: "",
      paymentDate: "",
      issuedFrom: "",
      paymentAmount: "",
    },
  ]);

  const [editMode, setEditMode] = useState(false);

  const [termsAndConditions, setTermsAndConditions] =
    useState(`1. Delivery Period: All the material must be delivered from your works within 1 week from the date of the purchase order.
2. Payment Terms: 30 days from invoice submission through NEFT or check.
3. Inspection & Testing: Inspection and quality check to be carried out by AI-PACKS designated executives during material dispatch.
4. Statutory Requirements: NA`);

  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [amount, setAmount] = useState("");
  const [orgId, setOrgId] = useState(
    parseInt(window.localStorage.getItem("orgId"))
  );
  const [gstType, setGstType] = useState(""); // "inter" or "intra"
  const [igst, setIgst] = useState(0);
  const [paymentAdviceData, setPaymentAdviceData] = useState([]);
  const [listView, setListView] = useState(false);

  // Function to handle GST calculation

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Payment-advise`,
    onBeforeGetContent: () => {
      if (!date || date.trim() === "") {
        showErrorToast("Date is a mandatory field.");
        return Promise.reject(); // Prevent the print if PO Number is empty
      }
      return Promise.resolve();
    },
  });

  const handleSave = () => {
    postInvoice();
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleDeleteRow = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);

    // Recalculate total
    const newTotal = newItems.reduce((sum, item) => {
      // Parse the amount as a float to ensure correct summation
      return sum + parseFloat(item.amount || "");
    }, 0);

    setAmount(newTotal);
  };

  const handlePaymentItemChange = (index, field, value) => {
    const newItems = [...paymentDetails];
    newItems[index][field] = value;

    setPaymentDetails(newItems);
  };
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    getInvoiceData();
  }, []);

  const createFormData = () => {
    const data = {
      billerAddress,
      companyAddress,
      paymentMode,
      date,

      paymentAdviceBillDetailsDTO: items, // Items can remain as an array

      amount,
      paymentAdviceDetailsDTO: paymentDetails,
      //   ...(editMode && { id: poVo?.id }),
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
          `${process.env.REACT_APP_API_URL}/api/master/createUpdatePaymentAdvice`,
          formDataWithOrgId
        )
        .then((response) => {
          console.log("Response:", response.data);

          if (response.data.statusFlag === "Error") {
            // showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            showSuccessToast(
              editMode
                ? "Payment Advice Updated Successfully"
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
        `${process.env.REACT_APP_API_URL}/api/master/getAllPaymentAdviceByOrgId?orgId=${orgId}`
      );
      if (response.status === 200) {
        setPaymentAdviceData(
          response.data.paramObjectsMap.paymentAdviceVO.reverse()
        );
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
      setBillerAddress(poVo.billerAddress || "");
      setCompanyAddress(poVo.companyAddress || "");
      setPaymentDetails(poVo.paymentAdviceDetailsVO || "");
      setPaymentMode(poVo.paymentMode || "");
      setDate(poVo.date || "");
      setItems(poVo.paymentAdviceBillDetailsVO || []);
      setAmount(poVo.amount || 0);
    }
  }, [poVo, editMode]);

  const handleNew = () => {
    setBillerAddress("");

    setPaymentDetails("");
    setPaymentMode("");

    setAmount("");
    setItems([
      {
        billReference: "",
        Date: "",
        amount: "",
      },
    ]);
    // setTermsAndConditions("");
    setPaymentDetails([
      {
        paymentMode: "",
        accountNo: "",
        bank: "",
        utrNo: "",
        paymentDate: "",
        issuedFrom: "",
        paymentAmount: "",
      },
    ]);
    setEditMode(false);
  };

  return (
    <Container style={{ maxWidth: 1060 }}>
      <Box sx={{ textAlign: "right", mb: 3, gap: 2 }}>
        {!listView && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            startIcon={<PrintIcon />} // Add icon here
          >
            Print
          </Button>
        )}
        {!listView && (
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<SaveIcon />} // Add icon here
          >
            Save
          </Button>
        )}
        <Button
          sx={{ ml: 1 }}
          variant="contained"
          color="primary"
          onClick={handleListView}
          startIcon={listView ? <AddIcon /> : <VisibilityIcon />} // Add icon here
        >
          {listView ? "New" : " View"}
        </Button>
        {!listView && (
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            color="primary"
            onClick={handleNew}
            startIcon={<AddIcon />} // Add icon here
          >
            New
          </Button>
        )}
      </Box>
      {listView ? (
        <PaymentAdviceList
          paymentAdviceData={paymentAdviceData}
          onListView={setListView}
          setPoVo={setPoVo}
          setEditMode={setEditMode}
        />
      ) : (
        <div>
          <PaymentAdviceFields
            ref={componentRef}
            billerAddress={billerAddress}
            setBillerAddress={setBillerAddress}
            paymentMode={paymentMode}
            date={date}
            setDate={setDate}
            setPaymentMode={setPaymentMode}
            items={items}
            setItems={setItems}
            handleItemChange={handleItemChange}
            handleAddRow={handleAddRow}
            handleDeleteRow={handleDeleteRow}
            amount={amount}
            companyAddress={companyAddress}
            setCompanyAddress={setCompanyAddress}
            editMode={editMode}
            paymentDetails={paymentDetails}
            handlePaymentItemChange={handlePaymentItemChange}
          />
        </div>
      )}
    </Container>
  );
};

export default PaymentAdvice;
