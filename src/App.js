import React from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route} from "react-router-dom";

//...COMPONENTS....
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Signup from "./components/Signup";
import Login from "./components/Login";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }  

  render() {
    return (
      <div className="App">
        <Router>
          {/* <Navbar />  */}
          <Route path="/" exact component={Posts} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Router>
      </div>
    );
  }


}

