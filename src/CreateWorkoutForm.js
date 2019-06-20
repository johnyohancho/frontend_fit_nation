import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';



class CreateFoodForm extends React.Component {
    
    

    constructor() {
        const now = new Date()
        super()
        this.state = {
            user_id: null,
            workout_id: 1,
            name: '',
            workout_type: '',
            description: '',
            date: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`,
            time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
            sets: null,
            reps: null,
            weight: null,
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


    handleCreateWorkout = (e) => {

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
                this.props.dispatch({type: "ADD_WORKOUT", data: data})
            };
        })

        e.target.reset()

        this.props.dispatch({type: "CLEAR_MODE"})

    }


    render() {
        return (
            <div id='create-food-segment' className='ui segment'>
                { this.displayErrors() }
                <form id='create-workout-form' className='ui form' onSubmit={this.handleCreateWorkout}>
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
                            options={this.props.types}
                            onChange={(e, data)=> this.setState({ workout_type: data.value })}
                        />
                    </div>


                    <div className='required field'>
                        <label>Weight</label>
                        <input className='ui focus input' type='number' name='weight' placeholder='lbs'
                            onChange={(e)=> this.setState({ weight: e.target.value })}></input>
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
    let workoutTypes = state.workout_reducer.workout_types
    return {
        types: workoutTypes
    }
}


export default connect(mapStateToProps)(CreateFoodForm);


