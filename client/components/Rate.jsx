import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

// referenced from: https://material-ui.com/components/rating/

const useStyles = makeStyles({
  rateStyle: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// temporary border to showcase rating stars
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  p: 1,
};

export const Rate = ({ handleClose, setRate }) => {
  const classes = useStyles();

  return (
    <div className={classes.rateStyle}>
      {/* Box component is used temporarily to better differentiate rating component */}
      <Box borderColor="grey.400" {...defaultProps}>
      <Rating
        name="size-large"
        precision={1}
        size="large"
        onChange={(event, newValue) => {
          setRate(newValue);
          //previously closed modal when user clicked on star
          // handleClose();
        }}
      />
      </Box>
    </div>
  );
};

Rate.propTypes = {
  handleClose: PropTypes.func.isRequired,
  setRate: PropTypes.func.isRequired,
};
