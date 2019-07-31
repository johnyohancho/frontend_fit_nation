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
        {/* <Sticky> */}
          <NavBar />
        {/* </Sticky> */}
        
        <Switch>

          <Route exact path='/login' render={() => (
            this.props.loggedIn ? (
              <Redirect to='/main' />
            ) : (
              <LoginForm />
            )
          )}/>

          <Route exact path='/workouts' render={() => (
            this.props.loggedIn ? (
              <Workouts />
            ) : (
              <Redirect to='/login' />
            )
          )}/>

          <Route exact path='/meals' render={() => (
            this.props.loggedIn ? (
              <Meals />
            ) : (
              <Redirect to='/login' />
            )
          )}/>
          <Route exact path='/' render={() => (
            this.props.loggedIn ? (
              <Redirect to='/main' />
            ) : (
              <Home />
            )
          )}/>

          <Route exact path='/login' component={LoginForm}/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/main' component={MainContainer}/>
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