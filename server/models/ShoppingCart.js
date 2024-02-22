const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ShoppingCartSchema = new mongoose.Schema({
    userId: String,
    shoppingCarts: Array,
});

const ShoppingCartModel = mongoose.model('shoppingCarts', ShoppingCartSchema);

module.exports = ShoppingCartModel;
