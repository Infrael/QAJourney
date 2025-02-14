const express = require('express');
const db = require('./dbConnection'); // Import database functions
const app = express();
const port = 3000;

app.use(express.static('../public'));
app.use(express.json());

// ✅ Register User Route
app.post('/register', async (req, res) => {
    const { email, password, profileId } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    db.registerUser(email, password, profileId, (err, result) => {
        if (err) return res.status(err.code).json({ success: false, error: err.error });
        res.json(result);
    });
});

// ✅ Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    db.loginUser(email, password, (err, result) => {
        if (err) return res.status(err.code).json({ success: false, error: err.error });
        res.json(result);
    });
});

// ✅ Get Database Table Data
app.post('/database', (req, res) => {
    const { tableName } = req.body;

    db.getTableData(tableName, (err, result) => {
        if (err) return res.status(err.code).json({ success: false, error: err.error });
        res.json(result);
    });
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`I Love You 3000`);
});
