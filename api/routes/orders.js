/**
 * Initialization
 */
const express = require('express');
const router = express.Router();
const Order = require('../models/order-model');
const Product = require('../models/product-model');
const mongoose = require('mongoose');

/**
 * GET /orders
 */
router.get('/', (req, res, next) => {
    Order.find().select('_id productId quantity').populate('productId').then(
        order => {
            if (order.length >= 0) {
                res.status(200).json({
                    count: order.length,
                    order: order
                });
            } else {
                res.status(404).json({
                    message: 'No orders found'
                })
            }
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    );
});

/**
 * GET /orders/:orderID
 */
router.get('/:orderID', (req, res, next) => {
    let orderID = req.params.orderID;
    Order.findById(orderID).select('_id productId quantity').then(
        order => {
            console.log(order);
            if (order != null) {
                res.status(200).json({
                    orderDetails: order
                });
            } else {
                res.status(404).json({
                    message: 'Not Found'
                });
            }
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    );
});

/**
 * POST /orders
 */
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId).select('_id productID productName').then(
        product => {
            let orderPayload = new Order({
                _id: mongoose.Types.ObjectId(),
                productId: req.body.productId,
                quantity: req.body.quantity
            });
            orderPayload.save().then(
                order => {
                    console.log(`order post success: ${order}`);
                    res.status(201).json({
                        message: `Order placed`,
                        productDetails: product
                    });
                }
            ).catch(err => {
                console.log(`order post err: ${err}`);
                res.status(500).json({
                    error: err
                })
            });
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    );
});

/**
 * DELETE /orders:orderID
 */
router.delete('/:orderID', (req, res, next) => {
    let orderID = req.params.orderID;
    Order.deleteOne({
        _id: orderID
    }).then(
        delOrder => {
            res.status(200).json({
                message: `OrderID of : ${orderID} was successfully deleted`,
            })
        }).catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    );
});

module.exports = router;