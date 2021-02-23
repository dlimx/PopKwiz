import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

// search component for browsing quizzes by name
export const Search = ({ setSearchVal }) => {
  return (
    <div>
      <Box m={2}>
        <Grid container justify="center">
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            variant="outlined"
            style={{ width: '80%' }}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
        </Grid>
      </Box>
    </div>
  );
};

Search.propTypes = {
  setSearchVal: PropTypes.func.isRequired,
};
