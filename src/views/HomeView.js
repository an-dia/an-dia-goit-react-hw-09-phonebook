import React from 'react';
import s from './HomeView.module.css';

const HomeView = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>Welcome! It's your phonebook. </h1>
      </div>
    </div>
  );
};

export default HomeView;
