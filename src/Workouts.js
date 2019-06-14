import React from 'react';
import MealWorkout from './MealWorkout';
import { connect } from 'react-redux';

class Workouts extends React.Component {
    
    constructor() {
        super()
        this.state = {
            category: 'Workout'
        }
    }
    
    render() {
        return (
            <MealWorkout 
                        mode={this.props.add_mode} 
                        search_results={this.props.search_results}
                        records={this.props.workouts}
                        dropdown_menu={this.props.types}
                        fields={this.props.fields}
                        category={this.props.category}
            />
        )   
    }
}

let mapStateToProps = (state) => {

    let workoutAddMode = state.workout_reducer.add_mode
    let workoutSearchResults = state.workout_reducer.search_results
    let workouts = state.workout_reducer.workouts
    let workoutTypes = state.workout_reducer.workout_types
    let workoutFields = state.workout_reducer.fields
    let workoutCategory = state.workout_reducer.category

    return {
        add_mode: workoutAddMode,
        search_results: workoutSearchResults,
        workouts: workouts,
        types: workoutTypes,
        fields: workoutFields,
        category: workoutCategory
    }
}



export default connect(mapStateToProps)(Workouts);