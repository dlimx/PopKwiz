import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RateModal } from '../components/RateModal';
import { useAPI } from '../api/api';
import { useAuth } from '../store/users/AuthContext';

export const QuizRate = () => {
  const [rateVal, setRate] = useState(-1);
  const api = useAPI();
  const { id } = useParams();
  const { currentUser } = useAuth();
  // check login status?
  // if (user) {
  //     // User is signed in.
  //     } else {
  //     // No user is signed in.
  //     }
  useEffect(() => {
    if (rateVal > 0) {
      api.get(`/quizzes/${currentUser.uid}/${id}/${rateVal}`).then((res) => {
        console.log(res);
      });
    }
  });
  return (
    <div>
      <h1>{id}</h1>
      <RateModal quizID={id} setRate={setRate} />
      <h3>{rateVal}</h3>
    </div>
  );
};
