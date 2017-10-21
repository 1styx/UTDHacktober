import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchResults from './search';
import Home from './home';

class App extends Component {

    render() {
      return (
          <Router>
              <div>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/search' component={SearchResults} />
              </div>
          </Router>
      );
    }

}

export default App;
