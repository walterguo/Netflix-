import React, { Component } from 'react';
import './App.css';
import DoubleLists from './component/doubleLists'

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <MyList />
          <Recommendations /> */}
          <DoubleLists />
      </div>
    );
  }
}

export default App;
