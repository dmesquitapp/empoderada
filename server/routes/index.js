

module.exports = async function (app) {
    const middleware = app.security.middleware
    const user_ctrl = app.controllers.user;
    const address_ctrl = app.controllers.address;
    const product_ctrl = app.controllers.product;
    const order_ctrl = app.controllers.order;
    const prefix = "/api"
    const escapeHtml = require('escape-html')


    // Users routes
    app.route(`${prefix}/users`)
        .post(async function(req, res) {
            await user_ctrl.create(req, res)
        })
        .put(middleware.isAuthenticated, async function(req, res){
            const response = await user_ctrl.update(req.body)
            res.status(response.status).json(response.message)
        })
        .get(middleware.isAuthenticated, async function(req, res) {
            const response = await user_ctrl.list()
            res.status(response.status).json(response.message)
        });
    app.route(`${prefix}/users/:email`)
        .delete(middleware.isAuthenticated, async function(req, res) {
            const response = await user_ctrl.remove(req.params.email)
            res.status(response.status).json(response.message)
        })
        .get(middleware.isAuthenticated, async function(req, res) {
            const response = await user_ctrl.get(req.params.email)
            res.status(response.status).json(response.message)
        });

    // Access route
    app.route(`${prefix}/login`)
        .post(async function(req, res){
            await user_ctrl.login(req, res);
        })
        .get(async function(req, res){
            let user = await middleware.get_user(req);
            return res.json({user})
        })

    // Addresses routes
    app.route(`${prefix}/address`)
        .post(middleware.isAuthenticated, async function(req, res){
            await address_ctrl.create(req, res)
        })
        .get(middleware.isAuthenticated, async function(req, res){
            await address_ctrl.list(req, res)
        });
    app.route(`${prefix}/address/:id`)
        .put(middleware.isAuthenticated, async function(req, res){
            await address_ctrl.update(req, res)
        })
        .delete(middleware.isAuthenticated,async function(req, res){
            await address_ctrl.remove(req, res)
         });


    // Products routes
    app.route(`${prefix}/products/:page?`)
        .get(async function(req, res){
            await product_ctrl.list(req, res)
        });

    app.get(`${prefix}/pages/products`,async function(req, res){
        await product_ctrl.get_pages(req, res)
    })

//     Orders routes
    app.route(`${prefix}/orders`)
        .post(middleware.isAuthenticated, async function(req, res){
            await order_ctrl.create(req, res);
        })
        .get(middleware.isAuthenticated, async function(req, res){
            await order_ctrl.list(req, res)
        })

}