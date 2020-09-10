import React from "react";
import { Redirect } from "react";
import axios from "axios";


export default class CreatePost extends React.Component {

    constructor() {
        super();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            title: "",
            content: ""
        }

    }

    handleInputChange(e) {
        var value = e.target.value;
        var name = e.target.name;

        this.setState(() => {
            return {
                [name] : value
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post("/posts/", {
            title: this.state.title,
            content: this.state.content
        }).then((res) => {
            window.location="/";
        })
    }


    render() {

        return (
            <div className="create-post-container">
                <form className="create-post-form" onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="title"
                        className="create-post-title"
                        onChange={this.handleInputChange}
                        name="title"
                    ></input>
                    <textarea
                        placeholder="content"
                        className="create-post-content"
                        onChange={this.handleInputChange}
                        name="content"
                    ></textarea>
                    <button className="submit-post-button btn btn-md btn-primary" type="submit">Submit Post</button>
                </form>
            </div>
        );

    }


}