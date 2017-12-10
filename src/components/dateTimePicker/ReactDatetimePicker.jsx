import React,{Component} from 'react';
import DateTimePickerModal from './DateTimePickerModal';
import DateTimePickerInput from './DateTimePickerInput';
import './datetime-picker.less';

class ReactDatetimePicker extends Component{
  constructor(props){
    super(props);
    this.state = {
      datetimeShow:false,
      datetime:null,
      years:[],
      months:[],
      daies:[],
      iNowDate:new Date(),
      iTargetDate:new Date(),
      largeYear:this.props.largeYear?this.props.largeYear:100,
      selectedTime:{
        year:null,
        month:null,
        day:null
      },
      datetimeWrite:false//写入日期
    };
  }

  render(){
    return(
      <div id="datetime-picker-box">
        <DateTimePickerInput
          handleSelectDate={this.handleSelectDate.bind(this)}
          selectedTime = {this.state.selectedTime}
          datetimeWrite = {this.state.datetimeWrite}
        />
        <DateTimePickerModal
          datetime={this.state.datetime}
          years = {this.state.years}
          months = {this.state.months}
          daies = {this.state.daies}
          sendTime = {this.responseTime.bind(this)}
          datetimeShow = {this.state.datetimeShow}
          dispatchShow = {this.dispatchShow.bind(this)}
          preYear = {this.state.selectedTime.year}
          preMonth = {this.state.selectedTime.month}
          preDay = {this.state.selectedTime.day}
        />
      </div>
    )
  }

  componentDidMount(){
    this.getYears();
    this.getMonths();
    this.getDaies();
    let json = {};
    for(var name in this.state.selectedTime){
      if(!this.state.selectedTime[name]){
        this.setState({
          datetimeWrite:true
        });
        var oDate = new Date();
        let settime = null;
        switch(name){
          case 'year':
            settime = oDate.getFullYear();
            break;
          case 'month':
            settime = oDate.getMonth()-0+1;
            break;
          case 'day':
            settime = oDate.getDate();
            break;
        }

        json = {
          ...json,
          [name]:settime
        };
        this.setState({
          selectedTime:{
            ...json
          }
        });
      }
    }
    if(this.state.datetimeWrite){
      this.setState({
        datetimeWrite:false
      });
    }
  }

  componentDidUpdate(preProps,preState){
    //修改 月|年
    if((preState.selectedTime.month !== this.state.selectedTime.month || preState.selectedTime.year !== this.state.selectedTime.year)){
      this.getDaies();
    }
  }

  handleSelectDate(){
    this.setState({
      datetimeShow:true,
      datetimeWrite:false
    });
  }

  //获取年list
  getYears(){
    this.state.iTargetDate.setFullYear(new Date().getFullYear()-this.state.largeYear);
    let years = [];
    for(let i = 0; i<this.state.largeYear;i++){
      years.push(this.state.iTargetDate.getFullYear()-0+i+1);
    }
    this.setState({
      years:years
    });
  }
  //获取月list
  getMonths(){
    let months = [];
    for(let i = 0; i < 12; i++){
      months.push(i+1);
    }
    this.setState({
      months:months
    });
  }
  //获取日list
  getDaies(a){
    let daies = [];
    let oDate = this.state.iNowDate;
    let time = this.state.selectedTime;
    oDate.setFullYear(time.year,time.month,0);
    let len = oDate.getDate();
    for(let i = 0; i < len; i++){
      daies.push(i+1);
    }
    this.setState({
      daies:daies
    });
  }

  //获取选择的日期
  responseTime(json){
    switch(json.type){
      case 'year':
        this.setState({
          selectedTime:{
            ...this.state.selectedTime,
            year:json.time
          }
        });
        break;
      case 'month':
        this.setState({
          selectedTime:{
            ...this.state.selectedTime,
            month:json.time
          }
        });
        break;
      case 'day':
        this.setState({
          selectedTime:{
            ...this.state.selectedTime,
            day:json.time
          }
        });
        break;
    }
  }

  //接收完成请求
  dispatchShow(childState){
    this.setState({
      datetimeShow:childState.datetimeShow,
      datetimeWrite:childState.datetimeWrite
    });
  }
}

export default ReactDatetimePicker;