import React from 'react';
import './css/Meals.css';
import MealWorkout from './MealWorkout';
import { connect } from 'react-redux';
import { getUserData } from './ApiCalls';
import jwt_decode from 'jwt-decode';
import { formatDate } from './Calculations';



class Meals extends React.Component {
    
    constructor() {
        super()
        this.state = {
            category: 'Meal'
        }
    }

    componentDidMount() {
        const userId = jwt_decode(localStorage.getItem('token')).user_id
        getUserData(userId).then((data) => {
            this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
            this.props.dispatch({ type: "GET_USER_DATA", data: data })
            }
        )
    }
    
    render() {
        return (
            <MealWorkout 
                        mode={this.props.add_mode} 
                        search_results={this.props.search_results}
                        records={this.props.meals}
                        dropdown_menu={this.props.types}
                        fields={this.props.fields}
                        category={this.props.category}
            />
        )   
    }
}

let mapStateToProps = (state) => {
    let mealAddMode = state.meal_reducer.add_mode
    let mealSearchResults = state.meal_reducer.search_results

    let mealsList = []
    if (state.session_reducer.userData.meals !== undefined ) {
        let dateNow = new Date(state.session_reducer.currentDate)
        let todayMeals = state.session_reducer.userData.meals.filter(meal => new Date(formatDate(meal.date)) >= dateNow )
        mealsList = todayMeals
    };
    
    let mealTypes = state.meal_reducer.meal_types
    let mealFields = state.meal_reducer.fields
    let mealCategory = state.meal_reducer.category

    return {
        currentDate: state.session_reducer.currentDate,
        add_mode: mealAddMode,
        search_results: mealSearchResults,
        meals: mealsList,
        types: mealTypes,
        fields: mealFields,
        category: mealCategory
    }
}


export default connect(mapStateToProps)(Meals);