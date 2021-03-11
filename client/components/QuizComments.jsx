import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import { CommentAvatar } from './CommentAvatar';

const useStyles = makeStyles({
  root: {
    // div
    padding: 50,
  },
  inner: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  paper: {
    padding: '40px 20px',
    margin: 15,
  },
  outer: {
    background: 'rgba(0, 0, 0, 0.03)',
  },
  commenter: {
    margin: 0,
    textAlign: 'left',
  },
  comment: {
    textAlign: 'left',
  },
});

// pass in comments object as prop
export const QuizComments = ({ quizComments }) => {
  const classes = useStyles();
  console.log(quizComments);

  const ratingDisplay = (rateValue) => {
    if (rateValue > -1) {
      return <Rating name="read-only" value={rateValue} readOnly />;
    }
    return <></>;
  };

  const renderComments = () => {
    if (!quizComments || !Object.keys(quizComments).length) return <p>No quiz comments</p>;

    return Object.keys(quizComments).map((key, index) => (
      <Paper index={index} elevation={1} className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <CommentAvatar id={key} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 className={classes.commenter}>{quizComments[key].user_name}</h4>
            {ratingDisplay(quizComments[key].user_score)}

            {/* replace test_name 'key' with name variable */}
            <p className={classes.comment}>{quizComments[key].user_comment}</p>
          </Grid>
        </Grid>
      </Paper>
    ));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.outer} variant="outlined">
        <div className={classes.inner}>
          <h1>Quiz Reviews</h1>

          {renderComments()}
        </div>
      </Paper>
    </div>
  );
};

QuizComments.propTypes = {
  quizComments: PropTypes.object,
};
