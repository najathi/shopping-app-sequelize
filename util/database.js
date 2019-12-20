const Sequelize = require('sequelize'); // constructor function

const sequelize = new Sequelize('node-complete', 'root', 'root', {
	dialect: 'mysql',
	host: 'localhost'
});

module.exports = sequelize;