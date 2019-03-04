/**
 * Initializations
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product-model');

/**
 * Implementing GET /products route
 */
router.get('/', (req, res, next) => {
    console.log(req);
    Product.find().select('_id productName productID').then(
        product => {
            let modifiedRes = {
                count: product.length,
                products: product
            }
            if (product.length >= 0) {
                res.status(200).json(modifiedRes);
            } else {
                res.status(404).json({
                    message: 'No products found'
                });
            }
        }
    ).catch(
        err => {
            res.status(404).json({
                error: err
            });
        }
    );
});

/**
 * Implementing GET /products/:productID route
 */
router.get('/:productID', (req, res, next) => {
    let productID = req.params.productID;
    Product.findById(productID).then(id => {
            console.log('Get product by id res: ', id);
            if (id) {
                res.status(200).json(id);
            } else {
                res.status(404).json({
                    message: 'Not Found 404'
                });
            }

        })
        .catch(err => {
            console.log('Get product by id err: ', err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * Implementing POST /products route
 */
router.post('/', (req, res, next) => {
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        productID: req.body.productID,
    });
    product.save().then(res => {
            res.status(201).json({
                message: 'Products POST successfull',
                data: product
            });
            // console.log('save res: ', res);
        })
        .catch(err => {
            console.log('save error: ', err);
            res.status(500).json({
                error: err
            })
        });
});

/**
 * Implementing PATCH /products route
 */
router.patch('/:productID', (req, res, next) => {
    let productID = req.params.productID;
    if (productID == '00') {
        res.status(200).json({
            message: 'Products PATCH because of special id'
        });
    } else {
        res.status(200).json({
            id: productID
        });
    }
});
/**
 * Implementing DELETE /products route
 */
router.delete('/:deleteID', (req, res, next) => {
    let deleteID = req.params.deleteID;
    Product.deleteOne({
        _id: deleteID
    }).then(delProduct => {
        res.status(200).json({
            message: `Product deleted`
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;