export default (state = { loggedIn: !!localStorage.getItem('token') }, action) => {
    switch (action.type) {
        case "USER_LOGIN": {
            return {...state, loggedIn: true }
        }
        // case "GET_USER_DATA": {
        //     let mealsData = [...state.meals, action.data]
        //     return ({...state, meals: mealsData })
        // }
        default: return state;
    }
}