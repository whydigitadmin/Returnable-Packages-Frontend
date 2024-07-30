import React, { useRef, useEffect, useState } from "react";
import { MdPrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import QRCode from "qrcode.react";

export const MaterialIssueManifest = () => {
  const componentRef = useRef();
  const [headerData, setHeaderData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [sampleData, setSampleData] = useState([
    {
      kitcode: "KIT1103",
      kit: "Cylinder Head (H280A)",
      allotkitqty: 3,
      hsnCode: 3201,
      productCode: "PP1411",
      productName: "Pallet",
      productQty: "3",
    },
  ]);
  const [qrCodeValue, setQrCodeValue] = useState([]);
  const [watermark, setWatermark] = useState("");

  //   useEffect(() => {
  //     getHeaderDetailsByDocId();
  //   }, []);

  //   const getHeaderDetailsByDocId = async () => {
  //     try {
  //       const headerResponse = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfHeaderDetails?docid=${docId}`
  //       );
  //       console.log("API headerResponse:", headerResponse);

  //       if (headerResponse.status === 200) {
  //         console.log(
  //           "API headerResponse:",
  //           headerResponse.data.paramObjectsMap.HeaderDetails[0]
  //         );
  //         setHeaderData(headerResponse.data.paramObjectsMap.HeaderDetails[0]);
  //         try {
  //           const gridResponse = await axios.get(
  //             `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfGridDetails?docid=${docId}`
  //           );
  //           console.log("API gridResponse:", gridResponse);

  //           if (gridResponse.status === 200) {
  //             console.log(
  //               "API gridResponse for Grid:",
  //               gridResponse.data.paramObjectsMap.allotDetails
  //             );
  //             setGridData(gridResponse.data.paramObjectsMap.allotDetails);

  //             // Concatenate relevant fields from header and grid data
  //             const concatenatedData = {
  //               TransactionNo: Array.from(
  //                 new Set(
  //                   gridResponse.data.paramObjectsMap.allotDetails.map(
  //                     (detail) => detail.allotmentNo
  //                   )
  //                 )
  //               ).join(", "),
  //               TransactionDate: Array.from(
  //                 new Set(
  //                   gridResponse.data.paramObjectsMap.allotDetails.map(
  //                     (detail) => detail.allotmentDate
  //                   )
  //                 )
  //               ).join(", "),
  //               RequestNo:
  //                 headerResponse.data.paramObjectsMap.HeaderDetails[0].binreqno,
  //               Receiver:
  //                 headerResponse.data.paramObjectsMap.HeaderDetails[0]
  //                   .receiverName,
  //               Kit: Array.from(
  //                 new Set(
  //                   gridResponse.data.paramObjectsMap.allotDetails.map(
  //                     (detail) => detail.kitcode
  //                   )
  //                 )
  //               ).join(", "),
  //             };

  //             const formattedData = `
  // AllotmentNo: ${concatenatedData.TransactionNo},
  // AllotmentDate: ${concatenatedData.TransactionDate},
  // Receiver: ${concatenatedData.Receiver},
  // RequestNo: ${concatenatedData.RequestNo},
  // Kit: ${concatenatedData.Kit}
  //             `;

  //             setQrCodeValue(formattedData);
  //             console.log("THE QRCODE DATA IS:", formattedData);
  //           } else {
  //             console.error("API Error:", gridResponse.data);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       } else {
  //         console.error("API Error:", headerResponse.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrintWithWatermark = (watermarkText) => {
    setWatermark(watermarkText);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const handleReportClose = () => {
    // goBack(false);
    // onClose(false);
  };

  return (
    <div>
      <style>
        {`
          @media print {
            .container-sm {
              width: 100%;
              max-width: 100%;
            }
            .card {
              box-shadow: none;
              border: none;
              width: 100%;
              page-break-inside: avoid;
            }
            .row {
              display: flex;
              flex-wrap: wrap;
            }
            .size {
              font-size: 12px;
            }
            .col-md-12 {
              font-size: 12px;
            }
            .col-md-6 {
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-md-5 {
              flex: 0 0 40%;
              max-width: 40%;
            }
            .col-md-4 {
              flex: 0 0 40%;
              max-width: 40%;
            }
            .col-md-3 {
              flex: 0 0 20%;
              max-width: 20%;
            }
            .text-xl {
              font-size: 20px;
              margin-top: 0;
              margin-bottom: 0.5rem;
            }
            .text-center {
              text-align: center;
            }
            .font-weight-bold {
              font-weight: bold;
            }
            .table {
              width: 100%;
              margin-bottom: 1rem;
              color: #212529;
              border-collapse: collapse;
            }
            .table-bordered {
              border-collapse: collapse;
            }
            .table-bordered th,
            .table-bordered td {
              border: 1px solid #dee2e6;
              padding: 0.5rem;
              vertical-align: middle;
            }
            .mt-5 {
              margin-top: 3rem !important;
            }
            /* Reduce font size for table cells */
            .table td,
            .table th {
              font-size: 11px;
            }


.watermark.cross {
  position: fixed;
  opacity: 0.4;
  font-size: 4em; /* Adjust font size as needed */
  color: #ccc;
  z-index: 9999;
  pointer-events: none;
  /* Center the watermark */
  top: 50%; /* Adjust vertical position if needed */
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg); /* Rotate and center */
  transform-origin: center center; /* Set rotation origin */
  white-space: nowrap; /* Prevent text from wrapping */
}



    /* Hide non-print elements */
    .non-print {
      display: none;
    }
          }
        `}
      </style>
      {/* PRINT BUTTON */}

      <div className="d-flex justify-content-end">
        <div className="mr-5">
          <button
            className="me-2 bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrintWithWatermark("Consignee Copy")}
            style={{
              marginBottom: "20px",
            }}
          >
            Consignee Copy
          </button>
          <button
            className="me-2 bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrintWithWatermark("Transporter Copy")}
            style={{
              marginBottom: "20px",
            }}
          >
            Transporter Copy
          </button>
          <button
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrintWithWatermark("Consignor Copy")}
            style={{
              marginBottom: "20px",
            }}
          >
            Consignor Copy
          </button>
        </div>

        <div className="">
          <IoMdClose
            onClick={handleReportClose}
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>
      </div>
      <div className="abc" ref={componentRef}>
        <div className="container-sm">
          <div className="card bg-base-100 shadow-xl p-4" ref={componentRef}>
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src="/AI_Packs.png"
                  alt="Your Image"
                  style={{ width: "150px" }}
                />
              </div>

              <div className="text-center mt-5">
                <h1 className="text-xl">
                  <strong>{headerData.senderName}</strong>
                  <strong>SCM AI-PACKS PVT LIMITED</strong>
                </h1>
                <br />
                <h3>
                  <strong>Material Issue Manifest</strong>
                </h3>
              </div>
              <div className="mr-3 mt-4">
                {qrCodeValue && <QRCode value={qrCodeValue} size={120} />}
              </div>
            </div>

            <hr />

            {/* <div className="d-flex justify-content-start"> */}
            <div className="d-flex flex-column mt-2">
              <div className="d-flex flex-row me-5">
                <div className="font-semibold mb-2" style={{ width: 150 }}>
                  Transaction No:
                </div>
                <div>{headerData.binreqno}</div>
                <div>MIM1245</div>
              </div>
              <div className="d-flex flex-row">
                <div className="font-semibold mb-2" style={{ width: 150 }}>
                  Transaction Date:
                </div>
                <div>{headerData.binreqdate}</div>
                <div>26/7/2024</div>
              </div>
              <div className="d-flex flex-row">
                <div className="font-semibold mb-2" style={{ width: 150 }}>
                  Dispatch Date:
                </div>
                <div>26/7/2024</div>
              </div>
              <div className="d-flex flex-row">
                <div className="font-semibold mb-2" style={{ width: 150 }}>
                  Transaction Type:
                </div>
                <div>{headerData.binreqdate}</div>
                <div>Issue Docket</div>
              </div>
            </div>

            {/* Sender and Receiver details */}
            <div className="row mt-4">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="d-flex justify-content-start">
                  <div className="d-flex flex-column justify-content-between ms-2 me-4">
                    <div className="mb-3 font-semibold">Sender:</div>
                    <div className="mb-3 font-semibold">Address:</div>
                    {/* <div className="mb-3 font-semibold">GST:</div> */}
                  </div>
                  <div className="d-flex flex-column">
                    {/* <div className="mb-3">{headerData.senderName}</div> */}
                    <div className="mb-3">SCM AI-PACKS Private Limited</div>
                    <div className="mb-3">
                      {/* {headerData.senderAddress}
                      {headerData.senderCity} */}
                      Survey No. 156, ESI Ring Road, Mookandapalli, Hosur,
                      Krishnagiri, Tamilnadu - 635126
                      <br />
                    </div>
                    {/* <div className="mb-3"> {headerData.senderGst}</div> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="d-flex">
                  <div className="d-flex flex-column justify-content-between ms-2 me-4">
                    <div className="mb-3 font-semibold">Receiver:</div>
                    <div className="mb-3 font-semibold">Address:</div>
                    <div className="mb-3 font-semibold">GST:</div>
                  </div>
                  <div className="d-flex flex-column">
                    {/* <div className="mb-3">{headerData.receiverName}</div> */}
                    <div className="mb-3">BAXY LIMITED</div>
                    <div className="mb-3">
                      {/* {headerData.receiverAddress}
                      {headerData.senderCity} */}
                      {/* <br />   */}
                      A-88, RIICO Industrial Area, Bhiwadi, Dist. Alwar,
                      Rajasthan-301019
                    </div>
                    {/* <div className="mb-3"> {headerData.receiverGstin}</div> */}
                    <div className="mb-3">08AAGCB9029H1ZI</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex row mt-2">
              {/* Responsive table */}
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  style={{ borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      {/* <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                          width: 30,
                        }}
                      >
                        Allotment No
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                          width: 30,
                        }}
                      >
                        Allotment Date
                      </th> */}
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Kit ID
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Kit Name
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        KIT QTY
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        HSN Code
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                          width: 30,
                        }}
                      >
                        Product
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Product Code
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Product QTY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {gridData &&
                      gridData.map((row) => ( */}
                    {sampleData &&
                      sampleData.map((row) => (
                        <>
                          <tr>
                            {/* <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                                width: 30,
                              }}
                            >
                              {row.allotmentNo}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                                width: 30,
                              }}
                            >
                              {row.allotmentDate}
                            </td> */}
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.kitcode}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.kit}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.allotkitqty}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.hsnCode}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                                width: 30,
                              }}
                            >
                              {row.productName}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.productCode}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                                width: 50,
                              }}
                            >
                              {row.productQty}
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Other Details */}
            <div className="mt-2">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-between me-4">
                  <div className="mb-2 font-semibold">Amount In Words:</div>
                  <div className="mb-2 font-semibold">Transporter:</div>
                  <div className="mb-2 font-semibold">Vehicle No:</div>
                  <div className="mb-2 font-semibold">Driver No:</div>
                </div>
                {/* <div className="d-flex flex-column">
                <div className="mb-3">{headerData.senderName}</div>
                <div className="mb-3">SCM AI-PACKS Private Limited</div>
                <div className="mb-3"></div>
                <div className="mb-3">{headerData.senderGst}</div>
                </div> */}
                <div className="d-flex justify-content-between">
                  <div className="font-semibold me-5">Amount: </div>
                  <div className="font-semibold">--</div>
                </div>
              </div>
            </div>
            <hr />

            {/* Declaration */}
            <div className="row mt-3 mb-2">
              <div className="col-lg-2">
                <strong style={{ width: 225 }}>Declaration:</strong>
              </div>
              <div className="col-lg-10">
                <p>
                  The packaging products given on hire shall always remain the
                  property of SCM AI-PACKS Private Limited and shall not be used
                  for the purpose otherwise agreed upon. The same shall be
                  returned at the address notified by SCM AI-PACKS Private
                  Limited.
                </p>
              </div>
            </div>
            {/* Note */}
            <div className="row mb-3">
              <div className="col-lg-2">
                <strong style={{ width: 225 }}>Note:</strong>
              </div>
              <div className="col-lg-10">
                <p>
                  1.The goods listed in the above manifest are used empty
                  packaging issued to customer on a daily hire basis. The
                  service is packaging on{" "}
                  <strong>rental model and not sale to customer.</strong>
                  <br />
                  2. No E-Way Bill is required for Empty Cargo Containers.
                  Refer, Rule 14 of Central Goods and Services Tax (Second
                  Amendment) Rules, 2018.
                </p>
              </div>
            </div>
            <hr />
            {/* Signatures */}
            <div className="d-flex justify-content-between mt-4 mb-5">
              <div className="ms-5">
                <strong className="size">For Sending Location:</strong>
              </div>
              <div className="me-5">
                <strong className="size">For Receiving Location :</strong>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5 mb-5">
              <div className="d-flex flex-column">
                <div className="ms-5">
                  <strong className="size">Authorized Signature:</strong>
                </div>
                <div className="ms-4">(Company Seal & Signature)</div>
              </div>
              <div className="d-flex flex-column">
                <div className="ms-4">
                  <strong className="size">Authorized Signature:</strong>
                </div>
                <div className="me-5">(Company Seal & Signature)</div>
              </div>
            </div>
            <div className={`watermark cross`}>{watermark}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialIssueManifest;
