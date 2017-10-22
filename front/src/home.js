import React, { Component } from 'react';
import Navbar from './navbar';
import axios from 'axios';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            docs: []
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

        return (
            this.state.docs.map(function(doc){
                return <button type="button" className="list-group-item list-group-item-action">{doc.search}</button>;
              })
        )

    }

    render() {
        return (
            <div>
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container'>
                    <div className="list-group" style={{float:'right'}}>
                        <h3>Recent Items</h3>
                        {this.listElement()}
                    </div>
                    <img src={'https://image.ibb.co/ksvCvm/Mother_Ship.png'}/>
                    <h2 style={{clear:'left'}}>Welcome to The MotherShip</h2>
                </div>
            </div>
        );
    }
}