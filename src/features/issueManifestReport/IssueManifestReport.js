import React from "react";

export const IssueManifestReport = () => {
  return (
    <div>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl p-5">
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
            <div className="col-md-8">
              <table>
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
              </table>
            </div>
            <div className="col-md-4">
              <table>
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
              </table>
            </div>
          </div>
          <div className="row mt-5 flex-row text-center">
            <div className="col-md-6 ">
              <table>
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
              </table>
            </div>
            <div className="col-md-6 ">
              <table>
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
              </table>
            </div>
          </div>
          <div className="d-flex row mt-5">
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
                    style={{ border: "2px solid black", textAlign: "center" }}
                  >
                    SKIT01
                  </td>
                  <td
                    style={{ border: "2px solid black", textAlign: "center" }}
                  >
                    Cylinder Head Comp (H276/H230)
                  </td>
                  <td
                    style={{ border: "2px solid black", textAlign: "center" }}
                  >
                    1
                  </td>
                  <td
                    style={{ border: "2px solid black", textAlign: "center" }}
                  >
                    3293
                  </td>
                  <td
                    style={{ border: "2px solid black", textAlign: "center" }}
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
                    style={{ border: "2px solid black", textAlign: "center" }}
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
                    style={{ border: "2px solid black", textAlign: "center" }}
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
              </tbody>
            </table>
          </div>
          <div className="row mt-2 flex-row">
            <div className="col-md-9">
              <table>
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
              </table>
            </div>
            <div className="col-md-3">
              <table>
                <tr>
                  <td>
                    <strong>Amount :</strong>
                  </td>
                  <td>----</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 font-weight-bold">
              <hr />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-2">
              <strong>Declaration:</strong>
            </div>
            <div className="col-md-10">
              <p>
                The packaging products given on hire shall always remain the
                property of SCM AI-PACKS Private Limited and shall not be used
                for the purpose otherwise agreed upon. The same shall be
                returned at the address notified by SCM AI-PACKS Private
                Limited.
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-2">
              <strong>Note:</strong>
            </div>
            <div className="col-md-10">
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
          <div className="row mt-4">
            <div className="col-md-12 font-weight-bold">
              <hr />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6" style={{ textAlign: "left" }}>
              <strong>For Sending Location:</strong>
            </div>
            <div className="col-md-6" style={{ textAlign: "center" }}>
              <strong>For Receiving Location :</strong>
            </div>
          </div>
          <div className="row mb-10" style={{ marginTop: "150px" }}>
            <div className="col-md-6" style={{ textAlign: "left" }}>
              <strong className="ml-5">Authorized Signature:</strong>
              <br />
              (Company Seal & Signature)
            </div>
            <div className="col-md-6" style={{ textAlign: "center" }}>
              <strong>Authorized Signature :</strong>
              <br />
              (Company Seal & Signature)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
