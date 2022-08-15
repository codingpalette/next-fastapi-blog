import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";

const AlertBox = ({alertActive, alertClose, alertText, alertType}) => {
  return(
    <>
      <Snackbar
        open={alertActive}
        anchorOrigin={{  vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={alertClose}
      >
        <Alert onClose={alertClose} severity={alertType}>
          {alertText}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AlertBox