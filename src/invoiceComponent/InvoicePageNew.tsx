import { Font } from "@react-pdf/renderer";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  initialInvoiceNew,
  initialKitLine,
  initialProductLine,
} from "../data/initialData.ts";
import { Invoice, InvoiceNew, KitLine, ProductLine } from "../data/types.ts";
import Document from "./Document.tsx";
import EditableFileImage from "./EditableFileImage.tsx";
import EditableInput from "./EditableInput.tsx";
import EditableTextarea from "./EditableTextarea.tsx";
import Page from "./Page.tsx";
import Text from "./Text.tsx";
import View from "./View.tsx";

import InvoiceListNew from "../features/admin/invoiceListNew.js";
import "../scss/main.scss";
import DownloadNew from "./DownloadPDFInvoice.tsx";

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
  data?: InvoiceNew;
  pdfMode?: boolean;
  onChange?: (InvoiceNew: InvoiceNew) => void;
  setNotSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoicePageNew: FC<Props> = ({
  data,
  pdfMode,
  onChange,
  setNotSaved,
}) => {
  const [invoice, setInvoice] = useState<InvoiceNew>(
    data ? { ...data } : { ...initialInvoiceNew }
  );
  const [subTotal, setSubTotal] = useState<number>();
  const [saleTax, setSaleTax] = useState<number>();
  const [saleTax1, setSaleTax1] = useState<number>();
  const [saleTax2, setSaleTax2] = useState<number>();
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

  const getInvoiceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getAllTaxInvoiceByOrgId?orgId=${orgId}`
      );
      if (response.status === 200) {
        setInvoiceVO(response.data.paramObjectsMap.taxInvoiceVO.reverse());
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

  const handleKitLineChange = (
    index: number,
    name: keyof KitLine,
    value: string
  ) => {
    const kitLines = invoice.kitLines.map((kitLine, i) => {
      if (i === index) {
        const newKitLine = { ...kitLine };

        if (
          name === "date" ||
          name === "emitter" ||
          name === "location" ||
          name === "manifestNo" ||
          name === "kitNo"
        ) {
          newKitLine[name] = value;
        } else {
          if (
            value[value.length - 1] === "." ||
            (value[value.length - 1] === "0" && value.includes("."))
          ) {
            newKitLine[name] = value;
          } else {
            const n = parseFloat(value);

            newKitLine[name] = (n ? n : 0).toString();
          }
        }

        return newKitLine;
      }

      return { ...kitLine };
    });

    setInvoice({ ...invoice, kitLines });
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

  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter((_, index) => index !== i);

    setInvoice({ ...invoice, productLines });
  };

  const handleRemoveKit = (i: number) => {
    const kitLines = invoice.kitLines.filter((_, index) => index !== i);

    setInvoice({ ...invoice, kitLines });
  };

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }];

    setInvoice({ ...invoice, productLines });
  };

  const handleAddkit = () => {
    const kitLines = [...invoice.kitLines, { ...initialKitLine }];

    setInvoice({ ...invoice, kitLines });
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

      const taxRate2 = extractTaxRate(invoice.taxLabel2);
      const saleTax2 = calculateSaleTax(subTotal, taxRate2);
      setSaleTax2(saleTax2); // Assuming you have a state for saleTax2
    }
  }, [subTotal, invoice?.taxLabel, invoice?.taxLabel1, invoice?.taxLabel2]);

  useEffect(() => {
    if (onChange) {
      onChange(invoice);
    }
  }, [onChange, invoice]);

  const onListView = () => {
    window.localStorage.removeItem("invoiceData");
    setListView(!listView);
    getInvoiceData();

    if (typeof setNotSaved === "function") {
      setNotSaved(true);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4" style={{ marginTop: "-78px" }}>
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
              <DownloadNew data={invoice} setData={(d) => setInvoice(d)} />
            )}
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableFileImage
                  className="logo"
                  placeholder="Your Logo"
                  value={invoice.logo}
                  width={invoice.logoWidth}
                  pdfMode={pdfMode}
                  onChangeImage={(value) => handleChange("logo", value)}
                  onChangeWidth={(value) => handleChange("logoWidth", value)}
                />
                <View className="mb-4" pdfMode={pdfMode}>
                  <EditableTextarea
                    className="fs-6 bold"
                    placeholder="Your Company"
                    value={invoice.companyName}
                    onChange={(value) => handleChange("companyName", value)}
                    pdfMode={pdfMode}
                  />
                </View>
              </View>

              <View className="w-60 ml-1.5" pdfMode={pdfMode}>
                <EditableInput
                  className="fs-25 bold mt-40 w-100"
                  placeholder="Invoice"
                  value={invoice.title}
                  onChange={(value) => handleChange("title", value)}
                  pdfMode={pdfMode}
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    marginTop: "40px",
                    width: "100%",
                  }}
                />
                <View
                  className="flex "
                  pdfMode={pdfMode}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View className="w-30" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.invoiceNoLabel}
                      onChange={(value) =>
                        handleChange("invoiceNoLabel", value)
                      }
                      pdfMode={pdfMode}
                      className="bold"
                      style={{ fontWeight: "bold" }}
                    />
                  </View>
                  <View
                    className="w-30"
                    pdfMode={pdfMode}
                    style={{ width: "50%" }}
                  >
                    <EditableInput
                      value={invoice.invoiceNo}
                      onChange={(value) => handleChange("invoiceNo", value)}
                      pdfMode={pdfMode}
                      placeholder="Enter"
                      className="bold"
                      style={{ fontWeight: "bold" }}
                    />
                  </View>
                </View>
                <View
                  className="flex"
                  pdfMode={pdfMode}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    className="w-30"
                    pdfMode={pdfMode}
                    style={{ width: "50%" }}
                  >
                    <EditableInput
                      value={invoice.invoiceDateLabel}
                      onChange={(value) =>
                        handleChange("invoiceDateLabel", value)
                      }
                      pdfMode={pdfMode}
                      className="bold"
                      style={{ fontWeight: "bold" }}
                    />
                  </View>
                  <View
                    className="w-30"
                    pdfMode={pdfMode}
                    style={{ width: "50%" }}
                  >
                    <EditableInput
                      value={invoice.invoiceDate}
                      onChange={(value) => handleChange("invoiceDate", value)}
                      pdfMode={pdfMode}
                      placeholder="Enter"
                      className="bold"
                      style={{ fontWeight: "bold" }}
                    />
                  </View>
                </View>
              </View>
            </View>

            <hr className="mb-2 mt-2"></hr>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-45 ml-30" pdfMode={pdfMode}>
                <View className="flex" pdfMode={pdfMode}>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.placeSupplyLabel}
                      onChange={(value) =>
                        handleChange("placeSupplyLabel", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.placeSupply}
                      onChange={(value) => handleChange("placeSupply", value)}
                      pdfMode={pdfMode}
                      placeholder="Enter place & supply"
                    />
                  </View>
                </View>
                {/* <View className="flex" pdfMode={pdfMode}>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.invoiceDateLabel}
                      onChange={(value) =>
                        handleChange("invoiceDateLabel", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.invoiceDate}
                      onChange={(value) => handleChange("invoiceDate", value)}
                      pdfMode={pdfMode}
                      placeholder="Enter Invoice Date "
                    />
                  </View>
                </View> */}
                <View className="flex" pdfMode={pdfMode}>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.termsLabel}
                      onChange={(value) => handleChange("termsLabel", value)}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.terms}
                      onChange={(value) => handleChange("terms", value)}
                      pdfMode={pdfMode}
                      placeholder="Enter Terms"
                    />
                  </View>
                </View>
                <View className="flex" pdfMode={pdfMode}>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.dueDateLabel}
                      onChange={(value) => handleChange("dueDateLabel", value)}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.dueDate}
                      onChange={(value) => handleChange("dueDate", value)}
                      pdfMode={pdfMode}
                      placeholder="Enter DueDate"
                    />
                  </View>
                </View>
              </View>
              <View className="w-45 ml-30" pdfMode={pdfMode}>
                <View className="flex" pdfMode={pdfMode}>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.serviceMonthLabel}
                      onChange={(value) =>
                        handleChange("serviceMonthLabel", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-50" pdfMode={pdfMode}>
                    <EditableInput
                      value={invoice.serviceMonth}
                      onChange={(value) => handleChange("serviceMonth", value)}
                      pdfMode={pdfMode}
                      placeholder="Enter Service Month"
                    />
                  </View>
                </View>
              </View>
            </View>
            <hr className="mt-2 mb-2"></hr>

            <View className="flex" pdfMode={pdfMode}>
              <View className="w-45 ml-30" pdfMode={pdfMode}>
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
                <EditableInput
                  placeholder="Country"
                  value={invoice.clientCountry}
                  onChange={(value) => handleChange("clientCountry", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-10" pdfMode={pdfMode}>
                {/* <ArrowRightIcon /> */}
              </View>
              <View className="w-45 ml-30" pdfMode={pdfMode}>
                <EditableInput
                  className="fs-10 bold"
                  value={invoice.shipTo}
                  onChange={(value) => handleChange("shipTo", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  className=""
                  placeholder="Your Client's Name"
                  value={invoice.sclientName}
                  onChange={(value) => handleChange("sclientName", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="Client's Address"
                  value={invoice.sclientAddress}
                  onChange={(value) => handleChange("sclientAddress", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="City, State Zip"
                  value={invoice.sclientAddress2}
                  onChange={(value) => handleChange("sclientAddress2", value)}
                  pdfMode={pdfMode}
                />
                <EditableInput
                  placeholder="Country"
                  value={invoice.sclientCountry}
                  onChange={(value) => handleChange("sclientCountry", value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>

            <hr className="mt-2"></hr>
            {/* <View className="flex mt-40" pdfMode={pdfMode}></View> */}

            {/* <View className="mt-30 flex" pdfMode={pdfMode}>
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
            </View> */}

            {/* <View className="flex mt-40" pdfMode={pdfMode}></View> */}

            <View className="mt-20 flex" pdfMode={pdfMode}>
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
                        value={invoice.taxLabel2}
                        onChange={(value) => handleChange("taxLabel2", value)}
                        pdfMode={pdfMode}
                      />
                    </View>
                    <View className="w-50" pdfMode={pdfMode}>
                      <Text className="right bold dark" pdfMode={pdfMode}>
                        {saleTax2 !== undefined
                          ? new Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(saleTax2)
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
            <br></br>
            <EditableInput
              className="bold w-50"
              value={invoice.payToLabel}
              onChange={(value) => handleChange("payToLabel", value)}
              pdfMode={pdfMode}
            />
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.bankNameLabel}
                  onChange={(value) => handleChange("bankNameLabel", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.bankName}
                  onChange={(value) => handleChange("bankName", value)}
                  pdfMode={pdfMode}
                  placeholder="Enter Bank Name"
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.accountNameLabel}
                  onChange={(value) => handleChange("accountNameLabel", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.accountName}
                  onChange={(value) => handleChange("accountName", value)}
                  pdfMode={pdfMode}
                  placeholder="Enter Account Name"
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.accountNoLabel}
                  onChange={(value) => handleChange("accountNoLabel", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.accountNo}
                  onChange={(value) => handleChange("accountNo", value)}
                  pdfMode={pdfMode}
                  placeholder="Enter Account No"
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.ifsclabel}
                  onChange={(value) => handleChange("ifsclabel", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.ifsc}
                  onChange={(value) => handleChange("ifsc", value)}
                  pdfMode={pdfMode}
                  placeholder="Enter IFSC Code"
                />
              </View>
            </View>

            {/* <View className="mt-20 flex" pdfMode={pdfMode}>
              <View className="w-40 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineDate}
                  onChange={(value) => handleChange("kitLineDate", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-40 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineManifestNo}
                  onChange={(value) => handleChange("kitLineManifestNo", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-40 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineEmitter}
                  onChange={(value) => handleChange("kitLineEmitter", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-40 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineLocation}
                  onChange={(value) => handleChange("kitLineLocation", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-40 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineKitNo}
                  onChange={(value) => handleChange("kitLineKitNo", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-40 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineKitQty}
                  onChange={(value) => handleChange("kitLineKitQty", value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            {invoice.kitLines.map((kitLine, i) => {
              return pdfMode && kitLine.date === "" ? (
                <Text key={i}></Text>
              ) : (
                <View key={i} className="flex" pdfMode={pdfMode}>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      rows={2}
                      placeholder="Enter Date"
                      value={kitLine.date}
                      onChange={(value) =>
                        handleKitLineChange(i, "date", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.manifestNo}
                      placeholder="Manifest No"
                      onChange={(value) =>
                        handleKitLineChange(i, "manifestNo", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.emitter}
                      placeholder="Emitter"
                      onChange={(value) =>
                        handleKitLineChange(i, "emitter", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.location}
                      placeholder="Location"
                      onChange={(value) =>
                        handleKitLineChange(i, "location", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.kitNo}
                      placeholder="Kit No"
                      onChange={(value) =>
                        handleKitLineChange(i, "kitNo", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.kitQty}
                      placeholder="Kit Qty"
                      onChange={(value) =>
                        handleKitLineChange(i, "kitQty", value)
                      }
                      pdfMode={pdfMode}
                    />
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
            })} */}

            <View className="mt-20 flex" pdfMode={pdfMode}>
              <View className="w-17 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineDate}
                  onChange={(value) => handleChange("kitLineDate", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineManifestNo}
                  onChange={(value) => handleChange("kitLineManifestNo", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineEmitter}
                  onChange={(value) => handleChange("kitLineEmitter", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-18 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineLocation}
                  onChange={(value) => handleChange("kitLineLocation", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-18 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineKitNo}
                  onChange={(value) => handleChange("kitLineKitNo", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-18 p-4-8" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.kitLineKitQty}
                  onChange={(value) => handleChange("kitLineKitQty", value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>

            {invoice.kitLines.map((kitLine, i) => {
              return pdfMode && kitLine.description === "" ? (
                <Text key={i}></Text>
              ) : (
                <View key={i} className="flex" pdfMode={pdfMode}>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      placeholder="Enter Date"
                      value={kitLine.date}
                      onChange={(value) =>
                        handleKitLineChange(i, "date", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.manifestNo}
                      placeholder="Manifest No"
                      onChange={(value) =>
                        handleKitLineChange(i, "manifestNo", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.emitter}
                      placeholder="Emitter"
                      onChange={(value) =>
                        handleKitLineChange(i, "emitter", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.location}
                      placeholder="Location"
                      onChange={(value) =>
                        handleKitLineChange(i, "location", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.kitNo}
                      placeholder="Kit No"
                      onChange={(value) =>
                        handleKitLineChange(i, "kitNo", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                    <EditableInput
                      className="dark"
                      value={kitLine.kitQty}
                      placeholder="Kit Qty"
                      onChange={(value) =>
                        handleKitLineChange(i, "kitQty", value)
                      }
                      pdfMode={pdfMode}
                    />
                  </View>
                  {!pdfMode && (
                    <button
                      className="link row__remove"
                      aria-label="Remove Row"
                      title="Remove Row"
                      onClick={() => handleRemoveKit(i)}
                    >
                      <span className="icon icon-remove bg-red"></span>
                    </button>
                  )}
                </View>
              );
            })}

            <View className="w-50 mt-10" pdfMode={pdfMode}>
              {!pdfMode && (
                <button className="link" onClick={handleAddkit}>
                  <span className="icon icon-add bg-green mr-10"></span>
                  Add Line Item
                </button>
              )}
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
          </Page>
        </Document>
      ) : (
        <InvoiceListNew
          invoices={invoiceVO}
          onListView={onListView}
          setInvoiceVO={setInvoiceVO}
        />
      )}
    </>
  );
};

export default InvoicePageNew;
