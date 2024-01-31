/** @namespace application.app.controllers.product**/

const Product = require("../models/product.model");
module.exports = function(app) {
    const schema = 'Products';
    const db = app.database.connection.open(schema);

    return {
        create: async function(req, res) {
            if (req.session.level !== "admin") return res.status(503).send("Operation not permitted")
            let product = new Product().fromJSON(req.body)
            db.query(`INSERT INTO ${schema} SET ?`, product, async function (err) {
                if (err) res.status(409).json({message: err.sqlMessage})
                await res.status(201).send(true)
            });
        },
        update: async function(req, res) {
            if (req.session.level !== "admin") return res.status(503).send("Operation not permitted")
            let product = new Product().fromJSON(req.body)
            db.query(`UPDATE ${schema} SET ? WHERE id = ?`, [product, Number(req.params.id)], async function (err) {
                if (err) {
                    await res.status(409).json({message: err.sqlMessage})
                } else{
                    await res.status(202).send(true)
                }
            });
        },
        list: async function(req, res) {
            let page_size = Number(req.params.size) || 10
            let offset = (req.params.page || 1 - 1) * page_size
            db.query(`SELECT * FROM ${schema} LIMIT ${page_size} OFFSET ${offset};`, async function (err, result) {
                if (err) await res.status(409).json({message: err.sqlMessage})

                let response = result.map(r => {
                    return new Product().fromJSON(r)
                })
                await res.status(202).json(response)
            });
        },
        get: async function(req, res) {
            db.query(`SELECT * FROM ${schema} WHERE id = ? LIMIT 1`, Number(req.params.id), async function (err, result) {
                if (err){
                    await res.status(409).json({message: err.sqlMessage})
                }else {
                    if (result.length) {
                        await res.status(202).json(new Product().fromJSON(result[0]))
                    } else {
                        await res.status(404).json({})
                    }
                }
            });
        },
        remove: async function(req, res) {
            if (req.session.level !== "admin") return res.status(503).send("Operation not permitted")
            db.query(`DELETE FROM ${schema} WHERE id = ?`, Number(req.params.id), async function (err) {
                if (err){
                    await res.status(409).json({message: err.sqlMessage})
                }else {
                    await res.status(202).send(true)
                }
            });
        }
    }
}