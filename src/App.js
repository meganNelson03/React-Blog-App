import React from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route} from "react-router-dom";
import $ from "jquery";
import Popper from "popper.js";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//...COMPONENTS....
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Signup from "./components/Signup";
import Login from "./components/Login";

export default class App extends React.Component {

  constructor() {
    super();

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      isLoggedIn: false,
      currentUser: null
    }
  }  

  componentDidMount() {
    this.getCurrentUser();
  }


  getCurrentUser() {

    axios.get("/users").then(res => {
      if (res.data.user) {
        this.setState({
          currentUser: res.data.user.username,
          isLoggedIn: true
        });
      }
    })
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  render() {

    return (
      <div className="App">
        <Router> 
          <Navbar updateUser={this.updateUser} username={this.state.currentUser} isLoggedIn={this.state.isLoggedIn}/> 
          <Route path="/" exact 
            render={() => {
              return <Posts currentUser={this.state.currentUser} />;
            }} />
          <Route path="/login" exact render={() => {
            return <Login updateUser={this.updateUser} />
          }} />
          <Route path="/signup" exact component={Signup} />
        </Router>
      </div>
    );
  }


}

