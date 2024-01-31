/** @namespace application.app.security.middleware**/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
    const secret = process.env.SECRET || "EMPOD3R@DA";
    const jwt  = require('jsonwebtoken');
    const bcrypt =  require('bcrypt');
    const salt = bcrypt.genSaltSync(10);


    return {
        isAuthenticated: async function (req, res, next) {
            try {
                const token = req.headers['authorization'];
                if (!token) await res.status(403).json({msg: "Não autorizado"});
                let user = await jwt.verify(token, secret);
                req.session.user = user._id
                req.session.level = user.level
                next()

            } catch (e) {
                await res.status(403).json({msg: "Não autorizado"})
            }
        },
        get_user: async function(req) {
            try {
                const token = req.headers['authorization'];
                const user = await jwt.verify(token, secret);
                return user;
            } catch (e) {
                return null;
            }
        },
        generate_token: async function(user){
            let _id = user.email;
            let level = user.level;
            return jwt.sign({_id,level}, secret, {
                expiresIn: 43200 // expires in 12 hours
            });
        }
    }
}