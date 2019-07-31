import React from 'react';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';

import { Segment, Form, Button, Header, Image, Modal } from 'semantic-ui-react'

class EditUserForm extends React.Component {
    constructor() {
        super()
        const src = './johncho.jpg'
        this.state = {
            user_id: null,
            username: '',
            name: '',
            description: '',
            email: '',
            password: '',
            errors: [],
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

    handleEditSubmit = (e) => {
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
                this.props.dispatch({ type: "UPDATE_USER_DATA", data: data })
            }; 
        })
    
        e.target.reset()
    }


    render() {
        return (
            <Segment>
                <Header as='h2' textAlign='center'>Update Profile</Header>
                    <Modal.Content image>
                        <Image wrapped size='small' src='./john_cho.jpg' />
                    </Modal.Content>
                    <Form onSubmit={(e) => this.handleEditSubmit(e)}>
                        { this.displayErrors() }
                        <Form.Field required>
                            <label>Username</label>
                            <input type='text' placeholder='UserName' name='username'
                            onChange={(e) => this.setState({ username: e.target.value })}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Name</label>
                            <input type='text' placeholder='Name' name='name'
                            onChange={(e) => this.setState({ name: e.target.value })}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Email</label>
                            <input type='text' placeholder='Email' name='email'
                            onChange={(e) => this.setState({ email: e.target.value })}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input type='password' placeholder='Password' name='password'
                            onChange={(e) => this.setState({ password: e.target.value })}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>About Me</label>
                            <input type='test' placeholder='About Me' name='description'
                            onChange={(e) => this.setState({ description: e.target.value })}/>
                        </Form.Field>
                        <Modal.Actions>
                            <Button type='submit' onClick={() => this.props.close()}>Submit</Button>
                        </Modal.Actions>
                    </Form>
          </Segment>
        )
    }
}


export default connect()(EditUserForm);