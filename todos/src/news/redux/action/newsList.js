import fetch from 'isomorphic-fetch';

//显示新闻列表
const FETCH_ENTRY_PENDING = "FETCH_ENTRY_PENDING";
const FETCH_ENTRY_SUCCESS = "FETCH_ENTRY_SUCCESS";
const FETCH_ENTRY_FEILED = "FETCH_ENTRY_FEILED";

const fetchEntryPending = ()=>{
    return {
        type:FETCH_ENTRY_PENDING
    }
};

const fetchEntrySuccess = (json)=>{
    return {
        type:FETCH_ENTRY_SUCCESS,
        json
    }
};

const fetchEntryFailed = (error)=>{
    return {
        type:FETCH_ENTRY_FEILED,
        error
    }
};


const showNewsList = ()=>{
    return (dispatch,getState)=>{
        //正在加载
        dispatch(dispatch(fetchEntryPending()));
        return fetch('/api/newsList')
            .then(res=>res.json())
            .then(json=>dispatch(dispatch(fetchEntrySuccess(json))))
            .catch(err=>dispatch(dispatch(fetchEntryFailed())));
    };
};



export {
    FETCH_ENTRY_PENDING,
    FETCH_ENTRY_SUCCESS,
    FETCH_ENTRY_FEILED,
    showNewsList
};
