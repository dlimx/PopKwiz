/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
/* eslint no-return-assign: 0 */

import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, Grid, Radio } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from '../../styles/useStyles';

export const MultipleChoice = (props) => {
  const classes = useStyles();

  // Default props to undefined so they only appear when on results page.
  const scoringProps = {
    disabled: undefined,
    checked: undefined,
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup>
        <>
          {props.answers.map((answer, index) => (
            <Grid container direction="row" alignItems="center">
              <Grid item>
                {/* {console.log(`uA: ${props.userAnswers}`)} */}
                {props.userAnswers && props.userAnswers.answers[props.qid] !== answer.option
                  ? (scoringProps.disabled = true)
                  : (scoringProps.disabled = undefined)}
                {props.userAnswers && props.userAnswers.answers[props.qid] === answer.option
                  ? (scoringProps.checked = true)
                  : (scoringProps.checked = undefined)}
                <FormControlLabel
                  key={index}
                  value={answer.option}
                  control={<Radio />}
                  label={answer.option}
                  onChange={(e) => {
                    props.saveResults(props.qid, e.target.value);
                  }}
                  {...scoringProps}
                />
              </Grid>
              {/* {console.log(`qA: ${props.quizAnswers}`)} */}
              {props.quizAnswers !== undefined &&
                answer.option &&
                (answer.option === Object.keys(props.quizAnswers[props.qid])[0] ? (
                  <Grid item key={props.qid}>
                    <DoneIcon color="primary" />
                  </Grid>
                ) : (
                  <Grid item key={props.qid}>
                    <ClearIcon color="secondary" />
                  </Grid>
                ))}
            </Grid>
          ))}
        </>
      </RadioGroup>
    </FormControl>
  );
};
