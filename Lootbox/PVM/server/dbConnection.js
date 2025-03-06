require("dotenv").config();
const mysql = require("mysql2");
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database: ", err);
    } else {
        console.log("Connected to the database: ", process.env.DB_NAME);
    }
});

// ✅ Register User (with password hashing)
db.registerUser = async (email, password, profileId, callback) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        profileId = profileId || 'A0';

        db.query("INSERT INTO users (email, password, profileId) VALUES (?, ?, ?)", 
            [email, hashedPassword, profileId], 
            (err, results) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return callback({ code: 409, error: "Email (or Password) is already in use." });
                    }
                    return callback({ code: 500, error: "Database error." });
                }
                callback(null, { success: true, message: "User Registered Successfully" });
            });
    } catch (error) {
        callback({ code: 500, error: "Hashing error." });
    }
};

// ✅ Login User
db.loginUser = (email, password, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return callback({ code: 500, error: "Database error." });

        if (results.length === 0) {
            return callback({ code: 401, error: "User not found." });
        }

        const user = results[0];

        if (user.email === "admin") {
            return callback({ code: 451, error: "Admin access restricted." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return callback({ code: 401, error: "This password belongs to another User." });
        }

        callback(null, { success: true, message: "Logged In", user: { email: user.email } });
    });
};

// ✅ Get Table Data
db.getTableData = (tableName, callback) => {
    if (tableName !== 'users') {
        return callback({ code: 400, error: "Invalid table request." });
    }

    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            if (err.code === "ER_NO_SUCH_TABLE") {
                return callback({ code: 500, error: "These are not the Droids you’re looking for." });
            }
            return callback({ code: 500, error: "Charisma is too low to perform this operation." });
        }
        callback(null, { success: true, data: results });
    });
};

module.exports = db;
