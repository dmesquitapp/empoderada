const BaseModel = require('./BaseModel')
const Address = require('./address.model.js')
class User extends BaseModel
{
    email;
    password;
    is_active;
    name;

    constructor(){
        super();
    }


}

module.exports = User