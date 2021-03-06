const { knex } = require('../config/bookshelf');
const bookshelf = require('../config/bookshelf');
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
        },
        {
            'rule': 'email',
            'message': 'Email is incorrect!'
        }
    ],
    phoneNumber: [
        {
            'rule': 'numeric',
            'message': 'Phone number has to contain only numbers!'
        }
    ]
});

var validationRulesForList = new Checkit({
    quantity: [
        {
            'rule': 'greaterThan:0',
            'message': 'Quantity of a product has to be greater than zero!'
        },
        {
            'rule': 'integer',
            'message': 'Quantity of a product must be a whole number!'
        }
    ]
});

const Order = bookshelf.model('Order', {
    tableName: 'orders',
    idAttribute: 'id',
    products() {
        return this.hasMany('OrderProductsList', 'orderId')
    },
    initialize: function () {
        this.on('saving', this.validateSave);
    },
    validateSave: function () {
        return validationRules.run(this.attributes);
    }
})

const OrderProductsList = bookshelf.model('OrderProductsList', {
    tableName: 'orderproductslist',
    hidden: 'orderId',
    orders() {
        return this.belongsTo('Order')
    },
    initialize: function () {
        this.on('saving', this.validateSaveList);
    },
    validateSaveList: function () {
        return validationRulesForList.run(this.attributes);
    }
})

module.exports.getAll = () => {
    return Order.fetchAll({ withRelated: ['products'] })
}

module.exports.getById = (id) => {
    return Order.where({ 'id': id })
        .fetch({ withRelated: ['products'] })
}

module.exports.getByUsername = (username) => {
    return Order.where({ 'username': username })
        .fetchAll({ withRelated: ['products'] });
}

module.exports.getByState = (orderStateId) => {
    return Order.where({ 'orderStateId': orderStateId })
        .fetchAll({ withRelated: ['products'] });
}

module.exports.create = (order) => {
    return new Order({
        approvalDate: order.approvalDate,
        orderStateId: order.orderStateId,
        username: order.username,
        email: order.email,
        phoneNumber: order.phoneNumber
    }).save().then(data => {
        let orderid = data.attributes.id
        for (let element of order.products) {
            new OrderProductsList({
                orderId: orderid,
                productId: element.productId,
                quantity: element.quantity
            }).save().catch(
                Checkit.Error, function (message) {
                    console.log(message.toString());
                })
        }
    }).catch(
        Checkit.Error, function (message) {
            console.log(message.toString());
        })
}

module.exports.updateState = (id, state) => {
    return new Order({
        id: id
    }).save({
        orderStateId: state
    },
        { patch: true })
    .catch(function (message) {
        console.log(message.toString())
        })
}