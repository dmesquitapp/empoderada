/** @namespace application.app.controllers.order**/

const Order = require("../models/order.model");
const OrderItem = require("../models/order_item.model");
module.exports = function(app) {
    const schema = 'Orders';
    const db = app.database.connection.open(schema);
    const Order = require('../models/order.model');
    const OrderItem = require('../models/order_item.model');

    return {
        create: async function(req, res) {
            let order = new Order(req.body)
            order.user = req.user
            const items = req.body.order_items.map(i => new OrderItem(i))
            let data = {
                user: order.user,
                order_date: order.order_date,
                status: order.status,
                payment_method: order.payment_method,
                address: order.address,
            }
            db.query(`INSERT INTO ${schema} SET ?`, data, async function (err, result) {
                if (err) return res.status(409).json({message: err.sqlMessage})
                db.query("SELECT MAX(id) as id FROM Orders;", async function(err, result){let id = result[0].id
                    data = items.map(i => {
                        i.order_id = result[0].id
                        return i
                    })
                    db.query(`INSERT INTO OrderItems SET ?;`, data, async function (err, result){
                        if (err) return res.status(409).json({message: err.sqlMessage})
                        return res.status(201).json({message: `Order created with ${result.affectedRows} items`})
                    })
                })
            });
        },
        update: async function(req, res) {
            let order = new Order(req.body)
            order.user = req.user
            let {order_items} = req.body
            const items = order_items.map(i => new OrderItem(i))

            db.query(`UPDATE ${schema} SET ? WHERE id = ? and user = ?`, [order, Number(req.params.id), req.user], async function (err, result) {
                if (err) return res.status(409).json({message: err.sqlMessage})
                db.query("SELECT MAX(id) as id FROM Orders;", async function(err, result){let id = result[0].id
                    data = items.map(i => {
                        i.order_id = result[0].id
                        return i
                    })
                    db.query(`INSERT INTO OrderItems SET ?;`, data, async function (err, result){
                        if (err) return res.status(409).json({message: err.sqlMessage})
                        return res.status(201).json({message: `Order created with ${result.affectedRows} items`})
                    })
                })
            });
        },
        shipment: async function(req, res) {
            let order = new Order(req.body)
            order.shitment();
            let data = {
                shipment_date: order.shipment_date,
                status: order.status
            }
            db.query(`UPDATE ${schema} SET ? WHERE id = ? and user = ?`, [data, Number(req.params.id), req.user], async function (err, result) {
                if (err) return res.status(409).json({message: err.sqlMessage})
                return res.status(202).json({message: `Order shipment updated`})
            });
        },
        payment: async function(req, res) {
            let order = new Order(req.body)
            order.payment();
            db.query(`UPDATE ${schema} SET status = ? WHERE id = ? and user = ?`, [order.status, Number(req.params.id), req.user], async function (err, result) {
                if (err) return res.status(409).json({message: err.sqlMessage})
                return res.status(202).json({message: `Order shipment updated`})
            });
        },
        delivery: async function(req, res) {
            let order = new Order(req.body)
            order.delivery();
            let data = {
                delivery_date: order.delivery_date,
                status: order.status
            }
            db.query(`UPDATE ${schema} SET ? WHERE id = ? and user = ?`, [data, Number(req.params.id), req.user], async function (err, result) {
                if (err) return res.status(409).json({message: err.sqlMessage})
                return res.status(202).json({message: `Order delivery updated`})
            });
        },
        list: async function(req, res) {
            const user = req.level == "admin" ? "" : req.user;
            db.query(`SELECT * FROM ${schema} as p LEFT JOIN OrderItems ON p.id = order_id WHERE p.user LIKE '%${user}%';`, async function (err, result){
                if (err) return res.status(409).json({message: err.sqlMessage});
                let all_orders = []
                let all_items = []
                result.forEach(r => {
                    all_items.push(OrderItem.fromJSON(r))
                    all_orders.push(Order.fromJSON(r))
                })
                let jsonObject = all_orders.map(JSON.stringify);
                let uniqueSet = new Set(jsonObject);
                let orders = Array.from(uniqueSet).map(JSON.parse);
                let response = orders.map(function (o) {
                    o.order_items = all_items.filter(r => r.order_id == o.id);
                    return o;
                })
                return res.send(response)
            })
        },
        get: async function(req, res) {
            let sql = `SELECT * FROM ${schema} as p LEFT JOIN OrderItems ON p.id = order_id WHERE p.id = ? and email = ?`;
            db.query(sql, [Number(req.params.id), req.user], async function (err, result) {
                if (err) return res.status(409).json({message: err.sqlMessage})
            });
        },
        remove: async function(req, res) {
            db.query(`DELETE FROM ${schema} where id = ?`, Number(req.params.id), async function(err, result) {
                if (err) return res.status(409).json({message: err.sqlMessage})
                return res.status(202).send(true)
            })
        }
    }
}