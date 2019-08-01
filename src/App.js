import React from 'react';
import './css/App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar'
import Home from './Home'
import LoginForm from './LoginForm'
import MainContainer from './MainContainer'
import Workouts from './Workouts';
import Meals from './Meals';
import { connect } from 'react-redux';
import { Sticky } from 'semantic-ui-react';
import { getUserData } from './ApiCalls';
import jwt_decode from 'jwt-decode';


class App extends React.Component {

  render() {
    return (
      <div className="App" id="app-background">
        <NavBar />
        
        <Switch>

          <Route exact path='/login' render={() => (
            this.props.loggedIn ? (
              <Redirect to='/dashboard' />
            ) : (
              <LoginForm />
            )
          )}/>

          <Route exact path='/workouts' component={Workouts}/>
          <Route exact path='/meals' component={Meals}/>
          <Route exact path='/login' component={LoginForm}/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/dashboard' component={MainContainer}/>
        </Switch>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  let loginStatus = state.session_reducer.loggedIn
  return {
      loggedIn: loginStatus
  }
}

export default connect(mapStateToProps)(App);