import {
    FETCH_ENTRY_PENDING,
    FETCH_ENTRY_SUCCESS,
    FETCH_ENTRY_FEILED
} from '../action/newsList';

import {
    REMOVE_ITEM_PENDING,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAILED
} from '../action/removeNews';

const reducer = (state = {},action)=>{
    switch(action.type){
        //加载中
        case FETCH_ENTRY_PENDING:
            return {
                ...state,
                isFetching:true,
                status:1
            };
            break;
        //加载成功
        case FETCH_ENTRY_SUCCESS:
            return {
                ...state,
                isFetching:false,
                status:2,
                ...action.json
            };
            break;
        //加载失败
        case FETCH_ENTRY_FEILED:
            return {
                ...state,
                isFetching:false,
                status:3,
                ...action.error
            };
            break;
        //删除中
        case REMOVE_ITEM_PENDING:
            return {
                ...state,
                isFetching:true,
                status:1
            };
            break;
        //删除成功
        case REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                isFetching:false,
                status:2,
                ...action.json,
                data:state.data.filter((item)=>{
                    return item.id != action.id;
                })
            };
            break;
        //删除失败
        case REMOVE_ITEM_FAILED:
            return {
                ...state,
                isFetching:false,
                status:3,
                ...action.error
            };
            break;
        default:
            return state;
            break;
    }
};

export default reducer;