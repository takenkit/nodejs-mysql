const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');

const app = express();
app.set('ejs', ejs.renderFile);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xxxx',
    database: 'list_app'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
});

app.get('/', (req, res) => {
    connection.query(
        'select * from users',
        (error, results) => {
            console.log(results);
            res.render('index.ejs', { content: results })
        }
    );
});

app.listen(3000, () => {
    console.log(`Server runnning at http://localhost:3000/`);
});