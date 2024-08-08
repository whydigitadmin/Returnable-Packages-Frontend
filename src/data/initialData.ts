import { Invoice, InvoiceNew, ProductLine } from "./types";

export const initialProductLine: ProductLine = {
  description: "",
  quantity: "1",
  rate: "0.00",
};

export const initialKitLine: KitLine = {
  date: "",
  manifestNo: "",
  emitter: "",
  location: "",
  kitNo: "",
  kitQty: "",
};

export const initialInvoice: Invoice = {
  logo: "",
  logoWidth: 100,
  title: "PURCHASE ORDER",
  companyName: "",
  name: "",
  id: "",
  companyAddress: "",
  companyAddress2: "",
  companyCountry: "United States",
  billTo: "Bill To:",
  clientName: "",
  clientAddress: "",
  clientAddress2: "",
  clientCountry: "United States",

  invoiceTitleLabel: "Invoice#",
  invoiceTitle: "",
  invoiceDateLabel: "Invoice Date",
  invoiceDate: "",
  invoiceDueDateLabel: "Due Date",
  invoiceDueDate: "",
  productLineDescription: "Item Description",
  productLineQuantity: "Qty",
  productLineQuantityRate: "Rate",
  productLineQuantityAmount: "Amount",
  productLines: [
    {
      description: "",
      quantity: "",
      rate: "",
    },
    // { ...initialProductLine },
    // { ...initialProductLine },
  ],
  subTotalLabel: "Sub Total",
  taxLabel: "CGST (9%)",
  taxLabel1: "SGST (9%)",
  taxLabel2: "CGST (18%)",
  totalLabel: "TOTAL",
  currency: "₹",
  notesLabel: "Notes",
  notes: "It was great doing business with you.",
  termLabel: "Terms & Conditions",
  term: `
  Please make the payment by the due date.
  
  1. Delivery Period: All the material must be delivered from your works within 1 week from the date of Purchase Order.
  2. Payment Terms: 30 Days from Invoice submission through NEFT or Cheque
  3. Inspection & Testing: Inspection and quality check to be carried out by AI-PACKS designated executive during material Dispatch.
  4. Statutory Requirements: NA
  `,
};

export const initialInvoiceNew: InvoiceNew = {
  logo: "",
  logoWidth: 100,
  title: "INVOICE",
  companyName: `SCM AI-PACKS Private Limited
#23/1, T C Palya Main road,
Hoysala Nagar, Ramamurthy Nagar,
Bangalore (560010), Karnataka.
GSTIN: 29ABMCS1982P1ZA
CIN - accounts@aipacks.com`,
  name: "",
  id: "",
  companyAddress: "",
  companyAddress2: "",
  companyCountry: "United States",
  billTo: "Bill To:",
  clientName: "",
  clientAddress: "",
  clientAddress2: "",
  clientCountry: "United States",
  shipTo: "Ship To:",
  sclientName: "",
  sclientAddress: "",
  sclientAddress2: "",
  sclientCountry: "United States",
  invoiceTitleLabel: "Invoice#",
  invoiceTitle: "",
  invoiceDateLabel: "Invoice Date",
  invoiceDate: "",
  invoiceDueDateLabel: "Due Date",
  invoiceDueDate: "",
  productLineDescription: "Item Description",
  productLineQuantity: "Qty",
  productLineQuantityRate: "Rate",
  productLineQuantityAmount: "Amount",
  kitLineDate: "Date",
  kitLineManifestNo: "Manifest No",
  kitLineEmitter: "Emitter",
  kitLineLocation: "Location",
  kitLineKitNo: "Kit No",
  kitLineKitQty: "Kit Qty",
  productLines: [
    {
      description: "",
      quantity: "",
      rate: "",
    },
  ],
  kitLines: [
    {
      date: "",
      manifestNo: "",
      emitter: "",
      location: "",
      kitNo: "",
      kitQty: "",
    },
  ],
  subTotalLabel: "Sub Total",
  taxLabel: "CGST (9%)",
  taxLabel1: "SGST (9%)",
  taxLabel2: "CGST (18%)",
  totalLabel: "TOTAL",
  currency: "₹",
  notesLabel: "Notes",
  notes: "It was great doing business with you.",
  termLabel: "Terms & Conditions Invoice",
  term: `
  Please make the payment by the due date.
  
 1) The payment should be made by way of Account Payee Cheque /
Demand Draft / NEFT / RTGS in the name of “SCM AIPACKS PVT LTD”.
2) Any Discrepancy in the invoice shall be informed within 7 days of the
invoice submission.
3) Interest at 2% p.m. or part thereof will be charged if the bill is not
paid on the due date.
4) Any dispute is subject to Bangalore Jurisdiction.

  `,

  payTo: "",
  bankName: "",
  accountName: "",
  accountNo: "",
  ifsc: "",
  payToLabel: "Pay To",
  bankNameLabel: "Bank Name : ",
  accountNameLabel: "Account Name : ",
  accountNoLabel: "Account No : ",
  ifsclabel: "IFSC Code : ",
  invoiceNo: "",
  terms: "",
  dueDate: "",
  invoiceNoLabel: "Invoice No : ",
  termsLabel: "terms : ",
  dueDateLabel: "Due Date : ",
  serviceMonthLabel: "Service Month : ",
  serviceMonth: "",
  placeSupplyLabel: "Place & Supply : ",
  placeSupply: "",
};
