const BaseModel = require('./BaseModel')
const Address = require('./address.model.js')
class User extends BaseModel
{
    email;
    password;
    is_active;
    name;
    level = "customer";

    constructor(){
        super();
    }


}

module.exports = User