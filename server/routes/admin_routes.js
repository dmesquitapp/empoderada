module.exports = function (app) {
    const middleware = app.security.middleware
    const user_ctrl = app.controllers.user;
    const address_ctrl = app.controllers.address;
    const product_ctrl = app.controllers.product;
    const order_ctrl = app.controllers.order;
    const prefix = "/admin/api";


    app.route(`${prefix}/products`)
        .post(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await product_ctrl.create(req, res)
        });

    app.route(`${prefix}/products/:id`)
        .put(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await product_ctrl.update(req, res)
        })
        .delete(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await product_ctrl.remove(req, res)
        });

    app.route(`${prefix}/orders/:id`)
        .put(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await order_ctrl.update(req, res)
        })
        .delete(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await order_ctrl.remove(req, res)
        });

    app.route(`${prefix}/orders/payment/:id`)
        .put(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await order_ctrl.payment(req, res)
        });

    app.route(`${prefix}/orders/shipment/:id`)
        .put(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await order_ctrl.shitment(req, res)
        });

    app.route(`${prefix}/orders/delivery/:id`)
        .put(middleware.isAuthenticated, middleware.isAdmin, async function(req, res){
            await order_ctrl.delivery(req, res)
        });

}