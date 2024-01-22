const app = require('./server/api');
const express = require("express");

app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/js', express.static( 'node_modules/jquery/dist'))
app.use('/js', express.static( 'node_modules/jquery-ajax'))
app.use('/assets', express.static( 'public/assets'))

const listEndpoints = require('express-list-endpoints');
console.debug(listEndpoints(app))

const PORT = process.env.PORT || 3000;

app.listen(PORT, async function() {
    console.log(`Aplicação em execução na porta ${PORT}!`);
});