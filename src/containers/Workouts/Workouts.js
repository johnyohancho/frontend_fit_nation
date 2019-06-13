import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import MealWorkout from '../../components/MealWorkout/MealWorkout';

class Workouts extends React.Component {
    constructor() {
        super()
        this.state = {
            user_id: jwt_decode(localStorage.getItem('token')).user_id,
            results: [],
            searchTerm: '',
            errors: []
        }
    }

    displayErrors = () => {
        if (this.state.errors.length > 0) {
            return (
                <div className="form-errors">
                    <p>Invalid!</p>
                    <ul>
                        {this.state.errors.map(err => <li>{err}</li>)}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.state.user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                this.props.dispatch({ type: "GET_WORKOUTS", data: data.user_workouts})
            };
        })
    }

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }


    handleSearch = (e) => {
        e.preventDefault()
        let searchValue = this.state.searchTerm.replace(/\s/g, "%20")

        fetch(`https://api.edamam.com/api/food-database/parser?ingr=${searchValue}&app_id=a2fa636f&app_key=73b94865beb211abba81ba8d13b6a2a0%20`)
        .then(res => res.json())
        .then(data => this.props.dispatch({type: "SEARCH_RESULTS", data: data.hints}))
        this.props.dispatch({type: "SEARCH_FOOD"})
      }

      handleClick = (e) => {
          this.props.dispatch({ type: 'CREATE_WORKOUT' })
      }



    render() {
        return (
            <MealWorkout handleChange={this.handleChange} 
                        handleSearch={this.handleSearch} 
                        handleClick={this.handleClick} 
                        mode={this.props.add_workout_mode} 
                        search_results={this.props.search_results}
                        records={this.props.workouts}
                        dropdown_menu={this.props.workout_types}
                        fields={this.props.fields}
                        category={this.props.category}
                        />
        )

    }        
}

let mapStateToProps = (state) => {
    let addWorkoutMode = state.workout_reducer.add_workout_mode
    let searchResults = state.workout_reducer.search_results
    let workouts = state.workout_reducer.workouts
    let workoutTypes = state.workout_reducer.workout_types
    let fields = state.workout_reducer.fields
    let category = state.workout_reducer.category

    return {
        fields: fields,
        workout_types: workoutTypes,
        search_results: searchResults,
        workouts: workouts,
        add_workout_mode: addWorkoutMode,
        category: category
    }
}


export default connect(mapStateToProps)(Workouts);