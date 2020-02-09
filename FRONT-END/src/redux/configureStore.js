import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import ReduxThunk from 'redux-thunk';   
import modules from './modules';

// Store를 생성해서 반환하는 fuction 입니다.
const configureStore = (initialState) => {
    const store = createStore(modules, composeWithDevTools(applyMiddleware(ReduxThunk, logger)));
    return store;
}

export default configureStore;