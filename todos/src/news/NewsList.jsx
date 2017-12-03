//plugin
import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//action
import { showNewsList } from './redux/action/newsList';
import { removeNews } from './redux/action/removeNews';

//component
import Item from './Item';
//style
import './style.less';

class NewsList extends Component{
  render(){
    let arrlist = [];
    if(this.props.result){
      if(this.props.result.status == 2){
        arrlist = this.props.result.data.map((item,index)=>{
          return <Item key={index} item={item} clkRemove={this.props.removeNews}/>
        });
      }
    }
    return(
      <ul id="newslist">
        {arrlist}
      </ul>
    )
  }

  componentDidMount(){
    this.props.showNewsList();
  }
  componentDidUpdate(){
    //console.error(this.props)
  }
}

const mapStateToProps = (state,props)=>{
  return{
    result:state.reducer
  }
};

const mapDispatchToProps = (dispatch,props)=>({
  ...bindActionCreators({
    showNewsList,
    removeNews
  },dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsList);
