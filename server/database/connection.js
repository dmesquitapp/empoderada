const mysql = require('mysql2')

/** @namespace application.app.database.connection**/
module.exports.open = function (ctrl){

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
            console.log(`Conexão com o banco de dados estabelecido.`);
        });
        return db;
    } catch (e) {
        console.error(e);
    }
}