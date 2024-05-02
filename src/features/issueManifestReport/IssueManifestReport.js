import React, { useRef, useEffect, useState } from "react";
import { MdPrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

export const IssueManifestReport = ({ docId }) => {
  const componentRef = useRef();
  const [headerData, setHeaderData] = useState([])
  const [gridData, setGridData] = useState([])

  useEffect(() => {
    getHeaderDetailsByDocId()
  }, []);

  const getHeaderDetailsByDocId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfHeaderDetails?docid=${docId}`
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        console.log("API Response:", response.data.paramObjectsMap.HeaderDetails[0]);
        setHeaderData(response.data.paramObjectsMap.HeaderDetails[0]);
        try {
          const response = await axios.get(
            // `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfHeaderDetails?docid=${docId}`
            `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfGridDetails?docid=${docId}`
          );
          console.log("API Response:", response);

          if (response.status === 200) {
            console.log("API Response for Grid:", response.data.paramObjectsMap.allotDetails);
            setGridData(response.data.paramObjectsMap.allotDetails);
          } else {
            console.error("API Error:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      {/* {docId} */}
      <style>
        {`
          @media print {
            .container-sm {
              width: 100%;
            }
            .card {
              box-shadow: none;
              border: none;
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
              width: 80%; /* Reduce table width for printing */
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
          }
        `}
      </style>
      {/* PRINT BUTTON */}
      <div className="text-right mr-5">
        <button
          className="btn btn-primary"
          onClick={handlePrint}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          <MdPrint style={{ fontSize: "20px" }} />
        </button>
      </div>

      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-5" ref={componentRef}>
          {/* HEADINGS */}
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="text-xl">
                <strong>
                  SCM AI-PACKS

                  Private Limited
                </strong>
              </h1>
              <br />
              <h3><strong>Bin Allotment</strong></h3>
            </div>
            {/* <div className="col-md-6">
              <h1 className="text-xl text-center">
                <strong>
                  Bin
                  <br />
                  Allotment
                </strong>
              </h1>
            </div> */}
          </div>
          {/* <div className="row mt-4">
            <div className="col-md-12 font-weight-bold">
              <hr />
            </div>
          </div> */}

          <div className="row -flex mt-2 flex-row flex-wrap">
            {/* <div className="col-md-12"> */}
            {/* Transaction details table */}
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
            {/* </div> */}
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
                      {headerData.senderAddress},{" "}{headerData.senderCity}
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
                    <td style={{ textAlign: "left" }}>{/*29ABMCS1982P1ZA */}{headerData.senderGst}</td>
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
                      {/* BAXY LIMITED */}{headerData.receiverName}
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
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      Kit ID
                    </th>
                    {/* <th
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      Kit Name
                    </th> */}
                    <th
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      KIT QTY
                    </th>
                    <th
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      HSN Code
                    </th>
                    <th
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      Product Code
                    </th>
                    <th
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      Product
                    </th>
                    <th
                      style={{ border: "2px solid black", textAlign: "center" }}
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
                          {/* <td
                            style={{
                              border: "2px solid black",
                              textAlign: "center",
                            }}
                          >
                            Kit Name
                          </td> */}
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
                            {row.productCode}
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
                packaging containers and dunnages (packaging Material) issued to
                customer as sample and has no commercial value. The value
                declared in the manifest is for indication purpose only.
                <br />
                2. No E-Way Bill is required for Empty Cargo Containers. Refer,
                Rule 14 of Central Goods and Services Tax (Second Amendment)
                Rules, 2018.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueManifestReport;
