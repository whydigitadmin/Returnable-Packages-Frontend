import { CSSProperties } from "react";
import { TypeOf, z } from "zod";

export interface ProductLine {
  description: string;
  quantity: string;
  rate: string;
}

export interface KitLine {
  date: string;
  manifestNo: string;
  emitter: string;
  location: string;
  kitNo: string;
  kitQty: string;
}

export const TProductLine = z.object({
  description: z.string(),
  quantity: z.string(),
  rate: z.string(),
});

export const TKitLine = z.object({
  date: z.string(),
  manifestNo: z.string(),
  emitter: z.string(),
  location: z.string(),
  kitNo: z.string(),
  kitQty: z.string(),
});

export const TInvoice = z.object({
  logo: z.string(),
  logoWidth: z.number(),
  title: z.string(),
  companyName: z.string(),
  name: z.string(),
  id: z.string(),
  companyAddress: z.string(),
  companyAddress2: z.string(),
  companyCountry: z.string(),
  billTo: z.string(),
  clientName: z.string(),
  clientAddress: z.string(),
  clientAddress2: z.string(),
  clientCountry: z.string(),
  invoiceTitleLabel: z.string(),
  invoiceTitle: z.string(),
  invoiceDateLabel: z.string(),
  invoiceDate: z.string(),
  invoiceDueDateLabel: z.string(),
  invoiceDueDate: z.string(),
  productLineDescription: z.string(),
  productLineQuantity: z.string(),
  productLineQuantityRate: z.string(),
  productLineQuantityAmount: z.string(),
  productLines: z.array(TProductLine),
  subTotalLabel: z.string(),
  taxLabel: z.string(),
  taxLabel1: z.string(),
  taxLabel2: z.string(),
  totalLabel: z.string(),
  currency: z.string(),
  notesLabel: z.string(),
  notes: z.string(),
  termLabel: z.string(),
  term: z.string(),
});

export const TInvoiceNew = z.object({
  logo: z.string(),
  logoWidth: z.number(),
  title: z.string(),
  companyName: z.string(),
  name: z.string(),
  id: z.string(),
  companyAddress: z.string(),
  companyAddress2: z.string(),
  companyCountry: z.string(),
  billTo: z.string(),
  clientName: z.string(),
  clientAddress: z.string(),
  clientAddress2: z.string(),
  clientCountry: z.string(),
  shipTo: z.string(),
  sclientName: z.string(),
  sclientAddress: z.string(),
  sclientAddress2: z.string(),
  sclientCountry: z.string(),
  invoiceTitleLabel: z.string(),
  invoiceTitle: z.string(),
  invoiceDateLabel: z.string(),
  invoiceDate: z.string(),
  invoiceDueDateLabel: z.string(),
  invoiceDueDate: z.string(),
  productLineDescription: z.string(),
  productLineQuantity: z.string(),
  productLineQuantityRate: z.string(),
  productLineQuantityAmount: z.string(),
  productLines: z.array(TProductLine),
  kitLineDate: z.string(),
  kitLineManifestNo: z.string(),
  kitLineEmitter: z.string(),
  kitLineLocation: z.string(),
  kitLineKitNo: z.string(),
  kitLineKitQty: z.string(),
  kitLines: z.array(TKitLine),
  subTotalLabel: z.string(),
  taxLabel: z.string(),
  taxLabel1: z.string(),
  taxLabel2: z.string(),
  totalLabel: z.string(),
  currency: z.string(),
  notesLabel: z.string(),
  notes: z.string(),
  termLabel: z.string(),
  term: z.string(),
  payTo: z.string(),
  bankName: z.string(),
  accountName: z.string(),
  accountNo: z.string(),
  ifsc: z.string(),
  payToLabel: z.string(),
  bankNameLabel: z.string(),
  accountNameLabel: z.string(),
  accountNoLabel: z.string(),
  ifsclabel: z.string(),

  invoiceNo: z.string(),
  terms: z.string(),
  dueDate: z.string(),
  invoiceNoLabel: z.string(),
  termsLabel: z.string(),
  dueDateLabel: z.string(),
  serviceMonthLabel: z.string(),
  serviceMonth: z.string(),
  placeSupplyLabel: z.string(),
  placeSupply: z.string(),
});

export type Invoice = TypeOf<typeof TInvoice>;
export type InvoiceNew = TypeOf<typeof TInvoiceNew>;

export interface CSSClasses {
  [key: string]: CSSProperties;
}
