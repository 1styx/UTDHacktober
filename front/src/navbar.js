import React, { Component } from 'react';
import axios from 'axios';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {search: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

        console.log("Search value: " + this.state.search);
        console.log(JSON.stringify(this.state));

        axios.get('/amazonSearch', {
                params: {
                    search: this.state.search
                }
            })
            .then(function(response) {
                console.log('In send success');
                console.log(response);
            })
            .catch(function(error) {
                console.log('In send fail');
                console.log(error);
            });

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state.search);
    }

    render() {
        return(
            <div>
                <nav className="navbar navbar-toggleable-md  fixed-top navbar-inverse bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Navbar</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="text" name='search' placeholder="Search" onChange={this.handleChange} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <div style={{marginTop:80}} />
            </div>
        );
    }
}