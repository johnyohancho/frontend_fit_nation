import React from 'react';

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
            };
        });
        
        e.target.reset()
    }

    render() {
        return (
            <div className='ui segment'>
                <h2>New to Fitness Guru?</h2>
                <form id='signup-form' className="ui form" onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input className='ui focus input' type="text" name="username" placeholder="username"
                        onChange={(e)=> this.setState({ username: e.target.value})}></input>
                    <label>Password</label>
                    <input className='ui focus input' type="password" name="password" placeholder="password"
                        onChange={(e)=> this.setState({ password: e.target.value})}></input>
                    <label>Name</label>
                    <input className='ui focus input' type="text" name="name" placeholder="name"
                        onChange={(e)=> this.setState({ name: e.target.value})}></input>
                    <label>Email</label>
                    <input className='ui focus input' type="text" name="email" placeholder="email"
                        onChange={(e)=> this.setState({ email: e.target.value})}></input>
                    <button className='ui button' type="submit" value="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default SignUp;