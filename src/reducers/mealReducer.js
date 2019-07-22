export default (state = { category: 'Meal', add_mode: '', searching: false, search_results: [], meals: [], fields: ["Name", "Date", "Time", "Calories", "Protein", "Carbs", "Fat"],
 
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
          return Object.assign({}, state, {
            add_mode: 'search_meal'
          })
        }
        case "CREATE_MEAL": {
          if (state.add_mode === '' || state.add_mode === 'search_meal') {
            return Object.assign({}, state, {
              add_mode: 'create_meal'
            })
          } else {
            return Object.assign({}, state, {
              add_mode: ''
            })
          }
        } 
        case "CLEAR_MODE": {
          return Object.assign({}, state, {
            add_mode: ''
          })
        }
        case "SEARCH_MEAL_RESULTS": {
          return Object.assign({}, state, {
            search_results: action.data,
            searching: !state.searching
          })
        }
        case "SEARCHING": {
          return Object.assign({}, state, {
            searching: true
          })    
        }
        default: return state;
    }
}