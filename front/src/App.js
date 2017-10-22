import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchResults from './search';
import Home from './home';
import About from './about';

class App extends Component {

    render() {
      return (
          <Router>
              <div>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/search/:query' component={SearchResults} />
                  <Route exact path='/about' component={About} />
              </div>
          </Router>
      );
    }

}

export default App;
