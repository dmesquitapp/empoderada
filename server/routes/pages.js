const path = require("path");


module.exports = async function (app) {
    // const middleware = app.security.middleware
    // const user_ctrl = app.controllers.user;
    // const address_ctrl = app.controllers.address;
    // const product_ctrl = app.controllers.product;
    // const order_ctrl = app.controllers.order;
    const prefix = "/"
    const escapeHtml = require('escape-html')
    const path = require('path')


    app.get('/home/:page?', function (req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'index.html'));
    })

    app.get('/item', function (req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'item.html'));
    })

    app.get('/login', function (req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'login.html'));
    })

    app.get('/cadastro', function (req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'cadastro.html'));
    })

    app.get('/checkout', function (req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'checkout.html'));
    })
}
