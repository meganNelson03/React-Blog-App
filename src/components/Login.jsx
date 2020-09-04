import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


export default class Login extends React.Component {

    constructor() {
        super();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            redirectTo: null
        }
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
            console.log("logged it!");
            console.log(res.data);

            this.setState({
                redirectTo: "/"
            })
        })
    } 

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={ {pathname: "/"} }/>
        } else {
            return(
                <div className="login-form-container">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input name="username" type="text" onChange={this.handleInputChange} required></input>
                        <input name="password" type="password" onChange={this.handleInputChange} required></input>
                        <button className="btn btn-primary btn-md" type="submit">Login</button>
                    </form>
                    
                </div>
            );
        } 
    }


}