const BaseModel = require('./BaseModel.js')
const User = require('./user.model.js')
const OrderItem = require('./order_item.model.js')
class Order extends BaseModel
{
    id;
    user;
    order_date;
    status;
    shipment_date;
    delivery_date;
    payment_method;
    address;

    constructor(obj){
        super();
        Object.keys(obj).forEach(key => {
            if (Object.keys(this).indexOf(key) < 0) {
                delete obj[key]
            }
        })
        Object.assign(this, obj)
        this.order_date = this.order_date || new Date()
        this.status = this.status || 'Pendente'
        this.payment_method = this.payment_method || 'Dinheiro';

    }

    shitment() {
        this.shipment_date = new Date();
        this.status = 'Enviado';
    }

    delivery() {
        this.delivery_date = new Date();
        this.status = 'Entregue';
    }

    payment() {
        this.status = "Pago";
    }


}

module.exports = Order