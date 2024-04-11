const mongoose = require('mongoose');
const { link } = require('../../routes/carts.router');

const collection = 'products';

const productsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    category: String,
    thumbnail: String,
    status: Boolean
})

module.exports = mongoose.model('Products',productsSchema,collection);