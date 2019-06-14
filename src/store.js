import { createStore, combineReducers } from 'redux';
import sessionReducer from './reducers/sessionReducer';
import mealReducer from './reducers/mealReducer';
import workoutReducer from './reducers/workoutReducer';

const appReducer = combineReducers({
    session_reducer: sessionReducer,
    meal_reducer: mealReducer,
    workout_reducer: workoutReducer
})

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
        localStorage.clear()
        state = undefined
    };

    return appReducer(state, action);
};


export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );