var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: String,
    date: Date,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;