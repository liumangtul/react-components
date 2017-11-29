import {
    FETCH_ENTRY_PENDING,
    FETCH_ENTRY_SUCCESS,
    FETCH_ENTRY_FEILED
} from '../action/newsList';

const newsList = (state,action)=>{
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
    }
};
export default newsList;