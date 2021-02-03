import React, { useState, useEffect } from 'react';
import { Search } from '../components/Search';
import { Category } from '../components/Category';
import { Quizlist } from '../components/Quizlist';
import { Copyright } from '../components/Copyright';
import { useAPI } from '../api/api';

// page to browse quizzes - with collection of search modules
export const Browse = () => {
  const api = useAPI();
  const [searchVal, setSearchVal] = useState('');
  const [categoryVal, setCategoryVal] = useState('');
  const [quizList, setQuizList] = useState([]);
  useEffect(() => {
    api.get(`/quizzes?search=${searchVal}&category=${categoryVal}`).then((res) => {
      setQuizList(res.data);
    });
  }, [api, searchVal, categoryVal]);

  return (
    <div>
      <Search setSearchVal={setSearchVal} />
      <Category setCategoryVal={setCategoryVal} />
      <Quizlist quizList={quizList} />
      <Copyright />
    </div>
  );
};
