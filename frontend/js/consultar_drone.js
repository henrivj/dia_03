const numeroSerie = document.getElementById("inputNumeroSerie")
const res = document.getElementById("res")
const resTabela = document.getElementById("resTabela")

document.getElementById("formVeiculo").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		// rota protegida
		const resposta = await fetch(`http://localhost:3000/drone/${numeroSerie.value}`, {
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") ? localStorage.getItem("token") : "" },
			method: "GET"
		})
		const dados = await resposta.json()

		if (resposta.ok) {
			dados.forEach((drone) => {
				resTabela.innerHTML += `
				<td>${drone.idDrone}</td>
				<td>${drone.modelo}</td>
				<td>${drone.marca}</td>
				<td>${drone.numeroSerie}</td>
				<td>${drone.tipoServico}</td>
				<td>${drone.idCliente}</td>`
			})
		} else res.innerText = dados.message
	} catch (error) {
		res.innerText = error.message || "Erro ao cadastrar"
	}
})
