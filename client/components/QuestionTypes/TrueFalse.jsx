/* eslint react/prop-types: 0 */

import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core';
import { useStyles } from '../../styles/useStyles';

export const TrueFalse = (props) => {
  const classes = useStyles();
  const scoringProps = {
    disabled: undefined,
    checked: undefined,
  };

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
          // {...props.userAnswers && (props.userAnswers.answers[props.qid] !== 'TRUE') ? scoringProps.disabled = true : scoringProps.disabled = undefined}
          // {...props.userAnswers && (props.userAnswers.answers[props.qid] === 'TRUE') ? scoringProps.checked = true : scoringProps.checked = undefined}
          // {...scoringProps}
        />
        <FormControlLabel
          value="FALSE"
          control={<Radio />}
          label="False"
          onChange={(e) => {
            props.saveResults(props.qid, e.target.value);
          }}
          // {...props.userAnswers && (props.userAnswers.answers[props.qid] !== 'FALSE') ? scoringProps.disabled = true : scoringProps.disabled = undefined}
          // {...props.userAnswers && (props.userAnswers.answers[props.qid] === 'FALSE') ? scoringProps.checked = true : scoringProps.checked = undefined}
          // {...scoringProps}
        />
      </RadioGroup>
    </FormControl>
  );
};
