const express = require('express');
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const host = process.env.HOST;

const defaultRoutes = require('./routes');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const notFoundRoutes = require('./routes/404');

// Routes:
app.use(defaultRoutes);
app.use(postsRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(notFoundRoutes);

// Error handling:
app.use(function (err, req, res, next) {
  res.send(500, 'Oops, something went wrong!');
});

// Start app:
app.listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`);
});
