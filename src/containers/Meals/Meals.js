import React from 'react';
// import _ from 'lodash';
import './Meals.css';
import CreateFoodForm from './CreateFoodForm/CreateFoodForm';
import SearchResults from './SearchResults/SearchResults';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';


class Meals extends React.Component {

    constructor() {
        super()
        this.state = {
            user_id: jwt_decode(localStorage.getItem('token')).user_id,
            results: [],
            searchTerm: '',
            errors: [],
            meals: []
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
                this.setState({ meals: data.meals})
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
                        <h2 className='ui header'>Breakfast</h2>
                            <table id='breakfast-table' className="ui striped table">
                                <thead className="">
                                    <tr className="">
                                    <th className="">Name</th>
                                    <th className="">Date</th>
                                    <th className="">Time</th>
                                    <th className="">Calories</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    { this.state.meals.forEach(meal => {
                                        if (meal.meal_type === 'Breakfast') {
                                            debugger
                                            return (
                                                <tr className="">
                                                <td className="">testing</td>
                                                <td className="">meal.date</td>
                                                <td className="">meal.time</td>
                                                <td className="">meal.calories</td>
                                                </tr>
                                            )
                                        } else {
                                            return null
                                        };
                                    })}
                                </tbody>
                            </table>
                        <h2 className='ui header'>Lunch</h2>
                            <table id='lunch-table' className="ui striped table">
                                <thead className="">
                                    <tr className="">
                                    <th className="">Name</th>
                                    <th className="">Date Joined</th>
                                    <th className="">E-mail</th>
                                    <th className="">Called</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    <tr className="">
                                    <td className="">John Lilki</td>
                                    <td className="">September 14, 2013</td>
                                    <td className="">jhlilk22@yahoo.com</td>
                                    <td className="">No</td>
                                    </tr>
                                    <tr className="">
                                    <td className="">John Lilki</td>
                                    <td className="">September 14, 2013</td>
                                    <td className="">jhlilk22@yahoo.com</td>
                                    <td className="">No</td>
                                    </tr>
                                </tbody>
                            </table>
                        <h2 className='ui header'>Dinner</h2>
                            <table id='dinner-table' className="ui striped table">
                                <thead className="">
                                    <tr className="">
                                    <th className="">Name</th>
                                    <th className="">Date Joined</th>
                                    <th className="">E-mail</th>
                                    <th className="">Called</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    <tr className="">
                                    <td className="">John Lilki</td>
                                    <td className="">September 14, 2013</td>
                                    <td className="">jhlilk22@yahoo.com</td>
                                    <td className="">No</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2 className='ui header'>Snacks</h2>
                            <table id='snack-table' className="ui striped table">
                                <thead className="">
                                    <tr className="">
                                    <th className="">Name</th>
                                    <th className="">Date Joined</th>
                                    <th className="">E-mail</th>
                                    <th className="">Called</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    <tr className="">
                                    <td className="">John Lilki</td>
                                    <td className="">September 14, 2013</td>
                                    <td className="">jhlilk22@yahoo.com</td>
                                    <td className="">No</td>
                                    </tr>
                                </tbody>
                            </table>
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
                        { this.props.add_food_mode === 'create' ?
                        <CreateFoodForm />
                        :
                        <SearchResults />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    let addFoodMode = state.meal_reducer.add_food_mode
    let searchResults = state.meal_reducer.search_results

    return {
        add_food_mode: addFoodMode,
        search_results: searchResults
    }
}


export default connect(mapStateToProps)(Meals);