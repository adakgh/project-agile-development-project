/**
 * Server application - contains all server config and api endpoints
 *
 * @author Pim Meijer
 */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./utils/databaseHelper");
const cryptoHelper = require("./utils/cryptoHelper");
const corsConfig = require("./utils/corsConfigHelper");
const app = express();

//logger lib  - 'short' is basic logging info
app.use(morgan("short"));

//init mysql connectionpool
const connectionPool = db.init();

//parsing request bodies from json to javascript objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS config - Cross Origin Requests
app.use(corsConfig);

// ------ ROUTES - add all api endpoints here ------
const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

app.post("/user/login", (req, res) => {
    const username = req.body.username;

    //TODO: We shouldn't save a password unencrypted!! Improve this by using cryptoHelper :)
    const password = req.body.password;

    db.handleQuery(connectionPool, {
        query: "SELECT username, password FROM user WHERE username = ? AND password = ?",
        values: [username, password]
    }, (data) => {
        if (data.length === 1) {
            //return just the username for now, never send password back!
            res.status(httpOkCode).json({"username": data[0].username});
        } else {
            //wrong username
            res.status(authorizationErrCode).json({reason: "Wrong username or password"});
        }

    }, (err) => res.status(badRequestCode).json({reason: err}));
});

//dummy data example - id
app.post("/user", (req, res) => {

    db.handleQuery(connectionPool, {
            query: "SELECT naam, username FROM user WHERE id = ?",
            values: [req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );

});

app.post("/post", (req, res) => {
    res.send({person_amount: req.body.person_amount, date: req.body.date });

    db.handleQuery(connectionPool, {
       query:"INSERT INTO post(person_amount, date) VALUE (?,?)",
        values: [req.body.person_amount, req.body.date]
    }, (data) => {
        res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

app.post("/user", (req, res) => {
    // res.send({username: req.body.username, password: req.body.password, req.body.email, req.body.naam, req.body.leeftijd, req.body.geslacht });

    db.handleQuery(connectionPool, {
        query: "INSERT INTO user(username, password, email, naam, leeftijd, geslacht) VALUES (?,?,?,?,?,?)",
        values: [req.body.username, req.body.password, req.body.email, req.body.naam, req.body.leeftijd, req.body.geslacht]
    }, (data) => {
        res.status(httpOkCode).json(data);
        }, (err) => {
            res.status(badRequestCode).json({reason: err})
        }
    );
});

app.post("/forum/create", (req, res) => {
    // res.send({username: req.body.username, title: req.body.title, forum_text: req.body.forum_text, tag: req.body.tag });
    db.handleQuery(connectionPool, {
            query: "INSERT INTO forum(username, title, forum_text, tag) VALUES (?,?,?,?)",
            values: [req.body.username, req.body.title, req.body.forum_text, req.body.tag]
        }, (data) => {
            res.status(httpOkCode).json(data);
        }, (err) => {
            res.status(badRequestCode).json({reason: err})
        }
    );
});

//forum artikelen
app.post("/forum", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM forum ",
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//------- END ROUTES -------

module.exports = app;

