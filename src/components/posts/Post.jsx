import React from "react";
import axios from "axios";

import Comment from "../comments/Comment";
import CreateComment from "../comments/CreateComment";


export default class Post extends React.Component {

    constructor(props) {
        super(props);

        this.getComments = this.getComments.bind(this);

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        this.getComments();
    }


    getComments() {
        axios.get("/posts/" + this.props.id + "/comments").then(res => {
            this.setState({
                comments: res.data
            })
        })
    }


    render() {
        return (
            <div className="post-container">
                <h3 className="post-title">{this.props.title}</h3>
                <h6 className="post-date">{this.props.date}</h6>
                <p>{this.props.username}</p>
                <div className="post-content">
                    { this.props.content.length > 200 === true?  
                        this.props.content.substr(0, 200) : this.props.content }
                </div>
                {/* <div class="post-socials">
                    <button>Like</button>
                    <p class="post-likes">{this.props.likes}</p>   
                </div> */}
                <div className="post-create-comment">
                    <CreateComment postId={this.props.id}/>
                </div>
                <div className="post-comments">
                    {
                        typeof this.state.comments === "undefined" ? 
                        null : 
                        this.state.comments.map((comment, index) => {
    
                           return <Comment id={comment._id} key={comment._id} content={comment.content} />;
                        })
                    }
                </div>       
            </div>
        );
    }

}