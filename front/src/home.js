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
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(search) {

        //console.log('Clicking!... Search: ' + search);
        this.state.redirectComponent = <Redirect from={'/'} to={'/search/' + encodeURIComponent(search)} />;
    }

    listElement(value, index, array) {
        var outerScope = this;
        return (
            this.state.docs.map(function(value, index, array){
                return <a key={index} className="button list-group-item list-group-item-action" href={'/search/' + encodeURIComponent(value.search)}>{value.search}</a>;
              })
        )

    }

    render() {

        return (
            <div>
                {this.state.redirectComponent}
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container'>
                    <div className="list-group w-25" style={{float:'right'}}>
                        <h3>Recent Items</h3>
                        {this.listElement()}
                    </div>
                    <img src={'https://image.ibb.co/ksvCvm/Mother_Ship.png'}/>
                    <h2>Welcome to The MotherShip</h2>
                </div>
            </div>
        );

    }
}