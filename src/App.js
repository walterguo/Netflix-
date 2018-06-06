import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recommendations from './container/recommendations';
import MyList from './container/mylist'

class App extends Component {
  render() {
    return (
      <div className="App">
          <MyList />
          <Recommendations />
      </div>
    );
  }
}

export default App;
