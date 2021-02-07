import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

//referenced from: https://material-ui.com/components/rating/

const useStyles = makeStyles({
  rateStyle: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Rate = ({handleClose, setRate}) => {

  const classes = useStyles();

  return (
    <div className={classes.rateStyle}>

      <Rating name="" precision={1} size="large" onChange={(event, newValue) => {
          setRate(newValue)
          handleClose();
        }}
      />
    </div>
  );
}