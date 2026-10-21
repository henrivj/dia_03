const marca = document.getElementById("inputMarca")
const modelo = document.getElementById("inputModelo")
const numeroSerie = document.getElementById("inputNumeroSerie")
const tipoServico = document.getElementById("inputTipoServico")

const res = document.getElementById("res")

document.getElementById("formVeiculo").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			marca: marca.value,
			modelo: modelo.value,
			numeroSerie: numeroSerie.value,
			tipoServico: tipoServico.value
		}

		// rota protegida
		const resposta = await fetch("http://localhost:3000/drone", {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") ? localStorage.getItem("token") : "" },
			method: "POST"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) res.innerText = "Cadastrado com sucesso"
	} catch (error) {
		res.innerText = error.message || "Erro ao cadastrar"
	}
})
