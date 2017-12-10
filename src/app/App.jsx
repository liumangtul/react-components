import React,{Component,PropTypes} from 'react';
import ReactDatetimePicker from '../components/dateTimePicker/ReactDatetimePicker';
import './index.less';
class App extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <ReactDatetimePicker/>
      </div>
    )
  }
}

export default App;