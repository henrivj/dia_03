const cryptoJs = require("crypto-js")
const Cliente = require("../model/Cliente")

const login = async (req, res) => {
	const { email, senha } = req.body

	try {
		const cliente = await Cliente.findOne({ where: { email: email } })

		if (!cliente || senha !== cryptoJs.AES.decrypt(cliente.senha, "segredo").toString(cryptoJs.enc.Utf8)) {
			return res.status(401).json({ message: "Credenciais inválidas" })
		}

		const duasHorasMs = 2 * 60 * 60 * 1000
		const tempoExpiracao = Date.now() + duasHorasMs

		const token = cryptoJs.AES.encrypt(
			JSON.stringify({
				idCliente: cliente.idCliente,
				expiraEm: tempoExpiracao
			}),
			"segredo"
		).toString()

		res.status(200).json({ token: token, nome: cliente.nome })
	} catch (error) {
		res.status(401).json({ message: "Erro ao fazer login" })
	}
}

module.exports = { login }
