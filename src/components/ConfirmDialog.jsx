import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { LoadingButton } from "@mui/lab";
const ConfirmDialog = (props) => {
  const {
    title,
    children,
    loading,
    open,
    setOpen,
    onConfirm,
    cancelLable,
    submitLable,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="default"
        >
          {cancelLable ? cancelLable : "No"}
        </Button>
        <LoadingButton
          onClick={() => {
            onConfirm();
          }}
          loading={loading}
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          {submitLable ? submitLable : "Yes"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
