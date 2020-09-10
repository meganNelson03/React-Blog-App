import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import UserProvider from "../../contexts/UserProvider.jsx";

export default class Navbar extends Component {
    static contextType = UserProvider.context; 


  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
        redirectTo: null
    }
  }

  componentDidMount() {
  }

  handleLogout(e) {
      e.preventDefault();

      axios.post("/users/logout").then((res) => {
      }).catch(err => console.log(err));

      window.location = "/";
  }

  render() {
      const user  = this.context;

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Blog</Link>
        
        <div className="collpase navbar-collapse">
        {
            !(user.isAuthenticated) ? 

            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
            :
            <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                    <Link onClick={this.handleLogout} to="/">Logout</Link> 
                </li>
                <li className="navbar-item">
                    <Link onClick={this.handleLogout} to="/profile">{user.username}</Link> 
                </li>  
            </ul>
                
        }     

        
        </div>
      </nav>
    );
  }
}