import { Font } from "@react-pdf/renderer";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import countryList from "../data/countryList.ts";
import { initialInvoice, initialProductLine } from "../data/initialData.ts";
import { Invoice, ProductLine } from "../data/types";
import Document from "./Document.tsx";
import Download from "./DownloadPDF.tsx";
import EditableFileImage from "./EditableFileImage.tsx";
import EditableInput from "./EditableInput.tsx";
import EditableSelect from "./EditableSelect.tsx";
import EditableTextarea from "./EditableTextarea.tsx";
import Page from "./Page.tsx";
import Text from "./Text.tsx";
import View from "./View.tsx";

import InvoiceList from "../features/admin/invoiceList.js";
import "../scss/main.scss";

Font.register({
  family: "Nunito",
  fonts: [
    { src: "https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf" },
    {
      src: "https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf",
      fontWeight: 600,
    },
  ],
});

interface Props {
  data?: Invoice;
  pdfMode?: boolean;
  onChange?: (invoice: Invoice) => void;
  setNotSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoicePage: FC<Props> = ({ data, pdfMode, onChange, setNotSaved }) => {
  const [invoice, setInvoice] = useState<Invoice>(
    data ? { ...data } : { ...initialInvoice }
  );
  const [subTotal, setSubTotal] = useState<number>();
  const [saleTax, setSaleTax] = useState<number>();
  const [saleTax1, setSaleTax1] = useState<number>();
  const [listView, setListView] = useState<boolean>(false);
  const [invoiceVO, setInvoiceVO] = useState([]);
  const orgId = window.localStorage.getItem("orgId");

  const dateFormat = "MMM dd, yyyy";
  const invoiceDate =
    invoice.invoiceDate !== "" ? new Date(invoice.invoiceDate) : new Date();
  const invoiceDueDate =
    invoice.invoiceDueDate !== ""
      ? new Date(invoice.invoiceDueDate)
      : new Date(invoiceDate.valueOf());

  if (invoice.invoiceDueDate === "") {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
  }

  useEffect(() => {
    getInvoiceData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleChange = (name: keyof Invoice, value: string | number) => {
    if (name !== "productLines") {
      const newInvoice = { ...invoice };

      if (name === "logoWidth" && typeof value === "number") {
        newInvoice[name] = value;
      } else if (name !== "logoWidth" && typeof value === "string") {
        newInvoice[name] = value;
      }
      setInvoice(newInvoice);
    }
  };
  const [interGST, setInterGST] = useState(false);
  const [intraGST, setIntraGST] = useState(true);

  const handleInterGST = () => {
    setIntraGST(false);
    setInterGST(true);
  };

  const handleIntraGST = () => {
    setIntraGST(true);
    setInterGST(false);
  };

  const getInvoiceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllInvoiceByOrgId?orgId=${orgId}`
      );
      if (response.status === 200) {
        setInvoiceVO(response.data.paramObjectsMap.invoiceVO);
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProductLineChange = (
    index: number,
    name: keyof ProductLine,
    value: string
  ) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine };

        if (name === "description") {
          newProductLine[name] = value;
        } else {
          if (
            value[value.length - 1] === "." ||
            (value[value.length - 1] === "0" && value.includes("."))
          ) {
            newProductLine[name] = value;
          } else {
            const n = parseFloat(value);

            newProductLine[name] = (n ? n : 0).toString();
          }
        }

        return newProductLine;
      }

      return { ...productLine };
    });

    setInvoice({ ...invoice, productLines });
  };

  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter((_, index) => index !== i);

    setInvoice({ ...invoice, productLines });
  };

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }];

    setInvoice({ ...invoice, productLines });
  };

  const calculateAmount = (quantity: string, rate: string) => {
    const quantityNumber = parseFloat(quantity);
    const rateNumber = parseFloat(rate);
    const amount =
      quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

    return amount.toFixed(2);
  };

  useEffect(() => {
    let subTotal = 0;

    invoice.productLines.forEach((productLine) => {
      const quantityNumber = parseFloat(productLine.quantity);
      const rateNumber = parseFloat(productLine.rate);
      const amount =
        quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

      subTotal += amount;
    });

    setSubTotal(subTotal);
  }, [invoice.productLines]);

  useEffect(() => {
    const extractTaxRate = (taxLabel) => {
      if (!taxLabel) return 0;
      const match = taxLabel.match(/(\d+)%/);
      return match ? parseFloat(match[1]) : 0;
    };

    const calculateSaleTax = (subTotal, taxRate) => {
      return subTotal ? (subTotal * taxRate) / 100 : 0;
    };

    if (invoice) {
      const taxRate = extractTaxRate(invoice.taxLabel);
      const saleTax = calculateSaleTax(subTotal, taxRate);
      setSaleTax(saleTax);

      const taxRate1 = extractTaxRate(invoice.taxLabel1);
      const saleTax1 = calculateSaleTax(subTotal, taxRate1);
      setSaleTax1(saleTax1);
    }
  }, [subTotal, invoice?.taxLabel, invoice?.taxLabel1]);

  useEffect(() => {
    if (onChange) {
      onChange(invoice);
    }
  }, [onChange, invoice]);

  const onListView = () => {
    window.localStorage.removeItem("invoice");
    setListView(!listView);
    getInvoiceData();

    if (typeof setNotSaved === "function") {
      setNotSaved(true);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4" style={{ marginTop: "-57px" }}>
        <button
          className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={onListView}
        >
          listView
        </button>
      </div>

      {!listView ? (
        <Document pdfMode={pdfMode}>
          <Page className="invoice-wrapper" pdfMode={pdfMode}>
            {!pdfMode && (
              <Download data={invoice} setData={(d) => setInvoice(d)} />
            )}

            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50" pdfMode={pdfMode}>
                <EditableFileImage
                  className="logo"
                  placeholder="Your Logo"
                  value={invoice.logo}
                  width={invoice.logoWidth}
                  pdfMode={pdfMode}
                  onChangeImage={(value) => handleChange("logo", value)}
                  onChangeWidth={(value) => handleChange("logoWidth", value)}
                />
                <EditableInput
                  className="fs-10 bold"
                  placeholder="Your Company"
                  value={invoice.companyName}
                  onChange={(value) => handleChange("companyName", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="Your Name"
                  value={invoice.name}
                  onChange={(value) => handleChange("name", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="Company's Address"
                  value={invoice.companyAddress}
                  onChange={(value) => handleChange("companyAddress", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="City, State Zip"
                  value={invoice.companyAddress2}
                  onChange={(value) => handleChange("companyAddress2", value)}
                  pdfMode={pdfMode}
                />
                <EditableSelect
                  options={countryList}
                  value={invoice.companyCountry}
                  onChange={(value) => handleChange("companyCountry", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-10" pdfMode={pdfMode}>
                <br />
                <br></br>
                <br></br>
              </View>
              <View className="w-50 ml-48 pl-2.5" pdfMode={pdfMode}>
                <EditableInput
                  className="fs-30 bold mt-40 "
                  placeholder="Invoice"
                  value={invoice.title}
                  onChange={(value) => handleChange("title", value)}
                  pdfMode={pdfMode}
                />
                <div className="bold mb-3" style={{ marginLeft: "51%" }}>
                  <h6>
                    {invoice.id && "#"} {invoice.id}
                  </h6>
                </div>
                <br></br>
                <EditableInput
                  className="fs-10 bold"
                  value={invoice.billTo}
                  onChange={(value) => handleChange("billTo", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  className=""
                  placeholder="Your Client's Name"
                  value={invoice.clientName}
                  onChange={(value) => handleChange("clientName", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="Client's Address"
                  value={invoice.clientAddress}
                  onChange={(value) => handleChange("clientAddress", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="City, State Zip"
                  value={invoice.clientAddress2}
                  onChange={(value) => handleChange("clientAddress2", value)}
                  pdfMode={pdfMode}
                />
                <EditableSelect
                  options={countryList}
                  value={invoice.clientCountry}
                  onChange={(value) => handleChange("clientCountry", value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>

            {/* <View className="flex mt-40" pdfMode={pdfMode}></View> */}

            <View className="mt-30 flex" pdfMode={pdfMode}>
              <View className="w-48 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.productLineDescription}
                  onChange={(value) =>
                    handleChange("productLineDescription", value)
                  }
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.productLineQuantity}
                  onChange={(value) =>
                    handleChange("productLineQuantity", value)
                  }
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.productLineQuantityRate}
                  onChange={(value) =>
                    handleChange("productLineQuantityRate", value)
                  }
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-18 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.productLineQuantityAmount}
                  onChange={(value) =>
                    handleChange("productLineQuantityAmount", value)
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>

            {invoice.productLines.map((productLine, i) => {
              return pdfMode && productLine.description === "" ? (
                <Text key={i}></Text>
              ) : (
                <View key={i} className="row flex" pdfMode={pdfMode}>
                  <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableTextarea
                      className="dark"
                      rows={2}
                      placeholder="Enter item name/description"
                      value={productLine.description}
                      onChange={(value) =>
                        handleProductLineChange(i, "description", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={productLine.quantity}
                      onChange={(value) =>
                        handleProductLineChange(i, "quantity", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={productLine.rate}
                      onChange={(value) =>
                        handleProductLineChange(i, "rate", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                    <Text className="dark" pdfMode={pdfMode}>
                      {calculateAmount(productLine.quantity, productLine.rate)}
                    </Text>
                  </View>
                  {!pdfMode && (
                    <button
                      className="link row__remove"
                      aria-label="Remove Row"
                      title="Remove Row"
                      onClick={() => handleRemove(i)}
                    >
                      <span className="icon icon-remove bg-red"></span>
                    </button>
                  )}
                </View>
              );
            })}

            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50 mt-10" pdfMode={pdfMode}>
                {!pdfMode && (
                  <button className="link" onClick={handleAdd}>
                    <span className="icon icon-add bg-green mr-10"></span>
                    Add Line Item
                  </button>
                )}
              </View>
              <View className="w-50 mt-20" pdfMode={pdfMode}>
                <View className="flex" pdfMode={pdfMode}>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.subTotalLabel}
                      onChange={(value) => handleChange("subTotalLabel", value)}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-50" pdfMode={pdfMode}>
                    <Text className="right bold dark" pdfMode={pdfMode}>
                      {subTotal !== undefined
                        ? new Intl.NumberFormat("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(subTotal)
                        : ""}
                    </Text>
                  </View>
                </View>

                <View className="flex w-100" pdfMode={pdfMode}>
                  <View className="w-25" pdfMode={pdfMode}>
                    <input
                      type="checkbox"
                      id="interGST"
                      name="interGST"
                      checked={interGST}
                      onChange={handleInterGST}
                    />
                    &nbsp;
                    <label htmlFor="interGST">Inter GST</label>
                  </View>
                  <View className="w-25" pdfMode={pdfMode}>
                    <input
                      type="checkbox"
                      id="intraGST"
                      name="intraGST"
                      checked={intraGST}
                      onChange={handleIntraGST}
                    />
                    &nbsp;
                    <label htmlFor="intraGST">Intra GST</label>
                  </View>
                </View>

                {intraGST && (
                  <View className="flex" pdfMode={pdfMode}>
                    <View className="w-50" pdfMode={pdfMode}>
                      <EditableInput
                        value={invoice.taxLabel}
                        onChange={(value) => handleChange("taxLabel", value)}
                        pdfMode={pdfMode}
                      />
                    </View>
                    <View className="w-50" pdfMode={pdfMode}>
                      <Text className="right bold dark" pdfMode={pdfMode}>
                        {saleTax !== undefined
                          ? new Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(saleTax)
                          : ""}
                      </Text>
                    </View>
                  </View>
                )}

                {intraGST && (
                  <View className="flex" pdfMode={pdfMode}>
                    <View className="w-50" pdfMode={pdfMode}>
                      <EditableInput
                        value={invoice.taxLabel1}
                        onChange={(value) => handleChange("taxLabel1", value)}
                        pdfMode={pdfMode}
                      />
                    </View>
                    <View className="w-50" pdfMode={pdfMode}>
                      <Text className="right bold dark" pdfMode={pdfMode}>
                        {saleTax1 !== undefined
                          ? new Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(saleTax1)
                          : ""}
                      </Text>
                    </View>
                  </View>
                )}

                {interGST && (
                  <View className="flex" pdfMode={pdfMode}>
                    <View className="w-50" pdfMode={pdfMode}>
                      <EditableInput
                        value={invoice.taxLabel1}
                        onChange={(value) => handleChange("taxLabel1", value)}
                        pdfMode={pdfMode}
                      />
                    </View>
                    <View className="w-50" pdfMode={pdfMode}>
                      <Text className="right bold dark" pdfMode={pdfMode}>
                        {saleTax1 !== undefined
                          ? new Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(saleTax1)
                          : ""}
                      </Text>
                    </View>
                  </View>
                )}

                <View className="flex" pdfMode={pdfMode}>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      className="bold"
                      value={invoice.totalLabel}
                      onChange={(value) => handleChange("totalLabel", value)}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-50" pdfMode={pdfMode}>
                    <Text className="right bold dark" pdfMode={pdfMode}>
                      {typeof subTotal !== "undefined" &&
                      typeof saleTax !== "undefined" &&
                      typeof saleTax1 !== "undefined"
                        ? new Intl.NumberFormat("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(subTotal + saleTax + saleTax1)
                        : "0.00"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="mt-20" pdfMode={pdfMode}>
              <EditableInput
                className="bold w-100"
                value={invoice.notesLabel}
                onChange={(value) => handleChange("notesLabel", value)}
                pdfMode={pdfMode}
              />
              <EditableTextarea
                className="w-100"
                rows={2}
                value={invoice.notes}
                onChange={(value) => handleChange("notes", value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="mt-20" pdfMode={pdfMode}>
              <EditableInput
                className="bold w-100"
                value={invoice.termLabel}
                onChange={(value) => handleChange("termLabel", value)}
                pdfMode={pdfMode}
              />
              <EditableTextarea
                className="w-100"
                rows={2}
                value={invoice.term}
                onChange={(value) => handleChange("term", value)}
                pdfMode={pdfMode}
              />
            </View>
          </Page>
        </Document>
      ) : (
        <InvoiceList
          invoices={invoiceVO}
          onListView={onListView}
          setInvoiceVO={setInvoiceVO}
        />
      )}
    </>
  );
};

export default InvoicePage;
