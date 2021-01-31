/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
/* eslint react/no-array-index-key: 0 */

import React from 'react';
import {
  Avatar, Button, Container, Box, Typography, CssBaseline, Grid, TextField,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Alert } from '@material-ui/lab';
import { useStyles } from '../styles/useStyles';
import { Copyright } from './Copyright';

export function FormBuilder(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    // console.log(index)
    console.log(e.target.value);
    // console.log(props.fields[0].action);
    props.onChange(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.header}
        </Typography>
        <form className={classes.form} onSubmit={props.onSubmit}>
          {/* {console.log(props.fields)} */}
          <Grid container spacing={2}>
            {props.fields.map((field, index) => (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  key={index}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  id={field.id}
                  autoComplete={field.autoComplete}
                  inputRef={field.inputRef}
                                    // onChange={handleChange}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              </Grid>
            ))}
          </Grid>
          {props.buttons.map((button) => (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={button.loading}
            >
              {button.text}
            </Button>
          ))}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
