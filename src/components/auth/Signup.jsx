import React from "react";
import axios from "axios";

export default class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            username: "",
            password: "",
            redirectTo: null
        }
    }

    handleInputChange(e) {

        console.log(this.state.username, this.state.password);
        const val = e.target.value;
        const name = e.target.name;
        this.setState(prevValue => {
            return {
                [name] : val
            }
        });
    }

    handleSignupSubmit(e) {
        e.preventDefault();

        axios.post("/users/signup", {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log("SUBMIT /LOGIN");
            console.log(res.data);
        })
    }

    render() {
        return(
            <div className="signup-form-container">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSignupSubmit}>
                    <input 
                        onChange={this.handleInputChange}
                        className="signup-username" 
                        type="text" 
                        name="username" 
                        value={this.state.username}
                        required></input>
                    <input 
                        onChange={this.handleInputChange}
                        className="signup-password" 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        required></input>
                    <button className="btn btn-primary btn-md" type="submit">Sign Up</button>
                </form>
            </div>
        );
    }

}