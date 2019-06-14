export default (state = { category: 'Meal', add_mode: '', search_results: [], meals: [], fields: ["Name", "Date", "Time", "Calories"],
 
  meal_types: [
    {
      key: 'Breakfast',
      text: 'Breakfast',
      value: 'Breakfast'
    },
    {
      key: 'Lunch',
      text: 'Lunch',
      value: 'Lunch'
    },
    {
      key: 'Dinner',
      text: 'Dinner',
      value: 'Dinner'
    },
    {
      key: 'Snack',
      text: 'Snack',
      value: 'Snack'
    }
  ]
}, action) => {
    switch (action.type) {
        case "SEARCH_MEAL": {
            return ({...state, add_mode: 'search_meal'})
        };
        case "CREATE_MEAL": {
            if (state.add_mode === '' || state.add_mode === 'search_meal') {
                return ({...state, add_mode: 'create_meal'})
            } else {
                return ({...state, add_mode: ''})
            };
        };
        case "CLEAR_MODE": {
            return ({...state, add_mode: ''})
        }
        case "SEARCH_RESULTS": {
            state.search_results = []
            let results = [...state.search_results, action.data]
            return ({...state, search_results: results })
        }
        // case "ADD_MEAL": {
        //     let mealsData = [...state.meals[0], action.data]
        //     return ({...state, meals: [mealsData] })
        // }
        default: return state;
    }
}