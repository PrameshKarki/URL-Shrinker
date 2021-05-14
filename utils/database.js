//Import required modules
const mysql = require("mysql2");

const conn = mysql.createPool({
    host: "localhost",
    database: "url_shrinker",
    user: "pramesh",
    password: "password"
})

//Exports connection
module.exports = conn.promise();
