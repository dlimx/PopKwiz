import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from '../components/Search';
import { Category } from '../components/Category';
import { Quizlist } from '../components/Quizlist';
import { Copyright } from '../components/Copyright';

// page to browse quizzes - with collection of search modules
export const Browse = () => {
  const [searchVal, setSearchVal] = useState('');
  const [categoryVal, setCategoryVal] = useState('');
  const [quizList, setQuizList] = useState([]);
  useEffect(() => {
    axios.get(`/api/quizzes?search=${searchVal}&category=${categoryVal}`).then((res) => {
      setQuizList(res.data);
    });
  }, [searchVal, categoryVal]);

  return (
    <div>
      <Search setSearchVal={setSearchVal} />
      <Category setCategoryVal={setCategoryVal} />
      <Quizlist quizList={quizList} />
      <Copyright />
    </div>
  );
};
