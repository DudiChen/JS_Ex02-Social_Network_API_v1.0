const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users-route');
const HttpError = require("./models/http-error")

const app = express();

app.use(bodyParser.json())

app.use(usersRoutes);

app.use((req, res, next) => {
    return next(new HttpError('Could not find this route', 404));
})

app.use((error, req, res, next) => {
    if(res.headerSendt) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occourred!"});
})


//
// app.use(bodyParser.json({ extended: false }));

// app.post('/user/login', (req, res, next) => {
//     res.send('<h1>User: ' + req.body.username + '</h1>');
// })

// app.post('/user', (req, res, next) => {
//     res.send('<h1>User: ' + req.body.username + '</h1>');
// })

// app.get('/', (req, res, next) => {
//     res.send('<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></input></form>');
// });

app.listen(5000);