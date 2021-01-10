const bookshelf= require('../config/bookshelf');

const Order = bookshelf.Model.extend({
   tableName: 'orders'
})

module.exports.getAll = () => {
   return Order.fetchAll();
}

module.exports.getById = (id) => {
   return new Order({'id':id}).fetch();
}

module.exports.getByUsername = (username) => {
    return  Order .where({'username': username}).fetchAll();
}

module.exports.getByState = (orderStateId) => {
    return Order .where({'orderStateId':orderStateId}).fetchAll();
}

module.exports.create = (order) => {
   return new Order({
       approvalDate: order.approvalDate,
       orderStateId: order.orderStateId,
       username: order.username,
       email: order.email,
       phoneNumber: order.phoneNumber

   }).save();
}

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
   );
}

module.exports.updateState = (id, state) => {
    return new Order({
        id: id
    }).save( {
        orderStateId: state
    }, 
    {patch: true})
}