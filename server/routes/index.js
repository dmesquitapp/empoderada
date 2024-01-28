module.exports = function (app) {

    const Product = require('../models/product.model')
    let prd = new Product().fromJSON({name: 'tiago', surname: 'matana'})
    prd.generate_sku();
    console.log(prd.toJSON())
    app.get('/', function index(req, res) {
        res.send("Hello World");
    });
}