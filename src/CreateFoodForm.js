import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';



class CreateFoodForm extends React.Component {
    
    

    constructor() {
        super()
        this.state = {
            user_id: null,
            name: '',
            date: '',
            time: '',
            meal_type: '',
            calories: '',
            weight: '',
            protein: '',
            carbs: '',
            fat: '',
            sugar: '',
            errors: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        
        this.setState({
            user_id: decoded.user_id
        })
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


    handleCreateFood = (e) => {

        e.preventDefault()

        const now = new Date()
        let currentDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        let currentTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;


        this.setState({
            date: currentDate,
            time: currentTime
        })

        fetch('http://localhost:3000/meals',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                this.props.dispatch({type: "ADD_MEAL", data: data})
            };
        })

        e.target.reset()

        this.props.dispatch({type: "CLEAR_MODE"})

    }


    render() {
        return (
            <div id='create-food-segment' className='ui segment'>
                <form id='create-food-form' className='ui form' onSubmit={this.handleCreateFood}>
                    <div className='required field'>
                        <label>Name</label>
                        <input className='ui focus input' type='text' name='name' placeholder='name'
                            onChange={(e)=> this.setState({ name: e.target.value })}></input>
                    </div>

                    <div className='required field'>
                        <label>Meal Type</label>
                        <Dropdown
                            placeholder='Choose a Meal Type'
                            fluid
                            selection
                            options={this.props.types}
                            onChange={(e, data)=> this.setState({ meal_type: data.value })}
                        />
                    </div>

                    <div className='required field'>
                        <label>Calories</label>
                        <input className='ui focus input' type='number' name='calories' placeholder='kcal'
                            onChange={(e)=> this.setState({ calories: e.target.value })}></input>
                    </div>

                    <div className='required field'>
                        <label>Weight</label> 
                        <input className='ui focus input' type='number' name='weight' placeholder='g'
                            onChange={(e)=> this.setState({ weight: e.target.value })}></input>
                    </div>

                    <div className='required field'>
                        <label>Protein</label>
                        <input className='ui focus input' type='number' name='protein' placeholder='g'
                            onChange={(e)=> this.setState({ protein: e.target.value })}></input>    
                    </div>

                    <div className='required field'>
                        <label>Carbs</label>
                        <input className='ui focus input' type='number' name='carbs' placeholder='g'
                            onChange={(e)=> this.setState({ carbs: e.target.value })}></input>
                    </div>

                    <div className='required field'>
                        <label>Fat</label>
                        <input className='ui focus input' type='number' name='fat' placeholder='g'
                            onChange={(e)=> this.setState({ fat: e.target.value })}></input>    
                    </div>

                    <div className='field'>
                        <label>Sugar</label>
                        <input className='ui focus input' type='number' name='sugar' placeholder='g'
                            onChange={(e)=> this.setState({ sugar: e.target.value })}></input>
                    </div>

                    <div><button id='add-food-button' type='submit' className='ui positive button'>Add Food</button></div>
                </form>
            </div>
        )
    }

}

let mapStateToProps = (state) => {
    let mealTypes = state.meal_reducer.meal_types
    return {
        types: mealTypes
    }
}


export default connect(mapStateToProps)(CreateFoodForm);


