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
          value="True"
          control={<Radio />}
          label="True"
          onChange={(e) => {
            props.onChange(props.qid, e.target.value);
          }}
        />
        <FormControlLabel
          value="False"
          control={<Radio />}
          label="False"
          onChange={(e) => {
            props.onChange(props.qid, e.target.value);
          }}
        />
      </RadioGroup>
    </FormControl>
  );
};
