import React,{Component} from 'react';

class Item extends Component{
    render(){
        return(
            <li className="clearfix">
                <p>id:{this.props.item.id},{this.props.item.name}</p>
                <span className="btn btn-info" onClick={this.handleRemove.bind(this,this.props.item.id)}>删除</span>
            </li>
        )
    }
    handleRemove(id){
        if(confirm('确定删除吗？')){
            this.props.clkRemove(id);
        }
    }
}

export default Item;
