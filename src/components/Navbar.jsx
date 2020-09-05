import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
        redirectTo: null
    }
  }

  handleLogout(e) {
      e.preventDefault();

      axios.post("/users/logout").then((res) => {
          if (res.status === 200) {
              this.props.updateUser({
                  isLoggedIn: false,
                  currentUser: null
              })
          }
      }).catch(err => console.log(err));
  }

  render() {
    console.log("NAVBAR")
    console.log(this.props);

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Blog</Link>
        
        <div className="collpase navbar-collapse">
        {
            this.props.isLoggedIn === true? 
            
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link onClick={this.handleLogout} to="/">Logout</Link> 
                </li>
                <li className="navbar-item">
                    <Link onClick={this.handleLogout} to="/profile">{this.props.username}</Link> 
                </li>  
            </ul>
             :
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        }     
        </div>
      </nav>
    );
  }
}