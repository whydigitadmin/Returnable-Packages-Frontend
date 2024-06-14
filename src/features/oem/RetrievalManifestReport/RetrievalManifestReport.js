import React, { useRef, useEffect, useState } from "react";
import { MdPrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

export const RetrievalManifestReport = ({ goBack, docId }) => {
  const componentRef = useRef();
  const [headerData, setHeaderData] = useState([]);
  const [gridData, setGridData] = useState([]);

  //   useEffect(() => {
  //     getHeaderDetailsByDocId();
  //   }, []);

  //   const getHeaderDetailsByDocId = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfHeaderDetails?docid=${docId}`
  //       );
  //       console.log("API Response:", response);

  //       if (response.status === 200) {
  //         console.log(
  //           "API Response:",
  //           response.data.paramObjectsMap.HeaderDetails[0]
  //         );
  //         setHeaderData(response.data.paramObjectsMap.HeaderDetails[0]);
  //         try {
  //           const response = await axios.get(
  //             // `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfHeaderDetails?docid=${docId}`
  //             `${process.env.REACT_APP_API_URL}/api/master/getBinAllotmentPdfGridDetails?docid=${docId}`
  //           );
  //           console.log("API Response:", response);

  //           if (response.status === 200) {
  //             console.log(
  //               "API Response for Grid:",
  //               response.data.paramObjectsMap.allotDetails
  //             );
  //             setGridData(response.data.paramObjectsMap.allotDetails);
  //           } else {
  //             console.error("API Error:", response.data);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       } else {
  //         console.error("API Error:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleReportClose = () => {
    goBack(false);
  };

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
            .col-md-8 {
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-md-5 {
              flex: 0 0 40%;
              max-width: 40%;
            }
            .col-md-4 {
              flex: 0 0 30%;
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

      <div className="d-flex justify-content-end">
        <div className="mr-5">
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

        <div className="mt-2">
          <Link to="/app/retrivalmanifest">
            <IoMdClose
              // onClick={handleReportClose}
              className="cursor-pointer w-8 h-8 mb-3"
            />
          </Link>
        </div>
      </div>

      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-5" ref={componentRef}>
          {/* HEADINGS */}
          {/* <div className="row">
            <div className="col-md-2 text-center">
              <img
                src="/AI_Packs.png"
                alt="Your Image"
                style={{ width: "100px", marginTop: "20px" }}
              />
            </div>
            <div className="col-md-10 text-center">
              <h1 className="text-xl">
                <strong>SCM AIPACKS Private Limited</strong>
              </h1>
              <br />
              <h3>
                <strong>Bin Allotment</strong>
              </h3>
            </div>
          </div> */}
          <div className="d-flex justify-content-between flex-nowrap">
            <div
              className="col-md-9"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/AI_Packs.png"
                alt="Your Image"
                style={{ width: "10%", marginRight: "10px" }} // Adjust margin as needed
              />
              <div style={{ fontSize: "28px" }}>
                <strong>
                  SCM AI-PACKS
                  <br />
                  Private Limited
                </strong>
              </div>
            </div>
            <div
              className="col-md-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <strong style={{ fontSize: "20px" }}>
                Retrieval <br />
                Manifest
              </strong>
            </div>
          </div>
          <hr />
          <div className="row mt-2 d-flex justify-content-between">
            <div className="col-md-4">
              <table className="table">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <strong>Transaction No:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>RM3009</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <strong>Transaction Date:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>27/5/2024</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <strong>Dispatch Date:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>27/5/2024</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <strong>Transactiona Type:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>Retrieval Docket</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4"></div>

            <div className="col-md-4">
              <table className="table">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      [ ] Original for Consignee
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      [ ] Duplicate for Transporter
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      [ ] Triplicate for Consignor
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sender and Receiver details */}
          <div className="row mt-2">
            <div className="col-md-6 ">
              <table className="table">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <strong>Sender's Name:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>BAXY LIMITED</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <strong>Sender's Address:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {/* #8, 03rd Main, 3rd Cross, Hoysala Nagar */}
                      Shed No. 2, Plot No. 27,
                      <br />
                      {/* Ramamurthy Nagar, Bengaluru - 560016 */}
                      Hebbal Main Road, Hebbal Industrial Area,
                      <br />
                      {/* Karnataka */}
                      Mysuru, Karnataka - 570016
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
                      <strong>Receiver's Name:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {/* BAXY LIMITED */}
                      SCM AI-PACKS Private Limited
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <strong>Receiver's Address :</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      Khasra No. 91, Kila No. 1, Village Kankrola,
                      <br />
                      Near IMT Manesar, Sector-7, Gurugram,
                      <br />
                      Haryana-122505
                    </td>
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
                    <th
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      Kit Name
                    </th>
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
                      Product Name
                    </th>
                    <th
                      style={{ border: "2px solid black", textAlign: "center" }}
                    >
                      Product QTY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        KIT1103
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Cylinder Head (H280A)
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        7
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        3293
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        PP1411
                        <br />
                        PL1411
                        <br />
                        PS1411
                        <br />
                        P1SS01
                        <br />
                        P1IN1103
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Pallet
                        <br />
                        LID
                        <br />
                        Sidewall
                        <br />
                        Separator Sheet
                        <br />
                        Insert
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        7<br />7<br />7<br />
                        56
                        <br />
                        56
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        KIT1105
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Cylinder Head with Cover (H277/H321)
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        1
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        3293
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        PP1411
                        <br />
                        PL1411
                        <br />
                        PS1411
                        <br />
                        P1SS01
                        <br />
                        P1IN1105
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Pallet
                        <br />
                        LID
                        <br />
                        Sidewall
                        <br />
                        Separator Sheet
                        <br />
                        Insert
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        1<br />1<br />1<br />
                        8
                        <br />8
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Details */}
          <div className="row mt-2">
            <div className="col-md-6">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Amount In Words:</strong>
                    </td>
                    <td>Forty Seven Thousand and Three Hundred Only </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Transporter Name:</strong>
                    </td>
                    <td>Market Transporter</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Vehicle No:</strong>
                    </td>
                    <td>----------</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Driver No:</strong>
                    </td>
                    <td>----------</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Amount:</strong>
                    </td>
                    <td>47,300</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          {/* Signatures */}
          {/* <div className="row mt-2">
            <div className="col-md-6">
              <strong className="size">For Sending Location:</strong>
            </div>
            <div className="col-md-6">
              <strong className="size">For Receiving Location :</strong>
            </div>
          </div> */}
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
          <div className="row mt-3 mb-3">
            <div className="col-md-12">
              <strong>Note:</strong>
              <p>
                1. The goods listed in the above manifest are used empty
                packaging issued to customer on a daily hire basis. The service
                is packaging on <b>rental model and not sale to customer.</b>
                <br />
                2. No E-Way Bill is required for Empty Cargo Containers. Refer,
                Rule 14 of Central Goods and Services Tax (Second Amendment)
                Rules, 2018.
              </p>
            </div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-md-8">
              <strong className="size">For Sending Location:</strong>
            </div>
            <div className="col-md-4">
              <strong className="size">For Receiving Location :</strong>
            </div>
          </div>
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="col-md-8">
              <strong className="size">Authorized Signature :</strong>
              <br />
              (Company Seal & Signature)
            </div>
            <div className="col-md-4">
              <strong className="size">Authorized Signature :</strong>
              <br />
              (Company Seal & Signature)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrievalManifestReport;
