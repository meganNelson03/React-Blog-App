import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserProvider from "../../contexts/UserProvider.jsx";

export default class Login extends React.Component {
    static contextType = UserProvider.context;

    constructor() {
        super();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(e) {
        const val = e.target.value;
        const name = e.target.name;

        this.setState(prevValue => {
            return {
                [name] : val
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post("/users/login", {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            window.location = "/";
        }).catch(err => console.log("Error: " + err));

        
    } 



    render() {
        const { user } = this.context;

            return(
                <div>
                <p>{typeof user === "undefined"? null : user.username }</p>
                <div className="login-form-container">
                    <h2>Login</h2>
                    <p></p>
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input name="username" type="text" onChange={this.handleInputChange} required></input>
                        <input name="password" type="password" onChange={this.handleInputChange} required></input>
                        <button className="btn btn-primary btn-md" type="submit">Login</button>
                    </form>  
                </div>
                <a href="/auth/google">Login with Google</a>
                </div>
            );
    }


}