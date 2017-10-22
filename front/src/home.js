import React, { Component } from 'react';
import Navbar from './navbar';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container'>
                    Hello World
                </div>
            </div>
        );
    }
}