import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

const RequestSummaryTable = ({ bills }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDetailsClick = (issue) => {
    setSelectedIssue(issue);
    setIsDialogOpen(true);
  };

  return (
    <div
      className="w-full p-4 bg-base-100 shadow-xl"
      style={{ borderRadius: 16 }}
    >
      <Typography variant="h5" className="font-semibold p-3">
        Bin Request Summary
      </Typography>
      <div className="divider mt-0 mb-0"></div>
      <TableContainer component={Paper} className="mt-2">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Req No</TableCell>
              <TableCell>Req Date</TableCell>
              <TableCell>Demand Date</TableCell>
              <TableCell>Part Name</TableCell>
              <TableCell>Part No</TableCell>
              <TableCell>Part Qty</TableCell>
              <TableCell>Kit No</TableCell>
              <TableCell>Kit Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.slice(startIndex, endIndex).map((issueRequest, index) => (
              <React.Fragment key={index}>
                {issueRequest.issueItemVO.map((item, subIndex) => (
                  <TableRow key={`${index}-${subIndex}`}>
                    {subIndex === 0 && (
                      <>
                        <TableCell rowSpan={issueRequest.issueItemVO.length}>
                          <img
                            src={
                              issueRequest.issueStatus === 2
                                ? "/checked1.png"
                                : "/pending.png"
                            }
                            alt="Status"
                            style={{
                              width: "25px",
                              height: "auto",
                              marginRight: "6px",
                              cursor: "not-allowed",
                            }}
                          />
                        </TableCell>
                        <TableCell rowSpan={issueRequest.issueItemVO.length}>
                          {issueRequest.docId}
                        </TableCell>
                        <TableCell rowSpan={issueRequest.issueItemVO.length}>
                          {moment(issueRequest.requestedDate).format(
                            "DD-MM-YY"
                          )}
                        </TableCell>
                        <TableCell rowSpan={issueRequest.issueItemVO.length}>
                          {moment(issueRequest.demandDate).format("DD-MM-YY")}
                        </TableCell>
                      </>
                    )}
                    <TableCell>{item.partName}</TableCell>
                    <TableCell>{item.partNo}</TableCell>
                    <TableCell className="text-center">
                      {item.partQty}
                    </TableCell>
                    <TableCell>{item.kitName}</TableCell>
                    <TableCell className="text-center">{item.kitQty}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Details for RM No. {selectedIssue && selectedIssue.id}
          <IconButton
            aria-label="close"
            onClick={() => setIsDialogOpen(false)}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>RM Date:</strong>{" "}
            {selectedIssue &&
              moment(selectedIssue.requestedDate).format("DD-MM-YY")}
          </Typography>
          <Typography variant="body1">
            <strong>Demand Date:</strong>{" "}
            {selectedIssue &&
              moment(selectedIssue.demandDate).format("DD-MM-YY")}
          </Typography>
          <Typography variant="body1">
            <strong>Flow Name:</strong>{" "}
            {selectedIssue && selectedIssue.flowName}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {selectedIssue && selectedIssue.irType === "IR_PART"
                      ? "Part No"
                      : "Kit No"}
                  </TableCell>
                  <TableCell>
                    {selectedIssue && selectedIssue.irType === "IR_PART"
                      ? "Kit No"
                      : "Quantity"}
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedIssue &&
                  selectedIssue.issueItemVO.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {selectedIssue.irType === "IR_PART"
                          ? item.partNo
                          : item.kitName}
                      </TableCell>
                      <TableCell>
                        {selectedIssue.irType === "IR_PART"
                          ? item.kitName
                          : item.kitQty}
                      </TableCell>
                      <TableCell>{item.issueItemStatus}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestSummaryTable;
