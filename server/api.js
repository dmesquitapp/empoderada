const express = require('express');
const consign = require("consign");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/' , express.static('public'));



app.set('trust proxy', 1) // trust first proxy


consign({cwd: 'server'})
    .include('database')
    .then('security')
    .then('controllers')
    .then('routes')
    .into(app);


module.exports = app;
