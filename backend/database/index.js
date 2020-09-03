const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("DB Connection: Successful");
        }, err => {
            console.log("DB Connection Error: " + err);
        }
);

module.exports = mongoose.connection;