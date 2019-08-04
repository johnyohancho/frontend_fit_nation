export default (state = { category: 'Workout', add_mode: '', search_results: [], workouts: [], fields: ["Name", "Weight", "Sets", "Reps"],
 
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
            return ({...state, add_mode: 'search_workout'})
        };
        case "CREATE_WORKOUT": {
            if (state.add_mode === '' || state.add_mode === 'search_workout') {
                return ({...state, add_mode: 'create_workout'})
            } else {
                return ({...state, add_mode: ''})
            };
        };
        case "CLEAR_MODE": {
            return ({...state, add_mode: ''})
        }
        case "SEARCH_WORKOUT_RESULTS": {
            state.search_results = []
            let results = [...state.search_results, action.data]
            return ({...state, search_results: results })
        }
        default: return state;
    }
}