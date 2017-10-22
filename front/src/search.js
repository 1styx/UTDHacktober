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
                            avgAliProfitMarginRaw: response.data.prodAnal.ali.rawProfit,
                            avgAliProfitMarginPercent: response.data.prodAnal.ali.percentProfit,
                            avgAmaProfitMarginRaw: response.data.prodAnal.am.rawProfit,
                            avgAmaProfitMarginPercent: response.data.prodAnal.am.percentProfit,
                            minPrice: response.data.prodAnal.totalMin,
                            maxPrice: response.data.prodAnal.totalMax,
                            ourEval: response.data.prodAnal.ourEval
                        }
                });
            })
            .catch(function(error) {
                console.log('Failed search: ' + error);
            });
        
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
                        <img className="card-img-top img-fluid" src={product.pic} alt={product.name} />
                        <h4 className="card-title">{product.name}</h4>
                        <p className="card-text">{'$' + product.price}</p>
                        <a href={product.link}>Go to Product Page</a>
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
                            <li>{'Profit $: ' + product.rawProfit}</li>
                            <li>{'Profit %: ' + product.percentProfit}</li>
                            <li>{'Evaluation: ' + product.ourEval}</li>
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
        if (Object.keys(this.state).length > 0) {
            display = (
                    <div className='container'>
                        <div className="card">
                            <div className="card-block">
                            <h4 className="card-title">{'Product Analytics for "' + this.state.analysis.query + '"'}</h4>
                            <ul className="card-text">
                                <li>{'Alibaba - Average Profit Margin $: ' + this.state.analysis.avgAliProfitMarginRaw}</li>
                                <li>{'Alibaba - Average Profit Margin %: ' + this.state.analysis.avgAliProfitMarginPercent}</li>
                                <li>{'Amazon - Average Profit Margin $: ' + this.state.analysis.avgAmaProfitMarginRaw}</li>
                                <li>{'Amazon - Average Profit Margin %: ' + this.state.analysis.avgAmaProfitMarginPercent}</li>
                                <li>{'Min Price: ' + this.state.analysis.minPrice}</li>
                                <li>{'Max Price: ' + this.state.analysis.maxPrice}</li>
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