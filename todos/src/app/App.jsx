import React,{Component} from 'react';
import Wscroll from '../iscroll/Wscroll';
import './common.less';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';

// console.log(process,__DEV__,process.env)
class App extends Component{
  render(){
    return(
      <section>
        <Wscroll/>
      </section>
    )
  }
}

export default App;
