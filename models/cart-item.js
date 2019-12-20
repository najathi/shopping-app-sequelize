const Sequelize = require('sequelize');

const seuqelize = require('../util/database');

const CartItem = seuqelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;
