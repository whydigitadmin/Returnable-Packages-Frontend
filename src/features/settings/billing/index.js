import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";

const BILLS = [
  {
    rmno: "1072",
    rmdate: "16-02-2024",
    ddate: "18-02-2024",
    kitno: "KIT1072",
    fname: "GB PUNE TO TATA PUNE",
    rqty: "10",
    iqty: "10",
    bqty: "0",
    tat: "48",
    pname: "PISTON/PS01",
    status: "Issued",
  },
  {
    rmno: "1072",
    rmdate: "16-02-2024",
    ddate: "18-02-2024",
    kitno: "KIT1072",
    fname: "GB PUNE TO TATA PUNE",
    rqty: "10",
    iqty: "10",
    bqty: "0",
    tat: "48",
    pname: "PISTON/PS01",
    status: "Pending",
  },
  {
    rmno: "1072",
    rmdate: "16-02-2024",
    ddate: "18-02-2024",
    kitno: "KIT1072",
    fname: "GB PUNE TO TATA PUNE",
    rqty: "10",
    iqty: "10",
    bqty: "0",
    tat: "48",
    pname: "PISTON/PS01",
    status: "Pending",
  },

  // {
  //   invoiceNo: "#4523",
  //   amount: "34,989",
  //   description: "Product usages",
  //   status: "Pending",
  //   generatedOn: moment(new Date())
  //     .add(-30 * 2, "days")
  //     .format("DD MMM YYYY"),
  //   paidOn: "-",
  // },

  // {
  //   invoiceNo: "#4453",
  //   amount: "39,989",
  //   description: "Product usages",
  //   status: "Paid",
  //   generatedOn: moment(new Date())
  //     .add(-30 * 3, "days")
  //     .format("DD MMM YYYY"),
  //   paidOn: moment(new Date())
  //     .add(-24 * 2, "days")
  //     .format("DD MMM YYYY"),
  // },
];

function Billing() {
  const [bills, setBills] = useState(BILLS);

  const getPaymentStatus = (status) => {
    if (status === "Issued")
      return <div className="badge badge-success">{status}</div>;
    if (status === "Pending")
      return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  return (
    <>
      <TitleCard title="Issue Manifest Details" topMargin="mt-2">
        {/* Invoice list in table format loaded constant */}
        <div className="overflow-x-auto w-full ">
          <table className="table w-full">
            <thead>
              <tr>
                <th>RM No.</th>
                <th>RM Date</th>
                <th>Demand Date</th>
                <th>KIT NO</th>
                <th>Flow Name</th>
                <th>Req Qty</th>
                <th>Issued Qty</th>
                <th>Bal Qty</th>
                <th>TAT (Hrs)</th>
                <th>Part Name/No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.rmno}</td>
                    <td>{l.rmdate}</td>
                    <td>{l.ddate}</td>
                    <td>{l.kitno}</td>
                    <td>{l.fname}</td>
                    <td>{l.rqty}</td>
                    <td>{l.iqty}</td>
                    <td>{l.bqty}</td>
                    <td>{l.tat}</td>
                    <td>{l.pname}</td>
                    <td>{getPaymentStatus(l.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Billing;
