export default (state = { category: 'workout', add_workout_mode: '', search_results: [], workouts: [], fields: ["Name", "Description", "Sets", "Reps"],
 
  workout_types: [
    {
      key: 'Chest',
      text: 'Chest',
      value: 'Chest'
    },
    {
      key: 'Back',
      text: 'Back',
      value: 'Back'
    },
    {
      key: 'Shoulder',
      text: 'Shoulder',
      value: 'Shoulder'
    },
    {
      key: 'Legs',
      text: 'Legs',
      value: 'Legs'
    },
    {
      key: 'Arms',
      text: 'Arms',
      value: 'Arms'
    },
    {
      key: 'Abs',
      text: 'Abs',
      value: 'Abs'
    }
  ]
}, action) => {
    switch (action.type) {
        case "SEARCH_WORKOUT": {
            return ({...state, add_workout_mode: 'search_workout'})
        };
        case "CREATE_WORKOUT": {
            if (state.add_workout_mode === '' || state.add_workout_mode === 'search_workout') {
                return ({...state, add_workout_mode: 'create_workout'})
            } else {
                return ({...state, add_workout_mode: ''})
            };
        };
        case "CLEAR_MODE": {
            return ({...state, add_workout_mode: ''})
        }
        case "SEARCH_RESULTS": {
            state.search_results = []
            let results = [...state.search_results, action.data]
            return ({...state, search_results: results })
        }
        case "GET_WORKOUTS": {
            let workoutsData = [...state.workouts, action.data]
            return ({...state, workouts: workoutsData })
        }
        case "ADD_MEAL": {
            let mealsData = [...state.meals[0], action.data]
            return ({...state, meals: [mealsData] })
        }
        default: return state;
    }
}