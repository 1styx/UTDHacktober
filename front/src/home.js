import React, { Component } from 'react';
import Navbar from './navbar';
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props);

        axios.get('/mongo')
        .then(response => {
            console.log(response);

            this.setState({
                docs: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container'>
                    <img src={'https://image.ibb.co/ksvCvm/Mother_Ship.png'}/>
                    Hello World
                </div>
            </div>
        );
    }
}