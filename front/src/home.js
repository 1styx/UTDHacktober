import React, { Component } from 'react';
import Navbar from './navbar';
import './App.scss';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {search: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

      console.log("Search value: " + this.state.search);

      axios.get('/amazonSearch', {
          params: {
              search: this.state.search
          }
      })
        .then(function(response) {
            console.log('In send success');
            console.log(response);
        })
        .catch(function(error) {
            console.log('In send fail');
            console.log(error);
        });
        console.log(this.state.search);
    }

    render() {
        return (
            <Navbar />
        );
    }
}