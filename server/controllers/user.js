/** @namespace application.app.controllers.user**/
const User = require("../models/user.model");
const Address = require("../models/address.model");
module.exports = function(app) {
    const schema = 'Users';
    
    const jwt  = require('jsonwebtoken');
    const bcrypt =  require('bcrypt');
    const salt = bcrypt.genSaltSync(10);
    const User = require('../models/user.model');
    const Address = require('../models/address.model');
    const db = app.database.connection.open(schema);
    const middleware = app.security.middleware

    return {
        create: async function(req, res) {
            const user = new User(req.body);
            let sql = `INSERT INTO ${schema}
                       (email, name, password) VALUES (?,?,?)`;
            user.password = bcrypt.hashSync(user.password, salt);
            db.query(sql, [user.email, user.name, user.password], async function (err, result) {
                if (err) res.status(409).json({message: err.sqlMessage})
                await res.status(202).send(true)
            });

        },
        update: async function(req) {
            const user = new User(req.body);
            let sql = `UPDATE ${schema}
                       SET ? WHERE email = ?`;
            db.query(sql, [user, req.session.user], async function (err) {
                if (err) res.status(409).json({message: err.sqlMessage})
                await res.status(202).send(true)
            });
        },
        list: async function(req, res) {
            db.query(`SELECT name, email, created_date, is_active FROM ${schema}`, req.session.user, async function (err, result) {
                if (err){
                    await res.status(409).json({message: err.sqlMessage})
                }else {
                    let response = result.map(r => {
                        return new new User(r)
                    });
                    await res.status(200).json(response)
                }
            });
        },
        get: async function(req, res) {
            db.query(`SELECT name, email, created_date, is_active FROM ${schema} WHERE email = ?`, req.session.user, async function (err, result) {
                if (err){
                    await res.status(409).json({message: err.sqlMessage})
                }else {
                    if (result.length){
                        await res.status(200).json(new User(result[0]))
                    } else {
                        await res.status(404).json({})
                    }
                }
            });
        },
        remove: async function(req, res) {
            db.query(`DELETE FROM ${schema} WHERE email = ?`, req.session.user, async function (err) {
                if (err){
                    await res.status(409).json({message: err.sqlMessage})
                }else {
                    await res.status(202).send(true)
                }
            });
        },
        login: async function(req, res) {
            const user = new User(req.body);
            let sql = `SELECT *
                       FROM ${schema}
                       WHERE email = ?;`;
            db.query(sql, user.email, async function(err, results) {
                if (err) throw err;
                if (results.length) {
                    let valid = bcrypt.compareSync(user.password, results[0].password);
                    if (valid) {
                        let authenticatedUser = new User(results[0])
                        let token = await middleware.generate_token(authenticatedUser)
                        return res.status(202).json({token: token})
                    } else {
                        return res.status(403).send("Não autorizado");
                    }
                } else {
                    return res.status(403).send("Não autorizado");
                }
            });
        }
    }
}