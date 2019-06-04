import React from 'react';
import logo from './logo.svg';
import './App.css';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
