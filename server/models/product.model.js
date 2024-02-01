const BaseModel = require('./BaseModel')
class Product extends BaseModel
{
    id;
    sku;
    image_url;
    name;
    description;
    stock;
    price;

    constructor(){
        super();
        Object.keys(obj).forEach(key => {
            if (Object.keys(this).indexOf(key) < 0) {
                delete obj[key]
            }
        })
        Object.assign(this, obj)
    }

    generate_sku(){
        this.sku = Math.random().toString(36).substr(2, 5) + "-" + Math.random().toString(36).substr(2, 5);
    }


}

module.exports = Product