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
    partno: "2001",
    partname: "Mobile",
    partqty: "20",
    kitno: "1072",
    kitqty: "10",
    balancekit: "20",
    invoiceno: "1001",
    cycletime: "20",
    previous: "19/01/2024",
    o2o: "10 days",
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

function EmitterOutwardDetails() {
  const [bills, setBills] = useState(BILLS);
  const [isPendingPopupOpen, setPendingPopupOpen] = useState(false);
  const [isPendingPopupOpenIssued, setPendingPopupOpenIssued] = useState(false);
  const [selectedPendingBill, setSelectedPendingBill] = useState(null);

  const [name, setName] = React.useState("");

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

  const getPaymentStatus = (status, bill) => {
    return (
      <div
        className="badge bg-success text-white cursor-pointer"
        onClick={() => handlePendingStatusClickIssued(bill)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
        </svg>
      </div>
    );
  };

  return (
    <>
      {/* <div className="d-flex justify-content-end me-4 mt-4">
        <button
          type="button"
          onClick={handlePendingStatusClickIssued}
          className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Outward
        </button>
      </div> */}
      <TitleCard title="Outward Manifest" topMargin="mt-2">
        {/* Invoice list in table format loaded constant */}
        <div className="overflow-x-auto w-full ">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Update</th>
                <th>Part No</th>
                <th>Part name</th>
                <th>Part Qty</th>
                <th>Kit No</th>
                <th>Kit Qty</th>
                <th>Balance kit</th>
                <th>Emitter Inv no</th>
                <th>Cycle Time (days) </th>
                <th>Previous dispatch</th>
                <th>O2O - TAT</th>
              </tr>
            </thead>
            <tbody>
              {/* {bills.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{getPaymentStatus(l.status)}</td>
                    <td>{l.partno}</td>
                    <td>{l.partname}</td>
                    <td>{l.partqty}</td>
                    <td>{l.kitno}</td>
                    <td>{l.kitqty}</td>
                    <td>{l.balancekit}</td>
                    <td>{l.invoiceno}</td>
                    <td>{l.cycletime}</td>
                    <td>{l.previous}</td>
                    <td>{l.o2o}</td>
                  </tr>
                );
              })} */}
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
          <DialogTitle>Outward Manifest</DialogTitle>
          <IoMdClose
            className="cursor-pointer w-8 h-8 mt-3 me-3"
            onClick={closePendingPopupIssued}
          />
        </div>
        <DialogContent>
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-2">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Part no
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-6 col-md-6 mb-2">
              <input
                className="form-control form-sz mb-2"
                type={"text"}
                placeholder={""}
                // name="storageMapping"
                // value={storageMapping}
                // onChange={handleInputChange}
              />
              {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
            </div>
            <div className="col-lg-6 col-md-6 mb-2">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Part name
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-6 col-md-6 mb-2">
              <input
                className="form-control form-sz mb-2"
                type={"text"}
                placeholder={""}
                // name="storageMapping"
                // value={storageMapping}
                // onChange={handleInputChange}
              />
              {/* {errors.storageMapping && (
              <span className="error-text">{errors.storageMapping}</span>
            )} */}
            </div>
            <div className="col-lg-6 col-md-6">
              <label className="label">
                <span
                  className={
                    "label-text label-font-size text-base-content d-flex flex-row"
                  }
                >
                  Part Qty
                  <FaStarOfLife className="must" />
                </span>
              </label>
            </div>
            <div className="col-lg-6 col-md-6">
              <input
                className="form-control form-sz mb-2"
                type={"text"}
                placeholder={""}
                // name="storageMapping"
                // value={storageMapping}
                // onChange={handleInputChange}
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
              Confirm
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

export default EmitterOutwardDetails;
