import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import TitleCard from "../../components/Cards/TitleCard";

const BILLS = [
  {
    status: "Issued",
    rmno: "1072",
    rmdate: "16-02-2024",
    ddate: "18-02-2024",
    issueno: "1001",
    issuedate: "18-02-2024",
    kitno: "KIT1702",
    fname: "GB PUNE TO TATA PUNE",
    rqty: "10",
    iqty: "10",
    nqty: "0",
    returnqty: "0",
    tat: "48",
    pname: "PISTON/PS01",
  },
  {
    status: "Issued",
    rmno: "1073",
    rmdate: "17-02-2024",
    ddate: "20-02-2024",
    issueno: "1002",
    issuedate: "18-02-2024",
    kitno: "KIT1703",
    fname: "GB PUNE TO TATA PUNE",
    rqty: "10",
    iqty: "10",
    nqty: "0",
    returnqty: "0",
    tat: "48",
    pname: "PISTON/PS01",
  },
  {
    status: "Issued",
    rmno: "1074",
    rmdate: "18-02-2024",
    ddate: "21-02-2024",
    issueno: "1003",
    issuedate: "18-02-2024",
    kitno: "KIT1704",
    fname: "GB PUNE TO TATA PUNE",
    rqty: "10",
    iqty: "10",
    nqty: "0",
    returnqty: "0",
    tat: "48",
    pname: "PISTON/PS01",
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

function EmitterInwardDetails() {
  const [bills, setBills] = useState(BILLS);
  const [isPendingPopupOpen, setPendingPopupOpen] = useState(false);
  const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
  const [selectedPendingBill, setSelectedPendingBill] = useState(null);

  const [name, setName] = React.useState("");
  const [netQty, setNetQty] = React.useState("");
  const [returnQty, setReturnQty] = React.useState("");
  const [returnReason, setReturnReason] = React.useState("");
  
  const [errors, setErrors] = React.useState({});

  const updateFormValue = (value) => {
    // Handle the form value update
    setName(value);
  };

  const handlePendingStatusClick = (bill) => {
    setPendingPopupOpen(true);
    setSelectedPendingBill(bill);
  };

  const handlePendingStatusClickIssued = (bill) => {
    setPendingPopupOpenIssued(true);
    setSelectedPendingBill(bill);
  };

  const closePendingPopup = () => {
    setPendingPopupOpen(false);
    setSelectedPendingBill(null);
  };

  const closePendingPopupIssued = () => {
    setPendingPopupOpenIssued(false);
    setSelectedPendingBill(null);
  };
  
  const handleNetQtyReceivedChange = (event) => {
    let input = event.target.value;
    input = input.replace(/[^0-9]/g, "");
    if (input.length > 4) {
        input = input.slice(0, 4);
    }
    setNetQty(input);
};

  const handleReturnQtyChange = (event) => {
    let input = event.target.value;
    input = input.replace(/[^0-9]/g, "");
    if (input.length > 4) {
        input = input.slice(0, 4);
    }
    setReturnQty(input);
};

  const handleReturnReasonChange = (event) => {
    setReturnReason = event.target.value;
};



  const getPaymentStatus = (status, bill) => {
    return (
      <div
        className="badge bg-success text-white cursor-pointer"
        onClick={() => handlePendingStatusClickIssued(bill)}
      >
        {/* <svg
          // xmlns="http://www.w3.org/2000/svg"
          src="/pencil.png"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5" // Adjust the size as needed
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg> */}
      </div>
    );
  };

  return (
    <>
      <TitleCard title="Inward Manifest" topMargin="mt-2">
        {/* Invoice list in table format loaded constant */}
        <div className="overflow-x-auto w-full ">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Update</th>
                <th>RM No.</th>
                <th>RM Date</th>
                <th>Demand Date</th>
                <th>IM No</th>
                <th>IM Date</th>
                <th>Kit No</th>
                <th>Flow</th>
                <th>Req Qty</th>
                <th>Issued Qty</th>
                <th>Net Rec Qty</th>
                <th>Return</th>
                <th>TAT (Hrs)</th>
                <th>Part</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((l, k) => {
                return (
                  <tr key={k}>
                    {/* <td>{getPaymentStatus(l.status)}</td> */}
                    <td><img src="/edit1.png" alt="Favorite" 
                    style={{
                      width: "25px",
                      height: "auto",
                      marginRight: "6px",
                    }}
                    onClick={() => handlePendingStatusClickIssued(l)} // Call handlePendingStatusClickIssued function with the bill object
                    /> </td>
                    <td>{l.rmno}</td>
                    <td>{l.rmdate}</td>
                    <td>{l.ddate}</td>
                    <td>{l.issueno}</td>
                    <td>{l.issuedate}</td>
                    <td>{l.kitno}</td>
                    <td>{l.fname}</td>
                    <td>{l.rqty}</td>
                    <td>{l.iqty}</td>
                    <td>{l.nqty}</td>
                    <td>{l.returnqty}</td>
                    <td>{l.tat}</td>
                    <td>{l.pname}</td>
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
      {/* <Dialog
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
            <div className="col-lg-4 text-dark"> No: 1704</div>
            <div className="col-lg-4 text-dark">Date : 19/01/2022</div>
            <div className="col-lg-6  text-dark mt-3">
              Part Name/No : PISTON/PS01
            </div>
            <div className="col-lg-6 text-dark ">Demand Qty : 10</div>
            <div className="col-lg-6 mt-3 font-bold text-xl">Kit No : 1072</div>
            <div className="your-form-container d-flex flex-wrap">
              <div className="col-lg-3 text-dark mt-3">Available Qty: 15</div>
              <div className="col-lg-6 text-dark d-flex flex-row">
                <label className="label mt-2">
                  <span className="label-text label-font-size text-base-content d-flex flex-row">
                    Issued Qty :
                    <FaStarOfLife className="must" />
                  </span>
                </label>
                <div className="mt-2">
                  <ToolTip
                    placeholder="Enter"
                    content=""
                    updateFormValue={updateFormValue}
                    value={name} // Pass the value to ToolTip component if needed
                  />
                </div>
              </div>
              <div className="col-lg-3 text-dark mt-3 text-end">
                balance Qty: 5
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <div className="d-flex justify-content-center">
          <DialogActions className="mb-2 me-2">
        
            <Button
              component="label"
              variant="contained"
              onClick={closePendingPopup}
            >
              Issued
            </Button>
          </DialogActions>
        </div>
        <DialogContentText>
          <center className="text-dark mb-2">
            Issued by AIPACKS - Karthi-19/01/2024-10:00AM
          </center>
        </DialogContentText>
      </Dialog> */}

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={isPendingPopupOpenIssued}
        onClose={closePendingPopupIssued}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Inward Manifest</DialogTitle>
          <IoMdClose
            className="cursor-pointer w-8 h-8 mt-3 me-3"
            onClick={closePendingPopupIssued}
          />
        </div>
        <DialogContent>
          <div className="row">
            <div className="col-lg-4 col-md-4 mb-2">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Net Qty Received
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-6 col-md-6 mb-2">
              <input
                className="form-control form-sz mb-2"
                type={"text"}
                placeholder={""}
                value={netQty}
                onChange={handleNetQtyReceivedChange}
                max={4}
              />
              {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
            </div>
            <div className="col-lg-4 col-md-4 mb-2">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Return Qty
                  {/* <FaStarOfLife className="must" /> */}
                </span>
              </label>
            </div>
            <div className="col-lg-6 col-md-6 mb-2">
              <input
                className="form-control form-sz mb-2"
                type={"text"}
                placeholder={""}
                value={returnQty}
                onChange={handleReturnQtyChange}
              />
              {errors.returnQty && (
              <span className="error-text">{errors.returnQty}</span>
            )}
            </div>
            <div className="col-lg-4 col-md-6">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Reason for Return
                  {/* <FaStarOfLife className="must" /> */}
                </span>
              </label>
            </div>
            <div className="col-lg-6 col-md-6">
              <input
                className="form-control form-sz mb-2"
                type={"text"}
                placeholder={""}
                value={returnReason}
                onChange={handleReturnReasonChange}
              />
              {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
            </div>
          </div>
        </DialogContent>
        <div className="d-flex justify-content-center">
          <DialogActions className="mb-2 me-2">
            <Button
              component="label"
              variant="contained"
              onClick={closePendingPopupIssued}
            >
              Proceed
            </Button>
          </DialogActions>
        </div>
        <DialogContentText>
          <center className="text-dark mb-2">
            Issued by AIPACKS - Karthi-19/01/2024-10:00AM
          </center>
        </DialogContentText>
      </Dialog>
    </>
  );
}

export default EmitterInwardDetails;
