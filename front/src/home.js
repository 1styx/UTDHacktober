import React, { Component } from 'react';
import Navbar from './navbar';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar />
        );
    }
}