import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import iScroll from 'iscroll';
import NewsList from '../news/NewsList';

class Iscroll extends Component{
  render(){
    return(
      <div id="iscoll">
          <NewsList/>
      </div>
    )
  }
};

const mapStateToProps = (state,prosp)=>{
  return{

  }
};

const mapDispatchToProps = (dispatch,props)=>({
  ...bindActionCreators({

  },dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Iscroll);
