import React from 'react';
// import _ from 'lodash';
import './Meals.css';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import MealWorkout from '../../components/MealWorkout/MealWorkout';



class Meals extends React.Component {

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
                this.props.dispatch({ type: "GET_MEALS", data: data.meals})
            }
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
          this.props.dispatch({ type: 'CREATE_FOOD' })
      }



    render() {
        return (
            <MealWorkout handleChange={this.handleChange} 
                        handleSearch={this.handleSearch} 
                        handleClick={this.handleClick} 
                        mode={this.props.add_food_mode} 
                        search_results={this.props.search_results}
                        records={this.props.meals}
                        dropdown_menu={this.props.meal_types}
                        fields={this.props.fields}
                        category={this.props.category}
                        />
        )

    }        
}

let mapStateToProps = (state) => {
    let addFoodMode = state.meal_reducer.add_food_mode
    let searchResults = state.meal_reducer.search_results
    let meals = state.meal_reducer.meals
    let mealTypes = state.meal_reducer.meal_types
    let fields = state.meal_reducer.fields
    let category = state.meal_reducer.category

    return {
        add_food_mode: addFoodMode,
        search_results: searchResults,
        meals: meals,
        meal_types: mealTypes,
        fields: fields,
        category: category
    }
}


export default connect(mapStateToProps)(Meals);