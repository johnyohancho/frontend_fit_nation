import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Segment, Form, Button, Header, Modal } from 'semantic-ui-react';

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
    
        fetch(`http://localhost:3000/users/${this.state.user_id}`, {
            method: "PATCH",
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
                this.props.dispatch({ type: "UPDATE_USER_SETTING", data: data })
            }; 
        })
    
        e.target.reset()
    }

    render() {
        return (
            <Segment>
                <Modal.Header><Header as='h2' textAlign='center'>Goal Setting</Header></Modal.Header>
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
                            <Modal.Actions>
                                <Button type='submit' onClick={null}>Submit</Button>
                            </Modal.Actions>
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