import React from 'react';
import {
  Route
} from 'react-router-dom';
import Home from '../home/Home';
import PaperList from '../paperList/PaperList';
import ContactMe from '../contactMe/ContactMe';
import './content.less';

const Content = ()=>{
  return (
    <section id="content">
      <Route exact path="/" component={Home}></Route>
      <Route path="/paperList" component={PaperList}></Route>
      <Route path="/contactMe" component={ContactMe}></Route>
    </section>
  )
};

export default Content;