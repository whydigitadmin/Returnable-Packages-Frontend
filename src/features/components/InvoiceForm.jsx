import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import incrementString from "../../utils/incrementString";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [todayDate, setTodayDate] = useState(today);
  const [vendorId, setVendorId] = useState("");
  const [vendor, setVendor] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const [vendorGst, setVendorGst] = useState("");
  const [shipTo, setShipTo] = useState("");
  const [shipToRemarks, setShipToRemarks] = useState("");
  const [gstType, setGstType] = useState("");
  const [iGst, setIGst] = useState("");
  const [cGst, setCGst] = useState("");
  const [sGst, setSGst] = useState("");
  const [terms, setTerms] = useState("");
  const [termsCode, setTermsCode] = useState("");
  const [errors, setErrors] = React.useState({});

  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      descripition: "",
      hsncode: "",
      qty: "",
      rate: "",
      currency: "INR",
      exrate: "",
      price: "1.00",
    },
  ]);

  useEffect(() => {
    getTermsData();
  }, []);

  const getTermsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/terms`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        const termsCodes =
          response.data.paramObjectsMap.termsAndConditionsVO.map(
            (term) => term.termsCode
          );
        setTermsCode(termsCodes); // Setting multiple 'termsCode'
        console.log("Terms Codes:", termsCodes);
      } else {
        // Handle error
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!invoiceNumber) {
      newErrors.invoiceNumber = "InvoiceNumber is required";
    }
    if (!vendorId) {
      newErrors.vendorId = "Vendor Id is required";
    }
    if (!vendor) {
      newErrors.vendor = "Vendor is required";
    }
    if (!vendorAddress) {
      newErrors.vendorAddress = "Vendor Address is required";
    }
    if (!vendorGst) {
      newErrors.vendorGst = "Vendor GST is required";
    }
    if (!shipTo) {
      newErrors.shipTo = "Ship To is required";
    }
    if (!shipToRemarks) {
      newErrors.shipToRemarks = "Ship To Remarks is required";
    }
    if (!gstType) {
      newErrors.gstType = "GST Type is required";
    }
    if (!terms) {
      newErrors.terms = "Terms is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // const handleServiceSave = () => {
  //   const errors = {};

  //   if (!invoiceNumber) {
  //     errors.invoiceNumber = "InvoiceNumber is required";
  //   }
  //   if (!vendorId) {
  //     errors.vendorId = "Vendor Id is required";
  //   }
  //   if (!vendor) {
  //     errors.vendor = "Vendor is required";
  //   }
  //   if (!vendorAddress) {
  //     errors.vendorAddress = "Vendor Address is required";
  //   }
  //   if (!vendorGst) {
  //     errors.vendorGst = "Vendor GST is required";
  //   }
  //   if (!shipTo) {
  //     errors.shipTo = "Ship To is required";
  //   }
  //   if (!shipToRemarks) {
  //     errors.shipToRemarks = "Ship To Remarks is required";
  //   }
  //   if (!gstType) {
  //     errors.gstType = "GST Type is required";
  //   }
  //   if (!terms) {
  //     errors.terms = "Terms is required";
  //   }


  //   const formData = {
  //     date: todayDate,
  //     poNo: invoiceNumber,
  //     apId: vendorId,
  //     // :vendor,
  //     apAddress: vendorAddress,
  //     apGst: vendorGst,
  //     shipTo: shipTo,
  //     shipToRemarks: shipToRemarks,
  //     gstType: gstType,
  //     terms: terms,


  //     active: true,
  //     address,
  //     apAddress,
  //     apGst: apgst,
  //     apId,
  //     cancel: false,
  //     cgst: CGST,
  //     company,
  //     date: poDate,
  //     gstType: gstType,
  //     igst: IGST,
  //     orgId,
  //     poNo,
  //     selfGst: selfGST,
  //     sgst: SGST,
  //     shipTo: shipto,
  //     shipToRemarks: shiptoremarks,
  //     terms,
  //     po1DTO: tableData.map((row) => ({
  //       itemId: row.itemid,
  //       description: row.description,
  //       hsnCode: row.hsncode,
  //       qty: row.qty,
  //       rate: row.rate,
  //       currency: row.currency,
  //       exRate: row.exrate,
  //       amount: row.amount,
  //     })),
  //   };

  //   axios
  //     .put(
  //       `${process.env.REACT_APP_API_URL}/api/master/updateCreatePo`,
  //       formData
  //     )
  //     .then((response) => {
  //       console.log("Response:", response.data);

  //       setAddress("");
  //       setAPAddress("");
  //       setApGst("");
  //       setApId("");
  //       // setErrors({});
  //       setCGST("");
  //       setCompany("");
  //       setPoDate(null);
  //       setGstType("");
  //       setIGST("");
  //       setPoNo("");
  //       setSelfGST("");
  //       setGST("");
  //       setShipTo("");
  //       setTerms("");
  //       setAp("");
  //       setShiptoremarks("");
  //       setTableData({});
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  //   const reviewInvoiceHandler = (event) => {
  // if(handleValidation) {
  //     event.preventDefault();
  //     setIsOpen(true);
  // }
  //     // handleValidation();

  //   };


  const reviewInvoiceHandler = (event) => {
    const isValid = handleValidation(); // Call handleValidation function

    if (isValid) {
      console.log("validation fn called")
      event.preventDefault();
      setIsOpen(true);
    }
  };


  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        descripition: "",
        hsncode: "",
        qty: "",
        price: "1.00",
      },
    ]);
  };

  const addItemHandler = () => {
    console.log("old items:", items)
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        descripition: "",
        hsncode: "",
        qty: "",
        price: "1.00",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const handleGstTypeChange = (event) => {
    const selectedGstType = event.target.value;
    setGstType(selectedGstType);

    if (selectedGstType === "intra") {
      setIGst("");
      iGstRate = 0;
    }
    else {
      setCGst("");
      setSGst("");
      cGstRate = 0;
      sGstRate = 0;
    }
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const iGstRate = (iGst * subtotal) / 100;
  const cGstRate = (cGst * subtotal) / 100;
  const sGstRate = (sGst * subtotal) / 100;
  const total = gstType === "intra" ? subtotal + iGstRate + cGstRate + sGstRate : subtotal + iGstRate;

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              // required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />

            {errors.invoiceNumber && (
              <span className="error-text">{errors.invoiceNumber}</span>
            )}
          </div>
        </div>
        {/* <h1 className="text-center text-lg font-bold">INVOICE</h1> */}
        <div className="grid grid-cols-1 pt-4 pb-8">
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "20ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Vendor Id"
              id="filled-size-small"
              variant="filled"
              size="small"
              required
              name="VendorId"
              value={vendorId}
              onChange={(event) => setVendorId(event.target.value)}
            />
            {errors.vendorId && (
              <span className="error-text">{errors.vendorId}</span>
            )}
            <TextField
              label="Vendor"
              id="filled-size-small"
              variant="filled"
              size="small"
              required
              name="vendor"
              value={vendor}
              onChange={(event) => setVendor(event.target.value)}
            />
            <TextField
              label="Vendor Address"
              id="filled-size-small"
              variant="filled"
              size="small"
              required
              type="text"
              name="VendorAddress"
              value={vendorAddress}
              onChange={(event) => setVendorAddress(event.target.value)}
            />
            <TextField
              label="Vendor GST"
              id="filled-size-small"
              variant="filled"
              size="small"
              required
              name="venderdst"
              value={vendorGst}
              onChange={(event) => setVendorGst(event.target.value)}
            />
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "20ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Ship To"
              id="shipTo"
              variant="filled"
              size="small"
              required
              name="shipTo"
              value={shipTo}
              onChange={(event) => setShipTo(event.target.value)}
            />
            <TextField
              label="ShipTo Remarks"
              id="shipToRemarks"
              variant="filled"
              size="small"
              required
              name="ShipTo Remarks"
              value={shipToRemarks}
              onChange={(event) => setShipToRemarks(event.target.value)}
              sx={{ marginRight: "48px" }}
            />
            <FormControl variant="filled" size="small" required>
              <InputLabel id="gstType-label">GST Type</InputLabel>
              <Select
                labelId="gstType-label"
                id="gstType"
                value={gstType}
                // onChange={(event) => setGstType(event.target.value)}
                onChange={handleGstTypeChange}
                sx={{ width: "176px", marginRight: "6px" }}
              >
                <MenuItem value="inter">Inter</MenuItem>
                <MenuItem value="intra">Intra</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" size="small" required>
              <InputLabel id="terms-label">Terms</InputLabel>
              <Select
                labelId="terms-label"
                id="terms"
                value={terms}
                onChange={(event) => setTerms(event.target.value)}
                sx={{ width: "176px", marginRight: "6px" }}
              >
                {termsCode &&
                  termsCode.map((term, index) => (
                    <MenuItem key={index} value={term}>
                      {term}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          {/* <Box
  component="form"
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiTextField-root': { m: 1, width: '20ch' },
  }}
  noValidate
  autoComplete="off"
>
  <TextField
    label="Terms"
    id="filled-size-small"
    variant="filled"
    size="small"
    required
    name="Terms"
    value={terms}
    onChange={(event) => setTerms(event.target.value)}
  />
</Box> */}
        </div>

        <table className="p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>ITEM</th>
              <th>DESCRIPTION</th>
              <th>HSN-CODE</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>CURRENCY</th>
              <th>EX-RATE</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                descripition={item.descripition}
                hsncode={item.hsncode}
                qty={item.qty}
                rate={item.rate}
                currency={item.currency}
                exrate={item.exrate}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        {/* PRINT PREVIEW SECTION */}
        <div className="row">
          <div className="col-5">
            <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
              <InvoiceModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                invoiceInfo={{
                  todayDate,
                  invoiceNumber,
                  vendorId,
                  vendor,
                  vendorAddress,
                  vendorGst,
                  shipTo,
                  shipToRemarks,
                  gstType,
                  terms,
                  subtotal,
                  taxRate,
                  iGstRate,
                  cGstRate,
                  sGstRate,
                  total,
                }}
                items={items}
              // onAddNextInvoice={addNextInvoiceHandler}
              />
              {gstType === "intra" && (
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "& .MuiTextField-root": { m: 1, width: "20ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="CGST"
                    id="filled-size-small"
                    variant="filled"
                    size="small"
                    name="discount"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    value={cGst}
                    onChange={(event) => setCGst(event.target.value)}
                  />
                  <TextField
                    label="SGST"
                    id="filled-size-small"
                    variant="filled"
                    size="small"
                    type="number"
                    name="tax"
                    // id="tax"
                    min="0.01"
                    step="0.01"
                    placeholder="0.0"
                    value={sGst}
                    onChange={(event) => setSGst(event.target.value)}
                  />
                </Box>
              )}

              {gstType === "inter" && (
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "& .MuiTextField-root": { m: 1, width: "20ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="IGST"
                    id="filled-size-small"
                    variant="filled"
                    size="small"
                    name="discount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    value={iGst}
                    onChange={(event) => setIGst(event.target.value)}
                  />
                </Box>
              )}

              <button
                className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                type="submit"
              >
                Review Invoice
              </button>
            </div>
          </div>
          <div className="col-2"></div>
          <div className="flex flex-col items-end space-y-2 pt-6 col-5">
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Subtotal:</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            {gstType === "intra" && (
              <>
                <div className="flex w-full justify-between md:w-1/2">
                  <span className="font-bold">CGST</span>
                  <span>
                    ({cGst || "0"}%){cGstRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex w-full justify-between md:w-1/2">
                  <span className="font-bold">SGST</span>
                  <span>
                    ({sGst || "0"}%){sGstRate.toFixed(2)}
                  </span>
                </div>
              </>
            )}

            {gstType === "inter" && (
              <div className="flex w-full justify-between md:w-1/2">
                <span className="font-bold">IGST</span>
                <span>
                  ({iGst || "0"}%){iGstRate.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">
                {total % 1 === 0 ? total : total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
