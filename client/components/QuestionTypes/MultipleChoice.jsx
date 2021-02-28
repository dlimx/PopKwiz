/* eslint react/prop-types: 0 */

import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core';
import { useStyles } from '../../styles/useStyles';

export const MultipleChoice = (props) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <RadioGroup>
        {props.answers.map((answer, index) => (
          <FormControlLabel
            value={answer.option}
            control={<Radio />}
            label={answer.option}
            onChange={(e) => {
              props.saveResults(props.qid, e.target.value);
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
