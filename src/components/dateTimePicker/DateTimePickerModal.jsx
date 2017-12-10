import React,{Component} from 'react';
import Datetimeyear from './Datetime-year';
import Datetimemonth from './Datetime-month';
import Datetimeday from './Datetime-day';
import JRoll from 'jroll';

class DateTimePickerModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      datetime:null,
      years:[],
      months:[],
      daies:[]
    }
  }

  render(){
    return(
      <div id="datetime-picker-modal" className={this.state.datetimeShow ? 'datetime-picker-modal-show' : 'datetime-picker-modal'}>
        <header>
          <h2 onClick={this.submitDateTime.bind(this)}>完成</h2>
        </header>
        <section className="datetime-picker-modal-content">
          <div className="datetime-picker-select-parent">
            <div className="datetime-picker-mask"></div>
            <section className="datetime-picker-select-box">
              <Datetimeyear
                years={this.state.years}
                JRoll={JRoll}
                sendYear={this.props.sendTime}
                preYear = {this.props.preYear}
              />
              <Datetimemonth
                months={this.state.months}
                JRoll={JRoll}
                sendMonth={this.props.sendTime}
                preMonth = {this.props.preMonth}
              />
              <Datetimeday
                daies={this.state.daies}
                JRoll={JRoll}
                sendDay={this.props.sendTime}
                preDay = {this.props.preDay}
              />
            </section>
          </div>
        </section>
      </div>
    )
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      datetime:nextProps.datetime,
      years:nextProps.years,
      months:nextProps.months,
      daies:nextProps.daies,
      datetimeShow:nextProps.datetimeShow
    });
  }

  submitDateTime(){
    this.setState({
      datetimeWrite:true,
      datetimeShow:false
    },()=>{
      this.props.dispatchShow({
        datetimeWrite:this.state.datetimeWrite,
        datetimeShow:this.state.datetimeShow
      });
    });
  }
}

export default DateTimePickerModal;