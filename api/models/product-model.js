const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: {
        type: String,
        required: true
    },
    productID: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);