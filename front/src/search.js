import React, { Component } from 'react';
import {zip} from './util';
import Navbar from './navbar';
import axios from 'axios';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        
        this.state = {};
        axios.get('/amazonSearch', {
                params: {
                    search: this.props.match.params.query
                }
            })
            .then(response => {
                console.log(response);
                this.setState({
                        aliResults: response.data.aliReport.aliInfo,
                        aliAnalysis: response.data.aliReport.aliStats,
                        amazonResults: response.data.amReport.amInfo,
                        amazonAnalysis: response.data.amReport.amStats,
                        zippedResults: zip(response.data.aliReport.aliInfo, response.data.amReport.amInfo),
                        analysis: 
                        {
                            query: response.data.prodAnal.searchTerm,
                            avgProfitMarginRaw: 0.0,
                            avgProfitMarginPercent: 0.0,
                            maxProfitMarginRaw: 0.0,
                            maxProfitMarginPercent: 0.0,
                            minPrice: response.data.prodAnal.totalMin,
                            maxPrice: response.data.prodAnal.totalMin,
                            ourEval: 'ok'
                        }
                });
            })
            .catch(function(error) {
                console.log('Failed search: ' + error);
            });
        /*
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
        */
        
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
                        <img className="card-img-top img-fluid" src={product.productInfo.pic} alt={product.productInfo.name} />
                        <h4 className="card-title">{product.productInfo.name}</h4>
                        <p className="card-text">{'$' + product.productInfo.price}</p>
                        <a href={product.productInfo.link}>Go to Product Page</a>
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
        var display = null;
        if (typeof Object.keys(this.state).length > 0) {
            display = (
                    <div className='container'>
                        <div className="card">
                            <div className="card-block">
                            <h4 className="card-title">{'Product Analytics for "' + this.props.match.params.query + '"'}</h4>
                            <ul className="card-text">
                                <li>{'Average Profit Margin $: ' + this.state.analysis.avgProfitMarginRaw}</li>
                                <li>{'Average Profit Margin %: ' + this.state.analysis.avgProfitMarginPercent}</li>
                                <li>{'Max Profit Margin $: ' + this.state.analysis.maxProfitMarginRaw}</li>
                                <li>{'Max Profit Margin %: ' + this.state.analysis.maxProfitMarginPercent}</li>
                                <li>
                                    Alibaba Analytics
                                    <ul>
                                        <li>{'Average Price: ' + this.state.aliAnalysis.mean}</li>
                                        <li>{'Median Price: ' + this.state.aliAnalysis.median}</li>
                                        <li>{'Min Price: ' + this.state.aliAnalysis.min}</li>
                                        <li>{'Max Price: ' + this.state.aliAnalysis.max}</li>
                                    </ul>
                                </li>
                                <li>
                                    Amazon Analytics
                                    <ul>
                                        <li>{'Average Price: ' + this.state.amazonAnalysis.mean}</li>
                                        <li>{'Median Price: ' + this.state.amazonAnalysis.median}</li>
                                        <li>{'Min Price: ' + this.state.amazonAnalysis.min}</li>
                                        <li>{'Max Price: ' + this.state.amazonAnalysis.max}</li>
                                    </ul>
                                </li>
                                <li>{'Overall Evaluation: ' + this.state.analysis.ourEval}</li>
                            </ul>
                        </div>
                    </div>
                    {this.state.zippedResults.map(this.createProductRow)}
                </div>
            );
        }
        return (
            <div>
                <Navbar name='Search' parentUrl={this.props.match.url} />
                {display}
            </div>
        );
    }
}