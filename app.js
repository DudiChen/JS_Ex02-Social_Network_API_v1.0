const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users-route');
const adminRoutes = require('./routes/admin-route');
const postsRoutes = require('./routes/posts-route');
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json())
app.use(usersRoutes);
app.use(postsRoutes);
app.use(adminRoutes);


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

app.listen(5000);