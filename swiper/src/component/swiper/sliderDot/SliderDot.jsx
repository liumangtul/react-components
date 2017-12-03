import React from 'react';
import './sliderDot.less';

const SliderDot = (props)=>{
  const {
    dotLength,
    activeIndex
  } = props;
  let obj = [];
  let i = 0;
  while(i<dotLength){
    obj.push(<span key={i} className={activeIndex == i ? 'dot_active':''}></span>);
    i++;
  }
  return (
    <div className="slider-dot">
      {obj}
    </div>
  )
};

export default SliderDot;