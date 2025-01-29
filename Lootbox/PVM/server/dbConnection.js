require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database: ", err);
    } else {
        console.log("Connected to the database: ", process.env.DB_DATABASE);
    }
});

module.exports = db;
