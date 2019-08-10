
export default (state = { loggedIn: !!localStorage.getItem('token'), userData: {}, signUp: false, userCreated: false, userSettingModal: false, editUserOpen: false, macroSeries: [], caloriesSeries: [], currentDate: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }, action) => {
    switch (action.type) {
        case "USER_LOGIN": {
            return Object.assign({}, state, {
                loggedIn: true,
                userCreated: false
              })
        }
        case "USER_CREATED_MSG": {
            if (state.userCreated === false) {
                return Object.assign({}, state, {
                    userCreated: true
                })    
            } else {
                return Object.assign({}, state, {
                    userCreated: false
                })
            };
        }
        case "GET_USER_DATA": {
            console.log("getting user data", data)
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
        case "GET_MACRO_DATA": {
            console.log("get macro data", action.data)
            return Object.assign({}, state, {
                macroSeries: action.data
            })
        }
        case "GET_CALORIES_DATA": {
            return Object.assign({}, state, {
                caloriesSeries: action.data
            })
        }
        case "UPDATE_USER_SETTING": {
            let newCalories = action.data.set_calories
            let newProtein = action.data.set_protein
            let newCarbs = action.data.set_carbs
            let newFat = action.data.set_fat
            let newCurrentDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`

            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    set_calories: newCalories,
                    set_protein: newProtein,
                    set_carbs: newCarbs,
                    set_fat: newFat
                },
                currentDate: newCurrentDate
            })
        }
        case "USER_SETTING_MODAL": {
            return Object.assign({}, state, {
                userSettingModal: !state.userSettingModal
            })
        }
        case "CHANGE_TO_LOGIN": {
            return Object.assign({}, state, {
                signUp: false
            })
        }
        case "CHANGE_TO_SIGNUP": {
            return Object.assign({}, state, {
                signUp: true
            })
        }
        default: return state;
    }
}