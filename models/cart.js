const Sequelize = require('sequelize');

const seuqelize = require('../util/database');

const Cart = seuqelize.define('cart', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	}
});

module.exports = Cart;
