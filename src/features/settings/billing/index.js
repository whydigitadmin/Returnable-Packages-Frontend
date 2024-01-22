import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import TitleCard from "../../../components/Cards/TitleCard";
import ToolTip from "../../../components/Input/Tooltip";

const steps = ["Issue manifest", "Mode of Transport "];

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
    iqty: "0",
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
    iqty: "5",
    bqty: "5",
    tat: "48",
    pname: "PISTON/PS01",
    status: "Inprogress",
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
    if (status === "Issued")
      return (
        <div
          className="badge bg-success text-white cursor-pointer"
          onClick={() => handlePendingStatusClickIssued(bill)}
        >
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
    if (status === "Inprogress")
      return (
        <div
          className="badge bg-warning text-white cursor-pointer"
          onClick={() => handlePendingStatusClick(bill)}
        >
          {status}
        </div>
      );
    else return <div className="badge badge-ghost">{status}</div>;
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
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
                    <td>
                      {l.rmno}
                      {/* {l.status === "Issued" ? (
                        <>
                          {l.rmno} &nbsp;
                          <div className="badge bg-success text-white cursor-pointer">
                            <span style={{ color: "green" }}>.</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {l.rmno} &nbsp;
                          <div className="badge bg-danger text-white cursor-pointer">
                            <span style={{ color: "red" }}>.</span>
                          </div>
                        </>
                      )} */}
                    </td>
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
            <div className="d-flex justify-content-between">
              <div>
                <div className="text-dark"> No: 1704</div>
                <div className="text-dark">Date : 19/01/2022</div>
              </div>
              <div>
                <div className="text-dark">Request.Manifest No: 1704</div>
                <div className="text-dark">Manifest Date : 19/01/2022</div>
              </div>
            </div>
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
            {/* <Button onClick={closePendingPopup}>Cancel</Button> */}
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
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={isPendingPopupOpenIssued}
        onClose={closePendingPopupIssued}
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Issue Manifest</DialogTitle>
          <IoMdClose
            className="cursor-pointer w-8 h-8 mt-3 me-3"
            onClick={closePendingPopupIssued}
          />
        </div>
        <DialogContent>
          <DialogContentText className="d-flex flex-column">
            {/* <div className="d-flex justify-content-center">
              <div className="col-lg-4 text-center my-3"></div>
            </div> */}
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="text-dark"> No: 1704</div>
                        <div className="text-dark">Date : 19/01/2022</div>
                      </div>
                      <div>
                        <div className="text-dark">
                          Request.Manifest No: 1704
                        </div>
                        <div className="text-dark">
                          Manifest Date : 19/01/2022
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6  text-dark mt-3">
                      Part Name/No : PISTON/PS01
                    </div>
                    <div className="col-lg-6 text-dark ">Demand Qty : 10</div>
                    <div className="col-lg-6 mt-3 font-bold text-xl">
                      Kit No : 1072
                    </div>
                    <div className="your-form-container d-flex flex-wrap">
                      <div className="col-lg-4 text-dark mt-3">
                        Available Qty: 15
                      </div>
                      <div className="col-lg-4 text-dark mt-3">
                        Issued Qty: 10
                      </div>
                      <div className="col-lg-4 text-dark mt-3">
                        balance Qty: 5
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <DialogActions className="mb-2 me-2">
                        {/* <Button onClick={closePendingPopup}>Cancel</Button> */}
                        <Button
                          component="label"
                          variant="contained"
                          onClick={closePendingPopupIssued}
                        >
                          Download
                        </Button>
                      </DialogActions>
                    </div>
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}

                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>

            {/* <div className="d-flex justify-content-between">
              <div>
                <div className="text-dark"> No: 1704</div>
                <div className="text-dark">Date : 19/01/2022</div>
              </div>
              <div>
                <div className="text-dark">Request.Manifest No: 1704</div>
                <div className="text-dark">Manifest Date : 19/01/2022</div>
              </div>
            </div>
            <div className="col-lg-6  text-dark mt-3">
              Part Name/No : PISTON/PS01
            </div>
            <div className="col-lg-6 text-dark ">Demand Qty : 10</div>
            <div className="col-lg-6 mt-3 font-bold text-xl">Kit No : 1072</div>
            <div className="your-form-container d-flex flex-wrap">
              <div className="col-lg-4 text-dark mt-3">Available Qty: 15</div>
              <div className="col-lg-4 text-dark mt-3">Issued Qty: 10</div>
              <div className="col-lg-4 text-dark mt-3">balance Qty: 5</div>
            </div> */}
          </DialogContentText>
        </DialogContent>
        {/* <div className="d-flex justify-content-center">
          <DialogActions className="mb-2 me-2">
        
            <Button
              component="label"
              variant="contained"
              onClick={closePendingPopupIssued}
            >
              Download
            </Button>
          </DialogActions>
        </div>
        <DialogContentText>
          <center className="text-dark mb-2">
            Issued by AIPACKS - Karthi-19/01/2024-10:00AM
          </center>
        </DialogContentText> */}
        <DialogContentText>
          <center className="text-dark mb-2">
            Issued by AIPACKS - Karthi-19/01/2024-10:00AM
          </center>
        </DialogContentText>
      </Dialog>
    </>
  );
}

export default Billing;
