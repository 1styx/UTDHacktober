import React, { Component } from 'react';
import Navbar from './navbar';

export default class Home extends Component {
    render() {
        return (
            <div className='col'>
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container' style={{maxWidth: 800}}>
                    <h2>
                        Welcome to DropShipComparator!
                    </h2>
                    <p className='text-muted'>
                    	We search the popular online shopping sites Amazon
                    	and AliExpress to help you get the best prices for 
                    	everything you buy.
                    </p>
                    <h4>
                    	AliExpress
                    </h4>
                    
                    <ul>
                    	<li className='text-muted'>
	                    	We were unable to access the API for AliExpress,
	                    	so we scrape the site manually to gather price history
	                    	for the products in question.
	                    </li>
	                    <li className='text-muted'>
	                    	* Explain how the algorithm works for
	                    	the AliExpress data *
	                    </li>
                    </ul>
                    <h4>
                    	Amazon
                    </h4>
                    <ul>
                    	<li className='text-muted'>
	                    	We used the API available through AWS to gather price history
	                    	from Amazon for the products in question.
	                    </li>
	                    <li className='text-muted'>
	                    	* Explain how the algorithm works for 
	                    	the Amazon data *
	                    </li>
                    </ul>
                </div>
            </div>
        );
    }
}