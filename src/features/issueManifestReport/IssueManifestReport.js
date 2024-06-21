import React, { useRef, useEffect, useState } from "react";
import { MdPrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import QRCode from "qrcode.react";

export const IssueManifestReport = ({ goBack, docId, onClose }) => {
  const componentRef = useRef();
  const [headerData, setHeaderData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [qrCodeValue, setQrCodeValue] = useState([]);
  const [watermark, setWatermark] = useState("");

  useEffect(() => {
    getHeaderDetailsByDocId();
  }, []);

  const getHeaderDetailsByDocId = async () => {
    try {
      const headerResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfHeaderDetails?docid=${docId}`
      );
      console.log("API headerResponse:", headerResponse);

      if (headerResponse.status === 200) {
        console.log(
          "API headerResponse:",
          headerResponse.data.paramObjectsMap.HeaderDetails[0]
        );
        setHeaderData(headerResponse.data.paramObjectsMap.HeaderDetails[0]);
        try {
          const gridResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfGridDetails?docid=${docId}`
          );
          console.log("API gridResponse:", gridResponse);

          if (gridResponse.status === 200) {
            console.log(
              "API gridResponse for Grid:",
              gridResponse.data.paramObjectsMap.allotDetails
            );
            setGridData(gridResponse.data.paramObjectsMap.allotDetails);

            // Concatenate relevant fields from header and grid data
            const concatenatedData = JSON.stringify({
              // headerData: headerResponse.data.paramObjectsMap.HeaderDetails[0],
              TransactionNo:
                headerResponse.data.paramObjectsMap.HeaderDetails[0].allotno,
              TransactionDate:
                headerResponse.data.paramObjectsMap.HeaderDetails[0].allotDate,
              Receiver:
                headerResponse.data.paramObjectsMap.HeaderDetails[0]
                  .receiverName,
              RequestNo:
                headerResponse.data.paramObjectsMap.HeaderDetails[0].binreqno,
              Kit: gridResponse.data.paramObjectsMap.allotDetails[0].kitcode,
              // gridData: gridResponse.data.paramObjectsMap.allotDetails,
            });

            setQrCodeValue(concatenatedData);
            console.log("THE QRCODE DATA IS:", concatenatedData);
          } else {
            console.error("API Error:", gridResponse.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("API Error:", headerResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    goBack(false);
    onClose(false);
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
          {/* <button
            className="btn btn-primary"
            onClick={handlePrint}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <MdPrint style={{ fontSize: "20px" }} />
          </button> */}

          {/* <button
            className="btn btn-primary"
            onClick={handlePrint}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <MdPrint style={{ fontSize: "20px" }} />
          </button> */}
          <button
            className="me-2 bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrintWithWatermark("Consignee Copy")}
            style={{
              // padding: "10px 20px",
              // fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            Consignee Copy
            {/* <MdPrint style={{ fontSize: "20px" }} /> */}
          </button>
          <button
            className="me-2 bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrintWithWatermark("Transporter Copy")}
            style={{
              // padding: "10px 20px",
              // fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            Transporter Copy
          </button>
          <button
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => handlePrintWithWatermark("Consignor Copy")}
            style={{
              // padding: "10px 20px",
              // fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            Consignor Copy
          </button>
        </div>

        <div className="mt-2">
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
                </h1>
                <br />
                <h3>
                  <strong>Bin Allotment</strong>
                </h3>
              </div>
              <div className="mr-3 mt-4">
                {qrCodeValue && <QRCode value={qrCodeValue} size={120} />}
              </div>
            </div>

            <div className="row -flex mt-2 flex-row flex-wrap">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="fw-bold">Transaction No:</td>
                    <td className="px-3">{headerData.allotno}</td>
                    <td className="fw-bold">Transaction Date:</td>
                    <td className="px-3">{headerData.allotDate}</td>
                    <td className="fw-bold">Dispatch Date:</td>
                    <td className="px-3">{headerData.binreqdate}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sender and Receiver details */}
            <div className="row mt-2">
              <div className="col-md-6 ">
                <table className="table">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <strong>Sender:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {headerData.senderName}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <strong>Address:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {/* #8, 03rd Main, 3rd Cross, Hoysala Nagar */}
                        {headerData.senderAddress}, {headerData.senderCity}
                        <br />
                        {/* Ramamurthy Nagar, Bengaluru - 560016 */}
                        {headerData.senderState}
                        <br />
                        {/* Karnataka */}
                        {headerData.senderPinCode}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <strong>GST:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {/*29ABMCS1982P1ZA */}
                        {headerData.senderGst}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 ">
                <table className="table">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <strong>Receiver:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {/* BAXY LIMITED */}
                        {headerData.receiverName}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <strong>Address:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        A-88 Industrial Area, Bhiwadi, Alwar,
                        <br />
                        Rajasthan 301019
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }}>
                        <strong>GST:</strong>{" "}
                      </td>
                      <td style={{ textAlign: "left" }}>08AAGCB9029H1Z1</td>
                    </tr>
                  </tbody>
                </table>
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
                    {gridData &&
                      gridData.map((row) => (
                        <>
                          <tr>
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
                              {row.allotkitqty}
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
                              }}
                            >
                              -
                            </td>
                            <td
                              style={{
                                border: "2px solid black",
                                textAlign: "center",
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
            <div className="row mt-2">
              <div className="col-md-9">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Amount In Words:</strong>
                      </td>
                      <td>----</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Transporter:</strong>
                      </td>
                      <td>Safe Express</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Vehicle No:</strong>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Driver Ph No:</strong>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Amount:</strong>
                      </td>
                      <td>----</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Signatures */}
            <div className="row mt-2">
              <div className="col-md-6">
                <strong className="size">For Sending Location:</strong>
                {/* Add sender signature block here */}
              </div>
              <div className="col-md-6">
                <strong className="size">For Receiving Location :</strong>
                {/* Add receiver signature block here */}
              </div>
            </div>
            {/* Declaration */}
            <div className="row mt-4">
              <div className="col-md-12">
                <strong>Declaration:</strong>
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
            <div className="row mt-5">
              <div className="col-md-12">
                <strong>Note:</strong>
                <p>
                  1. The goods listed in the above manifest are empty foldable
                  packaging containers and dunnages (packaging Material) issued
                  to customer as sample and has no commercial value. The value
                  declared in the manifest is for indication purpose only.
                  <br />
                  2. No E-Way Bill is required for Empty Cargo Containers.
                  Refer, Rule 14 of Central Goods and Services Tax (Second
                  Amendment) Rules, 2018.
                </p>
              </div>
            </div>
            <div className={`watermark cross`}>{watermark}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueManifestReport;
