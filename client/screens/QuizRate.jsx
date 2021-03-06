import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RateModal } from '../components/RateModal';

export const QuizRate = () => {
  // state to track star rating by user
  const [rateVal, setRate] = useState(-1);

  // state to track user comment value in text field
  const [commentVal, setComment] = useState('');

  const { id } = useParams();
  // check login status?
  // if (user) {
  //     // User is signed in.
  //     } else {
  //     // No user is signed in.
  //     }

  return (
    <div>
      <RateModal buttonText={"Review"} quizID={id} rateVal={rateVal} commentVal={commentVal} setRate={setRate} setComment={setComment} />
    </div>
  );
};
