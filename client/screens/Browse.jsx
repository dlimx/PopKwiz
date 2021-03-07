import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Search } from '../components/Search';
import { Category } from '../components/Category';
import { Quizlist } from '../components/Quizlist';
import { LoadUser } from '../components/LoadUser';
import { useAPI } from '../api/api';

// page to browse quizzes - with collection of search modules
export const Browse = () => {
  const api = useAPI();
  const history = useHistory();
  const [searchVal, setSearchVal] = useState('');
  const [categoryVal, setCategoryVal] = useState('');
  const [quizList, setQuizList] = useState([]);
  useEffect(() => {
    // input delay to reduce number of
    const delaySearch = setTimeout(() => {
      api.get(`/quizzes?search=${searchVal}&category=${categoryVal}`).then((res) => {
        console.log(res);
        setQuizList(res.data);
      });
    }, 200);
    return () => clearTimeout(delaySearch);
  }, [api, searchVal, categoryVal]);

  return (
    <div>
      <Search setSearchVal={setSearchVal} />
      <Category setCategoryVal={setCategoryVal} />
      <Quizlist quizList={quizList} />
      <LoadUser />
    </div>
  );
};
