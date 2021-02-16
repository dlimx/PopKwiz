import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Rate } from './Rate';
import { CommentField } from './CommentField';

import { useAPI } from '../api/api';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(5, 5, 5),
  },
}));

export const RateModal = ({ quizID, rateVal, setRate, commentVal, setComment }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const api = useAPI();

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Review
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {/* instructions */}
            <h2>How did you like the quiz?</h2>

            {/* rate via stars */}
            <Grid container justify="center">
              {/* omit handleclose hook if not being used */}
              <Rate handleClose={handleClose} setRate={setRate} />
            </Grid>

            {/* Comment Field */}
            <br />
            <CommentField setComment={setComment} />
            <br />

            {/* Send button */}
            <Grid container justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClose();
                  if (rateVal > 0 || commentVal.length > 0) {
                    api
                      .post('/quizzes/rating', {
                        Quiz: quizID,
                        Rating: rateVal,
                        Comment: commentVal,
                      })
                      .then((res) => {
                        console.log(res);
                      });
                  }
                }}
              >
                Send
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

RateModal.propTypes = {
  setRate: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  quizID: PropTypes.number.isRequired,
  rateVal: PropTypes.number.isRequired,
  commentVal: PropTypes.string.isRequired,
};
