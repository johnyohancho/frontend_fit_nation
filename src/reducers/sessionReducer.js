
export default (state = { loggedIn: !!localStorage.getItem('token'), userData: {} }, action) => {
    switch (action.type) {
        case "USER_LOGIN": {
            return Object.assign({}, state, {
                loggedIn: true
              })
        }
        case "GET_USER_DATA": {
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    ...action.data
            }
              })
        }
        case "CLEAR_USER_DATA": {
            return Object.assign({}, state, {
                userData: {}
              })
        }
        case "ADD_MEAL": {
            let newMealsData = [...state.userData.meals, action.data]
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    ...{
                        meals: newMealsData
                    }
                }
              })
        }
        case "ADD_WORKOUT": {
            let newWorkoutsData = [...state.userData.user_workouts, action.data]
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    ...{
                        user_workouts: newWorkoutsData
                    }
                }
              })
        }
        case "DELETE_MEAL": {
            let newMealsData = [...state.userData.meals].filter(meal => meal.id !== action.data.id)
            console.log(newMealsData)
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    ...{
                        user_meals: newMealsData
                    }
                }
              })
        }
        case "DELETE_WORKOUT": {
            let newWorkoutsData = [...state.userData.user_workouts].filter(workout => workout.id !== action.data.id)
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    ...{
                        user_meals: newWorkoutsData
                    }
                }
              })
        }
        default: return state;
    }
}