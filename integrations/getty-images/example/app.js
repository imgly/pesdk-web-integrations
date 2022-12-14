/* eslint-disable */
const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const port = 9191;

const options = {
  method: 'POST',
  url: 'https://api.gettyimages.com/oauth2/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  form: {
    grant_type: 'client_credentials',
    client_id: process.env.VITE_APP_API_KEY,
    client_secret: process.env.CLIENT_SECRET,
  },
};

app.get('/token', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  request(options, function (error, response) {
    if (error) {
      res.json(error);
    } else {
      res.json(JSON.parse(response.body));
    }
  });
});

app.listen(port, () => {
  console.log(`Application started on http://localhost:${port}`);
});
