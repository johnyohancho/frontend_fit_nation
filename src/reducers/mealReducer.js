export default (state = { add_food_mode: '', search_results: [] }, action) => {
    switch (action.type) {
        case "SEARCH_FOOD": {
            return ({...state, add_food_mode: 'search'})
        };
        case "CREATE_FOOD": {
            if (state.add_food_mode === '' || state.add_food_mode === 'search') {
                return ({...state, add_food_mode: 'create'})
            } else {
                return ({...state, add_food_mode: ''})
            };
        };
        case "CLEAR_MODE": {
            return ({...state, add_food_mode: ''})
        }
        case "SEARCH_RESULTS": {
            let results = state.search_results
            results.push(action.data)
            return ({...state, search_results: results })
        }
        default: return state;
    }
}