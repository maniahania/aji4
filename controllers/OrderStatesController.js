const State = require('../models/orderState');
const _ = require('underscore');

exports.getAll = (req, res) => {
    State.getAll().then(
        function (allStates) {
            res.json(allStates);
        }
    );
};