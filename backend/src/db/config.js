const mongoose = require("mongoose");

const { DB_URI } = process.env;
console.log(DB_URI);

const connect = () => {
  mongoose
    .connect(DB_URI, {})
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
};

module.exports = connect;