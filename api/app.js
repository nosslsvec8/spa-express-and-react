const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const host = process.env.HOST;
const fs = require('fs');
const path = '.env';

app.get('/', [
  function (req, res, next) {
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        console.log(`File ${path} not found`);
        console.error(err);
      }

      console.log('Settings file found');
      next();
    });
  },
  function (req, res) {
    res.send('Hello World!');
  }
]);

// error handler - unknown url
app.get('/*', (req, res) => {
  res.status(404);

  res.send({
    error: 'Not found',
    errorUrl: `${req.url}`
  });
});

app.listen(port, host, () => {
  console.log(`Server is listening at http://${host}:${port}`);
});
