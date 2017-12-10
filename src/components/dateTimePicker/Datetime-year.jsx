import React,{Component} from 'react';

class Datetimeyear extends Component{
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
      <div id="year-box" className="datetime-box">
        <ul
          id="scroller-year"
          className={this.state.isMove?'datetime-scroller-box':'datetime-scroller-box datetime-scroller-box-transition'}
          ref={(ul)=>{this.ul = ul}}
        >
          {
            this.props.years.map((item,index)=>{
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
        myJRoll : new this.props.JRoll('#year-box')
      },()=>{
        this.meScrollEvent(this.state.myJRoll);
      });
    },0);
  }

  componentDidUpdate(preProps,preState){
    //console.log(preProps.daies.length,this.props.di.length)
  }

  meScrollEvent(myJRoll){
    let liheight = this.ul.children[0].offsetHeight;
    let that = this;
    let liIndex = 0;
    for(let i = 0; i < this.props.years.length; i++){
      if(this.props.years[i] == this.props.preYear){
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
      if(this.y == this.maxScrollY){
        console.log('ended')
      }
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
          year:that.props.years[that.state.liIndex]
        }
      },()=>{
        that.props.sendYear({type:'year',time:that.state.selectedTime.year});
      });
    });
  }
}

export default Datetimeyear;