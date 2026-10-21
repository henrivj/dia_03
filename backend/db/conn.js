const { Sequelize } = require("sequelize")

const conn = new Sequelize("db_flysafe", "root", "senai", {
	dialect: "mysql",
	host: "localhost",
	port: "3306"
})

module.exports = conn
