import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  comment: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '65ch',
      backgroundColor: theme.palette.background.default,
    },
  },
}));

export const CommentField = ({ setComment }) => {
  const classes = useStyles();

  return (
    <form className={classes.comment} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={4}
          variant="outlined"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        {/* submit button for comments only */}
      </div>
    </form>
  );
};

CommentField.propTypes = {
  setComment: PropTypes.func.isRequired,
};
