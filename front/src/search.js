import React, { Component } from 'react';
import zip from './util';
import Navbar from './navbar';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        // props.searchQuery is the string passed to the backend call
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
        this.state = {zippedResults: [[{name: 'aliproduct1'}, {name: 'amaproduct1'}],
            [{name: 'aliproduct2'}, {name: 'amaproduct2'}],
            [{name: 'aliproduct3'}, {name: 'amaproduct3'}]]};

        this.createProductAnalysisCard = this.createProductAnalysisCard.bind(this);
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
                        <h4 className="card-title">{product.name}</h4>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            );
        }
    }

    createProductAnalysisCard(product) {
        if (product == null) {
            return (
                <div className="card">
                </div>
            );
        } else {
            return (
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">{product.name}</h4>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            );
        }
    }

    createProductRow(curVal, index, array) {
        return (
            <div className='row' key={index}>
                {this.createProductCard(curVal[0])}
                {this.createProductAnalysisCard(curVal[0])}
                {this.createProductAnalysisCard(curVal[1])}
                {this.createProductCard(curVal[1])}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='container'>
                    <div className='row'>
                        <div className="card">
                            <div className="card-block">
                                <h4 className="card-title">Product Info</h4>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="card-deck">
                        {this.state.zippedResults.map(this.createProductRow)}
                    </div>
                </div>
            </div>
        );
    }
}