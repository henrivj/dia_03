const Cliente = require("../model/Cliente")
const cryptoJs = require("crypto-js")

const cadastrar = async (req, res) => {
	console.log(req.body)
	const { nome, email, senha, cpf, telefone } = req.body
	if (!nome || !email || !senha || !cpf || !telefone) return res.status(400).json({ message: "preencha todos os campos para cadastrar" })

	try {
		const senhaCrypto = cryptoJs.AES.encrypt(senha, "segredo").toString()
		const cpfCrypto = cryptoJs.AES.encrypt(cpf, "segredo").toString()

		const cliente = await Cliente.create({ nome, email, senha: senhaCrypto, cpf: cpfCrypto, telefone })
		cliente.senha = undefined

		res.status(201).json(cliente)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "erro ao cadastrar" })
	}
}

const consultarId = async (req, res) => {
	const id = req.params.id
	if (!id) return res.status(400).json({ message: "id nescessário para consulta" })

	try {
		const cliente = await Cliente.findByPk(id, { attributes: { exclude: ["senha"] } })

		if (!cliente) return res.status(404).json({ message: "usuário não encontrado" })

		res.status(200).json(cliente)
	} catch (error) {
		res.status(500).json({ message: "erro ao consultar id" })
	}
}

const listar = async (req, res) => {
	try {
		const clientes = await Cliente.findAll({ attributes: { exclude: ["senha"] } })
		return res.status(200).json(clientes)
	} catch (error) {
		return res.status(500).json({ message: "erro ao listar cliente" })
	}
}

const atualizar = async (req, res) => {
	const id = req.params.id
	const { nome, email, senha, cpf, telefone } = req.body

	if (!id) return res.status(400).json({ message: "id nescessário para consulta" })

	try {
		const cliente = await Cliente.findByPk(id)
		if (!cliente) return res.status(404).json({ message: "usuário não encontrado" })

		await cliente.update({ nome, email, senha, cpf, telefone })

		return res.status(200).json({ message: "usuário atualizado com sucesso" })
	} catch (error) {
		return res.status(500).json({ message: "erro ao listar cliente" })
	}
}

const deletar = async (req, res) => {
	const id = req.params.id
	if (!id) return res.status(200).json({ message: "usuário atualizado com sucesso" })

	try {
		const cliente = await Cliente.findByPk(id)
		if (!cliente) return res.status(404).json({ message: "usuário não encontrado" })

		await cliente.destroy()
		return res.status(200).json({ message: "usuário deletado" })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "erro ao listar cliente" })
	}
}

module.exports = { cadastrar, consultarId, listar, atualizar, deletar }
