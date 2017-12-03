import React from 'react';
import l from '../../../app/common.js';
import './sliderList.less';

class SliderList extends React.Component{
  render(){
    const {
      width,
      data,
      touch,
      getUl,
      left,
      isTransition
    } = this.props;

    const trasnform = l.setCss3ToJson('transform','translateX('+left+'px)');
    return (
      <ul
        className={!isTransition?'clearfix slider-list':'clearfix slider-list moveUl'}
        style={{width:width*data.length+'px',...trasnform}}
        onTouchStart={touch}
        ref={(ul)=>{this.ulDom = ul;}}
      >
        {
          data.map((item,index)=>{
            return (
              <li key={index} className={index==this.props.activeIndex?'active':''}>
                <img
                  src={item.src}
                  alt="wangyan-slider"
                  style={{width:width+'px'}}
                />
              </li>
            )
          })
        }
      </ul>
    )
  }
  //获取ul DOM
  sendUl(obj){
    return this.props.getUl(obj);
  }

  componentDidMount(){
    this.sendUl(this.ulDom);
  }

}

export default SliderList;