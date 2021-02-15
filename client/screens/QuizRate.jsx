import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RateModal } from '../components/RateModal';
import { useAPI } from '../api/api';
import { useAuth } from '../store/users/AuthContext';

export const QuizRate = () => {
  //state to track star rating by user
  const [rateVal, setRate] = useState(-1);

  //state to track user comment value in text field
  const [commentVal, setComment] = useState('');

  const api = useAPI();
  const { id } = useParams();
  const { currentUser } = useAuth();
  // check login status?
  // if (user) {
  //     // User is signed in.
  //     } else {
  //     // No user is signed in.
  //     }

  return (
    <div>
      <RateModal quizID={id} rateVal={rateVal} commentVal={commentVal} setRate={setRate} setComment={setComment}/>
    </div>
  );
};
