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

//registreren
app.post("/user/register", (req, res) => {
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

//forum artikel aangeven
app.post("/report/reportForum", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "INSERT INTO report(forum_id) VALUES (?)",
            values: [req.body.forum_id]
        }, (data) => {
            res.status(httpOkCode).json(data);
        }, (err) => {
            res.status(badRequestCode).json({reason: err})
        }
    );
});

//forum reacties
app.post("/reply/getAll", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM reply WHERE forum_id = ?",
            values: [req.body.forum_id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//forum reactie plaatsen
app.post("/reply/create", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "INSERT INTO reply(username, reply_text, forum_id) VALUES (?,?,?)",
            values: [req.body.username, req.body.reply_text, req.body.forum_id]
        }, (data) => {
            res.status(httpOkCode).json(data);
        }, (err) => {
            res.status(badRequestCode).json({reason: err})
        }
    );
});

//agenda ophalen
app.post("/participate/getAgenda", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM participant INNER JOIN event ON participant.event_id = event.id WHERE user_id = ? ORDER BY DATE ASC",
            values: [req.body.id]
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

//forum verwijderen voor admin
app.post("/forum/delete", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "DELETE FROM forum WHERE id = ?",
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
            query: "INSERT INTO event(name, person_amount, date, status, place, begin_time, end_time) VALUES (?,?,?,?,?,?,?)",
            values: [req.body.name, req.body.person_amount, req.body.date, req.body.status, req.body.place,
                req.body.begin_time, req.body.end_time]
        }, (data) => {
            res.status(httpOkCode).json(data);
        }, (err) => {
            res.status(badRequestCode).json({reason: err})
        }
    );
});

//gebruiker ophalen bij username
app.post("/user/get", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT id, naam, email, leeftijd, geslacht, username, stad, telefoon_nummer FROM user WHERE username = ?",
            values: [req.body.username]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//aan activiteit deelnemen
app.post("/participant/participate", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "INSERT INTO participant SET event_id = ?, user_id = ? ",
            values: [req.body.event_id, req.body.user_id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
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

//gebruikers verwijderen voor admin
app.post("/user/delete", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "DELETE FROM user WHERE id = ?",
            values: [req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//reports voor admin
app.post("/report/getAll", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM report",
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//activiteiten
app.post("/event/getAll", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "SELECT * FROM event ORDER BY `date` ASC",
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//activiteit verwijderen voor admin
app.post("/event/delete", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "DELETE FROM event WHERE id = ?",
            values: [req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});

//profiel gegevens update
app.post("/user/update", (req, res) => {
    db.handleQuery(connectionPool, {
            query: "UPDATE user SET username = ?, naam = ?, email = ?, leeftijd = ?, geslacht = ?, stad = ?, telefoon_nummer = ? WHERE id = ?",
            values: [req.body.username, req.body.naam, req.body.email, req.body.leeftijd, req.body.geslacht, req.body.stad, req.body.telefoon_nummer, req.body.id]
        }, (data) => {
            //just give all data back as json
            res.status(httpOkCode).json(data);
        }, (err) => res.status(badRequestCode).json({reason: err})
    );
});


//profiel gegevens stad en telefoon nummer toevoegen

// app.post("/user", (req, res) => {
//     db.handleQuery(connectionPool, {
//             query: "INSERT INTO user(stad, telefoon_nummer) VALUES (?,?)",
//             values: [req.body.stad , req.body.telefoon_nummer]
//         }, (data) => {
//             //just give all data back as json
//             res.status(httpOkCode).json(data);
//         }, (err) => res.status(badRequestCode).json({reason: err})
//     );
// });

// app.post("/profiel/create", (req, res) => {
//     db.handleQuery(connectionPool, {
//             query: "INSERT INTO profiel(username, naam, email, stad, telefoon_nummer, leeftijd, geslacht) VALUES (?,?,?,?,?,?,?,?)",
//         values: [req.body.username, req.body.naam, req.body.email,
//             req.body.stad , req.body.telefoon_nummer, req.body.leeftijd, req.body.geslacht]
//         }, (data) => {
//             //just give all data back as json
//             res.status(httpOkCode).json(data);
//         }, (err) => res.status(badRequestCode).json({reason: err})
//     );
// });

//chat
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

    const users = {}

    io.on('connection', socket => {
        socket.on('new-user', name => {
            users[socket.id] = name
            socket.broadcast.emit('user-connected', name)
        });
        socket.on('send-chat-message', message => {
            socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
        });
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', users[socket.id]);
            delete users[socket.id]
        })
    })
}
//------- END ROUTES -------

module.exports = {
    listen: listen
};