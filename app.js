// Nodejs + MySQL CRUD Application with Bild-in Modules
'use strict';
const http = require('http');
const fs = require('fs');
const index = fs.readFileSync('index.html');
const add = fs.readFileSync('add.html');
const edit = fs.readFileSync('edit.html');
const mysql = require('mysql');
const server = http.createServer();

const setting = {
    host: 'localhost',
    user: 'root',
    password: 'xxxx',
    database: 'list_app'
};

// work in progress..

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

app.get('/edit', (req, res) => {
    const id = req.query.id;
    const connection = mysql.createConnection(setting);
    connection.connect((error) => {
        if (error) {
            console.log('error connecting: ' + error.stack);
            return;
        }
    });
    connection.query('select * from users where id=?', id,
     (error, results) => {
        const data = {
            id: id,
            name: results[0].name
        }
        res.render('edit.ejs', data );
    });

    connection.end();
});

app.post('/edit', (req, res) => {
    const id = req.body.id;
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
        'update users set ? where id = ?', [post, id],
         (error, results) => {
        console.log(results);
        res.redirect('./');
    });
    
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