import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const BinInwardDetailsDialog = ({ isOpen, onClose, binInwardDetails }) => {
  console.log("Test12", binInwardDetails);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Bin Inward Details</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tag Code</TableCell>
              <TableCell> RFID</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Code</TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {binInwardDetails &&
              binInwardDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.tagCode}</TableCell>
                  <TableCell>{detail.rfId}</TableCell>
                  <TableCell>{detail.asset}</TableCell>
                  <TableCell>{detail.assetCode}</TableCell>
                  {/* Add more table cells as needed */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BinInwardDetailsDialog;
