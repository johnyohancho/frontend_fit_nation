import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Segment, Form, Button, Header, Modal } from 'semantic-ui-react';
import { getUserData, patchUserSetting } from './ApiCalls';
import { calcMacroData, calcCaloriesData } from './Calculations';

class UserSetting extends React.Component {
    constructor() {
        super()
        this.state = {
            user_id: null,
            set_calories: 0,
            set_protein: 0,
            set_carbs: 0,
            set_fat: 0,
            open: false,
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

    handleSettingSubmit = (e) => {
        e.preventDefault()
    
        patchUserSetting(this.state.user_id,this.state).then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                this.props.dispatch({ type: "UPDATE_USER_SETTING", data: data })
                getUserData(this.state.user_id).then((data) => {
                    this.props.dispatch({ type: "GET_USER_DATA", data: data })
                    this.props.dispatch({ type: "GET_MACRO_DATA", data: calcMacroData(data) })
                    this.props.dispatch({ type: "GET_CALORIES_DATA", data: calcCaloriesData(data) })
                    }
                )
                this.props.dispatch({ type: "USER_SETTING_MODAL" })
            }; 
        })
        e.target.reset()
    }

    render() {
        return (
            <Segment>
                <Header as='h2' textAlign='center'>User Settings</Header>
                    <Form onSubmit={(e) => this.handleSettingSubmit(e)}>
                            { this.displayErrors() }
                            <Form.Field required>
                                <label>Calories</label>
                                <input type='number' placeholder='Calories (kcal)' name='calories'
                                onChange={(e) => this.setState({ set_calories: e.target.value })}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Protein</label>
                                <input type='number' placeholder='Protein (g)' name='set_protein'
                                onChange={(e) => this.setState({ set_protein: e.target.value })}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Carbs</label>
                                <input type='number' placeholder='Carbs' name='set_carbs'
                                onChange={(e) => this.setState({ set_carbs: e.target.value })}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Fat</label>
                                <input type='number' placeholder='Fat (g)' name='set_fat'
                                onChange={(e) => this.setState({ set_fat: e.target.value })}/>
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
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

export default connect()(UserSetting);