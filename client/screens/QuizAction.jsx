import React from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { useAPI } from '../api/api';

export const QuizAction = () => {
  const api = useAPI();
  const { id } = useParams();

  const loadQuiz = async (quizID) => {
    api.get(`/quizzes/${quizID}`).then((res) => {
      console.log('got quiz');
      console.log(res);
      console.log(res.data);
    });
  };

  const quiz = loadQuiz(id);

  return <div>Quiz Action: {id}</div>;
};
