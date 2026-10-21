const conn = require("../db/conn")
const { DataTypes } = require("sequelize")

const Drone = conn.define(
	"drone",
	{
		idDrone: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		modelo: {
			type: DataTypes.STRING,
			allowNul: false
		},
		marca: {
			type: DataTypes.STRING,
			allowNul: false
		},
		numeroSerie: {
			type: DataTypes.STRING,
			allowNul: false
		},
		tipoServico: {
			type: DataTypes.STRING,
			allowNul: false
		},
		idCliente: {
			type: DataTypes.INTEGER,
			references: {
				model: "clientes",
				key: "idCliente"
			},
			allowNul: false
		}
	},
	{
		timestamps: false,
		tableName: "drones"
	}
)

module.exports = Drone
