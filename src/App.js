import React from 'react';
import './App.css';
import SortingPage from './SortingPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={SortingPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
