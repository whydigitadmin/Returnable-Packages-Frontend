import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export const CloseConfirmation = (open, close, no) => {
    // const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);


    return (
        <>
            {/* CLOSE CONFIRMATION MODAL */}
            <Dialog open={open}>
                <DialogContent>
                    <p>Are you sure you want to close without saving changes?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>No</Button>
                    <Button onClick={close}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CloseConfirmation