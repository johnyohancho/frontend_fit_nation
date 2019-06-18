
export default (state = { loggedIn: !!localStorage.getItem('token'), userData: {}, editUserOpen: false }, action) => {
    switch (action.type) {
        case "USER_LOGIN": {
            return Object.assign({}, state, {
                loggedIn: true
              })
        }
        case "GET_USER_DATA": {
            console.log(action.data)
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
            console.log(action.data)
            let newMealsData = [...state.userData.meals, action.data]
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    meals: newMealsData
                }
              })
        }
        case "ADD_WORKOUT": {
            let newWorkoutsData = [...state.userData.user_workouts, action.data]
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    user_workouts: newWorkoutsData
                }
              })
        }
        case "DELETE_MEAL": {
            let newMealsData = [...state.userData.meals].filter(meal => meal.id !== action.data.id)
            console.log(newMealsData)
            console.log([...state.userData.meals])
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    meals: newMealsData
                }
              })
        }
        case "DELETE_WORKOUT": {
            let newWorkoutsData = [...state.userData.user_workouts].filter(workout => workout.id !== action.data.id)
            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    user_workouts: newWorkoutsData
                }
              })
        }
        case "UPDATE_USER_DATA": {
            let newUsername = action.data.username
            let newPassword = action.data.password_digest
            let newName = action.data.name
            let newEmail = action.data.email
            let newDescription = action.data.description

            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    username: newUsername,
                    password_digest: newPassword,
                    name: newName,
                    email: newEmail,
                    description: newDescription
                }
            })
        }
        // case "CHECK_DAILYSNAP_EXIST": {
        //     return Object.assign({}, state, {
        //         loggedIn: true
        //       })
        // }
        default: return state;
    }
}