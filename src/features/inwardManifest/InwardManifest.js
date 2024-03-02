import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { FaStarOfLife } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import TitleCard from "../../components/Cards/TitleCard";

const steps = ["Issue manifest", "Mode of Transport "];

export const InwardManifest = () => {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [bills, setBills] = useState([]);
  const [isPendingPopupOpen, setPendingPopupOpen] = useState(false);
  const [isInProgressPopupOpen, setInProgressPopupOpen] = useState(false);
  const [isIssuedPopupOpen, setIssuedPopupOpen] = useState(false);
  const [selectedIssueRequest, setSelectedIssueRequest] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);
  const [qty, setQty] = React.useState("");

  useEffect(() => {
    // getIssueRequest();
  }, []);

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const openPendingPopup = () => {
    setPendingPopupOpen(true);
  };

  const closePendingPopup = () => {
    setPendingPopupOpen(false);
  };

  const openInProgressPopup = () => {
    setInProgressPopupOpen(true);
  };

  const closeInProgressPopup = () => {
    setInProgressPopupOpen(false);
  };

  const openIssuedPopup = () => {
    setIssuedPopupOpen(true);
  };

  const closeIssuedPopup = () => {
    setIssuedPopupOpen(false);
  };

  const handlePendingStatusClick = (issueRequest, subIndex) => {
    console.log("Pending", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
    openPendingPopup();
  };
  const handleInProgressStatusClick = (issueRequest, subIndex) => {
    console.log("InProgress", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
    openInProgressPopup();
  };
  const handleIssuedStatusClick = (issueRequest, subIndex) => {
    console.log("Issued", issueRequest);
    setSelectedIssueRequest(issueRequest);
    setSelectedSubIndex(subIndex);
    openIssuedPopup();
  };

  // const handlePendingStatusClick = (bill) => {
  //   setPendingPopupOpen(true);
  //   setSelectedPendingBill(bill);
  // };

  // const handlePendingStatusClickIssued = (bill) => {
  //   setPendingPopupOpenIssued(true);
  //   setSelectedPendingBill(bill);
  // };

  // const closePendingPopup = () => {
  //   setPendingPopupOpen(false);
  //   setSelectedPendingBill(null);
  // };

  // const closePendingPopupIssued = () => {
  //   setPendingPopupOpenIssued(false);
  //   setSelectedPendingBill(null);
  // };
  // const getPaymentStatus = (issueRequest, bill) => {
  //   if (issueRequest === 0)
  //     return (
  //       <div
  //         className="badge bg-danger text-white cursor-pointer"
  //         onClick={() => handlePendingStatusClick(issueRequest)}
  //       >
  //         Pending
  //       </div>
  //     );
  //   if (issueRequest === 1)
  //     return (
  //       <div
  //         className="badge bg-warning text-white cursor-pointer"
  //         onClick={() => handlePendingStatusClick(issueRequest)}
  //       >
  //         Inprogress
  //       </div>
  //     );
  //   if (issueRequest === 2)
  //     return (
  //       <div
  //         className="badge bg-success text-white cursor-pointer"
  //         onClick={() => handlePendingStatusClick(issueRequest)}
  //       >
  //         Issued
  //       </div>
  //     );
  //   else return <div className="badge badge-ghost">Unknown</div>;
  // };

  // randomStatus code

  const getPaymentStatus = () => {
    const randomStatus = Math.floor(Math.random() * 3); // Generates random values 0, 1, 2
    if (randomStatus === 0)
      return (
        <div
          className="badge bg-danger text-white cursor-pointer w-full"
          onClick={() =>
            handlePendingStatusClick(selectedIssueRequest, selectedSubIndex)
          }
        >
          Pending
        </div>
      );
    if (randomStatus === 1)
      return (
        <div
          className="badge bg-warning text-white cursor-pointer w-full"
          onClick={() =>
            handleInProgressStatusClick(selectedIssueRequest, selectedSubIndex)
          }
        >
          WIP
        </div>
      );
    if (randomStatus === 2)
      return (
        <div
          className="badge bg-success text-white cursor-pointer w-full"
          onClick={() =>
            handleIssuedStatusClick(selectedIssueRequest, selectedSubIndex)
          }
        >
          Issued
        </div>
      );
    else return <div className="badge badge-ghost">Unknown</div>;
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

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  //   const getIssueRequest = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/emitter/getIssueRequest`
  //       );

  //       if (response.status === 200) {
  //         setBills(response.data.paramObjectsMap.issueRequestVO);
  //         console.log(
  //           "getIssueRequest",
  //           response.data.paramObjectsMap.issueRequestVO
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  return (
    <>
      <div className="container-sm">
        <div className="card bg-base-100 shadow-xl">
          <div className="row">
            <div className="col-lg-3 card bg-base-100 shadow-xl ms-4 mt-3 me-2">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <h4 className="text-2xl font-semibold mt-3 ms-1 mb-3">
                    From
                  </h4>
                </div>
                <h4 className="text-xl dark:text-slate-300 font-semibold mb-2">
                  SCM AI-PACKS PVT LTD
                </h4>
                <p className="mb-2">C/O TATA Motors, Pune, CODE: SCMAI001</p>
              </div>
            </div>
            <div className="col-lg-1">
              <MdDoubleArrow
                className="text-xl font-semibold w-16 h-16"
                style={{ marginTop: 100 }}
              />
            </div>
            <div className="col-lg-3 card bg-base-100 shadow-xl ms-2 mt-3">
              <div className="p-1">
                <div className="d-flex flex-row">
                  <h4 className="text-2xl font-semibold mt-3 ms-1 mb-3">
                    Transfer To
                  </h4>
                </div>
                <h4 className="text-xl dark:text-slate-300 font-semibold mb-2">
                  SCM AI-PACKS PVT LTD
                </h4>
                {/* <select className="form-select w-11/12 mb-2">
                  <option value="Gabriel India Ltd-Pune">
                    SCM AI-PACKS PVT LTD Pune
                  </option>
                  <option value="Denso-Bangalore">Denso-Bangalore</option>
                </select>
                <h4 className="text-xl dark:text-slate-300 font-semibold ms-1 mb-2">
                  CODE: SCMAI001
                </h4> */}
                <p className="mb-2 ms-1">CODE: SCMAI001</p>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-center">
              <div className="mt-4">
                <div className="text-xl font-semibold mb-3">Manifest No:</div>
                <div className="text-xl font-semibold mb-3">Manifest Date:</div>
              </div>
            </div>
          </div>
          <>
            <TitleCard title="Inward Manifest Details" topMargin="mt-2">
              {/* Invoice list in table format loaded constant */}
              <div className="overflow-x-auto w-full ">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>RM No</th>
                      <th>RM Date</th>
                      <th>Flow Name</th>
                      <th>Transporter</th>
                      <th>Wat Bill No</th>
                      <th>Dehire Qty</th>
                      <th>Net Recd Qty</th>
                      <th>Repair</th>
                      <th>Scrap</th>
                      <th>TAT (hrs)</th>
                      <th>Part Name / Part No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((issueRequest, index) => (
                      <React.Fragment key={index}>
                        {issueRequest.issueItemVO.map((item, subIndex) => (
                          <tr key={`${index}-${subIndex}`}>
                            {subIndex === 0 && (
                              <>
                                <td rowSpan={issueRequest.issueItemVO.length}>
                                  {issueRequest.reqAddressId}
                                </td>
                                <td rowSpan={issueRequest.issueItemVO.length}>
                                  {moment(issueRequest.requestedDate).format(
                                    "DD-MM-YY"
                                  )}
                                </td>
                                <td rowSpan={issueRequest.issueItemVO.length}>
                                  {moment(issueRequest.demandDate).format(
                                    "DD-MM-YY"
                                  )}
                                </td>
                                <td rowSpan={issueRequest.issueItemVO.length}>
                                  {issueRequest.flowTo}
                                </td>
                                <td
                                  rowSpan={issueRequest.issueItemVO.length}
                                  className="text-center"
                                >
                                  48
                                </td>
                                <td
                                  rowSpan={issueRequest.issueItemVO.length}
                                  className="text-center"
                                >
                                  {issueRequest.totalIssueItem}
                                </td>
                                <td
                                  rowSpan={issueRequest.issueItemVO.length}
                                  className="text-center"
                                >
                                  {issueRequest.partQty}
                                </td>
                              </>
                            )}
                            <td>{item.kitQty}</td>
                            <td>{item.kitNo}</td>
                            <td>{item.partNo}</td>
                            {/* <td
                              onClick={() =>
                                handlePendingStatusClick(issueRequest, subIndex)
                              }
                            >
                              {getPaymentStatus(issueRequest.issueStatus)}
                            </td> */}

                            {/* Random Status Code */}

                            <td
                              style={{ width: 100 }}
                              // onClick={() =>
                              //   handlePendingStatusClick(issueRequest, subIndex)
                              // }
                            >
                              {getPaymentStatus()}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </TitleCard>
            {/* Pending Modal Popup */}
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
                  <div className="d-flex justify-content-end">
                    <div>
                      <div className="text-dark">
                        Request.Manifest No:
                        {selectedIssueRequest?.reqAddressId}
                      </div>
                      <div className="text-dark">
                        Manifest Date :
                        {moment(selectedIssueRequest?.requestedDate).format(
                          "DD/MM/YYYY"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row text-dark mt-3">
                    <div>Part Name/No : </div>
                    <div className="ms-1">
                      {selectedIssueRequest?.issueItemVO.map((item, index) => (
                        <div key={index} className="font-bold">
                          {item.partNo}
                        </div>
                      ))}
                    </div>
                    <div className="ms-4">Kit No : </div>
                    <div className="ms-1">
                      {selectedIssueRequest?.issueItemVO.map((item, index) => (
                        <div key={index} className="font-bold">
                          {item.kitNo}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6 text-dark mt-3">
                    Demand Qty : {selectedIssueRequest?.totalIssueItem}
                  </div>
                  <div className="col-lg-6 mt-3 font-bold text-xl"></div>
                  <div className="your-form-container d-flex flex-wrap">
                    <div className="col-lg-3 text-dark mt-3">
                      Available Qty: 15
                    </div>
                    <div className="col-lg-6 text-dark d-flex flex-row">
                      <div className="mt-3 me-1">
                        <span className="d-flex flex-row">
                          Issue Qty:
                          {/* {selectedIssueRequest?.issueItemVO[0].issuedQty} */}
                          <FaStarOfLife className="must" />
                        </span>
                      </div>
                      <div className="mt-2">
                        <input
                          className="form-control form-sz mb-2"
                          placeholder={""}
                          name="qty"
                          value={qty}
                          onChange={handleQtyChange}
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
                    Issue
                  </Button>
                </DialogActions>
              </div>
              <DialogContentText>
                <center className="text-dark mb-2">
                  Issued by AIPACKS - Karthi-19/01/2024-10:00AM
                </center>
              </DialogContentText>
            </Dialog>

            {/* Inprogress Modal */}

            <Dialog
              fullWidth={true}
              maxWidth={"sm"}
              open={isInProgressPopupOpen}
              onClose={closeInProgressPopup}
            >
              <div className="d-flex justify-content-between">
                <DialogTitle>Issue Manifest</DialogTitle>
                <IoMdClose
                  className="cursor-pointer w-8 h-8 mt-3 me-3"
                  onClick={closeInProgressPopup}
                />
              </div>
              <DialogContent>
                <DialogContentText className="d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="text-dark">
                        No: {selectedIssueRequest?.reqAddressId}
                      </div>
                      <div className="text-dark">
                        Date :
                        {moment(selectedIssueRequest?.requestedDate).format(
                          "DD/MM/YYYY"
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-dark">
                        Request.Manifest No:
                        {selectedIssueRequest?.reqAddressId}
                      </div>
                      <div className="text-dark">
                        Manifest Date :
                        {moment(selectedIssueRequest?.requestedDate).format(
                          "DD/MM/YYYY"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row text-dark mt-3">
                    <div>Part Name/No : </div>
                    <div className="ms-1">
                      {selectedIssueRequest?.issueItemVO.map((item, index) => (
                        <div key={index} className="font-bold">
                          {item.partNo}
                        </div>
                      ))}
                    </div>
                    <div className="ms-4">Kit No : </div>
                    <div className="ms-1">
                      {selectedIssueRequest?.issueItemVO.map((item, index) => (
                        <div key={index} className="font-bold">
                          {item.kitNo}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6 text-dark mt-3">
                    Demand Qty : {selectedIssueRequest?.totalIssueItem}
                  </div>
                  <div className="col-lg-6 mt-3 font-bold text-xl"></div>
                  <div className="your-form-container d-flex flex-wrap">
                    <div className="col-lg-3 text-dark mt-3">
                      Available Qty: 15
                    </div>
                    <div className="col-lg-6 text-dark d-flex flex-row">
                      <div className="mt-3 me-1">
                        <span className="d-flex flex-row">
                          Issue Qty:
                          {/* {selectedIssueRequest?.issueItemVO[0].issuedQty} */}
                          <FaStarOfLife className="must" />
                        </span>
                      </div>
                      <div className="mt-2">
                        <input
                          className="form-control form-sz mb-2"
                          placeholder={""}
                          name="qty"
                          value={qty}
                          onChange={handleQtyChange}
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

            {/* Issued Manifest Modal */}

            <Dialog
              fullWidth={true}
              maxWidth={"sm"}
              open={isIssuedPopupOpen}
              onClose={closeIssuedPopup}
            >
              <div className="d-flex justify-content-between">
                <DialogTitle>Issue Manifest</DialogTitle>
                <IoMdClose
                  className="cursor-pointer w-8 h-8 mt-3 me-3"
                  onClick={closeIssuedPopup}
                />
              </div>
              <DialogContent>
                <DialogContentText className="d-flex flex-column">
                  <Box sx={{ width: "100%" }}>
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
                        <div className="col-lg-6 text-dark ">
                          Demand Qty : 10
                        </div>
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
                            <Button
                              component="label"
                              variant="contained"
                              onClick={closeIssuedPopup}
                            >
                              Download
                            </Button>
                          </DialogActions>
                        </div>
                      </Typography>
                    </React.Fragment>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogContentText>
                <center className="text-dark mb-2">
                  Issued by AIPACKS - Karthi-19/01/2024-10:00AM
                </center>
              </DialogContentText>
            </Dialog>
          </>
        </div>
      </div>
    </>
  );
};
