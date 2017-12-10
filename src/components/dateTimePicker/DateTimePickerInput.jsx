import React,{Component} from 'react';

class DateTimePickerInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      datetime:''
    }
  }

  render(){
    return(
      <div id="datetime-picker-inpupt" onClick={this.props.handleSelectDate}>
        <h2>日期组件:</h2>
        <input
          disabled
          type="text"
          placeholder="请选择日期"
          ref={(input)=>{this.date = input }}
          value={this.state.datetime}
        />
      </div>
    )
  }

  componentDidMount(){
    let date = this.props.selectedTime;
    this.setState({
      datetime:date.year+'-'+date.month+'-'+date.day
    });
  }

  componentWillReceiveProps(nextProps){
    let date = nextProps.selectedTime;
    if(nextProps.datetimeWrite){
      this.setState({
        datetime:date.year+'-'+date.month+'-'+date.day
      });
    }
  }
}

export default DateTimePickerInput;