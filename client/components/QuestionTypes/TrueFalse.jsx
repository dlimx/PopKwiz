/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
/* eslint no-nested-ternary: 0 */

import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, Grid, Radio } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
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
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <FormControlLabel
              value="TRUE"
              control={<Radio />}
              label="True"
              onChange={(e) => {
                props.saveResults(props.qid, e.target.value);
              }}
              {...(props.userAnswers && props.userAnswers.answers[props.qid] !== 'TRUE'
                ? (scoringProps.disabled = true)
                : (scoringProps.disabled = undefined))}
              {...(props.userAnswers && props.userAnswers.answers[props.qid] === 'TRUE'
                ? (scoringProps.checked = true)
                : (scoringProps.checked = undefined))}
              {...scoringProps}
            />
          </Grid>
          {props.quizAnswers ? (
            Object.keys(props.quizAnswers[props.qid])[0] === 'TRUE' ? (
              <Grid item key={props.qid}>
                <DoneIcon color="primary" />
              </Grid>
            ) : (
              <Grid item key={props.qid}>
                <ClearIcon color="secondary" />
              </Grid>
            )
          ) : (
            <div />
          )}
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <FormControlLabel
              value="FALSE"
              control={<Radio />}
              label="False"
              onChange={(e) => {
                props.saveResults(props.qid, e.target.value);
              }}
              {...(props.userAnswers && props.userAnswers.answers[props.qid] !== 'FALSE'
                ? (scoringProps.disabled = true)
                : (scoringProps.disabled = undefined))}
              {...(props.userAnswers && props.userAnswers.answers[props.qid] === 'FALSE'
                ? (scoringProps.checked = true)
                : (scoringProps.checked = undefined))}
              {...scoringProps}
            />
          </Grid>
          {props.quizAnswers ? (
            Object.keys(props.quizAnswers[props.qid])[0] === 'FALSE' ? (
              <Grid item key={props.qid}>
                <DoneIcon color="primary" />
              </Grid>
            ) : (
              <Grid item key={props.qid}>
                <ClearIcon color="secondary" />
              </Grid>
            )
          ) : (
            <div />
          )}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};
