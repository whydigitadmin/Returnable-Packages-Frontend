import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BILLS = [
  {
    imno: "1001",
    imdate: "16-01-2024",
    kitno: "1072",
    issueqty: "10",
    outwardno: "101",
    outwarddate: "18-01-2024",
    openqty: "10",
    owqty: "5",
    cqty: "5",
    pno: "ABC001",
    pname: "PISTON",
    pqty: "1000",
    inv: "INV001",
  },
  {
    imno: "1002",
    imdate: "17-01-2024",
    kitno: "1075",
    issueqty: "10",
    outwardno: "-",
    outwarddate: "-",
    openqty: "20",
    owqty: "-",
    cqty: "20",
    pno: "-",
    pname: "-",
    pqty: "-",
    inv: "-",
  },
  {
    imno: "1006",
    imdate: "12-01-2024",
    kitno: "1078",
    issueqty: "0",
    outwardno: "102",
    outwarddate: "14-01-2024",
    openqty: "20",
    owqty: "10",
    cqty: "10",
    pno: "ABC001",
    pname: "PISTON",
    pqty: "2000",
    inv: "INV003",
  },
];

function StockAdjustment() {
  const [bills, setBills] = useState(BILLS);

  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-1">
              <div className="d-flex justify-content-center">
                <Link to="/app/EmitterLanding">
                  <FaArrowCircleLeft className="cursor-pointer w-8 h-8 mt-4" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 14 }}
                  />
                  <h4 className="text-xl font-semibold pt-1 mt-2 ms-1 mb-2">
                    Location -
                  </h4>
                  <h4 className="text-2xl font-semibold ms-1 mt-2">Gabriel</h4>
                </div>
              </div>
              <p className="mb-3">
                29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                Pune, Maharashtra, 410501 India
              </p>
            </div>
            <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16  h-16 "
                style={{ marginTop: 50 }}
              />
            </div>
            <div className="col-lg-4 card bg-base-100 shadow-xl ms-2 mt-3">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <FaLocationDot
                    className="text-xl font-semibold w-5 h-5"
                    style={{ marginTop: 11 }}
                  />
                  <h4 className="text-xl font-semibold mt-2 ms-1 me-1 mb-2">
                    Issued To -
                  </h4>
                  <h4 className="text-2xl font-semibold mt-1">
                    Tata Motors- Pune
                  </h4>
                </div>

                <p className="ms-1 mb-2">
                  29, Milestone Village, Kuruli, Pune Nasik Highway, Taluk Khed,
                  Pune, Maharashtra, 410501 India
                </p>
              </div>
            </div>
          </div>
          <div
            className="w-full p-6 bg-base-100 shadow-xl"
            style={{ borderRadius: 16 }}
          >
            <div className="text-xl font-semibold">Stock Report</div>
            <div className="divider mt-2"></div>
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>IM No</th>
                    <th>Issue Date</th>
                    <th>KIT No</th>
                    <th>Issue Qty</th>
                    <th>Outward No</th>
                    <th>Outward Date</th>
                    <th>Opening Qty</th>
                    <th>O/W Qty</th>
                    <th>Closing Qty</th>
                    <th>Part No</th>
                    <th>Part Name</th>
                    <th>Part Qty</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>{l.imno}</td>
                        <td>{l.imdate}</td>
                        <td>{l.kitno}</td>
                        <td className="text-center">{l.issueqty}</td>
                        <td className="text-center">{l.outwardno}</td>
                        <td>{l.outwarddate}</td>
                        <td className="text-center">{l.openqty}</td>
                        <td className="text-center">{l.owqty}</td>
                        <td className="text-center">{l.cqty}</td>
                        <td>{l.pno}</td>
                        <td>{l.pname}</td>
                        <td className="text-center">{l.pqty}</td>
                        <td>{l.inv}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default StockAdjustment;
