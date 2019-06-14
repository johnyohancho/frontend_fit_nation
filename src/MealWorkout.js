import React from 'react';
// import './Meals.css';
import CreateFoodForm from './CreateFoodForm';
import CreateWorkoutForm from './CreateWorkoutForm';
import SearchResults from './SearchResults';
import Records from './Records';
import { connect } from 'react-redux';


class MealWorkout extends React.Component {
    
    constructor() {
        super()
        this.state = {
            results: [],
            searchTerm: '',
            errors: [],
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

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }


    handleSearch = (e) => {
        e.preventDefault()
        let searchValue = this.state.searchTerm.replace(/\s/g, "%20")

        fetch(`https://api.edamam.com/api/food-database/parser?ingr=${searchValue}&app_id=a2fa636f&app_key=73b94865beb211abba81ba8d13b6a2a0%20`)
        .then(res => res.json())
        .then(data => this.props.dispatch({type: "SEARCH_RESULTS", data: data.hints}))
        this.props.dispatch({type: `SEARCH_${this.props.category}`})
      }

      handleClick = (e) => {
          let createType = `CREATE_${this.props.category.toUpperCase()}`
          this.props.dispatch({ type: createType })
      }

      deleteRecord = (e) => {
          console.log('need to delete!', e.target.value)
      }
    
    render() {
        return (
            <div id='mealworkout-page' className='ui grid'>
                <div className='eight wide column'>
                    <div id='records-container' className='ui container'>
                        {this.props.dropdown_menu.map(item =>
                            <div className='ui segment'>
                                <h2 className='ui header'>{item.key}</h2>
                                    <table className="ui striped table">
                                            <thead className="">
                                                <tr className="">
                                                    {this.props.fields.map(field => 
                                                        <th className="">{field}</th>    
                                                    )}
                                                    <th className=""><i aria-hidden="true" className="trash alternate outline link icon" onClick={null}></i></th>
                                                </tr>
                                            </thead>
                                            <tbody className="">
                                                {this.props.records && this.props.records.length > 0 ? 
                                                    this.props.records.filter(record =>
                                                        record.meal_type === item.key || record.workout_type === item.key)
                                                        .map(record => 
                                                        <Records record={record} fields={this.props.fields} deleteRecord={this.deleteRecord}/>
                                                        )
                                                    :
                                                    <Records record={null} fields={this.props.fields} deleteRecord={this.deleteRecord}/>
                                                    }
                                            </tbody>
                                    </table>
                            </div>
                        )}
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className='row'>
                        <div><button id='create-button' className='ui blue button' onClick={() => this.handleClick()}>{`Create ${this.props.category}`}</button></div>
                    </div>
                    <div className='row'>
                        <div className="ui action input">
                            <input type="text" placeholder="Search..." onChange={(e) => this.handleChange(e)}/>
                            <button className="ui button" onClick={(e) => this.handleSearch(e)}>
                                Search
                            </button>
                        </div>
                        {(() => {
                            switch (this.props.mode) {
                            case "create_meal":
                                return <CreateFoodForm />;
                            case "search_meal":
                                return <SearchResults />;
                            case "create_workout":
                                return <CreateWorkoutForm />;
                            case "search_workout":
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


export default connect()(MealWorkout);