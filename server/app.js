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
const fileUpload = require("express-fileupload");

//logger lib  - 'short' is basic logging info
app.use(morgan("short"));

//init mysql connectionpool
const connectionPool = db.init();

//parsing request bodies from json to javascript objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS config - Cross Origin Requests
app.use(corsConfig);

//File uploads
app.use(fileUpload());

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

//dummy data example - rooms
app.post("/room_example", (req, res) => {

    db.handleQuery(connectionPool, {
            query: "SELECT id, surface FROM room_example WHERE id = ?",
            values: [req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );

});

app.post("/upload", function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(badRequestCode).json({ reason: "No files were uploaded." });
    }

    let sampleFile = req.files.sampleFile;

    sampleFile.mv(wwwrootPath + "/uploads/test.jpg", function (err) {
        if (err) {
            return res.status(badRequestCode).json({ reason: err });
        }

        return res.status(httpOkCode).json("OK");
    });
});
//------- END ROUTES -------

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

//registreren
app.post("/user", (req, res) => {
    // res.send({username: req.body.username, password: req.body.password, req.body.email, req.body.naam, req.body.leeftijd, req.body.geslacht });

    db.handleQuery(connectionPool, {
            query: "INSERT INTO user(username, password, email, naam, leeftijd, geslacht, newsletter) VALUES (?,?,?,?,?,?,?)",
            values: [req.body.username, req.body.password, req.body.email, req.body.naam, req.body.leeftijd, req.body.geslacht, req.body.newsletter]
        }, (data) => {
            res.status(httpOkCode).json(data);
        }, (err) => {
            res.status(badRequestCode).json({reason: err})
        }
    );
});


//forum artikel aanmaken
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
app.post("/forum/getAll", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM forum",
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//agenda
app.post("/agenda", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT date, time, status, place FROM event WHERE username = ?",
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});


//bepaalde forum artikel bekijken
app.post("/forum/get", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM forum WHERE id = ?",
            values: [req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

app.post("/event", (req, res) => {
    // res.send({person_amount: req.body.person_amount, date: req.body.date });
    db.handleQuery(connectionPool, {
        query: "INSERT INTO event(name, person_amount, date, status, place, time) VALUES (?,?,?,?,?,?)",
        values: [req.body.name, req.body.person_amount, req.body.date, req.body.status, req.body.place, req.body.time]
    }, (data) => {
        res.status(httpOkCode).json(data);
    }, (err) => {
        res.status(badRequestCode).json({reason: err})
    }
    );
});


//gebruikers voor admin
app.post("/user/getAll", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM user",
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

function listen(port, callback) {
    const server = app.listen(port, callback);

    initializeSocketIO(server);
}

function initializeSocketIO(server) {
    const io = require("socket.io")
        .listen(server);

    var numUsers = 0;

    io.on('connection', (socket) => {
        var addedUser = false;

        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', () => {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', () => {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });
    });
}

// Chat
//
// const users = {}
//
// io.on('connection', socket => {
//     socket.on('new-user', name => {
//         users[socket.id] = name
//         socket.broadcast.emit('user-connected', name)
//     })
//     socket.on('send-chat-message', message => {
//         socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
//     })
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-disconnected', users[socket.id])
//         delete users[socket.id]
//     })
// })

//------- END ROUTES -------

module.exports = {
    listen: listen
};