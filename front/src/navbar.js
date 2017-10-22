import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
                search: '',
                shouldRedirect: false,
                pages: [
                    {
                        name: 'Home',
                        link: '/'
                    }
                ]
            };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createNavLink = this.createNavLink.bind(this);
    }

    handleSubmit(event) {
        this.setState({shouldRedirect: true});

        console.log('Searching: ' + this.state.search);
        axios.get('/amazonSearch', {
            params: {
                search: this.state.search
            }
        })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log('Client search erroring out: ' + error);
            });

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createNavLink(curVal, index, array) {
        if (curVal.name == this.props.pageName) {
            return (<li key={index} className="nav-item active"><a className="nav-link" href={curVal.link}>{curVal.name}<span className="sr-only">(current)</span></a></li>);
        } else {
            return (<li key={index} className="nav-item"><a className="nav-link" href={curVal.link}>{curVal.name}</a></li>);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.shouldRedirect;
    }

    componentDidUpdate() {
        this.setState({shouldRedirect: false});
    }

    render() {
        var redirectionDiv = null;
        if (this.state.shouldRedirect) {
            redirectionDiv = <Redirect from={this.props.parentUrl} to={'/search/' + this.state.search} />;
        }
        return(
            <div>
                {redirectionDiv}
                <nav className="navbar navbar-toggleable-md  fixed-top navbar-inverse bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">MotherShip</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.state.pages.map(this.createNavLink)}
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