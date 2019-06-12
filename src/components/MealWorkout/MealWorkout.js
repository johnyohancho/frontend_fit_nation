import React from 'react';
// import _ from 'lodash';
import './MealWorkout.css';
import CreateFoodForm from './CreateFoodForm/CreateFoodForm';
import SearchResults from './SearchResults/SearchResults';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import MealBox from './MealBox/MealBox';


class MealWorkout extends React.Component {

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
                <div className="login-form-errors">
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



    render() {
        return (
            <div id='meals-page' className='ui grid'>
                <div className='eight wide column'>
                    <div id='meals-container' className='ui container'>
                        <div className='ui segment'>
                            <h2 className='ui header'>Breakfast</h2>
                                <table className="ui striped table">
                                            <thead className="">
                                                <tr className="">
                                                <th className="">Name</th>
                                                <th className="">Date</th>
                                                <th className="">Time</th>
                                                <th className="">Calories</th>
                                                </tr>
                                            </thead>
                                            <tbody className="">
                                                {this.props.meals.length > 0 ? 
                                                    this.props.meals[0].filter(meal => 
                                                        meal.meal_type === 'Breakfast')
                                                        .map(breakfast => 
                                                        <MealBox meal={breakfast}/>
                                                        )
                                                    :
                                                    <MealBox meal={null} />
                                                    }
                                            </tbody>
                                </table>
                        </div>
                        <div className='ui segment'>
                            <h2 className='ui header'>Lunch</h2>
                                <table className="ui striped table">
                                        <thead className="">
                                            <tr className="">
                                            <th className="">Name</th>
                                            <th className="">Date</th>
                                            <th className="">Time</th>
                                            <th className="">Calories</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {this.props.meals.length > 0 ? 
                                                this.props.meals[0].filter(meal => 
                                                    meal.meal_type === 'Lunch')
                                                    .map(lunch => 
                                                    <MealBox meal={lunch}/>
                                                    )
                                                :
                                                <MealBox meal={null} />
                                                }
                                        </tbody>
                                </table>
                        </div>
                        <div className='ui segment'>
                            <h2 className='ui header'>Dinner</h2>
                                <table className="ui striped table">
                                        <thead className="">
                                            <tr className="">
                                            <th className="">Name</th>
                                            <th className="">Date</th>
                                            <th className="">Time</th>
                                            <th className="">Calories</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {this.props.meals.length > 0 ? 
                                                this.props.meals[0].filter(meal => 
                                                    meal.meal_type === 'Dinner')
                                                    .map(dinner => 
                                                    <MealBox meal={dinner}/>
                                                    )
                                                :
                                                <MealBox meal={null} />
                                                }
                                        </tbody>
                                </table>
                        </div>
                        <div className='ui segment'>
                            <h2 className='ui header'>Snacks</h2>
                                <table className="ui striped table">
                                    <thead className="">
                                        <tr className="">
                                        <th className="">Name</th>
                                        <th className="">Date</th>
                                        <th className="">Time</th>
                                        <th className="">Calories</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {this.props.meals.length > 0 ? 
                                            this.props.meals[0].filter(meal => 
                                                meal.meal_type === 'Snack')
                                                .map(snack => 
                                                <MealBox meal={snack}/>
                                                )
                                            :
                                            null
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                <div className='eight wide column'>
                    <div className='row'>
                        <div><button id='create-food-button' className='ui blue button' onClick={() => this.props.dispatch({ type: 'CREATE_FOOD' })}>Create Food</button></div>
                    </div>
                    <div className='row'>
                        <div className="ui action input">
                            <input type="text" placeholder="Search..." onChange={this.handleChange}/>
                            <button className="ui button" onClick={this.handleSearch}>
                                Search
                            </button>
                        </div>
                        {(() => {
                            switch (this.props.add_food_mode) {
                            case "create":
                                return <CreateFoodForm />;
                            case "search":
                                return <SearchResults />;
                            default:
                                return null;
                            }
                        })()}
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    let addFoodMode = state.meal_reducer.add_food_mode
    let searchResults = state.meal_reducer.search_results
    let meals = state.meal_reducer.meals

    return {
        add_food_mode: addFoodMode,
        search_results: searchResults,
        meals: meals
    }
}


export default connect(mapStateToProps)(MealWorkout);