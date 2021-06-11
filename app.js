const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('ejs', ejs.renderFile);

const setting = {
    host: 'localhost',
    user: 'root',
    password: 'xxxx',
    database: 'list_app'
};

app.get('/', (req, res) => {
    const connection = mysql.createConnection(setting);

    connection.connect((error) => {
        if (error) {
            console.log('error connecting: ' + error.stack);
            return;
        }
    });
    connection.query(
        'select * from users',
        (error, results) => {
            console.log(results);
            res.render('index.ejs', { content: results });
        }
    );

    connection.end();
});

app.get('/add', (req, res) => {
    res.render('add.ejs', { errorMessage: '' });
});

app.post('/add', (req, res) => {
    const name = req.body.name;
    const post = { 'name': name };
    const connection = mysql.createConnection(setting);

    connection.connect((error) => {
        if (error) {
            console.log('error connecting: ' + error.stack);
            return;
        }
    });
    connection.query(
        'insert into users set ?', post,
        (error, results) => {
            console.log(results);
            res.redirect('./');
        } 
    );

    connection.end();
});

app.post('/delete', (req, res) => {
    const id = req.body.id;
    const connection = mysql.createConnection(setting);

    connection.connect((error) => {
        if (error) {
            console.log('error connecting: ' + error.stack);
            return;
        }
    });
    connection.query(
        'delete from users where id=?', id,
         (error, results) => {
        console.log(results);
        res.redirect('./');
    });
    
    connection.end();
});

app.listen(3000, () => {
    console.log(`Server runnning at http://localhost:3000/`);
});