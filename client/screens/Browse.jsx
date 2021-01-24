import React from 'react';
import { Search } from '../components/Search';
import { Category } from '../components/Category';
import { Quizlist } from '../components/Quizlist';
import { Copyright } from '../components/Copyright';

export const Browse = () => (
  <div>
    <Search />
    <Category />
    <Quizlist />
    <Copyright />
  </div>
);
