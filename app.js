/**
 * Initialization
 */
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');
const usersRoute = require('./api/routes/user.route');


/**
 * Setting Morgan for logs
 */
app.use(morgan('dev'));

/**
 * Setting body-parser for logs
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * Setting up mongoDb
 */
mongoose.connect('mongodb://akshay:'+ process.env.mongoPassword +'@ds028540.mlab.com:28540/user-registration-collection',{ 
    useNewUrlParser: true 
});
if(mongoose.connect) {
    console.log('mLab Connected');
}
else {
    console.log('Some error occurred while connecting to mLab');
}
mongoose.Promise = global.Promise;

/**
 * Setting up CORS
 */
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', '*'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


/**
 * /products middleware
 */
app.use('/products', productsRoute);

/**
 * /orders middleware
 */
app.use('/orders', ordersRoute);

/**
 * /user middleware
 */
app.use('/user', usersRoute);



/**
 * Error handling
 */
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: `${error.message}`
        }
    });
});


module.exports = app;