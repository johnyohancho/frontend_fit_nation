import { createStore, combineReducers } from 'redux';
import navReducer from './reducers/navReducer';
import mealReducer from './reducers/mealReducer';

const rootReducer = combineReducers({
    nav_reducer: navReducer,
    meal_reducer: mealReducer
})


export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );