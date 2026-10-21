const { Agendamento, Cliente, Drone } = require("./model/rel")
const conn = require("./db/conn")

;(async () => {
	try {
		console.log("sincronizando tabelas...")
		await conn.sync({ force: true })
	} catch (error) {
		console.error(error)
	} finally {
		await conn.close()
		console.log("tabelas sincronizadas")
	}
})()
