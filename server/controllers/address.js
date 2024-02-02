/** @namespace application.app.controllers.address**/

const Address = require("../models/address.model");
module.exports = function(app) {
    const schema = 'Address';
    const db = app.database.connection.open(schema);
    return {
        create: async function(req, res) {
            let address = new Address().fromJSON(req.body)
            address.user = req.user
            db.query(`INSERT INTO ${schema} SET ?`, address, async function (err) {
                if (err) res.status(409).json({message: err.sqlMessage})
                await res.status(201).send(true)
            });
        },
        update: async function(req, res) {
            let address = new Address().fromJSON(req.body)
            db.query(`UPDATE ${schema} SET ? WHERE user = ? and id = ?`, [address, req.user, Number(req.params.id)], async function (err) {
                if (err) {
                    await res.status(409).json({message: err.sqlMessage})
                } else{
                    await res.status(202).send(true)
                }
            });
        },
        list: async function(req, res) {
            db.query(`SELECT * FROM ${schema} WHERE user = ? LIMIT 5;`, req.user, async function (err, result) {
                if (err) await res.status(409).json({message: err.sqlMessage})

                let response = result.map(r => {
                    return new Address().fromJSON(r)
                })
                await res.status(202).json(response)
            });
        },
        get: async function(req, res) {
            db.query(`SELECT * FROM ${schema} WHERE id = ? and user = ? LIMIT 1`, [Number(req.params.id), req.user], async function (err, result) {
                if (err){
                    await res.status(409).json({message: err.sqlMessage})
                }else {
                    if (result.length) {
                        await res.status(202).json(new Address().fromJSON(result[0]))
                    } else {
                        await res.status(404).json({})
                    }
                }
            });
        },
        remove: async function(req, res) {
            db.query(`DELETE FROM ${schema} WHERE id = ? and user = ?`, [Number(req.params.id), req.user], async function (err) {
                if (err){
                    await res.status(409).json({message: err.sqlMessage})
                }else {
                    await res.status(202).send(true)
                }
            });
        }
    }
}