const BaseModel = require('./BaseModel')
class Address extends BaseModel
{
    id;
    zipcode;
    address_number;
    complement;
    user;

    constructor(){
        super();
    }



}

module.exports = Address