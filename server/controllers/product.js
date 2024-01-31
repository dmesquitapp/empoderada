/** @namespace application.app.controllers.product**/

module.exports = function(app) {
    const schema = 'Products';
    const db = app.database.connection.open(schema);

    return {
        create: async function() {},
        update: async function() {},
        list: async function() {},
        get: async function() {},
        remove: async function() {},
        login: async function() {}
    }
}