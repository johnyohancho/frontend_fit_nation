export default (state = { add_food_mode: '', search_results: [], meals: [] }, action) => {
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
            state.search_results = []
            let results = [...state.search_results, action.data]
            return ({...state, search_results: results })
        }
        case "GET_MEALS": {
            let mealsData = [...state.meals, action.data]
            return ({...state, meals: mealsData })
        }
        case "ADD_MEAL": {
            let mealsData = [...state.meals[0], action.data]
            return ({...state, meals: [mealsData] })
        }
        default: return state;
    }
}