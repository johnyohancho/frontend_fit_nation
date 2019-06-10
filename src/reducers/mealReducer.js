export default (state = { add_food_mode: '' }, action) => {
    switch (action.type) {
        case "SEARCH_FOOD": {
            return ({...state, add_food_mode: 'search'})
        };
        case "CREATE_FOOD": {
            return ({...state, add_food_mode: 'create'})
        };
        default: return state;
    }
}