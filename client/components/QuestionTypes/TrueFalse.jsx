/* eslint react/prop-types: 0 */

import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core';
import { useStyles } from '../../styles/useStyles';

export const TrueFalse = (props) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <RadioGroup>
        <FormControlLabel
          value="TRUE"
          control={<Radio />}
          label="True"
          onChange={(e) => {
            props.saveResults(props.qid, e.target.value);
          }}
        />
        <FormControlLabel
          value="FALSE"
          control={<Radio />}
          label="False"
          onChange={(e) => {
            props.saveResults(props.qid, e.target.value);
          }}
        />
      </RadioGroup>
    </FormControl>
  );
};
