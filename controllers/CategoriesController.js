const Category = require('../models/category');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Category.getAll().then(
        function(allCategories) {
            res.json(allCategories);
        }
    );
 };
 