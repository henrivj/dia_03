const nome = document.getElementById("inputNome")
const email = document.getElementById("inputEmail")
const senha = document.getElementById("inputSenha")

const formLogin = document.getElementById("formLogin")
const boasVindas = document.getElementById("boasVindas")
const res = document.getElementById("res")

if (localStorage.getItem("token")) {
	formLogin.classList.toggle("hidden")
	boasVindas.classList.toggle("hidden")
}

document.getElementById("username").innerText = localStorage.getItem("nome") ? `Usuário: ${localStorage.getItem("nome")}` : "Usuário Logado."

formLogin.addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			nome: nome.value,
			email: email.value,
			senha: senha.value
		}

		const resposta = await fetch("http://localhost:3000/login", {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) {
			localStorage.setItem("token", dados.token)
			console.log(dados)
			localStorage.setItem("nome", dados.nomeCliente)

			res.innerText = "Logado com sucesso"

			setTimeout(() => {
				location.reload()
			}, 1500)
		}
	} catch (error) {
		res.innerText = error.message || "Erro ao logar"
	}
})
