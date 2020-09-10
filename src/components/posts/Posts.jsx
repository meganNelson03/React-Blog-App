import React from "react";
import Post from "./Post";
import axios from "axios";
import UserProvider from "../../contexts/UserProvider.jsx";

export default class Posts extends React.Component {
    static contextType = UserProvider.context;

    constructor(props) {
        super(props);  

        this.getPosts = this.getPosts.bind(this);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get("/posts").then(res => {
           this.setState({
               posts: res.data
           })
        }).catch(err => console.log(err));
    }

    render() {
         

        return (
            <div className="blog-container">
                {
                    this.state.posts.map((post, index) => {
                     return(
                        <Post 
                            key={post._id}
                            id={post._id}
                            title={post.title} 
                            content={post.content}
                            date={post.date}
                            comments={post.comments}
                        />
                     );
                    })
                }
            </div>
        );
    }

}