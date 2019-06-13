import { createStore, combineReducers } from 'redux';
import navReducer from './reducers/navReducer';
import mealReducer from './reducers/mealReducer';
import workoutReducer from './reducers/workoutReducer';

const rootReducer = combineReducers({
    nav_reducer: navReducer,
    meal_reducer: mealReducer,
    workout_reducer: workoutReducer
})


export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );