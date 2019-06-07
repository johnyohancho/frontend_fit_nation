import { createStore, combineReducers } from 'redux';
import navReducer from './reducers/navReducer'

const rootReducer = combineReducers({
    nav_reducer: navReducer
})


export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );