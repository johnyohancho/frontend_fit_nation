import React from 'react';
import './Meals.css';
import CreateFoodForm from './CreateFoodForm/CreateFoodForm';
import { connect } from 'react-redux';


const Meals = (props) => {
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
                                <tr className="">
                                <td className="">John Lilki</td>
                                <td className="">September 14, 2013</td>
                                <td className="">jhlilk22@yahoo.com</td>
                                <td className="">No</td>
                                </tr>
                                <tr className="">
                                <td className="">Jamie Harington</td>
                                <td className="">January 11, 2014</td>
                                <td className="">jamieharingonton@yahoo.com</td>
                                <td className="">Yes</td>
                                </tr>
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
                                <td className="">Jamie Harington</td>
                                <td className="">January 11, 2014</td>
                                <td className="">jamieharingonton@yahoo.com</td>
                                <td className="">Yes</td>
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
                                <tr className="">
                                <td className="">Jamie Harington</td>
                                <td className="">January 11, 2014</td>
                                <td className="">jamieharingonton@yahoo.com</td>
                                <td className="">Yes</td>
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
                                <tr className="">
                                <td className="">Jamie Harington</td>
                                <td className="">January 11, 2014</td>
                                <td className="">jamieharingonton@yahoo.com</td>
                                <td className="">Yes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            <div className='eight wide column'>
                <div className='row'>
                    <div><button id='add-food-button' className='ui positive button'>Add Food</button></div>
                    <div><button id='create-food-button' className='ui blue button' onClick={() => props.dispatch({ type: 'CREATE_FOOD' })}>Create Food</button></div>
                </div>
                <div className='row'>
                    <div><h2 id='food-search-header' className='ui header'>Look Up Foods</h2></div>
                        <div className="item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..." /><i aria-hidden="true" className="search icon"></i>
                            </div>
                        </div>
                    { props.add_food_mode === 'create' ?
                    <CreateFoodForm />
                    :
                    null
                    }
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    let addFoodMode = state.meal_reducer.add_food_mode
    return {
        add_food_mode: addFoodMode
    }
}


export default connect(mapStateToProps)(Meals);