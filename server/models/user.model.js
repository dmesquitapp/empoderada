const BaseModel = require('./BaseModel')
const Address = require('./address.model.js')
class User extends BaseModel
{
    email;
    password;
    is_active;
    name;
    level = "customer";

    constructor(obj){
        super();
        Object.keys(obj).forEach(key => {
            if (Object.keys(this).indexOf(key) < 0) {
                delete obj[key]
            }
        })
        Object.assign(this, obj)
    }


}

module.exports = User