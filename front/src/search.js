import React, { Component } from 'react';
import {zip} from './util';
import Navbar from './navbar';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        // props.searchQuery is the string passed to the backend call
        /*
        axios.get('/searchResults', {
                params: {
                    query: this.props.searchQuery
                }
            })
            .then(function(response) {
                console.log(response);
                this.state.aliResults = response['data']['alibabaResults'];
                this.state.amazonResults = response['data']['amazonResults'];
                this.state.zippedResults = zip(this.state.aliResults, this.state.amazonResults);
                this.state.analysis = response['data']['analysis'];
            })
            .catch(function(error) {
                console.log(error);
            }
        );
        */
        this.state = {zippedResults: [[{name: 'aliproduct1'}, {name: 'amaproduct1'}],
            [{name: 'aliproduct2'}, {name: 'amaproduct2'}],
            [{name: 'aliproduct3'}, {name: 'amaproduct3'}]],
            analysis: {
                query: 'test query',
                avgProfitMarginRaw: 23.342,
                avgProfitMarginPercent: 32.0,
                maxProfitMarginRaw: 23.342,
                maxProfitMarginPercent: 32.0,
                avgPriceAlibaba: 23.342,
                medPriceAlibaba: 23.342,
                minPriceAlibaba: 23.342,
                maxPriceAlibaba: 23.342,
                avgPriceAmazon: 32.0,
                medPriceAmazon: 32.0,
                minPriceAmazon: 32.0,
                maxPriceAmazon: 32.0,
                ourEval: 'Good'
            }};
        this.state.aliResults = [
            {
                productInfo: {
                    name: 'product 1',
                    price: 30,
                    url: 'https://google.com',
                    imgUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                },
                productAnalysis: {
                    isMin: false,
                    isMax: false,
                    profitMarginRaw: 23.345,
                    profitMarginPercent: 32.32,
                    ourEval: 'Good'
                }
            },
            {
                productInfo: {
                    name: 'product 2',
                    price: 60,
                    url: 'https://google.com',
                    imgUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                },
                productAnalysis: {
                    isMin: false,
                    isMax: false,
                    profitMarginRaw: 23.345,
                    profitMarginPercent: 32.32,
                    ourEval: 'Good'
                }
            },
            {
                productInfo: {
                    name: 'product 3',
                    price: 20,
                    url: 'https://google.com',
                    imgUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                },
                productAnalysis: {
                    isMin: false,
                    isMax: false,
                    profitMarginRaw: 23.345,
                    profitMarginPercent: 32.32,
                    ourEval: 'Good'
                }
            }];
        this.state.amazonResults = [
            {
                productInfo: {
                    name: 'product 4',
                    price: 30,
                    url: 'https://google.com',
                    imgUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                },
                productAnalysis: {
                    isMin: true,
                    isMax: false,
                    profitMarginRaw: 23.345,
                    profitMarginPercent: 32.32,
                    ourEval: 'Good'
                }
            },
            {
                productInfo: {
                    name: 'product 5',
                    price: 60,
                    url: 'https://google.com',
                    imgUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                },
                productAnalysis: {
                    isMin: false,
                    isMax: false,
                    profitMarginRaw: 23.345,
                    profitMarginPercent: 32.32,
                    ourEval: 'Good'
                }
            },
            {
                productInfo: {
                    name: 'product 6',
                    price: 20,
                    url: 'https://google.com',
                    imgUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                },
                productAnalysis: {
                    isMin: false,
                    isMax: false,
                    profitMarginRaw: 23.345,
                    profitMarginPercent: 32.32,
                    ourEval: 'Good'
                }
            }];
        this.state.zippedResults = zip(this.state.aliResults, this.state.amazonResults);

        this.createProductAnalysisCard = this.createProductAnalysisCard.bind(this);
        this.createProductInfoCard = this.createProductInfoCard.bind(this);
        this.createProductRow = this.createProductRow.bind(this);
    }

    createProductInfoCard(product) {
        if (product == null) {
            return (
                <div className="card" style={{height : '100%'}}>
                </div>
            );
        } else {
            return (
                <div className="card" style={{height : '100%'}}>
                    <div className="card-block">
                        <img className="card-img-top img-fluid" src={product.productInfo.imgUrl} alt={product.productInfo.name} />
                        <h4 className="card-title">{product.productInfo.name}</h4>
                        <a href={product.productInfo.url}>Go to Product Page</a>
                    </div>
                </div>
            );
        }
    }

    createProductAnalysisCard(product) {
        if (product == null) {
            return (
                <div className="card" style={{height : '100%'}}>
                </div>
            );
        } else {
            return (
                <div className="card" style={{height : '100%'}}>
                    <div className="card-block">
                        <ul>
                            <li>{'Max: ' + product.productAnalysis.isMax}</li>
                            <li>{'Min: ' + product.productAnalysis.isMin}</li>
                            <li>{'Profit Margin $: ' + product.productAnalysis.profitMarginRaw}</li>
                            <li>{'Profit Margin %: ' + product.productAnalysis.profitMarginPercent}</li>
                            <li>{'Product Evalution: ' + product.productAnalysis.ourEval}</li>
                        </ul>
                    </div>
                </div>
            );
        }
    }

    createProductRow(curVal, index, array) {
        return (
            <div className="row no-gutters" key={index}>
                <div className='col-3'>
                    {this.createProductInfoCard(curVal[0])}
                </div>
                <div className='col-3'>
                    {this.createProductAnalysisCard(curVal[0])}
                </div>
                <div className='col-3'>
                    {this.createProductAnalysisCard(curVal[1])}
                </div>
                <div className='col-3'>
                    {this.createProductInfoCard(curVal[1])}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='container'>
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">{'Product Analytics for "' + this.state.analysis.query + '"'}</h4>
                            <ul className="card-text">
                                <li>{'Average Profit Margin $: ' + this.state.analysis.avgProfitMarginRaw}</li>
                                <li>{'Average Profit Margin %: ' + this.state.analysis.avgProfitMarginPercent}</li>
                                <li>{'Max Profit Margin $: ' + this.state.analysis.maxProfitMarginRaw}</li>
                                <li>{'Max Profit Margin %: ' + this.state.analysis.maxProfitMarginPercent}</li>
                                <li>
                                    Alibaba Analytics
                                    <ul>
                                        <li>{'Average Price: ' + this.state.analysis.avgPriceAlibaba}</li>
                                        <li>{'Median Price: ' + this.state.analysis.medPriceAlibaba}</li>
                                        <li>{'Min Price: ' + this.state.analysis.minPriceAlibaba}</li>
                                        <li>{'Max Price: ' + this.state.analysis.maxPriceAlibaba}</li>
                                    </ul>
                                </li>
                                <li>
                                    Amazon Analytics
                                    <ul>
                                        <li>{'Average Price: ' + this.state.analysis.avgPriceAmazon}</li>
                                        <li>{'Median Price: ' + this.state.analysis.medPriceAmazon}</li>
                                        <li>{'Min Price: ' + this.state.analysis.minPriceAmazon}</li>
                                        <li>{'Max Price: ' + this.state.analysis.maxPriceAmazon}</li>
                                    </ul>
                                </li>
                                <li>{'Overall Evaluation: ' + this.state.analysis.ourEval}</li>
                            </ul>
                        </div>
                    </div>
                    {this.state.zippedResults.map(this.createProductRow)}
                </div>
            </div>
        );
    }
}