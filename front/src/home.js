import React, { Component } from 'react';
import Navbar from './navbar';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar pageName='Home' parentUrl={this.props.match.url} />
                <div className='container'>
                    <h4>
                        header
                    </h4>
                    <ul>
                        <li>
                            bullet 1
                        </li>
                        <li>
                            bullet 2
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}