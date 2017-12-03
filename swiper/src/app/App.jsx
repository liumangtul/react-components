import React from 'react';
import {
  HashRouter as Router
} from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Content from '../content/Content';
import './common.less';
import './index.less';

class App extends React.Component{
  render(){
    return(
      <div id="app">
        <Router>
          <div>
            <Header/>
            <Content/>
            <Footer/>
          </div>
        </Router>
      </div>
    )
  }
}
export default App;
