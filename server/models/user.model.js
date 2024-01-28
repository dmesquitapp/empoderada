const BaseModel = require('./BaseModel')
const Address = require('./address.model.js')
class User extends BaseModel
{
    email;
    password;
    is_active;
    name;
    address;

    constructor(){
        super();
        this.is_active = true
        this.email = null
        this.password = null
        this.name = null
        this.address = new Address()
    }


}

module.exports = User