import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, Container, Divider, Typography } from '@material-ui/core';
import { QuizComments } from '../components/QuizComments';
import { UserComment } from '../components/UserComment';

import { useAPI } from '../api/api';
import { useStyles } from '../styles/useStyles';
import { useAuth } from '../store/users/AuthContext';
import { Image } from '../components/Image';

export const QuizProfile = () => {
  const { currentUser } = useAuth();
  const api = useAPI();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [quizComments, setQuizComments] = useState({});

  // state to track star rating by user
  const [rateVal, setRate] = useState(-1);

  // state to track user comment value in text field
  const [commentVal, setComment] = useState('');

  const [editVal, setEdit] = useState(0);

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => {
      setQuiz(res.data.data);
      setQuizComments(res.data.data.rating || {});
    });
  }, [api, id, editVal]);

  return (
    <>
      <Container className={classes.container}>
        <Card>
          <Typography className={classes.typographyText} variant="h4">
            Quiz: {quiz.name}
          </Typography>
          <Divider className={classes.divider} variant="fullWidth" />
          <Typography className={classes.typographyText} variant="subtitle1">
            {quiz.description}
          </Typography>
          <Image image={quiz.image} alt="Quiz Preview" />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              history.push(`/quiz/${id}/action`);
            }}
          >
            Take Quiz
          </Button>
        </Card>
      </Container>
      {!!currentUser && (
        <div>
          <UserComment
            quizID={id}
            quizComments={quizComments}
            rateVal={rateVal}
            commentVal={commentVal}
            setRate={setRate}
            setComment={setComment}
            editVal={editVal}
            setEdit={setEdit}
          />
          <QuizComments quizComments={quizComments} />
        </div>
      )}
    </>
  );
};
