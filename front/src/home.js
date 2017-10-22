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

        this.listElements = this.listElements.bind(this);
    }

    listElements() {
        return (
            this.state.docs.forEach(function(doc) {
                <button type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
            })
        );
    }

    render() {
        return (
            <div>
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container'>
                    <img src={'https://image.ibb.co/ksvCvm/Mother_Ship.png'}/>
                    <h2>Welcome to The MotherShip</h2>

                    <div class="list-group">
                        <button type="button" class="list-group-item list-group-item-action">
                            Cras justo odio
                        </button>
                        <button type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
                        <button type="button" class="list-group-item list-group-item-action">Morbi leo risus</button>
                        <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
                        <button type="button" class="list-group-item list-group-item-action">Vestibulum at eros</button>
                        {this.listElements}
                    </div>
                </div>
            </div>
        );
    }
}