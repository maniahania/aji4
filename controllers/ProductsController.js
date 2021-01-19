const Product = require('../models/product');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function (allProducts) {
            res.json(allProducts);
        }
    );
};

exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function (product) {
            if (product == null) {
                res.status(400)
            }
            res.json(product)
        }
    );
};

exports.store = (req, res) => {
    Product.create({ ...req.body })
        .then(
            function (product) {
                if (product == null) {
                    res.status(400)
                }
                res.json(product)
            }
        )
};

exports.updateById = (req, res) => {
    Product.getById(req.params.id).then(
        function (product) {
            if (product == null) {
                res.status(400)
                console.log('Product with id ' + req.params.id + ' does not exist!')
                res.json(product)
            } else {
                Product.update(req.params.id, { ...req.body })
                    .then(
                        function (product) {
                            if (product == null) {
                                res.status(400)
                            }
                            res.json(product)
                        }
                    )
            }
        }
    );

}