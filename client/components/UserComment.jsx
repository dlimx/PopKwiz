import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import { RateModal } from './RateModal';
import { useAuth } from '../store/users/AuthContext';
import { DeleteComment } from './DeleteComment';

import { useUser } from '../store/users/UserContext';

const useStyles = makeStyles({
  root: {
    // div
    padding: 50,
  },
  inner: {
    marginLeft: 20,
    marginRight: 20,
    marginbotton: 20,
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
export const UserComment = ({ quizID, quizComments, rateVal, setRate, commentVal, setComment, editVal, setEdit }) => {
  const { picture, username, email } = useUser();
  const { currentUser } = useAuth();
  const classes = useStyles();

  const key = currentUser.uid;
  if (quizComments[key] === undefined) {
    return null;
  }

  const ratingDisplay = (rateValue) => {
    if (rateValue > -1) {
      return <Rating name="read-only" value={rateValue} readOnly />;
    }
    return <></>;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.outer} variant="outlined">
        <div className={classes.inner}>
          <h1>Review by Me</h1>
          <div style={{ display: 'inline-flex' }}>
            <RateModal
              buttonText="Edit"
              quizID={quizID}
              rateVal={rateVal}
              commentVal={commentVal}
              setRate={setRate}
              setComment={setComment}
              editVal={editVal}
              setEdit={setEdit}
            />
            <DeleteComment quizID={quizID} editVal={editVal} setEdit={setEdit} />
          </div>

          <Paper elevation={1} className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar src={picture} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 className={classes.commenter}>{quizComments[key].user_name}</h4>
                {ratingDisplay(quizComments[key].user_score)}
                {/* replace test_name 'key' with name variable */}
                <p className={classes.comment}>{quizComments[key].user_comment}</p>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Paper>
    </div>
  );
};

UserComment.propTypes = {
  quizComments: PropTypes.object.isRequired,
  setRate: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  quizID: PropTypes.string.isRequired,
  rateVal: PropTypes.number.isRequired,
  commentVal: PropTypes.string.isRequired,
  editVal: PropTypes.number.isRequired,
  setEdit: PropTypes.func.isRequired,
};
