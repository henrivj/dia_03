const nome = document.getElementById("inputNome")
const email = document.getElementById("inputEmail")
const senha = document.getElementById("inputSenha")
const cpf = document.getElementById("inputCpf")
const endereco = document.getElementById("inputEndereco")
const telefone = document.getElementById("inputTelefone")

const res = document.getElementById("res")

document.getElementById("formUsuario").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			nome: nome.value,
			email: email.value,
			senha: senha.value,
			cpf: cpf.value,
			endereco: endereco.value,
			telefone: telefone.value
		}

		const resposta = await fetch("http://localhost:3000/cliente", {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) res.innerText = "Cadastrado com sucesso"
		setTimeout(() => {
			window.location = "/frontend/index.html"
		}, 1000)
	} catch (error) {
		res.innerText = error.message || "Erro ao cadastrar"
	}
})
