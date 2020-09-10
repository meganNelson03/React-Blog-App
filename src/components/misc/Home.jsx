import React from "react";
import Posts from "../posts/Posts.jsx";
import Side from "./Side";
import UserProvider from "../../contexts/UserProvider.jsx";

export default class Home extends React.Component {
    static contextType = UserProvider.context;

    constructor(props) {
        super(props);
    }

    render() {
        const user = this.context;
        return (
            <div className="home-container">
                <div className="row">
                    <div className="col-8">
                        <Posts />
                    </div>
                    <div className="col-4">
                        <Side />
                    </div>
                </div>
            </div>
        );
    }

}