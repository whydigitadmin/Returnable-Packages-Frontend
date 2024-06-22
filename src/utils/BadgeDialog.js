import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { green, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const BadgeDialog = ({
  type,
  open,
  onClose,
  completedReqData,
  pendingReqData,
  inwardTo,
  outwardTo,
  page,
}) => {
  const requestData = type === "Completed" ? completedReqData : pendingReqData;

  const inWardData = inwardTo === "Inward" ? true : false;

  const outWardData = outwardTo === "Outward" ? true : false;

  console.log("inwardTo", inwardTo);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <DialogTitle>{type} Requests</DialogTitle>
      <DialogContent>
        <Paper>
          {}{" "}
          {!outWardData ? (
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>
                  {inWardData && (
                    <>
                      <StyledTableCell>Allotment No</StyledTableCell>{" "}
                      <StyledTableCell>Allotment Date</StyledTableCell>
                    </>
                  )}
                  <StyledTableCell>Req No</StyledTableCell>
                  <StyledTableCell>Req Date</StyledTableCell>
                  <StyledTableCell>Kit No</StyledTableCell>
                  <StyledTableCell>Kit Qty</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestData && requestData.length > 0 ? (
                  requestData.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        {row.status === "Completed" ||
                        page === "DashboardCom" ? (
                          <CheckCircleIcon style={{ color: green[500] }} />
                        ) : (
                          <HourglassEmptyIcon style={{ color: red[500] }} />
                        )}
                      </StyledTableCell>
                      {inWardData && (
                        <>
                          <StyledTableCell>{row.allotNo}</StyledTableCell>
                          <StyledTableCell>{row.allotDate}</StyledTableCell>
                        </>
                      )}
                      <StyledTableCell>
                        {" "}
                        {page === "Dashboard" ? row.reqNo : row.binReqNo}
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        {page === "Dashboard" ? row.reqDate : row.binReqDate}
                      </StyledTableCell>
                      {page === "Dashboard" || page === "DashboardCom" ? (
                        <StyledTableCell> {row.kitCode} </StyledTableCell>
                      ) : (
                        <StyledTableCell> {row.kitNo} </StyledTableCell>
                      )}

                      {inWardData ? (
                        <StyledTableCell>{row.allotkitQty}</StyledTableCell>
                      ) : (
                        <StyledTableCell>{row.reqKitQty}</StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5} align="center">
                      No requests found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>

                  {/* <StyledTableCell>Invoice</StyledTableCell> */}
                  <StyledTableCell>Doc Id</StyledTableCell>

                  <StyledTableCell>Doc Date</StyledTableCell>
                  <StyledTableCell>Flow</StyledTableCell>
                  <StyledTableCell>Kit No</StyledTableCell>
                  <StyledTableCell>Outward Kit Qty</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestData && requestData.length > 0 ? (
                  requestData.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <CheckCircleIcon style={{ color: green[500] }} />
                      </StyledTableCell>

                      {/* <StyledTableCell>{row.invoiceno}</StyledTableCell> */}
                      <StyledTableCell>{row.docId}</StyledTableCell>

                      <StyledTableCell>{row.docDate}</StyledTableCell>
                      <StyledTableCell>{row.flow}</StyledTableCell>
                      <StyledTableCell>{row.kitNo}</StyledTableCell>

                      <StyledTableCell>{row.outwardKitQty}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5} align="center">
                      No requests found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BadgeDialog;
