const BaseModel = require('./BaseModel')
class Address extends BaseModel
{
    id;
    zip_code;
    address_number;
    complement;

    constructor(){
        super();
        this.id = null
        this.zip_code = null
        this.address_number = null
        this.complement = null
    }


}

module.exports = Address