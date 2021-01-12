const { knex } = require('../config/bookshelf');
const bookshelf= require('../config/bookshelf');

const Order = bookshelf.model('Order',{
   tableName: 'orders',
   products() {
    return this.hasMany('OrderProductsList','orderId')
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
   return Order.fetchAll({withRelated: ['products']
})
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
   return new Order().save({
    approvalDate: order.approvalDate,
    orderStateId: order.orderStateId,
    username: order.username,
    email: order.email,
    phoneNumber: order.phoneNumber
   }).then(data => {
       let orderid = data.attributes.id
       for (let element of order.products){
           new OrderProductsList().save({
                orderId: orderid,
                productId: element.productId,
                quantity: element.quantity
             })
        } 
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
    return new Order({
        id: id
    }).save( {
        orderStateId: state
    }, 
    {patch: true})
}