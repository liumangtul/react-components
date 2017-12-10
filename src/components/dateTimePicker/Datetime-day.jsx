import React,{Component} from 'react';

class Datetimeday extends Component{
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
      <div id="day-box" className="datetime-box">
        <ul
          id="scroller-day"
          className={this.state.isMove?'datetime-scroller-box':'datetime-scroller-box datetime-scroller-box-transition'}
          ref={(ul)=>{this.ul = ul}}
        >
          {
            this.props.daies.map((item,index)=>{
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
        myJRoll : new this.props.JRoll('#day-box')
      },()=>{
        this.meScrollEvent(this.state.myJRoll);
      });
    },0);
  }

  componentDidUpdate(preProps,preState){
    //当daies list发生改变时，且当前选中的day大于新月天数，修改day
    if(preProps.daies.length>this.props.daies.length && this.state.selectedTime.day>this.props.daies[this.props.daies.length-1]){
      this.state.myJRoll.scrollToElement(this.ul.children[this.props.daies.length-1],300);
      this.setState({
        selectedTime:{
          ...this.state.selectedTime,
          day:this.props.daies[this.props.daies.length-1]
        }
      },()=>{
        this.props.sendDay({type:'day',time:this.state.selectedTime.day});
      });
    }
  }

  meScrollEvent(myJRoll){
    let liheight = this.ul.children[0].offsetHeight;
    let that = this;
    let liIndex = 0;
    for(let i = 0; i < this.props.daies.length; i++){
      if(this.props.daies[i] == this.props.preDay){
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
          day:that.props.daies[that.state.liIndex]
        }
      },()=>{
        that.props.sendDay({type:'day',time:that.state.selectedTime.day});
      });
    });
  }
}

export default Datetimeday;