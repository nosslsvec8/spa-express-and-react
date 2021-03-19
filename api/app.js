const express = require('express');
const app = express();
const passport = require('passport');

require("dotenv").config();
const port = process.env.WEB_PORT;
const host = process.env.WEB_HOST;

const defaultRoutes = require('./routes');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const notFoundRoutes = require('./routes/404');

app.use(express.json());
app.use(passport.initialize());
require('./services/passport')(passport);

// dev modification
app.use(require('morgan')('dev'));

// Routes:
app.use(defaultRoutes);
app.use(authRoutes);
app.use(postsRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(notFoundRoutes);

// Error handling:
app.use(function (err, req, res, next) {
    console.log('err: ', err);
    res.send(500, 'Oops, something went wrong!');
});

// Start app:
app.listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`);
});
