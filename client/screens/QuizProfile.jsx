import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QuizComments } from '../components/QuizComments';
import { UserComment } from '../components/UserComment';
import { useAPI } from '../api/api';

export const QuizProfile = () => {
  const api = useAPI();
  const { id } = useParams();
  const [quizComments, setQuizComments] = useState({});

  // state to track star rating by user
  const [rateVal, setRate] = useState(-1);

  // state to track user comment value in text field
  const [commentVal, setComment] = useState('');

  const [editVal, setEdit] = useState(0);

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => {
      setQuizComments(res.data.data.rating);
    });
  }, [api, id, editVal]);

  return (
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
  );
};
