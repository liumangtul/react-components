import fetch from 'isomorphic-fetch';

//删除新闻
const REMOVE_ITEM_PENDING = "REMOVE_ITEM_PENDING";
const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
const REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED";

const removeItemPending = ()=>{
    return {
        type:REMOVE_ITEM_PENDING
    }
};

const removeItemSuccess = (json)=>{
    return {
        type:REMOVE_ITEM_SUCCESS,
        id:json.id
    }
};

const removeItemFailed = (error)=>{
    return {
        type:REMOVE_ITEM_FAILED,
        error
    }
};

const removeNews = (id)=>{
    return (dispatch,getState)=>{
        dispatch(dispatch(removeItemPending()));
        var searchParams = new URLSearchParams();
        //get(key) set(key,value) 等方法
        searchParams.set('id',id);
        return fetch('/api/removeNews',{
            method:'POST',
            credentials: 'include',//跨域允许带cookie
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:searchParams
        })
            .then(res=>res.json())
            .then(json=>{
                return dispatch(dispatch(removeItemSuccess(json)))
            })
            .catch(error=>dispatch(dispatch(removeItemFailed(error))));
    }
};


export {
    REMOVE_ITEM_PENDING,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAILED,
    removeNews
};