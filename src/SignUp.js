import React from 'react';
import { connect } from 'react-redux';
import { Icon, Message, Segment, Button, Header, Form, Label, Input } from 'semantic-ui-react';

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            errors: []
        }
    }

    displayErrors = () => {
        if (this.state.errors.length > 0) {
            return (
                <div className="signup-form-errors">
                    <p>Invalid!</p>
                    <ul>
                        {this.state.errors.map(err => <li>{err}</li>)}
                    </ul>
                </div>
            )
        } else {
            return null;
        };
    };

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({
                    errors: data.errors
                })
            } else {
                console.log(data)
                this.props.dispatch({ type: "USER_CREATED" })
            };
        });
        
        e.target.reset()
    }

    changeForm = () => {
        this.props.dispatch({ type: "CHANGE_LOGIN_SIGNUP"})
        console.log("changeForm clicked")
    }

    render() {
        return (
            <Segment className='transparent'>
                <Header as='h2'>New to Fitness Guru?</Header>
                <Form id='signup-form' className="ui form" onSubmit={this.handleSubmit}>
                    <Label>UserName</Label>
                    <input className='ui focus input' type="text" name="username" placeholder="username"
                        onChange={(e)=> this.setState({ username: e.target.value})}></input>
                    <Label>Password</Label>
                    <input className='ui focus input' type="password" name="password" placeholder="password"
                        onChange={(e)=> this.setState({ password: e.target.value})}></input>
                    <Label>Name</Label>
                    <input className='ui focus input' type="text" name="name" placeholder="name"
                        onChange={(e)=> this.setState({ name: e.target.value})}></input>
                    <Label>Email</Label>
                    <input className='ui focus input' type="text" name="email" placeholder="email"
                        onChange={(e)=> this.setState({ email: e.target.value})}></input>
                    <Button className='ui fluid button' type='submit' value='submit'>Register</Button>
                </Form>
                <Button className='ui button' type='submit' value='submit' onClick={() => this.changeForm()}>Register?</Button>
                { this.props.userCreated ?
                    <Message attached='bottom' positive>
                    <Icon name='success' />
                    Registration Successful!&nbsp;You may now login.
                    </Message>
                    :
                    null
                }
            </Segment>
        )
    }
}

let mapStateToProps = (state) => {
    let signUp = state.session_reducer.signUp
  
    return {
      signUp: signUp
    }
}

export default connect(mapStateToProps)(SignUp);