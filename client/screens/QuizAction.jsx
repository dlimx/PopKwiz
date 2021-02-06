/* eslint react/prop-types: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { useAPI } from '../api/api';
import { QuizBuilder } from '../components/QuizBuilder';

export const QuizAction = () => {
  const api = useAPI();
  const [quiz, setQuiz] = useState({});
  const { id } = useParams();

  const loadQuiz = async (quizID) => {
    api.get(`/quizzes/${quizID}`).then((res) => {
      setQuiz(res.data.data);
    });
  };

  useEffect(() => {
    loadQuiz(id);
  }, []);

  return <QuizBuilder quiz={quiz} />;
};
