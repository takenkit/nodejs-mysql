const express = require('express');
const mysql = require('mysql');

const app = express();

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

    console.log('success');
});

app.get('/', (req, res) => {
    connection.query(
        'select * from users',
        (error, results) => {
            console.log(results);
            res.send(results);
        }
    );
});

app.listen(3000, () => {
    console.log(`Server runnning at http://localhost:3000/`);
});