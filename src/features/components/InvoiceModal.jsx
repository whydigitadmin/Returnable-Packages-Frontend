import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import React, { useEffect, Fragment, useState } from "react";

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  // onAddNextInvoice,
}) => {
  const [localItems, setLocalItems] = useState(items);
  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    // onAddNextInvoice();
  };

  // useEffect(() => {
  //   console.log("items are:", items)
  // }, []);

  console.log("items are:", items);

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [8.5, 11], // Change to letter size (8.5 x 11 inches)
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  const handleSave = () => {
    const localItems = items.map((row) => ({
      itemId: row.name,
      description: row.descripition,
      hsnCode: row.hsncode,
      qty: row.qty,
      rate: row.rate,
      currency: row.currency,
      exRate: row.exrate,
      amount: row.price,
    }))
    const formData = {
      date: invoiceInfo.todayDate,
      poNo: invoiceInfo.invoiceNumber,
      apId: invoiceInfo.vendorId,
      ai: invoiceInfo.vendor,
      apAddress: invoiceInfo.vendorAddress,
      apGst: invoiceInfo.vendorGst,
      shipTo: invoiceInfo.shipTo,
      shipToRemarks: invoiceInfo.shipToRemarks,
      gstType: invoiceInfo.gstType,
      terms: invoiceInfo.terms,
      igst: invoiceInfo.iGstRate,
      cgst: invoiceInfo.cGstRate,
      sgst: invoiceInfo.sGstRate,
      total: invoiceInfo.total,
      items: items,
      po1DTO: localItems

    }
    console.log("Data to save is:", formData)


    // axios
    //   .put(
    //     `${process.env.REACT_APP_API_URL}/api/master/updateCreatePo`,
    //     formData
    //   )
    //   .then((response) => {
    //     console.log("Response:", response.data);

    //     setAddress("");
    //     setAPAddress("");
    //     setApGst("");
    //     setApId("");
    //     // setErrors({});
    //     setCGST("");
    //     setCompany("");
    //     setPoDate(null);
    //     setGstType("");
    //     setIGST("");
    //     setPoNo("");
    //     setSelfGST("");
    //     setGST("");
    //     setShipTo("");
    //     setTerms("");
    //     setAp("");
    //     setShiptoremarks("");
    //     setTableData({});
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-4" id="print">
                <div className="row">
                  <div className="col-2">
                    <img
                      className="mask mask-squircle w-10"
                      src="/AI_Packs.png"
                      style={{
                        width: "50px",
                        height: "auto",
                        marginTop: "10px",
                      }}
                      alt="AI Packs org logo"
                    />
                  </div>
                  <div
                    className="col-5 text-right "
                    style={{
                      fontSize: "11px",
                      lineHeight: "0.5",
                      textAlign: "left",
                      marginLeft: "20px",
                    }}
                  >
                    <h6>SCM AI-PACKS Private Limited,</h6>
                    <br></br>
                    <h6>#23/1, T C Palya Main Road,</h6>
                    <br></br>
                    <h6>Hoysala Nagar, Ramamurthy Nagar,</h6>
                    <br></br>
                    <h6>Bangalore - 560010, Karnataka.</h6>
                    <br></br>
                    <h6>GSTIN: 29ABMCS1982P1ZA</h6>
                    <br></br>
                  </div>{" "}
                  <div className="col-4 text-bold" style={{ fontSize: "12px" }}>
                    <span>Invoice No :</span>
                    <span>{invoiceInfo.invoiceNumber}</span>
                    <br></br>
                    <span>Date:</span>
                    <span>{invoiceInfo.todayDate}</span>
                    <br></br>
                    <span>Vendor Id :</span>
                    <span>{invoiceInfo.vendorId}</span>
                    <br></br>
                    <span>Vendor :</span>
                    <span>{invoiceInfo.vendor}</span>
                  </div>
                  {/* <div className="col-3 ml-1">
                    {" "}
                    <span
                      className="text-gray-900 "
                      style={{ fontSize: "14px" }}
                    >
                      <span className="text-align-center">PO024105</span>
                    </span>
                  </div> */}
                </div>

                <div className="mt-6">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-y border-black/10 text-sm md:text-base">
                        <th>ITEM</th>
                        <th className="text-center">QTY</th>
                        <th className="text-right">PRICE</th>
                        <th className="text-right">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full">{item.name}</td>
                          <td className="min-w-[50px] text-center">
                            {item.qty}
                          </td>
                          <td className="min-w-[80px] text-right">
                            {Number(item.price).toFixed(2)}
                          </td>
                          <td className="min-w-[90px] text-right">
                            {Number(item.price * item.qty).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex flex-col items-end space-y-2">
                    <div className="flex w-full justify-between border-t border-black/10 pt-2">
                      <span className="font-bold">Subtotal:</span>
                      <span>{invoiceInfo.subtotal.toFixed(2)}</span>
                    </div>
                    {invoiceInfo.gstType === "inter" ? (<div className="flex w-full justify-between">
                      <span className="font-bold">IGST:</span>
                      <span>{invoiceInfo.iGstRate.toFixed(2)}</span>
                    </div>
                    ) : (
                      <>
                        <div className="flex w-full justify-between">
                          <span className="font-bold">CGST:</span>
                          <span>{invoiceInfo.cGstRate.toFixed(2)}</span>
                        </div>
                        <div className="flex w-full justify-between">
                          <span className="font-bold">SGST:</span>
                          <span>{invoiceInfo.sGstRate.toFixed(2)}</span>
                        </div>
                      </>)}
                    <div className="flex w-full justify-between border-t border-black/10 py-2">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold">
                        {invoiceInfo.total % 1 === 0
                          ? invoiceInfo.total
                          : invoiceInfo.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                  <span>Next</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
