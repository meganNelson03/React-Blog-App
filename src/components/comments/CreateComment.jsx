import React from "react";
import axios from "axios";

export default class CreateComment extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            content: ""
        }
    }


    handleChange(e) {
        var value = e.target.value;
        var name = e.target.name;

        this.setState({
            [name] : value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post("/posts/" + this.props.postId + "/comments", {
            content: this.state.content
        }).then(res => {
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="create-comment-containter">
                <form onSubmit={this.onSubmit}>
                    <input placeholder="..." onChange={this.handleChange} name="content"></input>
                    <button className="btn btn-md btn-primary" type="submit">Submit</button>
                </form>
            </div>
        );
    }

}