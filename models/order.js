const { knex } = require('../config/bookshelf');
const bookshelf= require('../config/bookshelf');
const Checkit = require('checkit');

var validationRules = new Checkit({
    orderStateId: [
        {
            'rule': 'required',
            'message': 'Status id is required!'
        }
    ],
    username: [
        {
            'rule': 'required',
            'message': 'Username is required!'
        }
    ],
    email: [
        {
            'rule': 'required',
            'message': 'Email is required!'
        }
    ],
    phoneNumber: [
        {
            'rule': 'numeric',
            'message': 'Phone number has to contain only numbers!'
        }
    ]
});

const Order = bookshelf.model('Order',{
    tableName: 'orders',
    products() {
        return this.hasMany('OrderProductsList','orderId')
    },
    initialize: function() {
        this.on('saving', this.validateSave);
     },
     validateSave: function() {
        return validationRules.run(this.attributes);
     }
})

const OrderProductsList = bookshelf.model('OrderProductsList',{
    tableName: 'orderproductslist',
    hidden: 'orderId',
    orders() {
        return this.belongsTo('Order')
    }
})

module.exports.getAll = () => { 
        return Order.fetchAll({withRelated: ['products']})
}

module.exports.getById = (id) => {
        return Order .where({'id': id})
                     .fetch({withRelated: ['products']})
}

module.exports.getByUsername = (username) => {
        return  Order .where({'username': username})
                      .fetchAll({withRelated: ['products']});
}

module.exports.getByState = (orderStateId) => {
    return Order .where({'orderStateId':orderStateId})
                 .fetchAll({withRelated: ['products']});
}

module.exports.create = (order) => {
        return new Order({
            approvalDate: order.approvalDate,
            orderStateId: order.orderStateId,
            username: order.username,
            email: order.email,
            phoneNumber: order.phoneNumber
        }).save().then(data => {
            console.log(data)
            let orderid = data.attributes.id
            for (let element of order.products){
                new OrderProductsList().save({
                    orderId: orderid,
                    productId: element.productId,
                    quantity: element.quantity
                })
            } 
         }).catch(
         Checkit.Error, function(message) { 
            console.log(message);
      })
}
/*
module.exports.update = (id,order) => {
   return new Order({
       id: id
   }).save({
        approvalDate: order.approvalDate,
        orderStateId: order.orderStateId,
        username: order.username,
        email: order.email,
        phoneNumber: order.phoneNumber
       }, 
       {patch: true}
   ).then(function() {
    for (let element of order.products){
        new OrderProductsList({
            orderId: id
        }).save({
            productId: element.productId,
             quantity: element.quantity
            });
    }})
}*/

module.exports.updateState = (id, state) => {
    try {
        return new Order({
            id: id
        }).save( {
            orderStateId: state
        }, 
        {patch: true})
    }
    catch(err){
        console.log(err)
    }
}