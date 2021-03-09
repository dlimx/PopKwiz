/* eslint react/prop-types: 0 */

import React from 'react';
import { FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const ShortAnswer = (props) => {
  const classes = useStyles();

  if (props.userAnswers && props.quizAnswers) {
    return (
      <FormControl component="fieldset">
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              variant="outlined"
              defaultValue={props.userAnswers.answers[props.qid]}
              disabled
            />
          </Grid>
          {Object.keys(props.quizAnswers[props.qid]).includes(props.userAnswers.answers[props.qid]) ? (
            <Grid item key={props.qid}>
              <DoneIcon color="primary" />
            </Grid>
          ) : (
            <>
              <Grid item key={props.qid}>
                <ClearIcon color="secondary" />
              </Grid>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue={Object.keys(props.quizAnswers[props.qid])}
                    disabled
                  />
                </Grid>
                <Grid item key={props.qid}>
                  <DoneIcon color="primary" />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </FormControl>
    );
  }
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
