import './App.css';
import React from 'react';
import AviaList from './components/aviaList/AviaList'

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
          <AviaList />
    </div>
    )
  }
}

export default App;
