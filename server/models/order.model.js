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
    order_items;

    constructor(){
        super();
        this.id = null
        this.user = new User();
        this.order_date = new Date()
        this.status = 'Pendente'
        this.shipment_date = null;
        this.delivery_date = null;
        this.payment_method = 'Dinheiro';
        this.order_items = [];
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

    add_item(item){
        let item = new OrderItem().fromJSON(item)
        this.order_items.push(item)
    }

    remove_item(item){
        let found = this.order_items.find(e => {return e  == item})
        if (found != undefined){
            let index = this.order_items.indexOf(found);
            this.order_items = this.order_items.splice(index,1);
        }
    }

    validate_items() {
        let items = [];
        for (let i in this.order_items) {
            items.push(new OrderItem().fromJSON(i))
        }
        this.order_items = items
    }


}

module.exports = Order