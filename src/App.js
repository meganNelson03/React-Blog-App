import React from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route} from "react-router-dom";
import $ from "jquery";
import Popper from "popper.js";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//...COMPONENTS....
import UserProvider from "./contexts/UserProvider";
import Navbar from "./components/misc/Navbar";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import CreatePost from "./components/posts/CreatePost.jsx";
import Home from "./components/misc/Home";

export default class App extends React.Component {

  constructor() {
    super();

  }  

  render() {
    return (
      <div className="App">
      <UserProvider>
          <Router> 
            <Navbar /> 
            <Route path="/" exact 
              render={() => {
              return <Home />;
            }} /> 
            <Route path="/login" exact render={() => {
              return <Login />
            }} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/create" exact component={CreatePost} />
          </Router>
        </UserProvider>
      </div>
    );
  }


}

