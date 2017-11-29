import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

export default createStore(
    reducer,
    applyMiddleware(
        thunk,
        createLogger()
    )
);
