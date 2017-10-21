import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import './App.scss';

const navbarInstance = (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">DropShipping Comparator</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Link Right</NavItem>
        <NavItem eventKey={2} href="#">Link Right</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

class Home extends Component {

    constructor(props) {
      super(props);

      this.state = {users: [], search: ''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);

      fetch('/users')
          .then(res => res.json())
          .then(users => this.setState({ users }));
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
            console.log(response);
        })
        .catch(function(error) {
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
      return (
        <div className="App">
            {navbarInstance}
            <h1>Users</h1>
            {this.state.users.map(user =>
                <div key={user.id}>{user.username}</div>
            )}
            {this.state.search}

            <form>
                <div id='searchDiv' className={'inputField'}>
                    <input type='text' id='search' name='search' placeholder='Search for your item here...' onChange={this.handleChange}/>
                </div>

                <div id='submitDiv' className={'inputField'}>
                    <input id='submit' type='submit' value='Submit' onClick={this.handleSubmit}/>
                </div>
            </form>

        </div>
    );
    }
}

export default Home;