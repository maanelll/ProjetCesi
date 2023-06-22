import * as React from "react"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

type AlertDialogPropsType = {
  description: string
  handleValidate: () => void
  isOpen: boolean
  setOpen: (open: boolean) => void
  title: string
}

const AlertDialog: React.FC<AlertDialogPropsType> = ({
  description,
  handleValidate,
  isOpen,
  setOpen,
  title,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleClose}
        open={isOpen}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleValidate}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export { AlertDialog }
