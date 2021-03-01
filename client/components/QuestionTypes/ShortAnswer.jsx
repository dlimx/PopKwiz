/* eslint react/prop-types: 0 */

import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const ShortAnswer = (props) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <TextField
        className={classes.textField}
        id="outlined-basic"
        variant="outlined"
        onChange={(e) => {
          props.saveResults(props.qid, e.target.value);
        }}
      />
    </FormControl>
  );
};
