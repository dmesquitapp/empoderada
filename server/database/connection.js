const mysql = require('mysql2')

/** @namespace application.app.database.connection**/
module.exports.open = function (table){
    try {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'modafeminina',
            database: 'Empoderada',
            charset: 'utf8'
        });
        db.connect((err) => {
            if (err) throw err;
            console.log(`${table} conectado com o banco de dados.`);
        });
        return db;
    } catch (e) {
        console.error(e);
    }

}
