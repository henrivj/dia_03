const Agendamento = require("../model/Agendamento")
const Cliente = require("../model/Cliente")
const Drone = require("../model/Drone")

const cadastrar = async (req, res) => {
	const { data, horario, idDrone, idCliente } = req.body

	try {
		const drone = await Drone.findByPk(idDrone)
		const cliente = await Cliente.findByPk(idCliente)

		if (!drone) return res.status(404).json({ message: "Veículo inexistente" })
		if (!cliente) return res.status(404).json({ message: "Cliente inexistente" })

		if (await Agendamento.findOne({ where: { data: data, horario: horario } })) {
			return res.status(409).json({ message: "Data e horário já marcados" })
		}

		const agendamento = await Agendamento.create({ data, horario, tipo, idDrone, idCliente })
		res.status(201).json(agendamento)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Erro ao cadastrar" })
	}
}

const listar = async (req, res) => {
	try {
		const agendamentos = await Agendamento.findAll({
			order: [
				["data", "ASC"],
				["horario", "ASC"]
			]
		})
		return res.status(200).json(agendamentos)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Erro ao listar agendamentos" })
	}
}

module.exports = { cadastrar, listar }
