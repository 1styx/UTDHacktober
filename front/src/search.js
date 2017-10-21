import React, { Component } from 'react';
import axios from 'axios';
import zip from './util';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        // props.searchQuery is the string passed to the backend call
        this.state = {};
        /*
        axios.get('/aliProduct', {
                params: {
                    query: this.props.searchQuery
                }
            })
            .then(function(response) {
                console.log(response);
                this.state.aliResults = response['data'];
                if (typeof this.state.amazonResults !== 'undefined') {
                    this.state.zippedResults = zip(this.state.aliResults, this.state.amazonResults);
                }
            })
            .catch(function(error) {
                console.log(error);
            }
        );
        axios.get('/amazonProduct', {
                params: {
                    query: this.props.searchQuery
                }
            })
            .then(function(response) {
                console.log(response);
                this.state.amazonResults = response['data'];
                if (typeof this.state.aliResults !== 'undefined') {
                    this.state.zippedResults = zip(this.state.aliResults, this.state.amazonResults);
                }
            })
            .catch(function(error) {
                console.log(error);
            }
        );
        */
        this.state.zippedResults = [[{name: 'aliproduct1'}, {name: 'amaproduct1'}], 
            [{name: 'aliproduct2'}, {name: 'amaproduct2'}], 
            [{name: 'aliproduct3'}, {name: 'amaproduct3'}]];
        
        this.createProductCard = this.createProductCard.bind(this);
        this.createProductRow = this.createProductRow.bind(this);
    }
    
    createProductCard(product) {
        if (product == null) {
            return (
                <div className="card">
                </div>
            );
        } else {
            return (
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">product.name</h4>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            );
        }
    }

    createProductRow(curVal, index, array) {
        return (
            <div key={index}>
                {this.createProductCard(curVal[0])}
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Spacer</h4>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                {this.createProductCard(curVal[1])}
            </div>
        );
    }

    render() {
        return (
            <div className='container'>
                <div className="card-deck">
                    {this.state.zippedResults.map(this.createProductRow)}
                </div>
            </div>
        );
    }
}