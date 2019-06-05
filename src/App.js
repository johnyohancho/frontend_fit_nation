import React from 'react';
import './App.css';
import { Switch, Router } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import LoginForm from './components/Login/LoginForm'


class App extends React.Component {

  componentDidMount() {
    fetch('https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=red%20apple&app_id=a2fa636f&app_key=73b94865beb211abba81ba8d13b6a2a0%20')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <LoginForm path='/login' component={LoginForm}/>
        </Switch>
      </div>
    );
  }
}

export default App;
