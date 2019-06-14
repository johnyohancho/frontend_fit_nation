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
            workout_type: '',
            date: '',
            time: '',
            sets: null,
            reps: null,
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


    handleCreateWork = (e) => {

        e.preventDefault()

        const now = new Date()
        let currentDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        let currentTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;


        this.setState({
            date: currentDate,
            time: currentTime
        })

        fetch('http://localhost:3000/user_workouts',{
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
                console.log(data)
            };
        })

        e.target.reset()

        this.props.dispatch({type: "CLEAR_MODE"})

    }


    render() {
        return (
            <div id='create-food-segment' className='ui segment'>
                <form id='create-food-form' className='ui form' onSubmit={this.handleCreateWorkout}>
                    <div className='required field'>
                        <label>Name</label>
                        <input className='ui focus input' type='text' name='name' placeholder='name'
                            onChange={(e)=> this.setState({ name: e.target.value })}></input>
                    </div>

                    <div className='required field'>
                        <label>Workout Type</label>
                        <Dropdown
                            placeholder='Choose a Workout Type'
                            fluid
                            selection
                            options={this.props.dropdown_menu}
                            onChange={(e, data)=> this.setState({ workout_type: data.value })}
                        />
                    </div>

                    <div className='required field'>
                        <label>Sets</label>
                        <input className='ui focus input' type='number' name='sets' placeholder='qty'
                            onChange={(e)=> this.setState({ sets: e.target.value })}></input>
                    </div>

                    <div className='required field'>
                        <label>Reps</label> 
                        <input className='ui focus input' type='number' name='reps' placeholder='qty'
                            onChange={(e)=> this.setState({ reps: e.target.value })}></input>
                    </div>

                    <div><button id='add-workout-button' type='submit' className='ui positive button'>Add Workout</button></div>
                </form>
            </div>
        )
    }

}

let mapStateToProps = (state) => {
    let addFoodMode = state.meal_reducer.add_food_mode
    return {
        add_food_mode: addFoodMode
    }
}


export default connect(mapStateToProps)(CreateFoodForm);


