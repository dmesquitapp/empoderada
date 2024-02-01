const BaseModel = require('./BaseModel')
class OrderItem extends BaseModel
{
    item_id;
    order_id;
    product_name;
    quantity;
    price;

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

module.exports = OrderItem