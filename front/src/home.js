import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Navbar from './navbar';
import axios from 'axios';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            docs: [],
            shouldRedirect: false,
            redirectComponent: null
        }

        axios.get('/mongo', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => {
            console.log(response);

            this.setState({
                docs: response.data
            });

            console.log('State: ' + JSON.stringify(this.state, null, 2));
        })
        .catch(function(error) {
            console.log(error);
        });

        this.listElement = this.listElement.bind(this);
    }

    listElement(value, index, array) {
        return (<a key={index} className="button list-group-item list-group-item-action" href={'/search/' + encodeURIComponent(value.search)}>{value.search}</a>);
    }

    render() {
        return (
            <div>
                {this.state.redirectComponent}
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container'>
                    <div className='row'>
                        <div className='col-7'>
                            <img className='mx-auto d-block' src={'https://image.ibb.co/ksvCvm/Mother_Ship.png'}/>
                            <h2 className='text-center pt-5'>Welcome to The MotherShip</h2>
                        </div>
                        <div className='col list-group'>
                            <h2>Recent Items</h2>
                            {this.state.docs.slice(0).reverse().map(this.listElement)}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}