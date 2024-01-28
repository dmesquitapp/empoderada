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
        this.id = null;
        this.sku = null;
        this.image_url = null;
        this.name = null;
        this.description = null;
        this.stock = null;
        this.price = null;
    }

    generate_sku(){
        this.sku = Math.random().toString(36).substr(2, 5) + "-" + Math.random().toString(36).substr(2, 5);
    }


}

module.exports = Product