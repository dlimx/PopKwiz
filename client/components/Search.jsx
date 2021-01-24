import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export const Search = () => (
  <div>
    <Box m={2}>
      <Grid container justify="center">
        <TextField id="outlined-search" label="Search" type="search" variant="outlined" style={{ width: '80%' }} />
      </Grid>
    </Box>
  </div>
);
