import React,{Component} from 'react';

class Datetimemonth extends Component{
  constructor(props){
    super(props);
    this.state = {
      isMove:false,
      myScroll:null,
      liIndex:null,
      selectedTime:{
        year:null,
        month:null,
        day:null
      }
    }
  }
  render(){
    return(
      <div id="month-box" className="datetime-box">
        <ul
          id="scroller-month"
          className={this.state.isMove?'datetime-scroller-box':'datetime-scroller-box datetime-scroller-box-transition'}
          ref={(ul)=>{this.ul = ul}}
        >
          {
            this.props.months.map((item,index)=>{
              return (
                <li key={item}>
                  {item}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        myJRoll : new this.props.JRoll('#month-box')
      },()=>{
        this.meScrollEvent(this.state.myJRoll);
      });
    },0);
  }

  meScrollEvent(myJRoll){
    let liheight = this.ul.children[0].offsetHeight;
    let that = this;
    let liIndex = 0;
    for(let i = 0; i < this.props.months.length; i++){
      if(this.props.months[i] == this.props.preMonth){
        liIndex = i;
      }
    }
    this.setState({
      liIndex:liIndex
    },()=>{
      this.scrollToElement(myJRoll,that);
    });
    myJRoll.on('scrollStart',function(){
      that.setState({
        isMove:true
      });
    });
    myJRoll.on('scroll',function () {

    });
    myJRoll.on('scrollEnd',function () {
      let liNewIndex = Math.abs(Math.round(this.y/liheight));
      that.setState({
        liIndex:liNewIndex
      },()=>{
        that.scrollToElement(myJRoll,that);
      });
      that.setState({
        isMove:false
      });
    });
  }

  scrollToElement(myJRoll,that){
    myJRoll.scrollTo(0,-that.state.liIndex*that.ul.children[0].offsetHeight,300,false,function () {
      that.setState({
        selectedTime:{
          ...that.state.selectedTime,
          month:that.props.months[that.state.liIndex]
        }
      },()=>{
        that.props.sendMonth({type:'month',time:that.state.selectedTime.month});
      });
    });
  }
}

export default Datetimemonth;