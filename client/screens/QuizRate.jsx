import React from 'react';
import { useParams } from "react-router-dom";
import RateModal from '../components/RateModal';

export const QuizRate = () => {
    let { id } = useParams();

    return (
        <div>
            <h1>{id}</h1>
            <RateModal quizID = {id}/>
        </div>
    )
};
