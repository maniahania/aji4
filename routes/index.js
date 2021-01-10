const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/ProductsController');
const OrdersController = require('../controllers/OrdersController');
const CategoriesController = require('../controllers/CategoriesController');
const OrderStatesController = require('../controllers/OrderStatesController');

router.get('/products', ProductsController.getAll);
router.get('/products/:id', ProductsController.getById);
router.post('/products', ProductsController.store);
router.put('/products/:id', ProductsController.updateById);

router.get('/orders', OrdersController.getAll);
router.get('/orders/:id', OrdersController.getById);
router.get('/orders/username/:username', OrdersController.getByUsername);
router.get('/orders/stateId/:orderStateId', OrdersController.getByState);
router.post('/orders', OrdersController.store);
router.put('/orders/:id', OrdersController.updateById);
router.put('/orders/:id/:orderStateId', OrdersController.updateOrderState);

router.get('/categories', CategoriesController.getAll);

router.get('/states', OrderStatesController.getAll);

module.exports = router;