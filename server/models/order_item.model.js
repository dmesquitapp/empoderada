const BaseModel = require('./BaseModel')
class OrderItem
{
    item_id;
    order_id;
    product_name;
    quantity;
    price;

    constructor(){
        super();
        this.item_id = null
        this.order_id = null
        this.product_name = null
        this.quantity = 0
        this.price = 0.0
    }
    


}

module.exports = OrderItem