import React from 'react';
// import _ from 'lodash';
// import './Meals.css';
import CreateFoodForm from './CreateFoodForm/CreateFoodForm';
import CreateWorkoutForm from './CreateWorkoutForm/CreateWorkoutForm';
import SearchResults from './SearchResults/SearchResults';
import Records from './Records/Records';


const MealWorkout = (props) => {
    return (
        <div id='mealworkout-page' className='ui grid'>
            <div className='eight wide column'>
                <div id='records-container' className='ui container'>
                    {props.dropdown_menu.map(item =>
                        <div className='ui segment'>
                            <h2 className='ui header'>{item.key}</h2>
                                <table className="ui striped table">
                                        <thead className="">
                                            <tr className="">
                                                {props.fields.map(field => 
                                                    <th className="">{field}</th>    
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {props.records.length > 0 ? 
                                                props.records[0].filter(record =>
                                                    record.meal_type === item.key || record.workout_type === item.key)
                                                    .map(record => 
                                                    <Records record={record} fields={props.fields}/>
                                                    )
                                                :
                                                <Records record={null} fields={props.fields}/>
                                                }
                                        </tbody>
                                </table>
                        </div>
                    )}
                </div>
            </div>
            <div className='eight wide column'>
                <div className='row'>
                    <div><button id='create-button' className='ui blue button' onClick={() => props.handleClick()}>{`Create ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`}</button></div>
                </div>
                <div className='row'>
                    <div className="ui action input">
                        <input type="text" placeholder="Search..." onChange={(e) => props.handleChange(e)}/>
                        <button className="ui button" onClick={(e) => props.handleSearch(e)}>
                            Search
                        </button>
                    </div>
                    {(() => {
                        switch (props.mode) {
                        case "create_meal":
                            return <CreateFoodForm dropdown_menu={props.dropdown_menu}/>;
                        case "search_meal":
                            return <SearchResults />;
                        case "create_workout":
                            return <CreateWorkoutForm dropdown_menu={props.dropdown_menu}/>;
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


export default MealWorkout;