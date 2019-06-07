import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import MainContainer from './containers/Main/MainContainer'
import LoginForm from './components/Login/LoginForm'


class App extends React.Component {

  componentDidMount() {
    fetch('https://wger.de/api/v2/exercise/?status=2')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path='/login' component={LoginForm}/>
          <Route path='/' component={MainContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
