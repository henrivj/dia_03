const conn = require("../db/conn")
const { DataTypes } = require("sequelize")

const Agendamento = conn.define(
	"agendamento",
	{
		idAgendamento: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		data: {
			type: DataTypes.DATEONLY,
			allowNul: false
		},
		horario: {
			type: DataTypes.TIME,
			allowNul: false
		},
		idDrone: {
			type: DataTypes.INTEGER,
			references: {
				model: "drones",
				key: "idDrone"
			},
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
		tableName: "agendamentos"
	}
)

module.exports = Agendamento
