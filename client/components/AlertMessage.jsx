import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

export const AlertMessage = ({ message }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      variant="warning"
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={message}
      action={[
        <IconButton key="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

AlertMessage.propTypes = {
  message: PropTypes.func.isRequired,
};
