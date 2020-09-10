import React from "react";


export default class Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment-container">
                <div className="row">
                    <div className="col-6">
                        <h6 className="comment-username">Username</h6>
                    </div>
                    <div className="col-6">
                        <h6 className="comment-date">Date</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="comment-content">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}