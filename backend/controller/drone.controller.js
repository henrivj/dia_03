const Drone = require("../model/Drone")
const Cliente = require("../model/Cliente")
const cryptoJs = require("crypto-js")

const cadastrar = async (req, res) => {
	const { modelo, marca, numeroSerie, tipoServico } = req.body
	if (!modelo || !marca || !numeroSerie || !tipoServico) return res.status(401).json({ message: "preencha todos os campos para cadastrar" })

	try {
		const idCliente = req.bearer
		const cliente = await Cliente.findByPk(idCliente)
		if (!cliente) return res.status(404).json({ message: "cliente inexistente" })

		const numeroSerieCrypto = cryptoJs.AES.encrypt(numeroSerie, "segredo").toString()

		const drone = await Drone.create({ modelo, marca, numeroSerie: numeroSerieCrypto, tipoServico, idCliente })
		return res.status(201).json(drone)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "erro ao cadastrar drone" })
	}
}

const consultarNumeroSerie = async (req, res) => {
	const { numeroSerie } = req.params
	if (!numeroSerie) return res.status(400).json({ message: "numeroSerie necessário para consulta" })

	try {
		const drones = await Drone.findAll()
		console.log(drones)
		const dronesDescrypto = []
		console.log("a")
		drones.forEach((drone) => {
			console.log("b")
			console.log(drone)
			const bytes = cryptoJs.AES.decrypt(drone.numeroSerie, "segredo").toString()
			const val = bytes.toString(cryptoJs.enc.Utf8)
			console.log(val)
			drone.numeroSerie = val
			if (val === numeroSerie) dronesDescrypto.push(drone)
		})

		return res.status(200).json(dronesDescrypto)
	} catch (error) {
		return res.status(500).json({ message: "erro ao consultar drone" })
	}
}

module.exports = { cadastrar, consultarNumeroSerie }
