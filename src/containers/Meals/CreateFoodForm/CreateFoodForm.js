import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react';

const mealTypes = [
    {
      key: 'Breakfast',
      text: 'Breakfast',
      value: 'Breakfast'
    },
    {
      key: 'Lunch',
      text: 'Lunch',
      value: 'lunch'
    },
    {
      key: 'Dinner',
      text: 'Dinner',
      value: 'Dinner'
    },
    {
      key: 'Snack',
      text: 'Snack',
      value: 'Snack'
    }
  ]

class CreateFoodForm extends React.Component {
    
    

    constructor() {
        super()
        this.state = {
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
        const now = new Date()
        let currentDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        let currentTime = `${now.getHour()}:${now.getMinutes()}:${now.getSeconds()}`;

        console.log(currentDate, currentTime)
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
            };
        })

        e.target.reset()
    }


    render() {
        return (
            <div id='create-food-segment' className='ui segment'>
                <form id='create-food-form' className='ui form'>
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
                            options={mealTypes}
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

                    <div><button id='add-food-button' type='submit' className='ui positive button' onSubmit={this.handleCreateFood}>Add Food</button></div>
                </form>
            </div>
        )
    }

}



export default CreateFoodForm;


