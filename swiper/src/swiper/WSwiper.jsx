import React from 'react';
import ReactSlider from '../component/swiper/wangyan-slider';

class WSwiper extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[]
    };

    setTimeout(()=>{
      const base = 'http://codeyan.net/slider-images/';
      this.setState({
        data:[
          {src:base+'1.jpg'},
          {src:base+'2.jpg'},
          {src:base+'3.jpg'},
          {src:base+'4.jpg'},
          {src:base+'5.jpg'},
          {src:base+'6.jpg'}
        ]
      });
    },1000);

  }

  render(){
    return (
      <ReactSlider
        data={this.state.data}
      />
    )
  }
}

export default WSwiper;