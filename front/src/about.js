import React, { Component } from 'react';
import Navbar from './navbar';

export default class Home extends Component {
    render() {
        return (
            <div className='col'>
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container' style={{maxWidth: 800}}>
                    <h2>
                        Welcome to MotherShip!
                    </h2>
                    <p className='text-muted'>
                    	Bringing you all the insider information you need to set up your own
                        online storefront, or just make informed decisions with your hard earned
                        dollars.
                    </p>
                    <h4>
                    	AliExpress
                    </h4>

                    <ul>
                    	<li className='text-muted'>
                            We source all of our information straight from the pages
                            of AliExpress.
	                    	While we were unable to access the API for AliExpress on such short notice,
	                    	we scrape the site manually to gather to-the-moment product data
	                    	for the products in question.
	                    </li>
                        {/*
	                    <li className='text-muted'>
	                    	* Explain how the algorithm works for
	                    	the AliExpress data *
	                    </li>
                        */}
                    </ul>
                    <h4>
                    	Amazon
                    </h4>
                    <ul>
                    	<li className='text-muted'>
	                    	We make use of the Amazon Product Advertiser API available through AWS
                            to gather product information from Amazon for every query.
	                    </li>

                    </ul>
                </div>
            </div>
        );
    }
}