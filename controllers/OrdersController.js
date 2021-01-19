const Order = require('../models/order');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Order.getAll().then(
        function (orders) {
            res.json(orders);
        }
    );
};

exports.getById = (req, res) => {
    Order.getById(req.params.id).then(
        function (order) {
            res.json(order);
        }
    );
};

exports.getByUsername = (req, res) => {
    Order.getByUsername(req.params.username).then(
        function (order) {
            res.json(order);
        }
    );
};

exports.getByState = (req, res) => {
    Order.getByState(req.params.orderStateId).then(
        function (order) {
            res.json(order);
        }
    );
};

exports.store = (req, res) => {
    Order.create({ ...req.body })
        .then(function (order) {
            res.json(order);
        });

};

exports.updateOrderState = (req, res) => {
    Order.updateState(req.params.id, req.params.orderStateId).then(
        function (order) {
            res.json(order);
        }
    )
}