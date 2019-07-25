import React from 'react';
import { connect } from 'react-redux';
import './css/LoginForm.css'
import SignUp from './SignUp';
import { Grid, Segment, Button, Header, Form, Label, Input, Image } from 'semantic-ui-react';

class LoginForm extends React.Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            errors: []
        }
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

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                localStorage.setItem("token", data.token)
                this.props.dispatch({ type: 'USER_LOGIN' })
                this.props.dispatch({ type: 'USER_CREATED_MSG' })
            }
        })
        e.target.reset()
    }

    changeForm = () => {
        this.props.dispatch({ type: "CHANGE_TO_SIGNUP"})
    }



    render() {
        return (
            <div className='loginform-background'>
                <Grid columns={3}>
                    <Grid.Row id="loginform-row">
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column width={8}>
                            { this.props.signUp ? 
                            <SignUp />
                            :
                            <Segment className='transparent'>
                                { this.displayErrors() }
                                <Header as='h2' >Login</Header>
                                <Form id='login-form' className="ui form" onSubmit={this.handleSubmit}>
                                    <Input className='ui focus fluid input' icon='user' type="text" name="username" placeholder="username"
                                        onChange={(e)=> this.setState({ username: e.target.value})}>
                                    </Input>
                                    <Input className='ui focus fluid input' icon='lock' type="password" name="password" placeholder="password"
                                        onChange={(e)=> this.setState({ password: e.target.value})}>
                                    </Input>
                                    <Button secondary className='ui fluid button' type='submit' value='submit'>Login</Button>
                                </Form>
                                <Button className='ui button' type='submit' value='submit' onClick={() => this.changeForm()}>Register?</Button>
                            </Segment>
                            }
                        </Grid.Column>
                        <Grid.Column width={4}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}

let mapStateToProps = (state) => {
    let signUp = state.session_reducer.signUp
  
    return {
      signUp: signUp
    }
}


export default connect(mapStateToProps)(LoginForm);