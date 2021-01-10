const Product = require('../models/product');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
 };
 
 exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    );

 };
 
 exports.store = (req, res) => {
    const newProduct = Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'unitPrice': req.body.unitPrice,
        'unitWeight': req.body.unitWeight,
        'categoryId': req.body.categoryId
    }).then(function() {
        res.json({
            'status':'saved!',
            'product': newProduct,
        });
    });
 
 };
 
exports.updateById = (req, res) => {
    Product.update(req.params.id,{
        'name': req.body.name,
        'description': req.body.description,
        'unitPrice': req.body.unitPrice,
        'unitWeight': req.body.unitWeight,
        'categoryId': req.body.categoryId
    }).then(
        function(product) {
            res.json(product);
        }
    )    
 }