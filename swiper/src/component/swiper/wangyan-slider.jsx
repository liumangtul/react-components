import React from 'react';
import SliderDot from './sliderDot/SliderDot';
import SliderList from './sliderList/SliderList';
import './wangyan-slider.less';

class ReactSlider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width:null,
      activeIndex:this.props.data.length,
      isTransition:false,
      left:0,
      play:true,
      data:[],
      playInterTimer:null,
      playDelayTimer:null
    };
    this.moveSlider = this.moveSlider.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.getUl = this.getUl.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);
    this.play = this.play.bind(this);
    this.move = this.move.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data:nextProps.data.concat(nextProps.data)
    });
  }

  render(){
    return(
      <div className="wangyan-slider" id="wangyan-slider">
        <SliderList
          width={this.state.width}
          data={this.state.data}
          touch = {this.handleTouchStart}
          getUl = {this.getUl}
          left = {this.state.left}
          isTransition = {this.state.isTransition}
          activeIndex={this.state.activeIndex}
        />
        <SliderDot
            dotLength = {this.props.data.length}
            activeIndex={this.state.activeIndex%this.props.data.length}
        />
        <button onTouchEnd={()=>{this.move({arrow:'left'})}} className="glyphicon-arrow-left glyphicon btn-left"></button>
        <button onTouchEnd={()=>{this.move({arrow:'right'})}} className="glyphicon-arrow-right glyphicon btn-right"></button>
      </div>
    )
  }

  getUl(oList){
    this.setState({
      oUl:oList
    });
  }

  componentDidMount(){
    this.setState({
      width:document.documentElement.clientWidth,
      left:-this.props.data.length*document.documentElement.clientWidth,
      data:this.props.data
    });
    this.play();
  }

  handleTouchStart(e){
    clearInterval(this.state.playInterTimer);
    if(!this.go){
      this.go = true;
    }else{
      return;
    }
    this.setState({
      isTransition:false,
      startX:e.changedTouches[0].pageX,
      startY:e.changedTouches[0].pageY,
      startL:this.state.left
    });
    document.addEventListener('touchmove',this.handleTouchMove,false);
    document.addEventListener('touchend',this.handleTouchEnd,false);
  }

  handleTouchMove(e){
    this.setState({
      isTransition:false,
      targetX:e.changedTouches[0].pageX - this.state.startX,
      targetY:e.changedTouches[0].pageY - this.state.startY
    });
    this.moveSlider({type:'move'},e);
  }

  handleTouchEnd(e){

    this.setState({
      isTransition:true,
      targetX:e.changedTouches[0].pageX - this.state.startX,
      targetY:e.changedTouches[0].pageY - this.state.startY
    });
    this.moveSlider({type:'end'},e);
    clearTimeout(this.state.playDelayTimer);
    this.state.playDelayTimer = setTimeout(()=>{
      this.setState({
        isTransition:true
      });
      this.play();
    },1000);
    this.state.oUl.addEventListener('webkitTransitionEnd',this.transitionEnd,false);
    this.state.oUl.addEventListener('transitionEnd',this.transitionEnd,false);

    document.removeEventListener('touchmove',this.handleTouchMove,false);
    document.removeEventListener('touchend',this.handleTouchEnd,false);
  }

  transitionEnd(){
    let activeIndex = this.state.activeIndex;
    if(activeIndex<=1){
      activeIndex = this.props.data.length+1;
    }else if(activeIndex >= this.props.data.length+2){
      activeIndex = 2;
    }
    this.setState({
      activeIndex:activeIndex,
      isTransition:false,
      left:-this.state.width*activeIndex
    });
    if(this.go)this.go = false;
    this.state.oUl.removeEventListener('webkitTransitionEnd',this.transitionEnd,false);
    this.state.oUl.removeEventListener('transitionEnd',this.transitionEnd,false);
  }

  moveSlider(opt,e){
    if(opt.type == 'move'){
      this.setState({
        left:this.state.targetX + this.state.startL
      });
    }else if(opt.type == 'end'){
      if(Math.abs(this.state.targetX)>100){
        let activeIndex = this.state.activeIndex;
        if(this.state.targetX<0){
          activeIndex++;
        }else{
          activeIndex--;
        }
        this.setState({
          activeIndex:activeIndex,
          left:-this.state.oUl.children[0].offsetWidth*activeIndex
        });
      }else{
        this.setState({
          left:-this.state.oUl.children[0].offsetWidth*this.state.activeIndex
        });
      }
    }
  }

  play(){
    clearInterval(this.state.playInterTimer);
    this.state.playInterTimer = setInterval(()=>{
      this.move({arrow:'auto'});
    },2000);
  }

  move(opt){
    if((opt.arrow == 'left' || opt.arrow == 'right')){
      if(!this.go){
        this.go = true;
      }else{
        return;
      }
    }
    let activeIndex = this.state.activeIndex;
    if(opt.arrow == 'left'){
      clearInterval(this.state.playInterTimer);
      activeIndex--;
    }else if(opt.arrow == 'right'){
      clearInterval(this.state.playInterTimer);
      activeIndex++;
    }else{
      activeIndex++;
    }
    this.setState({
      isTransition:true,
      activeIndex:activeIndex,
      left:-this.state.width*activeIndex
    });
    this.state.oUl.addEventListener('webkitTransitionEnd',this.transitionEnd,false);
    this.state.oUl.addEventListener('transitionEnd',this.transitionEnd,false);
    if(opt.arrow == 'left' || opt.arrow == 'right'){
      this.play();
    }
  }
}

export default ReactSlider;