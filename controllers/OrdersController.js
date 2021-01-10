const Order = require('../models/order');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    );
 };
 
 exports.getById = (req, res) => {
    Order.getById(req.params.id).then(
        function(order) {
            res.json(order);
        }
    );
 };

 exports.getByUsername = (req, res) => {
    Order.getByUsername(req.params.username).then(
        function(order) {
            res.json(order);
        }
    );
 };

 exports.getByState = (req, res) => {
    Order.getByState(req.params.orderStateId).then(
        function(order) {
            res.json(order);
        }
    );
 };

 exports.store = (req, res) => {
    const newOrder = Order.create({
        'approvalDate': req.body.approvalDate,
        'orderStateId': req.body.orderStateId,
        'username': req.body.username,
        'email': req.body.email,
        'phoneNumber': req.body.phoneNumber
    }).then(function() {
        res.json({
            'status':'saved!',
            'order': newOrder,
        });
    });
 
 };
 
 exports.updateById = (req, res) => {
    Order.update(req.params.id, {
        'approvalDate': req.body.approvalDate,
        'orderStateId': req.body.orderStateId,
        'username': req.body.username,
        'email': req.body.email,
        'phoneNumber': req.body.phoneNumber
    }).then(
        function(order) {
            res.json(order);
        }
    )    
 }

 exports.updateOrderState = (req,res) => {
     Order.updateState(req.params.id, req.params.orderStateId).then(
         function(order) {
             res.json(order);
         }
     )
 }