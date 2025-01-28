const express = require('express');
const db = require('./dbConnection');
const app = express();
const port = 3000;

app.use(express.static('../public'));
app.use(express.json());


app.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    console.log(db);
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin' && password === 'admin') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }admin
});


app.listen(port, () => {
  console.log(`I Love You 3000`);
});