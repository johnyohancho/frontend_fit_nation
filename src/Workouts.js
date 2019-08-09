import React from 'react';
import MealWorkout from './MealWorkout';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getUserData } from './ApiCalls';
import { formatDate } from './Calculations';

class Workouts extends React.Component {
    
    constructor() {
        super()
        this.state = {
            category: 'Workout'
        }
    }

    componentDidMount() {
        const userId = jwt_decode(localStorage.getItem('token')).user_id
        getUserData(userId).then((data) => {
            this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
            this.props.dispatch({ type: "GET_USER_DATA", data: data })
            console.log(data)
            }
        )
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
    let workoutsList = []

    if (state.session_reducer.userData.user_workouts !== undefined ) {
        let dateNow = new Date(state.session_reducer.currentDate)
        let todayWorkouts = state.session_reducer.userData.user_workouts.filter(workout => new Date(formatDate(workout.date)) >= dateNow )
        workoutsList = todayWorkouts
    };

    let workoutTypes = state.workout_reducer.workout_types
    let workoutFields = state.workout_reducer.fields
    let workoutCategory = state.workout_reducer.category

    return {
        add_mode: workoutAddMode,
        search_results: workoutSearchResults,
        workouts: workoutsList,
        types: workoutTypes,
        fields: workoutFields,
        category: workoutCategory
    }
}



export default connect(mapStateToProps)(Workouts);