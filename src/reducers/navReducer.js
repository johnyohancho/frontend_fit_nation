export default (state = { loggedIn: !!localStorage.getItem('token') }, action) => {
    switch (action.type) {
        case "LOG_IN_OUT": {
            if (state.loggedIn === true ) {
                localStorage.clear()
                return {...state, loggedIn: false }
            } else {
                return {...state, loggedIn: true }
            };
        };
        default: return state;
    }
}