import React from 'react';
import './css/MealWorkout.css';
import CreateFoodForm from './CreateFoodForm';
import CreateWorkoutForm from './CreateWorkoutForm';
import SearchResults from './SearchResults';
import Records from './Records';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';


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
        let category = this.props.category.toUpperCase()
        this.props.dispatch({ type: "SEARCHING"})

        fetch(`https://api.edamam.com/api/food-database/parser?ingr=${searchValue}&app_id=a2fa636f&app_key=73b94865beb211abba81ba8d13b6a2a0%20`)
        .then(res => res.json())
        .then(data => this.props.dispatch({type: `SEARCH_${category}_RESULTS`, data: data.hints}))
        this.props.dispatch({type: `SEARCH_${category}`})
      }


      handleClick = (e) => {
        if (!!this.props.userData.set_calories && !!this.props.userData.set_protein && !!this.props.userData.set_carbs && !!this.props.userData.set_fat) {
            let createType = `CREATE_${this.props.category.toUpperCase()}`
            this.props.dispatch({ type: createType })
        } else {
            alert("Please set your Fitness Goals First!")
        }
      }

      

      deleteRecord = (e, record, category) => {
          let endpoint = ''
          if (category === 'Meal') {
            endpoint = category.toLowerCase() + 's'
          } else {
            endpoint = 'user_' + category.toLowerCase() + 's'
          };
          let deleteType = `DELETE_${category.toUpperCase()}`
          fetch(`https://backend-fitness-guru.herokuapp.com/${endpoint}/${record.id}`, {
              method: 'DELETE'
          })
          .then(() => this.props.dispatch({ type: deleteType, data: record }))
      }
    
    render() {
        return (
            <Segment id='mealworkout'>
                <Grid>
                    <div className='eight wide column'>
                        <div id='records-container' className='ui container'>
                            {this.props.dropdown_menu.map(item =>
                                <Segment raised>
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
                                                            <Records record={record} category={this.props.category} fields={this.props.fields} deleteRecord={this.deleteRecord}/>
                                                            )
                                                        :
                                                        <Records record={null} category={this.props.category} fields={this.props.fields} deleteRecord={this.deleteRecord}/>
                                                        }
                                                </tbody>
                                        </table>
                                </Segment>
                            )}
                        </div>
                    </div>
                    <div className='eight wide column'>
                        <Segment raised>
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
                        </Segment>
                    </div>
                </Grid>
            </Segment>
        )
    }
}


let mapStateToProps = (state) => {
    let userData = state.session_reducer.userData
  
    return {
      userData: userData
    }
}


export default connect(mapStateToProps)(MealWorkout);