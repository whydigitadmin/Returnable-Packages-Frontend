import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import TitleCard from "../../../components/Cards/TitleCard";

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
  const [isPendingPopupOpen, setPendingPopupOpen] = useState(false);
  const [selectedPendingBill, setSelectedPendingBill] = useState(null);

  const handlePendingStatusClick = (bill) => {
    setPendingPopupOpen(true);
    setSelectedPendingBill(bill);
  };

  const closePendingPopup = () => {
    setPendingPopupOpen(false);
    setSelectedPendingBill(null);
  };

  const getPaymentStatus = (status, bill) => {
    if (status === "Issued")
      return (
        <div className="badge bg-success text-white cursor-pointer">
          {status}
        </div>
      );
    if (status === "Pending")
      return (
        <div
          className="badge bg-danger text-white cursor-pointer"
          onClick={() => handlePendingStatusClick(bill)}
        >
          {status}
        </div>
      );
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
      {/* <Dialog open={isPendingPopupOpen} onClose={closePendingPopup}>
        <DialogTitle>Issue Manifest</DialogTitle>
        <DialogContent>
          <p>NO: 102</p>
          <p>Date: 19/01/2024</p>
        </DialogContent>
        <Button onClick={closePendingPopup}>Close Popup</Button>
      </Dialog> */}
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={isPendingPopupOpen}
        onClose={closePendingPopup}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Issue Manifest</DialogTitle>
          <IoMdClose
            className="cursor-pointer w-8 h-8 mt-3 me-3"
            onClick={closePendingPopup}
          />
        </div>
        <DialogContent>
          <DialogContentText className="d-flex flex-column">
            {/* <div className="d-flex justify-content-center">
              <div className="col-lg-4 text-center my-3"></div>
            </div> */}
            <div className="col-lg-4 text-dark"> No: 1704</div>
            <div className="col-lg-4 text-dark">Date : 19/01/2022</div>
            <div className="col-lg-6  text-dark mt-3">
              Part Name/No : PISTON/PS01
            </div>
            <div className="col-lg-6 text-dark ">Demand Qty : 10</div>
            <div className="col-lg-6 mt-3 font-bold text-xl">Kit No : 1072</div>
            <div className="col-lg-6  text-dark mt-3">Available Qty: 15</div>
            <div className="col-lg-6 text-dark ">Issued Qty : 10</div>
            <div className="col-lg-6 text-dark ">balance Qty : 5</div>
            <div className="col-lg-4 text-dark  mt-3"></div>
          </DialogContentText>
        </DialogContent>
        <div className="d-flex justify-content-center">
          <DialogActions className="mb-2 me-2">
            {/* <Button onClick={closePendingPopup}>Cancel</Button> */}
            <Button
              component="label"
              variant="contained"
              onClick={closePendingPopup}
            >
              Submit
            </Button>
          </DialogActions>
        </div>
        <DialogContentText>
          <center className="text-dark">
            Issued by AIPACKS - Karthi-19/01/2024-10:00AM
          </center>
        </DialogContentText>
      </Dialog>
    </>
  );
}

export default Billing;
