import React, { Component } from 'react';
import {zip} from './util';
import Navbar from './navbar';
import axios from 'axios';

function getEvalColor(evalStr) {
    var evalColor = 'light';
    if (evalStr === 'Poor') {
        evalColor = 'danger';
    } else if (evalStr === 'OK') {
        evalColor = 'warning';
    } else {
        evalColor = 'success';
    }
    return evalColor;
}

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        
        this.state = {};
        
        this.componentWillReceiveProps(this.props);

        this.createProductAnalysisCard = this.createProductAnalysisCard.bind(this);
        this.createProductInfoCard = this.createProductInfoCard.bind(this);
        this.createProductRow = this.createProductRow.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if (Object.keys(this.state).length > 0) {
            this.setState({});
        }
        axios.get('/amazonSearch', {
                params: {
                    search: nextProps.match.params.query
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
                        },
                        couldSearch: true
                });

                axios.post('/mongo', {
                    search: this.state.analysis.query,
                    profit: this.state.analysis.avgAliProfitMarginPercent
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
                this.setState(
                        {
                            couldSearch: false,
                            errorCode: error.response.status
                        }
                    );
            });
    }

    createProductInfoCard(product) {
        if (product == null) {
            return (
                <div className="card card-inverse rounded-0" style={{height : '100%', backgroundColor: '#444', borderColor: '#222'}}>
                </div>
            );
        } else {
            return (
                <div className="card card-inverse rounded-0" style={{height : '100%', backgroundColor: '#444', borderColor: '#222'}}>
                    <a style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} target='blank' href={product.link} />
                    <div className="card-block">
                        <img className="card-img-top img-thumbnail mx-auto d-block mb-3" src={product.pic} alt='No Image Available' />
                        <p className="card-title">{product.name}</p>
                        <h1 className="card-text">{'$' + product.price}</h1>
                    </div>
                </div>
            );
        }
    }

    createProductAnalysisCard(product) {
        if (product == null) {
            return (
                <div className="card rounded-0" style={{height : '100%'}}>
                </div>
            );
        } else {
            var evalColor = 'list-group-item-' + getEvalColor(product.ourEval);
            var textColor = '';
            if (product.ourEval === 'Best') {
                textColor= 'text-warning';
            }
            return (
                <div className="card rounded-0" style={{height : '100%'}}>
                    <div className="card-block d-flex align-items-center">
                        <ul className="list-group">
                            <li className={"list-group-item flex-column align-items-center " + evalColor + ' ' + textColor}>{product.ourEval}</li>
                            <li className="list-group-item">{'Average Savings: $' + product.rawProfit}</li>
                            <li className="list-group-item">{'Percent Savings: ' + product.percentProfit + '%'}</li>
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
            if (this.state.couldSearch) {
                var evalColor = 'list-group-item-' + getEvalColor(this.state.analysis.ourEval);
                display = (
                        <div className='container'>
                            <div className="row no-gutters">
                                <div className='col-3'>
                                    <div className="card rounded-0 bg-primary text-white text-center" style={{height : '100%'}}>
                                        <div className="card-block">
                                            <h4>Alibaba Products</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="card rounded-0 bg-info text-white text-center" style={{height : '100%'}}>
                                        <div className="card-block">
                                            <h4>{'Product Analytics for "' + this.state.analysis.query + '"'}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className="card rounded-0 bg-primary text-white text-center" style={{height : '100%'}}>
                                        <div className="card-block">
                                            <h4>Amazon Products</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className='col-3'>
                                    <div className="card rounded-0" style={{height : '100%'}}>
                                        <div className="card-block d-flex align-items-center">
                                            <ul className="list-group">
                                                <li className="list-group-item">{'Average Savings: $' + this.state.analysis.avgAliProfitMarginRaw}</li>
                                                <li className="list-group-item">{'Percent Savings: ' + this.state.analysis.avgAliProfitMarginPercent + '%'}</li>
                                                <li className="list-group-item">{'Average Price: $' + this.state.aliAnalysis.mean}</li>
                                                <li className="list-group-item">{'Median Price: $' + this.state.aliAnalysis.median}</li>
                                                <li className="list-group-item">{'Min Price: $' + this.state.aliAnalysis.min}</li>
                                                <li className="list-group-item">{'Max Price: $' + this.state.aliAnalysis.max}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="card rounded-0 align-items-center" style={{height : '100%'}}>
                                        <div className="card-block d-flex align-items-center w-100 h-100">
                                            <ul className="list-group w-100 h-100">
                                                <li className={"list-group-item align-items-center justify-content-center h-100 " + evalColor} style={{fontSize: 60}}>{this.state.analysis.ourEval}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className="card rounded-0" style={{height : '100%'}}>
                                        <div className="card-block d-flex align-items-center">
                                            <ul className="list-group">
                                                <li className="list-group-item">{'Average Savings: $' + this.state.analysis.avgAmaProfitMarginRaw}</li>
                                                <li className="list-group-item">{'Percent Savings: ' + this.state.analysis.avgAmaProfitMarginPercent + '%'}</li>
                                                <li className="list-group-item">{'Average Price: $' + this.state.amazonAnalysis.mean}</li>
                                                <li className="list-group-item">{'Median Price: $' + this.state.amazonAnalysis.median}</li>
                                                <li className="list-group-item">{'Min Price: $' + this.state.amazonAnalysis.min}</li>
                                                <li className="list-group-item">{'Max Price: $' + this.state.amazonAnalysis.max}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.zippedResults.map(this.createProductRow)}
                        </div>
                );
            } else {
                var message = 'An Error Occurred. Please Try Again Later.';
                if (this.state.errorCode === 501) {
                    message = 'You Are Accessing The API Too Quickly. Please Try Again Later.';
                } else if (this.state.errorCode === 502) {
                    message = 'Not Enough Search Results. Please Try A Different Search.';
                }
                
                display = (
                        <div className='container'>
                            <div className="card text-center rounded-0">
                                <div className="card-block">
                                    <h4 className="card-title">{message}</h4>
                                </div>
                            </div>
                        </div>
                );
            }
        }
        return (
            <div>
                <Navbar pageName='Search' parentUrl={this.props.match.url} />
                {display}
            </div>
        );
    }
}