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

  // useEffect(() => {
  //   if (rateVal > 0) {
  //     api.get(`/quizzes/${currentUser.uid}/${id}/${rateVal}`).then((res) => {
  //       console.log(res);
  //     });
  //   }
  // });


  return (
    <div>
      {/* display quiz id */}
      {/* <h1>{id}</h1> */}
      <RateModal quizID={id} rateVal={rateVal} commentVal={commentVal} setRate={setRate} setComment={setComment}/>

      {/* display quiz rating value set by user (-1 is default) */}
      {/* <h3>{rateVal}</h3> */}

      {/* display quiz comment inputted by user */}
      {/* <h3>{commentVal}</h3> */}
    </div>
  );
};
