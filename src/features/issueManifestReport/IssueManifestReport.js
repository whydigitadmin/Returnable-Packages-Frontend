import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const IssueManifestReport = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
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
          Print as PDF
        </button>
      </div>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-5" ref={componentRef}>
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-xl">
                <strong>
                  SCM AI-PACKS
                  <br />
                  Private Limited
                </strong>
              </h1>
            </div>
            <div className="col-md-6">
              <h1 className="text-xl text-center">
                <strong>
                  Issue
                  <br />
                  Manifest
                </strong>
              </h1>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 font-weight-bold">
              <hr />
            </div>
          </div>
          <div className="row mt-2 flex-row">
            <div className="col-md-5">
              {/* Transaction details table */}
              <table className="table">
                <tbody>
                  <tr>
                    <td>Transaction No:</td>
                    <td>MIM1106</td>
                  </tr>
                  <tr>
                    <td>Transaction Date:</td>
                    <td>07/03/24</td>
                  </tr>
                  <tr>
                    <td>Dispatch Date:</td>
                    <td>07/03/24</td>
                  </tr>
                  <tr>
                    <td>Transaction Type:</td>
                    <td>SAMPLE FOLDABLE PACKAGING</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-4">
              {/* Checkbox options table */}
              <table className="table">
                <tbody>
                  <tr>
                    <td>[ ]</td>
                    <td>Original for Consignee</td>
                  </tr>
                  <tr>
                    <td>[ ]</td>
                    <td>Duplicate for Transporter</td>
                  </tr>
                  <tr>
                    <td>[ ]</td>
                    <td>Triplicate for Consignor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Sender and Receiver details */}
          <div className="row mt-5">
            <div className="col-md-6 ">
              <table className="table">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <strong>Sender's Name</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      SCM AI-PACKS PRIVATE LIMITED
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <strong>Sender's Address</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      #8, 03rd Main, 3rd Cross, Hoysala Nagar
                      <br />
                      Ramamurthy Nagar, Bengaluru - 560016
                      <br />
                      Karnataka
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <strong>GST:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>29ABMCS1982P1ZA</td>
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
                    <td style={{ textAlign: "left" }}>BAXY LIMITED</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <strong>Receiver's Address:</strong>
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

          <div className="d-flex row mt-5">
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
                      KIT Quantity
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
                      Product Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      SKIT01
                    </td>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      Cylinder Head Comp (H276/H230)
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
                      PP1412
                      <br />
                      PL1412
                      <br />
                      PS1412
                      <br />
                      P1SS01
                      <br />
                      SP1A01
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
                      1
                      <br />
                      1
                      <br />
                      1
                      <br />
                      9
                      <br />8
                    </td>
                  </tr>
                  {/* Additional rows */}
                  <tr>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      SKIT02
                    </td>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      Example Product 2
                    </td>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      2
                    </td>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      3294
                    </td>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      PP1413
                      <br />
                      PL1413
                      <br />
                      PS1413
                      <br />
                      P1SS02
                      <br />
                      SP1A02
                    </td>
                    <td
                      style={{
                        border: "2px solid black",
                        textAlign: "center",
                      }}
                    >
                      Example Product
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
                      2
                      <br />
                      2
                      <br />
                      2
                      <br />
                      10
                      <br />9
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Details */}
          <div className="row mt-5">
            <div className="col-md-9">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Amount In Words:</strong>
                    </td>
                    <td>Forty Eight Thousand Five Hundred Only</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Transporter Name:</strong>
                    </td>
                    <td>Market Vendor</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Vehicle No:</strong>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Driver No:</strong>
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
                      <strong>Amount :</strong>
                    </td>
                    <td>----</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Signatures */}
          <div className="row mt-5">
            <div className="col-md-6">
              <strong>For Sending Location:</strong>
              {/* Add sender signature block here */}
            </div>
            <div className="col-md-6">
              <strong>For Receiving Location :</strong>
              {/* Add receiver signature block here */}
            </div>
          </div>
          {/* Declaration */}
          <div className="row mt-5">
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
